# CLAUDE_CODE_GUIDE

Focused tips for Anthropic Claude Code / Workbench agents interacting with this repo.

## Quick Facts

- **Framework**: Next.js 16 (App Router, TypeScript 7, Tailwind 4, three.js hero, NES.css for a few retro widgets).
- **Runtime**: Node.js v25.2.0 via `nvm` (see `~/.nvm/versions/node/v25.2.0`). Ensure `source ~/.nvm/nvm.sh` before running commands.
- **Package Manager**: pnpm 10.13.1. Prefer `pnpm install` over npm/yarn to keep lockfile consistent.

## How to Start a Session

1. `pnpm install` – installs deps using `.npmrc` hoist settings.
2. `pnpm dev` – launches dev server on `http://localhost:3000`.
3. `pnpm lint` – primary verification step (no tests yet). Add playwright/vitest if implementing complex features.
4. `pnpm format:check` – formatter check (Prettier + Tailwind class sorting).

## Repo Hotspots

- `src/app/page.tsx` – Landing page composition (Menu + Hero → sections + `RevealObserver`). Keep it thin; put content in sections and data in `src/content/portfolio.ts`.
- `src/components/TableOfContents.tsx` – Menu UI (in-page navigation, sticky HUD).
- `src/components/Hero.tsx` – Full-screen hero (server): big avatar (left column on `lg+`, `min(46vw,40rem,100svh-12rem)`; stacked below `lg`) + name, "a.k.a. BUZZ", role, `profile.body` (kept short by the user, 1–2 sentences), socials, SCROLL ▼ cue. No START button (removed on request; the user only wants it to be obvious that the page scrolls). Keep it simple and icon-first (the user wants the dot avatar large and little empty space). Content is never gated.
- `src/components/HeroAvatar.tsx` – The resting state is the crisp original `profile.png` in a gold frame (the user found the voxel-only avatar too blurry — the art isn't on an exact pixel grid). three.js (lazy) plays a voxel intro on load and on click (drop-in + bounce, unlit `MeshBasicMaterial`), then cross-fades back to the image and stops the loop. Pointer tilt is CSS 3D on the wrapper (`.hero-avatar`). `html.reveal-ready .hero-avatar img` starts hidden so the image doesn't flash before the intro. Reduced motion / no WebGL = image only.
- `src/components/RevealObserver.tsx` – One IntersectionObserver for every `[data-reveal]` (stagger via `--reveal-delay`); CSS hides only under `html.reveal-ready` (set in `layout.tsx`; class name in `src/components/reveal.ts`). Don't put `data-reveal` on elements that mount later (it only scans on mount) — use `.animate-fade-up` instead.
- `src/components/sections/SectionShell.tsx` – Shared section band (pixel heading with icon + lead, `max-w-7xl`; no "01 / STAGE" style numbering — removed on request).
- `src/components/sections/SkillLevelBar.tsx` – Client skill "level" tile: years count up + segmented meter fills on scroll-into-view (reduced-motion aware).
- `src/components/sections/*` – Semantic sections; each owns a stable `id` for `#hash` navigation.
- `src/components/sections/WorkSection.tsx` – Work section (server) → `WorkTimeline.tsx` (client gantt: MAIN/SIDE lanes; the selected bar gets a sliding caret pointing at a color-matched callout panel with ◀ ▶ prev/next, ABOUT / TECH STACK / numbered PROJECTS. The old mobile pills were dropped — prev/next covers small screens).
- `src/components/sections/workTimelineVm.ts` – Parses `period` (`"現在"` = now) into fractional years and lanes entries by `WorkEntry.kind` (`"main"` default, `"side"`), sets `ongoing`, and sorts entries chronologically (prev/next relies on it).
- `src/components/sections/WritingSection.tsx` – Writing/blog, book, and external-media links section.
- `src/components/sections/ActivitiesSection.tsx` – Activities section shell (Talks/Community/Achievements).
- `src/components/sections/ActivitiesOutputGrid.tsx` – Client-side category filters and bento card grid for Activities (newest image item featured large; descriptions clamped), ordered newest first (an optional `date` field, `YYYY-MM-DD`/`YYYY-MM`, gives month/day precision; otherwise a period uses its ending year); optional local Activity images render above text, otherwise cards are text-only. Each item can carry a primary `link` plus an optional `slides` link (e.g. Speaker Deck), both rendered in the card footer.
- `src/app/icon.svg` – Primary browser tab icon (SVG). Keep `src/app/favicon.ico` as fallback.
- `src/content/portfolio.ts` – Public content (committed in repo).
  - Skills use `years` (required) and can optionally include `firstUsedYear` / `lastUsedYear` (numeric years) to show recency; active skills omit the current calendar year from their range.
- `public/assets/` – Static diagrams/screenshots (optional); Projects can specify `project.asset` to render visuals.
- `public/assets/pixel/icons/` – Pixel-style icon set (optional); use `src/components/PixelIcon.tsx`.
- `src/app/globals.css` – Global palette, `.card`/`.chip`, scroll-reveal + gantt + skill-meter styles, reduced-motion overrides. NES.css is imported here into its own cascade layer (`@layer theme, base, nes, components, utilities`) so it still overrides preflight but Tailwind utilities (e.g. `text-fami-gold` on an `<a>`) beat its element defaults like `a { color: #209cee }`. Don't re-import NES.css in `layout.tsx`.
- The unified `fami-blue` palette token (`#4f86c6`) is used by Activity accents, Top Menu active states, and NES primary buttons.
- `src/app/layout.tsx` – Fonts, metadata, reveal-ready inline script; extend when adding OG tags or global providers.
- `postcss.config.js` – Uses `@tailwindcss/postcss` (Tailwind v4); modify when adding PostCSS plugins.
- `src/app/globals.css` – Tailwind v4 entry (`@import "tailwindcss"`) + `@theme` for custom colors (fami-*). No `tailwind.config.js` needed.

## Typography Rule (must follow)

- Text sizes come ONLY from the type scale in `src/app/globals.css`: `type-label` (14px pixel UI — Press Start is drawn at 90%, so ≈12.6px: tags, years, meta, nav, axis, buttons), `type-title` (16→18px card/item titles), `type-body` (16→18px copy, pair with `font-body`), `type-lead` (18→20px), `type-stat` (28→36px numbers), `type-heading` (30→48px), `type-display` (28→36→48px).
- Do NOT use Tailwind size utilities (`text-xs`/`text-sm`/`text-lg`/`text-[0.6rem]`…) in components; the user explicitly wants every size globally uniform. Check with `grep -rnE "text-(\[[0-9.]+rem\]|xs|sm|base|lg|xl|[2-9]xl)" src/components` (should print nothing).
- Long labels: make room via layout (fewer columns, wrap points like `/\u200b`), not by shrinking the font.

## Coding Conventions

- Use TypeScript with strict mode on; favor functional components + server components unless interactivity is required.
- Prefer Tailwind utilities; fallback to NES.css classes for retro widgets.
- Use mobile-first responsive approach: default styles for 320px+, then `sm:` (640px), `md:` (768px), `lg:` (1024px). NES.css overrides for mobile live in `globals.css` at `max-width: 639px`.
- Keep metadata in `layout.tsx` accurate whenever you add new assets (`public/og.png`, etc.).

## Deployment Checklist for Claude

1. Bump `package.json` version if the change is user-facing (current version: `1.4.0`).
2. Run `pnpm build` to catch Next.js warnings before pushing.
3. Ensure docs (`README.md`, `AGENTS.md`, `CLAUDE.md`) mention new dependencies or workflows.
4. Merge to `main` and push to trigger Vercel.

## Troubleshooting

- **Missing styles**: Tailwind v4 auto-detects content; if classes are missing check `@theme` in `globals.css` for custom tokens. Run `pnpm dev` again.
- **Font issues**: `body` defaults to `var(--font-press), var(--font-pixel-jp), var(--font-noto)`: Latin in Press Start 2P (bundled unmodified TTF + OFL in `src/app/fonts/`, loaded via `next/font/local` with `size-adjust: 90%` because full-size Latin looked bigger than the Japanese), Japanese in bundled **PixelMplus12 Bold** (`src/app/fonts/`, subset woff2) so mixed titles like 株式会社Eureka read as one pixel font; the subset script re-fits the Japanese glyphs (scaled to 87.5%, bottom on the baseline, centred with a 1/8-em gap) to match Press Start's caps — don't add CSS `font-size-adjust`/`size-adjust` on top (non-integer scaling blurs the 12-dot glyphs). The subset covers kana, JIS level-1 kanji and every Japanese char in `src/` — if new content uses rare kanji and they render in Noto, re-run `scripts/subset-pixel-font.py` (needs Python + `fonttools brotli`, TTF from github.com/itouhiro/PixelMplus). Put `.font-body` on paragraphs/descriptions so they render in Noto. Avoid `font-bold` on pixel text (synthetic bold looks smeared).
- **Icons**: `PixelIcon` sizes are `sm` 16 / `md` 20 / `lg` 28 / `xl` 40; nav + menus use `lg`, section headings and hero socials use `xl`.
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

- TypeScript 7.0.2 + Next.js 16.3.6 (Turbopack), React 19.2.1, Tailwind CSS 4.3.2, NES.css 2.3.0
- `@typescript/native-preview` (Go-based TS compiler, for Next.js build detection)
- three.js 0.187 (hero scene only, lazy-loaded)
- `@babel/eslint-parser` + `@babel/preset-typescript` + `@babel/preset-react` (replaces typescript-eslint)
- `@tailwindcss/postcss` v4 (replaces `tailwindcss` PostCSS plugin)
- Static file (`src/content/portfolio.ts`) — no database

## Recent Changes

- redesign-motion (1.4.0): retro × modern redesign — three.js voxel hero, gantt Work timeline, bento Activities, skill tiles, scroll reveal; PRESS START gate/button removed (hero = avatar + a.k.a. BUZZ + SCROLL cue)
- 042-ts7-upgrade: TypeScript 7 + Tailwind v4 + Next.js 16.3.0-preview.5; ESLint migrated to @babel/eslint-parser
