# Quickstart: Achievement Toast Close Polish

**Feature**: `035-achievement-toast-polish`  
**Date**: 2025-12-29  

## Goal

Verify that closing the Activities “ACHIEVEMENT UNLOCKED” toast feels intentional, does not leave a weird gap, and leaves a subtle “collected” trace.

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

Scroll to **Activities** and watch for the toast.

## Manual checks

### Close behavior

- Click close (×).
- The toast exits in a polished way (or is non-jarring).
- The Activities layout does **not** keep an empty spacer where the toast used to be.

### Post-close indicator

- After closing, a subtle indicator remains (can be ignored; does not steal attention).

### Reduced motion

- With reduced motion enabled, close should not be animation-heavy; behavior remains comfortable.

## Quality gates

```bash
pnpm lint
pnpm build
```

