# Tasks: Add CodeZine Article Series

**Input**: Design documents from `/specs/041-add-codezine-series/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — no test tasks included.

**Organization**: Single user story (US1). This is a minimal content + type change affecting 1 file.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: No project setup needed — existing project, existing branch.

(No tasks — branch `041-add-codezine-series` already exists.)

---

## Phase 2: Foundational

**Purpose**: No foundational work needed — existing type system and rendering are sufficient.

(No tasks — `ActivitiesSection.tsx` already handles arbitrary non-"Talks" groups.)

---

## Phase 3: User Story 1 — Add Articles Group with CodeZine Entry (Priority: P1) 🎯 MVP

**Goal**: Add `"Articles"` to the `ActivityGroup.name` union type and populate it with the CodeZine Platform Engineering series entry.

**Independent Test**: Run `pnpm build` (TypeScript compile check) → open `http://localhost:3000` → scroll to Activities → verify "ARTICLES" heading appears between Books and Community with the CodeZine entry showing year badge (2024), title, context, and link button.

### Implementation for User Story 1

- [x] T001 [US1] Extend `ActivityGroup.name` union type to include `"Articles"` in `src/content/portfolio.ts` (line 85: add `"Articles"` between `"Books"` and `"Community"`)
- [x] T002 [US1] Add new Articles group entry to `publicPortfolio.activities.groups` array in `src/content/portfolio.ts` (insert after the Books group object, before the Community group object) with: `{ name: "Articles", items: [{ year: "2024", title: "CodeZine連載：Platform Engineering入門", context: "CodeZine（翔泳社）でPlatform Engineeringの入門連載を執筆しました。", link: { label: "CodeZine", href: "https://codezine.jp/article/detail/18856" } }] }`

**Checkpoint**: Articles group visible on the page with correct data. `pnpm lint && pnpm build` pass.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates and docs sync.

- [x] T003 Run `pnpm lint && pnpm build` to verify no type errors or build regressions
- [x] T004 Run quickstart.md validation: verify Articles group renders correctly at `http://localhost:3000`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Skipped — no tasks.
- **Phase 2 (Foundational)**: Skipped — no tasks.
- **Phase 3 (US1)**: T001 → T002 (type must exist before data uses it, though both are in the same file so they can be done in one edit).
- **Phase 4 (Polish)**: Depends on Phase 3 completion.

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories. This is the only story.

### Parallel Opportunities

- T001 and T002 edit the same file (`src/content/portfolio.ts`) — they should be done sequentially (or as a single edit).
- T003 and T004 are sequential (build must pass before visual verification).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Edit `src/content/portfolio.ts`: extend union type + add Articles group data (T001 + T002)
2. Run `pnpm lint && pnpm build` (T003)
3. Visual verification (T004)
4. **DONE** — commit, push, PR, merge

### Summary

| Metric | Value |
|--------|-------|
| Total tasks | 4 |
| US1 tasks | 2 |
| Polish tasks | 2 |
| Files modified | 1 (`src/content/portfolio.ts`) |
| Parallel opportunities | None (single file) |
| MVP scope | US1 (all tasks) |

---

## Notes

- T001 and T002 can realistically be done as a single edit to `src/content/portfolio.ts`.
- No rendering code changes — `ActivitiesSection.tsx` already handles non-"Talks" groups with the standard list layout.
- No new dependencies, no new components, no new files (outside specs/).
