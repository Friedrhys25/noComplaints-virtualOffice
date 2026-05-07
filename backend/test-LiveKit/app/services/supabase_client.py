"""Supabase client helpers."""

from __future__ import annotations

import os

from supabase import Client, create_client


def get_supabase_client() -> Client:
    """Return a configured Supabase client using service role credentials."""
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_service_key = os.getenv("SUPABASE_SERVICE_KEY")

    if not supabase_url or not supabase_service_key:
        raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be configured.")

    return create_client(supabase_url, supabase_service_key)
