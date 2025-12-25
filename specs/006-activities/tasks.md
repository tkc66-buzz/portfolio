---
description: "Tasks for 006 – Activities (Talks / Books / Community)"
---

# Tasks: 006 – Activities (Talks / Books / Community)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/006-activities/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  

**Tests**: No automated tests requested. Verify via `quickstart.md`, plus `pnpm lint` and `pnpm build`.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1/US2)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the integration points for adding a new proof surface + TOC entry.

- [x] T001 Confirm current TOC config and section composition in `src/components/toc.ts` and `src/app/page.tsx`
- [x] T002 Confirm current content source-of-truth patterns and private override merge in `src/content/portfolio.ts`
- [x] T003 [P] Confirm external link safety pattern in existing sections (`src/components/sections/WritingSection.tsx`, `src/components/sections/ContactSection.tsx`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the section + data scaffolding before user story delivery.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Decide final IA as **split** (Writing vs Activities) and document rationale in `specs/006-activities/research.md`
- [x] T005 Add TOC id (`activities`) + label (`Activities`) in `src/components/toc.ts`
- [x] T006 Add new section component file `src/components/sections/ActivitiesSection.tsx` (server component, same frame styling)
- [x] T007 Wire the section into page composition in `src/app/page.tsx` (keep page thin; choose section order)

**Checkpoint**: The app compiles and the `#activities` anchor exists.

---

## Phase 3: User Story 1 - 第三者が「アウトプット/社会的活動」を把握できる (Priority: P1) 🎯 MVP

**Goal**: Reader can find talks/books/community and open links safely.

**Independent Test**: TOC → Activities shows groups (Talks/Books/Community). Any external links open in a new tab with `rel="noreferrer"`.

### Implementation for User Story 1

- [x] T008 [US1] Extend content model and add `portfolio.activities` to `src/content/portfolio.ts` (types + `publicPortfolio` + merge)
- [x] T009 [US1] Render grouped items (Talks/Books/Community) in `src/components/sections/ActivitiesSection.tsx`
- [x] T010 [US1] Implement explicit empty state (“Coming soon”) when a group has zero items in `src/components/sections/ActivitiesSection.tsx`
- [x] T011 [US1] Ensure external links are safe in `src/components/sections/ActivitiesSection.tsx` (`target="_blank"`, `rel="noreferrer"`)

**Checkpoint**: Activities section is scannable in <1 minute and does not leak unsafe links.

---

## Phase 4: User Story 2 - blogとの情報設計が破綻しない (Priority: P2)

**Goal**: Writing vs Activities separation is intuitive and TOC stays within the guideline.

**Independent Test**: TOC has <= 8 items; “Writing = articles” and “Activities = talks/books/community” is clear from headings and copy.

### Implementation for User Story 2

- [x] T012 [US2] Add short explanatory copy to `src/components/sections/WritingSection.tsx` and/or `src/components/sections/ActivitiesSection.tsx` so roles are obvious
- [x] T013 [US2] Verify TOC count and label scan-ability in `src/components/toc.ts` (no overlong labels)

**Checkpoint**: No confusion between Writing and Activities; navigation remains fast.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + docs sync for top-level UX change.

- [x] T014 Update docs to mention the new Activities section in `README.md`, `AGENTS.md`, and `CLAUDE.md`
- [x] T015 Run `specs/006-activities/quickstart.md` verification steps
- [x] T016 Run `pnpm lint` and fix any issues
- [x] T017 Run `pnpm build` and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion (blocks US1/US2)
- **US1 (P1)**: Depends on Foundational
- **US2 (P2)**: Depends on US1 being present (since it’s about IA consistency)
- **Polish**: After US1/US2

### Parallel Opportunities

- T003 can run in parallel (read-only confirmation across files)
- After T005–T007, T008 (data model) and T009–T011 (UI) can be parallelized by file

---

## Parallel Example: User Story 1

```text
Task: "Add activities data model + public data to src/content/portfolio.ts"
Task: "Implement ActivitiesSection UI in src/components/sections/ActivitiesSection.tsx"
```


