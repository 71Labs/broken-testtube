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

- `src/app/layout.tsx` — root layout (**light**, no `dark` class). Loads Geist Sans (`--font-sans`), Geist Mono (`--font-geist-mono`), Instrument Serif (`--font-serif`). Holds site `metadata`.
- `src/app/page.tsx` — composes the landing page in order: Header → Hero → ProductsIntro (`#products`) → Talise → Utsuro → Capabilities (`#studio`) → ContactCTA (`#contact`) → Footer.
- `src/app/globals.css` — Tailwind import + the design system (see below).
- `src/components/site/` — one file per landing section. Server Components by default; only `header.tsx` and `reveal.tsx` are `"use client"`.

### Light, SpaceX/Grok-style — two products, one studio

The site is **light** (white canvas, near-black text, huge white space), modeled on the xAI/Grok landing page. 71Labs is the **studio**; it ships **two** real products, each with an accent used only for small touches (icon tile, eyebrow, bullet checks, "Explore →"):
- **Talise** (talise.io) — consumer stablecoin payments on Sui. Green accent `#3c9a4e` (icon tile lime `#b7f486`). Real iPhone screenshots in `public/talise/`.
- **Utsuro** (utsuro.xyz) — AI image & video (assistant sharpens prompt → 0G Compute renders, verifiable on-chain; Z-Image-Turbo / MiniMax H3 / Qwen3-VL). Orange accent `#e8681e`. Assets in `public/utsuro/`: `app.png` (real app screenshot) + `out-*.png` (real AI renders cropped from marketing shots). `UtsuroMark` is in `utsuro-mark.tsx`.

Key components:
- **`header.tsx`** — light sticky header with a **Products mega-menu** (hover/click dropdown listing Talise + Utsuro with marks & descriptions) and a black "Work with us" `PillButton`.
- **`hero.tsx`** — centered: a "New · Utsuro is in beta" pill, a **two-tone** heading (black line + grey `.text-dim` line), centered black/outline pill CTAs.
- **`product-section.tsx`** — the reusable xAI-style feature block: icon + mono eyebrow + big title + description + check-bullets + CTAs on one side, a large preview card on the other; `reverse` flips the columns. `talise.tsx` and `utsuro.tsx` are thin wrappers that pass content + a bespoke preview (Talise fans three phone screenshots on a green-tinted card; Utsuro shows the app in a browser frame + a 4-render strip).
- **`pill-button.tsx`** — `primary` (black pill, white arrow chip) / `secondary` (outlined). **Keep copy truthful** — don't invent products or investors.

### Design system (in `globals.css`)

- **Light palette** in `:root` as hex — `--background: #ffffff`, `--foreground: #0a0a0a`, `--card: #f6f6f4`, muted `--muted-foreground: #71717a`, hairline `--border: rgba(10,10,10,0.1)`. Product accents `--talise` / `--utsuro` exist but components mostly pass hex inline. **Note:** the site imports `shadcn/tailwind.css`; after editing `globals.css` tokens, **restart the dev server** — CSS-var changes don't always hot-reload and can leave a stale (dark) palette.
- **Utilities**: `.text-display` / `.text-dim` (two-tone headings), `.reveal` + `.is-in` (scroll-in via the `Reveal` component, respects `prefers-reduced-motion`).
- **Motion**: keyframes `drift`, `marquee` only. Disabled under `prefers-reduced-motion`.
- **Typography**: Geist Sans display/body; Geist Mono (`font-mono`) uppercase wide-tracked for eyebrows/labels; Instrument Serif (`font-serif`) available for accents.

When adding features, follow App Router conventions: route folders under `src/app/`, colocated `page.tsx`/`layout.tsx`/`loading.tsx`, Server Components by default, and `"use client"` only where interactivity requires it.

## Deployment

Targeted at Vercel. Prefer Fluid Compute (the default) over Edge runtime, and Vercel Marketplace integrations for storage/databases rather than custom infra.
