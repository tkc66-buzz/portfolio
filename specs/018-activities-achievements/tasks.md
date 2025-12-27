---
description: "Tasks for 018 – Activities: Achievements (Awards)"
---

# Tasks: 018 – Activities: Achievements (Awards)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/018-activities-achievements/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  
**Tests**: Not requested (use `pnpm lint` + `pnpm build` as quality gates)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Confirm spec/plan artifacts exist and are consistent (`specs/018-activities-achievements/spec.md`, `specs/018-activities-achievements/plan.md`)
- [ ] T002 Review current Activities implementation and data model (`src/components/sections/ActivitiesSection.tsx`, `src/content/portfolio.ts`)

---

## Phase 2: Foundational (Blocking Prerequisites)

> No separate foundational infrastructure is required for this feature (no new deps, no new routes).

- [ ] T003 Confirm current build passes before changes (`pnpm lint`, `pnpm build`)

**Checkpoint**: Baseline is green; start user story work.

---

## Phase 3: User Story 1 - Achievements are visible under Activities (Priority: P1) 🎯 MVP

**Goal**: Add an `Achievements` group to `Activities` with the same item schema and safe external link behavior.

**Independent Test**: Add an Achievements group with at least one item in `src/content/portfolio.ts`, reload page, and confirm it renders under `#activities` (year + title + optional link).

- [ ] T004 [US1] Extend `ActivityGroup.name` union to include `Achievements` in `src/content/portfolio.ts`
- [ ] T005 [US1] Add an `Achievements` group to `publicPortfolio.activities.groups` in `src/content/portfolio.ts` (start with `items: []` to allow safe incremental authoring)
- [ ] T006 [US1] Ensure Activities intro copy still matches categories (optionally mention achievements) in `src/components/sections/ActivitiesSection.tsx`
- [ ] T007 [US1] Add 1 temporary local-only Achievements item to validate rendering, then decide final source:
  - keep it in `publicPortfolio` (if it’s truly public), or
  - move it to private override (if it should be private)
  (`src/content/portfolio.ts` and/or your private override source)
- [ ] T008 [US1] Confirm override semantics note is present and correct in `specs/018-activities-achievements/contracts/README.md` (groups array is replaced, not deep-merged)

**Checkpoint**: Achievements group can be rendered, and external link behavior remains safe.

---

## Phase 4: User Story 2 - Empty state is explicit (Priority: P2)

**Goal**: Ensure the Achievements group behaves well when empty (explicit “Coming soon”).

**Independent Test**: Keep `Achievements.items = []` and confirm the group shows “Coming soon” under Activities without layout issues.

- [ ] T009 [US2] Verify empty state behavior for empty Achievements group in `src/components/sections/ActivitiesSection.tsx` (no code changes if already correct)
- [ ] T010 [US2] Validate long titles/context wrapping does not break layout (mobile + desktop) and adjust classes if needed in `src/components/sections/ActivitiesSection.tsx`

**Checkpoint**: Achievements group is visible and never looks broken even when empty.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T011 Update docs where necessary for authoring guidance (if contract/quickstart changed): `specs/018-activities-achievements/quickstart.md`
- [ ] T012 Run quality gates and confirm no regressions (`pnpm lint`, `pnpm build`)
- [ ] T013 Run quickstart verification steps in `specs/018-activities-achievements/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- Phase 1 (Setup) → Phase 2 (Baseline build) → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (Polish)

### User Story Dependencies

- **US1 (P1)**: Depends on baseline green build (T003). No dependency on US2.
- **US2 (P2)**: Depends on US1 having an Achievements group present in data (T005).

### Parallel Opportunities

- Most work is in `src/content/portfolio.ts` and `src/components/sections/ActivitiesSection.tsx`; do sequentially to avoid conflicts.
- Docs tasks (T008, T011) can be done in parallel with UI changes if needed.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

- Implement T004–T008, then validate the independent test for US1.
- Keep Achievements items empty by default unless you have truly public awards to publish.

### Incremental Delivery

- Ship capability + empty state first (US1/US2), then add real Achievements items via public content or private override.
