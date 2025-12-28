# Quickstart: Unified Work section + Vivid UI

**Feature**: `specs/020-unify-exp-projects-vivid/spec.md`  
**Date**: 2025-12-28

## Prerequisites

- Node.js (repo requirement), pnpm

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Verify behavior

1. Open `http://localhost:3000`
2. Confirm TOC includes **Work** and no longer shows **Experience** / **Projects**
3. Scroll to **Work**:
   - Each company block shows **period + company + 1 paragraph**
   - Each company also shows nested **Projects** (title/summary/role/tech/result)
   - Layout wraps cleanly on mobile width
4. Confirm no Spreadsheet/Apps Script env vars are required:
   - Without `.env.local`, the page still renders with repo content

## Edit content

- Update `src/content/portfolio.ts` → `publicPortfolio.work.items`

## Quality gates

```bash
pnpm lint
pnpm build
```


