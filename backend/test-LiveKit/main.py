"""
FastAPI service that issues LiveKit JWT access tokens for clients joining a room.

Set LIVEKIT_API_KEY and LIVEKIT_API_SECRET in a .env file in this directory (python-dotenv).
Run from this folder: uvicorn main:app --reload --port 8000
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from livekit import api

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
