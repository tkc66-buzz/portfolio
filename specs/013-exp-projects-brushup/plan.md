# Implementation Plan: Experience & Projects Content Brush-up

**Branch**: `013-exp-projects-brushup` | **Date**: 2025-12-26 | **Spec**: `specs/013-exp-projects-brushup/spec.md`  
**Input**: Feature specification from `specs/013-exp-projects-brushup/spec.md`

## Summary

Brush up Experience/Projects content rendering and cross-linking:

- Make Experience year label more readable.
- Preserve spreadsheet line breaks in Experience text.
- Make Evidence linking reliably navigate to the correct Project (resilient to whitespace/format differences).

## Technical Context

**Language/Version**: TypeScript (5.x), Node.js >= 20.9.0  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: N/A (content is in-repo + optional private patch via env/url)  
**Testing**: No automated tests currently; rely on `pnpm lint` and `pnpm build`  
**Target Platform**: Vercel (deploy on `main`), local dev via `pnpm dev`  
**Project Type**: Web application (single Next.js project under `src/`)  
**Performance Goals**: No regressions; changes are render-time only, minimal additional logic  
**Constraints**: No new dependencies; keep retro aesthetic + modern usability; keep anchor links stable  
**Scale/Scope**: Small UI/formatting/linking changes in `ExperienceSection` and (if needed) `ProjectsSection`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Personality-First Storytelling**: Improves claim→evidence linkage and readability (supports principle).
- **II. Retro Aesthetic, Modern Usability**: Improves legibility and formatting without changing the retro style.
- **III. Content Is a Product Surface**: Directly supports enriching content and presenting it properly.
- **IV. Lightweight, Fast, and Durable**: No new deps; only minor string normalization and styling.
- **V. One Source of Truth, Kept in Sync**: No dependency/scripts/deploy changes expected → docs sync not required.

**Quality gates**:

- `pnpm lint`
- `pnpm build`

## Project Structure

### Documentation (this feature)

```text
specs/013-exp-projects-brushup/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── content/
│   └── portfolio.ts                       # content model (ExperienceHighlight, Project.anchorId)
└── components/
    └── sections/
        ├── ExperienceSection.tsx          # year badge, newline rendering, evidence link building
        └── ProjectsSection.tsx            # evidence targets via project.anchorId
```

**Structure Decision**: Single Next.js App Router project. Implement fixes at the display layer:
`ExperienceSection.tsx` for year size + newline rendering + evidence normalization; keep `ProjectsSection.tsx`
as the target container with stable `id={project.anchorId}`.

## Phase 0 — Outline & Research

**Goal**: Decide the most robust (but minimal) Evidence parsing + matching strategy and the safest newline rendering.

Research topics:

- Tailwind/React best practices for preserving line breaks (`whitespace-pre-line`, etc.) without introducing XSS risk
- Evidence parsing patterns that tolerate whitespace/newline variations and optionally accept `#anchor` style references

**Output**: `specs/013-exp-projects-brushup/research.md`

## Phase 1 — Design & Contracts

**Data model**: Capture the relationship between Experience Highlight text, Evidence Reference, and Project targets.

**Contract**: Define the supported Evidence formats (e.g., current “ / Evidence: {project title}” and optional “#anchorId”).

**Quickstart**: Steps to validate the three known issues are fixed and content can be safely enriched.

**Output**:

- `specs/013-exp-projects-brushup/data-model.md`
- `specs/013-exp-projects-brushup/contracts/README.md`
- `specs/013-exp-projects-brushup/quickstart.md`

## Phase 1 — Agent Context Update

Run:

- `.specify/scripts/bash/update-agent-context.sh cursor-agent`

## Re-check Constitution (post-design)

Confirm:

- Evidence links work and remain stable
- Readability improved without harming retro aesthetic
- No new deps; `pnpm lint` + `pnpm build` pass

## Phase 2 — Task Planning (handoff to /speckit.tasks)

Implementation tasks will focus on:

- Adjusting year badge typography in `src/components/sections/ExperienceSection.tsx`
- Rendering Experience text with preserved line breaks
- Normalizing Evidence references to map reliably to `project.anchorId` targets
