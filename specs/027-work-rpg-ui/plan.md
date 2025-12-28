# Implementation Plan: Work RPG UI (status + quest log)

**Branch**: `027-work-rpg-ui` | **Date**: 2025-12-28 | **Spec**: `specs/027-work-rpg-ui/spec.md`
**Input**: Feature specification from `specs/027-work-rpg-ui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Work セクションだけを「RPGのステータス画面 + クエストログ」風UIにし、他セクションとは明確に違う“見どころ画面”を作る。  
実装は Server Component を基本とし、**クエスト選択（一覧→詳細）だけを Client Component に閉じ込める**ことで、性能/保守性/憲法（Server優先）を守る。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3.4, NES.css 2.3  
**Storage**: N/A（コンテンツは `src/content/portfolio.ts` の静的データ + env patch）  
**Testing**: N/A（現状は lint/build で担保）  
**Target Platform**: Vercel（Node.js 20+）/ modern browsers
**Project Type**: Web（Next.js App Router, `src/`）  
**Performance Goals**: モバイルで軽快。Workの演出を入れても CLS/入力遅延が悪化しない  
**Constraints**: 追加依存なし（CSS + 既存コンポーネントで実現）、動きは reduced-motion に従う  
**Scale/Scope**: Work セクション内のみ UI を差別化（他セクションへ波及させない）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: Work を Proof surface として強化し、レトロ雰囲気 + 現代UXを両立する（可読性・アクセシビリティ・レスポンシブ）。
- Quality gates: `pnpm lint` と `pnpm build` が通る。
- Docs sync: 依存/スクリプト/ランタイム/デプロイ/トップレベルUXに変更があれば `README.md` / `AGENTS.md` / `CLAUDE.md` を同期更新。

**Gate Status (pre-research)**: PASS（想定変更は Work セクションの表現と小さな Client Component 追加のみ）

## Project Structure

### Documentation (this feature)

```text
specs/027-work-rpg-ui/
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
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ScrollHud.tsx
│   ├── TableOfContents.tsx
│   ├── PixelIcon.tsx
│   └── sections/
│       └── WorkSection.tsx
└── content/
    └── portfolio.ts
```

**Structure Decision**: 既存の Next.js App Router 構造に沿い、Workの見た目/インタラクションは `src/components/sections/WorkSection.tsx`（+必要なら小さなClientコンポーネント）と `src/app/globals.css` の追加スタイルで閉じる。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0 — Research (decisions to lock)

### Unknowns / decisions to resolve

- UI構造: ステータス画面（stats panel）とクエストログ（list）と詳細（detail）のレイアウト構成
- インタラクション: クリック/タップで詳細表示、初期選択（先頭 or “おすすめ”）
- アクセシビリティ: キーボード操作（button/aria-selected/aria-controls）、フォーカスリング
- Motion: “奇抜”な演出の範囲と reduced-motion 時の振る舞い
- 実装境界: Server Component を維持しつつ、どこまで Client にするか（最小化）

### Output

- `specs/027-work-rpg-ui/research.md` に Decision/Rationale/Alternatives を整理

## Phase 1 — Design & Contracts

### Data model

- “見た目用”の view model を `data-model.md` に定義（既存 `Portfolio.work` を変えずに derived data を作る）

### Contracts

- 外部/内部APIの追加はしない（`contracts/README.md` で明示）

### Quickstart

- `quickstart.md`: dev 起動、Work UI確認、操作確認、reduced-motion確認、lint/build確認

## Phase 1 — Agent context update

- `.specify/scripts/bash/update-agent-context.sh cursor-agent` を実行

## Re-check Constitution (post-design)

- Work以外の見た目に影響していないか
- 可読性/アクセシビリティが保たれているか
- 追加依存なし
