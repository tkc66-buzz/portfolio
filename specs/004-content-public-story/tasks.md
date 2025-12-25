---
description: "Tasks for Phase 2 Content – Public Storytelling (Experience/Projects/Contact)"
---

# Tasks: Phase 2 Content – Public Storytelling (Experience/Projects/Contact)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/004-content-public-story/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  

**Tests**: No automated tests requested. Use manual verification in `quickstart.md`, plus `pnpm lint` and `pnpm build`.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1/US2/US3)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align on where content lives and what “done” means for public storytelling.

- [ ] T001 Confirm current content sources and render flow in `src/app/page.tsx` + `src/content/portfolio.ts`
- [ ] T002 Confirm privacy constraints and redaction behavior for `visibility="private"` in `src/components/sections/ProjectsSection.tsx`
- [ ] T003 [P] Create a “public-proof writing checklist” in `specs/004-content-public-story/research.md` (NDA-safe phrasing patterns)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the baseline so content edits don’t break privacy or coherence.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [ ] T004 Ensure public-only mode is coherent (no placeholder-ish copy) by reviewing `publicPortfolio` in `src/content/portfolio.ts`
- [ ] T005 Ensure private override fallback remains safe by validating merge/validation behavior in `src/content/portfolio.ts` (public-only must not crash)
- [ ] T006 Capture “definition of done” checks inside `specs/004-content-public-story/quickstart.md` (public-only, private override, private redaction)

**Checkpoint**: Public-only renders cleanly, and private override paths remain optional and safe.

---

## Phase 3: User Story 1 - 初見で「何ができる人か」が2分で伝わる (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor can scan Experience + Projects and understand strengths with evidence.

**Independent Test**: A third party can read `Profile → Experience → Projects → Skills` and summarize “strengths + proof” in <2 minutes.

### Implementation for User Story 1

- [ ] T007 [US1] Rewrite public Experience highlights for evidence + clarity in `src/content/portfolio.ts` (`publicPortfolio.experience.highlights`)
- [ ] T008 [US1] Rewrite public Projects data to match proof set in `src/content/portfolio.ts` (`publicPortfolio.projects.items`)
- [ ] T009 [P] [US1] Improve Projects scan-ability layout (role/tech/outcome hierarchy) in `src/components/sections/ProjectsSection.tsx`
- [ ] T010 [P] [US1] Improve Experience readability (timeline density / spacing) in `src/components/sections/ExperienceSection.tsx`
- [ ] T011 [US1] Confirm headings are unambiguous and consistent in `src/components/sections/ExperienceSection.tsx` and `src/components/sections/ProjectsSection.tsx`

**Checkpoint**: Projects cards “prove” role/tech/outcome; Experience includes timeframe-feel/responsibility/outcome (NDA-safe).

---

## Phase 4: User Story 2 - 守秘しながらも価値が伝わる (Priority: P2)

**Goal**: Private projects don’t leak, but the Projects section still feels strong even with private items mixed in.

**Independent Test**: With at least one `visibility="private"` project in private overrides, the Projects section remains compelling and does not reveal sensitive fields.

### Implementation for User Story 2

- [ ] T012 [US2] Define a consistent “private card minimal proof” copy strategy in `src/components/sections/ProjectsSection.tsx` (what to show vs hide)
- [ ] T013 [US2] Update Projects rendering for `visibility="private"` to avoid “empty card” feel while still redacting (title + safe meta only) in `src/components/sections/ProjectsSection.tsx`
- [ ] T014 [US2] Review public Projects copy to avoid leaking identifiers (names/URLs/internal terms) in `src/content/portfolio.ts`
- [ ] T015 [US2] Validate fallback behavior: if private override fails, public-only narrative still stands in `src/content/portfolio.ts`

**Checkpoint**: Private cards are safe by construction; public-only remains coherent; overall Projects section still reads “strong”.

---

## Phase 5: User Story 3 - 連絡導線が明確で行動に繋がる (Priority: P3)

**Goal**: The reader knows what to contact you about and which channel to use, with minimal friction.

**Independent Test**: Reader can pick a contact method and draft a message without guessing what’s appropriate.

### Implementation for User Story 3

- [ ] T016 [US3] Rewrite Contact CTA blurb (3–5 “good inbound” examples + response expectation) in `src/content/portfolio.ts` (`publicPortfolio.contact.blurb`)
- [ ] T017 [US3] Ensure Contact links are safe + correct (mailto / target/rel) in `src/components/sections/ContactSection.tsx`
- [ ] T018 [US3] Confirm Contact copy matches desired inbound (job / side work / consulting / tech talk) in `src/content/portfolio.ts`

**Checkpoint**: Contact section is specific, actionable, and low-friction.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks and small UX polish without adding dependencies.

- [ ] T019 Run `specs/004-content-public-story/quickstart.md` verification steps (public-only, private override, private redaction)
- [ ] T020 Run `pnpm lint` and fix any issues
- [ ] T021 Run `pnpm build` and fix any issues
- [ ] T022 [P] Mobile scan pass: spacing/typography readability in `src/components/sections/ExperienceSection.tsx`, `src/components/sections/ProjectsSection.tsx`, `src/components/sections/ContactSection.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion (blocks all user stories)
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - MVP is **US1** first, then **US2**, then **US3**
- **Polish**: After desired user stories complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational; establishes the narrative baseline
- **US2 (P2)**: Can start after Foundational; builds on Projects privacy/readability
- **US3 (P3)**: Can start after Foundational; mostly independent (Contact-only)

### Parallel Opportunities

- `ProjectsSection.tsx` and `ExperienceSection.tsx` changes can be parallelized after T004–T006
- Content edits in `src/content/portfolio.ts` can be parallelized with UI layout tweaks (different files)

---

## Parallel Example: User Story 1

```text
Task: "Rewrite Experience highlights in src/content/portfolio.ts"
Task: "Rewrite Projects data in src/content/portfolio.ts"
Task: "Improve Projects scan-ability layout in src/components/sections/ProjectsSection.tsx"
Task: "Improve Experience readability in src/components/sections/ExperienceSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1 (MVP)
4. Validate using `specs/004-content-public-story/quickstart.md` + quick third-party read-through

### Incremental Delivery

1. Deliver US1 (strong scan narrative)
2. Deliver US2 (privacy-safe but still compelling)
3. Deliver US3 (CTA conversion)
4. Finish with Polish tasks


