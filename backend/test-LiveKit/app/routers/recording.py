"""Recording control endpoints for LiveKit egress."""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException

from app.schemas.recording import (
    StartRecordingRequest,
    StartRecordingResponse,
    StopRecordingRequest,
    StopRecordingResponse,
)
from app.services.livekit_egress_service import start_room_recording, stop_recording

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/recordings", tags=["recordings"])


@router.post("/start", response_model=StartRecordingResponse)
async def start_recording(payload: StartRecordingRequest) -> StartRecordingResponse:
    """Start room egress recording and return the generated egress ID."""
    try:
        egress_info = await start_room_recording(payload.room_name, payload.meeting_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception:
        logger.exception(
            "Failed to start recording.",
            extra={"room_name": payload.room_name, "meeting_id": str(payload.meeting_id)},
        )
        raise HTTPException(status_code=502, detail="Could not start recording.") from None

    egress_id = getattr(egress_info, "egress_id", "")
    if not egress_id:
        raise HTTPException(status_code=502, detail="LiveKit did not return an egress ID.")

    return StartRecordingResponse(
        status="recording_started",
        egress_id=egress_id,
        room_name=payload.room_name,
        meeting_id=payload.meeting_id,
    )


@router.post("/stop", response_model=StopRecordingResponse)
async def stop_recording_endpoint(payload: StopRecordingRequest) -> StopRecordingResponse:
    """Stop active egress recording by egress ID."""
    try:
        await stop_recording(payload.egress_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception:
        logger.exception("Failed to stop recording.", extra={"egress_id": payload.egress_id})
        raise HTTPException(status_code=502, detail="Could not stop recording.") from None

    return StopRecordingResponse(status="recording_stop_requested", egress_id=payload.egress_id)
