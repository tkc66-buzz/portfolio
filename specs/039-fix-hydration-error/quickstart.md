# Quickstart: Fix Hydration Error and Start Gate Visibility

**Feature Branch**: `039-fix-hydration-error`

## Prerequisites

- Node.js 25.2.0 (via nvm)
- pnpm 10.13.1

## Setup

```bash
source ~/.nvm/nvm.sh && nvm use 25.2.0
git checkout 039-fix-hydration-error
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
pnpm lint          # ESLint passes
pnpm build         # Next.js production build passes
```

### Manual Verification

1. **Initial Load (Mobile)**
   - Open DevTools → Toggle device toolbar (mobile view)
   - Reload the page
   - Verify: Only Hero section with "PRESS START" button is visible
   - Verify: No hamburger menu icon in top-right corner
   - Verify: No hydration errors in browser console

2. **After START (Mobile)**
   - Click "PRESS START" button
   - Verify: Boot animation plays (scanlines/vignette effect)
   - Verify: After animation, hamburger menu icon appears in top-right
   - Verify: Tapping hamburger opens the mobile menu overlay
   - Verify: Menu items navigate correctly

3. **Page Reload Persistence**
   - After pressing START, reload the page
   - Verify: Content appears immediately (no START gate)
   - Verify: Hamburger menu is visible immediately
   - Verify: No console errors

4. **Reduced Motion**
   - Enable "prefers-reduced-motion: reduce" in OS/browser settings
   - Reload and press START
   - Verify: No animation plays; content appears instantly

5. **Desktop**
   - View at desktop width (>640px)
   - Verify: TableOfContents (sticky menu) is hidden before START
   - Verify: TableOfContents appears after START
   - Verify: MobileMenu hamburger is not visible (desktop uses TableOfContents)

## Key Files

| File | Role |
|------|------|
| `src/components/startGate.ts` | Constants for gate state management |
| `src/app/layout.tsx` | Server layout + inline session restore script |
| `src/app/globals.css` | CSS rules for `.start-gated` visibility |
| `src/components/Hero.tsx` | START button + `useStartGateStarted` hook |
| `src/components/MobileMenu.tsx` | Dual-gate rendering + Portal |
| `src/app/page.tsx` | Page composition with `start-gated` wrapper |

## Architecture Overview

```
Server Render          Client Hydration         User Interaction
─────────────         ──────────────────        ────────────────
layout.tsx             useHasMounted()           Hero.onStart()
  └─ html.not-started    └─ mounted=true          └─ is-starting
  └─ inline script       useStartGateStarted()     └─ 520ms animation
     (session restore)     └─ started=bool           └─ is-started
                                                      └─ START_GATE_EVENT
                         MobileMenu
                           └─ if mounted && started
                              └─ render Portal
```
