---
description: "Tasks for 019 – Remove Experience & Projects (Safety)"
---

# Tasks: 019 – Remove Experience & Projects (Safety)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/019-remove-exp-projects/`  
**Prerequisites**: `plan.md`, `spec.md`  
**Tests**: Not requested (use `pnpm lint` + `pnpm build` as quality gates)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Confirm baseline is green before edits (`pnpm lint`, `pnpm build`)

---

## Phase 2: Foundational (Blocking Prerequisites)

> No separate foundational work required (no new deps, no new routes).

---

## Phase 3: User Story 1 - Experience/Projects are not displayed (Priority: P1) 🎯 MVP

**Goal**: Remove Experience/Projects from the landing page and Menu.

**Independent Test**: Open `/` and verify Experience/Projects are not present in the UI nor in the Menu.

- [ ] T002 [US1] Remove `ExperienceSection` and `ProjectsSection` from `src/app/page.tsx`
- [ ] T003 [US1] Remove Experience/Projects entries from `TOC_ITEMS` in `src/components/toc.ts` (keep types as-is to avoid a large refactor)

**Checkpoint**: UI no longer surfaces Experience/Projects.

---

## Phase 4: User Story 2 - Default content is scrubbed (Priority: P2)

**Goal**: Remove detailed default Experience/Projects copy from the repository.

**Independent Test**: Inspect `src/content/portfolio.ts` and confirm `publicPortfolio.experience.highlights=[]` and `publicPortfolio.projects.items=[]`.

- [ ] T004 [US2] Replace `publicPortfolio.experience.highlights` with an empty list in `src/content/portfolio.ts`
- [ ] T005 [US2] Replace `publicPortfolio.projects.items` with an empty list in `src/content/portfolio.ts`

**Checkpoint**: Default detailed text is removed from the repo.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T006 Update docs for top-level UX change (`README.md`, `AGENTS.md`, `CLAUDE.md`)
- [ ] T007 Run quality gates (`pnpm lint`, `pnpm build`)
- [ ] T008 Sanity-check repository search to confirm removed copy is gone (manual: search for known phrases)


