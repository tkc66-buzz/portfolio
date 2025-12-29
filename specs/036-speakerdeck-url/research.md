# Research: Speaker Deck URL

**Feature**: `036-speakerdeck-url`  
**Date**: 2025-12-29  

## Decision: Place the link under Activities → Talks

- **Decision**: Add the Speaker Deck profile URL in the Activities section, within the Talks context.
- **Rationale**: Talks viewers are most likely to want slides next; this minimizes navigation friction.
- **Alternatives considered**:
  - Contact links: too generic; “talk slides” are better grouped with Activities.
  - Writing section: conflates articles with slide decks.
  - Hero: too prominent for a single destination; reduces signal-to-noise.

## Decision: Prefer a content-only implementation

- **Decision**: Add a Talks list entry (data-only) rather than introducing a new UI affordance.
- **Rationale**: Keeps “one source of truth” in `src/content/portfolio.ts` and avoids extra component surface area.

