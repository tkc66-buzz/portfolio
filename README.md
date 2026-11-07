# Portfolio

Famicom-style portfolio for Takeshi Watanabe (Buzz). Built with Next.js 16 + TypeScript + Tailwind CSS + three.js (with NES.css for a few retro widgets). The site ships real content via `src/content/portfolio.ts` in a retro × modern layout: full-width sections, large type, and scroll-driven motion.

## What's included now

- Hero + Menu + Profile/Work/Writing/Activities/Skills/Contact sections (single-page) composed via `src/components/*`
- Writing groups blog, book, and external-media article links; Activities focuses on talks, community, and achievements
- Famicom palette (red `#a20000`, unified blue accent `#4f86c6`, gold `#d7b05b`, night background `#0b0d12`) and typography (Press Start 2P everywhere like the original NES.css look; Press Start 2P is bundled (OFL) and drawn at 90% so Latin balances the Japanese; Japanese in titles uses the bundled bold pixel font PixelMplus12 (subset, M+ license, see `scripts/subset-pixel-font.py`) so mixed text like 株式会社Eureka stays one pixel style; descriptive copy uses `.font-body` = Noto Sans JP)
- **Simple hero with a large pixel avatar** (two columns on desktop): the crisp original icon in a gold frame that tilts toward the pointer; on load (and on click) it is rebuilt from 3D voxels (`HeroAvatar.tsx`, three.js, lazy-loaded) that drop in and bounce, then cross-fades back to the image. The hero shows the name, the nickname ("a.k.a. BUZZ"), the role, a short bio, socials, and a SCROLL cue. Reduced motion / no WebGL shows the plain image
- All content is visible immediately (no gate); sections fade in on scroll via one `RevealObserver` (disabled for reduced motion / no JS)
- Skills render as a compact grid of **level tiles** whose years count up as they scroll into view
- Menu is a **sticky HUD**: it stays visible while scrolling for fast section jumping
- Work is a **gantt-style career timeline** (main / side lanes); selecting a bar opens a color-matched callout (a caret slides under the bar) with period, duration, ABOUT / TECH STACK / numbered PROJECTS, and ◀ ▶ to step through companies
- Activities is a filterable **bento grid** in descending chronological order; the newest image item is featured large, images sit above the text, and descriptions are clamped
- **One global type scale** (`type-label` / `type-title` / `type-body` / `type-lead` / `type-stat` / `type-heading` / `type-display` in `globals.css`): every text size on the page comes from it, so small text stays readable (labels are 14px)
- **Responsive mobile-first layout**: sections use a `max-w-7xl` container and multi-column grids that collapse to 1–2 columns at 320px+

## Project layout

```text
src/
  app/
    layout.tsx      // fonts, metadata (NES.css is layered in globals.css)
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

Visit <http://localhost:3000>, move the pointer over (or click) the hero avatar, then scroll through each section.

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
2. **Phase 3 – Polish**: dot backgrounds, NES balloons, cursor effects, etc.

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
