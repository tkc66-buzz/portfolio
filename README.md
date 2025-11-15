# Buzz NES.css Portfolio

Phase 1 of the Famicom-style portfolio for Takeshi Watanabe (Buzz). Built with Next.js 16 + TypeScript + Tailwind CSS + NES.css. This commit focuses on the "frame" only—each section ships with placeholder copy so real content can slide in during Phase 2.

## What's included now
- Hero, About, Projects (grid), Skills, Contact sections composed via `src/components/*`
- Famicom palette (red `#a20000`, gold `#d7b05b`, background `#111`) and retro typography (Press Start 2P + Noto Sans JP)
- NES.css buttons, badges, and progress bars wired up for later polish

## Project layout
```
src/
  app/
    layout.tsx      // fonts, NES import, metadata
    page.tsx        // assembles Hero → Contact sections
    globals.css     // Tailwind + palette helpers
  components/
    Hero.tsx
    About.tsx
    Projects.tsx
    Skills.tsx
    Contact.tsx
```

## Getting started
```bash
pnpm install
pnpm dev
```
Visit http://localhost:3000 and you'll see the empty frames ready for content.

## Scripts
- `pnpm dev` – Next.js dev server
- `pnpm build` – Production build (used by Vercel)
- `pnpm start` – Run the production build locally
- `pnpm lint` – ESLint (core web vitals config)

## Next phases
1. **Phase 2 – Content**: swap placeholder text for real About/Projects/Skills/Contact data.
2. **Phase 3 – Polish**: dot backgrounds, NES balloons, PRESS START animation, cursor effects, etc.

When a change affects dependencies or workflows, remember to update README / docs alongside the code.
