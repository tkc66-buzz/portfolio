---
description: "Tasks for implementing Skills brushup (content-first)"
---

# Tasks: Skills Brushup

**Input**: Design documents from `specs/034-skills-brushup/`  
**Prerequisites**: `specs/034-skills-brushup/plan.md` (required), `specs/034-skills-brushup/spec.md` (required)  
**Tests**: Not requested (manual verification via `specs/034-skills-brushup/quickstart.md`)  

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Identify current Skills categories/items and duplicate labels in `src/content/portfolio.ts`
- [ ] T002 Confirm current Skills render path in `src/components/sections/SkillsSection.tsx` (categories → progress bars)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Checkpoint**: Editing strategy for Skills content is clear (ordering, naming conventions, duplication rules).

- [ ] T003 Decide top-3 “strengths” ordering to reflect in `src/content/portfolio.ts` (category order + within-category order)
- [ ] T004 Define a dedupe policy for repeated labels across categories (prefer single category; if repeated, make it intentional and non-confusing) in `src/content/portfolio.ts`

---

## Phase 3: User Story 1 — Strengths are obvious at a glance (Priority: P1) 🎯 MVP

**Goal**: Visitors can identify top strengths quickly from the Skills section.

**Independent Test**: Follow `specs/034-skills-brushup/quickstart.md` → “P1 — Strengths at a glance”.

- [ ] T005 [US1] Re-order categories and items in `src/content/portfolio.ts` so strongest skills appear first
- [ ] T006 [US1] Refine skill labels for clarity and consistency (avoid overly broad labels like “RDB / NoSQL” if it hides specifics) in `src/content/portfolio.ts`
- [ ] T007 [US1] Remove or restructure confusing duplicates across categories (e.g., TypeScript) in `src/content/portfolio.ts`

**Checkpoint**: Top strengths are obvious in a quick scan.

---

## Phase 4: User Story 2 — Skills stay maintainable and consistent (Priority: P2)

**Goal**: Skills remain easy to update without drift or duplication.

**Independent Test**: Make a small edit to Skills content and confirm the render remains consistent (manual).

- [ ] T008 [US2] Ensure each displayed skill has a consistent experience signal (`years` always present; usage range consistent when shown) in `src/content/portfolio.ts`
- [ ] T009 [US2] Ensure `skills.items` (flattened list) remains coherent after category edits (no duplicates / unexpected omissions) in `src/content/portfolio.ts`

---

## Phase 5: User Story 3 — Readable and accessible presentation (Priority: P3)

**Goal**: Skills presentation is readable on mobile and the “years/range” signals remain understandable.

**Independent Test**: Follow `specs/034-skills-brushup/quickstart.md` → “Readability”.

- [ ] T010 [US3] Validate the Skills section remains scannable (no “wall of bars”); tighten content if needed in `src/content/portfolio.ts`
- [ ] T011 [US3] (If needed) Minor copy tweak in `src/components/sections/SkillsSection.tsx` to clarify what “years” represents, without changing the UI structure

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T012 Run validation steps in `specs/034-skills-brushup/quickstart.md`
- [ ] T013 Run `pnpm lint` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`
- [ ] T014 Run `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio`

---

## Dependencies & Execution Order

- **Phase 1**: No dependencies.
- **Phase 2**: Depends on Phase 1 (understand current state).
- **US1 (P1)**: Depends on Phase 2 (decide ordering/dedupe policy).
- **US2 (P2)**: Depends on US1 (ensure maintainability after content changes).
- **US3 (P3)**: Depends on US1 (verify readability after content changes).
- **Polish**: After all desired user stories.

### Parallel Opportunities

- [ ] T015 [P] (Optional) Adjust SkillsSection copy (`src/components/sections/SkillsSection.tsx`) in parallel with content ordering changes once the desired message is decided


