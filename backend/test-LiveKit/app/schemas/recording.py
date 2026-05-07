"""Schemas for recording control APIs."""

from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class StartRecordingRequest(BaseModel):
    """Request body to start recording a room."""

    room_name: str = Field(min_length=1)
    meeting_id: UUID

    model_config = ConfigDict(extra="forbid")


class StartRecordingResponse(BaseModel):
    """API response for successful recording start."""

    status: str
    egress_id: str
    room_name: str
    meeting_id: UUID


class StopRecordingRequest(BaseModel):
    """Request body to stop an active egress."""

    egress_id: str = Field(min_length=1)

    model_config = ConfigDict(extra="forbid")


class StopRecordingResponse(BaseModel):
    """API response for successful recording stop."""

    status: str
    egress_id: str
