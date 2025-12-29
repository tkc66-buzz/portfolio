---

description: "Actionable task list for Work content writing"
---

# Tasks: Work Content Writing

**Input**: Design documents from `/specs/031-work-content-writing/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`  
**Tests**: Not requested (manual verification per `specs/031-work-content-writing/quickstart.md`)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Locate current Work content and establish editing rules (public-safe + no metrics).

- [X] T001 Confirm current WorkEntry + Project copy locations in `src/content/portfolio.ts`
- [X] T002 [P] Inventory current WorkEntry summaries for one-paragraph constraint in `src/content/portfolio.ts`
- [X] T003 [P] Inventory current Project summaries/outcomes for concreteness + no-metrics policy in `src/content/portfolio.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Set consistent copy rules so later edits are predictable and safe.

- [X] T004 Define anonymized label conventions (e.g., “Company A”, “Side Work”) in `src/content/portfolio.ts`
- [X] T005 Define “no numerical metrics” guardrail examples (what to avoid) in `specs/031-work-content-writing/contracts/README.md`

**Checkpoint**: Editing policy is clear: anonymized labels, no metrics, no confidential identifiers.

---

## Phase 3: User Story 1 - Understand proof through Work (Priority: P1) 🎯 MVP

**Goal**: Make Work read as clear proof: context, role, and outcome/learning for each entry and project.

**Independent Test**: Read Work section only; each company entry and project detail answers “what/why/so what” (`specs/031-work-content-writing/quickstart.md` steps 1–2).

### Implementation

- [X] T006 [US1] Rewrite each WorkEntry `summary` into exactly one paragraph (role/context + outcome/learning) in `src/content/portfolio.ts`
- [X] T007 [US1] Rewrite each Project `summary` to be concrete and one-line in `src/content/portfolio.ts`
- [X] T008 [US1] Rewrite each Project `outcomeOrLearning` to be concrete and qualitative (no metrics) in `src/content/portfolio.ts`

**Checkpoint**: Work section is understandable without external context, and no entry is missing required content.

---

## Phase 4: User Story 2 - Stay public-safe while being specific (Priority: P2)

**Goal**: Keep content convincing while removing sensitive identifiers and real names.

**Independent Test**: Manual privacy scan passes (`specs/031-work-content-writing/quickstart.md` step 3).

### Implementation

- [X] T009 [US2] Replace real company/product names with anonymized labels in `src/content/portfolio.ts`
- [X] T010 [US2] Remove/replace any internal identifiers, private URLs, or customer names in `src/content/portfolio.ts`
- [X] T011 [US2] Remove/replace any numerical impact metrics (including approximate/rounded) in `src/content/portfolio.ts`

---

## Phase 5: User Story 3 - Maintainable editing workflow (Priority: P3)

**Goal**: Ensure the copy structure stays consistent and easy to evolve.

**Independent Test**: Make a small change and verify layout remains readable and required fields are present.

### Implementation

- [X] T012 [US3] Add short editing guidance (what goes in WorkEntry vs Project fields) in `specs/031-work-content-writing/contracts/README.md`
- [X] T013 [US3] Ensure Work entries remain structured and readable after edits (no missing fields) in `src/content/portfolio.ts`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the content and run quality gates.

- [X] T014 Run manual verification checklist in `specs/031-work-content-writing/quickstart.md`
- [X] T015 Run `pnpm lint` and fix any issues in `src/content/portfolio.ts`
- [X] T016 Run `pnpm build` and fix any issues in `src/content/portfolio.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (MVP)** → **US2** → **US3** → **Polish**

### User Story Dependencies

- **US1**: Establishes clear proof copy; required before polishing privacy wording.
- **US2**: Applies strict public-safe policy; should be validated after US1 copy is concrete.
- **US3**: Documentation + structural guardrails for future edits.

### Parallel Opportunities

- T002 and T003 can run in parallel (same file but read-only inventory work).

---

## Parallel Example: MVP (US1)

```bash
Task: "Inventory WorkEntry summaries for one-paragraph constraint in src/content/portfolio.ts"
Task: "Inventory Project summaries/outcomes for concreteness + no-metrics policy in src/content/portfolio.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1–2 (setup + conventions)
2. US1 (proof copy)
3. Validate manually + run `pnpm lint`/`pnpm build`


