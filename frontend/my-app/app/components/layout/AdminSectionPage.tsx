import type { ReactNode } from "react";
import TopNav from "./TopNav";

type AdminSectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

function AdminSectionPage({
  eyebrow,
  title,
  description,
  children,
}: AdminSectionPageProps) {
  return (
    <main className="admin-dashboard-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text-primary)]">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_22%),linear-gradient(180deg,var(--admin-bg)_0%,#070b13_100%)]">
        <TopNav />

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8">
          <div className="rounded-[28px] border border-[var(--admin-border)] bg-[rgba(8,12,20,0.38)] p-8 shadow-[0_30px_80px_-40px_rgba(99,102,241,0.28)] backdrop-blur-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--admin-accent-soft)]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-[var(--font-serif)] text-5xl tracking-[-0.05em] text-[var(--admin-text-primary)] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--admin-text-secondary)] sm:text-lg">
              {description}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="admin-panel rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                  Status
                </p>
                <p className="mt-3 font-[var(--font-serif)] text-3xl tracking-[-0.04em]">
                  Ready
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--admin-text-secondary)]">
                  Route created and wired into top navigation.
                </p>
              </div>

              <div className="admin-panel rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                  Purpose
                </p>
                <p className="mt-3 font-[var(--font-serif)] text-3xl tracking-[-0.04em]">
                  Placeholder
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--admin-text-secondary)]">
                  Use this page as scaffold for real module content.
                </p>
              </div>

              <div className="admin-panel rounded-2xl p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
                  Next Step
                </p>
                <p className="mt-3 font-[var(--font-serif)] text-3xl tracking-[-0.04em]">
                  Build Out
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--admin-text-secondary)]">
                  Add tables, filters, actions, and API data for this section.
                </p>
              </div>
            </div>

            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminSectionPage;
