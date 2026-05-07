"""FastAPI service for LiveKit auth and post-meeting webhook processing."""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from livekit import api

from app.routers.livekit_webhooks import router as livekit_webhooks_router
from app.routers.recording import router as recording_router

load_dotenv()

app = FastAPI()

# CORS: local React dev server can call this API. Wildcard + credentials=False avoids browser restrictions.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(livekit_webhooks_router)
app.include_router(recording_router)


@app.get("/get-token")
def get_token(
    room_name: str = Query(..., description="LiveKit room to join"),
    participant_name: str = Query(..., description="Display name / identity for the participant"),
) -> dict[str, str]:
    """Return a JWT the client uses to connect to LiveKit for ``room_name`` as ``participant_name``."""
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    if not api_key or not api_secret:
        raise HTTPException(
            status_code=503,
            detail="LiveKit API credentials are not configured on the server.",
        )

    # JWT signed with API secret; LiveKit server enforces grants when the client connects.
    token = (
        api.AccessToken(api_key, api_secret)
        .with_identity(participant_name)
        .with_name(participant_name)
        .with_grants(
            api.VideoGrants(
                room_join=True,
                room=room_name,
                can_publish=True,
                can_subscribe=True,
            )
        )
        .to_jwt()
    )
    return {"token": token}
