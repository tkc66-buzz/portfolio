# Tasks: Mobile Menu Fix

**Input**: Design documents from `/specs/038-mobile-menu-fix/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: No automated tests requested (manual verification via DevTools)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

## User Stories Summary

| Story | Priority | Description |
|-------|----------|-------------|
| US1 | P1 | Mobile User Views Page - ハンバーガーメニュー実装 |
| US2 | P2 | Desktop User Experience Unchanged - 既存動作維持 |

---

## Phase 1: Setup

**Purpose**: CSS基盤の準備（共有インフラ）

- [X] T001 Add mobile menu CSS styles (hamburger icon, overlay) in `src/app/globals.css`

---

## Phase 2: User Story 1 - Mobile User Views Page (Priority: P1) - MVP

**Goal**: モバイル（640px未満）でハンバーガーメニューを表示し、タップでフルスクリーンオーバーレイのナビゲーションメニューを開閉できる

**Independent Test**: DevToolsでモバイルビュー（幅 < 640px）に切り替え、ハンバーガーアイコンの表示とメニュー開閉を確認

### Acceptance Criteria (US1)

1. モバイルでページ表示時、右上にハンバーガーアイコンが表示される
2. アイコンタップでフルスクリーンメニューが開く
3. メニュー項目タップで該当セクションへスクロールしメニューが閉じる
4. ×ボタンまたはEscapeキーでメニューが閉じる
5. メニュー展開中は背景スクロールが無効化される

### Implementation for User Story 1

- [X] T002 [US1] Create MobileMenu Client Component with hamburger button and overlay in `src/components/MobileMenu.tsx`
  - `"use client"` 宣言
  - useState for `isOpen` state
  - ハンバーガーボタン（3本線、タップで×に変形）
  - フルスクリーンオーバーレイ（`.frame` + `.hud` クラス使用）
  - TOC_ITEMSを使用したナビゲーションリンク
  - 閉じるボタン（×）
- [X] T003 [US1] Add accessibility features to MobileMenu in `src/components/MobileMenu.tsx`
  - aria-expanded, aria-controls, aria-label属性
  - role="dialog", aria-modal="true"
  - Escapeキーでメニュー閉じる
  - フォーカストラップ（メニュー内でTabループ）
- [X] T004 [US1] Add scroll lock and resize handling to MobileMenu in `src/components/MobileMenu.tsx`
  - メニュー展開時にbodyへoverflow:hidden適用
  - 画面幅640px以上になったら自動でメニューを閉じる（matchMedia）
- [X] T005 [US1] Add reduced-motion support in `src/app/globals.css`
  - `@media (prefers-reduced-motion: reduce)` でアニメーション無効化

**Checkpoint**: モバイルでハンバーガーメニューが完全に動作する

---

## Phase 3: User Story 2 - Desktop User Experience Unchanged (Priority: P2)

**Goal**: デスクトップ（640px以上）では従来の横並びstickyメニューを維持する

**Independent Test**: ブラウザ幅を640px以上に設定し、従来のメニューバーが表示されることを確認

### Acceptance Criteria (US2)

1. デスクトップでページ表示時、横並びstickyメニューが表示される
2. ハンバーガーアイコンは非表示
3. スクロール時にメニューが画面上部に固定される

### Implementation for User Story 2

- [X] T006 [US2] Update TableOfContents with responsive layout in `src/components/TableOfContents.tsx`
  - デスクトップ用既存UIに `hidden sm:block` を適用
  - MobileMenuコンポーネントをインポート
  - MobileMenuに `sm:hidden` を適用
- [X] T007 [US2] Verify desktop menu unchanged in `src/components/TableOfContents.tsx`
  - 既存のnav#menu構造を維持
  - ScrollHudコンポーネントはデスクトップのみ表示

**Checkpoint**: デスクトップとモバイルの両方で正しいメニューが表示される

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: 品質確認と最終調整

- [X] T008 Run pnpm lint and fix any errors
- [X] T009 Run pnpm build and verify no build errors
- [ ] T010 Manual testing per quickstart.md checklist
  - モバイル表示確認（DevTools）
  - デスクトップ表示確認
  - エッジケース確認（画面リサイズ、reduced-motion）
- [ ] T011 Verify Lighthouse accessibility score is maintained

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup
    └── T001 (CSS styles)
         │
         ▼
Phase 2: User Story 1 (P1) - MVP
    ├── T002 (MobileMenu core)
    ├── T003 (a11y) - depends on T002
    ├── T004 (scroll lock) - depends on T002
    └── T005 (reduced-motion) - parallel with T002-T004
         │
         ▼
Phase 3: User Story 2 (P2)
    ├── T006 (TableOfContents update) - depends on T002
    └── T007 (verify desktop) - depends on T006
         │
         ▼
Phase 4: Polish
    ├── T008 (lint)
    ├── T009 (build)
    ├── T010 (manual test)
    └── T011 (lighthouse)
```

### User Story Dependencies

- **User Story 1 (P1)**: Setup完了後に開始可能。US2に依存しない。
- **User Story 2 (P2)**: US1のMobileMenuコンポーネント作成後に開始可能（T002完了後）。

### Parallel Opportunities

- T001は単独で実行可能
- T002〜T004は順次実行（同一ファイル）、T005は並列可能
- T006〜T007は順次実行（同一ファイル）
- T008〜T011は全て並列可能（異なるコマンド/確認）

---

## Parallel Example: Phase 4

```bash
# Launch all polish tasks together:
pnpm lint &
pnpm build &
# Manual test in separate browser window
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001)
2. Complete Phase 2: User Story 1 (T002-T005)
3. **STOP and VALIDATE**: モバイルでハンバーガーメニューが動作することを確認
4. この時点でモバイルUX改善のMVPは完了

### Full Implementation

1. Setup → User Story 1 → User Story 2 → Polish
2. 各フェーズ完了後に手動テスト
3. 最終的にlint/buildが通ることを確認

---

## Files Changed Summary

| File | Change Type | User Story |
|------|-------------|------------|
| `src/app/globals.css` | MODIFY | US1 |
| `src/components/MobileMenu.tsx` | NEW | US1 |
| `src/components/TableOfContents.tsx` | MODIFY | US2 |

---

## Notes

- [P] tasks = 異なるファイル、依存関係なし
- [Story] label = 特定のユーザーストーリーへのマッピング
- 各ユーザーストーリーは独立して完了・テスト可能
- タスク完了後は論理的なグループでコミット
- いつでもチェックポイントで停止して検証可能
