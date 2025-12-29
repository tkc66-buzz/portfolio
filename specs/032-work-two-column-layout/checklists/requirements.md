# Requirements Checklist: Work Two-Column Layout

**Feature**: `032-work-two-column-layout`  
**Date**: 2025-12-29  

## UX / UI

- [x] Work section uses **max 2 columns** on desktop-sized viewports (no 3-panel horizontal layout).
- [x] No horizontal scroll is introduced in the Work section on common viewport widths.
- [x] Quest list remains scannable; selected state remains visually clear.

## Accessibility

- [x] Keyboard navigation (Arrow keys + focus) still works for quest selection.
- [x] Tab/tabpanel semantics remain correct (no broken `aria-controls` / `aria-selected` flows).
- [x] Text remains readable (line length / truncation / wrapping) after the layout change.

## Performance / Quality Gates

- [x] No new runtime dependencies added.
- [x] `pnpm lint` passes.
- [x] `pnpm build` passes.

## Docs / Spec Hygiene

- [x] `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md` exist and are consistent.

