---
description: "Tasks for 009 – Refine Experience vs Projects (IA + Content)"
---

# Tasks: 009 – Refine Experience vs Projects (IA + Content)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/009-exp-project-brushup/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated tests requested. Verify via `quickstart.md`, plus `pnpm lint` and `pnpm build`.

**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1/US2/US3)
- All tasks include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm current behavior and decide “Option A (no type changes)” as MVP baseline.

- [x] T001 Confirm current Experience/Projects rendering in `src/components/sections/ExperienceSection.tsx` and `src/components/sections/ProjectsSection.tsx`
- [x] T002 Confirm current content SSOT + private override merge behavior in `src/content/portfolio.ts` (ensure changes won’t leak secrets)
- [x] T003 Confirm current TOC anchor ids (`#experience`, `#projects`) in `src/components/toc.ts` and section `id` usage in `src/components/sections/*`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Lock the IA rule and a consistent copy structure before rewriting content.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [x] T004 Write a 1–2 sentence “split rule” copy for Experience/Projects and place it in `src/components/sections/ExperienceSection.tsx` and/or `src/components/sections/ProjectsSection.tsx` (align with `specs/009-exp-project-brushup/research.md`)
- [x] T005 Decide MVP scope as **Option A (no type changes)** and record it in `specs/009-exp-project-brushup/data-model.md` (keep Option B as future)
- [x] T006 Define a per-project copy checklist (Problem→Action→Result/Learning) as comments in `src/content/portfolio.ts` near `projects.items` so future edits stay consistent

**Checkpoint**: A reader can understand “Experience = axis / Projects = evidence” just from headings/copy.

---

## Phase 3: User Story 1 - 読み手が「Experience」と「Projects」の違いを迷わず理解できる (Priority: P1) 🎯 MVP

**Goal**: Experience reads as role/ownership evolution; Projects reads as evidence/case cards.

**Independent Test**: Open `http://localhost:3000` and within 2 minutes explain: “Experience is the axis, Projects is the evidence.”

### Implementation for User Story 1

- [x] T007 [US1] Rewrite `publicPortfolio.experience.highlights` content for “scope/ownership evolution” in `src/content/portfolio.ts` (3–6 entries max)
- [x] T008 [US1] Rewrite `publicPortfolio.projects.items` copy in `src/content/portfolio.ts` so each public item reads as Problem→Action→Result/Learning (keep fields unchanged)
- [x] T009 [P] [US1] Update Experience section layout for scanability (short intro + tight list spacing) in `src/components/sections/ExperienceSection.tsx`
- [x] T010 [P] [US1] Update Projects section card layout to emphasize evidence (explicit labels for Role/Tech/Outcome) in `src/components/sections/ProjectsSection.tsx`

**Checkpoint**: Projects cards are readable in <30 seconds each and don’t repeat Experience timeline.

---

## Phase 4: User Story 2 - Projectsが「証拠」として機能し、かつ秘匿も守れる (Priority: P2)

**Goal**: Public projects feel concrete; private projects clearly state “can discuss in interview” without leaking details.

**Independent Test**: Ensure `visibility: "private"` cards show a consistent redaction message and contain no sensitive data fields.

### Implementation for User Story 2

- [x] T011 [US2] Audit `publicPortfolio.projects.items` for accidental sensitive details and rewrite any risky phrases in `src/content/portfolio.ts`
- [x] T012 [US2] Ensure the private-project redaction message is consistent, explicit, and short in `src/components/sections/ProjectsSection.tsx`
- [x] T013 [US2] Confirm that private items never render `summary/role/tech/outcome/link` (and that public items always render them) in `src/components/sections/ProjectsSection.tsx`

**Checkpoint**: Private projects still feel intentional (not “missing”), and public projects retain credibility.

---

## Phase 5: User Story 3 - ExperienceとProjectsが相互参照でき、重複せず強化し合う (Priority: P3)

**Goal**: Experience implies which Projects are evidence, without duplicating details.

**Independent Test**: From an Experience bullet, a reader can point to at least one Project card as supporting evidence.

### Implementation for User Story 3

- [x] T014 [US3] Add “evidence hint” phrasing to relevant Experience highlights (e.g., “代表例: Goバックエンド刷新”) in `src/content/portfolio.ts`
- [x] T015 [US3] Add a small “Evidence” line under Experience highlights to make the hint visually clear (no new fields) in `src/components/sections/ExperienceSection.tsx`
- [x] T016 [US3] (Optional additive) Add `Project.anchorId?: string` in `src/content/portfolio.ts` and wire per-card anchors in `src/components/sections/ProjectsSection.tsx` so Experience can link directly to a project card (only if it stays lightweight)

**Checkpoint**: Cross-references improve comprehension without increasing page length significantly.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + final readability pass.

- [x] T017 Run `specs/009-exp-project-brushup/quickstart.md` verification steps
- [x] T018 Run `pnpm lint` and fix any issues
- [x] T019 Run `pnpm build` and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion (blocks all user stories)
- **US1 (P1)**: Depends on Foundational
- **US2 (P2)**: Depends on US1 content baseline (Projects copy + layout exist)
- **US3 (P3)**: Depends on US1 (and optionally US2) since it adds cross-reference polish
- **Polish**: After desired stories are complete

### Parallel Opportunities

- T009 and T010 can be parallelized (different files)
