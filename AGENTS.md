# AGENT_PLAYBOOK

Unified cheat sheet so any AI agent (Claude Code, GPT, etc.) can understand the repository instantly.

## Project Snapshot

- **Name**: NES.css × Next.js Portfolio Starter
- **Goal**: Provide a retro-styled TypeScript/Next.js base that can merge to `main` and deploy automatically to Vercel.
- **Entry points**: `src/app/layout.tsx`, `src/app/page.tsx`, global styles in `src/app/globals.css`.

## Stack Table

| Layer               | Tool                                 | Version / Constraints                                               | Notes                                                                                                                                                                                                                                                                             |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime             | Node.js                              | >=20.9.0 (workstation default v25.2.0)                              | Matches Next.js 16 requirement.                                                                                                                                                                                                                                                   |
| Package Manager     | pnpm                                 | 10.13.1                                                             | Uses `pnpm-lock.yaml`; install via `pnpm install`.                                                                                                                                                                                                                                |
| Framework           | Next.js                              | 16.3.6 (App Router, `src/` layout)                                  | React Compiler disabled.                                                                                                                                                                                                                                                          |
| Language            | TypeScript                           | ^5.x                                                                | `moduleResolution: bundler`, `@/*` alias -> `./src/*`.                                                                                                                                                                                                                            |
| UI Library          | React / React DOM                    | 19.2.0                                                              | Concurrent React 19 APIs available.                                                                                                                                                                                                                                               |
| Styling             | Tailwind CSS                         | 3.4.18                                                              | Config in `tailwind.config.js`; `globals.css` imports directives.                                                                                                                                                                                                                 |
| Theme               | NES.css                              | 2.3.0                                                               | Imported in `globals.css` as `layer(nes)` (between Tailwind base and utilities).                                                                                                                                                                                                  |
| Fonts               | next/font (Google) + next/font/local | Noto Sans JP (Google); Press Start 2P (bundled unmodified TTF, OFL) | `--font-press` is the body default, drawn at `size-adjust: 90%` so Latin balances the Japanese pixel glyphs; `.font-body` = Noto for descriptive copy.                                                                                                                            |
| Japanese pixel font | next/font/local                      | PixelMplus12 Bold (subset woff2, ~125KB)                            | `src/app/fonts/` + M+ license file; fallback for Japanese glyphs in Press Start 2P text (`--font-pixel-jp`, glyphs re-fitted in the subset to Press Start's cap height, baseline and 1/8-em spacing). Regenerate with `scripts/subset-pixel-font.py` (Python + fonttools/brotli). |
| 3D                  | three.js                             | 0.187.x (+ `@types/three`)                                          | Hero voxel scene only; dynamically imported on the client.                                                                                                                                                                                                                        |
| Build Tools         | PostCSS + Autoprefixer               | 8.5.6 / 10.4.22                                                     | `postcss.config.js` standard pipeline.                                                                                                                                                                                                                                            |
| Formatter           | Prettier                             | ^3.x                                                                | `prettier.config.cjs` + `prettier-plugin-tailwindcss`.                                                                                                                                                                                                                            |
| Linting             | ESLint                               | 9.x + `eslint-config-next`                                          | Config located at `eslint.config.mjs`.                                                                                                                                                                                                                                            |
| Deployment          | Vercel                               | Connects on push to `main`                                          | No custom server code.                                                                                                                                                                                                                                                            |

## Operational Notes

1. **Scripts** – `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm lint:fix`, `pnpm format`, `pnpm format:check`.
2. **Environment** – `.npmrc` sets `shamefully-hoist=true`, `strict-peer-dependencies=false`. npm will warn but pnpm honors them.
3. **Assets** – Favicon assets live under `src/app/` (e.g. `src/app/favicon.ico`, `src/app/icon.svg`).
4. **Typography** – All text sizes come from the global type scale in `src/app/globals.css` (`type-label` 14px (≈12.6px Latin at 90%), `type-title`/`type-body` 16→18px, `type-lead` 18→20px, `type-stat`, `type-heading`, `type-display`). Components must not use Tailwind `text-*` size utilities.
5. **Styling Flow** – NES.css + Tailwind; prefer utility classes plus `.nes-*` components. Mobile-first responsive approach: default styles target 320px+, then `sm:` (640px), `md:` (768px), `lg:` (1024px). NES.css components have mobile overrides in `globals.css` at `max-width: 639px`.
   - The unified retro blue accent token, `fami-blue` (`#4f86c6`), is used by Activity filters/badges, Top Menu active states, and NES primary buttons.
6. **Testing** – No automated tests yet; rely on lint/build. Agents should add tests when implementing logic.

## UI / Information Architecture Notes

- Landing page composition lives in `src/app/page.tsx` and is intentionally thin.
- Menu navigation is implemented via `src/components/TableOfContents.tsx` + `src/components/toc.ts`.
- All sections are visible from first paint (the old session-scoped start gate is gone). The top menu is always shown on `sm+`; phones use the hamburger.
  - The Hero (`src/components/Hero.tsx`) is a full-screen layout: a large avatar (left on `lg+`, sized by both width and viewport height so the hero fits one screen; stacked on top below `lg`) next to the name, an "a.k.a. BUZZ" nickname line, role, a short `profile.body`, socials, and a SCROLL ▼ cue at the bottom (there is no START button anymore). `src/components/HeroAvatar.tsx` always shows the crisp original `profile.png` (gold frame + red shadow, like the original design) and tilts it toward the pointer with CSS 3D. three.js is lazy-loaded only for motion: on load (and on click) the avatar is rebuilt from voxels that drop in row by row and bounce, then cross-fades back to the image and the render loop stops. Voxels are not the resting state because the source art is not on an exact pixel grid (regular-grid sampling looked blurry). Reduced motion or no WebGL shows the plain image. If the avatar image changes, re-check `GRID` / `BG_TOLERANCE` in `HeroAvatar.tsx`.
  - Scroll reveal: elements with `data-reveal` are revealed by `src/components/RevealObserver.tsx`; hiding only applies when the layout's inline script adds `html.reveal-ready` (skipped for reduced motion / no IntersectionObserver).
  - Sections share `src/components/sections/SectionShell.tsx` (pixel heading with icon + lead, `max-w-7xl`; no "01 / STAGE" style numbering — removed on request).
- Menu is styled as a sticky “HUD” so it remains visible while scrolling.
- Semantic sections live under `src/components/sections/*` and each owns a stable `id`
  for in-page anchor navigation.
- Content data is centralized in `src/content/portfolio.ts` for maintainability.
  - Skills support categorized groups (`skills.categories`) with a backward-compatible flat list (`skills.items`) derived from categories.
    - Skills use `years` (required) and can optionally include `firstUsedYear` / `lastUsedYear` to show recency; an active skill omits the current calendar year from its range.
    - Each skill renders as an RPG-style "level" tile (`src/components/sections/SkillLevelBar.tsx`) in a 2–6 column grid: the years count up and a segmented meter fills when scrolled into view (reduced-motion snaps to final).
  - Writing/Blog links, books, and external media articles live in `portfolio.writing` and are rendered in `src/components/sections/WritingSection.tsx`.
  - Activities (Talks/Community/Achievements) live in `portfolio.activities` and are rendered in `src/components/sections/ActivitiesSection.tsx`.
    - Activities uses `src/components/sections/ActivitiesOutputGrid.tsx` for category filters and a bento card grid (newest image item featured at 2x2), ordered newest first (an optional `date` field, `YYYY-MM-DD`/`YYYY-MM`, gives month/day precision; otherwise a period uses its ending year). An optional local `image` is rendered above the card text; entries without one are text-only. Each item supports a primary `link` and an optional `slides` link (e.g. Speaker Deck), both shown in the card footer.
  - Work (company/organization blocks with nested Projects) lives in `portfolio.work` and is rendered in `src/components/sections/WorkSection.tsx`.
    - Work is a gantt timeline (`src/components/sections/WorkTimeline.tsx`, client) built from `workTimelineVm.ts`, which parses `period` (`"現在"` = now) and lanes by the optional `WorkEntry.kind` (`"main"` default / `"side"`). Selecting a bar opens a callout panel: a caret slides under the selected bar and the panel border/badges take the bar's color (gold = main, blue = side). The panel header shows MAIN/SIDE, period, approximate duration (half-year rounding, "継続中" when ongoing) and ◀ ▶ prev/next buttons (chronological, `n / total`); the body is split into ABOUT, TECH STACK (company + project tech, de-duplicated) and a numbered PROJECTS list. Projects can carry optional `links` (label + href, e.g. press releases) rendered as link buttons — put URLs there, not inside `summary` text (plain text is not linkified). Entries are sorted by start year in the VM.
  - Optional visuals:
    - Static assets live under `public/assets/`
    - Projects can optionally specify `project.asset` to render a diagram/thumbnail in Work
  - Optional icons:
    - Pixel-style icons live under `public/assets/pixel/icons/`
    - Use `src/components/PixelIcon.tsx` for consistent sizing + decorative a11y defaults
  - Motion:
    - CSS-only motion utilities live in `src/app/globals.css` (e.g. reduced-motion aware helpers)

## Workflow Expectations

- Branch from feature branch, open PR → merge to `main` → Vercel autodeploy.
- When adding runtime deps, update `package.json` and lockfile, then document them in this playbook.
- Keep README aligned with AGENTS/CLAUDE docs to avoid drift.

## Documentation Sync Rules

Use the following checklist whenever you modify code, dependencies, or build/deploy steps:

1. Re-read `README.md`, `AGENTS.md`, and `CLAUDE.md` before coding to understand the current contract.
2. If your change touches tooling, stack details, scripts, runtime expectations, or top-level UX, you **must** update all three documents in the same change set so they remain consistent.
3. Ensure each doc reflects its audience:
   - `README.md`: human-friendly overview of what changed.
   - `AGENTS.md`: exhaustive stack table + operational notes.
   - `CLAUDE.md`: Claude-specific boot/deploy guidance.
4. After editing, scan the trio again for stale references (versions, commands, features) and fix discrepancies.
5. In your task summary, mention “Docs synced” to confirm you enforced these rules.

## Active Technologies

- TypeScript 5.x + Next.js 16.0.7, React 19.2.1 + Tailwind CSS 3.4.18, NES.css 2.3.0 (041-add-codezine-series)
- Static file (`src/content/portfolio.ts`) — no database (041-add-codezine-series)

## Recent Changes

- 041-add-codezine-series: Added TypeScript 5.x + Next.js 16.0.7, React 19.2.1 + Tailwind CSS 3.4.18, NES.css 2.3.0

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

**Keep this block, including in commits.** It is part of the project's agent setup, maintained by `next dev` for every agent that works here. If it appears as an uncommitted change, that is intentional — commit it as-is. Do not remove it to clean up a diff; it will be regenerated.
<!-- END:nextjs-agent-rules -->
