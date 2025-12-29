---
description: "Tasks for implementing Speaker Deck URL placement in Activities"
---

# Tasks: Speaker Deck URL

**Input**: Design documents from `specs/036-speakerdeck-url/`  
**Prerequisites**: `specs/036-speakerdeck-url/plan.md` (required), `specs/036-speakerdeck-url/spec.md` (required)  
**Tests**: Not requested (manual verification via `specs/036-speakerdeck-url/quickstart.md`)  

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Confirm current Activities → Talks content structure in `src/content/portfolio.ts`
- [x] T002 Confirm current Activities rendering and external-link behavior in `src/components/sections/ActivitiesSection.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Checkpoint**: Decide the exact “slides hub” entry format (year/title/link label) per `specs/036-speakerdeck-url/plan.md`.

- [x] T003 Choose the final Speaker Deck entry text (year/title/link label) in `specs/036-speakerdeck-url/plan.md` (no code change)

---

## Phase 3: User Story 1 — Visitors can discover talk slides easily (Priority: P1) 🎯 MVP

**Goal**: Visitors can find the Speaker Deck profile from Activities → Talks and open it.

**Independent Test**: Follow `specs/036-speakerdeck-url/quickstart.md` manual checks.

- [x] T004 [US1] Add the Speaker Deck “slides hub” item under `activities.groups[name="Talks"].items` in `src/content/portfolio.ts`
- [x] T005 [US1] Verify the new item renders under Talks and is visually unambiguous in `src/components/sections/ActivitiesSection.tsx` (adjust copy/layout only if needed)

**Checkpoint**: Speaker Deck is reachable from Activities → Talks in ≤ 2 clicks.

---

## Phase 4: User Story 2 — External links are safe and clearly labeled (Priority: P2)

**Goal**: Speaker Deck link is clearly external and opens safely.

**Independent Test**: Confirm it opens as an external destination and the portfolio remains usable.

- [x] T006 [US2] Verify Speaker Deck link uses safe external link behavior in `src/components/sections/ActivitiesSection.tsx` (target/rel policy)
- [x] T007 [US2] Ensure link label includes “Speaker Deck” (unambiguous) in `src/content/portfolio.ts`

---

## Phase 5: Polish & Cross-Cutting Concerns

- [x] T008 Run validation steps in `specs/036-speakerdeck-url/quickstart.md`
- [x] T009 Run `pnpm lint` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [x] T010 Run `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`

---

## Dependencies & Execution Order

- **Phase 1**: No dependencies.
- **Phase 2**: Depends on Phase 1 (confirm where the change belongs).
- **US1 (P1)**: Depends on Phase 2 (finalize the entry text, then add it).
- **US2 (P2)**: Depends on US1 (validate safety + labeling on the real rendered link).
- **Polish**: After US1/US2.

### Parallel Opportunities

- [x] T011 [P] Draft final copy (year/title/link label) for the Speaker Deck entry while reviewing current Talks items in `src/content/portfolio.ts`


