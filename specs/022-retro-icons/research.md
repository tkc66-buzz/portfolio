# Research: Retro Icon Pack (UI icons)

**Feature**: `specs/022-retro-icons/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Use a small curated SVG icon set under `public/assets/pixel/icons/`

- **Chosen**: Hand-authored (or carefully sourced) pixel-style SVG icons committed under `public/assets/pixel/icons/`.
- **Rationale**:
  - No new dependencies; aligns with “Lightweight, Fast, Durable”.
  - SVG scales cleanly and is small.
  - Centralizes assets and avoids “random icons everywhere” drift.
- **Alternatives considered**:
  - Large icon packs (rejected: weight, inconsistent style, licensing uncertainty).
  - Webfont icons (rejected: rendering + accessibility tradeoffs).

### Decision: Render icons via a tiny `PixelIcon` wrapper (uses `next/image`)

- **Chosen**: Introduce `src/components/PixelIcon.tsx` that renders icons from `/public` with consistent sizing and accessibility defaults.
- **Rationale**:
  - Keeps icon usage consistent across sections.
  - Easy to enforce `alt` vs decorative `aria-hidden`.

### Decision: Where icons go (scope)

- **Chosen**:
  - Section headings: Profile/Work/Writing/Activities/Skills/Contact
  - Contact links: Email/GitHub/X/LinkedIn
- **Rationale**: High signal, low noise; improves scanability without cluttering the UI.

## Open Questions

- Exact icon list/visual language (16px vs 24px grid, outline thickness)
- License/source policy if any non-handmade icon is used


