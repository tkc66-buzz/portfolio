# Quickstart: Year badge readability upgrade (non-Skills)

**Feature**: `specs/025-year-badges/spec.md`  
**Date**: 2025-12-28

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify

1. Open `http://localhost:3000`
2. Check **Work**:
   - The period badge (e.g. `2019–2025`) is readable at a glance
3. Check **Activities**:
   - The year badge (e.g. `2024`) is readable at a glance
4. Confirm **Skills** is unchanged:
   - Skills year/labels remain as-is
5. Check mobile width:
   - Badges do not cause awkward wrapping or collapsed layouts

## Quality gates

```bash
pnpm lint
pnpm build
```


