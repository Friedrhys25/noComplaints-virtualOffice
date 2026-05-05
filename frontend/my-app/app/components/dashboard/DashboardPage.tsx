import type { ReactNode } from "react";
import TopNav from "../layout/TopNav";

type Stat = {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  progress: number;
};

type Activity = {
  name: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
  statusColor: string;
  attachments?: string[];
  collaborators?: string[];
};

const stats: Stat[] = [
  { label: "ACTIVE USERS", value: "2,842", trend: "12%", trendDirection: "up", progress: 75 },
  { label: "ONGOING ROOMS", value: "128", trend: "5%", trendDirection: "up", progress: 50 },
  { label: "TEAM PERFORMANCE", value: "94.8%", trend: "2%", trendDirection: "down", progress: 91.66 },
  { label: "AVG. SESSION", value: "42m", trend: "24%", trendDirection: "up", progress: 39.99 },
];

const activityItems: Activity[] = [
  {
    name: "Sarah Jenkins",
    action: "updated project design in",
    target: "Design Systems Space",
    timestamp: "2 minutes ago",
    avatar: "SJ",
    statusColor: "var(--admin-success)",
  },
  {
    name: "Marcus Thorne",
    action: "started new huddle in",
    target: "Sprint Planning Room",
    timestamp: "15 minutes ago",
    avatar: "MT",
    statusColor: "#f59e0b",
    collaborators: ["AL", "RK", "+3"],
  },
  {
    name: "Elena Rossi",
    action: "uploaded 4 files to",
    target: "Project Phoenix / Assets",
    timestamp: "1 hour ago",
    avatar: "ER",
    statusColor: "#38bdf8",
    attachments: ["PDF", "DOC", "XLS"],
  },
];

const shortcuts = [
  { label: "New Space", icon: <PlusCircleIcon /> },
  { label: "Quick Meet", icon: <VideoIcon /> },
  { label: "Invite Team", icon: <ShareIcon /> },
  { label: "Reports", icon: <ChartIcon /> },
];

export default function DashboardPage() {
  return (
    <main className="admin-dashboard-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-primary)]">
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <TopNav />

        <div className="pl-0 pt-16 lg:pl-60">
          <section className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 sm:px-8 lg:px-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div className="space-y-8">
                <header className="space-y-1">
                  <p className="font-[var(--font-serif)] text-[3rem] leading-[1.05] tracking-[-0.04em] text-[var(--admin-text-primary)] sm:text-[3.35rem]">
                    Dashboard
                  </p>
                  <p className="text-base leading-8 text-[var(--admin-text-secondary)] sm:text-lg">
                    Welcome back, Alex. Your workspace is currently 84% active.
                  </p>
                </header>

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                  ))}
                </section>

                <ActivityFeedCard items={activityItems} />
              </div>

              <aside className="space-y-4 xl:pt-[8.9rem]">
                <WorkspacePulseCard />
                <UpgradeCard />
                <ShortcutsCard />
              </aside>
            </div>
          </section>
        </div>

        <button
          type="button"
          aria-label="Create new workspace item"
          className="admin-fab fixed bottom-8 right-8 z-20 grid h-14 w-14 place-items-center rounded-full bg-[var(--admin-accent)] text-white"
        >
          <PlusIcon />
        </button>
      </div>
    </main>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <article className="admin-panel rounded-xl p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[9rem] text-xs font-bold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
          {stat.label}
        </p>
        <div
          className={`flex items-center gap-1 text-xs font-bold ${
            stat.trendDirection === "up" ? "text-[var(--admin-success)]" : "text-[var(--admin-danger)]"
          }`}
        >
          <TrendArrow direction={stat.trendDirection} />
          <span>{stat.trend}</span>
        </div>
      </div>

      <p className="mt-4 font-[var(--font-serif)] text-[2.3rem] leading-none tracking-[-0.03em] text-[var(--admin-text-primary)]">
        {stat.value}
      </p>

      <div className="mt-7 h-1 overflow-hidden rounded-full bg-[var(--admin-progress-track)]">
        <div
          className="h-full rounded-full bg-[var(--admin-accent-soft)]"
          style={{ width: `${stat.progress}%` }}
        />
      </div>
    </article>
  );
}

function ActivityFeedCard({ items }: { items: Activity[] }) {
  return (
    <section className="admin-panel overflow-hidden rounded-2xl p-0">
      <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-6 py-6">
        <div>
          <h2 className="font-[var(--font-serif)] text-[2rem] leading-none tracking-[-0.03em] text-[var(--admin-text-primary)]">
            Activity Feed
          </h2>
          <p className="mt-2 text-base text-[var(--admin-text-muted)]">
            Recent collaboration events in your workspace
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-[var(--admin-accent-soft)] hover:text-white"
        >
          View All
        </button>
      </div>

      <div className="space-y-6 p-6">
        {items.map((item) => (
          <ActivityItem key={`${item.name}-${item.timestamp}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function ActivityItem({ item }: { item: Activity }) {
  const collaborators = item.collaborators;

  return (
    <article className="flex gap-4 rounded-xl p-4">
      <div className="relative">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#243b63_0%,#0f172a_100%)] text-xs font-bold text-white">
          {item.avatar}
        </div>
        <span
          className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[var(--admin-bg)]"
          style={{ backgroundColor: item.statusColor }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="max-w-[34rem] text-base leading-7 text-[var(--admin-text-primary)]">
          <span className="font-medium">{item.name}</span>{" "}
          <span className="text-[var(--admin-text-muted)]">{item.action}</span>{" "}
          <span className="text-[var(--admin-accent-soft)]">{item.target}</span>
        </p>

        {collaborators ? (
          <div className="mt-2 flex items-center">
            {collaborators.map((collaborator, index) => (
              <div
                key={collaborator}
                className="-ml-2 first:ml-0 grid h-6 w-6 place-items-center rounded-full border border-[var(--admin-panel-bg)] bg-[var(--admin-tile)] text-[10px] font-bold text-[var(--admin-text-secondary)]"
                style={{ zIndex: collaborators.length - index }}
              >
                {collaborator}
              </div>
            ))}
          </div>
        ) : null}

        {item.attachments ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.attachments.map((attachment) => (
              <span
                key={attachment}
                className="rounded-md bg-[var(--admin-tile)] px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-[var(--admin-accent-soft)]"
              >
                {attachment}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-2 text-xs text-[var(--admin-text-muted)]">{item.timestamp}</p>
      </div>

      <button
        type="button"
        aria-label={`More actions for ${item.name}`}
        className="self-start rounded-md p-2 text-[var(--admin-text-muted)] hover:bg-[var(--admin-tile)] hover:text-white"
      >
        <DotsIcon />
      </button>
    </article>
  );
}

function WorkspacePulseCard() {
  return (
    <PanelCard title="Workspace Pulse">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--admin-text-secondary)]">Server Status</span>
          <span className="flex items-center gap-2 font-bold text-[var(--admin-success)]">
            <span className="h-2 w-2 rounded-full bg-[var(--admin-success)]" />
            Operational
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--admin-text-secondary)]">Meeting Load</span>
          <span className="font-bold text-[#f59e0b]">High</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--admin-progress-track)]">
          <div className="h-full w-[82%] rounded-full bg-[#f59e0b]" />
        </div>
      </div>
    </PanelCard>
  );
}

function UpgradeCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#5b5ce6_0%,#6d63f5_55%,#5d5ef1_100%)] p-6 text-white">
      <div className="absolute -bottom-8 -right-6 h-28 w-28 rounded-full border border-[rgba(255,255,255,0.1)]" />
      <div className="absolute bottom-2 right-2 h-10 w-10 rounded-full border border-[rgba(255,255,255,0.1)]" />
      <h2 className="max-w-[12rem] font-[var(--font-serif)] text-[2rem] leading-[1.05] tracking-[-0.03em]">
        Upgrade for spatial audio
      </h2>
      <p className="mt-3 max-w-[16rem] text-sm leading-6 text-[rgba(255,255,255,0.82)]">
        Experience crystal clear immersive audio for up to 50 participants.
      </p>
      <button
        type="button"
        className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-bold text-[var(--admin-accent)] hover:-translate-y-px"
      >
        Upgrade Now
      </button>
    </section>
  );
}

function ShortcutsCard() {
  return (
    <PanelCard title="Quick Shortcuts">
      <div className="grid grid-cols-2 gap-4">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            className="rounded-xl bg-[var(--admin-tile)] px-4 py-5 text-center hover:border-[var(--admin-accent)] hover:bg-[rgba(99,102,241,0.12)]"
          >
            <span className="mx-auto mb-3 block w-fit text-[var(--admin-accent-soft)]">
              {shortcut.icon}
            </span>
            <span className="text-xs font-medium text-[var(--admin-text-secondary)]">
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </PanelCard>
  );
}

function PanelCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel rounded-2xl p-6">
      <h2 className="font-[var(--font-serif)] text-[2rem] leading-none tracking-[-0.03em] text-[var(--admin-text-primary)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return direction === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />;
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="m6 14 6-6 6 6M12 8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="m6 10 6 6 6-6M12 16V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="5" r="1.7" fill="currentColor" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <circle cx="12" cy="19" r="1.7" fill="currentColor" />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <rect x="4" y="7" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m14 10 5-3v10l-5-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="6" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="17" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m7.7 11 8.5-3M7.7 13l8.5 3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M5 18h14M7 15l3-4 3 2 4-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8h2v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
