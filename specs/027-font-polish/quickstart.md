# Quickstart: Font polish (retro readability)

**Date**: 2025-12-28  
**Branch**: `027-font-polish`

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify behavior

- **Headings/HUD**
  - Hero / MENU / 各セクション見出しが、本文と明確に違う“レトロ寄り”のフォント表現になっている
- **Body readability**
  - Profile/Work/Activities/Skills/Contact の本文が読みやすい（潰れ/詰まりがない）
- **Fallback**
  - フォントが読み込めない状況でも文字が消えず、代替フォントで内容が読める

### Fallback check (manual)

1. Chrome DevTools → **Network** → “Disable cache” をON
2. DevTools → Command Menu → “Show Network request blocking”
3. `fonts.googleapis.com` / `fonts.gstatic.com` をブロックしてリロード
4. 文字が消えずに表示される（フォールバックで成立する）ことを確認

## Quality gates

```bash
pnpm lint
pnpm build
```


