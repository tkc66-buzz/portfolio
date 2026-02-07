# Tasks: Fix Hydration Error and Start Gate Visibility

**Input**: Design documents from `/specs/039-fix-hydration-error/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test framework configured. Verification is `pnpm lint` + `pnpm build` + manual browser checks (per quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Single Next.js App Router project
- **Source**: `src/` at repository root
- **Components**: `src/components/`
- **App**: `src/app/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Extract gate constants into a shared module so all components reference the same values

- [ ] T001 Create start gate constants module with storage key, class names, and event name in `src/components/startGate.ts`

**Checkpoint**: Constants module exists and exports `START_GATE_STORAGE_KEY`, `START_GATE_CLASS_NOT_STARTED`, `START_GATE_CLASS_STARTING`, `START_GATE_CLASS_STARTED`, `START_GATE_EVENT`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the CSS gating system and server-side session restore that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Add CSS rules for `.start-gated` visibility gating (`display: none` when `html.not-started` or `html.is-starting`) in `src/app/globals.css`
- [ ] T003 Add `not-started` default class to `<html>` element and inline `<script>` that checks `sessionStorage` for `portfolio.started.v1` and applies `is-started` class before first paint in `src/app/layout.tsx`
- [ ] T004 Add `suppressHydrationWarning` to `<html>` element in `src/app/layout.tsx` to allow the inline script class changes without React hydration errors
- [ ] T005 Wrap main content sections in a `<div className="start-gated">` container in `src/app/page.tsx`

**Checkpoint**: Foundation ready — page loads with `html.not-started`; CSS hides `.start-gated` content; sessionStorage restore applies `is-started` on reload; no hydration warnings from `<html>` class changes

---

## Phase 3: User Story 1 — Initial Page Load Experience (Priority: P1) 🎯 MVP

**Goal**: On initial page load, only the Hero section with "PRESS START" button is visible. The mobile hamburger menu and all gated content are hidden. No hydration errors occur.

**Independent Test**: Open the site on a mobile device. Before pressing START, verify no hamburger menu icon is visible and browser console shows zero hydration errors.

### Implementation for User Story 1

- [ ] T006 [US1] Implement `useHasMounted()` hook using `useSyncExternalStore` with server snapshot returning `false` and client snapshot returning `true` in `src/components/MobileMenu.tsx`
- [ ] T007 [US1] Implement `useStartGateStarted()` hook using `useSyncExternalStore` that subscribes to `START_GATE_EVENT` and reads `is-started` class from `document.documentElement` in `src/components/Hero.tsx`
- [ ] T008 [US1] Add dual-gate conditional rendering to MobileMenu: return `null` when `!mounted || !started` (before the Portal render) in `src/components/MobileMenu.tsx`
- [ ] T009 [US1] Update Hero component `onStart()` handler to set sessionStorage, apply class transitions (`not-started` → `is-starting` → `is-started`), and dispatch `START_GATE_EVENT` in `src/components/Hero.tsx`
- [ ] T010 [US1] Add boot animation CSS for `html.is-starting` state (scanlines/vignette effect, 520ms duration) in `src/app/globals.css`
- [ ] T011 [US1] Add `prefers-reduced-motion` media query to skip boot animation when reduced motion is preferred in `src/app/globals.css`
- [ ] T012 [US1] Run `pnpm lint` and `pnpm build` to verify no errors

**Checkpoint**: User Story 1 fully functional — page loads with only Hero visible; no hamburger menu before START; no hydration errors in console; `pnpm build` passes

---

## Phase 4: User Story 2 — Post-START Menu Visibility (Priority: P2)

**Goal**: After pressing "PRESS START", the mobile hamburger menu appears and functions correctly (open/close, navigation, scroll lock).

**Independent Test**: Press START button, then verify hamburger icon appears in top-right on mobile view; tap it to open the menu overlay; tap a menu item to navigate.

### Implementation for User Story 2

- [ ] T013 [US2] Ensure MobileMenu Portal renders correctly after both `mounted` and `started` become true — verify button and overlay content are created via `createPortal(content, document.body)` in `src/components/MobileMenu.tsx`
- [ ] T014 [US2] Verify existing menu functionality is preserved: hamburger toggle, overlay open/close, menu item click navigation, keyboard accessibility, focus trap, scroll lock in `src/components/MobileMenu.tsx`
- [ ] T015 [US2] Verify page reload persistence — after pressing START, reload the page and confirm hamburger menu appears immediately (sessionStorage-based restore) via manual browser test
- [ ] T016 [US2] Run `pnpm lint` and `pnpm build` to verify no errors

**Checkpoint**: User Stories 1 AND 2 both work independently — menu hidden before START, visible and functional after START, persists across reloads

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T017 Verify desktop behavior: TableOfContents (sticky menu) is CSS-gated and hidden before START, visible after START in `src/components/TableOfContents.tsx`
- [ ] T018 Verify reduced-motion behavior across all gate transitions (no animation when `prefers-reduced-motion: reduce` is active) via manual browser test
- [ ] T019 Run full verification suite: `pnpm format:check && pnpm lint && pnpm build`
- [ ] T020 Run quickstart.md manual verification checklist (all 5 scenarios from `specs/039-fix-hydration-error/quickstart.md`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001) — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 (Phase 3) — US2 needs the gate hooks implemented in US1
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 — needs `useHasMounted()` and `useStartGateStarted()` hooks and the dual-gate pattern to be in place before testing post-START behavior

### Within Each User Story

- Constants (startGate.ts) before hooks
- Hooks before conditional rendering
- CSS rules before animation verification
- Core implementation before lint/build check
- Commit after each task or logical group

### Parallel Opportunities

- T002 and T003/T004 can run in parallel (different files: globals.css vs layout.tsx)
- T006 and T007 can run in parallel (different files: MobileMenu.tsx vs Hero.tsx)
- T010 and T011 can run in parallel (additive CSS rules, no conflicts)
- T017 and T018 can run in parallel (independent verification scenarios)

---

## Parallel Example: User Story 1

```bash
# Launch hooks for User Story 1 together (different files):
Task: "Implement useHasMounted() in src/components/MobileMenu.tsx"
Task: "Implement useStartGateStarted() in src/components/Hero.tsx"

# Launch CSS tasks together (additive, no conflicts):
Task: "Add boot animation CSS in src/app/globals.css"
Task: "Add reduced-motion media query in src/app/globals.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational (T002–T005)
3. Complete Phase 3: User Story 1 (T006–T012)
4. **STOP and VALIDATE**: Test User Story 1 independently — mobile load shows no menu, no hydration errors
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy (MVP — gate works, menu hidden)
3. Add User Story 2 → Test independently → Deploy (full fix — menu works post-START)
4. Polish → Final validation → Production-ready

### File Impact Summary

| File | Tasks | Changes |
|------|-------|---------|
| `src/components/startGate.ts` | T001 | New: constants module |
| `src/app/globals.css` | T002, T010, T011 | Add: gate CSS + boot animation + reduced-motion |
| `src/app/layout.tsx` | T003, T004 | Modify: add class, inline script, suppressHydrationWarning |
| `src/app/page.tsx` | T005 | Modify: wrap content in `start-gated` div |
| `src/components/Hero.tsx` | T007, T009 | Modify: add hook + update onStart handler |
| `src/components/MobileMenu.tsx` | T006, T008, T013, T014 | Modify: add hooks + dual-gate rendering |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test framework tasks: verification is `pnpm lint` + `pnpm build` + manual browser checks
