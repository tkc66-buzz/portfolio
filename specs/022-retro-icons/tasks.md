---
description: "Tasks for 022-retro-icons"
---

# Tasks: Retro Icon Pack (UI icons)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/022-retro-icons/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline build health and create icon directories.

- [X] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 Create icon asset directory `public/assets/pixel/icons/` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/public/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add a small reusable icon component with accessibility defaults.

- [X] T003 Add `src/components/PixelIcon.tsx` (renders SVG from `/public`, supports `decorative`/`alt`, size `sm|md`)
- [X] T004 Add optional sizing helpers in `src/app/globals.css` (e.g. `.pixel-icon-sm`, `.pixel-icon-md`) OR use Tailwind classes consistently (choose one)

**Checkpoint**: `PixelIcon` can be used in any section without layout shift and without screen reader noise.

---

## Phase 3: User Story 1 - Section icons (Priority: P1) 🎯 MVP

**Goal**: Add retro icons to the main section headings for scanability.

**Independent Test**: `pnpm dev` → Profile/Work/Writing/Activities/Skills/Contact headings show a pixel icon left of the heading and remain readable on mobile.

- [X] T005 [P] [US1] Add heading icon SVGs under `public/assets/pixel/icons/`: `profile.svg`, `work.svg`, `writing.svg`, `activities.svg`, `skills.svg`, `contact.svg`
- [X] T006 [US1] Add icons to section headings by updating these files to render `PixelIcon` next to the `<h2>`:
  - `src/components/sections/ProfileSection.tsx`
  - `src/components/sections/WorkSection.tsx`
  - `src/components/sections/WritingSection.tsx`
  - `src/components/sections/ActivitiesSection.tsx`
  - `src/components/sections/SkillsSection.tsx`
  - `src/components/sections/ContactSection.tsx`
- [X] T007 [US1] Ensure icons are decorative (no SR noise): set `decorative` or `alt=""` + `aria-hidden` via `PixelIcon`

**Checkpoint**: SC-001 satisfied.

---

## Phase 4: User Story 2 - Link icons (Priority: P2)

**Goal**: Add icons to Contact links for faster recognition.

**Independent Test**: `pnpm dev` → Contact link list shows icons for Email/GitHub/X/LinkedIn; keyboard focus order remains sensible.

- [X] T008 [P] [US2] Add link icon SVGs under `public/assets/pixel/icons/`: `email.svg`, `github.svg`, `x.svg`, `linkedin.svg`
- [X] T009 [US2] Update `src/components/sections/ContactSection.tsx` to render `PixelIcon` in each link row (icon + label)
- [X] T010 [US2] Ensure link icons are decorative and do not change link accessible name

**Checkpoint**: SC-002 satisfied.

---

## Phase 5: User Story 3 - Asset & accessibility guardrails (Priority: P3)

**Goal**: Keep icon usage lightweight, consistent, and accessible.

**Independent Test**: `pnpm lint`/`pnpm build` pass; icons missing do not crash layout; docs/contracts clearly describe rules.

- [X] T011 [US3] Enforce a safe fallback in `PixelIcon` when icon file is missing (e.g., render nothing but keep spacing stable)
- [X] T012 [US3] Document naming + a11y rules in `specs/022-retro-icons/contracts/README.md` (confirm it matches actual implementation)

**Checkpoint**: SC-003 satisfied.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification + docs sync (top-level UX change).

- [X] T013 Run `pnpm lint` and fix any issues
- [X] T014 Run `pnpm build` and fix any issues
- [X] T015 Validate `specs/022-retro-icons/quickstart.md` steps end-to-end
- [X] T016 Docs sync: update `README.md`, `AGENTS.md`, and `CLAUDE.md` to mention icon assets location + `PixelIcon` usage

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (P1)** → **US2 (P2)** → **US3 (P3)** → **Polish (Phase 6)**

### Parallel Opportunities

- `T005` and `T008` (adding SVG files) can be parallelized
- Heading icon wiring (`T006`) is mostly sequential to avoid merge conflicts, but can be parallelized by splitting files across workers

---

## Parallel Example: User Story 1

```text
Task: T005 [P] [US1] Add section heading icon SVGs under public/assets/pixel/icons/
Task: T006 [US1] Add icons to section headings in src/components/sections/*.tsx
```


