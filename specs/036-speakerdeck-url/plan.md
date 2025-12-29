# Implementation Plan: Speaker Deck URL

**Branch**: `[036-speakerdeck-url]` | **Date**: 2025-12-29 | **Spec**: `specs/036-speakerdeck-url/spec.md`
**Input**: Feature specification from `specs/036-speakerdeck-url/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a clearly labeled Speaker Deck profile URL in the Activities → Talks context, using the existing content source (`src/content/portfolio.ts`) and existing external-link rendering behavior in `src/components/sections/ActivitiesSection.tsx`.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (Next.js App Router)  
**Primary Dependencies**: React, Tailwind CSS, NES.css  
**Storage**: N/A (static content)  
**Testing**: No automated tests; rely on `pnpm lint` / `pnpm build` + manual verification  
**Target Platform**: Vercel (static/SSR), modern browsers  
**Project Type**: Web application (Next.js `src/app/`)  
**Performance Goals**: No regressions; keep changes content-only if possible  
**Constraints**: No new dependencies; external links must open safely  
**Scale/Scope**: `src/content/portfolio.ts` (add link), optionally `src/components/sections/ActivitiesSection.tsx` if UI placement changes

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
- Principle compliance: PASS (improves proof surface discoverability; keeps retro UX consistent)
- Quality gates: REQUIRED (`pnpm lint` / `pnpm build`)
- Docs sync: N/A (no tooling/runtime/deploy change; content + minor UI only)

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
│   └── portfolio.ts                         # Activities → Talks content source
└── components/
    └── sections/
        └── ActivitiesSection.tsx            # Renders activities links safely (_blank + rel)
```

**Structure Decision**: Prefer a content-only change:
- Add a new item within `activities.groups[].items` for `Talks` that links to Speaker Deck.
- Avoid new UI components unless we need a special placement beyond the list.

## Implementation Approach

### Placement choice (default)

Add a dedicated “slides hub” entry under `Activities → Talks`:
- Year: a neutral label (e.g., `"—"` or `"All"`)
- Title: clear label (e.g., `"Speaker Deck (Slides)"`)
- Link: label `"Speaker Deck"`, href `https://speakerdeck.com/tkc66buzz`

This keeps the repo’s “single source of truth” for content (`src/content/portfolio.ts`) and uses the existing external-link behavior in `ActivitiesSection`.

### External link safety

No special handling required: `ActivitiesSection` already treats `http(s)` links as external and uses `target="_blank"` + `rel="noreferrer"`.

## Rollout Plan

- Add the Speaker Deck link entry in content
- Verify the link appears in Activities → Talks and opens correctly
- Run `pnpm lint` and `pnpm build`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
