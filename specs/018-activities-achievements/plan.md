# Implementation Plan: 018 – Activities: Achievements (Awards)

**Branch**: `018-activities-achievements` | **Date**: 2025-12-28 | **Spec**: `specs/018-activities-achievements/spec.md`
**Input**: Feature specification from `specs/018-activities-achievements/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add an `Achievements` group under the existing `Activities` section, reusing the existing Activities item schema and UI patterns (safe external links, explicit empty state).

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js 16 App Router)  
**Primary Dependencies**: Next.js, React 19, Tailwind CSS, NES.css  
**Storage**: N/A (static content) + optional private override via env/url (server-side fetch)  
**Testing**: No automated tests; quality gates are `pnpm lint` + `pnpm build`  
**Target Platform**: Vercel  
**Project Type**: Web application (single-page portfolio)  
**Performance Goals**: Keep it lightweight; avoid new runtime deps  
**Constraints**: Preserve scan-ability; keep Activities consistent; external links must be safe (`target="_blank"` + `rel="noreferrer"`)  
**Scale/Scope**: Extend existing Activities group enum and default content; no new sections/TOC items

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate Result (pre-research)**: PASS (expected; small content-model + UI copy change)

## Phase 0: Outline & Research

### Decisions / NEEDS CLARIFICATION

- **Where should awards/achievements live?**
  - Decision target: extend existing `Activities.groups` with a new group name `Achievements`.
  - Rationale: minimal UI change, keeps proof surface cohesive, NDA-safe.
- **Data shape**
  - Keep `ActivityItem` schema unchanged (`year`, `title`, optional `context`, optional `link`).
- **Private content integration**
  - Current Apps Script spreadsheet exporter only supports `experience` + `projects`.
  - Decision needed: keep achievements authored in `publicPortfolio` (or private JSON) for now vs extend spreadsheet schema.

**Output**: `specs/018-activities-achievements/research.md`

## Phase 1: Design & Contracts

### Data model

- Extend `ActivityGroup.name` union to include `Achievements`.
- Add `Achievements` group in `publicPortfolio.activities.groups` (order defined in content).

### Contracts

- Portfolio patch contract for `activities.groups[].name` includes `Achievements`.
- No external API changes (links only).

### Quickstart

- Add an Achievements item, verify it renders under Activities.
- Verify empty state and external link safety.

## Project Structure

### Documentation (this feature)

```text
specs/018-activities-achievements/
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
├── components/
│   └── sections/
│       └── ActivitiesSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: Single Next.js app; update content model in `src/content/portfolio.ts` and (if needed) copy in `src/components/sections/ActivitiesSection.tsx`.

## Re-check Constitution (post-design)

**Gate Result (post-design)**: PASS (expected; no new deps; small content-model extension)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
