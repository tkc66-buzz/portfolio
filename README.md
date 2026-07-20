# Portfolio

Famicom-style portfolio for Takeshi Watanabe (Buzz). Built with Next.js 16 + TypeScript + Tailwind CSS + NES.css. The site ships real content via `src/content/portfolio.ts`, and selectively adds “game UI” touches (HUD, pixel motion, and an RPG-style Work screen) without breaking readability.

## What's included now

- Hero + Menu + Profile/Work/Writing/Activities/Skills/Contact sections (single-page) composed via `src/components/*`
- Writing groups blog, book, and external-media article links; Activities focuses on talks, community, and achievements
- Famicom palette (red `#a20000`, unified blue accent `#4f86c6`, gold `#d7b05b`, background `#111`) and retro typography (Press Start 2P + Noto Sans JP)
- NES.css buttons, badges, and progress bars (plus a few CSS-only motion tokens, reduced-motion aware)
- Menu is revealed via a Hero **PRESS START** interaction (session-scoped) and provides in-page navigation
- Menu is a **sticky HUD**: it stays visible while scrolling for fast section jumping
- Work is intentionally “different”: an RPG-style **STATUS / QUEST LOG / DETAIL** layout with keyboard-friendly quest selection
- Activities is shown as a filterable, responsive output-card grid in descending chronological order; an item may optionally place a local image above its text, while image-free items remain text-only
- **Responsive mobile-first layout**: all sections adapt to 320px+ viewports with NES.css mobile overrides, progressive padding (`px-3 sm:px-4 md:px-8`), and button stacking on phones

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
      WorkSection.tsx
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

Visit <http://localhost:3000>, press **START** in the Hero to reveal the Menu, then scroll through each section to see the retro layout and interactions.

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

- Update the copy/data in `src/content/portfolio.ts` (profile/work/writing/activities/skills/contact).
- To add an Activity image, place it under `public/assets/` and set `image: { src: "/assets/...", alt: "..." }` on that activity; the text is rendered below the image.
- Add optional retro icons:
  - Put pixel-style icons under `public/assets/pixel/icons/`
  - Use `src/components/PixelIcon.tsx` in headings/links (decorative by default; reduced a11y noise)
- Skills can be maintained either as a flat list (`skills.items`) or grouped by category
  (`skills.categories`) for clearer storytelling.
  - `years` (hands-on years) is required; subjective scoring is intentionally not used.
  - Optionally add `firstUsedYear` / `lastUsedYear` (numeric years) to show recency vs past usage (e.g. `7y (2018–2024)`); current usage omits the current year and displays as `2018–`.
- Drop a `public/og.png` and extend `src/app/layout.tsx` metadata for richer previews.
- Customize the browser tab icon via `src/app/icon.svg` (and keep `src/app/favicon.ico` as fallback).
- Tweak NES colors or swap the background (`src/app/globals.css`) for other retro palettes.
- Add new sections/components under `src/components` and include them via `@/` alias.
