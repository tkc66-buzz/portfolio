# Contracts: Assets + Motion (internal)

**Feature**: `specs/021-gamefeel/spec.md`  
**Date**: 2025-12-28

## Purpose

Define an internal authoring contract for attaching visual assets to Projects.
No external APIs are introduced by this feature.

## Project asset contract

If `project.asset` is present:

- `asset.src` MUST be a path under `public/` (served by Next.js), e.g. `"/assets/diagrams/foo.svg"`
- `asset.alt` MUST be present and meaningful
- `asset.kind` MUST be one of: `diagram | screenshot | pixel-art`
- For raster (`kind=screenshot` typically), `asset.width` and `asset.height` SHOULD be provided if rendered via `next/image`

### Asset size guidance (guardrails)

- Prefer **SVG** for diagrams (small, scalable).
- If using raster images:
  - Prefer **WebP** and keep file size small (rule of thumb: < 200KB per image).
  - Avoid embedding sensitive data (names, IDs, internal screenshots).

## Reduced motion contract

- Any animation MUST be disabled or reduced when `prefers-reduced-motion: reduce` is active.


