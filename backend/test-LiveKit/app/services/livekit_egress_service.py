"""Helpers for starting and stopping LiveKit egress recordings."""

from __future__ import annotations

import os
from datetime import UTC, datetime
from uuid import UUID

from livekit import api


def _build_output_filepath(room_name: str, meeting_id: UUID) -> str:
    """Create a deterministic object path that embeds meeting context."""
    prefix = os.getenv("LIVEKIT_EGRESS_FILE_PREFIX", "meeting-recordings").strip("/") or "meeting-recordings"
    timestamp = datetime.now(UTC).strftime("%Y%m%dT%H%M%SZ")
    safe_room_name = room_name.replace("/", "-").replace("\\", "-")
    return f"{prefix}/{safe_room_name}/{meeting_id}/{timestamp}.mp3"


def _build_s3_upload() -> api.S3Upload | None:
    """Build S3-compatible upload config from env vars when provided."""
    access_key = os.getenv("LIVEKIT_EGRESS_S3_ACCESS_KEY")
    secret_key = os.getenv("LIVEKIT_EGRESS_S3_SECRET_KEY")
    endpoint = os.getenv("LIVEKIT_EGRESS_S3_ENDPOINT")
    region = os.getenv("LIVEKIT_EGRESS_S3_REGION", "ap-southeast-1")
    bucket = os.getenv("LIVEKIT_EGRESS_S3_BUCKET") or os.getenv("SUPABASE_RECORDINGS_BUCKET")

    if not all([access_key, secret_key, endpoint, bucket]):
        return None

    return api.S3Upload(
        access_key=access_key,
        secret=secret_key,
        endpoint=endpoint,
        region=region,
        bucket=bucket,
        force_path_style=True,
    )


async def start_room_recording(room_name: str, meeting_id: UUID) -> api.EgressInfo:
    """Start an audio room-composite egress and return LiveKit egress info."""
    output_filepath = _build_output_filepath(room_name, meeting_id)
    livekit_url = os.getenv("LIVEKIT_URL", "")
    s3_upload = _build_s3_upload()
    if "livekit.cloud" in livekit_url and not s3_upload:
        raise ValueError(
            "LiveKit Cloud requires storage output config. Set LIVEKIT_EGRESS_S3_ACCESS_KEY, "
            "LIVEKIT_EGRESS_S3_SECRET_KEY, LIVEKIT_EGRESS_S3_ENDPOINT, and LIVEKIT_EGRESS_S3_BUCKET "
            "(or SUPABASE_RECORDINGS_BUCKET)."
        )

    request = api.RoomCompositeEgressRequest(
        room_name=room_name,
        audio_only=True,
        # Some LiveKit server versions expect the single `file` output field
        # rather than the repeated `file_outputs` field.
        file=api.EncodedFileOutput(
            file_type=api.EncodedFileType.MP3,
            filepath=output_filepath,
            s3=s3_upload,
        ),
    )
    async with api.LiveKitAPI() as livekit_api:
        return await livekit_api.egress.start_room_composite_egress(request)


async def stop_recording(egress_id: str) -> api.EgressInfo:
    """Stop an active egress recording."""
    request = api.StopEgressRequest(egress_id=egress_id)
    async with api.LiveKitAPI() as livekit_api:
        return await livekit_api.egress.stop_egress(request)
