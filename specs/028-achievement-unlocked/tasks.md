# Tasks: Achievement Unlocked toast (Activities)

**Input**: Design documents from `specs/028-achievement-unlocked/`  
**Prerequisites**: `specs/028-achievement-unlocked/plan.md`, `specs/028-achievement-unlocked/spec.md`, `specs/028-achievement-unlocked/research.md`, `specs/028-achievement-unlocked/data-model.md`, `specs/028-achievement-unlocked/contracts/README.md`, `specs/028-achievement-unlocked/quickstart.md`

**Tests**: No automated tests requested. Validate via quickstart + lint/build.

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create client component scaffold in `src/components/AchievementToast.tsx`
- [x] T002 [P] Add toast CSS scaffold (scoped) in `src/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Add sessionStorage helpers + keys in `src/components/AchievementToast.tsx` (v1 keys, read/write)
- [x] T004 [P] Add reduced-motion detection helper in `src/components/AchievementToast.tsx`
- [x] T005 Add in-view trigger wiring (IntersectionObserver) in `src/components/AchievementToast.tsx`

**Checkpoint**: Toast can decide “should show now?” deterministically without touching Activities UI yet

---

## Phase 3: User Story 1 — Achievement unlocked appears once (Priority: P1) 🎯 MVP

**Goal**: Activities が初めて画面内に入った瞬間に、トーストが1回だけ表示される。

**Independent Test**: `pnpm dev` で上からスクロールし Activities に入ると1回だけ表示され、再度入り直しても再表示されない。

- [x] T006 [US1] Render the toast UI (title + small message) in `src/components/AchievementToast.tsx`
- [x] T007 [US1] Mount `AchievementToast` inside `src/components/sections/ActivitiesSection.tsx` (below heading, overlay positioning)
- [x] T008 [US1] Ensure toast does not cover Activities content (safe placement + pointer events) in `src/app/globals.css`
- [x] T009 [US1] Ensure “already shown” is respected on reload within same tab in `src/components/AchievementToast.tsx`

**Checkpoint**: US1 works standalone and is easy to demo

---

## Phase 4: User Story 2 — Dismissible (Priority: P2)

**Goal**: ユーザーが閉じられ、閉じた後は再表示されない。

**Independent Test**: Close を押すと消え、その後 Activities に入り直しても出ない。

- [x] T010 [US2] Add close button + handler in `src/components/AchievementToast.tsx`
- [x] T011 [US2] Persist dismissed state (session) in `src/components/AchievementToast.tsx`
- [x] T012 [US2] Add a11y labels for close control (aria-label) in `src/components/AchievementToast.tsx`
- [x] T013 [US2] Add “dismissed” visual exit (non-blocking) in `src/app/globals.css`

---

## Phase 5: User Story 3 — Motion safe + reduced motion (Priority: P3)

**Goal**: reduced-motion では派手な演出が無効化される（静的表示）。

**Independent Test**: reduced-motion を有効化してリロードし、Activities 到達時にアニメーション無しで表示される。

- [x] T014 [US3] Gate toast entrance animation behind `prefers-reduced-motion` in `src/app/globals.css`
- [x] T015 [US3] Ensure toast animations use transform/opacity only in `src/app/globals.css`
- [x] T016 [US3] Confirm no new scroll handlers were introduced (Observer only) in `src/components/AchievementToast.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T017 [P] Tune copy and NES.css styling to match retro theme in `src/components/AchievementToast.tsx`
- [x] T018 Ensure styling is Activities-scoped (no leakage) in `src/app/globals.css`
- [x] T019 Validate manual QA in `specs/028-achievement-unlocked/quickstart.md`
- [x] T020 Run `pnpm lint` and `pnpm build` and fix any issues

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (Phase 3)** → **US2 (Phase 4)** → **US3 (Phase 5)** → **Polish (Phase 6)**

## Parallel Opportunities

- [P] CSS work in `src/app/globals.css` can run in parallel with component logic in `src/components/AchievementToast.tsx`.

## Parallel Example: US2

```bash
Task: "Add close button + handler in src/components/AchievementToast.tsx"
Task: "Add dismissed visual exit in src/app/globals.css"
```

## Implementation Strategy

### MVP First (US1 Only)

- First land “show once on first in-view” with minimal UI and safe placement.

### Incremental Delivery

- Add dismiss + persistence (US2), then motion safety gates (US3).
