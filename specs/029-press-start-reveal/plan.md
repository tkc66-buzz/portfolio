# Implementation Plan: Press Start Reveal

**Branch**: `[029-press-start-reveal]` | **Date**: 2025-12-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/029-press-start-reveal/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a “PRESS START” interaction on the Hero that unlocks and reveals the Menu (and all below-the-fold sections) with a short CRT/scanline-style transition. The unlocked state is remembered for the current browsing session and respects reduced motion preferences.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: Session-scoped browser storage (for a simple started flag)  
**Testing**: No automated tests in repo yet; validate via `pnpm lint` + `pnpm build` and manual a11y checks  
**Target Platform**: Modern browsers (desktop + mobile), deployed to Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: Transition feels instant; Menu becomes interactive within ~1s after START  
**Constraints**: Respect reduced-motion; progressive enhancement (JS disabled remains navigable)  
**Scale/Scope**: Single-page portfolio; feature affects only the landing page experience

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Pass/Fail**:
- Principle compliance: PASS (adds playful “boot” moment without removing navigation; JS-disabled remains navigable)
- Quality gates: MUST PASS before merge (`pnpm lint`, `pnpm build`)
- Docs sync: REQUIRED (top-level UX change)

## Project Structure

### Documentation (this feature)

```text
specs/029-press-start-reveal/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── components/
    ├── Hero.tsx
    ├── TableOfContents.tsx
    ├── ScrollHud.tsx
    └── startGate.ts
```

**Structure Decision**: Next.js App Router under `src/app/*` with UI components in `src/components/*`. The “start gate” is implemented via a small shared module (`startGate.ts`), a pre-hydration class initializer in `src/app/layout.tsx`, and CSS gating/transition rules in `src/app/globals.css`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
