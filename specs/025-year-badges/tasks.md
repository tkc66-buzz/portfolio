---
description: "Tasks for 025-year-badges"
---

# Tasks: Year badge readability upgrade (non-Skills)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/025-year-badges/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline build health before UI adjustments.

- [X] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 [P] Inventory current year/period badge sizing in `src/components/sections/WorkSection.tsx` and `src/components/sections/ActivitiesSection.tsx` (find `text-[0.6rem]`, `text-xs`, etc.)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce a single source of truth for year/period badge typography.

- [X] T003 Add `.year-badge` CSS token in `src/app/globals.css` (target: ~`0.75rem` text size; keep NES badge look)
- [X] T004 Ensure `.year-badge` does not affect Skills (do not apply it in `src/components/sections/SkillsSection.tsx`)

**Checkpoint**: A single `.year-badge` exists and is only used by non-Skills year/period badges.

---

## Phase 3: User Story 1 - Readable “year” badges (Priority: P1) 🎯 MVP

**Goal**: Make Work/Activities year/period badges readable at a glance.

**Independent Test**: `pnpm dev` → Workのperiod、ActivitiesのyearがSkillsと同等に読めるサイズ。

- [X] T005 [US1] Apply `.year-badge` to Work period badge in `src/components/sections/WorkSection.tsx` (replace tiny `text-[0.6rem]` styling)
- [X] T006 [US1] Apply `.year-badge` to Activities year badge in `src/components/sections/ActivitiesSection.tsx` (replace tiny `text-[0.6rem]` styling)

---

## Phase 4: User Story 2 - Keep layout stable (Priority: P2)

**Goal**: Increase readability without breaking layout on mobile.

**Independent Test**: Mobile widthでバッジが潰れず、行が不自然に伸びない。

- [X] T007 [US2] Verify long strings like `2019–2025` don’t clip; if needed, adjust container layout in `src/components/sections/WorkSection.tsx` (avoid reducing font size)
- [X] T008 [US2] Verify Activities rows remain aligned; if needed, adjust flex/wrapping rules in `src/components/sections/ActivitiesSection.tsx`

---

## Phase 5: User Story 3 - Single source of truth (Priority: P3)

**Goal**: Prevent future drift by removing ad-hoc year sizing tweaks.

**Independent Test**: No more per-component hardcoded tiny year sizing for Work/Activities.

- [X] T009 [US3] Remove remaining hardcoded year/period font sizes in `WorkSection.tsx` / `ActivitiesSection.tsx` now covered by `.year-badge`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + quickstart validation. Docs sync not required (UI polish only).

- [X] T010 Run `pnpm lint` and fix any issues
- [X] T011 Run `pnpm build` and fix any issues
- [X] T012 Validate `specs/025-year-badges/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

- Setup (T001–T002) → Foundational (T003–T004) → US1 (T005–T006) → US2 (T007–T008) → US3 (T009) → Polish (T010–T012)


