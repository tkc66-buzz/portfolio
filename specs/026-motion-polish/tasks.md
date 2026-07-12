---
description: "Tasks for 026-motion-polish"
---

# Tasks: Motion polish (site-wide)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/026-motion-polish/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/README.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline health + inventory current interactive elements and motion.

- [x] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [x] T002 [P] Inventory all interactive surfaces that should “feel alive” (Menu / buttons / links) in `src/components/TableOfContents.tsx`, `src/components/sections/*Section.tsx`
- [x] T003 [P] Inventory existing motion CSS utilities and reduced-motion handling in `src/app/globals.css` (e.g., `blink-soft`, `pixel-float`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish reusable motion tokens + add the minimal client-side hook point for scroll feedback.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Add shared “motion token” CSS classes for interactive feedback (hover/active/focus) in `src/app/globals.css` (retro-aligned, “派手”寄り)
- [x] T005 Add shared “HUD progress” CSS primitives (progress bar container/fill) in `src/app/globals.css`
- [x] T006 Create client component skeleton for scroll feedback in `src/components/ScrollHud.tsx` (no behavior yet)
- [x] T007 Wire `ScrollHud` into the HUD (inside `src/components/TableOfContents.tsx`) (render-only, no behavior yet)

**Checkpoint**: Motion tokens exist + `ScrollHud` renders without breaking the page.

---

## Phase 3: User Story 1 - Interactions feel “alive” (Priority: P1) 🎯 MVP

**Goal**: Major interactive elements always give a visible “input accepted” reaction.

**Independent Test**: Top page → operate Menu / Work / Activities / Contact links and confirm a consistent visual reaction exists for click/tap + keyboard focus.

- [x] T008 [US1] Apply the shared interactive motion class to Menu buttons in `src/components/TableOfContents.tsx`
- [x] T009 [US1] Apply the shared interactive motion class to Work section links/buttons in `src/components/sections/WorkSection.tsx`
- [x] T010 [US1] Apply the shared interactive motion class to Writing links/buttons in `src/components/sections/WritingSection.tsx`
- [x] T011 [US1] Apply the shared interactive motion class to Activities link buttons in `src/components/sections/ActivitiesSection.tsx`
- [x] T012 [US1] Apply the shared interactive motion class to Contact link buttons in `src/components/sections/ContactSection.tsx`
- [x] T013 [US1] Validate keyboard focus visibility remains strong and consistent across the above (adjust per-component classes if needed)

**Checkpoint**: US1 can be demoed independently (interaction feel upgrade delivered).

---

## Phase 4: User Story 2 - Scrolling has feedback (Priority: P2)

**Goal**: Provide BOTH a progress indicator and current-section highlight while scrolling.

**Independent Test**: Scroll top→bottom; progress bar moves continuously and the “active” section indicator changes at the right time.

- [x] T014 [US2] Implement `ScrollHudState` derivation (progressRatio + activeSectionId) inside `src/components/ScrollHud.tsx` using section positions (no external data)
- [x] T015 [US2] Render a HUD-like progress bar in `src/components/ScrollHud.tsx` using the shared CSS primitives
- [x] T016 [US2] Add stable DOM hooks for TOC items (e.g., `data-toc-id`) in `src/components/TableOfContents.tsx` so active styling can be applied reliably
- [x] T017 [US2] Implement “current section highlight” by applying/removing an active style on the TOC item for `activeSectionId` (via `ScrollHud` + DOM hooks)
- [x] T018 [US2] Validate the active section IDs match real section IDs on the page (Profile/Work/Writing/Activities/Skills/Contact) and fix any mismatch in `src/components/toc.ts` or section ids (if discovered)

**Checkpoint**: US2 works end-to-end with both feedback channels enabled.

---

## Phase 5: User Story 3 - Motion is comfortable (Priority: P3)

**Goal**: Keep the motion “派手” but not uncomfortable; avoid hurting readability or performance.

**Independent Test**: You can read the page comfortably; motion does not dominate content; scroll tracking does not feel janky.

- [x] T019 [US3] Ensure motion effects respect reduced-motion preferences (extend rules in `src/app/globals.css` if needed)
- [x] T020 [US3] Audit animation scope: keep “派手” focused on input + HUD (avoid constant motion on body text) and adjust in `src/app/globals.css` / affected components
- [x] T021 [US3] Mobile sanity pass: confirm HUD doesn’t overflow and buttons remain usable; adjust layout classes in `src/components/TableOfContents.tsx` / `src/components/ScrollHud.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + quickstart validation.

- [x] T022 Run `pnpm lint` and fix any issues
- [x] T023 Run `pnpm build` and fix any issues
- [x] T024 Validate `specs/026-motion-polish/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

- Setup (T001–T003) → Foundational (T004–T007) → US1 (T008–T013) → US2 (T014–T018) → US3 (T019–T021) → Polish (T022–T024)

## Parallel Opportunities

- [P] tasks in Setup can run in parallel (inventory work).
- Within US1, link/button updates can be parallelized across different files (but apply sequentially if you want a single coherent style pass).
