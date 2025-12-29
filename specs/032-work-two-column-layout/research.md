# Research: Work Two-Column Layout

**Feature**: `032-work-two-column-layout`  
**Date**: 2025-12-29  

## Decision: CSS-first 2-column grid (detail spans rows)

- **Decision**: Change the Work “RPG” desktop grid from 3 columns to **2 columns**, with the DETAIL panel spanning the full height (grid row span). Keep markup and JS behavior stable.
- **Rationale**:
  - Readability improves immediately by reducing horizontal density.
  - Lowest risk: avoids changing `WorkQuestLog` interaction logic and ARIA semantics.
  - Keeps the “unique screen” feel (STATUS / QUEST LOG / DETAIL panels still exist), just reorganized.
- **Alternatives considered**:
  - **Merge panels in markup** (wrap STATUS + QUEST LOG in a single left-column container): viable but increases DOM changes and CSS complexity.
  - **Tabs/accordion** (hide QUEST LOG or DETAIL behind a tab): reduces density but slows scanning and changes interaction model.
  - **Change breakpoint** (keep 3 columns only at very wide widths): still violates “max 2 columns” requirement and can reintroduce the same readability problem.

## Decision: Keep breakpoints aligned with existing Work CSS

- **Decision**: Continue using the existing breakpoint (`min-width: 768px`) but switch from 3 columns → 2 columns at that breakpoint.
- **Rationale**: Keeps the responsive behavior consistent with current design tokens and avoids inventing a new breakpoint policy.

## Decision: Add overflow/readability guardrails (only if needed)

- **Decision**: If horizontal overflow appears after the grid change, add targeted CSS (e.g., `min-width: 0` for grid items, `overflow-wrap: anywhere` for long tokens).
- **Rationale**: Prevents accidental horizontal scroll without changing content.

