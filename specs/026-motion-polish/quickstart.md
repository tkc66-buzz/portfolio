# Quickstart: Motion polish (site-wide)

**Date**: 2025-12-28  
**Branch**: `026-motion-polish`

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify behavior

- **Menu/HUD**
  - スクロールすると、Menu付近の進捗表示が変化する
  - スクロール位置に応じて、現在セクションが分かる（強調が切り替わる）
- **Interactions**
  - Menuボタンやリンクをクリック/タップしたとき、入力の受理が分かる
  - キーボード操作でフォーカス移動したとき、フォーカス位置が明確
- **Comfort / Safety**
  - 本文の可読性が落ちていない（動きが邪魔しない）
  - モバイル幅でもHUD/ボタンが崩れない

## Quality gates

```bash
pnpm lint
pnpm build
```


