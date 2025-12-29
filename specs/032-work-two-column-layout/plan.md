# Implementation Plan: Work Two-Column Layout

**Branch**: `[032-work-two-column-layout]` | **Date**: 2025-12-29 | **Spec**: `specs/032-work-two-column-layout/spec.md`
**Input**: Feature specification from `specs/032-work-two-column-layout/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Redesign the Work section “RPG” layout to **never exceed two columns** on desktop viewports, while preserving existing quest navigation and retro styling. Implement primarily via CSS grid changes so markup and behavior stay stable.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js App Router)  
**Primary Dependencies**: Next.js (App Router), React, Tailwind CSS, NES.css  
**Storage**: N/A (layout-only change)  
**Testing**: No automated tests; rely on `pnpm lint` / `pnpm build` and manual verification  
**Target Platform**: Vercel (static/SSR), modern browsers  
**Project Type**: Web application (Next.js `src/app/`)  
**Performance Goals**: No regressions; avoid layout jank and keep mobile fast  
**Constraints**: Retro aesthetic + modern usability; avoid adding dependencies  
**Scale/Scope**: Work section only (`WorkQuestLog` + related CSS)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate evaluation (pre-research)**:
- Principle compliance: PASS (improves usability/readability without diluting retro style)
- Quality gates: REQUIRED (must keep `pnpm lint` / `pnpm build` green)
- Docs sync: N/A (no top-level UX change; Work section layout only; no tooling changes)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
src/
├── app/
│   └── globals.css                 # Work RPG layout CSS lives here
└── components/
    └── sections/
        ├── WorkSection.tsx         # Uses WorkQuestLog
        └── WorkQuestLog.tsx        # 3-panel layout today; will become max 2 columns via CSS
```

**Structure Decision**: Update the Work section layout primarily in `src/app/globals.css` under “Work RPG UI”, with minimal/no markup changes in `src/components/sections/WorkQuestLog.tsx`.

## Implementation Approach

### Layout redesign (CSS-first)

- Current desktop layout uses `grid-template-columns: 1.1fr 0.9fr 1.2fr` (3 columns).
- Replace with a **2-column grid** at desktop breakpoints:
  - **Left column**: STATUS panel (top) + QUEST LOG panel (below).
  - **Right column**: DETAIL panel spanning the full height (grid row span) so it stays visible and readable.
- Keep mobile behavior unchanged (single-column stacked panels).

### Readability guardrails

- Ensure `min-width: 0` for grid children where needed to avoid overflow.
- Preserve truncation in quest titles, and allow summary/detail body to wrap (`break-words`/`overflow-wrap`).

### Behavior preservation

- No changes to quest selection logic, keyboard handlers, or ARIA roles; only layout/visual hierarchy changes.

## Rollout Plan (Phased)

### Phase A — Implement layout changes

- Update CSS grid columns and add grid placement rules for panels.
- Verify the layout visually across responsive breakpoints.

### Phase B — Polish and edge cases

- Validate long quest titles, 0-quest state, and overflow behavior.
- Confirm reduced-motion settings do not affect the Work section behavior.

## Verification

- Manual (desktop):
  - Work uses at most two columns; no horizontal scroll.
  - Switching quests keeps detail readable.
- Manual (mobile):
  - Panels stack; no overflow.
- Keyboard:
  - Arrow keys change selection; focus follows.
- Quality:
  - `pnpm lint` / `pnpm build` pass.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
