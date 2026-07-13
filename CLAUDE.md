# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`).

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — serve the production build (run `pnpm build` first)
- `pnpm lint` — run ESLint (`eslint-config-next`, flat config in `eslint.config.mjs`)

There is no test runner configured yet. Add one (e.g. Vitest) before writing tests.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript 5**, strict mode; import alias `@/*` → `src/*`
- **Tailwind CSS v4** — configured entirely in CSS via `@import "tailwindcss"` in `src/app/globals.css`. There is **no `tailwind.config.js`**; design tokens live in `globals.css` as CSS variables (`:root` / `.dark`) wired into Tailwind through the `@theme inline` block. shadcn added its full token set here (the `--background`, `--primary`, `--radius`, … variables); edit these to re-theme.
- **shadcn/ui** — configured via `components.json` (New York style, base color neutral, CSS variables). Components install to `src/components/ui`, utilities to `src/lib/utils.ts` (the `cn()` helper). The shadcn MCP server is enabled (`.claude/settings.local.json`) — use it to search and add components: `pnpm dlx shadcn@latest add <component>`.

## Architecture

Single Next.js app, no `src/` sub-packages yet:

- `src/app/layout.tsx` — root layout; loads Geist fonts and applies the `--font-geist-*` variables consumed by the Tailwind theme.
- `src/app/page.tsx` — home route.
- `src/app/globals.css` — Tailwind import + theme tokens.

When adding features, follow App Router conventions: route folders under `src/app/`, colocated `page.tsx`/`layout.tsx`/`loading.tsx`, Server Components by default, and `"use client"` only where interactivity requires it.

## Deployment

Targeted at Vercel. Prefer Fluid Compute (the default) over Edge runtime, and Vercel Marketplace integrations for storage/databases rather than custom infra.
