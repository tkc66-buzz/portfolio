# Quickstart: Section typography size upgrade

**Feature**: `specs/024-section-typography/spec.md`  
**Date**: 2025-12-28

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify

1. Open `http://localhost:3000`
2. Check section body copy (Profile/Work/Writing/Activities/Skills/Contact):
   - Paragraph text is visibly larger than before (aim: `text-base` default)
   - Dense UI (badges/buttons) remains readable and not oversized
3. Check mobile width:
   - Lines wrap naturally (no overflow)
   - No layout shift from typography changes

## Quality gates

```bash
pnpm lint
pnpm build
```


