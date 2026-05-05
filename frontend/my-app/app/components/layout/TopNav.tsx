"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const topLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "/users" },
  { label: "Rooms", href: "/rooms" },
  { label: "Recordings", href: "/recordings" },
  { label: "Settings", href: "/settings" },
];

type IconButtonProps = {
  ariaLabel: string;
  badge?: boolean;
  children: ReactNode;
};

function IconButton({ ariaLabel, badge, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(148,163,184,0.16)] text-[#cbd5e1] transition hover:bg-[rgba(148,163,184,0.1)]"
    >
      {children}
      {badge ? <span className="absolute -right-1 top-0 h-2 w-2 rounded-full bg-(--admin-accent)" /> : null}
    </button>
  );
}

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

function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-16 border-b border-(--admin-border) bg-[rgba(8,12,20,0.72)] backdrop-blur-[10px]">
      <div className="flex h-full items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-(--font-brand) text-xl font-bold tracking-tighter text-[#f8fafc]">
            VirtualOffice
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {topLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href === "/dashboard" && pathname === "/adminDashboard");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-16 items-center text-sm font-medium tracking-[-0.02em] ${
                    active
                      ? "border-b-2 border-(--admin-accent) pb-1.5 text-(--admin-accent-soft)"
                      : "text-(--admin-text-secondary) hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-4 sm:flex">
            <IconButton ariaLabel="Theme">
              <MoonIcon />
            </IconButton>
            <IconButton ariaLabel="Notifications" badge>
              <BellIcon />
            </IconButton>
          </div>

          <button
            type="button"
            className="rounded-lg bg-(--admin-accent) px-4 py-2 font-(--font-brand) text-sm font-medium text-white shadow-[0_10px_15px_-3px_rgba(99,102,241,0.2),0_4px_6px_-4px_rgba(99,102,241,0.2)] hover:-translate-y-px hover:bg-(--admin-accent-strong)"
          >
            Join Meeting
          </button>

          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#334155] text-xs font-bold text-white shadow-[0_0_0_2px_#020617,0_0_0_4px_#1e293b]">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
