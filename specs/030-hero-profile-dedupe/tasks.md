---
description: "Actionable task list for Hero/Profile de-duplication"
---

# Tasks: Hero/Profile 역할 분리

**Input**: Design documents from `/specs/030-hero-profile-dedupe/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `contracts/`, `quickstart.md`  
**Tests**: Not requested (manual verification per `specs/030-hero-profile-dedupe/quickstart.md`)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish a safe workflow for copy changes without reintroducing hydration issues.

- [x] T001 Add a short “copy ownership” note in `specs/030-hero-profile-dedupe/contracts/README.md`
- [x] T002 [P] Identify duplicated sentences between Hero and Profile (current baseline) in `src/components/Hero.tsx`
- [x] T003 [P] Identify duplicated sentences between Hero and Profile (current baseline) in `src/components/sections/ProfileSection.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure copy updates won’t create SSR/hydration mismatch regressions.

- [x] T004 Confirm Hero text rendered during SSR is stable (no server/client divergent copy) in `src/components/Hero.tsx`
- [x] T005 Confirm Profile remains server-rendered and stable (no client-only variation) in `src/components/sections/ProfileSection.tsx`

**Checkpoint**: Hero/Profile copy can be changed without introducing hydration mismatch warnings.

---

## Phase 3: User Story 1 - First screen communicates “who” without repeating “about” (Priority: P1) 🎯 MVP

**Goal**: Remove duplicated copy and make Hero vs Profile contributions clearly distinct.

**Independent Test**: Read Hero + Profile; confirm no repeated sentences and each section adds distinct information (`specs/030-hero-profile-dedupe/quickstart.md` steps 1–2).

### Implementation

- [x] T006 [US1] Rewrite Hero body copy to be a concise identity/role statement (no Profile repetition) in `src/components/Hero.tsx`
- [x] T007 [US1] Rewrite Profile body copy to add new context beyond Hero (no repetition) in `src/components/sections/ProfileSection.tsx`
- [x] T008 [US1] Ensure “0 verbatim repeated sentences” success criterion is met (manual check) in `specs/030-hero-profile-dedupe/quickstart.md`

**Checkpoint**: US1 complete; duplication removed.

---

## Phase 4: User Story 2 - Keep “Press Start” hero interaction focused (Priority: P2)

**Goal**: Hero remains scannable and START CTA remains primary, especially on mobile.

**Independent Test**: Mobile viewport: START CTA visible without scrolling, and Hero copy remains brief (`specs/030-hero-profile-dedupe/quickstart.md` step 1).

### Implementation

- [x] T009 [US2] Ensure Hero copy stays short (no dense paragraph) and CTA prominence is preserved in `src/components/Hero.tsx`
- [x] T010 [US2] Adjust spacing/typography if needed to avoid pushing START below fold on mobile in `src/components/Hero.tsx`

---

## Phase 5: User Story 3 - Maintain tone and readability (Priority: P3)

**Goal**: Keep tone consistent with the retro theme and maintain readability.

**Independent Test**: Readability check across desktop/mobile; no awkward line breaks or overly dense paragraphs.

### Implementation

- [x] T011 [US3] Review updated copy for tone consistency and readability in `src/components/Hero.tsx`
- [x] T012 [US3] Review updated copy for tone consistency and readability in `src/components/sections/ProfileSection.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation gates.

- [x] T013 Run manual verification steps in `specs/030-hero-profile-dedupe/quickstart.md`
- [x] T014 Run `pnpm lint` and fix any issues in `src/components/Hero.tsx` and `src/components/sections/ProfileSection.tsx`
- [x] T015 Run `pnpm build` and fix any issues in `src/components/Hero.tsx` and `src/components/sections/ProfileSection.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (MVP)** → **US2** → **US3** → **Polish**

### User Story Dependencies

- **US1**: Requires Phase 2 guardrails (avoid hydration regressions).
- **US2/US3**: Build on US1 copy split, but can be iterated lightly without changing structure.

### Parallel Opportunities

- T002 and T003 can run in parallel (different files).

---

## Parallel Example: MVP (US1)

```bash
Task: "Identify duplicated sentences in src/components/Hero.tsx"
Task: "Identify duplicated sentences in src/components/sections/ProfileSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1–2
2. Complete US1
3. Validate manually + run `pnpm lint`/`pnpm build`
