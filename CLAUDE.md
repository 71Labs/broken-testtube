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

Single Next.js app; the home page is the marketing/landing site for 71Labs.

- `src/app/layout.tsx` — root layout. Forces **dark mode** (`className="dark"` on `<html>` — the site is dark-only) and loads Geist Sans (`--font-sans`) + Geist Mono (`--font-geist-mono`). Also holds site `metadata`.
- `src/app/page.tsx` — composes the landing page from section components in order: Header → Hero → Talise → Features → Gallery → Capabilities → ContactCTA → Footer.
- `src/app/globals.css` — Tailwind import + the design system (see below).
- `src/components/site/` — one file per landing section. Server Components by default; only `header.tsx` and `reveal.tsx` are `"use client"` (scroll state, IntersectionObserver). **Content note:** 71Labs is the studio; **Talise** (talise.io — a consumer stablecoin payments app on Sui) is its one real, live product. `talise.tsx` (spotlight), `features.tsx`, and `gallery.tsx` are built from Talise's actual value props and **real app screenshots in `public/talise/`** — keep copy truthful, don't invent additional products or investors.
- **Talise brand accent**: the Talise/Features/Gallery sections override `--glow` to lime-green (`140 231 90`) via inline style, so all `rgb(var(--glow))` usages (bullets, labels, phone glows) turn green in the product zone while the rest of the site stays neutral. The Talise CTA uses `bg-[#b7f486]`. The tagline accent word uses Instrument Serif italic (`font-serif`, `--font-serif`) in lime-yellow `#dcf24a`.
- **App screenshots** live in `public/talise/` (home, cheque, send, receive, earn, private, cashout — iPhone 16 Pro, 1206×2622) plus `og.png` (the "Money that moves freely, like messages." banner, used for OpenGraph). Rendered through `phone-frame.tsx` (a device bezel around `next/image`).

### Design system (in `globals.css`)

- **Dark-only palette** lives in `:root` (not `.dark`) as hex CSS variables — near-black `--background: #08080a`, muted `--muted-foreground`, subtle `--border`. `--glow` is an `R G B` tri(used as `rgb(var(--glow))` / `rgba(var(--glow), …)`) for the signature indigo accent.
- **Custom utilities**: `.bg-grid` / `.bg-grid-sm` / `.bg-dots` (backdrops), `.mask-fade-b` / `.mask-radial` (edge fades), `.text-display` (muted top-lit gradient heading), `.reveal` + `.is-in` (scroll-in, driven by the `Reveal` component and respecting `prefers-reduced-motion`).
- **Motion**: keyframes `drift`, `corePulse`, `dashFlow`, `spinSlow`, `glowBreath`, `marquee`. All animation is disabled under `prefers-reduced-motion`.
- **Typography convention**: Geist Sans for display/body; Geist Mono (`font-mono`) uppercase with wide tracking for all eyebrows/labels/serial-number motifs.
- Product/feature preview visuals are hand-built with inline SVG + Tailwind (no image assets) — see `products.tsx` and `memory-graph.tsx`.

When adding features, follow App Router conventions: route folders under `src/app/`, colocated `page.tsx`/`layout.tsx`/`loading.tsx`, Server Components by default, and `"use client"` only where interactivity requires it.

## Deployment

Targeted at Vercel. Prefer Fluid Compute (the default) over Edge runtime, and Vercel Marketplace integrations for storage/databases rather than custom infra.
