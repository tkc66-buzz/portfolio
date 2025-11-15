# NES.css × Next.js Portfolio Starter

A minimal Next.js (App Router) starter that pairs Tailwind CSS and NES.css with TypeScript, src/ directory layout, and Google Fonts (Noto Sans JP + Press Start 2P). Push the `main` branch to kick off the existing CI and deploy on Vercel.  
For tooling specifics see [AGENTS.md](AGENTS.md); Claude-focused workflows live in [CLAUDE.md](CLAUDE.md).

## Requirements
- Node.js >= 20.9.0 (matches Next.js 16 requirement; repo currently uses v25.2.0)
- pnpm 8+ (or compatible package manager)

## Setup
```bash
pnpm install
pnpm dev
```
Visit http://localhost:3000 to confirm the Mario-inspired layout.

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
- Update the copy in `src/app/page.tsx` with your real bio, projects, and contact links.
- Drop a `public/og.png` and extend `src/app/layout.tsx` metadata for richer previews.
- Tweak NES colors or swap the background (`src/app/globals.css`) for other retro palettes.
- Add new sections/components under `src/components` and include them via `@/` alias.
