# Portfolio

Phase 1 of the Famicom-style portfolio for Takeshi Watanabe (Buzz). Built with Next.js 16 + TypeScript + Tailwind CSS + NES.css. This commit focuses on the "frame" only—each section ships with placeholder copy so real content can slide in during Phase 2.

## What's included now

- Hero + Menu + Profile/Experience/Projects/Writing/Activities/Skills/Contact sections (single-page) composed via `src/components/*`
- Famicom palette (red `#a20000`, gold `#d7b05b`, background `#111`) and retro typography (Press Start 2P + Noto Sans JP)
- NES.css buttons, badges, and progress bars wired up for later polish
- Menu is displayed directly under the Hero and provides in-page navigation
- Menu is a **sticky HUD**: it stays visible while scrolling for fast section jumping

## Project layout

```text
src/
  app/
    layout.tsx      // fonts, NES import, metadata
    page.tsx        // assembles Hero → Menu → sections/*
    globals.css     // Tailwind + palette helpers
    favicon.ico     // legacy favicon fallback
    icon.svg        // primary tab icon (SVG)
  components/
    Hero.tsx
    TableOfContents.tsx
    toc.ts
    sections/
      ProfileSection.tsx
      ExperienceSection.tsx
      ProjectsSection.tsx
      WritingSection.tsx
      ActivitiesSection.tsx
      SkillsSection.tsx
      ContactSection.tsx
```

Visit <http://localhost:3000> to confirm the Mario-inspired layout.

## Getting started

```bash
pnpm install
pnpm dev
```

Visit <http://localhost:3000> and you'll see the empty frames ready for content.

## Scripts

- `pnpm dev` – Next.js dev server
- `pnpm build` – Production build (used by Vercel)
- `pnpm start` – Run the production build locally
- `pnpm lint` – ESLint (core web vitals config)
- `pnpm lint:fix` – ESLint auto-fix
- `pnpm format` – Prettier write (includes Tailwind class sorting)
- `pnpm format:check` – Prettier check

## Next phases

1. **Phase 2 – Content**: swap placeholder text for real About/Projects/Skills/Contact data.
2. **Phase 3 – Polish**: dot backgrounds, NES balloons, PRESS START animation, cursor effects, etc.

When a change affects dependencies or workflows, remember to update README / docs alongside the code

## Available scripts

- `pnpm dev` – start Next.js in development mode
- `pnpm build` – production build (invoked by Vercel)
- `pnpm start` – run the production build locally
- `pnpm lint` – run ESLint over the repo

## Deployment

1. Commit your changes on `main` (or merge your feature branch).
2. Push to GitHub; Vercel will automatically build via the connected pipeline.
3. For manual deploys you can also run `pnpm dlx vercel` followed by `pnpm dlx vercel --prod`.

## Customizing next steps

- Update the copy/data in `src/content/portfolio.ts` (profile/experience/projects/writing/activities/skills/contact).
- If you want to keep some details off the public repo, you can provide private overrides via
  environment variables (see `src/content/portfolio.ts`: `PORTFOLIO_PRIVATE_JSON` or
  `PORTFOLIO_PRIVATE_URL`).
  - For Google Sheets/Docs maintenance, a practical pattern is:
    Google Sheet (Drive) → Google Apps Script Web App (JSON API + token) →
    set `PORTFOLIO_PRIVATE_URL` + `PORTFOLIO_PRIVATE_URL_BEARER` +
    `PORTFOLIO_PRIVATE_REVALIDATE_SECONDS=86400` (24h cache).
  - Projects can include `visibility: "public" | "private"`. Private items will be redacted
    on the public page (summary/outcome/link hidden).
    - With current UI, `visibility="private"` also hides role/tech/outcome/link (title + badges only).
- Skills can be maintained either as a flat list (`skills.items`) or grouped by category
  (`skills.categories`) for clearer storytelling.
  - `years` (hands-on years) is required; subjective scoring is intentionally not used.
  - Optionally add `firstUsedYear` / `lastUsedYear` (numeric years) to show recency vs past usage (e.g. `7y (2018–2024)`).
- Drop a `public/og.png` and extend `src/app/layout.tsx` metadata for richer previews.
- Customize the browser tab icon via `src/app/icon.svg` (and keep `src/app/favicon.ico` as fallback).
- Tweak NES colors or swap the background (`src/app/globals.css`) for other retro palettes.
- Add new sections/components under `src/components` and include them via `@/` alias.
