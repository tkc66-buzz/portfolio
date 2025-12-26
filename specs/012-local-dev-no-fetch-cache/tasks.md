# Tasks: Local Dev Experience Freshness

**Input**: Design documents from `specs/012-local-dev-no-fetch-cache/`  
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Not requested in the feature spec. Validation will rely on `pnpm lint`, `pnpm build`, and the manual verification steps in `specs/012-local-dev-no-fetch-cache/quickstart.md`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Align on current behavior and the minimal change point (centralized private patch loading).

- [x] T001 Confirm current caching behavior and change point in `src/content/portfolio.ts` (private patch uses `unstable_cache` with `revalidate`)
- [x] T002 [P] Confirm Experience consumes private patch via `getPortfolio()` in `src/components/sections/ExperienceSection.tsx`
- [x] T003 [P] Review private-content workflow constraints in `specs/002-portfolio-private-content/quickstart.md` (spreadsheet/apps script + existing cache guidance)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement a safe “dev-only freshness policy” primitive that all user stories rely on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Add a runtime-mode helper (development vs production) in `src/content/portfolio.ts`
- [x] T005 Refactor the private patch fetch helpers to support dev-only fetch options in `src/content/portfolio.ts`
- [x] T006 In development mode, bypass `unstable_cache` and call the private patch fetcher directly in `src/content/portfolio.ts`
- [x] T007 In development mode, ensure the redirect-following GET fetch is not served from stale cache (e.g., `no-store`) in `src/content/portfolio.ts`
- [x] T008 Verify fallback behavior remains unchanged on fetch/parse failure in `src/content/portfolio.ts` (must fall back to public portfolio)

**Checkpoint**: Foundation ready — local dev can fetch fresh private patches; production path remains unchanged by default

---

## Phase 3: User Story 1 — See Experience updates immediately in local dev (Priority: P1) 🎯 MVP

**Goal**: Spreadsheet edits to Experience are visible on the next normal reload in local development.

**Independent Test**: Follow `specs/012-local-dev-no-fetch-cache/quickstart.md` steps (edit spreadsheet → normal reload → Experience reflects changes).

### Implementation for User Story 1

- [x] T009 [US1] Ensure Experience reflects the latest private patch on normal reload in local dev by adjusting private patch loading in `src/content/portfolio.ts`
- [x] T010 [US1] Add/adjust inline documentation explaining dev-only freshness vs production caching in `src/content/portfolio.ts`
- [x] T011 [US1] Validate the user journey with the manual steps in `specs/012-local-dev-no-fetch-cache/quickstart.md`

**Checkpoint**: User Story 1 is fully functional and independently verifiable in local dev

---

## Phase 4: User Story 2 — Production visitors keep fast loads (Priority: P2)

**Goal**: Production behavior stays on the existing caching policy (revalidate-based window); no “always fresh” is forced.

**Independent Test**: Run `pnpm build` + `pnpm start` and confirm the site operates normally and the production path still uses the existing caching window behavior.

### Implementation for User Story 2

- [x] T012 [US2] Confirm non-development runtime continues to use `unstable_cache(..., { revalidate })` in `src/content/portfolio.ts`
- [x] T013 [US2] Run the production-like safety check steps in `specs/012-local-dev-no-fetch-cache/quickstart.md`

**Checkpoint**: Production-like run passes; no unintended “always fresh” behavior is introduced

---

## Phase 5: User Story 3 — No workflow hacks needed (Priority: P3)

**Goal**: Developers don’t need to restart dev server/incognito/hard reload to see Experience updates.

**Independent Test**: In local dev, a normal reload is sufficient after a spreadsheet edit.

### Implementation for User Story 3

- [x] T014 [US3] Update documentation to remove “workaround” guidance for local dev (keep production cache guidance) in `specs/002-portfolio-private-content/quickstart.md`

**Checkpoint**: Docs reflect the new dev workflow; no hacks required

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ensure quality gates pass and docs remain accurate.

- [x] T015 Run `pnpm lint` and fix any issues caused by changes in `src/content/portfolio.ts`
- [x] T016 Run `pnpm build` and fix any issues caused by changes in `src/content/portfolio.ts`
- [x] T017 Run through `specs/012-local-dev-no-fetch-cache/quickstart.md` end-to-end and confirm it matches observed behavior

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–5)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on completing the desired user stories (at minimum US1)

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2, no dependency on US2/US3
- **US2 (P2)**: Starts after Phase 2, validates production safety of the Phase 2 changes
- **US3 (P3)**: Starts after US1 (docs/workflow confirmation)

### Parallel Opportunities

- Phase 1 tasks marked **[P]** can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: US1
4. Validate with `specs/012-local-dev-no-fetch-cache/quickstart.md`

### Incremental Delivery

1. Add US1 → validate dev freshness
2. Add US2 → validate production safety
3. Add US3 → update documentation for the new dev workflow

