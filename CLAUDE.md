# CLAUDE_CODE_GUIDE

Focused tips for Anthropic Claude Code / Workbench agents interacting with this repo.

## Quick Facts

- **Framework**: Next.js 16 (App Router, TypeScript 7, Tailwind 4, NES.css theme).
- **Runtime**: Node.js v25.2.0 via `nvm` (see `~/.nvm/versions/node/v25.2.0`). Ensure `source ~/.nvm/nvm.sh` before running commands.
- **Package Manager**: pnpm 10.13.1. Prefer `pnpm install` over npm/yarn to keep lockfile consistent.

## How to Start a Session

1. `pnpm install` – installs deps using `.npmrc` hoist settings.
2. `pnpm dev` – launches dev server on `http://localhost:3000`.
3. `pnpm lint` – primary verification step (no tests yet). Add playwright/vitest if implementing complex features.
4. `pnpm format:check` – formatter check (Prettier + Tailwind class sorting).

## Repo Hotspots

- `src/app/page.tsx` – Landing page composition (Hero → Menu → sections). Keep it thin; put content in sections and data in `src/content/portfolio.ts`.
- `src/components/TableOfContents.tsx` – Menu UI (in-page navigation, sticky HUD).
- `src/components/Hero.tsx` – Hero header (includes **PRESS START** interaction that reveals the Menu; session-scoped).
- `src/components/sections/*` – Semantic sections; each owns a stable `id` for `#hash` navigation.
- `src/components/sections/WorkSection.tsx` – Unified Work section (company blocks with nested Projects). Work is rendered as a deliberately “unique screen” (RPG-like STATUS / QUEST LOG / DETAIL).
- `src/components/sections/WorkQuestLog.tsx` – Client component that handles quest selection state + detail swapping (kept small on purpose).
- `src/components/sections/workRpgVm.ts` / `src/components/sections/workRpgId.ts` – Derived view models and stable quest id generation (deterministic + de-dup suffix).
- `src/components/sections/WritingSection.tsx` – Writing/blog links section (external links).
- `src/components/sections/ActivitiesSection.tsx` – Activities section (Talks/Books/Community).
- `src/components/AchievementToast.tsx` – Client-only “Achievement Unlocked” toast (session-scoped: shown once on first in-view, dismissible, reduced-motion aware).
- `src/app/icon.svg` – Primary browser tab icon (SVG). Keep `src/app/favicon.ico` as fallback.
- `src/content/portfolio.ts` – Public content (committed in repo).
  - Skills use `years` (required) and can optionally include `firstUsedYear` / `lastUsedYear` (numeric years) to show recency.
- `public/assets/` – Static diagrams/screenshots (optional); Projects can specify `project.asset` to render visuals.
- `public/assets/pixel/icons/` – Pixel-style icon set (optional); use `src/components/PixelIcon.tsx`.
- `src/app/globals.css` – Global palette + small CSS-only motion utilities (reduced-motion aware) + NES.css mobile overrides (`max-width: 639px`).
- `src/app/layout.tsx` – Imports NES.css, fonts, metadata; extend when adding OG tags or global providers.
- `postcss.config.js` – Uses `@tailwindcss/postcss` (Tailwind v4); modify when adding PostCSS plugins.
- `src/app/globals.css` – Tailwind v4 entry (`@import "tailwindcss"`) + `@theme` for custom colors (fami-*). No `tailwind.config.js` needed.

## Coding Conventions

- Use TypeScript with strict mode on; favor functional components + server components unless interactivity is required.
- Prefer Tailwind utilities; fallback to NES.css classes for retro widgets.
- Use mobile-first responsive approach: default styles for 320px+, then `sm:` (640px), `md:` (768px), `lg:` (1024px). NES.css overrides for mobile live in `globals.css` at `max-width: 639px`.
- Keep metadata in `layout.tsx` accurate whenever you add new assets (`public/og.png`, etc.).

## Deployment Checklist for Claude

1. Bump `package.json` version if the change is user-facing (current version: `1.1.0`).
2. Run `pnpm build` to catch Next.js warnings before pushing.
3. Ensure docs (`README.md`, `AGENTS.md`, `CLAUDE.md`) mention new dependencies or workflows.
4. Merge to `main` and push to trigger Vercel.

## Troubleshooting

- **Missing styles**: Tailwind v4 auto-detects content; if classes are missing check `@theme` in `globals.css` for custom tokens. Run `pnpm dev` again.
- **Font issues**: Check that `var(--font-press)` / `var(--font-noto)` are used in inline styles or className as needed.
- **Node mismatch**: `nvm use 25.2.0`; Next.js requires >=20.9.0.

## Documentation Sync Rules (Claude)

Treat these steps as part of every task:

1. Review `README.md`, `AGENTS.md`, and this file before making code changes so you know the current stack and workflows.
2. If you alter dependencies, scripts, runtime assumptions, deployment flow, or high-level UI behavior, update **all three docs** in the same PR/commit. Never leave them out of sync.
3. Tailor the messaging per file:
   - `README.md`: summary for humans.
   - `AGENTS.md`: canonical stack/ops table.
   - `CLAUDE.md`: Claude-focused tips (i.e., this section).
4. Re-read each doc after editing to catch stale versions or commands.
5. End your task report with “Docs synced” (or explain why not) to prove you enforced the rule set.

## Useful Snippets

```bash
source ~/.nvm/nvm.sh && nvm use 25.2.0
pnpm install
pnpm format:check && pnpm lint && pnpm build
```

## TypeScript 7 Notes

TypeScript 7 is the Go-based rewrite. Key differences from TS5:

- `require('typescript')` only exports `{version, versionMajorMinor}` — full API is under `typescript/unstable/*`
- `typescript-eslint` does not support TS7; replaced by `@babel/eslint-parser` + `@babel/preset-typescript`
- Next.js build uses `@typescript/native-preview` (Go compiler) detected automatically; JS-API-based build-time type checking is skipped
- Type checking: run `pnpm typecheck` (`tsc --noEmit` via `typescript/lib/tsc.js`)
- ESLint: `@next/eslint-plugin-next` + `eslint-plugin-react*` + `@babel/eslint-parser` (no typescript-eslint)

## Active Technologies

- TypeScript 7.0.2 + Next.js 16.3.0-preview.5 (Turbopack), React 19.2.1, Tailwind CSS 4.3.2, NES.css 2.3.0
- `@typescript/native-preview` (Go-based TS compiler, for Next.js build detection)
- `@babel/eslint-parser` + `@babel/preset-typescript` + `@babel/preset-react` (replaces typescript-eslint)
- `@tailwindcss/postcss` v4 (replaces `tailwindcss` PostCSS plugin)
- Static file (`src/content/portfolio.ts`) — no database

## Recent Changes

- 042-ts7-upgrade: TypeScript 7 + Tailwind v4 + Next.js 16.3.0-preview.5; ESLint migrated to @babel/eslint-parser
