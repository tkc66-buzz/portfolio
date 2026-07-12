---
description: "Tasks for 023-activities-link-buttons"
---

# Tasks: Activities link button sizing unification

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/023-activities-link-buttons/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline build health before UI tweaks.

- [x] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Identify the current source of inconsistent sizing and choose the single source of truth for the className.

- [x] T002 Inspect current Activities link button rendering in `src/components/sections/ActivitiesSection.tsx` and list all button variants found
- [x] T003 Define a single reusable className constant (e.g., `ACTIVITIES_LINK_BTN_CLASS`) in `src/components/sections/ActivitiesSection.tsx`

**Checkpoint**: There is exactly one place defining the Activities link button style.

---

## Phase 3: User Story 1 - Consistent Activities link buttons (Priority: P1) 🎯 MVP

**Goal**: Make Activities link buttons consistent in height/text/padding regardless of label length.

**Independent Test**: `pnpm dev` → Activities の複数リンクボタンが同じ高さで表示され、長いラベルでも折り返さない。

- [x] T004 [US1] Update Activities link `<a>` button className in `src/components/sections/ActivitiesSection.tsx` to use the shared constant
- [x] T005 [US1] Add minimal utilities to prevent wrap and normalize size in `src/components/sections/ActivitiesSection.tsx` (per research): `whitespace-nowrap`, `text-[0.7rem]`, `leading-none`, `shrink-0`
- [x] T006 [US1] Ensure button remains aligned and does not distort layout on mobile (adjust container or add `max-w`/`truncate` on label only if necessary) in `src/components/sections/ActivitiesSection.tsx`

---

## Phase 4: User Story 2 - A11y + focus consistency (Priority: P2)

**Goal**: Keep keyboard focus visibility and avoid reducing clickable target too much.

**Independent Test**: Tab で Activities のリンクボタンを辿ってもフォーカスが見える（NES.cssの見た目を維持）。

- [x] T007 [US2] Verify focus visibility for Activities link buttons; if needed, add `focus-visible:*` utilities in `src/components/sections/ActivitiesSection.tsx`

---

## Phase 5: User Story 3 - Maintainability (Priority: P3)

**Goal**: Prevent re-introducing inconsistent button sizing in the future.

**Independent Test**: The button style is defined once, easy to adjust, and documented in-code.

- [x] T008 [US3] Add a short comment above the shared className constant in `src/components/sections/ActivitiesSection.tsx` describing the invariants (no wrap, consistent height)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + quickstart validation. Docs sync is not required (no top-level UX change).

- [x] T009 Run `pnpm lint` and fix any issues
- [x] T010 Run `pnpm build` and fix any issues
- [x] T011 Validate `specs/023-activities-link-buttons/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

- Setup (T001) → Foundational (T002–T003) → US1 (T004–T006) → US2 (T007) → US3 (T008) → Polish (T009–T011)

---

## Parallel Example: (limited)

This feature is mostly single-file (`ActivitiesSection.tsx`) work, so parallelism is limited.
