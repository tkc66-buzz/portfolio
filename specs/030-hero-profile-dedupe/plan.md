# Implementation Plan: Hero/Profile 역할 분리

**Branch**: `[030-hero-profile-dedupe]` | **Date**: 2025-12-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/030-hero-profile-dedupe/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Adjust copy ownership and structure so the Hero and Profile sections stop repeating the same claims. Keep the Hero scannable and focused on the “PRESS START” interaction, while Profile provides expanded context.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: N/A  
**Testing**: No automated tests; validate via `pnpm lint` + `pnpm build` and manual copy review  
**Target Platform**: Modern browsers, deployed to Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: No regression (copy-only + minimal component changes)  
**Constraints**: Maintain accessibility and scannability; avoid hydration issues (no server/client divergent text)  
**Scale/Scope**: Only Hero/Profile copy + their content source boundaries

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Pass/Fail (expected)**:
- Principle compliance: PASS (improves storytelling clarity; reduces redundancy)
- Quality gates: MUST PASS before merge (`pnpm lint`, `pnpm build`)
- Docs sync: Not expected (no dependency/workflow/top-level UX change), unless copy ownership changes documented conventions

## Project Structure

### Documentation (this feature)

```text
specs/030-hero-profile-dedupe/
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
│   └── page.tsx
├── components/
│   └── Hero.tsx
├── components/sections/
│   └── ProfileSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: Copy boundaries are adjusted across `Hero.tsx` and the Profile content returned by `getPortfolio()` (server-side content). The implementation should avoid creating server/client divergent text during SSR/hydration.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
