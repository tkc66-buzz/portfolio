# Research: Portfolio TOC + Section Granularity

## Decisions

### Decision: Use in-page anchors (`#hash`) with stable section IDs

**Rationale**:

- Single-page portfolio navigation is simplest and most durable with fragment links.
- Works without additional routing, data fetching, or dependencies.
- Matches “Lightweight, Fast, and Durable” and keeps `page.tsx` thin.

**Alternatives considered**:

- Separate routes per section: better deep-linking, but increases complexity and maintenance.
- Client-side scroll spy as a requirement: nice-to-have, but not needed for the core value.

### Decision: TOC is a small navigation block near the top (and optional sticky on wide screens)

**Rationale**:

- Primary user intent is “find the right section quickly”.
- TOC should not dominate the hero, and must remain readable on mobile.

**Alternatives considered**:

- Always-sticky sidebar: can be great on desktop, but risks clutter and layout constraints.

### Decision: Accessibility baseline

**Rationale**:

- “Retro Aesthetic, Modern Usability” requires accessible navigation.

**Baseline behaviors**:

- `nav` element with an accessible label (e.g., `aria-label="Table of contents"`).
- Links are keyboard focusable and visibly focused.
- Sections have unique headings and stable `id`s.
- Add `scroll-margin-top` on section containers if a fixed header is introduced later.

## Findings / Notes

- Fragment navigation is simplest when section IDs are short, stable, and semantically named:
  `profile`, `experience`, `projects`, `skills`, `contact`.
- The current components (`About`, `Projects`, `Skills`, `Contact`) are visually fine, but their
  names don’t fully reflect the “role” of the content. Introducing `sections/*` components aligns
  naming with the TOC and improves future maintainability.
