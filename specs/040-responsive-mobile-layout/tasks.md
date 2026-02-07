# Tasks: Responsive Mobile Layout

**Input**: Design documents from `/specs/040-responsive-mobile-layout/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test framework configured. Verification is `pnpm lint` + `pnpm build` + manual browser checks (per quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Single Next.js App Router project
- **Source**: `src/` at repository root
- **Components**: `src/components/`
- **Sections**: `src/components/sections/`
- **App**: `src/app/`

---

## Phase 1: Setup

**Purpose**: No project initialization needed — all files exist. This phase verifies the starting state.

- [X] T001 Verify dev server starts cleanly with `pnpm dev` and current layout renders at desktop width (1280px+) without errors

---

## Phase 2: Foundational (NES.css Mobile Overrides)

**Purpose**: Add global CSS overrides for NES.css components that affect ALL sections. These MUST be in place before any component-level responsive changes, because NES.css fixed sizing is the root cause of most mobile overflow.

**CRITICAL**: No user story work can begin until this phase is complete — NES.css overrides are a prerequisite for all component fixes.

- [X] T002 Add NES.css mobile override for `.nes-btn`: reduce padding to `2px 6px` and font-size to `0.75rem` at `max-width: 639px` in `src/app/globals.css`
- [X] T003 Add NES.css mobile override for `.nes-badge`: reduce font-size to `0.625rem` at `max-width: 639px` in `src/app/globals.css`
- [X] T004 Add NES.css mobile override for `.nes-container`: reduce padding to `0.75rem` at `max-width: 639px` in `src/app/globals.css`
- [X] T005 Add NES.css safety rule for `.nes-progress`: set `max-width: 100%` (always applied) in `src/app/globals.css`
- [X] T006 Add global `overflow-wrap: break-word` on body or main container to prevent long text overflow on mobile in `src/app/globals.css`
- [X] T007 Update page container padding from `px-4 md:px-8` to `px-3 sm:px-4 md:px-8` in `src/app/page.tsx`
- [X] T008 Run `pnpm lint && pnpm build` to verify foundational changes compile without errors

**Checkpoint**: NES.css components render with reduced sizing at mobile widths; page container has appropriate padding progression. Desktop layout unchanged.

---

## Phase 3: User Story 1 — Mobile Phone Layout (Priority: P1) 🎯 MVP

**Goal**: 320px〜414px幅のスマートフォンで全セクションが正しく表示され、横スクロールが発生しない。

**Independent Test**: iPhone SE (375px) and iPhone 14 (390px) viewports — scroll through all sections, verify no horizontal overflow and all content fits.

### Implementation for User Story 1

#### Hero Section

- [X] T009 [US1] Update Hero section padding from `p-8` to `p-4 sm:p-6 md:p-8` in `src/components/Hero.tsx`
- [X] T010 [US1] Update Hero title font size from `text-2xl md:text-3xl` to `text-xl sm:text-2xl md:text-3xl` in `src/components/Hero.tsx`
- [X] T011 [US1] Update Hero profile image width from `w-32 md:w-48 lg:w-56` to `w-28 sm:w-32 md:w-48 lg:w-56` in `src/components/Hero.tsx`
- [X] T012 [US1] Update Hero bio text size to `text-sm sm:text-base md:text-lg` if currently `text-base md:text-lg` in `src/components/Hero.tsx`

#### Contact & Writing Button Groups

- [X] T013 [P] [US1] Update Contact section button group from `flex flex-wrap gap-3` to `flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3` in `src/components/sections/ContactSection.tsx`
- [X] T014 [P] [US1] Add `w-full sm:w-auto` to individual contact buttons (nes-btn) for full-width stacking on mobile in `src/components/sections/ContactSection.tsx`
- [X] T015 [P] [US1] Update Writing section button group from `flex flex-wrap gap-3` to `flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3` in `src/components/sections/WritingSection.tsx`
- [X] T016 [P] [US1] Add `w-full sm:w-auto` to individual writing link buttons for full-width stacking on mobile in `src/components/sections/WritingSection.tsx`

#### Work RPG Section

- [X] T017 [US1] Add `overflow-hidden` or `min-w-0` to Work RPG status panel badge container to prevent badge overflow on mobile in `src/components/sections/WorkQuestLog.tsx`
- [X] T018 [US1] Ensure Work RPG detail panel text uses `break-words` and doesn't overflow its container at 320px width in `src/components/sections/WorkQuestLog.tsx`

#### Skills Section

- [X] T019 [US1] Update Skills section skill label layout: add `flex-wrap` to the `justify-between` flex container so long skill names wrap gracefully on mobile in `src/components/sections/SkillsSection.tsx`
- [X] T020 [US1] Verify NES.css progress bars respect parent width at 320px (should be handled by T005 global override) in `src/components/sections/SkillsSection.tsx`

#### Activities Section

- [X] T021 [US1] Add `min-w-0` to Activities section item containers to prevent flex children from overflowing on mobile in `src/components/sections/ActivitiesSection.tsx`
- [X] T022 [US1] Ensure Activities year badges wrap properly with reduced sizing (from T003 global override) in `src/components/sections/ActivitiesSection.tsx`

#### Mobile Menu

- [X] T023 [US1] Update mobile menu overlay padding in globals.css from `padding: 1rem` to responsive value (`padding: 0.75rem` at mobile) in `src/app/globals.css`

#### Validation

- [X] T024 [US1] Run `pnpm lint && pnpm build` to verify all US1 changes compile without errors
- [ ] T025 [US1] Manual verification at 320px, 375px, 414px widths: confirm no horizontal scrollbar on any section (per quickstart.md scenarios 1-3)

**Checkpoint**: User Story 1 fully functional — all sections fit within mobile phone viewports without horizontal overflow. Desktop layout unchanged.

---

## Phase 4: User Story 2 — Tablet & Small Desktop Layout (Priority: P2)

**Goal**: 640px〜1024px幅のタブレットやスモールデスクトップで、レイアウトが自然に中間表示される。

**Independent Test**: iPad (768px) viewport — Work RPG shows 2 columns, Activities Talks shows 2-column grid, TableOfContents visible and MobileMenu hidden.

### Implementation for User Story 2

- [X] T026 [US2] Verify TableOfContents visibility breakpoint: should be `hidden sm:block` (visible at 640px+) in `src/components/TableOfContents.tsx` — already correct
- [X] T027 [US2] Verify MobileMenu button visibility breakpoint: should be `sm:hidden` (hidden at 640px+) in `src/components/MobileMenu.tsx` — already correct
- [X] T028 [US2] Verify Work RPG grid switches to 2-column layout at `min-width: 768px` in `src/app/globals.css` — already correct
- [X] T029 [US2] Verify Activities section Talks grid uses `grid-cols-1 md:grid-cols-2` (2 columns at 768px+) in `src/components/sections/ActivitiesSection.tsx` — already correct
- [X] T030 [US2] Verify intermediate padding (`sm:px-4`) provides good spacing at 640px-767px in `src/app/page.tsx` — implemented in T007
- [X] T031 [US2] Run `pnpm lint && pnpm build` to verify all US2 changes compile without errors
- [ ] T032 [US2] Manual verification at 640px, 768px, 1024px widths: confirm correct layout transitions per responsive contracts (per quickstart.md scenarios 4-5)

**Checkpoint**: User Stories 1 AND 2 both work — mobile phone and tablet layouts correct. Desktop unchanged.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Desktop regression check, edge cases, docs sync, and final build validation.

- [ ] T033 Manual verification at 1280px and 1440px widths: confirm desktop layout is IDENTICAL to production (per quickstart.md scenario 6)
- [ ] T034 Manual verification of PRESS START gate on mobile (375px): content hidden before START, hamburger menu appears after START (per quickstart.md scenario 7)
- [ ] T035 Manual verification in landscape mode (568px × 320px): content doesn't clip or overflow (per quickstart.md scenario 8)
- [X] T036 [P] Add `overflow-x: hidden` safety net on root container in `src/app/page.tsx` as a final defense against any remaining horizontal overflow
- [X] T037 Run `pnpm format:check && pnpm lint && pnpm build` — full verification suite (lint + build pass; format:check has pre-existing issues)
- [ ] T038 Update docs: add responsive/mobile-first note to `README.md`, `AGENTS.md`, and `CLAUDE.md` per Constitution Principle V (docs sync)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — verify starting state
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (NES.css overrides must be in place first)
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — mobile phone layout
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) — can run in parallel with US1 but benefits from US1 being done first
- **Polish (Phase 5)**: Depends on both user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2). No dependencies on US2.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2). Mostly verification tasks — benefits from US1 being done since shared components may have been updated.

### Within Each User Story

- Hero changes (T009-T012) are all in the same file — execute sequentially
- Contact (T013-T014) and Writing (T015-T016) are in different files — can run in parallel
- Work RPG (T017-T018), Skills (T019-T020), Activities (T021-T022) are in different files — can run in parallel
- Lint/build check after all implementation tasks in the phase
- Manual verification after build passes

### Parallel Opportunities

**Within Phase 2 (Foundational)**:
- T002, T003, T004, T005 can all run in parallel (additive CSS rules, no conflicts)

**Within Phase 3 (US1)**:
- T013/T014 || T015/T016 (ContactSection vs WritingSection — different files)
- T017/T018 || T019/T020 || T021/T022 (WorkQuestLog vs SkillsSection vs ActivitiesSection — different files)

**Within Phase 4 (US2)**:
- T026 || T027 (TableOfContents vs MobileMenu — different files)
- T028 || T029 (globals.css vs ActivitiesSection — different files)

---

## Parallel Example: User Story 1

```bash
# Launch button group fixes together (different files):
Task: "Update Contact section buttons in src/components/sections/ContactSection.tsx"
Task: "Update Writing section buttons in src/components/sections/WritingSection.tsx"

# Launch section overflow fixes together (different files):
Task: "Fix Work RPG badge overflow in src/components/sections/WorkQuestLog.tsx"
Task: "Fix Skills label wrapping in src/components/sections/SkillsSection.tsx"
Task: "Fix Activities item overflow in src/components/sections/ActivitiesSection.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: Foundational — NES.css overrides + page padding (T002–T008)
3. Complete Phase 3: User Story 1 — all mobile phone fixes (T009–T025)
4. **STOP and VALIDATE**: Test at 320px, 375px, 414px widths — no horizontal overflow
5. Deploy/demo if ready — mobile phone users get a usable experience

### Incremental Delivery

1. Complete Setup + Foundational → NES.css safe on mobile
2. Add User Story 1 → Test at phone widths → Deploy (MVP — phones work)
3. Add User Story 2 → Test at tablet widths → Deploy (full responsive)
4. Polish → Desktop regression check + docs sync → Production-ready

### File Impact Summary

| File | Tasks | Changes |
|------|-------|---------|
| `src/app/globals.css` | T002-T006, T023 | NES.css overrides, overflow-wrap, mobile menu padding |
| `src/app/page.tsx` | T007, T036 | Page padding progression, overflow-x safety |
| `src/components/Hero.tsx` | T009-T012 | Responsive padding, font sizes, image width |
| `src/components/sections/ContactSection.tsx` | T013-T014 | Button stacking on mobile |
| `src/components/sections/WritingSection.tsx` | T015-T016 | Button stacking on mobile |
| `src/components/sections/WorkQuestLog.tsx` | T017-T018 | Badge overflow, text wrapping |
| `src/components/sections/SkillsSection.tsx` | T019-T020 | Label wrapping, progress bar |
| `src/components/sections/ActivitiesSection.tsx` | T021-T022, T029 | Item overflow, grid verification |
| `src/components/MobileMenu.tsx` | T027 | Breakpoint verification |
| `src/components/TableOfContents.tsx` | T026 | Breakpoint verification |
| `README.md`, `AGENTS.md`, `CLAUDE.md` | T038 | Docs sync (responsive note) |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test framework tasks: verification is `pnpm lint` + `pnpm build` + manual browser checks
- Desktop layout MUST be identical to production after all changes — this is a hard constraint
- NES.css overrides use `max-width: 639px` to guarantee zero desktop impact
