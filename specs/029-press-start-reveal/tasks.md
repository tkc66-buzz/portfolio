---
description: "Actionable task list for Press Start Reveal"
---

# Tasks: Press Start Reveal

**Input**: Design documents from `/specs/029-press-start-reveal/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  
**Tests**: Not requested (manual verification per `specs/029-press-start-reveal/quickstart.md`)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Ensure the feature spec/contract is reflected in code structure and naming.

- [x] T001 Align start-gate constants with contract in `src/components/startGate.ts`
- [x] T002 [P] Add/confirm `.start-gated` wrapper around post-Hero content in `src/app/page.tsx`
- [x] T003 [P] Add pre-hydration start-gate initialization (html class + session check) in `src/app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the CSS contract for gating and transition visuals.

**⚠️ CRITICAL**: No user story work should be considered complete until gating CSS exists (prevents accidental interaction).

- [x] T004 Implement locked-state hiding + non-interactive behavior for `.start-gated` in `src/app/globals.css`
- [x] T005 Implement transition overlay primitives (CRT/scanline look) in `src/app/globals.css`
- [x] T006 Implement reduced-motion-safe fallbacks for the transition in `src/app/globals.css`

**Checkpoint**: With JS enabled and `html.not-started`, the Menu/sections are hidden and not focusable/clickable.

---

## Phase 3: User Story 1 - Start to reveal navigation (Priority: P1) 🎯 MVP

**Goal**: Provide a clear START control in Hero and unlock the Menu/sections with a short retro transition.

**Independent Test**: Fresh load → activate START → Menu appears and can navigate to a section anchor (`specs/029-press-start-reveal/quickstart.md` steps 1–3).

### Implementation

- [x] T007 [US1] Convert Hero to an interactive client component and add a visible START button in `src/components/Hero.tsx`
- [x] T008 [US1] On START, set document state to “starting” then “started” via html classes in `src/components/Hero.tsx`
- [x] T009 [US1] After unlock, move focus to the Menu container (or first Menu item) in `src/components/Hero.tsx`
- [x] T010 [US1] Ensure the Menu container remains a stable focus target (id/aria) in `src/components/TableOfContents.tsx`
- [x] T011 [US1] Guard against double-activation (rapid clicks) in `src/components/Hero.tsx`

**Checkpoint**: User Story 1 is fully usable without relying on session persistence.

---

## Phase 4: User Story 2 - Remember “started” state for the session (Priority: P2)

**Goal**: After starting once, the Menu is unlocked on reload during the same session.

**Independent Test**: Start once → reload → Menu is already unlocked (`specs/029-press-start-reveal/quickstart.md` step 4).

### Implementation

- [x] T012 [US2] Persist started flag to session storage on unlock in `src/components/Hero.tsx`
- [x] T013 [US2] Ensure layout pre-hydration script reads the same key and sets html class accordingly in `src/app/layout.tsx`
- [x] T014 [US2] Handle storage failures gracefully (unlock still works for this view) in `src/components/Hero.tsx`

**Checkpoint**: User Story 2 works even if storage is blocked (may not persist, but unlock works).

---

## Phase 5: User Story 3 - Respect reduced motion (Priority: P3)

**Goal**: Reduced-motion users can unlock without motion-heavy transition.

**Independent Test**: Reduced motion enabled → press START → unlock works with minimal/no animation (`specs/029-press-start-reveal/quickstart.md` step 5).

### Implementation

- [x] T015 [US3] Ensure transition timing/effects are minimal under reduced motion in `src/app/globals.css`
- [x] T016 [US3] Ensure START still unlocks instantly (or near-instant) under reduced motion in `src/components/Hero.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation sync + quality gates + small UX details.

- [x] T017 [P] Sync top-level UX docs for “PRESS START reveals Menu” in `README.md`
- [x] T018 [P] Sync agent playbook notes for the new UX/gating behavior in `AGENTS.md`
- [x] T019 [P] Sync Claude boot/dev guidance if needed for the new UX behavior in `CLAUDE.md`
- [x] T020 Add a quick manual verification note (what to look for) in `specs/029-press-start-reveal/quickstart.md`
- [x] T021 Validate quality gates locally (`pnpm lint`, `pnpm build`) and fix issues in `package.json`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)** → **Phase 2 (Foundational)** → **US1 (MVP)** → **US2** → **US3** → **Polish**

### User Story Dependencies

- **US1**: Depends on Phase 2 gating CSS being present.
- **US2**: Builds on US1 by persisting started state; should not change the basic unlock UX.
- **US3**: Largely independent once US1 exists; mostly CSS + a small runtime shortcut for reduced motion.

### Parallel Opportunities

- Tasks marked **[P]** can be done in parallel safely (different files / minimal coupling).

---

## Parallel Example: MVP (US1)

```bash
# In parallel:
Task: "Implement locked-state hiding + non-interactive behavior for .start-gated in src/app/globals.css"
Task: "Convert Hero to an interactive client component and add a visible START button in src/components/Hero.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete **Phase 1–2** (gating + transition foundations)
2. Complete **US1**
3. Stop and validate manually via `specs/029-press-start-reveal/quickstart.md` steps 1–3

### Incremental Delivery

1. Add **US2** (session persistence) and validate step 4
2. Add **US3** (reduced motion) and validate step 5
3. Finish docs + `pnpm lint`/`pnpm build` before merge
