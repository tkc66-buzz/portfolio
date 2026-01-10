# Quickstart: Mobile Menu Fix

## 概要

モバイル（640px未満）でハンバーガーメニューを実装し、デスクトップでは従来のstickyメニューを維持する。

## 前提条件

- Node.js 25.2.0 (`nvm use 25.2.0`)
- pnpm 10.13.1

## セットアップ

```bash
# ブランチに切り替え
git checkout 038-mobile-menu-fix

# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

## 実装ファイル

| ファイル | 変更種別 | 説明 |
|----------|----------|------|
| `src/components/MobileMenu.tsx` | NEW | モバイルメニューのClient Component |
| `src/components/TableOfContents.tsx` | MODIFY | レスポンシブ分岐追加 |
| `src/app/globals.css` | MODIFY | モバイルメニュー用スタイル追加 |

## テスト手順

### モバイル表示確認

1. `pnpm dev` で開発サーバー起動
2. ブラウザで http://localhost:3000 を開く
3. DevToolsでモバイルビュー（幅 < 640px）に切り替え
4. 確認項目:
   - [ ] 右上にハンバーガーアイコンが表示される
   - [ ] タップでフルスクリーンメニューが開く
   - [ ] メニュー項目タップでセクションに移動しメニューが閉じる
   - [ ] ×ボタンでメニューが閉じる
   - [ ] Escapeキーでメニューが閉じる

### デスクトップ表示確認

1. ブラウザ幅を640px以上に設定
2. 確認項目:
   - [ ] 従来の横並びstickyメニューが表示される
   - [ ] ハンバーガーアイコンは非表示

### エッジケース確認

1. メニュー展開中に画面幅を640px以上に変更
   - [ ] メニューが自動的に閉じる
2. `prefers-reduced-motion: reduce` 設定時
   - [ ] アニメーションが無効化される

## ビルド検証

```bash
# Lint
pnpm lint

# ビルド
pnpm build
```

## 注意事項

- `MobileMenu.tsx` は `"use client"` 宣言必須（状態管理のため）
- NES.cssクラス（`nes-btn`, `is-primary`）を使用してテーマ統一
- z-indexは `z-[100]` でオーバーレイが他の要素の上に表示されるようにする
