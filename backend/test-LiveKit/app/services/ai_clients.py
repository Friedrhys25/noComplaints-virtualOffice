"""AI client wrappers for transcription and summarization."""

from __future__ import annotations

import os

import google.generativeai as genai
from openai import OpenAI


NOTES_SYSTEM_PROMPT = """You are an Executive Assistant.
Create concise, high-signal meeting notes in Markdown using exactly these sections:

## Executive Summary
- A short paragraph summarizing outcomes and context.

## Key Decisions
- Bullet points listing decisions that were made.

## Action Items
- Task checkboxes using Markdown format: - [ ] Owner (if known): task and due date (if known).

If information is missing, do not invent facts. Keep details grounded in the transcript."""


def transcribe_audio_with_whisper(audio_file_path: str) -> str:
    """Transcribe an audio file with Whisper and return plain text."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is missing.")

    client = OpenAI(api_key=api_key)
    with open(audio_file_path, "rb") as audio_file:
        result = client.audio.transcriptions.create(
            model=os.getenv("WHISPER_MODEL", "whisper-1"),
            file=audio_file,
            response_format="text",
        )
    # response_format='text' returns a plain string.
    return result if isinstance(result, str) else str(result)


def generate_meeting_notes_with_gemini(transcript_text: str) -> str:
    """Generate structured Markdown notes from transcript text."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is missing.")

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        model_name=os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
        system_instruction=NOTES_SYSTEM_PROMPT,
    )
    response = model.generate_content(
        f"Transcript:\n\n{transcript_text}",
        generation_config={"temperature": 0.2},
    )
    text = response.text if response and hasattr(response, "text") else None
    if not text:
        raise RuntimeError("Gemini returned an empty notes response.")
    return text.strip()
