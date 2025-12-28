# Data Model: Motion polish (site-wide)

**Date**: 2025-12-28  
**Branch**: `026-motion-polish`

この機能は外部データを持たない（永続化なし）が、UIの一貫性とテスト観点のために内部状態を定義する。

## Entities

### ScrollHudState

- **activeSectionId**: 現在のセクション（`TocItemId` 相当）
- **progressRatio**: ページ全体の進捗（0.0〜1.0）

## Relationships

- `ScrollHudState` は **ページのスクロール位置** と **各セクションの位置** から導出される。
- 永続化はせず、ページ表示中のみ使う。

## Validation / Rules

- `progressRatio` は 0.0〜1.0 にクランプされる
- `activeSectionId` は `toc.ts` の定義（Menu項目）に含まれる値のみ


