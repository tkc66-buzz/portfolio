# Implementation Plan: Year badge readability upgrade (non-Skills)

**Branch**: `025-year-badges` | **Date**: 2025-12-28 | **Spec**: `specs/025-year-badges/spec.md`
**Input**: Feature specification from `specs/025-year-badges/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Skills以外の year/period バッジ（Workのperiod、Activitiesのyear）の文字が小さすぎて読めない問題を解消する。
共通CSSトークン（例: `.year-badge`）にサイズ方針を集約し、Work/Activitiesへ適用する。Skillsは対象外。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: No new deps; CSS-first; avoid layout shift  
**Constraints**: Keep retro look; improve readability; Skills is out-of-scope  
**Scale/Scope**: Work + Activities year/period badges only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

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
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/globals.css
└── components/sections/
   ├── WorkSection.tsx
   └── ActivitiesSection.tsx
```

**Structure Decision**: `.year-badge` を `globals.css` に追加し、Work/Activitiesの年表示に付与する。
Skillsは変更しない。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
