# Implementation Plan: Skills Brushup

**Branch**: `[034-skills-brushup]` | **Date**: 2025-12-29 | **Spec**: `specs/034-skills-brushup/spec.md`
**Input**: Feature specification from `specs/034-skills-brushup/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Improve the Skills section content so strengths are obvious at a glance, experience signals are consistent, and the data remains maintainable. This will primarily be a **content/data refinement** in `src/content/portfolio.ts` (with minimal/no UI changes).

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
**Performance Goals**: No regressions; keep Skills rendering fast and scannable  
**Constraints**: Content-first; avoid adding dependencies; keep “years” signal believable and consistent  
**Scale/Scope**: Skills data + presentation consistency (`src/content/portfolio.ts`, `src/components/sections/SkillsSection.tsx`)

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
- Principle compliance: PASS (strengthens “Proof surface” and usability)
- Quality gates: REQUIRED (`pnpm lint` / `pnpm build`)
- Docs sync: N/A (no tooling/runtime/deploy change; content/UI-only)

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
│   └── portfolio.ts                     # Skills data source of truth
└── components/
    └── sections/
        └── SkillsSection.tsx            # Skills rendering (progress bars)

specs/034-skills-brushup/
```

**Structure Decision**: Keep Skills rendering stable; improve the content model usage by refining `skills.categories` and ensuring the displayed list is consistent and non-confusing.

## Implementation Approach

### Content-first improvements (primary)

- Update `publicPortfolio.skills.categories` in `src/content/portfolio.ts` to:
  - Make top strengths obvious (ordering of categories and items).
  - Remove confusing duplicates across categories (e.g., avoid repeating the same label in multiple categories unless intentionally justified).
  - Standardize naming (category names and skill labels).
  - Ensure years/usage ranges remain internally consistent and believable.

### Presentation consistency checks (secondary)

- Verify `SkillsSection` renders categories cleanly on desktop/mobile.
- Keep the “years + optional usage range” display consistent with the data (no contradictions).
- Avoid “wall of bars” by keeping the list tight and curated (content choice).

## Rollout Plan (Phased)

### Phase A — Content refinement (MVP)

- Adjust categories/items ordering and dedupe skills in `src/content/portfolio.ts`.
- Validate the “top 3 strengths in 30 seconds” criterion by a quick manual scan.

### Phase B — Consistency & polish

- Check for duplicate labels across categories and adjust if any remain.
- Verify readability on mobile (no overflow).

### Phase C — Quality gates

- `pnpm lint`
- `pnpm build`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
