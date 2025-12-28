# Research: Section typography size upgrade

**Feature**: `specs/024-section-typography/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Promote section body text to `text-base` by default

- **Chosen**: Use `text-base` as the default for section body paragraphs and descriptive copy.
- **Rationale**:
  - Current `text-sm` (and scattered `text-xs`) reads too small, especially on mobile.
  - Aligns with constitution “Modern Usability” without breaking the retro palette.
- **Alternatives considered**:
  - Increasing global `html/body` font-size (rejected: too broad; affects menu/buttons/badges).

### Decision: Use a shared typography token for “section body”

- **Chosen**: Add a small shared class (e.g. `.section-body`) in `src/app/globals.css` and apply it across sections.
- **Rationale**: Avoids drift; easy future tuning from one place.

## Open Questions

- Whether dense parts (Skills progress labels, badges) should remain small (`text-xs`) while descriptions become `text-base`.


