import TopNav from "../layout/TopNav";

type Recording = {
  title: string;
  room: string;
  participants: string;
  duration: string;
  date: string;
  status: "ready" | "processing";
};

type SummaryCard = {
  title: string;
  summary: string;
  tags: string[];
  time: string;
};

const recordings: Recording[] = [
  {
    title: "Weekly Leadership Sync",
    room: "HR Head Room",
    participants: "8 participants",
    duration: "42 min",
    date: "Today, 10:30 AM",
    status: "ready",
  },
  {
    title: "Solutions Sprint Review",
    room: "Solutions Head Room",
    participants: "6 participants",
    duration: "58 min",
    date: "Yesterday, 4:10 PM",
    status: "ready",
  },
  {
    title: "Accounting Budget Alignment",
    room: "Meeting Room 1",
    participants: "4 participants",
    duration: "34 min",
    date: "Yesterday, 11:00 AM",
    status: "processing",
  },
  {
    title: "People Ops Retrospective",
    room: "Meeting Room 2",
    participants: "5 participants",
    duration: "27 min",
    date: "Monday, 2:15 PM",
    status: "ready",
  },
];

const summaries: SummaryCard[] = [
  {
    title: "Meeting Summary",
    summary:
      "Leadership agreed to rebalance hiring workload, prioritize onboarding automation, and keep HR room open for afternoon office hours.",
    tags: ["Action Items", "Hiring", "Office Hours"],
    time: "Generated 2 minutes after upload",
  },
  {
    title: "Decision Highlights",
    summary:
      "Solutions team confirmed sprint delivery, postponed one analytics dependency, and approved the revised room-capacity dashboard metrics.",
    tags: ["Sprint", "Approval", "Metrics"],
    time: "Generated from latest room recording",
  },
];

export default function RecordingsWorkspace() {
  return (
    <main className="admin-dashboard-theme min-h-screen bg-(--admin-bg) text-(--admin-text-primary)">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <TopNav />

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 2xl:max-w-[1500px]">
          <div className="space-y-10">
            <header className="rounded-[30px] border border-[rgba(72,95,201,0.42)] bg-[linear-gradient(180deg,rgba(25,30,52,0.92)_0%,rgba(20,24,40,0.92)_100%)] px-7 py-8 shadow-[0_0_50px_-28px_rgba(99,102,241,0.65)]">
              <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-3xl">
                  <p
                    className="text-sm font-bold uppercase tracking-[0.18em] text-(--admin-accent-soft)"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Meeting Memory
                  </p>
                  <h1
                    className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Recordings
                  </h1>
                  <p className="mt-5 text-lg leading-8 text-(--admin-text-secondary)">
                    Store meeting recordings, generate summaries, and drop new files into the workspace for note-taking and recap generation.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-4 xl:min-w-[32rem]">
                  <HeroBadge label="Recordings" value="24" />
                  <HeroBadge label="Summaries" value="18" />
                  <HeroBadge label="Uploaded Today" value="4" />
                  <HeroBadge label="Storage Used" value="68%" />
                </div>
              </div>
            </header>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <OverviewCard label="Meeting Recordings" value="24" note="Indexed recordings across all active rooms" />
              <OverviewCard label="Meeting Summaries" value="18" note="AI-generated summaries ready for review" />
              <OverviewCard label="Latest Upload" value="2 min" note="Average time to generate summary after upload" />
              <OverviewCard label="Pinned Actions" value="11" note="Tasks extracted from recorded conversations" />
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-6">
                <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
                  <div className="flex flex-col gap-4 border-b border-[rgba(255,255,255,0.06)] pb-7 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <h2
                        className="text-[2rem] font-bold tracking-tighter text-white"
                        style={{ fontFamily: "var(--font-brand)" }}
                      >
                        Meeting Recordings
                      </h2>
                      <p className="mt-2 text-base text-(--admin-text-secondary)">
                        Browse saved room recordings with quick status, duration, and participant context.
                      </p>
                    </div>
                    <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-xl text-(--admin-accent-soft)">
                      Library
                    </span>
                  </div>

                  <div className="mt-7 space-y-4">
                    {recordings.map((recording) => (
                      <RecordingRow key={`${recording.title}-${recording.date}`} recording={recording} />
                    ))}
                  </div>
                </section>

                <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
                  <div className="flex flex-col gap-4 border-b border-[rgba(255,255,255,0.06)] pb-7 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <h2
                        className="text-[2rem] font-bold tracking-tighter text-white"
                        style={{ fontFamily: "var(--font-brand)" }}
                      >
                        Meeting Summary
                      </h2>
                      <p className="mt-2 text-base text-(--admin-text-secondary)">
                        Summaries, highlights, and note-taking outputs generated from uploaded or captured meetings.
                      </p>
                    </div>
                    <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-xl text-(--admin-accent-soft)">
                      AI Notes
                    </span>
                  </div>

                  <div className="mt-7 grid gap-4 lg:grid-cols-2">
                    {summaries.map((summary) => (
                      <SummaryPanel key={summary.title} summary={summary} />
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-6">
                <section className="rounded-[30px] border border-[rgba(72,95,201,0.42)] bg-[linear-gradient(180deg,rgba(25,30,52,0.92)_0%,rgba(20,24,40,0.92)_100%)] px-7 py-7 shadow-[0_0_50px_-28px_rgba(99,102,241,0.65)]">
                  <p
                    className="text-sm font-bold uppercase tracking-[0.18em] text-(--admin-accent-soft)"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Upload
                  </p>
                  <h2
                    className="mt-4 text-[2rem] font-bold tracking-tighter text-white"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Drag Here Upload Meeting
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-(--admin-text-secondary)">
                    Drop audio, video, or transcript files here to trigger meeting summarizer and note taker workflows.
                  </p>

                  <div className="mt-6 rounded-[24px] border border-dashed border-[rgba(99,102,241,0.48)] bg-[rgba(11,14,24,0.55)] px-6 py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(99,102,241,0.14)] text-(--admin-accent-soft)">
                      <UploadIcon />
                    </div>
                    <p className="mt-4 text-lg font-semibold text-white">
                      Drop recording here
                    </p>
                    <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">
                      Supports room capture exports, call recordings, and transcript bundles.
                    </p>
                    <button
                      type="button"
                      className="mt-5 rounded-lg bg-(--admin-accent) px-4 py-2 text-sm font-medium text-white hover:bg-(--admin-accent-strong)"
                    >
                      Browse File
                    </button>
                  </div>
                </section>

                <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
                  <h2
                    className="text-[2rem] font-bold tracking-tighter text-white"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Output Stack
                  </h2>
                  <div className="mt-7 space-y-4">
                    <SignalCard title="Summary Draft" detail="Generates quick recap with key decisions and timeline." />
                    <SignalCard title="Action Notes" detail="Pulls tasks, owners, and follow-up items from conversation." />
                    <SignalCard title="Storage Archive" detail="Keeps uploaded recordings grouped by room and meeting." />
                  </div>
                </section>
              </aside>
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

function OverviewCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
        {label}
      </p>
      <p className="mt-4 text-[2.4rem] font-bold tracking-tighter text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">{note}</p>
    </div>
  );
}

function RecordingRow({ recording }: { recording: Recording }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-lg font-bold text-white">{recording.title}</p>
          <p className="mt-2 text-sm text-(--admin-text-secondary)">
            {recording.room} · {recording.participants} · {recording.duration}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-(--admin-text-muted)">
            {recording.date}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
              recording.status === "ready"
                ? "bg-[rgba(19,78,46,0.28)] text-[#3ee779]"
                : "bg-[rgba(120,53,15,0.28)] text-[#f59e0b]"
            }`}
          >
            {recording.status}
          </span>
          <button
            type="button"
            className="rounded-lg border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm text-(--admin-text-secondary) hover:border-(--admin-accent) hover:text-white"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryPanel({ summary }: { summary: SummaryCard }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5">
      <p className="text-lg font-bold text-white">{summary.title}</p>
      <p className="mt-3 text-sm leading-6 text-(--admin-text-secondary)">
        {summary.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {summary.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[rgba(99,102,241,0.14)] px-3 py-1 text-xs font-bold text-(--admin-accent-soft)"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-(--admin-text-muted)">
        {summary.time}
      </p>
    </div>
  );
}

function SignalCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-5 py-5">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-(--admin-text-secondary)">{detail}</p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path
        d="M12 16V7m0 0-3.5 3.5M12 7l3.5 3.5M5 17.5V19h14v-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
