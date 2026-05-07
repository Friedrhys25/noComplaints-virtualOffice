"""Pydantic models for LiveKit egress webhook payloads."""

from __future__ import annotations

import re
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class LiveKitMetadata(BaseModel):
    """Custom metadata we expect to be passed alongside egress jobs."""

    meeting_id: UUID | None = None
    room_name: str | None = None
    storage_bucket: str | None = None
    object_path: str | None = None

    model_config = ConfigDict(extra="allow")


class LiveKitFileResult(BaseModel):
    """File output details for a completed egress job."""

    filename: str | None = None
    filepath: str | None = None
    location: str | None = None
    bucket: str | None = None
    object_path: str | None = None

    model_config = ConfigDict(extra="allow")


class LiveKitEgressInfo(BaseModel):
    """Partial egress info from webhook payload."""

    egress_id: str | None = Field(default=None, alias="egressId")
    room_name: str | None = None
    file_results: list[LiveKitFileResult] = Field(default_factory=list, alias="fileResults")

    model_config = ConfigDict(extra="allow", populate_by_name=True)


class LiveKitEgressWebhookPayload(BaseModel):
    """Top-level webhook payload for LiveKit events."""

    event: str
    egress_info: LiveKitEgressInfo | None = Field(default=None, alias="egressInfo")
    metadata: LiveKitMetadata | None = None
    room_name: str | None = None
    egress_id: str | None = Field(default=None, alias="egressId")

    model_config = ConfigDict(extra="allow", populate_by_name=True)

    def get_meeting_id(self) -> UUID | None:
        """Return meeting ID from metadata or object path fallback."""
        if self.metadata and self.metadata.meeting_id:
            return self.metadata.meeting_id
        pattern = re.compile(
            r"\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\b"
        )
        for candidate in self.get_candidate_object_paths():
            match = pattern.search(candidate)
            if not match:
                continue
            try:
                return UUID(match.group(0))
            except ValueError:
                continue
        return None

    def get_room_name(self) -> str | None:
        """Return room name with fallbacks."""
        if self.metadata and self.metadata.room_name:
            return self.metadata.room_name
        if self.egress_info and self.egress_info.room_name:
            return self.egress_info.room_name
        return self.room_name

    def get_egress_id(self) -> str | None:
        """Return egress ID with fallbacks."""
        if self.egress_info and self.egress_info.egress_id:
            return self.egress_info.egress_id
        return self.egress_id

    def get_candidate_object_paths(self) -> list[str]:
        """Return candidate storage object paths discovered in payload."""
        candidates: list[str] = []
        if self.metadata and self.metadata.object_path:
            candidates.append(self.metadata.object_path)

        if self.egress_info:
            for result in self.egress_info.file_results:
                for value in (result.object_path, result.filepath, result.location, result.filename):
                    if value:
                        candidates.append(value)
        # Preserve insertion order while deduplicating.
        return list(dict.fromkeys(candidates))

    def to_log_context(self) -> dict[str, Any]:
        """Return consistent contextual fields for logs."""
        return {
            "event": self.event,
            "meeting_id": str(self.get_meeting_id()) if self.get_meeting_id() else None,
            "room_name": self.get_room_name(),
            "egress_id": self.get_egress_id(),
        }
