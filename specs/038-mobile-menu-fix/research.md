# Research: Mobile Menu Fix

**Date**: 2026-01-10
**Feature**: 038-mobile-menu-fix

## 1. 現状のアーキテクチャ分析

### 1.1 TableOfContents.tsx の構造

```
TableOfContents (Server Component)
├── nav#menu (sticky, top: var(--menu-top))
│   ├── h2 "MENU"
│   ├── ScrollHud (Client Component) - プログレスバー + ステージ表示
│   └── ul (横スクロール可能なボタンリスト)
│       └── li × 6 (profile, work, writing, activities, skills, contact)
```

**現在の問題点**:
- モバイルで `--menu-top: 0.75rem` (12px) が小さすぎてメニュー上部が見切れる
- sticky固定のため、スクロール時に常にビューポート上部を占有

### 1.2 関連コンポーネント

| Component | Type | 役割 |
|-----------|------|------|
| `TableOfContents.tsx` | Server | メニューUI全体 |
| `ScrollHud.tsx` | Client | スクロール進捗 + アクティブセクション追跡 |
| `toc.ts` | Shared | TOC_ITEMS定義、tocHref関数 |
| `startGate.ts` | Shared | PRESS START状態管理の定数 |

### 1.3 スタイルシステム

- **NES.css**: `nes-btn`, `is-primary`, `is-small` クラス
- **カスタムCSS**: `.frame`, `.hud`, `.btn-game`, `.toc-active`
- **Tailwind**: レスポンシブ (`sm:`, `md:`)、色 (`text-fami-gold`, `bg-fami-ivory`)

## 2. ハンバーガーメニュー実装パターン

### Decision: コンポーネント分割アプローチ

**選択**: Client Componentの最小化 + Server Componentの維持

**Rationale**:
- Next.js App Routerではデフォルトでサーバーレンダリングを活用
- インタラクティブ部分（ハンバーガー開閉）のみをClient Componentに分離
- バンドルサイズ・初期レンダリングの最適化

**Alternatives considered**:
1. TableOfContents全体をClient Componentに変換 → バンドルサイズ増加、不採用
2. CSS-onlyハンバーガー（:checked hack）→ アクセシビリティ課題、不採用

### Decision: 状態管理

**選択**: useState + useEffect (ローカルステート)

**Rationale**:
- メニューの開閉状態はページ全体に影響しない
- 単純なboolean状態のみ
- 外部ライブラリ不要

**Alternatives considered**:
1. Context API → オーバーエンジニアリング、不採用
2. URL state (hash) → ナビゲーション履歴を汚す、不採用

### Decision: オーバーレイ実装

**選択**: Portal不使用、z-index管理

**Rationale**:
- NES.cssテーマの`.frame`ボーダーをオーバーレイでも維持したい
- body直下へのPortalは不要（既存のz-indexスケールで十分）
- 背景スクロールロックは`overflow: hidden`をbodyに適用

**Alternatives considered**:
1. React Portal → DOMツリーから切り離されるとスタイリング複雑化、不採用

## 3. NES.cssとの統合

### 3.1 ハンバーガーアイコン

NES.cssにはハンバーガーアイコンが組み込まれていないため、以下のアプローチを採用:

**選択**: CSSカスタム実装（3本線 → ×変形）

```css
/* 3本線のピクセルアート風アイコン */
.hamburger-line {
  height: 4px;
  background: currentColor;
  transition: transform 150ms steps(2, end);
}
```

**Rationale**:
- NES.cssのピクセルアート美学に合致
- 追加画像不要（SVG/画像なし）
- アニメーションは`steps()`で8bit感を維持

### 3.2 オーバーレイスタイル

**選択**: `.frame` + `.hud` クラスを再利用 + フルスクリーン化

```tsx
<div className="fixed inset-0 z-[100] frame hud bg-[#1b1b1b]">
  {/* メニューコンテンツ */}
</div>
```

**Rationale**:
- 既存のゲーム風スタイルとの一貫性
- ボーダー・シャドウ・スキャンライン効果を継承

## 4. アクセシビリティ要件

### 4.1 キーボードナビゲーション

| キー | 動作 |
|------|------|
| `Escape` | メニューを閉じる |
| `Tab` | メニュー項目間をフォーカス移動 |
| `Enter/Space` | メニュー項目を選択 |

### 4.2 ARIAマークアップ

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label="メニューを開く"
>
  {/* ハンバーガーアイコン */}
</button>

<nav
  id="mobile-menu"
  role="dialog"
  aria-modal="true"
  aria-label="ナビゲーションメニュー"
>
  {/* メニューコンテンツ */}
</nav>
```

### 4.3 フォーカストラップ

メニュー展開中はフォーカスをオーバーレイ内に閉じ込める:
- 最初のフォーカス可能要素（閉じるボタン）にフォーカス
- `Tab`でメニュー内を循環
- メニュー外へのフォーカス移動を防止

## 5. Reduced Motion対応

既存パターン（`globals.css`）に従う:

```css
@media (prefers-reduced-motion: reduce) {
  .hamburger-line {
    transition: none !important;
  }
  .mobile-menu-overlay {
    animation: none !important;
  }
}
```

## 6. 画面リサイズ対応

**Edge Case**: メニュー展開中に画面幅が640px以上に変わった場合

**選択**: 自動的にメニューを閉じてデスクトップUIに移行

```tsx
useEffect(() => {
  const mq = window.matchMedia("(min-width: 640px)");
  const handler = (e: MediaQueryListEvent) => {
    if (e.matches && isOpen) setIsOpen(false);
  };
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, [isOpen]);
```

## 7. コンポーネント設計

### 最終構造

```
src/components/
├── TableOfContents.tsx      # [MODIFY] レスポンシブ分岐を追加
├── MobileMenu.tsx           # [NEW] Client Component - 状態管理 + オーバーレイ
├── MobileMenuButton.tsx     # [NEW] ハンバーガーボタン（MobileMenuから分離も可能だが、一体化がシンプル）
├── ScrollHud.tsx            # [NO CHANGE]
└── toc.ts                   # [NO CHANGE]
```

### 実装フロー

1. `MobileMenu.tsx` を新規作成
   - `"use client"` 宣言
   - useState for `isOpen`
   - ハンバーガーボタン + フルスクリーンオーバーレイ
   - 既存のTOC_ITEMSを使用

2. `TableOfContents.tsx` を更新
   - デスクトップ: 既存UIを `hidden sm:block` で表示
   - モバイル: `MobileMenu` を `sm:hidden` で表示

3. `globals.css` に追加スタイル
   - `.mobile-menu-overlay` のアニメーション
   - `.hamburger-icon` のスタイル

## 8. 技術的決定サマリー

| 決定事項 | 選択 | 根拠 |
|----------|------|------|
| コンポーネント分割 | Client最小化 | バンドルサイズ最適化 |
| 状態管理 | useState | シンプルで十分 |
| ハンバーガーアイコン | CSS実装 | NES.css風ピクセルアート |
| オーバーレイ | z-index管理 | Portal不要 |
| アニメーション | steps() | 8bit感維持 |
| フォーカストラップ | カスタム実装 | 依存追加なし |
