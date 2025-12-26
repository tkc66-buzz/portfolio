# Implementation Plan: Spreadsheet-managed Project Anchor IDs

**Branch**: `015-sheet-anchorid` | **Date**: 2025-12-26 | **Spec**: `specs/015-sheet-anchorid/spec.md`  
**Input**: Feature specification from `specs/015-sheet-anchorid/spec.md`

## Summary

Make Experience → Projects Evidence linking stable by managing a Project `anchorId` in the spreadsheet
and exporting it in the private content JSON patch. Standardize Evidence authoring as:

- ` / Evidence: #<anchorId>`

Keep backwards compatibility (best-effort) for title-based Evidence.

## Technical Context

**Language/Version**: TypeScript (5.x), Node.js >= 20.9.0  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: N/A (content is in-repo + optional private patch via env/url)  
**Testing**: No automated tests currently; rely on `pnpm lint` and `pnpm build`  
**Target Platform**: Vercel (deploy on `main`), local dev via `pnpm dev`  
**Project Type**: Web application (single Next.js project under `src/`)  
**Performance Goals**: No regressions; anchorId handling is simple data plumbing + rendering  
**Constraints**: No new deps; stable anchors must not break; must fail gracefully on bad data  
**Scale/Scope**: Spreadsheet schema + Apps Script export + portfolio patch parsing + UI linking behavior

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Personality-First Storytelling**: Strengthens claim → proof linking (supports).
- **II. Retro Aesthetic, Modern Usability**: No style changes required; improves navigation reliability.
- **III. Content Is a Product Surface**: Enables better content maintenance and evidence integrity.
- **IV. Lightweight, Fast, and Durable**: No new deps; small additive schema change.
- **V. One Source of Truth, Kept in Sync**: This changes authoring workflow docs; update the relevant quickstart/spec docs (no repo-level docs sync expected).

**Quality gates**:

- `pnpm lint`
- `pnpm build`

## Project Structure

### Documentation (this feature)

```text
specs/015-sheet-anchorid/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
└── tasks.md
```

### Source Code (repository root) + Apps Script

```text
src/
├── content/
│   └── portfolio.ts                    # Project.anchorId type + private patch validation/merge
└── components/
    └── sections/
        ├── ExperienceSection.tsx       # Evidence parsing supports #anchorId (already implemented)
        └── ProjectsSection.tsx         # Project card id={project.anchorId}

specs/002-portfolio-private-content/
└── apps-script/
    └── Code.gs                         # spreadsheet -> Partial<Portfolio> JSON (needs anchorId column)
```

**Structure Decision**: Keep `anchorId` as a stable field on Project items; populate it from the spreadsheet
via Apps Script private patch. Experience Evidence uses `#anchorId` to link to Project anchors.

## Phase 0 — Outline & Research

**Goal**: Decide the safest spreadsheet schema and migration path without breaking existing content.

Research topics:

- Best practices for URL-fragment-safe IDs (`anchorId`) and collision avoidance
- Backwards compatibility strategy: when to allow title-based Evidence vs prefer `#anchorId`
- Minimal Apps Script changes to include `anchorId` in the exported JSON patch

**Output**: `specs/015-sheet-anchorid/research.md`

## Phase 1 — Design & Contracts

**Data model**:

- Define the relationship: spreadsheet Projects row → Project.anchorId → ProjectsSection `id` → Experience Evidence `#anchorId`.

**Contracts**:

- Spreadsheet schema for `projects` sheet (new `anchorId` column).
- JSON patch contract for `projects.items[].anchorId` (optional field).

**Quickstart**:

- Steps to update the sheet, redeploy Apps Script if needed, and validate Evidence linking.

**Output**:

- `specs/015-sheet-anchorid/data-model.md`
- `specs/015-sheet-anchorid/contracts/README.md`
- `specs/015-sheet-anchorid/quickstart.md`

## Phase 1 — Agent Context Update

Run:

- `.specify/scripts/bash/update-agent-context.sh cursor-agent`

## Re-check Constitution (post-design)

Confirm:

- No new deps
- Linking remains stable (anchors do not break)
- `pnpm lint` + `pnpm build` pass after implementation

## Phase 2 — Task Planning (handoff to /speckit.tasks)

Implementation tasks will focus on:

- Apps Script: add `anchorId` column support for projects
- Portfolio patch: accept/validate `anchorId`
- Docs: update private-content quickstart to mention `anchorId`
