---
description: "Tasks for 020-unify-exp-projects-vivid"
---

# Tasks: Unify Experience + Projects (No Spreadsheet) + Vivid UI

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/020-unify-exp-projects-vivid/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline repo state for the feature branch.

- [X] T001 Confirm baseline builds: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 Create `specs/020-unify-exp-projects-vivid/tasks.md` (this file) and ensure checklist format is respected

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish unified data shape and section ID before any UI work.

- [X] T003 Add `work` types to `src/content/portfolio.ts` (add `WorkSection` + `WorkEntry` + nested `WorkProject` and include in `Portfolio`)
- [X] T004 Add `publicPortfolio.work` data in `src/content/portfolio.ts` (company blocks, each with exactly one `summary` paragraph and nested projects with required fields)

**Checkpoint**: `getPortfolio()` returns a `work` section with items, without runtime errors.

---

## Phase 3: User Story 1 - Unified “Work” section (Priority: P1) 🎯 MVP

**Goal**: Replace split Experience/Projects UI with a single Work section that renders company blocks (1 paragraph each) and nested Projects under each company, reachable from TOC.

**Independent Test**: `pnpm dev` → open home page → TOC contains Work → Work section renders multiple company blocks and their nested Projects with safe wrapping on mobile width.

- [X] T005 [P] [US1] Create `src/components/sections/WorkSection.tsx` to render `portfolio.work` (period + company + one `summary` paragraph + nested Projects list)
- [X] T006 [US1] Update `src/app/page.tsx` to render `<WorkSection />` and stop rendering `<ExperienceSection />` and `<ProjectsSection />`
- [X] T007 [US1] Update `src/components/toc.ts` to replace `experience/projects` with `work` in `TocItemId` and `TOC_ITEMS`
- [X] T008 [US1] Ensure `WorkSection` uses stable anchor `id="work"` and `scroll-mt-[var(--menu-offset)]` like other sections
- [X] T009 [US1] Ensure wrapping/readability: apply `break-words` and (if needed) `whitespace-pre-line` to Work summary and nested project fields in `src/components/sections/WorkSection.tsx`
- [X] T010 [US1] Remove or deprecate unused sections: delete `src/components/sections/ExperienceSection.tsx` and `src/components/sections/ProjectsSection.tsx` (or keep but unused, per lint/build constraints)

**Checkpoint**: Home page shows Work section only (no Experience/Projects), TOC jumps to Work, layout is readable on mobile.

---

## Phase 4: User Story 2 - No spreadsheet operation required (Priority: P2)

**Goal**: Make repo self-contained for content authoring and remove/disable spreadsheet-driven private URL mode to avoid operational confusion.

**Independent Test**: With `.env.local` removed/unset, `pnpm dev` still renders the page with repo content and no private URL fetch is attempted/required.

- [X] T011 [US2] Update `src/content/portfolio.ts` to disable `PORTFOLIO_PRIVATE_SOURCE="url"` behavior (treat as unsupported / ignore URL mode)
- [X] T012 [US2] Update docs to remove spreadsheet ops as a recommended path: edit `specs/002-portfolio-private-content/quickstart.md` to reflect “no spreadsheet operation”
- [X] T013 [US2] Deprecate spreadsheet-specific docs by updating these files to note “運用しない/不要”: `specs/002-portfolio-private-content/spec.md`, `specs/002-portfolio-private-content/quickstart.md`, `specs/015-sheet-anchorid/spec.md`, `specs/015-sheet-anchorid/quickstart.md`
- [X] T014 [US2] Verify `pnpm dev` works with no private env vars set (document in `specs/020-unify-exp-projects-vivid/quickstart.md` if adjustments are needed)

**Checkpoint**: Running locally without private env vars is the default and documented.

---

## Phase 5: User Story 3 - More vivid look while keeping retro usability (Priority: P3)

**Goal**: Increase visual vividness (accents, hierarchy, link styling) while maintaining readability and NES.css vibe.

**Independent Test**: Compare before/after on mobile and desktop: headings/links/accent colors are more distinct; text remains readable with sufficient contrast.

- [X] T015 [P] [US3] Define/adjust palette tokens in `src/app/globals.css` (e.g., add a brighter accent color and ensure contrast)
- [X] T016 [P] [US3] Update section “frame” backgrounds/borders for more vivid separation (touch `src/components/sections/*.tsx` as needed, starting with `WorkSection.tsx`)
- [X] T017 [US3] Update link styles for clearer affordance (e.g., underline + hover color) in `src/app/globals.css` or component classes
- [X] T018 [US3] Update `src/components/Hero.tsx` (and/or TOC) to use more vivid accents without harming readability

**Checkpoint**: Top page feels brighter; no regressions in layout/contrast.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, docs sync, and final quality gates.

- [X] T019 Update `README.md` to reflect the new Work section and removal of Experience/Projects split (top-level UX change)
- [X] T020 Update `AGENTS.md` to reflect section/IA changes and any operational notes (top-level UX change)
- [X] T021 Update `CLAUDE.md` to reflect section/IA changes and any boot guidance changes (top-level UX change)
- [X] T022 Run `pnpm lint` and fix any issues introduced by deleted/unused components
- [X] T023 Run `pnpm build` and fix any issues (ensure deployability)
- [X] T024 Validate `specs/020-unify-exp-projects-vivid/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion
- **User Stories (Phase 3+)**: Depend on Phase 2 completion
- **Polish (Phase 6)**: Depends on desired user stories being completed

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only (Work data shape must exist)
- **US2 (P2)**: Can proceed after US1, but is logically independent once Phase 2 exists
- **US3 (P3)**: Can proceed after US1 (so it has the final section list to style)

### Parallel Opportunities

- US1: `T005` can be done in parallel with TOC/page wiring (`T007`) if coordinated
- US3: `T015` can be done in parallel with component-class updates (`T016`, `T018`)
- Docs sync tasks (`T019–T021`) can be parallelized across files

---

## Parallel Example: User Story 1

```text
Task: T005 [P] [US1] Create src/components/sections/WorkSection.tsx
Task: T007 [US1] Update src/components/toc.ts to add work and remove experience/projects
```

---

## Parallel Example: User Story 3

```text
Task: T015 [P] [US3] Adjust palette tokens in src/app/globals.css
Task: T016 [P] [US3] Update section styles in src/components/sections/*.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 2: Add `work` to the content model and seed `publicPortfolio.work`
2. Phase 3: Add `WorkSection` and switch page + TOC to unified Work
3. Validate in `pnpm dev`

### Incremental Delivery

1. Deliver US1 (unified Work) first
2. Deliver US2 (no spreadsheet operation; disable URL mode; docs)
3. Deliver US3 (vivid UI pass)
4. Finish with docs sync + `pnpm lint/build`


