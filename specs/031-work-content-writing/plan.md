# Implementation Plan: Work Content Writing

**Branch**: `[031-work-content-writing]` | **Date**: 2025-12-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/031-work-content-writing/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Write and refine the Work section copy (company summaries + project summaries/outcome/learning) so it becomes strong “proof” while staying public-safe: anonymized labels and no numerical impact metrics.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: N/A (content-only change)  
**Testing**: No automated tests; validate via `pnpm lint` + `pnpm build` + manual content review  
**Target Platform**: Modern browsers (desktop + mobile), deployed to Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: No regression (copy/data-only edits)  
**Constraints**: Public-safe: anonymized company/product labels, no numerical metrics, no confidential identifiers  
**Scale/Scope**: `src/content/portfolio.ts` Work entries and nested Projects copy

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Pass/Fail (expected)**:

- Principle compliance: PASS (improves “Proof surface” quality and storytelling)
- Quality gates: MUST PASS before merge (`pnpm lint`, `pnpm build`)
- Docs sync: Not expected (no dependency/workflow/top-level UX change)

## Project Structure

### Documentation (this feature)

```text
specs/031-work-content-writing/
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
├── content/
│   └── portfolio.ts
└── components/sections/
    ├── WorkSection.tsx
    └── WorkQuestLog.tsx
```

**Structure Decision**: Work copy is maintained in `src/content/portfolio.ts` (server-side content). Rendering is handled by `src/components/sections/WorkSection.tsx` and `WorkQuestLog.tsx`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
