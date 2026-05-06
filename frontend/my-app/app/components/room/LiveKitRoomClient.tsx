"use client";

import { FormEvent, useMemo, useState } from "react";
import { LiveKitRoom, RoomAudioRenderer, VideoConference } from "@livekit/components-react";

type TokenResponse = {
  token?: string;
  detail?: string;
};

const DEFAULT_ROOM = "virtualoffice-demo";

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export default function LiveKitRoomClient() {
  const [roomName, setRoomName] = useState(DEFAULT_ROOM);
  const [participantName, setParticipantName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const liveKitUrl = useMemo(
    () => (process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "").trim(),
    [],
  );
  const tokenApiBase = useMemo(
    () => normalizeUrl((process.env.NEXT_PUBLIC_TOKEN_API_URL ?? "http://localhost:8000").trim()),
    [],
  );

  const leaveRoom = () => {
    setToken(null);
    setStatusMessage("Disconnected from room.");
    setError(null);
  };

  async function joinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = participantName.trim();
    const trimmedRoom = roomName.trim();

    if (!trimmedName || !trimmedRoom) {
      setError("Participant name and room are required.");
      return;
    }

    if (!liveKitUrl) {
      setError("Missing NEXT_PUBLIC_LIVEKIT_URL in env.local.");
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      setStatusMessage("Requesting access token...");

      const response = await fetch(
        `${tokenApiBase}/get-token?room_name=${encodeURIComponent(trimmedRoom)}&participant_name=${encodeURIComponent(trimmedName)}`,
      );

      let payload: TokenResponse = {};
      try {
        payload = (await response.json()) as TokenResponse;
      } catch {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(payload.detail ?? "Failed to request a LiveKit token.");
      }

      if (!payload.token) {
        throw new Error("Token API returned no token.");
      }

      setToken(payload.token);
      setStatusMessage(`Connected as ${trimmedName} in ${trimmedRoom}.`);
    } catch (connectError) {
      const message =
        connectError instanceof Error ? connectError.message : "Could not connect to LiveKit.";
      setError(message);
      setStatusMessage(null);
      setToken(null);
    } finally {
      setIsConnecting(false);
    }
  }

  return (
    <main className="vo-shell vo-grid min-h-screen px-5 pb-10 pt-24 sm:px-8">
      <section className="mx-auto w-full max-w-7xl space-y-6">
        <header className="vo-card rounded-2xl p-6">
          <p className="font-(--font-ui-mono) text-xs uppercase tracking-[0.2em] text-(--accent)">
            LiveKit WebRTC
          </p>
          <h1 className="mt-2 font-(--font-serif) text-4xl leading-tight tracking-[-0.03em] text-white">
            Join a real-time room
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-(--text-secondary)">
            Connect your camera and microphone using LiveKit with JWT tokens from your FastAPI
            backend.
          </p>
        </header>

        {!token ? (
          <form onSubmit={joinRoom} className="vo-card grid gap-5 rounded-2xl p-6 md:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--text-secondary)">Room</span>
              <input
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                className="h-11 w-full rounded-xl border border-(--border-base) bg-[rgba(15,23,42,0.45)] px-4 text-sm text-white focus:border-(--accent) focus:outline-none"
                placeholder="virtualoffice-demo"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--text-secondary)">
                Participant name
              </span>
              <input
                value={participantName}
                onChange={(event) => setParticipantName(event.target.value)}
                className="h-11 w-full rounded-xl border border-(--border-base) bg-[rgba(15,23,42,0.45)] px-4 text-sm text-white focus:border-(--accent) focus:outline-none"
                placeholder="Juan Dela Cruz"
              />
            </label>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isConnecting}
                className="vo-button-primary h-11 w-full rounded-xl font-(--font-brand) text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isConnecting ? "Connecting..." : "Join room"}
              </button>
            </div>
          </form>
        ) : (
          <section className="space-y-4">
            <div className="vo-card flex items-center justify-between gap-4 rounded-2xl p-4">
              <p className="text-sm text-(--text-secondary)">
                Camera and microphone are enabled. Ask a teammate to join the same room to test
                remote streams.
              </p>
              <button
                type="button"
                onClick={leaveRoom}
                className="rounded-lg border border-(--border-base) px-4 py-2 text-sm font-semibold text-(--text-secondary) hover:bg-[rgba(7,57,60,0.25)] hover:text-white"
              >
                Leave room
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-(--border-base)">
              <LiveKitRoom
                token={token}
                serverUrl={liveKitUrl}
                connect={true}
                video={true}
                audio={true}
                onMediaDeviceFailure={(deviceFailure) => {
                  setError(`Media device error: ${deviceFailure}`);
                }}
                onDisconnected={() => {
                  setToken(null);
                  setStatusMessage("Disconnected from room.");
                }}
                onError={(liveKitError) => {
                  setError(liveKitError.message);
                }}
                className="h-[70vh]"
              >
                <VideoConference />
                <RoomAudioRenderer />
              </LiveKitRoom>
            </div>
          </section>
        )}

        {statusMessage ? (
          <p className="text-sm font-medium text-emerald-300" role="status">
            {statusMessage}
          </p>
        ) : null}
        {error ? (
          <p className="text-sm font-medium text-rose-300" role="alert">
            {error}
          </p>
        ) : null}
      </section>
    </main>
  );
}
