# Implementation Plan: Portfolio TOC + Section Granularity

**Branch**: `001-portfolio-toc` | **Date**: 2025-12-24 | **Spec**: `specs/001-portfolio-toc/spec.md`
**Input**: Feature specification from `specs/001-portfolio-toc/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a clear Table of Contents (TOC) and section naming/granularity so first-time
visitors can understand the owner in <2 minutes and jump to key content.

Technical approach: introduce a single “source of truth” TOC config (id/label/order),
assign stable `id`s to each top-level section, and keep `src/app/page.tsx` as a thin
composition layer.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css 2  
**Storage**: N/A (static portfolio content)  
**Testing**: No automated tests currently (quality gates are `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel deployment, modern browsers, mobile-first responsive  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Fast initial render and smooth in-page navigation; avoid heavy JS/new deps  
**Constraints**: Retro aesthetic MUST NOT harm readability, navigation, or mobile UX  
**Scale/Scope**: Single-page portfolio with ~5–8 top-level sections, optional sub-sections

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate evaluation (pre-design)**:

- Principle compliance: PASS (TOC improves discoverability; retro + modern usability aligned)
- Quality gates: TBD (must run after implementation)
- Docs sync: PASS (no workflow/dependency changes planned)

## Project Structure

### Documentation (this feature)

```text
specs/001-portfolio-toc/
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
│   └── page.tsx                 # Compose sections and TOC for the landing page
└── components/
    ├── TableOfContents.tsx      # NEW: TOC UI
    ├── sections/
    │   ├── ProfileSection.tsx   # NEW: replaces/renames About intent (clear role)
    │   ├── ExperienceSection.tsx# NEW: timeline / highlights
    │   ├── ProjectsSection.tsx  # existing (or adapted) Projects
    │   ├── SkillsSection.tsx    # existing (or adapted) Skills
    │   └── ContactSection.tsx   # existing (or adapted) Contact
    └── Hero.tsx                 # existing
```

**Structure Decision**: Keep `src/app/page.tsx` as a thin composition layer. Move
semantic sections into `src/components/sections/*` so naming matches the TOC and
each section can own its `id` and heading.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed                          | Simpler Alternative Rejected Because |
| --------- | ----------------------------------- | ------------------------------------ |
| N/A       | No constitution violations expected | N/A                                  |
