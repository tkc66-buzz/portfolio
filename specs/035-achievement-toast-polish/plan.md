# Implementation Plan: Achievement Toast Close Polish

**Branch**: `[035-achievement-toast-polish]` | **Date**: 2025-12-29 | **Spec**: `specs/035-achievement-toast-polish/spec.md`
**Input**: Feature specification from `specs/035-achievement-toast-polish/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Polish the Activities “ACHIEVEMENT UNLOCKED” toast close behavior so it doesn’t feel awkward: remove the empty-gap issue, add a subtle post-close “collected” trace, and keep reduced-motion behavior comfortable and accessible.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js App Router)  
**Primary Dependencies**: React, Tailwind CSS, NES.css  
**Storage**: Session storage (session-scoped “shown/dismissed” keys)  
**Testing**: No automated tests; rely on `pnpm lint` / `pnpm build` + manual verification  
**Target Platform**: Vercel (static/SSR), modern browsers  
**Project Type**: Web application (Next.js `src/app/`)  
**Performance Goals**: No regressions; keep client component small and CSS animations lightweight  
**Constraints**: Respect reduced motion; avoid layout shifts; no new dependencies  
**Scale/Scope**: `src/components/AchievementToast.tsx`, `src/components/sections/ActivitiesSection.tsx`, `src/app/globals.css`

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
- Principle compliance: PASS (improves usability and “gamefeel” without adding bloat)
- Quality gates: REQUIRED (`pnpm lint` / `pnpm build`)
- Docs sync: N/A (no tooling/runtime/deploy change; minor UI polish)

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
│   └── globals.css                          # toast animations + indicator styles
└── components/
    ├── AchievementToast.tsx                 # toast state machine; will add “collected” state
    └── sections/
        └── ActivitiesSection.tsx            # remove gap and position toast/indicator

```

**Structure Decision**: Fix the gap at the source and keep the component small:
- Remove unconditional wrapper spacing in `ActivitiesSection` (avoid empty `mt-3` when toast is null).
- Extend `AchievementToast` to render a small “collected” indicator after close instead of returning `null`.

## Implementation Approach

### 1) Remove awkward spacing (gap) in Activities

Current layout wraps `AchievementToast` in a `div.mt-3`. Because `AchievementToast` often returns `null`, this leaves an empty gap and makes the “close” feel worse.

- Move spacing into the toast/indicator element itself (only present when something is actually rendered).
- Update `ActivitiesSection` to render the toast without a permanent spacer wrapper.

### 2) Post-close “collected” trace

After close, render a small non-intrusive indicator in the same slot (so layout stays stable), for example a small NES badge-like chip (no re-open required, but can be clickable if we decide it helps).

### 3) Reduced motion + accessibility

- If reduced motion is enabled, skip flashy transitions and dismiss immediately into the indicator (or just the indicator with minimal change).
- Keep ARIA sensible: toast uses `role="status"`; indicator should not spam announcements.

## Rollout Plan (Phased)

### Phase A — Fix the gap + baseline close polish (P1)

- Remove permanent spacing wrapper.
- Ensure close never leaves awkward spacing.

### Phase B — Add “collected” trace (P2)

- Add indicator rendering after close.
- Ensure it is subtle and doesn’t steal attention.

### Phase C — Reduced motion (P3) + quality gates

- Verify reduced motion behavior.
- `pnpm lint` / `pnpm build`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
