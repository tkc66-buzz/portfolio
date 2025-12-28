# Research: Activities link button sizing unification

**Feature**: `specs/023-activities-link-buttons/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Keep NES.css button base, add minimal Tailwind utilities to normalize size

- **Chosen**: Use `nes-btn` + `is-small` as the base, and add a small set of Tailwind utilities:
  - `whitespace-nowrap` to prevent wrapping (stabilize height)
  - `text-[0.7rem] leading-none` to normalize label sizing
  - `shrink-0` to prevent flex squish
- **Rationale**:
  - No new dependencies
  - Minimal diff scoped to Activities
  - Keeps retro styling consistent with the rest of the site
- **Alternatives considered**:
  - Global CSS overrides for all `.nes-btn` (rejected: too broad/risky)
  - Fixed-width buttons with truncation (rejected: may hide important label)

## Notes

If any label still wraps on narrow screens, prefer allowing horizontal scroll or reducing letter spacing rather than increasing button height.


