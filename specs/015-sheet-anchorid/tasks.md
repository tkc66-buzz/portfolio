# Tasks: Spreadsheet-managed Project Anchor IDs

**Input**: Design documents from `specs/015-sheet-anchorid/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Not requested in the feature spec. Validation will rely on `pnpm lint`, `pnpm build`, and manual verification using `specs/015-sheet-anchorid/quickstart.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm current schema/export and identify code touch points.

- [x] T001 Confirm current Apps Script projects schema (no anchorId) in `specs/002-portfolio-private-content/apps-script/Code.gs`
- [x] T002 [P] Confirm `Project.anchorId?: string` exists in the content model in `src/content/portfolio.ts`
- [x] T003 [P] Confirm Projects render `id={project.anchorId}` in `src/components/sections/ProjectsSection.tsx`
- [x] T004 [P] Confirm Experience Evidence supports `#anchorId` in `src/components/sections/ExperienceSection.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement the data plumbing (spreadsheet → JSON patch) safely and backwards-compatibly.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Add `anchorId` to the Apps Script `projects` headers comment in `specs/002-portfolio-private-content/apps-script/Code.gs`
- [x] T006 Extend `normalizeProjects_` to read and emit optional `anchorId` in `specs/002-portfolio-private-content/apps-script/Code.gs`
- [x] T007 Ensure `anchorId` is omitted when blank and trimmed when present in `specs/002-portfolio-private-content/apps-script/Code.gs`
- [x] T008 Document `anchorId` spreadsheet rules (uniqueness + safe characters + stability) in `specs/002-portfolio-private-content/quickstart.md`

**Checkpoint**: Spreadsheet can author anchorIds and Apps Script exports them as `projects.items[].anchorId`

---

## Phase 3: User Story 1 — Maintain stable Experience→Projects links via anchorId (Priority: P1) 🎯 MVP

**Goal**: Evidence uses `#anchorId` and keeps working even if titles change.

**Independent Test**: Follow `specs/015-sheet-anchorid/quickstart.md` to add one `anchorId` and one Evidence link and confirm it jumps to the correct Project.

### Implementation for User Story 1

- [x] T009 [US1] Update the spreadsheet template instructions to include `anchorId` column in `specs/002-portfolio-private-content/quickstart.md`
- [x] T010 [US1] Validate with manual flow: set a Project anchorId, set Experience Evidence to `#anchorId`, reload, click Evidence (per `specs/015-sheet-anchorid/quickstart.md`)

**Checkpoint**: Evidence links are stable under title edits

---

## Phase 4: User Story 2 — Authoring workflow is clear and safe (Priority: P2)

**Goal**: Owner can add new projects + evidence quickly with guardrails.

**Independent Test**: Using the docs only, add a new project + evidence link and validate in under 5 minutes.

### Implementation for User Story 2

- [x] T011 [US2] Add a short “How to choose anchorId” section and examples in `specs/002-portfolio-private-content/quickstart.md`
- [x] T012 [US2] Add troubleshooting notes for duplicate/invalid anchorId and redeploy reminders in `specs/002-portfolio-private-content/quickstart.md`

**Checkpoint**: Docs make the authoring workflow unambiguous and safe

---

## Phase 5: User Story 3 — Backwards compatibility for existing Evidence (Priority: P3)

**Goal**: Old title-based Evidence remains best-effort; new `#anchorId` is preferred.

**Independent Test**: Confirm title-based Evidence still links when present; confirm `#anchorId` works even if titles differ.

### Implementation for User Story 3

- [x] T013 [US3] Document the two supported Evidence formats (preferred `#anchorId`, legacy title) in `specs/002-portfolio-private-content/quickstart.md`
- [x] T014 [US3] Validate both formats using the manual steps in `specs/015-sheet-anchorid/quickstart.md`

**Checkpoint**: Migration can be gradual without breaking existing content

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ensure quality gates and doc/contract consistency.

- [x] T015 Run `pnpm lint` and fix any issues (should be no code changes beyond docs unless needed)
- [x] T016 Run `pnpm build` and fix any issues
- [x] T017 Ensure `specs/015-sheet-anchorid/contracts/README.md` matches the updated `Code.gs` + authoring docs
- [x] T018 Ensure `specs/015-sheet-anchorid/quickstart.md` matches the updated `specs/002-portfolio-private-content/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completing the desired user stories (at minimum US1)

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (Apps Script export + docs baseline)
- **US2 (P2)**: Builds on US1 by strengthening docs and troubleshooting
- **US3 (P3)**: Documents/validates backward compatibility rules

### Parallel Opportunities

- Phase 1 tasks marked **[P]** can run in parallel
