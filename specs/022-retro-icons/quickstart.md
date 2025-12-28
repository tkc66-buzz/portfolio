# Quickstart: Retro Icon Pack

**Feature**: `specs/022-retro-icons/spec.md`  
**Date**: 2025-12-28

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify

1. Open `http://localhost:3000`
2. Confirm section headings show pixel icons:
   - Profile / Work / Writing / Activities / Skills / Contact
3. Confirm Contact link list shows icons and remains readable on mobile.
4. Enable a screen reader and ensure decorative icons are not announced.

## Quality gates

```bash
pnpm lint
pnpm build
```


