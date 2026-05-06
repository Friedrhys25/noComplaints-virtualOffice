import TopNav from "../layout/TopNav";

type DashboardStat = {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  progress: number;
  note: string;
};

type HeadStatus = {
  name: string;
  role: string;
  initials: string;
  tone: string;
  room: string;
  state: "live" | "idle";
};

type TrendPoint = {
  label: string;
  value: number;
};

type RoomInsight = {
  name: string;
  occupancy: string;
  status: "live" | "available" | "confidential";
  load: number;
};

type AdminAction = {
  title: string;
  summary: string;
  time: string;
};

const stats: DashboardStat[] = [
  {
    label: "ACTIVE USERS",
    value: "184",
    trend: "+12%",
    trendDirection: "up",
    progress: 78,
    note: "People online across departments",
  },
  {
    label: "ACTIVE ROOMS",
    value: "12",
    trend: "+3",
    trendDirection: "up",
    progress: 64,
    note: "Rooms currently occupied",
  },
  {
    label: "TOTAL ROOMS",
    value: "24",
    trend: "+2",
    trendDirection: "up",
    progress: 92,
    note: "Configured workspaces and meeting spaces",
  },
  {
    label: "ACTIVE HEADS",
    value: "4",
    trend: "-1",
    trendDirection: "down",
    progress: 56,
    note: "Department heads live in space",
  },
];

const activityTrend: TrendPoint[] = [
  { label: "Mon", value: 48 },
  { label: "Tue", value: 66 },
  { label: "Wed", value: 72 },
  { label: "Thu", value: 58 },
  { label: "Fri", value: 88 },
  { label: "Sat", value: 51 },
];

const headStatuses: HeadStatus[] = [
  {
    name: "Maria R.",
    role: "HR Director",
    initials: "MR",
    tone: "from-blue-700 to-blue-500",
    room: "HR Head Room",
    state: "live",
  },
  {
    name: "Ryan V.",
    role: "Solutions Manager",
    initials: "RV",
    tone: "from-indigo-700 to-violet-500",
    room: "Solutions Head Room",
    state: "live",
  },
  {
    name: "Oliver T.",
    role: "Accounting Lead",
    initials: "OT",
    tone: "from-emerald-700 to-green-500",
    room: "Accounting Suite",
    state: "idle",
  },
  {
    name: "Hannah G.",
    role: "HR Operations",
    initials: "HG",
    tone: "from-pink-700 to-fuchsia-500",
    room: "People Ops Corner",
    state: "live",
  },
];

const roomInsights: RoomInsight[] = [
  { name: "HR Head Room", occupancy: "8 / 10", status: "live", load: 84 },
  { name: "Solutions Head Room", occupancy: "6 / 8", status: "available", load: 61 },
  { name: "Meeting Room 1", occupancy: "4 / 6", status: "confidential", load: 70 },
  { name: "Meeting Room 2", occupancy: "3 / 6", status: "confidential", load: 52 },
];

const actions: AdminAction[] = [
  {
    title: "Head room usage climbed this morning",
    summary: "Live leadership rooms are up compared with yesterday's first half.",
    time: "8 minutes ago",
  },
  {
    title: "Solutions zone nearing occupancy target",
    summary: "Zone A-2 has strongest attendance curve today and lowest idle gap.",
    time: "21 minutes ago",
  },
  {
    title: "Accounting meeting rooms remain private",
    summary: "Confidential spaces are healthy but under 75% capacity.",
    time: "42 minutes ago",
  },
];

export default function DashboardPage() {
  return (
    <main className="admin-dashboard-theme min-h-screen bg-(--admin-bg) text-(--admin-text-primary)">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <TopNav />

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 2xl:max-w-375">
          <div className="space-y-10">
            <header className="rounded-[30px] border border-[rgba(72,95,201,0.42)] bg-[linear-gradient(180deg,rgba(25,30,52,0.92)_0%,rgba(20,24,40,0.92)_100%)] px-7 py-8 shadow-[0_0_50px_-28px_rgba(99,102,241,0.65)]">
              <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p
                    className="text-sm font-bold uppercase tracking-[0.18em] text-(--admin-accent-soft)"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Command Center
                  </p>
                  <h1
                    className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Dashboard
                  </h1>
                  <p className="mt-5 text-lg leading-8 text-(--admin-text-secondary)">
                    Live view of people, rooms, leadership activity, and operational movement across the VirtualOffice floor.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 xl:min-w-[24rem]">
                  <HeroBadge label="Peak Usage" value="88%" />
                  <HeroBadge label="Live Heads" value="3 / 4" />
                  <HeroBadge label="Avg. Session" value="42m" />
                </div>
              </div>
            </header>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
              <AnalyticsCard />
              <HeadsOverviewCard />
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <RoomHealthCard />
              <AdminActionsCard />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function HeroBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(11,14,24,0.55)] px-4 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tighter text-white">{value}</p>
    </div>
  );
}

function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <article className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-32 text-xs font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
          {stat.label}
        </p>
        <div
          className={`inline-flex items-center gap-1 text-xs font-bold ${
            stat.trendDirection === "up" ? "text-(--admin-success)" : "text-(--admin-danger)"
          }`}
        >
          <TrendArrow direction={stat.trendDirection} />
          {stat.trend}
        </div>
      </div>

      <p className="mt-5 text-[2.65rem] font-bold tracking-tighter text-white">{stat.value}</p>
      <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">{stat.note}</p>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-(--admin-progress-track)">
        <div
          className="h-full rounded-full bg-(--admin-accent-soft)"
          style={{ width: `${stat.progress}%` }}
        />
      </div>
    </article>
  );
}

function AnalyticsCard() {
  const maxValue = Math.max(...activityTrend.map((point) => point.value));

  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[2rem] font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Analytics
          </h2>
          <p className="mt-2 text-base text-(--admin-text-secondary)">
            Weekly room activity and user presence trend.
          </p>
        </div>
        <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-xl text-(--admin-accent-soft)">
          Weekly
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-[26px] border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-6 py-6">
          <div className="flex h-60 items-end gap-4">
            {activityTrend.map((point) => (
              <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end">
                  <div
                    className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#7c83ff_0%,#4f46e5_100%)] shadow-[0_12px_32px_-18px_rgba(99,102,241,0.75)]"
                    style={{ height: `${(point.value / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-(--admin-text-secondary)">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <MiniMetric label="Peak active users" value="184" detail="Friday at 11:20" />
          <MiniMetric label="Room saturation" value="64%" detail="12 of 24 rooms active" />
          <MiniMetric label="Head participation" value="75%" detail="3 leaders currently live" />
        </div>
      </div>
    </section>
  );
}

function HeadsOverviewCard() {
  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[2rem] font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Active Heads
          </h2>
          <p className="mt-2 text-base text-(--admin-text-secondary)">
            Current leadership presence inside live spaces.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl border border-[rgba(62,231,121,0.32)] bg-[rgba(19,78,46,0.24)] px-4 py-2 text-lg text-[#3ee779]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3ee779]" />
          Live
        </span>
      </div>

      <div className="mt-8 space-y-4">
        {headStatuses.map((head) => (
          <div
            key={head.name}
            className="flex items-center justify-between gap-4 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-4 py-4"
          >
            <div className="flex items-center gap-4">
              <AvatarCircle person={head} />
              <div>
                <p className="text-lg font-bold text-white">{head.name}</p>
                <p className="text-sm text-(--admin-text-secondary)">{head.role}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-(--admin-accent-soft)">{head.room}</p>
              <p
                className={`mt-1 text-sm ${
                  head.state === "live" ? "text-(--admin-success)" : "text-(--admin-text-muted)"
                }`}
              >
                {head.state === "live" ? "Live now" : "Idle"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoomHealthCard() {
  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-[2rem] font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Room Health
          </h2>
          <p className="mt-2 text-base text-(--admin-text-secondary)">
            Occupancy and privacy status across key spaces.
          </p>
        </div>
        <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-xl text-(--admin-accent-soft)">
          Live Board
        </span>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {roomInsights.map((room) => (
          <div
            key={room.name}
            className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-white">{room.name}</p>
                <p className="mt-1 text-sm text-(--admin-text-secondary)">
                  Occupancy {room.occupancy}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                  room.status === "live"
                    ? "bg-[rgba(19,78,46,0.28)] text-[#3ee779]"
                    : room.status === "confidential"
                      ? "bg-[rgba(127,29,29,0.25)] text-[#fb7185]"
                      : "bg-[rgba(30,41,59,0.65)] text-(--admin-text-secondary)"
                }`}
              >
                {room.status}
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-(--admin-progress-track)">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#7c83ff_0%,#4f46e5_100%)]"
                style={{ width: `${room.load}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdminActionsCard() {
  return (
    <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
      <div>
        <h2
          className="text-[2rem] font-bold tracking-tighter text-white"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Admin Signals
        </h2>
        <p className="mt-2 text-base text-(--admin-text-secondary)">
          Suggested actions and key movement from the workspace.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5"
          >
            <p className="text-lg font-bold text-white">{action.title}</p>
            <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">
              {action.summary}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-(--admin-text-muted)">
              {action.time}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniMetric({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tighter text-white">{value}</p>
      <p className="mt-2 text-sm text-(--admin-text-secondary)">{detail}</p>
    </div>
  );
}

function AvatarCircle({ person }: { person: HeadStatus }) {
  return (
    <div className="relative inline-flex">
      <div
        className={`grid h-14 w-14 place-items-center rounded-full bg-linear-to-br ${person.tone} text-lg font-bold text-white shadow-[0_10px_25px_-10px_rgba(0,0,0,0.5)]`}
        style={{ fontFamily: "var(--font-brand)" }}
      >
        {person.initials}
      </div>
      <span
        className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] border-[rgba(20,24,40,0.95)] ${
          person.state === "live" ? "bg-[#31d97c]" : "bg-[#9ca3af]"
        }`}
      />
    </div>
  );
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return direction === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />;
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="m6 14 6-6 6 6M12 8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path
        d="m6 10 6 6 6-6M12 16V8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
