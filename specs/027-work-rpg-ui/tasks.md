# Tasks: Work RPG UI (status + quest log)

**Input**: Design documents from `specs/027-work-rpg-ui/`  
**Prerequisites**: `specs/027-work-rpg-ui/plan.md`, `specs/027-work-rpg-ui/spec.md`, `specs/027-work-rpg-ui/research.md`, `specs/027-work-rpg-ui/data-model.md`, `specs/027-work-rpg-ui/quickstart.md`, `specs/027-work-rpg-ui/contracts/README.md`

**Tests**: No automated tests requested for this feature. Validate via quickstart + lint/build.

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create Work RPG deterministic quest id helper in `src/components/sections/workRpgId.ts` (includes de-dup suffix rule)
- [x] T002 [P] Add Work RPG CSS tokens + animations scaffold in `src/app/globals.css` (scoped under a Work-only root class)

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Define Work RPG view-model builder (derive stats + quest VMs, use id de-dup) in `src/components/sections/workRpgVm.ts`
- [x] T004 [P] Add a dedicated client component for quest selection state in `src/components/sections/WorkQuestLog.tsx`
- [x] T005 Wire new imports directly in `src/components/sections/WorkSection.tsx` (import VM builder + `WorkQuestLog`)

**Checkpoint**: VM + selection component skeleton exists; WorkSection can consume it

---

## Phase 3: User Story 1 — A “different game screen” in Work (Priority: P1) 🎯 MVP

**Goal**: Work セクションだけを RPGステータス画面/クエストログ風にし、他セクションと明確に違う“見どころ画面”にする。

**Independent Test**: `pnpm dev` でトップページを開き Work へスクロールすると、Work が 3ペイン（status/log/detail）風に見え、情報が読める。

- [x] T006 [US1] Refactor `src/components/sections/WorkSection.tsx` to render an RPG layout shell (status panel + quest log slot + detail slot)
- [x] T007 [US1] Implement derived “status stats” rendering in `src/components/sections/WorkSection.tsx` (projectsCount/uniqueTechCount/assetsCount/linksCount)
- [x] T008 [US1] Add “Quest Log” list container (non-interactive placeholder) in `src/components/sections/WorkSection.tsx` using the VM output
- [x] T009 [US1] Ensure mobile layout stacks panels safely (no overflow) in `src/components/sections/WorkSection.tsx`
- [x] T010 [US1] Ensure long text wraps and preserves newlines where appropriate in `src/components/sections/WorkSection.tsx`
- [x] T011 [US1] Add Work-only “RPG frame” styles (panels, scanlines/shine, headings) in `src/app/globals.css`

**Checkpoint**: Work だけ別画面に見える + 破綻しない（まだ選択できなくてもOK）

---

## Phase 4: User Story 2 — Quest log interaction (Priority: P2)

**Goal**: クエスト（Projects）を選択でき、選択状態が分かり、詳細が更新される。

**Independent Test**: Work 内でクエストをクリック/タップすると detail が切り替わり、キーボードでも選択できる。

- [x] T012 [US2] Implement quest selection state + rendering in `src/components/sections/WorkQuestLog.tsx` (selectedQuestId, initial selection)
- [x] T013 [US2] Add accessible semantics for selection in `src/components/sections/WorkQuestLog.tsx` (buttons, aria-selected, aria-controls)
- [x] T014 [US2] Render quest detail panel in `src/components/sections/WorkQuestLog.tsx` (role/tech/outcome/link/asset)
- [x] T015 [US2] Integrate `WorkQuestLog` into `src/components/sections/WorkSection.tsx` (Server fetch + pass VM to Client component)
- [x] T016 [US2] Add selected-state visuals (highlight, cursor, subtle ping) in `src/app/globals.css`
- [x] T017 [US2] Ensure focus visibility is strong and consistent (keyboard) in `src/app/globals.css`

**Checkpoint**: 一覧→詳細の導線が自然で、操作していて気持ちいい

---

## Phase 5: User Story 3 — Motion is safe (Priority: P3)

**Goal**: 動きは “派手すぎない” & reduced-motion で抑制でき、可読性を壊さない。

**Independent Test**: reduced-motion を有効にして reload しても Work が成立し、目立つアニメーションが止まる。

- [x] T018 [US3] Gate Work RPG animations behind `prefers-reduced-motion` in `src/app/globals.css`
- [x] T019 [US3] Ensure Work RPG motion uses only transform/opacity (no layout thrash) in `src/app/globals.css`
- [x] T020 [US3] Confirm “Work-only” scope (no class leakage to other sections) in `src/components/sections/WorkSection.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T021 [P] Add small copy labels (“STATUS”, “QUEST LOG”, “DETAIL”) and align typography in `src/components/sections/WorkSection.tsx`
- [x] T022 [P] Add empty-state handling for no projects (“No quests yet”) in `src/components/sections/WorkQuestLog.tsx`
- [x] T023 Ensure no new dependencies were introduced (verify `package.json` unchanged) and note in `specs/027-work-rpg-ui/contracts/README.md` if needed
- [x] T024 Validate manual QA steps in `specs/027-work-rpg-ui/quickstart.md` (run lint/build, check reduced-motion, check no palette regressions)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** → **Foundational (Phase 2)** → **US1 (Phase 3)** → **US2 (Phase 4)** → **US3 (Phase 5)** → **Polish (Phase 6)**

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (VM + scaffolding)
- **US2 (P2)**: Builds on US1 layout shell
- **US3 (P3)**: Primarily CSS gating; can be done after US1/US2 exist to validate behavior

### Parallel Opportunities

- [P] tasks in different files can proceed in parallel:
  - CSS (`src/app/globals.css`)
  - Client component (`src/components/sections/WorkQuestLog.tsx`)
  - VM helper (`src/components/sections/workRpgVm.ts`)

---

## Parallel Example: US2

```bash
Task: "Implement quest selection state + rendering in src/components/sections/WorkQuestLog.tsx"
Task: "Add selected-state visuals in src/app/globals.css"
```

---

## Implementation Strategy

### MVP First (US1 Only)

- Land the RPG layout shell + Work-only styles first (no interaction required) so the page already has “1つだけ奇抜”を達成。

### Incremental Delivery

- Add selection + detail swapping (US2)
- Add motion safety gates + scope audit (US3)
