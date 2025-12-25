# AGENT_PLAYBOOK

Unified cheat sheet so any AI agent (Claude Code, GPT, etc.) can understand the repository instantly.

## Project Snapshot

- **Name**: NES.css × Next.js Portfolio Starter
- **Goal**: Provide a retro-styled TypeScript/Next.js base that can merge to `main` and deploy automatically to Vercel.
- **Entry points**: `src/app/layout.tsx`, `src/app/page.tsx`, global styles in `src/app/globals.css`.

## Stack Table

| Layer           | Tool                   | Version / Constraints                  | Notes                                                             |
| --------------- | ---------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| Runtime         | Node.js                | >=20.9.0 (workstation default v25.2.0) | Matches Next.js 16 requirement.                                   |
| Package Manager | pnpm                   | 10.13.1                                | Uses `pnpm-lock.yaml`; install via `pnpm install`.                |
| Framework       | Next.js                | 16.0.3 (App Router, `src/` layout)     | React Compiler disabled.                                          |
| Language        | TypeScript             | ^5.x                                   | `moduleResolution: bundler`, `@/*` alias -> `./src/*`.            |
| UI Library      | React / React DOM      | 19.2.0                                 | Concurrent React 19 APIs available.                               |
| Styling         | Tailwind CSS           | 3.4.18                                 | Config in `tailwind.config.js`; `globals.css` imports directives. |
| Theme           | NES.css                | 2.3.0                                  | Imported in layout for pixel-art UI.                              |
| Fonts           | next/font (Google)     | Noto Sans JP, Press Start 2P           | Exposed as CSS variables `--font-noto`, `--font-press`.           |
| Build Tools     | PostCSS + Autoprefixer | 8.5.6 / 10.4.22                        | `postcss.config.js` standard pipeline.                            |
| Formatter       | Prettier               | ^3.x                                   | `prettier.config.cjs` + `prettier-plugin-tailwindcss`.            |
| Linting         | ESLint                 | 9.x + `eslint-config-next`             | Config located at `eslint.config.mjs`.                            |
| Deployment      | Vercel                 | Connects on push to `main`             | No custom server code.                                            |

## Operational Notes

1. **Scripts** – `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm lint:fix`, `pnpm format`, `pnpm format:check`.
2. **Environment** – `.npmrc` sets `shamefully-hoist=true`, `strict-peer-dependencies=false`. npm will warn but pnpm honors them.
3. **Assets** – Favicon assets live under `src/app/` (e.g. `src/app/favicon.ico`, `src/app/icon.svg`).
4. **Styling Flow** – NES.css + Tailwind; prefer utility classes plus `.nes-*` components.
5. **Testing** – No automated tests yet; rely on lint/build. Agents should add tests when implementing logic.

## UI / Information Architecture Notes

- Landing page composition lives in `src/app/page.tsx` and is intentionally thin.
- Menu navigation is implemented via `src/components/TableOfContents.tsx` + `src/components/toc.ts`.
- Menu is displayed directly under the Hero and provides in-page navigation.
- Menu is styled as a sticky “HUD” so it remains visible while scrolling.
- Semantic sections live under `src/components/sections/*` and each owns a stable `id`
  for in-page anchor navigation.
- Content data is centralized in `src/content/portfolio.ts` for maintainability.
  - Private overrides can be injected via env vars (no private content committed to git).
  - Skills support categorized groups (`skills.categories`) with a backward-compatible flat list (`skills.items`) derived from categories.
    - Skills use `years` (required) and can optionally include `firstUsedYear` / `lastUsedYear` to show recency.
  - Writing/Blog links live in `portfolio.writing` and are rendered in `src/components/sections/WritingSection.tsx`.
  - Activities (Talks/Books/Community) live in `portfolio.activities` and are rendered in `src/components/sections/ActivitiesSection.tsx`.

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
