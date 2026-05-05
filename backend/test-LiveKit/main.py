"""
Minimal FastAPI app that mints LiveKit JWT access tokens for browser/mobile clients.

Run from this directory: uvicorn main:app --reload --port 8000
Requires a .env file with LIVEKIT_API_KEY and LIVEKIT_API_SECRET.
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from livekit import api

# Load LIVEKIT_* (and any other vars) from .env in cwd or parents
load_dotenv()

app = FastAPI()

# Allow a local React dev server (or any origin) to call GET /get-token from the browser.
# Wildcard origins cannot be combined with credentials=True in browsers, so credentials stay off.
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
    """Return a short-lived JWT the client passes to LiveKit to join ``room_name`` as ``participant_name``."""
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")
    if not api_key or not api_secret:
        raise HTTPException(
            status_code=503,
            detail="LiveKit API credentials are not configured on the server.",
        )

    # JWT signed with API secret; grants are enforced by LiveKit server when the client connects.
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
