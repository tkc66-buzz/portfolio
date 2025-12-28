# Research: Year badge readability upgrade (non-Skills)

**Feature**: `specs/025-year-badges/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Introduce a shared `.year-badge` token and apply to Work + Activities

- **Chosen**: Add a small CSS utility class (e.g., `.year-badge`) in `src/app/globals.css` and apply it to:
  - Work: period badge
  - Activities: year badge
- **Rationale**:
  - Removes scattered `text-[0.6rem]` tweaks and prevents future drift.
  - Keeps the retro `nes-badge` look; only improves legibility.
- **Alternatives considered**:
  - Increase global badge font-size (rejected: affects all badges, including Skills and tech tags).

### Decision: Target sizing

- **Chosen**: Increase from ~`0.6rem` to ~`0.75rem` (or equivalent) for year/period only.
- **Rationale**: Readable on mobile without making badge rows too tall.

## Guardrails

- Skills is explicitly out-of-scope; do not change Skills year sizing.
- Prefer minimal layout impact: avoid changing badge padding/margins unless necessary.


