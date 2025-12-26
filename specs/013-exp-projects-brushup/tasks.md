# Tasks: Experience & Projects Content Brush-up

**Input**: Design documents from `specs/013-exp-projects-brushup/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Not requested in the feature spec. Validation will rely on `pnpm lint`, `pnpm build`, and the manual verification steps in `specs/013-exp-projects-brushup/quickstart.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm current behavior and locate the exact change points.

- [x] T001 Confirm current Experience year badge styling and Evidence parsing in `src/components/sections/ExperienceSection.tsx`
- [x] T002 [P] Confirm Projects anchors exist (`id={project.anchorId}`) in `src/components/sections/ProjectsSection.tsx`
- [x] T003 [P] Confirm an existing whitespace-preserving pattern (`whitespace-pre-line`) in `src/components/sections/ContactSection.tsx` to reuse for Experience rendering

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce small, reusable helpers for Evidence parsing + normalization (no new deps).

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add a whitespace normalization helper for Evidence/title matching in `src/components/sections/ExperienceSection.tsx`
- [x] T005 Add Evidence resolution rules (match by normalized title; optional `#anchorId` support) in `src/components/sections/ExperienceSection.tsx`
- [x] T006 Ensure unresolved Evidence renders as plain text (non-clickable) in `src/components/sections/ExperienceSection.tsx`

**Checkpoint**: Evidence parsing/matching rules are in place and ready to be used by the UI

---

## Phase 3: User Story 1 — Experience timeline is readable and matches spreadsheet formatting (Priority: P1) 🎯 MVP

**Goal**: Year label is readable; Experience text preserves spreadsheet line breaks.

**Independent Test**: Follow `specs/013-exp-projects-brushup/quickstart.md` steps for year legibility + line-break preservation.

### Implementation for User Story 1

- [x] T007 [US1] Increase Experience year badge font size (keep NES badge style) in `src/components/sections/ExperienceSection.tsx`
- [x] T008 [US1] Render Experience main text with preserved line breaks (e.g., `whitespace-pre-line`) in `src/components/sections/ExperienceSection.tsx`
- [x] T009 [US1] Validate US1 using `specs/013-exp-projects-brushup/quickstart.md` (line breaks + year legibility)

**Checkpoint**: Experience renders multi-line text correctly and year is legible on mobile/desktop

---

## Phase 4: User Story 2 — Evidence links from Experience reliably jump to the correct Project (Priority: P2)

**Goal**: Evidence references consistently link to the correct Project entry, even with whitespace/newline differences.

**Independent Test**: In local dev, click an Evidence link and confirm it scrolls to the correct Project card; verify mismatch renders plain text.

### Implementation for User Story 2

- [x] T010 [US2] Use normalized matching to map Evidence text to `Project.anchorId` in `src/components/sections/ExperienceSection.tsx`
- [x] T011 [US2] (Optional) Support Evidence in `#anchorId` form as a direct link to a Project anchor in `src/components/sections/ExperienceSection.tsx`
- [x] T012 [US2] Validate US2 using `specs/013-exp-projects-brushup/quickstart.md` (match + mismatch cases)

**Checkpoint**: Evidence links resolve reliably; unresolved Evidence is not clickable

---

## Phase 5: User Story 3 — Experience & Projects content can be enriched without breaking layout (Priority: P3)

**Goal**: Longer content remains readable and doesn’t break layout.

**Independent Test**: Enrich a few Experience/Project entries (longer text) and confirm layout remains readable on mobile and desktop.

### Implementation for User Story 3

- [x] T013 [US3] Review Experience/Projects long-text rendering and adjust typography/wrapping as needed (no layout break) in `src/components/sections/ExperienceSection.tsx` and `src/components/sections/ProjectsSection.tsx`
- [x] T014 [US3] Validate US3 using `specs/013-exp-projects-brushup/quickstart.md` (longer entries)

**Checkpoint**: Content can be enriched without degrading readability or breaking layout

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ensure quality gates pass and docs remain accurate.

- [x] T015 Run `pnpm lint` and fix any issues in `src/components/sections/ExperienceSection.tsx` / `src/components/sections/ProjectsSection.tsx`
- [x] T016 Run `pnpm build` and fix any issues caused by the changes
- [x] T017 Ensure `specs/013-exp-projects-brushup/contracts/README.md` matches implemented Evidence behavior (title normalization and optional `#anchorId`)
- [x] T018 Run through `specs/013-exp-projects-brushup/quickstart.md` end-to-end and confirm it matches observed behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completing the desired user stories (at minimum US1)

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (helpers), no dependency on other stories
- **US2 (P2)**: Depends on Phase 2 (helpers), builds on Evidence behavior and validation
- **US3 (P3)**: Can start after US1/US2 changes land, focuses on content growth + layout stability

### Parallel Opportunities

- All Setup tasks marked **[P]** can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1
4. Validate using `specs/013-exp-projects-brushup/quickstart.md`

### Incremental Delivery

1. Add US1 → validate readability + line breaks
2. Add US2 → validate Evidence linking + mismatch handling
3. Add US3 → validate content enrichment without layout break

