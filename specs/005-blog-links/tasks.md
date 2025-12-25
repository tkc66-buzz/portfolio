---
description: "Tasks for 005 – Writing / Blog Links"
---

# Tasks: 005 – Writing / Blog Links

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/005-blog-links/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated tests requested. Verify via `quickstart.md`, plus `pnpm lint` and `pnpm build`.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the integration points for adding a new section + TOC entry.

- [x] T001 Confirm current TOC config and section composition in `src/components/toc.ts` and `src/app/page.tsx`
- [x] T002 Confirm current content source-of-truth patterns in `src/content/portfolio.ts`
- [x] T003 [P] Confirm link safety pattern (`target="_blank"` + `rel="noreferrer"`) in existing sections (`src/components/sections/ContactSection.tsx`, `src/components/sections/ProjectsSection.tsx`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Ensure a new section can be added without breaking navigation or docs.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Decide and fix the new TOC id (`writing`) and label (`Writing`) in `src/components/toc.ts`
- [x] T005 Add the new section component file `src/components/sections/WritingSection.tsx` (server component, same frame styling)
- [x] T006 Wire the section into page composition in `src/app/page.tsx` (keep page thin; preserve section order)

**Checkpoint**: The app compiles and `#writing` anchor exists (even before content polish).

---

## Phase 3: User Story 1 - 読者がブログへ迷わず到達できる (Priority: P1) 🎯 MVP

**Goal**: Readers can jump to Writing and open Tech/Casual blogs safely.

**Independent Test**: From TOC → Writing, both links open in a new tab with `rel="noreferrer"`.

### Implementation for User Story 1

- [x] T007 [US1] Add `writing` section data (heading + two links) to `src/content/portfolio.ts`
- [x] T008 [US1] Render blog links in `src/components/sections/WritingSection.tsx` (NES buttons + short labels: “Tech (Medium)”, “Casual”)
- [x] T009 [US1] Ensure external links are safe in `src/components/sections/WritingSection.tsx` (`target="_blank"`, `rel="noreferrer"`)
- [x] T010 [US1] Keep TOC count reasonable (<= 8 items) and verify TOC labels remain scannable in `src/components/toc.ts`

**Checkpoint**: Writing section is reachable via TOC and contains the two correct URLs.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Finish with quality gates and doc sync (top-level UX changed).

- [x] T011 Update docs to mention the new Writing section in `README.md`, `AGENTS.md`, and `CLAUDE.md`
- [x] T012 Run `specs/005-blog-links/quickstart.md` verification steps
- [x] T013 Run `pnpm lint` and fix any issues
- [x] T014 Run `pnpm build` and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion (blocks US1)
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish**: After US1 is complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational; no dependencies on other stories (only story in this spec)

### Parallel Opportunities

- T003 can run in parallel (read-only confirmation across files)
- Once T004–T006 are done, T007 (data) and T008–T009 (UI) are separable by file

---

## Parallel Example: User Story 1

```text
Task: "Add writing section data to src/content/portfolio.ts"
Task: "Render WritingSection UI in src/components/sections/WritingSection.tsx"
```
