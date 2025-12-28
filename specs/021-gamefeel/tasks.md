---
description: "Tasks for 021-gamefeel"
---

# Tasks: Gamefeel Upgrade (Images/Diagrams + Retro Motion)

**Input**: Design documents from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/021-gamefeel/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: No automated tests requested; verify via `pnpm dev` + `pnpm lint` + `pnpm build`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm repo health and create asset folders.

- [X] T001 Confirm baseline quality gates: run `pnpm lint` and `pnpm build` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/`
- [X] T002 Create static asset directories `public/assets/diagrams/` and `public/assets/pixel/` in `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/public/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Introduce the minimal data model and CSS primitives needed by all stories.

- [X] T003 Add `Asset` type and optional `Project.asset?: Asset` in `src/content/portfolio.ts`
- [X] T004 Add CSS motion utility classes and reduced-motion gating in `src/app/globals.css` (e.g. `.pixel-float`, `.blink-soft`, `@media (prefers-reduced-motion: reduce)`)

**Checkpoint**: TypeScript builds; no UI changes required yet.

---

## Phase 3: User Story 1 - Visual proof assets (Priority: P1) 🎯 MVP

**Goal**: Show at least one diagram/screenshot on a Project card inside Work.

**Independent Test**: `pnpm dev` → Work → at least one Project card shows a visual; removing the asset does not break layout.

- [X] T005 [P] [US1] Add at least one real asset file under `public/assets/diagrams/` (e.g. `public/assets/diagrams/go-migration.svg`)
- [X] T006 [P] [US1] Add `asset` metadata to at least one Project in `src/content/portfolio.ts` (src/alt/kind; width/height if raster)
- [X] T007 [US1] Render `project.asset` in `src/components/sections/WorkSection.tsx` with graceful fallback (diagram via `<img>`, raster via `next/image` if used)
- [X] T008 [US1] Ensure accessibility: meaningful `alt` text and no layout shift on mobile in `src/components/sections/WorkSection.tsx`

**Checkpoint**: SC-001 satisfied.

---

## Phase 4: User Story 2 - Game-like micro motion (Priority: P2)

**Goal**: Add subtle retro motion that is suppressed under reduced-motion.

**Independent Test**: With normal settings, see subtle motion; with reduced motion enabled, animations stop.

- [X] T009 [US2] Apply subtle motion classes to one or two elements (Hero/Menu/Work) in `src/components/Hero.tsx`, `src/components/TableOfContents.tsx`, or `src/components/sections/WorkSection.tsx`
- [X] T010 [US2] Verify reduced-motion behavior by ensuring animated elements have a stable non-animated baseline (CSS in `src/app/globals.css`)

**Checkpoint**: SC-002 satisfied.

---

## Phase 5: User Story 3 - Quality + performance guardrails (Priority: P3)

**Goal**: Keep the site fast and retro; avoid heavy runtime deps and janky animations.

**Independent Test**: `pnpm build` passes; assets are appropriately sized; no large JS animation libs are introduced.

- [X] T011 [US3] Ensure assets are optimized (prefer SVG or compressed WebP) and document any size constraints in `specs/021-gamefeel/contracts/README.md`
- [X] T012 [US3] Audit motion for jank risks (no scroll-tied JS; avoid expensive filters) and adjust `src/app/globals.css` accordingly

**Checkpoint**: SC-003 satisfied and no performance regressions introduced by design.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, docs sync if needed, and quickstart validation.

- [X] T013 Run `pnpm lint` and fix any issues introduced by new types/components
- [X] T014 Run `pnpm build` and fix any issues
- [X] T015 Validate `specs/021-gamefeel/quickstart.md` steps end-to-end
- [X] T016 If top-level UX/docs changed (new assets guidance, motion guidance), update `README.md`, `AGENTS.md`, and `CLAUDE.md` together

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (P1)** → **US2 (P2)** → **US3 (P3)** → **Polish (Phase 6)**

### Parallel Opportunities

- `T005` and `T006` can be done in parallel (assets + metadata)
- Motion CSS (`T004`) can be developed in parallel with asset prep (`T005`) as long as it doesn’t depend on UI changes

---

## Parallel Example: User Story 1

```text
Task: T005 [P] [US1] Add an asset file under public/assets/diagrams/
Task: T006 [P] [US1] Add project.asset metadata in src/content/portfolio.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Add `Project.asset` data model (T003)
2. Add one asset file (T005) and wire it into one Project (T006)
3. Render the asset in WorkSection with fallback (T007–T008)
