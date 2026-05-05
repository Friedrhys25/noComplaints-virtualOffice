# Codex Frontend Approach

This file explains how UI changes are organized in this codebase when Codex edits or adds frontend files.

## Stack

- Framework: Next.js App Router
- Styling: Tailwind CSS
- Theme tokens: CSS variables in `app/globals.css`

Codex should use Tailwind CSS for layout, spacing, typography, sizing, borders, and responsive behavior.
Codex should use existing CSS variables for theme colors and shared visual tokens whenever possible.

## Core Rule

Keep **route files** small. Put most UI into **reusable components**.

That means:

- route folder = URL
- component file = UI block
- `globals.css` = shared tokens and shared utility-like classes

## Why there is a `users` folder

In Next.js App Router, folder names inside `app/` define routes.

Example:

- `app/users/page.tsx` -> `/users`
- `app/dashboard/page.tsx` -> `/dashboard`
- `app/settings/page.tsx` -> `/settings`

So `users` is not only a feature name. It is also the route folder for the `/users` page.

## Why `UsersManagement.tsx` exists

`app/users/page.tsx` is route entry.
`app/components/users/UsersManagement.tsx` is page UI implementation.

This split is intentional.

### `app/users/page.tsx`

Use this file for:

- route entry
- page-level data source selection
- wiring props into feature UI
- keeping route file simple

### `app/components/users/UsersManagement.tsx`

Use this file for:

- table UI
- filters
- search
- pagination
- detail panel
- local component state
- user-management-specific interactions

Reason:

- easier to read
- easier to reuse
- easier to refactor
- route file stays clean

## Recommended File Structure

Use this pattern for feature pages:

```text
app/
  dashboard/
    page.tsx
  users/
    page.tsx
  rooms/
    page.tsx
  recordings/
    page.tsx
  settings/
    page.tsx
  components/
    layout/
      TopNav.tsx
      AdminSectionPage.tsx
    dashboard/
      DashboardPage.tsx
    users/
      UsersManagement.tsx
```

## Naming Rules

### Route folders

Use lowercase route names:

- `users`
- `dashboard`
- `rooms`

Reason:

- matches URL structure
- standard Next.js convention

### Component files

Use PascalCase component names:

- `UsersManagement.tsx`
- `DashboardPage.tsx`
- `TopNav.tsx`

Reason:

- standard React convention
- easy to identify as components

## When to create a separate component file

Create a separate component file when:

- page gets large
- UI has many sections
- state logic grows
- feature may be reused
- route file becomes hard to scan

Do not keep everything inside `page.tsx` once page becomes complex.

## When to keep code inside `page.tsx`

Keep code in `page.tsx` when:

- page is very small
- only one short section
- no meaningful reuse
- no complex local state

## Styling Rule

Use Tailwind CSS by default.

Examples of what Tailwind should handle:

- flex/grid layout
- spacing
- responsive breakpoints
- radius
- border
- typography sizing
- alignment
- hover/focus states

Use CSS variables from `app/globals.css` for:

- brand colors
- shared admin colors
- surface colors
- shadows
- design tokens

Example pattern:

```tsx
className="rounded-2xl border border-[var(--admin-border)] bg-[rgba(8,12,20,0.38)] p-6"
```

This means:

- Tailwind controls structure
- CSS variables control theme consistency

## State/Data Approach

Codex should separate **data source** from **UI implementation**.

Example:

- `app/users/page.tsx` decides whether page uses mock data, server data, or API data
- `UsersManagement.tsx` renders UI using props

This makes it easy to switch later from:

- mock frontend data
- to Supabase
- to API routes
- to server actions

without rewriting whole UI tree.

## Standard Codex Approach In This Repo

When editing frontend pages, Codex should usually follow this order:

1. Inspect existing route structure.
2. Reuse existing shared layout components first.
3. Keep route folder aligned with URL.
4. Move complex page UI into `app/components/<feature>/`.
5. Use Tailwind CSS for structure and interaction styling.
6. Use `app/globals.css` variables for theme consistency.
7. Keep one source of truth for each major page.

## Example: Users Page

Current pattern:

- `app/users/page.tsx`
  - route entry for `/users`
  - passes mock data into UI

- `app/components/users/UsersManagement.tsx`
  - contains search
  - contains filters
  - contains pagination
  - contains local role-change UI
  - contains row detail panel

This is standard and preferred for complex pages in this project.

## Example: Dashboard Page

Current pattern:

- `app/dashboard/page.tsx`
  - route entry for `/dashboard`

- `app/components/dashboard/DashboardPage.tsx`
  - full dashboard UI

- `app/adminDashboard/page.tsx`
  - redirect only

Reason:

- `/dashboard` is real route
- dashboard UI exists in one place only
- old route can redirect without duplicating page logic

## Summary

Short version:

- route folder names are for URLs
- component files are for UI implementation
- use Tailwind CSS
- use shared CSS variables
- keep page files thin
- move complex feature UI into `app/components/<feature>/`
- keep one source of truth per page
