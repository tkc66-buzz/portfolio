# Contracts: Work Two-Column Layout

**Feature**: `032-work-two-column-layout`  
**Date**: 2025-12-29  

This feature has **no backend/API contracts**. These are UI/layout contracts.

## UI Contract

### Layout invariants

- On desktop-width viewports, `WorkQuestLog` MUST render with **max 2 columns**.
- Panels still exist as:
  - `.work-rpg__panel--status`
  - `.work-rpg__panel--log`
  - `.work-rpg__panel--detail`
- `.work-rpg__panel--detail` remains visible and readable (no forced horizontal scroll).

### Interaction invariants

- Quest selection (mouse click + Arrow key navigation) remains unchanged.
- ARIA roles remain:
  - Quest list: `role="tablist"` with quest buttons `role="tab"`
  - Detail: `role="tabpanel"`

