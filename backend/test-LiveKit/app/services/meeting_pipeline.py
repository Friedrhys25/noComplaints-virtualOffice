"""Background pipeline for post-meeting processing."""

from __future__ import annotations

import asyncio
import logging
import os
import tempfile
from pathlib import Path
from urllib.parse import urlparse

import httpx

from app.schemas.livekit import LiveKitEgressWebhookPayload
from app.services.ai_clients import generate_meeting_notes_with_gemini, transcribe_audio_with_whisper
from app.services.supabase_client import get_supabase_client

logger = logging.getLogger(__name__)

_AUDIO_EXTENSIONS = (".mp3", ".wav", ".m4a", ".ogg", ".webm")


def _extract_bucket_and_object_path(payload: LiveKitEgressWebhookPayload) -> tuple[str, str]:
    """Resolve the storage bucket + object path from webhook data."""
    default_bucket = os.getenv("SUPABASE_RECORDINGS_BUCKET")
    bucket = payload.metadata.storage_bucket if payload.metadata and payload.metadata.storage_bucket else default_bucket
    if not bucket:
        raise ValueError("No storage bucket found in payload or SUPABASE_RECORDINGS_BUCKET.")

    candidates = payload.get_candidate_object_paths()
    if not candidates:
        raise ValueError("No candidate audio object path found in webhook payload.")

    chosen = ""
    for candidate in candidates:
        if candidate.lower().endswith(_AUDIO_EXTENSIONS):
            chosen = candidate
            break
    if not chosen:
        chosen = candidates[0]

    normalized = chosen.strip()
    if normalized.startswith("http://") or normalized.startswith("https://"):
        normalized = _extract_path_from_supabase_url(normalized, bucket)

    normalized = normalized.lstrip("/")
    if normalized.startswith(f"{bucket}/"):
        normalized = normalized[len(bucket) + 1 :]

    if not normalized:
        raise ValueError("Resolved object path was empty after normalization.")
    return bucket, normalized


def _extract_path_from_supabase_url(url_value: str, bucket: str) -> str:
    """Extract object path from Supabase storage URL variants."""
    parsed = urlparse(url_value)
    pieces = [part for part in parsed.path.split("/") if part]
    marker_index = -1
    for marker in ("public", "private", "sign"):
        if marker in pieces:
            marker_index = pieces.index(marker)
            break
    if marker_index >= 0 and len(pieces) > marker_index + 2:
        path_bucket = pieces[marker_index + 1]
        object_parts = pieces[marker_index + 2 :]
        if path_bucket == bucket:
            return "/".join(object_parts)
    # Fallback to last path segment if format is unexpected.
    return Path(parsed.path).name


def _build_signed_download_url(bucket: str, object_path: str, expires_seconds: int) -> str:
    """Create a signed URL for private storage object download."""
    supabase = get_supabase_client()
    signed = supabase.storage.from_(bucket).create_signed_url(object_path, expires_seconds)
    signed_url = signed.get("signedURL") or signed.get("signedUrl")
    if not signed_url:
        raise RuntimeError("Supabase did not return a signed URL.")

    if signed_url.startswith("http://") or signed_url.startswith("https://"):
        return signed_url

    supabase_url = os.getenv("SUPABASE_URL")
    if not supabase_url:
        raise RuntimeError("SUPABASE_URL is missing.")
    return f"{supabase_url.rstrip('/')}{signed_url}"


async def _download_audio_file(url: str, object_path: str) -> str:
    """Download audio to a local temp file and return file path."""
    timeout_seconds = int(os.getenv("AUDIO_DOWNLOAD_TIMEOUT_SECONDS", "120"))
    async with httpx.AsyncClient(timeout=timeout_seconds) as client:
        response = await client.get(url)
        response.raise_for_status()
        audio_bytes = response.content

    suffix = Path(object_path).suffix or ".mp3"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(audio_bytes)
        return tmp.name


def _insert_transcript(meeting_id: str, transcript_text: str, markdown_summary: str) -> None:
    """Persist transcript and AI notes to Supabase transcripts table."""
    supabase = get_supabase_client()
    supabase.table("transcripts").insert(
        {
            "meeting_id": meeting_id,
            "content": transcript_text,
            "summary": markdown_summary,
        }
    ).execute()


async def process_meeting_recording(payload: LiveKitEgressWebhookPayload) -> None:
    """Orchestrate file fetch, transcription, summarization, persistence, and cleanup."""
    context = payload.to_log_context()
    logger.info("Starting meeting recording processing.", extra=context)

    meeting_id = payload.get_meeting_id()
    if not meeting_id:
        logger.error("Missing meeting_id in webhook metadata; skipping.", extra=context)
        return

    temp_audio_path: str | None = None
    try:
        bucket, object_path = _extract_bucket_and_object_path(payload)
        logger.info("Resolved storage object path for recording.", extra={**context, "bucket": bucket, "object_path": object_path})

        signed_ttl = int(os.getenv("SIGNED_URL_TTL_SECONDS", "900"))
        signed_download_url = await asyncio.to_thread(_build_signed_download_url, bucket, object_path, signed_ttl)

        temp_audio_path = await _download_audio_file(signed_download_url, object_path)
        logger.info("Downloaded audio file to temporary storage.", extra={**context, "temp_audio_path": temp_audio_path})

        transcript_text = await asyncio.to_thread(transcribe_audio_with_whisper, temp_audio_path)
        logger.info("Whisper transcription completed.", extra={**context, "transcript_length": len(transcript_text)})

        markdown_notes = await asyncio.to_thread(generate_meeting_notes_with_gemini, transcript_text)
        logger.info("Gemini note generation completed.", extra={**context, "notes_length": len(markdown_notes)})

        await asyncio.to_thread(_insert_transcript, str(meeting_id), transcript_text, markdown_notes)
        logger.info("Transcript row saved successfully.", extra=context)
    except httpx.HTTPError:
        logger.exception("Audio download failed.", extra=context)
    except Exception:
        logger.exception("Meeting recording processing failed.", extra=context)
    finally:
        if temp_audio_path and os.path.exists(temp_audio_path):
            try:
                os.remove(temp_audio_path)
                logger.info("Temporary audio file cleaned up.", extra=context)
            except OSError:
                logger.exception("Failed to remove temporary audio file.", extra=context)
