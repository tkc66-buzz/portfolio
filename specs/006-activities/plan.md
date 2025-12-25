# Implementation Plan: 006 – Activities (Talks / Books / Community)

**Branch**: `006-activities` | **Date**: 2025-12-25 | **Spec**: `specs/006-activities/spec.md`  
**Input**: Feature specification from `specs/006-activities/spec.md`

## Summary

Add an “Activities” proof surface to showcase:

- Talks (登壇)
- Books (書籍執筆)
- Community (コミュニティ活動)

Key IA decision: keep this separate from `Writing` (blog) vs merge them into one section.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16 App Router)  
**Primary Dependencies**: Next.js, React 19, Tailwind CSS, NES.css  
**Storage**: N/A (static content) + optional private override via env/url (server-side fetch)  
**Testing**: No automated tests; quality gates are `pnpm lint` + `pnpm build`  
**Target Platform**: Vercel  
**Project Type**: Web application (single-page portfolio)  
**Performance Goals**: Keep it lightweight; avoid new runtime deps  
**Constraints**: Preserve TOC UX (<= 8 items guideline), external links must be safe (`target="_blank"` + `rel="noreferrer"`)  
**Scale/Scope**: Add Activities section (and possibly TOC item), backed by `src/content/portfolio.ts`

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- Principle compliance: Adds concrete evidence for “Personality-First Storytelling”.
- Retro aesthetic + usability: Keep it scan-friendly; reuse existing section styling.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: Adding a new top-level section/TOC item is a UX change → update `README.md`, `AGENTS.md`, `CLAUDE.md`.

**Gate Result (pre-research)**: PASS

## Phase 0: Outline & Research

### Decisions / NEEDS CLARIFICATION

- **Split vs merge with Writing**
  - Current TOC has 6 items (Profile/Experience/Projects/Writing/Skills/Contact).
  - If split: 7 items → still within the “8 items” guideline.
  - If merge: fewer TOC items, but a larger section that may reduce clarity.
  - Default recommendation: **split** (Writing = articles, Activities = talks/books/community).

- **Item schema / density**
  - Minimum: `title`, `year`, optional `context` (event/publisher/role), optional `link`.
  - Group headings: Talks / Books / Community.
  - Empty state: explicit “Coming soon” when no items.

**Output**: `specs/006-activities/research.md`

## Phase 1: Design & Contracts

### Data model

- Add an `activities` section to portfolio content:
  - `id`, `heading`, `groups[]` where each group has `name` and `items[]`.

### Contracts

- No new external APIs introduced (link-only).

### Quickstart

- Verify TOC navigation + external link safety + empty-state behavior.

## Project Structure

### Documentation (this feature)

```text
specs/006-activities/
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
│   ├── TableOfContents.tsx
│   ├── toc.ts
│   └── sections/
│       ├── WritingSection.tsx
│       └── ActivitiesSection.tsx   # NEW (if split)
└── content/
    └── portfolio.ts
```

**Structure Decision**: Add `ActivitiesSection` and a TOC item unless we later justify merging with `Writing`.

## Re-check Constitution (post-design)

**Gate Result (post-design)**: PASS (expected; small UX + content change)
