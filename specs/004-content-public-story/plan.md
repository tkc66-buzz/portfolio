# Implementation Plan: Phase 2 Content – Public Storytelling (Experience/Projects/Contact)

**Branch**: `004-content-public-story` | **Date**: 2025-12-25 | **Spec**: `specs/004-content-public-story/spec.md`
**Input**: Feature specification from `specs/004-content-public-story/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Public-facing content for Experience/Projects/Contact is upgraded from scaffolding to a cohesive narrative.
The implementation keeps privacy guarantees (private overrides + redaction) while improving scan-ability and
clarity so a first-time visitor understands the owner in <2 minutes.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js 16 App Router)  
**Primary Dependencies**: Next.js, React 19, Tailwind CSS, NES.css  
**Storage**: N/A (static content) + optional private override via env/url (server-side fetch)  
**Testing**: No automated tests (quality gates are `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel (static/SSR)  
**Project Type**: Web application (single-page portfolio)  
**Performance Goals**: Keep bundle lean; avoid new deps; fast mobile render  
**Constraints**: Must not leak private content; public-only must read well; keep UX retro-but-usable  
**Scale/Scope**: Small content-focused change across sections + `src/content/portfolio.ts`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate Result (pre-research)**: PASS  
- The work is explicitly about replacing scaffolding with real narrative and preserving privacy.

## Project Structure

### Documentation (this feature)

```text
specs/004-content-public-story/
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
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── sections/
│       ├── ExperienceSection.tsx
│       ├── ProjectsSection.tsx
│       └── ContactSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: Update copy in `src/content/portfolio.ts` and adjust presentation in
`src/components/sections/*` as needed. No new routes or services.

## Phase 0: Outline & Research

### Unknowns / NEEDS CLARIFICATION

- What public-safe “proof set” is acceptable for Experience/Projects (what can be said without NDA risk)?
- How should we express quantitative impact when numbers are sensitive (approved phrasing patterns)?
- What CTA variants best match desired inbound (job / side work / consulting / tech talk)?

## Phase 0 Output: research.md

See `specs/004-content-public-story/research.md`.

## Phase 1: Design & Contracts

### Data Model

- We keep the existing `Portfolio` types; additions must not break private overrides.
- If we add fields (e.g., experience role/company/timeframe), they must be optional and validated.

### Contracts

- No external API contracts for this feature (content-only). Keep `contracts/README.md` stating N/A.

## Re-check Constitution (post-design)

**Gate Result (post-design)**: PASS (expected)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
