# Quickstart: Responsive Mobile Layout

**Feature Branch**: `040-responsive-mobile-layout`

## Prerequisites

- Node.js 25.2.0 (via nvm)
- pnpm 10.13.1

## Setup

```bash
source ~/.nvm/nvm.sh && nvm use 25.2.0
git checkout 040-responsive-mobile-layout
pnpm install
```

## Development

```bash
pnpm dev
# Open http://localhost:3000
```

## Verification

### Automated Checks

```bash
pnpm format:check   # Prettier + Tailwind class sorting
pnpm lint            # ESLint
pnpm build           # Next.js production build
```

### Manual Verification — Mobile (320px-414px)

Use Chrome DevTools → Toggle device toolbar for each viewport.

1. **iPhone SE (375px)**
   - Scroll through all sections
   - Verify: No horizontal scrollbar appears
   - Verify: Hero section fits within viewport (image, name, bio)
   - Verify: PRESS START button is fully visible and tappable
   - Verify: Contact buttons stack vertically or wrap properly
   - Verify: Writing section links stack vertically or wrap properly
   - Verify: Work RPG badges don't overflow their container
   - Verify: Skills progress bars fit within container

2. **Galaxy S8 (360px)**
   - Same checks as iPhone SE
   - Pay special attention to NES.css container padding

3. **iPhone 5/SE (320px) — Minimum supported width**
   - Same checks as above
   - Verify: ALL content remains visible (no clipping)
   - Verify: Text is readable (no overlapping)

### Manual Verification — Tablet (640px-1024px)

4. **iPad Mini (768px)**
   - Verify: TableOfContents menu is visible (sticky header)
   - Verify: MobileMenu hamburger is NOT visible
   - Verify: Work RPG shows 2-column layout
   - Verify: Activities Talks shows 2-column grid
   - Verify: All sections have appropriate spacing

5. **iPad (1024px)**
   - Verify: Layout matches current desktop appearance
   - Verify: No visual regression from existing design

### Manual Verification — Desktop (1280px+)

6. **Desktop (1440px)**
   - Verify: Layout is IDENTICAL to current production
   - Verify: No visual differences from before this change

### Cross-cutting

7. **PRESS START Gate**
   - On mobile (375px), verify START gate still works
   - Content hidden before START, visible after
   - Hamburger menu appears after START

8. **Landscape Mode**
   - Rotate to landscape on a phone viewport
   - Verify: Content doesn't clip or overflow

## Key Files

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Page container responsive padding |
| `src/app/globals.css` | NES.css mobile overrides, mobile menu, Work RPG |
| `src/components/Hero.tsx` | Responsive padding, font sizes, image size |
| `src/components/TableOfContents.tsx` | Button sizing adjustments |
| `src/components/MobileMenu.tsx` | Overlay responsive padding |
| `src/components/sections/WorkQuestLog.tsx` | Badge overflow prevention |
| `src/components/sections/SkillsSection.tsx` | Label and progress bar responsive |
| `src/components/sections/ActivitiesSection.tsx` | Grid and badge responsive |
| `src/components/sections/WritingSection.tsx` | Button group stacking |
| `src/components/sections/ContactSection.tsx` | Button group stacking |
