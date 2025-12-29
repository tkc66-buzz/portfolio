# Implementation Plan: Remove Env/Spreadsheet Private Content

**Branch**: `[033-remove-env-sheet]` | **Date**: 2025-12-29 | **Spec**: `specs/033-remove-env-sheet/spec.md`
**Input**: Feature specification from `specs/033-remove-env-sheet/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Remove the now-unused portfolio “private override” feature and spreadsheet/App Script references. Portfolio content becomes **committed-content only**, and docs/spec artifacts are cleaned so the repo no longer mentions env-var/spreadsheet sourcing.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js App Router)  
**Primary Dependencies**: Next.js, React, Tailwind CSS, NES.css  
**Storage**: N/A (content is committed in repo)  
**Testing**: No automated tests; rely on `pnpm lint` / `pnpm build` + manual verification  
**Target Platform**: Vercel (static/SSR), modern browsers  
**Project Type**: Web application (Next.js `src/app/`)  
**Performance Goals**: No regressions; remove dead paths and keep SSR stable  
**Constraints**: No new dependencies; keep content rendering deterministic  
**Scale/Scope**: Portfolio content loading (`src/content/portfolio.ts`) + repo docs/spec cleanup

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
- Principle compliance: PASS (removes confusion and strengthens durability)
- Quality gates: REQUIRED (`pnpm lint` / `pnpm build`)
- Docs sync: REQUIRED (docs currently mention env-var/spreadsheet paths)

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
├── content/
│   └── portfolio.ts               # remove env/spreadsheet private override logic
└── components/                    # consumers call getPortfolio()

specs/
├── 033-remove-env-sheet/          # this feature docs
└── 002-portfolio-private-content/ # legacy (candidate for deletion/cleanup)

README.md
AGENTS.md
CLAUDE.md
```

**Structure Decision**: Simplify `getPortfolio()` to return committed portfolio data only, and remove any env-var/spreadsheet references from docs and legacy spec artifacts.

## Implementation Approach

### 1) Remove private override mode from `getPortfolio()`

- Delete `PORTFOLIO_PRIVATE_*` handling, patch loading, and related warnings.
- Keep `getPortfolio()` API stable for callers (still async, returns `Portfolio`).
- Keep skills/link normalization behavior if it’s still useful for public content; otherwise simplify.

### 2) Remove spreadsheet/App Script artifacts and references

- Remove any Apps Script code and spreadsheet-specific specs that are no longer used.
- Remove mentions from `README.md`, `AGENTS.md`, `CLAUDE.md` (Docs synced).

### 3) Verification

- Repo-wide search should find **no remaining** `PORTFOLIO_PRIVATE_SOURCE`, `PORTFOLIO_PRIVATE_JSON`, or spreadsheet/App Script references.
- `pnpm lint` / `pnpm build` pass.

## Rollout Plan (Phased)

### Phase A — Runtime simplification

- Simplify `src/content/portfolio.ts` to committed-content only.
- Confirm site renders without any env configuration.

### Phase B — Docs/spec cleanup

- Update `README.md`, `AGENTS.md`, `CLAUDE.md`.
- Delete legacy spec/tooling directories related to spreadsheet/private overrides (as agreed by the feature scope).

### Phase C — Quality gates

- `pnpm lint`, `pnpm build`
- Repo search for removed identifiers

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
