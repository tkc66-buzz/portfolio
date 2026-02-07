# Quickstart: Add CodeZine Article Series

**Branch**: `041-add-codezine-series` | **Date**: 2026-02-07

## Prerequisites

```bash
source ~/.nvm/nvm.sh && nvm use 25.2.0
pnpm install
```

## Changes Summary

This feature makes **1 file change**:

1. **`src/content/portfolio.ts`**
   - Extend `ActivityGroup.name` union: add `"Articles"` between `"Books"` and `"Community"`
   - Add new Articles group entry to `publicPortfolio.activities.groups` array (after Books, before Community)

## Verification

```bash
pnpm lint && pnpm build
```

Then open `http://localhost:3000` → scroll to Activities → verify "Articles" group appears with the CodeZine entry.

## Rollback

Revert the single commit on `041-add-codezine-series` branch. No migrations, no new dependencies, no new files outside specs/.
