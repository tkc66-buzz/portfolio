# Implementation Plan: 005 – Writing / Blog Links

**Branch**: `005-blog-links` | **Date**: 2025-12-25 | **Spec**: `specs/005-blog-links/spec.md`  
**Input**: Feature specification from `specs/005-blog-links/spec.md`

## Summary

Add a new **Writing/Blog** entry point to the single-page portfolio, linking to:
- Tech blog (Medium): `https://medium.com/@buzz_tkc`
- Casual blog (しずかなインターネット): `https://sizu.me/buzz`

This is link-only v1 (no RSS/latest post fetching) to keep the site lightweight and durable.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16 App Router)  
**Primary Dependencies**: Next.js, React 19, Tailwind CSS, NES.css  
**Storage**: N/A (static content) + optional private override via env/url (server-side fetch)  
**Testing**: No automated tests; quality gates are `pnpm lint` + `pnpm build`  
**Target Platform**: Vercel  
**Project Type**: Web application (single-page portfolio)  
**Performance Goals**: Keep it lightweight; avoid new runtime deps  
**Constraints**: Preserve TOC UX; external links must be safe (`target="_blank"` + `rel="noreferrer"`)  
**Scale/Scope**: Add 1 new semantic section + 1 TOC item, backed by `src/content/portfolio.ts`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Principle compliance: Adds “writing” as a proof surface for “Personality-First Storytelling”.
- Retro aesthetic + usability: Keep it scan-friendly; reuse existing section styling.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: Adding a new top-level section/TOC item is a UX change → update `README.md`, `AGENTS.md`, `CLAUDE.md`.

**Gate Result (pre-research)**: PASS

## Phase 0: Outline & Research

### Key decisions

- **Link-only vs latest posts (RSS)**:
  - Decision: **Link-only** for v1 (no deps / no external fetch complexity).
  - Keep RSS/latest-posts as a future enhancement if desired.

**Output**: `specs/005-blog-links/research.md`

## Phase 1: Design & Contracts

### Data model

- Add a `writing` section to the portfolio content model:
  - `id`, `heading`, `items: ExternalLink[]`

**Output**: `specs/005-blog-links/data-model.md`

### Contracts

- No new external APIs introduced.  
**Output**: `specs/005-blog-links/contracts/README.md` (N/A)

### Quickstart

Verify TOC navigation + both blog links open safely.  
**Output**: `specs/005-blog-links/quickstart.md`

## Project Structure

### Documentation (this feature)

```text
specs/005-blog-links/
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
│       └── WritingSection.tsx   # NEW
└── content/
    └── portfolio.ts
```

**Structure Decision**: Keep `page.tsx` thin; put link data in `src/content/portfolio.ts` and render via `WritingSection`.

## Re-check Constitution (post-design)

**Gate Result (post-design)**: PASS (expected; small UX + content change)
