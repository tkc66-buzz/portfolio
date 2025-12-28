# Implementation Plan: Motion polish (site-wide)

**Branch**: `026-motion-polish` | **Date**: 2025-12-28 | **Spec**: `specs/026-motion-polish/spec.md`
**Input**: Feature specification from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/026-motion-polish/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

「派手」なレトロ演出でサイトの“動き”を増やす。具体的には、(1) 主要なボタン/リンクにゲーム的な入力フィードバック、(2) スクロールに対する「進捗バー」＋「現在セクション強調」を導入し、読み進めやすさと作り込み感を上げる。
ただし憲法に従い、レトロ雰囲気（NES.css + 既存配色）を維持し、可読性とパフォーマンスを損ねない（過剰な動きは避け、必要時は抑制できる）。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: 体感が重くならない（スクロール追従はガタつかない）／新規依存追加なし  
**Constraints**: レトロ表現を維持、可読性優先、モバイル/キーボード操作で破綻しない  
**Scale/Scope**: 1ページ（`/`）の Menu + 各セクションに対する動きの追加（グローバル適用は最小限）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate status (start)**: PASS（新規依存なし／UXを上げる目的でレトロと可読性の両立を狙う）

## Project Structure

### Documentation (this feature)

```text
specs/026-motion-polish/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
src/
├── app/
│  ├── globals.css
│  └── page.tsx
└── components/
   ├── TableOfContents.tsx
   ├── toc.ts
   └── (new) ScrollHud.tsx           # scroll progress + active section highlight (Client)
```

**Structure Decision**: スクロール状態（進捗＋現在セクション）は Client 側で扱う必要があるため、
最小の Client Component を追加して `TableOfContents` と組み合わせる。
既存の Server Component 構成を基本維持し、Client 化は局所化する。

## Phase 0: Outline & Research (output: `research.md`)

- 進捗バーの表現（既存の NES.css / 既存デザインとの整合）を決める
- 現在セクションの判定方法（正確さ/性能/実装コスト）を決める
- “派手”の出し方（押下/ホバー/フォーカス/スクロール）を、可読性を壊さない範囲に制約する
- 低スペック端末でも重くならない更新方法（無駄な再描画を避ける）を決める

## Phase 1: Design & Contracts (output: `data-model.md`, `contracts/`, `quickstart.md`)

- スクロール状態（進捗/現在セクション）の内部データモデルを定義
- 外部APIは無し（contracts は “N/A” を明記）
- Quickstart（検証手順）を用意し、派手演出がUXを壊していないことを確認できるようにする

## Phase 1b: Agent Context Update

- `.specify/scripts/bash/update-agent-context.sh cursor-agent` を実行して、今回の前提（スクロールUI追加）を反映する
