import Image from "next/image";

const heroImage =
  "https://www.figma.com/api/mcp/asset/a6d9ddfe-fb87-4e40-ba42-cbfa354d76c6";
const spatialImage =
  "https://www.figma.com/api/mcp/asset/68d06f69-f594-47b4-9b1f-5f20c4285324";
const analyticsImage =
  "https://www.figma.com/api/mcp/asset/ee7e32f5-9c0f-4a46-ba09-bf2d8c685755";

const featureSections = [
  {
    id: "01 / IMMERSIVE SPACES",
    title: "Spatial Audio and 2D Presence.",
    description:
      "Walk up to a colleague to start a conversation. Our spatial audio engine mimics real-life acoustics, making spontaneous syncs feel natural and effortless.",
    bullets: [
      "Directional audio that fades with distance.",
      "High-fidelity 2D avatars for visual context.",
    ],
    image: spatialImage,
    imageAlt: "Blueprint-style illustration of a spatial office layout.",
    reverse: false,
  },
  {
    id: "02 / REAL-TIME ANALYTICS",
    title: "Understand Team Pulse effortlessly.",
    description:
      "Deep insights into collaboration patterns. Visualize how your team moves, meets, and builds without invasive tracking or surveillance.",
    stats: [
      { value: "42%", label: "AVG. FLOW TIME" },
      { value: "12ms", label: "GLOBAL LATENCY" },
    ],
    image: analyticsImage,
    imageAlt: "Analytics dashboard illustration on a glowing display.",
    reverse: true,
  },
];

const footerColumns = [
  {
    title: "PRODUCT",
    links: ["DASHBOARD", "ROOMS", "ANALYTICS", "INTEGRATIONS"],
  },
  {
    title: "COMPANY",
    links: ["SECURITY", "STATUS", "CHANGELOG"],
  },
  {
    title: "LEGAL",
    links: ["PRIVACY POLICY", "TERMS OF SERVICE"],
  },
];

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M20 14.5A7.5 7.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M15 17H4.5a1 1 0 0 1-.78-1.62L5 13.75V10a7 7 0 1 1 14 0v3.75l1.28 1.63A1 1 0 0 1 19.5 17H15m0 0a3 3 0 0 1-6 0m6 0H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.8 15.5 12 10 15.2V8.8Z" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-1 h-4 w-4 shrink-0">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m8.4 12.4 2.4 2.3 4.8-5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M6 6 18 18M18 6 6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d="M6.4 8.5V18M6.45 5.9a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM10.5 18V8.5h4.1c2.3 0 3.9 1.6 3.9 4V18m-8-5.4c0-2.2 1.5-4.1 4-4.1 2.5 0 4 1.9 4 4.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="vo-shell relative flex-1 overflow-x-hidden">
      <header className="fixed inset-x-0 top-0 z-20 border-b border-[rgba(30,41,59,0.5)] bg-[rgba(2,6,23,0.8)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-[var(--font-brand)] text-base font-bold tracking-[-0.04em] text-white sm:text-xl"
            >
              VirtualOffice
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              {["Dashboard", "Rooms", "Team", "Analytics"].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`pb-1 font-[var(--font-brand)] text-sm font-medium tracking-[-0.025em] ${
                    index === 0
                      ? "border-b-2 border-[var(--accent-strong)] text-[var(--accent)]"
                      : "text-[var(--text-tertiary)] hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-[var(--text-tertiary)] hover:bg-[rgba(128,131,255,0.06)] hover:text-white"
            >
              <MoonIcon />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-lg p-2 text-[var(--text-tertiary)] hover:bg-[rgba(128,131,255,0.06)] hover:text-white"
            >
              <BellIcon />
            </button>
            <a
              href="#"
              className="rounded-lg bg-[var(--accent)] px-5 py-2 font-[var(--font-brand)] text-sm font-medium text-white shadow-[var(--shadow-button)] hover:-translate-y-px hover:bg-[#8c8eff]"
            >
              Log In
            </a>
          </div>
        </div>
      </header>

      <section className="vo-grid relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-12 h-72 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_52%)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="font-[var(--font-serif)] text-[11px] font-bold uppercase tracking-[0.28em] text-[#c0c1ff] sm:text-xs">
              SPATIAL COLLABORATION ENGINE V2.0
            </p>
            <h1 className="mt-4 max-w-4xl font-[var(--font-serif)] text-5xl font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4rem]">
              Experience Work Beyond the{" "}
              <span className="text-[var(--accent)]">Screen</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
              The immersive spatial workspace designed for high-performance distributed
              teams. Connect, build, and scale in a persistent digital office.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#"
                className="vo-button-primary rounded-xl px-8 py-4 font-[var(--font-serif)] text-xl font-bold text-white"
              >
                Get Started Free
              </a>
              <a
                href="#"
                className="vo-button-secondary flex items-center justify-center gap-3 rounded-xl border border-[var(--border-strong)] px-7 py-4 font-[var(--font-serif)] text-xl font-bold text-white"
              >
                <PlayIcon />
                Watch Demo
              </a>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-6xl">
            <div className="vo-card rounded-2xl p-2.5">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={heroImage}
                  alt="VirtualOffice interface preview"
                  width={1100}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 lg:gap-24">
          {featureSections.map((section) => (
            <div
              key={section.id}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-24 ${
                section.reverse ? "" : ""
              }`}
            >
              <div className={section.reverse ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                <p className="font-[var(--font-serif)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                  {section.id}
                </p>
                <h2 className="mt-3 font-[var(--font-serif)] text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                  {section.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                  {section.description}
                </p>

                {section.bullets ? (
                  <ul className="mt-6 space-y-4 text-base text-[#e4e1ed]">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 leading-7">
                        <span className="text-[var(--accent)]">
                          <CheckIcon />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.stats ? (
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {section.stats.map((stat) => (
                      <div key={stat.label} className="vo-stat-card rounded-xl p-4">
                        <div className="text-2xl font-bold text-[#818cf8]">{stat.value}</div>
                        <div className="mt-1 text-[11px] font-bold tracking-[0.16em] text-[#e4e1ed]/60">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className={section.reverse ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-[rgba(99,102,241,0.1)] blur-3xl" />
                  <div className="relative overflow-hidden rounded-2xl border border-[var(--border-base)]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt}
                      width={560}
                      height={560}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[rgba(99,102,241,0.2)] px-6 py-16 text-center sm:px-10 lg:px-24"
          style={{ background: "var(--bg-cta)" }}
        >
          <div className="pointer-events-none absolute" />
          <h2 className="font-[var(--font-serif)] text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
            Ready to elevate your team?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
            Join 2,000+ forward-thinking companies already building in
            VirtualOffice. Free for teams up to 10.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="vo-button-primary rounded-xl px-8 py-4 font-[var(--font-serif)] text-xl font-bold text-white"
            >
              Start Building Now
            </a>
            <a
              href="#"
              className="vo-button-secondary rounded-xl border border-[var(--border-strong)] px-8 py-4 font-[var(--font-serif)] text-xl font-bold text-white"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#0f172a] bg-[var(--bg-footer)] px-5 pb-12 pt-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="font-[var(--font-brand)] text-lg font-bold tracking-[-0.04em] text-[var(--text-tertiary)]">
                VirtualOffice
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--text-muted)]">
                Spatial operating systems for the future of work. Built for builders,
                by builders.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <div className="font-[var(--font-brand)] text-xs font-bold tracking-[0.14em] text-[var(--accent-strong)]">
                  {column.title}
                </div>
                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block font-[var(--font-brand)] text-xs tracking-[0.14em] text-[var(--text-faint)] hover:text-white"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[#0f172a] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-[var(--font-brand)] text-[11px] tracking-[0.14em] text-[var(--text-faint)]">
              © 2024 VIRTUALOFFICE SPATIAL SYSTEMS
            </p>
            <div className="flex items-center gap-4 text-[var(--text-faint)]">
              <a href="#" aria-label="X / Twitter" className="hover:text-white">
                <XIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
