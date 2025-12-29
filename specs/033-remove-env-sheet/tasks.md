---
description: "Tasks for implementing removal of env/spreadsheet private content workflow"
---

# Tasks: Remove Env/Spreadsheet Private Content

**Input**: Design documents from `specs/033-remove-env-sheet/`  
**Prerequisites**: `specs/033-remove-env-sheet/plan.md` (required), `specs/033-remove-env-sheet/spec.md` (required)  
**Tests**: Not requested (manual verification via `specs/033-remove-env-sheet/quickstart.md`)  

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Capture current references (baseline) by searching for identifiers in repo (PORTFOLIO_PRIVATE_SOURCE / PORTFOLIO_PRIVATE_JSON / spreadsheet / Apps Script)
- [ ] T002 Confirm current content loader uses env vars in `src/content/portfolio.ts` (private override code path)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Checkpoint**: Clear list of files/dirs to edit/remove is known before making changes.

- [ ] T003 Enumerate doc references to private overrides in `README.md`, `AGENTS.md`, `CLAUDE.md` (prepare for Docs synced update)
- [ ] T004 Enumerate legacy spec/tooling directories to remove (start from `specs/002-portfolio-private-content/` and any spreadsheet/App Script artifacts)

---

## Phase 3: User Story 1 — Portfolio renders from committed content only (Priority: P1) 🎯 MVP

**Goal**: Portfolio content rendering no longer depends on env vars or spreadsheets.

**Independent Test**: Run `pnpm dev` with no special env configuration and confirm the site renders normally (per `specs/033-remove-env-sheet/quickstart.md`).

- [ ] T005 [US1] Remove env-var “private override” support from `src/content/portfolio.ts` while keeping `getPortfolio(): Promise<Portfolio>` stable
- [ ] T006 [US1] Remove `PORTFOLIO_PRIVATE_SOURCE` / `PORTFOLIO_PRIVATE_JSON` related warnings/comments from `src/content/portfolio.ts`
- [ ] T007 [US1] Verify no behavior change when old env vars are set (they should be ignored because code path is removed)

**Checkpoint**: Site renders from committed content only.

---

## Phase 4: User Story 2 — Remove dead code and stale docs (Priority: P2)

**Goal**: No remaining references to env-var/spreadsheet private content workflows in code/docs.

**Independent Test**: Repo search for removed identifiers returns no hits; docs no longer mention the workflow.

- [ ] T008 [US2] Remove private override guidance from `README.md` (no env-var private content mention)
- [ ] T009 [US2] Remove private override + spreadsheet notes from `AGENTS.md` (remove `PORTFOLIO_PRIVATE_*` bullets and spreadsheet deprecation note)
- [ ] T010 [US2] Remove private override notes from `CLAUDE.md` (remove env-var private content section)
- [ ] T011 [US2] Remove any remaining code references to `PORTFOLIO_PRIVATE_SOURCE` / `PORTFOLIO_PRIVATE_JSON` outside `src/content/portfolio.ts` (if any are found)

---

## Phase 5: User Story 3 — Keep the repo deployable and safe (Priority: P3)

**Goal**: Remove spreadsheet/App Script artifacts and keep the repo buildable.

**Independent Test**: `pnpm lint` / `pnpm build` pass; spreadsheet/App Script artifacts are removed.

- [ ] T012 [US3] Delete spreadsheet/App Script artifacts used for the removed workflow (at minimum `specs/002-portfolio-private-content/apps-script/Code.gs`; prefer deleting the whole `specs/002-portfolio-private-content/` directory if it’s now obsolete)
- [ ] T013 [US3] Delete other spreadsheet-specific legacy spec directories if they exist solely for the removed workflow (e.g. `specs/015-sheet-anchorid/`)

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T014 Run verification steps in `specs/033-remove-env-sheet/quickstart.md` (dev run + repo search)
- [ ] T015 Run `pnpm lint` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [ ] T016 Run `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [ ] T017 Ensure Docs synced: re-scan `README.md`, `AGENTS.md`, `CLAUDE.md` for removed identifiers and consistency

---

## Dependencies & Execution Order

- **Phase 1**: No dependencies (baseline).
- **Phase 2**: Depends on Phase 1 (enumeration).
- **US1 (P1)**: Depends on Phase 2 (safe refactor of content loader).
- **US2 (P2)**: Can proceed after US1 (docs must match new reality).
- **US3 (P3)**: Can proceed after US2 (artifact deletion + deploy safety).
- **Polish**: After all desired user stories.

### Parallel Opportunities

- [ ] T018 [P] (Optional) Repo-wide search + docs scan can be done in parallel with code refactor once target list is known

