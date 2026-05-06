"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import TopNav from "../layout/TopNav";

type UserRecord = Record<string, unknown>;

type UsersManagementProps = {
  initialUsers: UserRecord[];
  initialError: string | null;
};

const DEPARTMENT_FILTERS = ["All Departments", "HR", "Solutions", "Accounting"] as const;
const ROLE_FILTERS = ["All Roles", "Manager", "Employee", "User"] as const;
const ROLE_OPTIONS = ["Manager", "Employee", "User"] as const;
const PAGE_SIZE = 10;

const NAME_KEYS = ["full_name", "name", "username", "display_name"];
const EMAIL_KEYS = ["email", "email_address"];
const ROLE_KEYS = ["role", "user_role", "member_role", "account_role"];
const DEPARTMENT_KEYS = ["department", "dept", "division", "team", "unit"];
const PRIMARY_KEYS = ["id", "user_id", "uuid"];

export default function UsersManagement({
  initialUsers,
  initialError,
}: UsersManagementProps) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [error, setError] = useState<string | null>(initialError);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState<(typeof DEPARTMENT_FILTERS)[number]>("All Departments");
  const [roleFilter, setRoleFilter] =
    useState<(typeof ROLE_FILTERS)[number]>("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [roleDrafts, setRoleDrafts] = useState<Record<string, string>>({});

  const sampleUser = users[0] ?? null;
  const roleKey = detectKey(sampleUser, ROLE_KEYS);
  const departmentKey = detectKey(sampleUser, DEPARTMENT_KEYS);
  const nameKey = detectKey(sampleUser, NAME_KEYS);
  const emailKey = detectKey(sampleUser, EMAIL_KEYS);
  const primaryKey = detectKey(sampleUser, PRIMARY_KEYS) ?? "id";

  const departmentStats = {
    hr: users.filter((user) => normalizeText(getFieldValue(user, departmentKey)) === "hr").length,
    solutions: users.filter((user) => normalizeText(getFieldValue(user, departmentKey)) === "solutions").length,
    accounting: users.filter((user) => normalizeText(getFieldValue(user, departmentKey)) === "accounting").length,
  };
  const managerCount = users.filter((user) => normalizeText(getFieldValue(user, roleKey)) === "manager").length;

  const term = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const departmentValue = normalizeText(getFieldValue(user, departmentKey));
    const roleValue = normalizeText(getFieldValue(user, roleKey));
    const searchBlob = [
      normalizeText(getFieldValue(user, nameKey)),
      normalizeText(getFieldValue(user, emailKey)),
      departmentValue,
      roleValue,
      JSON.stringify(user).toLowerCase(),
    ].join(" ");

    const matchesSearch = term.length === 0 || searchBlob.includes(term);
    const matchesDepartment =
      departmentFilter === "All Departments" ||
      departmentValue === departmentFilter.toLowerCase();
    const matchesRole =
      roleFilter === "All Roles" || roleValue === roleFilter.toLowerCase();

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  const selectedUser = users.find((user) => getRowId(user, primaryKey) === selectedUserId);
  const activeUser = selectedUser ?? paginatedUsers[0] ?? null;
  const activeUserId = activeUser ? getRowId(activeUser, primaryKey) : null;

  function handleRoleSave(user: UserRecord) {
    if (!roleKey) {
      setError("No role field found in mock user data.");
      return;
    }

    const rowId = getRowId(user, primaryKey);
    const nextRole = roleDrafts[rowId] ?? prettifyValue(user[roleKey]);
    setError(null);

    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        getRowId(currentUser, primaryKey) === rowId
          ? { ...currentUser, [roleKey]: nextRole.toLowerCase() }
          : currentUser,
      ),
    );
  }

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
                    People Administration
                  </p>
                  <h1
                    className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl"
                    style={{ fontFamily: "var(--font-brand)" }}
                  >
                    Users
                  </h1>
                  <p className="mt-5 text-lg leading-8 text-(--admin-text-secondary)">
                    Manage roles, review department coverage, and inspect every member from one control surface designed to match the room and dashboard views.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-4 xl:min-w-lg">
                  <HeroBadge label="Total Users" value={String(users.length)} />
                  <HeroBadge label="Managers" value={String(managerCount)} />
                  <HeroBadge label="HR Team" value={String(departmentStats.hr)} />
                  <HeroBadge label="Solutions" value={String(departmentStats.solutions)} />
                </div>
              </div>
            </header>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <OverviewCard label="Filtered Users" value={String(filteredUsers.length)} note="Current search and filter result" />
              <OverviewCard label="HR Department" value={String(departmentStats.hr)} note="People assigned to HR" />
              <OverviewCard label="Solutions Dept." value={String(departmentStats.solutions)} note="People assigned to Solutions" />
              <OverviewCard label="Accounting" value={String(departmentStats.accounting)} note="People assigned to Accounting" />
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
                <div className="flex flex-col gap-6 border-b border-[rgba(255,255,255,0.06)] pb-7">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                    <div>
                      <h2
                        className="text-[2rem] font-bold tracking-tighter text-white"
                        style={{ fontFamily: "var(--font-brand)" }}
                      >
                        User Directory
                      </h2>
                      <p className="mt-2 text-base text-(--admin-text-secondary)">
                        Search, filter, and update role assignments without leaving the directory.
                      </p>
                    </div>
                    <span className="rounded-xl border border-[rgba(84,112,222,0.5)] bg-[rgba(47,68,148,0.16)] px-4 py-2 text-xl text-(--admin-accent-soft)">
                      Page {safeCurrentPage} / {totalPages}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
                        Search
                      </span>
                      <input
                        value={search}
                        onChange={(event) => {
                          setSearch(event.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Search name, email, role, department"
                        className="h-12 w-full rounded-xl border border-(--admin-border) bg-[rgba(15,23,42,0.56)] px-4 text-sm text-white placeholder:text-(--admin-text-muted) focus:border-(--admin-accent) focus:outline-none focus:ring-4 focus:ring-(--admin-accent-soft)"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
                        Department
                      </span>
                      <select
                        value={departmentFilter}
                        onChange={(event) => {
                          setDepartmentFilter(
                            event.target.value as (typeof DEPARTMENT_FILTERS)[number],
                          );
                          setCurrentPage(1);
                        }}
                        className="h-12 w-full rounded-xl border border-(--admin-border) bg-[rgba(15,23,42,0.56)] px-4 text-sm text-white focus:border-(--admin-accent) focus:outline-none focus:ring-4 focus:ring-(--admin-accent-soft)"
                      >
                        {DEPARTMENT_FILTERS.map((option) => (
                          <option key={option} value={option} className="bg-slate-950">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
                        Role
                      </span>
                      <select
                        value={roleFilter}
                        onChange={(event) => {
                          setRoleFilter(event.target.value as (typeof ROLE_FILTERS)[number]);
                          setCurrentPage(1);
                        }}
                        className="h-12 w-full rounded-xl border border-(--admin-border) bg-[rgba(15,23,42,0.56)] px-4 text-sm text-white focus:border-(--admin-accent) focus:outline-none focus:ring-4 focus:ring-(--admin-accent-soft)"
                      >
                        {ROLE_FILTERS.map((option) => (
                          <option key={option} value={option} className="bg-slate-950">
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                {error ? (
                  <div className="mt-5 rounded-xl border border-[rgba(239,68,68,0.28)] bg-[rgba(127,29,29,0.24)] px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                <div className="mt-7 overflow-hidden rounded-2xl border border-(--admin-border)">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-(--admin-border)">
                      <thead className="bg-[rgba(2,6,23,0.66)]">
                        <tr>
                          <HeaderCell>User</HeaderCell>
                          <HeaderCell>Department</HeaderCell>
                          <HeaderCell>Role</HeaderCell>
                          <HeaderCell>Status</HeaderCell>
                          <HeaderCell>Joined</HeaderCell>
                          <HeaderCell>Actions</HeaderCell>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(30,41,59,0.45)] bg-[rgba(8,12,20,0.34)]">
                        {paginatedUsers.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-sm text-(--admin-text-secondary)">
                              No users match current filters.
                            </td>
                          </tr>
                        ) : (
                          paginatedUsers.map((user) => {
                            const rowId = getRowId(user, primaryKey);
                            const displayName = getDisplayName(user, nameKey);
                            const displayEmail = getDisplayEmail(user, emailKey);
                            const displayDepartment = prettifyValue(getFieldValue(user, departmentKey));
                            const displayRole = prettifyValue(getFieldValue(user, roleKey));
                            const roleDraft = roleDrafts[rowId] ?? displayRole;
                            const isSelected = activeUserId === rowId;

                            return (
                              <tr
                                key={rowId}
                                onClick={() => setSelectedUserId(rowId)}
                                className={`cursor-pointer transition hover:bg-[rgba(99,102,241,0.08)] ${
                                  isSelected ? "bg-[rgba(99,102,241,0.08)]" : ""
                                }`}
                              >
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#243b63_0%,#0f172a_100%)] text-xs font-bold text-white">
                                      {getInitials(displayName)}
                                    </div>
                                    <div>
                                      <p className="font-medium text-white">{displayName}</p>
                                      <p className="text-sm text-(--admin-text-secondary)">
                                        {displayEmail}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <BodyCell>{displayDepartment}</BodyCell>
                                <BodyCell>
                                  <span className="rounded-full bg-[rgba(99,102,241,0.14)] px-3 py-1 text-xs font-bold text-(--admin-accent-soft)">
                                    {displayRole}
                                  </span>
                                </BodyCell>
                                <BodyCell>
                                  <span className="inline-flex items-center gap-2 text-sm text-(--admin-text-secondary)">
                                    <span className="h-2 w-2 rounded-full bg-(--admin-success)" />
                                    Active
                                  </span>
                                </BodyCell>
                                <BodyCell>{formatDateValue(user)}</BodyCell>
                                <td
                                  className="px-6 py-4"
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  <div className="flex flex-wrap items-center gap-2">
                                    <select
                                      value={roleDraft}
                                      onChange={(event) =>
                                        setRoleDrafts((current) => ({
                                          ...current,
                                          [rowId]: event.target.value,
                                        }))
                                      }
                                      disabled={!roleKey}
                                      className="h-10 rounded-lg border border-(--admin-border) bg-[rgba(15,23,42,0.7)] px-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      {ROLE_OPTIONS.map((option) => (
                                        <option key={option} value={option} className="bg-slate-950">
                                          {option}
                                        </option>
                                      ))}
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => handleRoleSave(user)}
                                      disabled={!roleKey}
                                      className="rounded-lg bg-(--admin-accent) px-3 py-2 text-sm font-medium text-white hover:bg-(--admin-accent-strong) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                      Change Role
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-(--admin-text-secondary)">
                    Showing {(safeCurrentPage - 1) * PAGE_SIZE + (paginatedUsers.length > 0 ? 1 : 0)}
                    {" "}to{" "}
                    {(safeCurrentPage - 1) * PAGE_SIZE + paginatedUsers.length} of {filteredUsers.length} users
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={safeCurrentPage === 1}
                      className="rounded-lg border border-(--admin-border) px-4 py-2 text-sm text-white hover:bg-[rgba(99,102,241,0.08)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={safeCurrentPage === totalPages}
                      className="rounded-lg border border-(--admin-border) px-4 py-2 text-sm text-white hover:bg-[rgba(99,102,241,0.08)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[rgba(27,31,41,0.92)] px-7 py-7">
                <p
                  className="text-sm font-bold uppercase tracking-[0.18em] text-(--admin-accent-soft)"
                  style={{ fontFamily: "var(--font-brand)" }}
                >
                  Profile Detail
                </p>

                {activeUser ? (
                  <UserDetailsCard
                    user={activeUser}
                    nameKey={nameKey}
                    emailKey={emailKey}
                    departmentKey={departmentKey}
                    roleKey={roleKey}
                  />
                ) : (
                  <p className="mt-6 text-sm text-(--admin-text-secondary)">
                    Select user row to inspect profile information.
                  </p>
                )}
              </section>
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

function UserDetailsCard({
  user,
  nameKey,
  emailKey,
  departmentKey,
  roleKey,
}: {
  user: UserRecord;
  nameKey: string | null;
  emailKey: string | null;
  departmentKey: string | null;
  roleKey: string | null;
}) {
  const detailEntries = Object.entries(user).filter(([, value]) => value !== null && value !== "");

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 border-b border-(--admin-border) pb-6">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#243b63_0%,#0f172a_100%)] text-sm font-bold text-white">
          {getInitials(getDisplayName(user, nameKey))}
        </div>
        <div>
          <h2
            className="text-[2rem] font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            {getDisplayName(user, nameKey)}
          </h2>
          <p className="mt-1 text-sm text-(--admin-text-secondary)">
            {getDisplayEmail(user, emailKey)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <DetailPill label="Department" value={prettifyValue(getFieldValue(user, departmentKey))} />
        <DetailPill label="Role" value={prettifyValue(getFieldValue(user, roleKey))} />
      </div>

      <div className="mt-6 space-y-3">
        {detailEntries.map(([key, value]) => (
          <div
            key={key}
            className="flex items-start justify-between gap-4 rounded-2xl border border-[rgba(30,41,59,0.38)] bg-[rgba(2,6,23,0.4)] px-4 py-4"
          >
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-(--admin-text-muted)">
              {humanizeKey(key)}
            </span>
            <span className="max-w-52 text-right text-sm leading-6 text-(--admin-text-secondary)">
              {prettifyValue(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[rgba(11,14,24,0.48)] px-4 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-(--admin-text-muted)">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function HeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-(--admin-text-muted)">
      {children}
    </th>
  );
}

function BodyCell({ children }: { children: ReactNode }) {
  return <td className="px-6 py-4 text-sm text-(--admin-text-secondary)">{children}</td>;
}

function detectKey(sample: UserRecord | null, candidates: readonly string[]): string | null {
  if (!sample) return null;
  for (const candidate of candidates) {
    if (candidate in sample) return candidate;
  }
  return null;
}

function getFieldValue(user: UserRecord, key: string | null): unknown {
  if (!key) return null;
  return user[key];
}

function prettifyValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "string") {
    return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  }
  if (typeof value === "boolean") return value ? "True" : "False";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function normalizeText(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim().toLowerCase();
}

function getDisplayName(user: UserRecord, nameKey: string | null): string {
  const fromKey = getFieldValue(user, nameKey);
  if (typeof fromKey === "string" && fromKey.trim().length > 0) return fromKey;
  const emailValue = getFieldValue(user, detectKey(user, EMAIL_KEYS));
  if (typeof emailValue === "string" && emailValue.includes("@")) return emailValue.split("@")[0];
  return "Unknown User";
}

function getDisplayEmail(user: UserRecord, emailKey: string | null): string {
  const emailValue = getFieldValue(user, emailKey);
  if (typeof emailValue === "string" && emailValue.trim().length > 0) return emailValue;
  return "No email";
}

function getRowId(user: UserRecord, primaryKey: string): string {
  const value = user[primaryKey];
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : JSON.stringify(user);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NA";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function humanizeKey(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDateValue(user: UserRecord): string {
  const dateValue = user.created_at ?? user.createdAt ?? user.updated_at ?? user.updatedAt;
  if (typeof dateValue !== "string" || dateValue.length === 0) return "Unknown";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString();
}
