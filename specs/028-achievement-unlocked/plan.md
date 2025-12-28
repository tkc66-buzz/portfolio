# Implementation Plan: Achievement Unlocked toast (Activities)

**Branch**: `028-achievement-unlocked` | **Date**: 2025-12-28 | **Spec**: `specs/028-achievement-unlocked/spec.md`
**Input**: Feature specification from `specs/028-achievement-unlocked/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Activities セクションが初めて画面内に入ったタイミングで **“Achievement Unlocked” 風トーストを1回だけ表示**する。  
トーストは閉じられ、閉じた後は再表示しない。実装は Server Component を維持し、**トースト表示と in-view 検知のみを最小の Client Component**に閉じ込める。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3.4, NES.css 2.3  
**Storage**: N/A（状態は session-scoped: `sessionStorage` を想定）  
**Testing**: N/A（現状は lint/build + manual QA）  
**Target Platform**: Vercel / modern browsers
**Project Type**: Web（Next.js App Router, `src/`）  
**Performance Goals**: 追加JSは最小（Activities周辺のみ）。スクロール性能/CLSを悪化させない  
**Constraints**: 追加依存なし。reduced-motion ではアニメーション無効化。トーストは Activities の可読性を邪魔しない  
**Scale/Scope**: Activities セクション限定の演出（他セクションへ波及させない）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: “Retro + Usability” を守り、Activities の可読性を壊さない（閉じる手段・被り回避・reduced-motion）。
- Quality gates: `pnpm lint` と `pnpm build` が通る。
- Docs sync: 依存/スクリプト/ランタイム/デプロイ/トップレベルUXに変更があれば `README.md` / `AGENTS.md` / `CLAUDE.md` を同期更新。

**Gate Status (pre-research)**: PASS（小さな Client Component + CSS の追加のみ。依存追加なし）

## Project Structure

### Documentation (this feature)

```text
specs/028-achievement-unlocked/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   └── globals.css
└── components/
    ├── sections/
    │   └── ActivitiesSection.tsx
    └── (new) AchievementToast.tsx
```

**Structure Decision**: `ActivitiesSection`（Server）に、`AchievementToast`（Client）を差し込む。演出スタイルは `src/app/globals.css` に追加し、Activitiesのみへスコープする。

## Phase 0 — Research (decisions to lock)

- Trigger: Activities in-view 検知の手段（IntersectionObserver）と閾値
- 1回だけ: セッション内の記録（sessionStorage key）と、閉じる操作時の扱い
- reduced-motion: どの状態で “静的表示” vs “非表示” にするか（デフォルトを決める）
- A11y: トーストの role/aria, フォーカス/閉じる操作

## Phase 1 — Design & Contracts

- `data-model.md`: toast state と状態遷移
- `contracts/`: API追加なし（READMEで明示）
- `quickstart.md`: in-view / dismiss / reduced-motion / lint/build の確認手順

## Phase 1 — Agent context update

- `.specify/scripts/bash/update-agent-context.sh cursor-agent`

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
