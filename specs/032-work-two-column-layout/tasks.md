---
description: "Tasks for implementing Work Two-Column Layout"
---

# Tasks: Work Two-Column Layout

**Input**: Design documents from `specs/032-work-two-column-layout/`  
**Prerequisites**: `specs/032-work-two-column-layout/plan.md` (required), `specs/032-work-two-column-layout/spec.md` (required)  
**Tests**: Not requested (manual verification via `specs/032-work-two-column-layout/quickstart.md`)  

## Phase 1: Setup (Shared)

- [x] T001 Confirm current 3-column desktop grid definition in `src/app/globals.css` (Work RPG UI section)
- [x] T002 Confirm panel class hooks exist for CSS placement in `src/components/sections/WorkQuestLog.tsx` (`.work-rpg__panel--status`, `--log`, `--detail`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Checkpoint**: Ready to change layout CSS without touching interaction logic

- [x] T003 Add/confirm non-overflow guardrail for grid children in `src/app/globals.css` (e.g., ensure panels can shrink via `min-width: 0`)

---

## Phase 3: User Story 1 — Read Work comfortably on desktop (Priority: P1) 🎯 MVP

**Goal**: Work “RPG” layout uses **max 2 columns** on desktop, improving readability without changing behavior.

**Independent Test**: Follow `specs/032-work-two-column-layout/quickstart.md` desktop section; confirm no 3-panel horizontal layout and no horizontal scrolling.

- [x] T004 [US1] Change Work RPG desktop grid from 3 columns → 2 columns in `src/app/globals.css`
- [x] T005 [US1] Place panels into 2-column grid (STATUS+QUEST LOG stacked left, DETAIL spans right) in `src/app/globals.css`
- [x] T006 [US1] Ensure text and grid items do not cause horizontal overflow (wrap/ellipsis/min-width) in `src/app/globals.css`

**Checkpoint**: Desktop Work layout is max 2 columns and readable.

---

## Phase 4: User Story 2 — Keep navigation efficient (Priority: P2)

**Goal**: Quest selection remains quick and clear after layout change.

**Independent Test**: In Work, click multiple quests and confirm DETAIL updates immediately; verify selection styling remains obvious.

- [x] T007 [US2] Validate quest selection UI still reads well in 2-column layout (selected row + detail hierarchy) and adjust only CSS if needed in `src/app/globals.css`
- [x] T008 [US2] If QUEST LOG becomes too tall/dense on desktop, add an optional scroll container (without breaking accessibility) in `src/app/globals.css`

**Checkpoint**: Navigation remains efficient and visually clear.

---

## Phase 5: User Story 3 — Responsive & accessible (Priority: P3)

**Goal**: Mobile/tablet layouts remain readable; keyboard navigation still works.

**Independent Test**: Follow `specs/032-work-two-column-layout/quickstart.md` (mobile + keyboard sections).

- [x] T009 [US3] Verify mobile (<768px) remains single-column stacked; adjust responsive CSS only if needed in `src/app/globals.css`
- [x] T010 [US3] Verify intermediate widths do not regress (no unexpected 3-column layout; no overflow); adjust CSS as needed in `src/app/globals.css`

**Checkpoint**: Responsive behavior and accessibility are preserved.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T011 Run validation steps in `specs/032-work-two-column-layout/quickstart.md` (desktop/mobile/keyboard)
- [x] T012 Update completion status in `specs/032-work-two-column-layout/checklists/requirements.md`
- [x] T013 Run `pnpm lint` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [x] T014 Run `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`

---

## Dependencies & Execution Order

- **Phase 1** depends on nothing.
- **Phase 2** depends on Phase 1 (confirm hooks).
- **US1 (P1)** depends on Phase 2.
- **US2 (P2)** depends on US1 (needs the new layout in place).
- **US3 (P3)** depends on US1 (verify responsive/accessibility after layout change).
- **Polish** depends on completing the desired user stories.

### User Story Dependencies

- **US1**: MVP; no dependency on other stories.
- **US2**: Assumes the 2-column layout exists (US1).
- **US3**: Assumes the 2-column layout exists (US1).

### Parallel Opportunities

- Tasks marked **[P]** can be done in parallel (none required; most tasks are sequential CSS changes).

---

## Parallel Example: After US1 (optional)

```bash
# In parallel (if needed):
# - Validate keyboard behavior
# - Validate mobile layout
```


