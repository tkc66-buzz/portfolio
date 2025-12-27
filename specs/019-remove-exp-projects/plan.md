# Implementation Plan: 019 – Remove Experience & Projects (Safety)

**Branch**: `019-remove-exp-projects` | **Date**: 2025-12-28 | **Spec**: `specs/019-remove-exp-projects/spec.md`
**Input**: Feature specification from `specs/019-remove-exp-projects/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Remove Experience and Projects from the public landing page and Menu (TOC), and scrub default Experience/Projects content from the repository to reduce disclosure risk.

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
**Performance Goals**: Keep it lightweight; reduce disclosure risk  
**Constraints**: Top-level UX changes require docs sync (`README.md`, `AGENTS.md`, `CLAUDE.md`)  
**Scale/Scope**: Remove sections from UI + scrub default content (keep codebase compiling and deployable)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate Result (pre-research)**: PASS (expected; safety-driven content/IA change)

## Phase 0: Outline & Research

### Decisions

- **Remove vs hide**
  - Decision: remove from landing page composition and TOC.
  - Additionally, scrub default text from `publicPortfolio` to reduce repo-level exposure.

**Output**: N/A (no additional research required)

## Phase 1: Design & Contracts

### Data model

- Keep the `Portfolio` shape intact for now (to avoid large refactor), but set:
  - `publicPortfolio.experience.highlights = []`
  - `publicPortfolio.projects.items = []`

### Contracts

- No external API changes.

### Quickstart

- Verify no Experience/Projects in UI and TOC; repo no longer contains default detailed copy.

## Project Structure

### Documentation (this feature)

```text
specs/019-remove-exp-projects/
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
│   ├── TableOfContents.tsx
│   ├── toc.ts
│   └── sections/
│       ├── ExperienceSection.tsx
│       └── ProjectsSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: Single Next.js app; update landing composition (`src/app/page.tsx`), TOC items (`src/components/toc.ts`), defaults (`src/content/portfolio.ts`), and docs (`README.md`, `AGENTS.md`, `CLAUDE.md`).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
