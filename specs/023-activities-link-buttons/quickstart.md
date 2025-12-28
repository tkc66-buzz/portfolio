# Quickstart: Activities link button sizing unification

**Feature**: `specs/023-activities-link-buttons/spec.md`  
**Date**: 2025-12-28

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify

1. Open `http://localhost:3000`
2. Scroll to **Activities**
3. Confirm link buttons:
   - Have a consistent height and text size
   - Do not wrap to multiple lines even when labels are long
4. Tab through buttons and confirm focus remains visible.

## Quality gates

```bash
pnpm lint
pnpm build
```


