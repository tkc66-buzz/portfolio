---
description: "Tasks for 027-font-polish"
---

# Tasks: Font polish (retro readability)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/027-font-polish/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/README.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm baseline health + inventory current typography usage.

- [X] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 [P] Inventory current font usage across headings/HUD/body in `src/app/layout.tsx`, `src/app/globals.css`, `src/components/*` (identify where `var(--font-press)` / `var(--font-noto)` is used)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define a single source of truth for typography tokens and fallback rules.

**⚠️ CRITICAL**: No user story work should begin until this phase is complete.

- [X] T003 Define typography tokens for body vs display (e.g., `--font-body`, `--font-display`) in `src/app/globals.css`
- [X] T004 Wire the chosen display/body fonts into CSS variables in `src/app/layout.tsx` (must preserve fallback behavior)
- [X] T005 Ensure the existing body typography helpers (`.section-body`, `.section-body-muted`) consume the new body token in `src/app/globals.css`

**Checkpoint**: Tokens exist and components should reference tokens rather than hardcoding font families.

---

## Phase 3: User Story 1 - Headings feel more “8-bit” without hurting reading (Priority: P1) 🎯 MVP

**Goal**: Make headings/HUD feel more retro while keeping body readable.

**Independent Test**: Top page → headings/HUD look more game-like; body text remains readable.

- [X] T006 [US1] Apply display token to Hero heading areas in `src/components/Hero.tsx`
- [X] T007 [US1] Apply display token to MENU/HUD labels in `src/components/TableOfContents.tsx` and `src/components/ScrollHud.tsx`
- [X] T008 [US1] Apply display token to section headings in `src/components/sections/*Section.tsx` (Profile/Work/Writing/Activities/Skills/Contact)
- [X] T009 [US1] Confirm body paragraphs remain on body token (fix any accidental display-token leakage)

**Checkpoint**: US1 is shippable independently.

---

## Phase 4: User Story 2 - Japanese text stays legible (Priority: P2)

**Goal**: Ensure Japanese-heavy pages remain legible after font polish.

**Independent Test**: Read Profile/Work/Activities/Skills/Contact body text; no “crushed” glyphs or fatigue-inducing density.

- [X] T010 [US2] Tune body typography for Japanese readability (line-height/letter-spacing if needed) in `src/app/globals.css` without losing retro feel
- [X] T011 [US2] Mobile pass: verify headings don’t overflow and body remains readable; adjust only tokens/helpers in `src/app/globals.css`

---

## Phase 5: User Story 3 - Font choice is safe and durable (Priority: P3)

**Goal**: Keep font selection safe (license) and durable (fallback works).

**Independent Test**: If the display font fails to load, page is still readable; docs state what we ship.

- [X] T012 [US3] Document the chosen font(s) and their license/source in `README.md` (and update `AGENTS.md` / `CLAUDE.md` only if dependency/runtime instructions change)
- [X] T013 [US3] Validate fallback chain works (no FOIT): simulate blocked font load and confirm text still renders (document the check in `specs/027-font-polish/quickstart.md`)

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates + quickstart validation.

- [X] T014 Run `pnpm lint` and fix any issues
- [X] T015 Run `pnpm build` and fix any issues
- [X] T016 Validate `specs/027-font-polish/quickstart.md` steps end-to-end

---

## Dependencies & Execution Order

- Setup (T001–T002) → Foundational (T003–T005) → US1 (T006–T009) → US2 (T010–T011) → US3 (T012–T013) → Polish (T014–T016)

## Parallel Opportunities

- [P] inventory task (T002) can run in parallel with other baseline checks.


