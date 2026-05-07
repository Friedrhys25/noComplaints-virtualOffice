import Link from "next/link";
import { getMyOffices } from "@/actions/office-actions";

export default async function OfficesPage() {
  const offices = await getMyOffices();

  return (
    <main className="admin-dashboard-theme min-h-screen bg-(--admin-bg) text-(--admin-text-primary)">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <section className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8">
          <header className="rounded-[28px] border border-(--admin-border) bg-[rgba(8,12,20,0.38)] p-8 shadow-[0_30px_80px_-40px_rgba(99,102,241,0.28)] backdrop-blur-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--admin-accent-soft)">
              Workspace
            </p>
            <h1 className="mt-4 font-(--font-serif) text-5xl tracking-tighter text-white sm:text-6xl">
              Choose your Office
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-(--admin-text-secondary) sm:text-lg">
              Select an office to open its dashboard, rooms, users, recordings, and settings.
            </p>
          </header>

          <div className="mt-10 grid gap-4">
            {offices.length === 0 ? (
              <div className="rounded-2xl border border-(--admin-border) bg-[rgba(8,12,20,0.38)] p-6 text-(--admin-text-secondary)">
                You’re not a member of any office yet.
              </div>
            ) : (
              offices.map((office) => (
                <Link
                  key={office.id}
                  href={`/${office.id}/dashboard`}
                  className="group rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] p-6 transition hover:border-[rgba(99,102,241,0.35)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xl font-bold text-white group-hover:text-(--admin-accent-soft)">
                        {office.name}
                      </p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-(--admin-text-muted)">
                        Role: {office.role}
                      </p>
                    </div>
                    <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-sm font-semibold text-(--admin-accent-soft)">
                      Open
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-(--admin-text-secondary)">{office.id}</p>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

