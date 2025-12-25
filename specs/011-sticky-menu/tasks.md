---
description: "Tasks for 011 – Sticky MENU (Always Visible Navigation)"
---

# Tasks: 011 – Sticky MENU (Always Visible Navigation)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/011-sticky-menu/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  

**Tests**: No automated tests requested. Verify via `quickstart.md`, plus `pnpm lint` and `pnpm build`.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1/US2)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm current Menu UI and current anchor behavior.

- [ ] T001 Confirm current Menu component structure in `src/components/TableOfContents.tsx` and `src/components/toc.ts`
- [ ] T002 Confirm page composition order in `src/app/page.tsx` (Hero → Menu → sections)
- [ ] T003 Confirm current section anchor offsets (`scroll-mt-*`) in `src/components/sections/*Section.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Decide sticky strategy + offsets to avoid covering headings.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T004 Decide sticky mechanism as CSS `position: sticky` (no JS) and document in `specs/011-sticky-menu/research.md`
- [ ] T005 Define the target sticky top offset and target menu height (rough) in `specs/011-sticky-menu/research.md`
- [ ] T006 Decide anchor offset approach (increase `scroll-mt-*` or CSS variable) and document in `specs/011-sticky-menu/research.md`

**Checkpoint**: We have a clear design for “always visible” and “headings not covered”.

---

## Phase 3: User Story 1 - どの位置でもMENUで迷子にならない (Priority: P1) 🎯 MVP

**Goal**: MENU stays visible while scrolling; clicking jumps to sections.

**Independent Test**: Scroll mid/bottom, MENU remains visible; click `Projects` → lands at `#projects` with heading visible.

### Implementation for User Story 1

- [ ] T007 [US1] Make Menu sticky using Tailwind/CSS in `src/components/TableOfContents.tsx` (`position: sticky`, `top-*`, `z-*`)
- [ ] T008 [US1] Add necessary spacing so the sticky Menu doesn’t overlap content in `src/app/page.tsx` (e.g., wrapper gap/padding)
- [ ] T009 [US1] Adjust section `scroll-mt-*` values to account for sticky Menu height in `src/components/sections/*Section.tsx`

**Checkpoint**: Sticky Menu works without JS and anchors don’t hide headings.

---

## Phase 4: User Story 2 - “かっこいい”レトロHUDとして成立する (Priority: P2)

**Goal**: Sticky Menu looks like a retro HUD and remains usable on mobile/keyboard.

**Independent Test**: On mobile width, Menu wraps/compacts; keyboard focus is visible; design feels intentional.

### Implementation for User Story 2

- [ ] T010 [US2] Apply “HUD” styling (contrast, subtle shadow, optional blur) in `src/components/TableOfContents.tsx`
- [ ] T011 [US2] Ensure buttons remain tappable on mobile (wrapping/gap/size) in `src/components/TableOfContents.tsx`
- [ ] T012 [US2] Ensure focus styles remain strong for keyboard navigation in `src/components/TableOfContents.tsx`

**Checkpoint**: “Cool retro HUD” achieved without hurting readability.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + docs sync for top-level UX change.

- [ ] T013 Update docs to mention sticky Menu in `README.md`, `AGENTS.md`, and `CLAUDE.md`
- [ ] T014 Run `specs/011-sticky-menu/quickstart.md` verification steps
- [ ] T015 Run `pnpm lint` and fix any issues
- [ ] T016 Run `pnpm build` and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion (blocks US1/US2)
- **US1 (P1)**: Depends on Foundational
- **US2 (P2)**: Depends on US1 being in place (it’s styling/usability on top of sticky behavior)
- **Polish**: After desired user stories are complete

### Parallel Opportunities

- T007 and T009 can be parallelized carefully if different files are edited (Menu vs sections.
- In US2, T010–T012 are mostly the same file and should be done sequentially.


