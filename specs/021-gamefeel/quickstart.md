# Quickstart: Gamefeel Upgrade (Images/Diagrams + Retro Motion)

**Feature**: `specs/021-gamefeel/spec.md`  
**Date**: 2025-12-28

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify visuals

1. Open `http://localhost:3000`
2. Scroll to **Work**
3. Confirm at least one Project card shows a visual (diagram/screenshot/pixel icon)
4. Confirm images do not break the layout on mobile width

## Verify motion (accessibility)

1. With normal settings, confirm subtle motion exists (blink/float/hover)
2. Enable reduced motion:
   - macOS: System Settings → Accessibility → Display → Reduce motion
3. Reload and confirm motion is suppressed

## Quality gates

```bash
pnpm lint
pnpm build
```


