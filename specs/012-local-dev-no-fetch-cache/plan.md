# Implementation Plan: Local Dev Experience Freshness

**Branch**: `012-local-dev-no-fetch-cache` | **Date**: 2025-12-26 | **Spec**: `specs/012-local-dev-no-fetch-cache/spec.md`  
**Input**: Feature specification from `specs/012-local-dev-no-fetch-cache/spec.md`

## Summary

Make local development always reflect the latest Experience spreadsheet changes on a normal browser
reload, by disabling data caching in development *only*. Preserve the existing production caching
behavior (driven by the current revalidate window).

## Technical Context

**Language/Version**: TypeScript (5.x), Node.js >= 20.9.0  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS, NES.css  
**Storage**: N/A (content is in-repo + optional private patch from env/url)  
**Testing**: No automated tests currently; rely on `pnpm lint` and `pnpm build`  
**Target Platform**: Vercel (deploy on `main`), local dev via `pnpm dev`  
**Project Type**: Web application (single Next.js project under `src/`)  
**Performance Goals**: Production remains fast/stable; local dev prioritizes freshness  
**Constraints**: No new dependencies; no UI/IA changes; production caching policy must remain unchanged  
**Scale/Scope**: Small, localized change in the private content loading path used by Experience and other sections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Personality-First Storytelling**: No narrative/content change; only dev workflow improvement.
- **II. Retro Aesthetic, Modern Usability**: No UI changes; nothing that degrades usability.
- **III. Content Is a Product Surface**: Improves iteration speed so content can be refined; no placeholders introduced.
- **IV. Lightweight, Fast, and Durable**: Avoids new deps and keeps prod caching intact; dev-only bypass is minimal.
- **V. One Source of Truth, Kept in Sync**: No changes to dependencies/scripts/deploy/top-level UX expected → docs sync not required.

**Quality gates**:

- `pnpm lint`
- `pnpm build`

## Project Structure

### Documentation (this feature)

```text
specs/012-local-dev-no-fetch-cache/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── README.md        # Phase 1 output (external data expectations)
└── tasks.md             # Phase 2 output (/speckit.tasks output)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── content/
│   └── portfolio.ts              # getPortfolio() + private patch loading/caching logic
└── components/
    └── sections/
        ├── ExperienceSection.tsx # consumes getPortfolio() and renders Experience
        └── ... other sections ...# also consume getPortfolio()
```

**Structure Decision**: Single Next.js App Router project. Implement the dev-only freshness change at
the centralized private content fetch/caching layer (`src/content/portfolio.ts`) so sections remain unchanged.

## Phase 0 — Outline & Research

**Goal**: Decide the least invasive, Next.js-aligned approach to disable caching for the private patch in local dev only.

Research questions (no NEEDS CLARIFICATION expected):

- How Next.js data cache / request memoization interacts with `unstable_cache` and `fetch` options in development
- Best practice patterns for “dev only no-store” while keeping production caching (revalidate) unchanged

**Output**: `specs/012-local-dev-no-fetch-cache/research.md`

## Phase 1 — Design & Contracts

**Data model**:

- Describe the “Experience Data Source → Portfolio Patch → Experience Entries” flow and how “runtime mode” affects freshness.

**Contract**:

- Document external expectations for the private patch endpoint (response format, redirects, timeout assumptions) at a high level.

**Quickstart**:

- Document the local workflow to validate: edit spreadsheet → reload → observe updated Experience.

**Output**:

- `specs/012-local-dev-no-fetch-cache/data-model.md`
- `specs/012-local-dev-no-fetch-cache/contracts/README.md`
- `specs/012-local-dev-no-fetch-cache/quickstart.md`

## Phase 1 — Agent Context Update

Run:

- `.specify/scripts/bash/update-agent-context.sh cursor-agent`

## Re-check Constitution (post-design)

Confirm:

- No production perf regression (dev-only behavior)
- No new deps
- No UI changes

## Phase 2 — Task Planning (handoff to /speckit.tasks)

Implementation tasks will focus on:

- Detecting development runtime
- Bypassing `unstable_cache` (or forcing revalidate=0) in development only
- Ensuring underlying `fetch` calls do not return stale content in development
- Verifying production retains existing cache window behavior
