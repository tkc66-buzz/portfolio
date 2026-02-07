# Implementation Plan: Fix Hydration Error and Start Gate Visibility

**Branch**: `039-fix-hydration-error` | **Date**: 2026-01-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/039-fix-hydration-error/spec.md`

## Summary

Fix hydration mismatch errors and ensure the mobile hamburger menu is hidden behind the "PRESS START" gate. The root cause was MobileMenu using React Portal to render directly into `document.body`, bypassing the CSS-based `start-gated` visibility control. The fix uses `useSyncExternalStore` with separate server/client snapshots for safe hydration, plus a dual-gate (`mounted && started`) conditional rendering strategy in MobileMenu.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 25.2.0
**Primary Dependencies**: Next.js 16.0.7, React 19.2.1, Tailwind CSS 3.4.18, NES.css 2.3.0
**Storage**: sessionStorage (browser-side, for START gate persistence across page reloads)
**Testing**: `pnpm lint` + `pnpm build` (no test framework configured; manual browser verification)
**Target Platform**: Web (all modern browsers, mobile-first responsive)
**Project Type**: Web (Next.js App Router, single project)
**Performance Goals**: No layout shift on initial load; gate transition under 600ms
**Constraints**: Zero hydration errors in console; mobile menu must not flash before START
**Scale/Scope**: Single-page portfolio site, ~10 components affected

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (PASSED)

| Principle | Status | Rationale |
|-----------|--------|-----------|
| **I. Personality-First Storytelling** | PASS | The "PRESS START" gate is a core personality element; fixing its reliability strengthens the storytelling |
| **II. Retro Aesthetic, Modern Usability** | PASS | Fixes a UX regression (menu leaking through gate) while preserving retro boot animation |
| **III. Content Is a Product Surface** | PASS | No content changes; structural fix only |
| **IV. Lightweight, Fast, and Durable** | PASS | No new dependencies; uses built-in React APIs (`useSyncExternalStore`) |
| **V. One Source of Truth, Kept in Sync** | PASS | No dependency/runtime changes; docs sync not required for this fix |

**Quality Gates**:
- `pnpm lint`: Must pass
- `pnpm build`: Must pass

**Docs Sync**: Not required (no dependency/script/runtime/deploy changes)

### Post-Design Check (PASSED)

Same as pre-design. The implementation adds no new patterns, dependencies, or architectural changes beyond the existing component structure.

## Project Structure

### Documentation (this feature)

```text
specs/039-fix-hydration-error/
├── plan.md              # This file
├── research.md          # Phase 0: hydration strategy research
├── data-model.md        # Phase 1: state model documentation
├── quickstart.md        # Phase 1: developer quickstart
├── checklists/          # Verification checklists
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx            # Server: initial gate class + inline script
│   ├── page.tsx              # Server: root page composition
│   └── globals.css           # CSS gate rules (.start-gated display:none)
├── components/
│   ├── startGate.ts          # Constants: storage key, class names, event name
│   ├── Hero.tsx              # Client: START button + useStartGateStarted hook
│   ├── MobileMenu.tsx        # Client: dual-gate (mounted+started) + Portal
│   └── TableOfContents.tsx   # Server: desktop menu (CSS-gated via parent div)
```

**Structure Decision**: Single Next.js project using App Router. All affected files are within the existing `src/` directory. No new directories needed.

## Complexity Tracking

> No constitution violations. The implementation uses only built-in React APIs and existing project patterns.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |
