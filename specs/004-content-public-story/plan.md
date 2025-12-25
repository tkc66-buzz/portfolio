# Implementation Plan: Phase 2 Content – Public Storytelling (Experience/Projects/Contact)

**Branch**: `004-content-public-story` | **Date**: 2025-12-25 | **Spec**: `specs/004-content-public-story/spec.md`
**Input**: Feature specification from `specs/004-content-public-story/spec.md`

## Summary

Replace scaffolding/placeholder-ish copy with a cohesive public narrative for:
- Experience (proof of responsibility + outcomes)
- Projects (scan-able cards that “prove” skill/impact)
- Contact (clear CTA: what to reach out about, response expectation)

All changes must preserve privacy guarantees: public-only must read well, private overrides remain optional, and `visibility="private"` redaction continues to prevent leaks.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16 App Router)  
**Primary Dependencies**: Next.js, React 19, Tailwind CSS, NES.css  
**Storage**: N/A (static content) + optional private override via env/url (server-side fetch)  
**Testing**: No automated tests; quality gates are `pnpm lint` + `pnpm build`  
**Target Platform**: Vercel  
**Project Type**: Web application (single-page portfolio)  
**Performance Goals**: Keep it lightweight; no new runtime deps  
**Constraints**: Must not leak private content; public-only must be coherent; maintain retro aesthetic + usability  
**Scale/Scope**: Update copy in `src/content/portfolio.ts` and presentation in section components as needed

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle compliance: Improves “Personality-First Storytelling” by replacing filler with evidence-backed narrative.
- Retro aesthetic + usability: Keep hierarchy clear and scan-friendly; don’t over-style.
- Quality gates: `pnpm lint` and `pnpm build` must pass.
- Docs sync: No dependency/workflow changes expected; if we change top-level UX significantly, sync docs.

**Gate Result (pre-research)**: PASS

## Phase 0: Outline & Research

**Unknowns (resolved in `research.md`)**
- Public-safe “proof set” and phrasing patterns under NDA constraints
- How to state impact without leaking sensitive numbers
- CTA structure that increases qualified inbound

**Output**: `specs/004-content-public-story/research.md`

## Phase 1: Design & Contracts

### Data model decision

- Keep current `Portfolio` shape.
- Prefer content updates over schema changes.
- If we add richer Experience fields later, keep them optional and validate (not required for this feature).

**Output**: `specs/004-content-public-story/data-model.md`

### Contracts

No new external APIs introduced for this feature.  
**Output**: `specs/004-content-public-story/contracts/README.md` (N/A)

### Quickstart

Validation steps for public-only vs private override + redaction.  
**Output**: `specs/004-content-public-story/quickstart.md`

## Project Structure

### Documentation (this feature)

```text
specs/004-content-public-story/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
└── tasks.md             # created by /speckit.tasks (next step)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── page.tsx
├── components/
│   └── sections/
│       ├── ExperienceSection.tsx
│       ├── ProjectsSection.tsx
│       └── ContactSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: Keep `page.tsx` thin, put story content in `src/content/portfolio.ts`, and adjust section UI only to improve readability/scan-ability.

## Re-check Constitution (post-design)

**Gate Result (post-design)**: PASS (expected; content-only feature)
