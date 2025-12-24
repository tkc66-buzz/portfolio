---

description: "Tasks for Portfolio TOC + Section Granularity"
---

# Tasks: Portfolio TOC + Section Granularity

**Input**: Design documents from `specs/001-portfolio-toc/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md  

**Tests**: Tests are OPTIONAL. No automated tests were explicitly requested for this feature.  
**Organization**: Tasks are grouped by user story to enable independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the basic structure and “source of truth” needed to implement TOC cleanly

- [x] T001 Create new sections directory `src/components/sections/` and add placeholder files for planned sections
- [x] T002 [P] Add TOC types + source-of-truth config in `src/components/toc.ts` (ids: profile/experience/projects/skills/contact; labels; order)
- [x] T003 [P] Create TOC UI component in `src/components/TableOfContents.tsx` (renders links from props/config; uses `nav` + `aria-label`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish stable anchors and page composition so user stories can be implemented safely

**⚠️ CRITICAL**: No user story work should begin until these are complete

- [x] T004 Create section wrappers that own `id` + heading semantics in:
  - `src/components/sections/ProfileSection.tsx`
  - `src/components/sections/ExperienceSection.tsx`
  - `src/components/sections/ProjectsSection.tsx`
  - `src/components/sections/SkillsSection.tsx`
  - `src/components/sections/ContactSection.tsx`
- [x] T005 Update `src/app/page.tsx` to render the TOC near the top and compose the new `sections/*` components (keep page.tsx thin)
- [x] T006 Ensure each section has a unique, stable `id` matching the TOC config (profile/experience/projects/skills/contact) in `src/components/sections/*.tsx`
- [x] T007 Add scroll offset handling for anchor navigation by adding Tailwind `scroll-mt-*` classes to each section root in `src/components/sections/*.tsx`
- [x] T008 Remove or stop using ambiguous component names in the page composition:
  - replace `src/components/About.tsx` usage with `src/components/sections/ProfileSection.tsx`
  - keep old files temporarily (or delete later) but ensure the rendered UX uses the new naming

**Checkpoint**: Page builds; TOC renders; all links jump to the right section without broken anchors

---

## Phase 3: User Story 1 - 初見で人物像がつかめる目次と構成 (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor can understand the page structure and reach key sections quickly via TOC

**Independent Test**: Follow `specs/001-portfolio-toc/quickstart.md` Verification checklist items 1–3

### Implementation for User Story 1

- [x] T009 [P] Implement Profile section content scaffold in `src/components/sections/ProfileSection.tsx` (3–5 lines; replace “About” wording with “Profile” intent)
- [x] T010 [P] Implement Experience section scaffold in `src/components/sections/ExperienceSection.tsx` (timeline/highlights placeholder; clear heading)
- [x] T011 [P] Adapt existing Projects UI into `src/components/sections/ProjectsSection.tsx` (wrap or move logic from `src/components/Projects.tsx`)
- [x] T012 [P] Adapt existing Skills UI into `src/components/sections/SkillsSection.tsx` (wrap or move logic from `src/components/Skills.tsx`)
- [x] T013 [P] Adapt existing Contact UI into `src/components/sections/ContactSection.tsx` (wrap or move logic from `src/components/Contact.tsx`)
- [x] T014 Improve TOC usability in `src/components/TableOfContents.tsx`:
  - keyboard focus is visible
  - mobile tap targets are comfortable
  - links are clearly labeled and not overly long

**Checkpoint**: TOC exists near top; all 5 items navigate correctly; headings are unambiguous (no “About” ambiguity)

---

## Phase 4: User Story 2 - 採用/協業視点で実績を探しやすい (Priority: P2)

**Goal**: Projects contain the minimum “proof” information set and are easy to scan

**Independent Test**: From TOC → Projects: each project card shows the required fields (FR-005)

### Implementation for User Story 2

- [x] T015 [P] Define a richer project data shape (title/summary/role/tech/outcomeOrLearning/link) in `src/components/sections/ProjectsSection.tsx` (or a colocated file)
- [x] T016 Update UI to display role + tech + outcome/learning in `src/components/sections/ProjectsSection.tsx`
- [x] T017 Ensure external links are safe and labeled in `src/components/sections/ProjectsSection.tsx` (use `target="_blank"` + `rel="noreferrer"` where applicable)
- [x] T018 Verify FR-005 is satisfied for all placeholder projects (no missing fields) in `src/components/sections/ProjectsSection.tsx`

**Checkpoint**: Recruiter can quickly find role/tech/outcomes for each project; no broken or ambiguous project entries

---

## Phase 5: User Story 3 - 将来の更新がしやすい粒度ルール (Priority: P3)

**Goal**: Adding a new item (experience/project/skill) has a clear single place to edit

**Independent Test**: Add “one new project” by editing a single source file and see it render correctly

### Implementation for User Story 3

- [x] T019 Create a single content source file for portfolio content in `src/content/portfolio.ts` (experience/projects/skills/contact) and export typed data
- [x] T020 Refactor sections to read from `src/content/portfolio.ts`:
  - `src/components/sections/ExperienceSection.tsx`
  - `src/components/sections/ProjectsSection.tsx`
  - `src/components/sections/SkillsSection.tsx`
  - `src/components/sections/ContactSection.tsx`
- [x] T021 [P] Ensure TOC config stays consistent with section IDs by reusing IDs (or constants) from `src/components/toc.ts` in `src/content/portfolio.ts` and section components

**Checkpoint**: Adding a new item is an obvious edit in one place; sections remain aligned with TOC IDs

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Fix small UX issues uncovered during implementation and validate quality gates

- [x] T022 Fix `.frame` CSS definition in `src/app/globals.css` (currently nested inside `body`; move to top-level so frames render consistently)
- [x] T023 Fix email link scheme in `src/components/Contact.tsx` or `src/components/sections/ContactSection.tsx` (use `mailto:`)
- [x] T024 Run quickstart verification steps in `specs/001-portfolio-toc/quickstart.md` and adjust styles/spacing as needed
- [x] T025 Run `pnpm lint` and fix any ESLint issues
- [x] T026 Run `pnpm build` and fix any build issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Deliver in priority order P1 → P2 → P3
- **Polish (Final Phase)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 2 (P2)**: Can start after User Story 1 (P1) - depends on stable section IDs and Projects section presence
- **User Story 3 (P3)**: Can start after User Story 1 (P1) - refactors for maintainability; should not change public IA

### Within Each User Story

- Implement section IDs + headings before styling polish
- Keep `src/app/page.tsx` as composition only; do not bury content logic there

### Parallel Opportunities

- Phase 1 tasks marked [P] can be done in parallel
- In US1, section implementations (Profile/Experience/Projects/Skills/Contact) can be parallelized after T004/T006 are set

---

## Parallel Example: User Story 1

```bash
Task: "Implement Profile section scaffold in src/components/sections/ProfileSection.tsx"
Task: "Implement Experience section scaffold in src/components/sections/ExperienceSection.tsx"
Task: "Adapt Projects UI into src/components/sections/ProjectsSection.tsx"
Task: "Adapt Skills UI into src/components/sections/SkillsSection.tsx"
Task: "Adapt Contact UI into src/components/sections/ContactSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (MVP)
4. Validate using `specs/001-portfolio-toc/quickstart.md`

### Incremental Delivery

1. Deliver P1: TOC + stable section IDs + unambiguous headings
2. Deliver P2: Projects “proof” fields
3. Deliver P3: single-source content file for maintainability
