---
description: "Tasks for 024-section-typography"
---

# Tasks: Section typography size upgrade

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/024-section-typography/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline quality gates before sweeping typography changes.

- [X] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 [P] Inventory current body text sizing usage (`text-xs/text-sm/text-base`) in `src/components/sections/*` and list candidates to promote to `text-base`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce a shared “section body” typography token to avoid drift.

- [X] T003 Add a shared `.section-body` class in `src/app/globals.css` (e.g., `text-base leading-relaxed [font-family:var(--font-noto)]`)
- [X] T004 Define a companion `.section-body-muted` (optional) for secondary descriptions (e.g., `text-sm text-fami-ivory/90`) in `src/app/globals.css`

**Checkpoint**: There is a single, named token for default section body typography.

---

## Phase 3: User Story 1 - Readable section body text (Priority: P1) 🎯 MVP

**Goal**: Promote section paragraphs/descriptions to a readable default size.

**Independent Test**: `pnpm dev` → Profile/Work/Writing/Activities/Skills/Contact 本文が読みやすいサイズ（基本 `text-base`）になっている。

- [X] T005 [P] [US1] Apply `.section-body` to Profile body in `src/components/sections/ProfileSection.tsx` and remove redundant `text-sm` if present
- [X] T006 [P] [US1] Apply `.section-body` to Work descriptive copy in `src/components/sections/WorkSection.tsx` (section intro + entry summary) while keeping badges/buttons unchanged
- [X] T007 [P] [US1] Apply `.section-body` to Writing descriptive copy in `src/components/sections/WritingSection.tsx`
- [X] T008 [P] [US1] Apply `.section-body` to Activities intro + item context paragraphs in `src/components/sections/ActivitiesSection.tsx` (keep year badge and button sizing as-is)
- [X] T009 [P] [US1] Apply `.section-body` to Contact blurb in `src/components/sections/ContactSection.tsx`

---

## Phase 4: User Story 2 - Keep hierarchy and retro mood (Priority: P2)

**Goal**: Ensure typography changes don’t flatten hierarchy or break the retro look.

**Independent Test**: H2/H3 headings remain clearly dominant; dense UI remains compact and readable.

- [X] T010 [US2] Review Skills section typography in `src/components/sections/SkillsSection.tsx`; keep dense labels small where appropriate, but promote any true paragraph/descriptive copy to `.section-body`
- [X] T011 [US2] Verify no accidental “global” font bump: ensure `html/body` font-size is unchanged in `src/app/globals.css`

---

## Phase 5: User Story 3 - Maintainable typography tokens (Priority: P3)

**Goal**: Make future typography adjustments easy and consistent.

**Independent Test**: Most section paragraphs use `.section-body` or `.section-body-muted` rather than ad-hoc `text-sm/text-xs`.

- [X] T012 [US3] Replace repeated `[font-family:var(--font-noto)]` + size utilities on paragraphs with `.section-body`/`.section-body-muted` where applicable across `src/components/sections/*`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate build integrity and quickstart checks. Docs sync is not required unless top-level UX guidance changes.

- [X] T013 Run `pnpm lint` and fix any issues introduced by refactors
- [X] T014 Run `pnpm build` and fix any issues introduced by refactors
- [X] T015 Validate `specs/024-section-typography/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

- Setup (T001–T002) → Foundational (T003–T004) → US1 (T005–T009) → US2 (T010–T011) → US3 (T012) → Polish (T013–T015)

---

## Parallel Example: User Story 1

```text
Task: T005 [P] [US1] ProfileSection typography
Task: T006 [P] [US1] WorkSection typography
Task: T007 [P] [US1] WritingSection typography
Task: T008 [P] [US1] ActivitiesSection typography
Task: T009 [P] [US1] ContactSection typography
```


