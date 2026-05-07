"""LiveKit webhook endpoints."""

from __future__ import annotations

import logging

from fastapi import APIRouter, BackgroundTasks

from app.schemas.livekit import LiveKitEgressWebhookPayload
from app.services.meeting_pipeline import process_meeting_recording

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])


@router.post("/livekit-egress")
async def handle_livekit_egress_webhook(
    payload: LiveKitEgressWebhookPayload,
    background_tasks: BackgroundTasks,
) -> dict[str, str]:
    """Accept LiveKit egress webhooks and trigger async post-processing."""
    context = payload.to_log_context()

    if payload.event != "egress_ended":
        logger.info("Ignoring non-terminal LiveKit event.", extra=context)
        return {"status": "ignored"}

    background_tasks.add_task(process_meeting_recording, payload)
    logger.info("Accepted egress_ended event for background processing.", extra=context)
    return {"status": "accepted"}
