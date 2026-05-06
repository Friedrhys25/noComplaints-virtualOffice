"use client";

import { useState } from "react";
import TopNav from "../layout/TopNav";

// ─── Types ────────────────────────────────────────────────────────────────────

type Person = {
  initials: string;
  name: string;
  gradient: string;
  status: "online" | "busy" | "away";
  role?: string;
};

type DepartmentRoom = {
  title: string;
  zone: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  manager: Person;
  members: Person[];
};

type MeetingRoom = {
  name: string;
  state: "live" | "confidential" | "open";
  attendees: number;
  duration: string;
  avatars: Pick<Person, "initials" | "gradient">[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const orgHead: Person = {
  initials: "MR",
  name: "Maria R.",
  gradient: "from-blue-700 to-blue-500",
  status: "online",
  role: "HR Director",
};

const orgMembers: Person[] = [
  { initials: "JL", name: "James L.",  gradient: "from-teal-700 to-teal-500",    status: "online" },
  { initials: "SA", name: "Sofia A.",  gradient: "from-pink-700 to-pink-500",    status: "busy"   },
  { initials: "KP", name: "Kevin P.",  gradient: "from-amber-700 to-amber-500",  status: "online" },
  { initials: "LN", name: "Lena N.",   gradient: "from-violet-700 to-violet-500",status: "away"   },
  { initials: "BW", name: "Brian W.",  gradient: "from-emerald-700 to-emerald-500", status: "online" },
  { initials: "CK", name: "Clara K.",  gradient: "from-red-700 to-red-500",      status: "busy"   },
];

const departments: DepartmentRoom[] = [
  {
    title: "HR Department",
    zone: "Zone A-1",
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/30",
    manager: orgHead,
    members: orgMembers,
  },
  {
    title: "Solutions Department",
    zone: "Zone A-2",
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/30",
    manager: {
      initials: "RV",
      name: "Ryan V.",
      gradient: "from-indigo-700 to-violet-500",
      status: "online",
      role: "Manager",
    },
    members: [
      { initials: "DT", name: "Diana T.",  gradient: "from-teal-700 to-teal-500",    status: "online" },
      { initials: "NB", name: "Nina B.",   gradient: "from-amber-700 to-orange-500", status: "online" },
      { initials: "TM", name: "Thomas M.", gradient: "from-pink-700 to-fuchsia-500", status: "away"   },
      { initials: "OL", name: "Olivia L.", gradient: "from-green-700 to-emerald-500",status: "busy"   },
      { initials: "AS", name: "Andre S.",  gradient: "from-violet-700 to-purple-500",status: "online" },
      { initials: "PT", name: "Petra T.",  gradient: "from-red-700 to-rose-500",     status: "online" },
    ],
  },
];

const meetingRooms: MeetingRoom[] = [
  {
    name: "HR Head Room",
    state: "live",
    attendees: 8,
    duration: "Live Now",
    avatars: [
      { initials: "MR", gradient: "from-blue-700 to-blue-500" },
      { initials: "JL", gradient: "from-teal-700 to-teal-500" },
      { initials: "SA", gradient: "from-pink-700 to-pink-500" },
    ],
  },
  {
    name: "Solutions Head Room",
    state: "open",
    attendees: 6,
    duration: "Open Space",
    avatars: [
      { initials: "RV", gradient: "from-indigo-700 to-violet-500" },
      { initials: "DT", gradient: "from-teal-700 to-teal-500" },
      { initials: "NB", gradient: "from-amber-700 to-orange-500" },
    ],
  },
  {
    name: "Meeting Room 1",
    state: "confidential",
    attendees: 4,
    duration: "42 min",
    avatars: [
      { initials: "MR", gradient: "from-blue-700 to-blue-500" },
      { initials: "JL", gradient: "from-teal-700 to-teal-500" },
    ],
  },
  {
    name: "Meeting Room 2",
    state: "confidential",
    attendees: 3,
    duration: "18 min",
    avatars: [
      { initials: "LN", gradient: "from-violet-700 to-violet-500" },
      { initials: "BW", gradient: "from-emerald-700 to-emerald-500" },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoomsBoard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <main className="admin-dashboard-theme min-h-screen bg-(--admin-bg) text-(--admin-text-primary)">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <TopNav />

        <section className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 2xl:max-w-375">
          <div className="space-y-8">

            {/* ── Hero Header ──────────────────────────────────────────────── */}
            <header className="rounded-2xl border border-[rgba(72,95,201,0.38)] bg-[linear-gradient(180deg,rgba(25,30,52,0.92)_0%,rgba(20,24,40,0.92)_100%)] px-7 py-7">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-xl">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-(--admin-accent-soft)">
                    Spatial Operations
                  </p>
                  <h1
                    className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Rooms
                  </h1>
                  <p className="mt-3 text-sm leading-6 text-(--admin-text-secondary)">
                    Monitor leadership rooms, department zones, and meeting spaces in real time.
                  </p>
                </div>
                <div className="space-y-3 xl:min-w-80">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full rounded-lg border border-[rgba(99,102,241,0.38)] bg-[rgba(99,102,241,0.14)] px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-(--admin-accent-soft) transition-colors hover:border-[rgba(99,102,241,0.65)] hover:bg-[rgba(99,102,241,0.2)] hover:text-white"
                  >
                    + Create New
                  </button>
                  <div className="grid grid-cols-4 gap-3">
                    <StatBadge label="Live Rooms" value="12" />
                    <StatBadge label="Head Zones" value="4" />
                    <StatBadge label="Confidential" value="2" />
                    <StatBadge label="Peak Load" value="84%" />
                  </div>
                </div>
              </div>
            </header>

            {/* ── Overview row ─────────────────────────────────────────────── */}
            <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <OverviewCard label="Active Head Room" value="HR Head"  note="Highest occupancy right now" />
              <OverviewCard label="Department Zones" value="2"        note="HR and Solutions live below" />
              <OverviewCard label="Meeting Spaces"   value="4"        note="Visible rooms in floor view" />
              <OverviewCard label="People Live"      value="17"       note="Across all listed rooms" />
            </section>

            {/* ── Org Head ─────────────────────────────────────────────────── */}
            <SectionLabel>Organization Head</SectionLabel>

            <OrgHeadCard person={orgHead} members={orgMembers} />

            {/* ── Main + Sidebar ───────────────────────────────────────────── */}
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

              {/* left column */}
              <div className="space-y-8">

                <SectionLabel>Departments</SectionLabel>
                <div className="grid gap-4 xl:grid-cols-2">
                  {departments.map((dept) => (
                    <DepartmentCard key={dept.title} room={dept} />
                  ))}
                </div>

                <SectionLabel>Head Rooms &amp; Meeting Spaces</SectionLabel>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {meetingRooms.map((room) => (
                    <MeetingSpaceCard key={room.name} room={room} />
                  ))}
                </div>
              </div>

              {/* sidebar */}
              <aside className="space-y-4">
                <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(22,26,36,0.95)] px-5 py-5">
                  <h2 className="mb-4 text-sm font-semibold tracking-tight text-white">Room Signals</h2>
                  <div className="space-y-3">
                    <SignalCard color="bg-emerald-500" title="HR zone running hot"        detail="Most avatars concentrated in leadership space." />
                    <SignalCard color="bg-blue-400"    title="Solutions room stable"       detail="Consistent attendance with lower idle turnover." />
                    <SignalCard color="bg-rose-500"    title="Confidential rooms active"   detail="Two private rooms currently occupied." />
                  </div>
                </div>

                <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(22,26,36,0.95)] px-5 py-5">
                  <h2 className="mb-4 text-sm font-semibold tracking-tight text-white">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {["Join Head Room", "View Floor", "Mute Room", "Export Snapshot"].map((action) => (
                      <button
                        key={action}
                        type="button"
                        className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(11,14,24,0.5)] px-3 py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-(--admin-text-secondary) transition-colors hover:border-[rgba(99,102,241,0.4)] hover:text-white"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {isCreateModalOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(5,8,16,0.74)] px-5 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-[rgba(72,95,201,0.38)] bg-[linear-gradient(180deg,rgba(25,30,52,0.98)_0%,rgba(20,24,40,0.98)_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(99,102,241,0.7)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-(--admin-accent-soft)">
                    Create New
                  </p>
                  <h2
                    className="mt-3 text-3xl font-bold tracking-tight text-white"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Choose Room Type
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">
                    Pick what kind of space you want to create next.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  aria-label="Close create new modal"
                  className="rounded-full p-2 text-(--admin-text-muted) transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    title: "Department",
                    detail: "Create a zoned department area with manager and member seats.",
                  },
                  {
                    title: "Meeting",
                    detail: "Create a standard meeting room for team syncs and private calls.",
                  },
                  {
                    title: "Heads Room",
                    detail: "Create a leadership room for department heads and key decision makers.",
                  },
                ].map((option) => (
                  <button
                    key={option.title}
                    type="button"
                    className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(11,14,24,0.55)] px-4 py-5 text-left transition-colors hover:border-[rgba(99,102,241,0.48)] hover:bg-[rgba(99,102,241,0.1)]"
                  >
                    <p className="text-base font-semibold text-white">{option.title}</p>
                    <p className="mt-2 text-xs leading-5 text-(--admin-text-secondary)">
                      {option.detail}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-lg border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm text-(--admin-text-secondary) transition-colors hover:border-[rgba(99,102,241,0.38)] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[rgba(106,116,154,0.7)]">
      {children}
    </p>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(11,14,24,0.55)] px-3 py-3">
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-(--admin-text-muted)">{label}</p>
      <p className="mt-2 text-xl font-bold tracking-tight text-white">{value}</p>
    </div>
  );
}

function OverviewCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(22,26,36,0.95)] p-5">
      <p className="font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-(--admin-text-muted)">{label}</p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1.5 text-xs leading-5 text-(--admin-text-secondary)">{note}</p>
    </div>
  );
}

function SignalCard({ color, title, detail }: { color: string; title: string; detail: string }) {
  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.45)] px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className={`h-1.5 w-1.5 rounded-sm ${color} shrink-0`} />
        <p className="text-xs font-semibold text-white">{title}</p>
      </div>
      <p className="pl-3.5 text-[11px] leading-5 text-(--admin-text-secondary)">{detail}</p>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

type AvatarSize = "xs" | "sm" | "md" | "lg";

const avatarSizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[9px] rounded",
  sm: "h-7 w-7 text-[10px] rounded",
  md: "h-8 w-8 text-[11px] rounded-md",
  lg: "h-10 w-10 text-[13px] rounded-md",
};

const statusDot: Record<Person["status"], string> = {
  online: "bg-emerald-400",
  busy:   "bg-amber-400",
  away:   "bg-slate-500",
};

function Avatar({ person, size = "md" }: { person: Person; size?: AvatarSize }) {
  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`grid place-items-center bg-linear-to-br ${person.gradient} font-mono font-semibold text-white ${avatarSizes[size]}`}
      >
        {person.initials}
      </div>
      <span
        className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-[1.5px] border-[rgba(14,17,27,0.95)] ${statusDot[person.status]}`}
      />
    </div>
  );
}

// ─── Floor Plan (2D top-down room view) ───────────────────────────────────────

/**
 * Renders a tiny 2D isometric-free top-down room blueprint.
 * Seats are colored squares; filled = occupied.
 */
function FloorPlan({
  occupied,
  accentClass,
  layout = "conference",
}: {
  occupied: number;
  accentClass: string;         // Tailwind bg color for active seats
  layout?: "conference" | "desks" | "small";
}) {
  let seatIdx = 0;

  return (
    <div className="relative overflow-hidden rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(10,13,22,0.7)]"
         style={{ height: layout === "small" ? 68 : 80 }}>
      {/* blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* room label */}
      <span className="absolute left-2 top-1.5 font-mono text-[7px] uppercase tracking-widest text-[rgba(148,163,184,0.35)]">
        {layout === "desks" ? "dept" : layout === "small" ? "room" : "conf"}
      </span>

      {/* door notch */}
      <span className="absolute bottom-1.5 right-2 font-mono text-[7px] text-[rgba(148,163,184,0.3)]">▶ door</span>

      {/* seats */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-x-${layout === "desks" ? "3" : "2"}`}
      >
        {layout === "conference" && (
          /* conference table */
          <div className="relative">
            {/* table */}
            <div className="mx-auto h-6 w-28 rounded-sm border border-[rgba(148,163,184,0.18)] bg-[rgba(30,35,50,0.9)]" />
            {/* seats top row */}
            <div className="absolute -top-4 left-0 flex w-full justify-around">
              {Array.from({ length: 4 }).map((_, i) => {
                const active = seatIdx++ < occupied;
                return (
                  <span
                    key={`t${i}`}
                    className={`h-2.5 w-2.5 rounded-sm border transition-colors ${
                      active
                        ? `${accentClass} border-transparent opacity-80`
                        : "border-[rgba(148,163,184,0.2)] bg-[rgba(30,35,50,0.6)]"
                    }`}
                  />
                );
              })}
            </div>
            {/* seats bottom row */}
            <div className="absolute -bottom-4 left-0 flex w-full justify-around">
              {Array.from({ length: 4 }).map((_, i) => {
                const active = seatIdx++ < occupied;
                return (
                  <span
                    key={`b${i}`}
                    className={`h-2.5 w-2.5 rounded-sm border transition-colors ${
                      active
                        ? `${accentClass} border-transparent opacity-80`
                        : "border-[rgba(148,163,184,0.2)] bg-[rgba(30,35,50,0.6)]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {layout === "desks" && (
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => {
              const active = i < occupied;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  {/* desk */}
                  <div className="h-5 w-8 rounded-sm border border-[rgba(148,163,184,0.15)] bg-[rgba(30,35,50,0.9)]" />
                  {/* seat */}
                  <span
                    className={`h-2 w-2 rounded-sm border ${
                      active
                        ? `${accentClass} border-transparent opacity-80`
                        : "border-[rgba(148,163,184,0.2)] bg-[rgba(30,35,50,0.6)]"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}

        {layout === "small" && (
          <div className="relative">
            <div className="mx-auto h-5 w-16 rounded-sm border border-[rgba(148,163,184,0.18)] bg-[rgba(30,35,50,0.9)]" />
            <div className="absolute -top-3.5 left-0 flex w-full justify-around">
              {Array.from({ length: 2 }).map((_, i) => {
                const active = seatIdx++ < occupied;
                return (
                  <span
                    key={`t${i}`}
                    className={`h-2 w-2 rounded-sm border ${
                      active
                        ? `${accentClass} border-transparent opacity-80`
                        : "border-[rgba(148,163,184,0.2)] bg-[rgba(30,35,50,0.6)]"
                    }`}
                  />
                );
              })}
            </div>
            <div className="absolute -bottom-3.5 left-0 flex w-full justify-around">
              {Array.from({ length: 2 }).map((_, i) => {
                const active = seatIdx++ < occupied;
                return (
                  <span
                    key={`b${i}`}
                    className={`h-2 w-2 rounded-sm border ${
                      active
                        ? `${accentClass} border-transparent opacity-80`
                        : "border-[rgba(148,163,184,0.2)] bg-[rgba(30,35,50,0.6)]"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Status pill ──────────────────────────────────────────────────────────────

function StatePill({ state }: { state: MeetingRoom["state"] }) {
  if (state === "live")
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
    );
  if (state === "confidential")
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-rose-400">
        <span className="h-1.5 w-1.5 rounded-sm bg-rose-400" />
        Conf
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-blue-400">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      Open
    </span>
  );
}

// ─── Occupation bar ───────────────────────────────────────────────────────────

function OccBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="mt-3 h-0.75 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
      <div
        className={`h-full rounded-full ${color} transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Room card wrapper ────────────────────────────────────────────────────────

function RoomCard({
  accentTop,
  children,
  className = "",
}: {
  accentTop: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(18,22,34,0.95)] ${className}`}
    >
      {/* top accent stripe */}
      <div className={`h-0.5 w-full ${accentTop}`} />
      {/* bottom-right corner tick */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[rgba(255,255,255,0.1)] rounded-br-xl" />
      <div className="px-4 pb-4 pt-3">{children}</div>
    </div>
  );
}

// ─── Org Head Card ────────────────────────────────────────────────────────────

function OrgHeadCard({ person, members }: { person: Person; members: Person[] }) {
  return (
    <RoomCard accentTop="bg-emerald-500">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold tracking-tight text-white">Human Resource Head</p>
          <p className="mt-0.5 text-xs text-(--admin-text-secondary)">
            Primary live leadership room · direct drag-and-join
          </p>
        </div>
        <StatePill state="live" />
      </div>

      {/* floor plan */}
      <div className="mt-3">
        <FloorPlan occupied={7} accentClass="bg-emerald-500" layout="conference" />
      </div>

      {/* people strip */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <Avatar person={person} size="lg" />
          <div>
            <p className="text-xs font-semibold text-white">{person.name}</p>
            <p className="font-mono text-[9px] text-emerald-400">{person.role}</p>
          </div>
        </div>
        <div className="h-6 w-px bg-[rgba(255,255,255,0.1)]" />
        <div className="flex flex-wrap gap-1.5">
          {members.map((m) => (
            <Avatar key={m.initials} person={m} size="sm" />
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[10px] text-[rgba(148,163,184,0.4)]">
          Drag your avatar into a room to join
        </p>
        <button
          type="button"
          className="rounded border border-[rgba(255,255,255,0.09)] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-(--admin-text-secondary) transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
        >
          View Space
        </button>
      </div>
      <OccBar pct={88} color="bg-emerald-500" />
    </RoomCard>
  );
}

// ─── Department Card ──────────────────────────────────────────────────────────

function DepartmentCard({ room }: { room: DepartmentRoom }) {
  const accentTopMap: Record<string, string> = {
    "text-blue-400":   "bg-blue-500",
    "text-violet-400": "bg-violet-500",
  };
  const occBarMap: Record<string, string> = {
    "text-blue-400":   "bg-blue-500",
    "text-violet-400": "bg-violet-500",
  };
  const occupied = room.members.filter(
    (m) => m.status === "online" || m.status === "busy"
  ).length;
  const pct = Math.round((occupied / room.members.length) * 100);

  return (
    <RoomCard accentTop={accentTopMap[room.accent] ?? "bg-slate-500"}>
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold tracking-tight text-white">{room.title}</p>
          <p className={`font-mono text-[9px] uppercase tracking-widest ${room.accent} mt-0.5`}>
            {room.zone}
          </p>
        </div>
        <span
          className={`shrink-0 rounded border ${room.accentBorder} ${room.accentBg} px-2 py-0.5 font-mono text-[9px] ${room.accent}`}
        >
          {room.zone}
        </span>
      </div>

      {/* floor plan */}
      <div className="mt-3">
        <FloorPlan
          occupied={occupied}
          accentClass={accentTopMap[room.accent] ?? "bg-slate-500"}
          layout="desks"
        />
      </div>

      {/* manager + members */}
      <div className="mt-3 flex items-center gap-2.5">
        <Avatar person={room.manager} size="lg" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white">{room.manager.name}</p>
          <p className="font-mono text-[9px] text-(--admin-text-muted)">Manager</p>
        </div>
        <div className="ml-auto h-5 w-px bg-[rgba(255,255,255,0.08)]" />
        <div className="flex gap-1">
          {room.members.map((m) => (
            <Avatar key={m.initials} person={m} size="xs" />
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="mt-3 flex items-center justify-between">
        <p className="font-mono text-[10px] text-(--admin-text-muted)">
          {occupied} / {room.members.length} occupied
        </p>
        <button
          type="button"
          className={`rounded border border-[rgba(255,255,255,0.09)] px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-(--admin-text-secondary) transition-colors hover:${room.accentBorder} hover:${room.accent}`}
        >
          View
        </button>
      </div>
      <OccBar pct={pct} color={occBarMap[room.accent] ?? "bg-slate-500"} />
    </RoomCard>
  );
}

// ─── Meeting Space Card ───────────────────────────────────────────────────────

function MeetingSpaceCard({ room }: { room: MeetingRoom }) {
  const isConf = room.state === "confidential";
  const accentTop =
    room.state === "live"        ? "bg-emerald-500" :
    room.state === "confidential"? "bg-rose-500"    : "bg-blue-500";
  const occBarColor =
    room.state === "live"        ? "bg-emerald-500" :
    room.state === "confidential"? "bg-rose-500"    : "bg-blue-500";
  const accentSeatClass =
    room.state === "live"        ? "bg-emerald-500" :
    room.state === "confidential"? "bg-rose-500"    : "bg-blue-500";
  const maxSeats = 4;
  const pct = Math.round((room.attendees / (maxSeats * 2)) * 100);

  return (
    <RoomCard accentTop={accentTop}>
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold leading-snug tracking-tight text-white">{room.name}</p>
        <StatePill state={room.state} />
      </div>

      {/* floor plan */}
      <div className="mt-2">
        <FloorPlan occupied={room.attendees} accentClass={accentSeatClass} layout="small" />
      </div>

      {/* avatars + info */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex -space-x-1.5">
          {room.avatars.map((av) => (
            <div
              key={av.initials}
              className={`grid h-6 w-6 shrink-0 place-items-center rounded bg-linear-to-br ${av.gradient} font-mono text-[8px] font-bold text-white ring-[1.5px] ring-[rgba(14,17,27,0.95)]`}
            >
              {av.initials}
            </div>
          ))}
          {room.attendees > room.avatars.length && (
            <div className="grid h-6 w-6 shrink-0 place-items-center rounded bg-[rgba(30,36,52,0.9)] font-mono text-[8px] text-[rgba(148,163,184,0.6)] ring-[1.5px] ring-[rgba(14,17,27,0.95)]">
              +{room.attendees - room.avatars.length}
            </div>
          )}
        </div>
        <p className="font-mono text-[9px] text-(--admin-text-muted)">
          {room.attendees} · {room.duration}
        </p>
      </div>

      {/* action */}
      <div className="mt-3">
        {isConf ? (
          <button
            type="button"
            disabled
            className="w-full rounded border border-[rgba(255,255,255,0.05)] bg-transparent py-1.5 font-mono text-[9px] font-medium uppercase tracking-wider text-[rgba(148,163,184,0.3)] cursor-not-allowed"
          >
            Locked
          </button>
        ) : (
          <button
            type="button"
            className="w-full rounded border border-[rgba(255,255,255,0.09)] bg-transparent py-1.5 font-mono text-[9px] font-medium uppercase tracking-wider text-(--admin-text-secondary) transition-colors hover:border-[rgba(99,102,241,0.4)] hover:text-white"
          >
            Join Space
          </button>
        )}
      </div>
      <OccBar pct={Math.min(pct, 100)} color={occBarColor} />
    </RoomCard>
  );
}
