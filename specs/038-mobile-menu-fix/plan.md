# Implementation Plan: Mobile Menu Fix

**Branch**: `038-mobile-menu-fix` | **Date**: 2026-01-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/038-mobile-menu-fix/spec.md`

## Summary

モバイル（640px未満）でメニューバーの上部が見切れる問題を解決するため、ハンバーガーメニューを実装する。デスクトップでは従来の横並びstickyメニューを維持し、モバイルでは右上固定のハンバーガーアイコンとフルスクリーンオーバーレイによるナビゲーションを提供する。

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js 16.0.7, React 19.2.1, Tailwind CSS 3.4.18, NES.css 2.3.0
**Storage**: N/A (静的サイト)
**Testing**: `pnpm lint` + `pnpm build` (E2Eテストなし)
**Target Platform**: Web (モバイル + デスクトップブラウザ)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Lighthouse Performance 90+維持
**Constraints**: NES.cssテーマとの視覚的一貫性、reduced-motion対応必須
**Scale/Scope**: シングルページ、6セクションのナビゲーション

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Personality-First Storytelling | PASS | ナビゲーション改善でコンテンツへのアクセス向上 |
| II. Retro Aesthetic, Modern Usability | PASS | NES.cssスタイルを維持しつつモバイルUXを改善 |
| III. Content Is a Product Surface | PASS | 既存コンテンツへのアクセス改善のみ |
| IV. Lightweight, Fast, and Durable | PASS | 新規依存なし、CSS + minimal JS |
| V. One Source of Truth, Kept in Sync | PASS | UI変更のみ、ドキュメント更新不要 |

**Quality Gates**:
- `pnpm lint`: 実装後に実行
- `pnpm build`: 実装後に実行

**Docs Sync**: 依存関係・スクリプト・ランタイムに変更なし → 更新不要

## Project Structure

### Documentation (this feature)

```text
specs/038-mobile-menu-fix/
├── spec.md              # Feature specification (clarified)
├── plan.md              # This file
├── research.md          # Phase 0 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx                    # メインページ（TableOfContents使用箇所）
│   └── globals.css                 # グローバルスタイル（追加CSSあり）
└── components/
    ├── TableOfContents.tsx         # [MODIFY] メイン変更対象
    ├── MobileMenuButton.tsx        # [NEW] ハンバーガーボタンコンポーネント
    ├── MobileMenuOverlay.tsx       # [NEW] フルスクリーンオーバーレイ
    └── toc.ts                      # TOC_ITEMS定義（変更なし）
```

**Structure Decision**: 既存の`TableOfContents.tsx`を拡張し、モバイル用のサブコンポーネント（`MobileMenuButton`, `MobileMenuOverlay`）を新規作成。Client Componentが必要な部分のみを分離してバンドルサイズを最小化する。

## Complexity Tracking

> 違反なし - シンプルな実装アプローチ

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
