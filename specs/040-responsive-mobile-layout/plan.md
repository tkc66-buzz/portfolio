# Implementation Plan: Responsive Mobile Layout

**Branch**: `040-responsive-mobile-layout` | **Date**: 2026-02-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/040-responsive-mobile-layout/spec.md`

## Summary

ポートフォリオサイトがモバイル画面幅（320px〜414px）で表示崩れを起こしている。Tailwindのモバイルファーストアプローチに統一し、NES.cssコンポーネントにレスポンシブオーバーライドを追加し、全セクションのパディング・フォントサイズ・ボタン配置をモバイル最適化する。新規依存なし、既存のTailwind CSSユーティリティ + globals.cssの最小限オーバーライドで対応。

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 25.2.0
**Primary Dependencies**: Next.js 16.0.7, React 19.2.1, Tailwind CSS 3.4.18, NES.css 2.3.0
**Storage**: N/A (静的サイト)
**Testing**: `pnpm lint` + `pnpm build` (手動ブラウザ検証)
**Target Platform**: Web (320px〜1920px+、モバイルファースト)
**Project Type**: Web (Next.js App Router, single project)
**Performance Goals**: レイアウトシフトなし、CLS < 0.1
**Constraints**: 新規依存なし、デスクトップレイアウトの視覚的変化なし、NES.css retro aesthetic維持
**Scale/Scope**: 単一ページポートフォリオ、11ファイルの変更

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design Check (PASSED)

| Principle | Status | Rationale |
|-----------|--------|-----------|
| **I. Personality-First Storytelling** | PASS | モバイルでもストーリーが正しく伝わるようにする改善 |
| **II. Retro Aesthetic, Modern Usability** | PASS | まさにこの原則の実現：レトロ見た目 + モダンなレスポンシブUX。憲法で「"Retro" MUST NOT be used as an excuse for poor usability」と明記 |
| **III. Content Is a Product Surface** | PASS | コンテンツ変更なし。表示改善のみ |
| **IV. Lightweight, Fast, and Durable** | PASS | 新規依存なし。CSSユーティリティクラスの変更のみ。「Performance regressions MUST be treated as user-facing bugs (especially for mobile)」 |
| **V. One Source of Truth, Kept in Sync** | PASS | UXに影響する変更のため、README/AGENTS/CLAUDE.mdの更新が必要 |

**Quality Gates**:
- `pnpm lint`: Must pass
- `pnpm build`: Must pass

**Docs Sync**: Required — top-level UX behavior changes (responsive layout)

### Post-Design Check (PASSED)

No new dependencies, no architectural changes. CSS overrides in globals.css are minimal and scoped. All changes use existing Tailwind utilities. Desktop layout preserved via mobile-first progressive enhancement.

## Project Structure

### Documentation (this feature)

```text
specs/040-responsive-mobile-layout/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: responsive strategy research
├── data-model.md        # Phase 1: breakpoint/layout model
├── quickstart.md        # Phase 1: developer quickstart
├── contracts/           # Phase 1: component responsive contracts
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (files to modify)

```text
src/
├── app/
│   ├── page.tsx              # Page container padding
│   ├── globals.css           # NES.css overrides, mobile menu, Work RPG
│   └── layout.tsx            # (no changes expected)
├── components/
│   ├── Hero.tsx              # Hero padding, font sizes, image size
│   ├── TableOfContents.tsx   # Menu button sizing, breakpoint
│   ├── MobileMenu.tsx        # Overlay padding
│   └── sections/
│       ├── WorkQuestLog.tsx   # Badge overflow
│       ├── SkillsSection.tsx  # Label + progress bar
│       ├── ActivitiesSection.tsx # Grid + badge layout
│       ├── WritingSection.tsx # Button group stacking
│       └── ContactSection.tsx # Button group stacking
```

**Structure Decision**: Single Next.js project. All changes are in existing files — no new files needed except spec artifacts.

## Complexity Tracking

> No constitution violations.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |
