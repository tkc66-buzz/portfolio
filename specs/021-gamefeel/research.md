# Research: Gamefeel Upgrade (Images/Diagrams + Retro Motion)

**Feature**: `specs/021-gamefeel/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Use static assets + SVG/PNG in `public/assets/` (no external CDNs)

- **Chosen**: Add a small set of curated images/diagrams under `public/assets/` and render them in `WorkSection`.
- **Rationale**:
  - No runtime dependency needed; Vercel serves `public/` efficiently.
  - Keeps “proof” close to the written narrative.
  - Avoids operational complexity (no upload pipeline).
- **Alternatives considered**:
  - External image hosting/CDN (rejected: ops + privacy risk).

### Decision: Prefer `next/image` for raster images; use plain `<img>` for SVG when convenient

- **Chosen**:
  - Use `next/image` for PNG/WebP screenshots or thumbnails (optimization + sizing).
  - Use `<img src="/assets/foo.svg">` for lightweight diagrams/pixel icons (simple and stable).
- **Rationale**:
  - Keeps bundle small; avoids complex SVG import pipelines.

### Decision: Motion is CSS-first + reduced-motion safe

- **Chosen**:
  - Use subtle CSS animations (blink, float, step-based pixel wiggle) with small durations.
  - Gate with `@media (prefers-reduced-motion: reduce)` to disable or reduce to non-animated state.
- **Rationale**:
  - Aligns with constitution: lightweight + usable.
  - Avoids JS-driven scroll animations that can cause jank.
- **Alternatives considered**:
  - Lottie/GSAP (rejected: dependency weight + accessibility complexity).

### Decision: Where visuals go (scope)

- **Chosen**:
  - Add an optional `asset` to each Project in `src/content/portfolio.ts` (thumbnail/diagram).
  - Render a thumbnail area inside each Project card.
  - Add one or two small “gamefeel” touches in Hero/Menu/Work (blink/hover) only.
- **Rationale**: Focus on proof + tasteful polish; avoid turning the site into an effects demo.

## Open Questions (to resolve during implementation)

- Exact asset list: which projects get which diagrams/screenshots first?
- Asset format preference: SVG-only vs mix of SVG + WebP.


