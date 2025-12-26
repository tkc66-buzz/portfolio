# Research: Local Dev Experience Freshness

**Feature**: `specs/012-local-dev-no-fetch-cache/spec.md`  
**Date**: 2025-12-26

## Context

The portfolio loads optional “private content” patches via `getPortfolio()` in `src/content/portfolio.ts`.
Experience (and other sections) consume `getPortfolio()` from Server Components. Today, the private patch
loader uses `unstable_cache(..., { revalidate })` to cache the resolved patch for a configured window.

In local development, this caching can make spreadsheet-driven Experience edits feel “stuck” until caches
expire or the process/browser is restarted.

## Decision

**In local development mode, disable caching for the private patch retrieval path.**

Concretely:

- **Bypass** the `unstable_cache(...)` wrapper in development (call the underlying fetch function directly), and/or
- Force the cache window to “no caching” in development (e.g., treat `revalidate` as `0`), and
- Ensure the underlying GET requests are not served from stale caches in development.

## Rationale

- Meets the spec’s primary goal: “edit Experience data source → normal reload shows change.”
- Centralized: private patch logic lives in one place, minimizing surface area and risk.
- Production safety: keep existing `revalidate` behavior unchanged outside development.
- Lightweight: no new dependencies, no UI changes.

## Alternatives considered

- **Set `PORTFOLIO_PRIVATE_REVALIDATE_SECONDS=0` locally**:
  - Pros: simple configuration.
  - Cons: still an extra manual step; easy to forget; does not guarantee underlying request freshness.
- **Cache-busting query params** on the content URL:
  - Pros: strong freshness.
  - Cons: leaks into logs/URLs; could interact badly with redirect chains; more invasive.
- **Global “force dynamic” at page level**:
  - Pros: simple.
  - Cons: broader blast radius than needed; can affect other content/sections unnecessarily.

## Notes / Implementation guidance

- Prefer the smallest change point: `src/content/portfolio.ts` where `unstable_cache` is applied.
- Keep “production behavior unchanged” as a hard gate.

