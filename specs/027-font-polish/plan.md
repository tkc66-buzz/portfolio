# Implementation Plan: Font polish (retro readability)

**Branch**: `027-font-polish` | **Date**: 2025-12-28 | **Spec**: `specs/027-font-polish/spec.md`
**Input**: Feature specification from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/027-font-polish/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

見出し（Hero/各セクション見出し/HUD）を“よりレトロ”なフォント表現に寄せつつ、本文の可読性は維持する。
フォント適用範囲はトークン化して一貫性を保ち、フォント読み込み失敗時もフォールバックで破綻しない構成にする。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css, `next/font`  
**Storage**: N/A  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: 文字が消えない（FOIT回避）／レイアウト崩れを最小化／新規依存追加なし  
**Constraints**: レトロ雰囲気を強めつつ、本文の可読性（日本語）を落とさない／公開リポジトリとしてライセンス安全  
**Scale/Scope**: Typographyのみ（見出し・HUD・本文のフォント/トークン）

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate status (start)**: PASS（UX向上・可読性維持・軽量維持に合致。依存追加が必要ならDocs sync対象）

## Project Structure

### Documentation (this feature)

```text
specs/027-font-polish/
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
│  ├── layout.tsx        # fonts import + root font variables
│  └── globals.css       # typography tokens
└── components/
   └── sections/
      ├── *Section.tsx   # headings (display font) + body (readable font)
```

**Structure Decision**: `next/font` でフォントを読み込み、CSS変数（トークン）として `globals.css` へ公開する。
コンポーネント側は “トークン参照” のみでフォントを指定し、個別にフォント名を直書きしない。

## Phase 0: Outline & Research (output: `research.md`)

- NES.css推奨フォントの候補整理（英字/日本語）と、公開リポジトリとして安全な採用方針を確定する
- FOIT/FOUT回避とフォールバック戦略（表示が消えない）を決める
- 見出しと本文の “役割分離” を壊さない適用範囲（どこをdisplay fontにするか）を決める

## Phase 1: Design & Contracts (output: `data-model.md`, `contracts/`, `quickstart.md`)

- タイポグラフィトークン（`--font-body`, `--font-display`, etc.）を定義し、適用ルールを明文化
- 外部APIなし（contracts は “N/A”）
- Quickstartで「見出しがレトロ・本文が読みやすい・フォールバックが効く」を検証できる手順を書く

## Phase 1b: Agent Context Update

- `.specify/scripts/bash/update-agent-context.sh cursor-agent` を実行して、今回の前提（フォント/トークン）を反映する

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
