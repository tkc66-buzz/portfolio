---
description: "Tasks for implementing Achievement toast close polish"
---

# Tasks: Achievement Toast Close Polish

**Input**: Design documents from `specs/035-achievement-toast-polish/`  
**Prerequisites**: `specs/035-achievement-toast-polish/plan.md` (required), `specs/035-achievement-toast-polish/spec.md` (required)  
**Tests**: Not requested (manual verification via `specs/035-achievement-toast-polish/quickstart.md`)  

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Confirm current toast behavior and close flow in `src/components/AchievementToast.tsx` (state machine + session storage)
- [ ] T002 Confirm Activities layout currently reserves spacer height in `src/components/sections/ActivitiesSection.tsx` (toast wrapper spacing)
- [ ] T003 Confirm existing toast CSS animations and reduced-motion behavior in `src/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Checkpoint**: Decide how to eliminate the “empty gap” and where the post-close indicator should live.

- [ ] T004 Remove permanent spacer wrapper around the toast in `src/components/sections/ActivitiesSection.tsx` (avoid empty `mt-3` when toast is null)
- [ ] T005 Add a dedicated container class or structure for toast/indicator placement in `src/components/sections/ActivitiesSection.tsx` (so spacing is applied only when something is rendered)

---

## Phase 3: User Story 1 — Dismiss feels satisfying and intentional (Priority: P1) 🎯 MVP

**Goal**: Closing the toast never leaves awkward spacing and does not feel like a broken disappearance.

**Independent Test**: Follow `specs/035-achievement-toast-polish/quickstart.md` → “Close behavior”.

- [ ] T006 [US1] Adjust `AchievementToast` close behavior so it exits cleanly and does not leave layout artifacts in `src/components/AchievementToast.tsx`
- [ ] T007 [US1] Ensure close still works when clicked immediately after show (no stuck intermediate state) in `src/components/AchievementToast.tsx`
- [ ] T008 [US1] Ensure the Activities section layout remains stable after close in `src/components/sections/ActivitiesSection.tsx`

**Checkpoint**: No weird gap remains after close.

---

## Phase 4: User Story 2 — Post-close affordance (Priority: P2)

**Goal**: After close, leave a subtle “collected” trace (non-intrusive).

**Independent Test**: Follow `specs/035-achievement-toast-polish/quickstart.md` → “Post-close indicator”.

- [ ] T009 [US2] Extend `AchievementToast` to render a minimal post-close indicator instead of returning `null` forever in `src/components/AchievementToast.tsx`
- [ ] T010 [US2] Add styling for the indicator in `src/app/globals.css` (keep it subtle; avoid attention-stealing motion)

---

## Phase 5: User Story 3 — Reduced-motion friendly and accessible (Priority: P3)

**Goal**: Respect reduced motion and keep interaction accessible.

**Independent Test**: Follow `specs/035-achievement-toast-polish/quickstart.md` → “Reduced motion”.

- [ ] T011 [US3] Ensure reduced-motion mode dismisses without animation-heavy transitions in `src/components/AchievementToast.tsx` and `src/app/globals.css`
- [ ] T012 [US3] Ensure indicator does not spam announcements (ARIA) and focus behavior remains predictable in `src/components/AchievementToast.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T013 Run validation steps in `specs/035-achievement-toast-polish/quickstart.md`
- [ ] T014 Run `pnpm lint` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [ ] T015 Run `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`

---

## Dependencies & Execution Order

- **Phase 1**: No dependencies.
- **Phase 2**: Depends on Phase 1 (understand current layout + CSS).
- **US1 (P1)**: Depends on Phase 2 (gap fix provides the baseline).
- **US2 (P2)**: Depends on US1 (indicator replaces “nothing” post-close).
- **US3 (P3)**: Depends on US1/US2 (verify reduced motion + a11y across final behavior).
- **Polish**: After desired user stories.

### Parallel Opportunities

- [ ] T016 [P] (Optional) Implement indicator CSS in `src/app/globals.css` in parallel with the component changes once the indicator markup is decided


