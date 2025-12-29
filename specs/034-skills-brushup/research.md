# Research: Skills Brushup

**Feature**: `034-skills-brushup`  
**Date**: 2025-12-29  

## Decision: Content-first (no new UI mechanics)

- **Decision**: Prioritize improving `skills.categories` content (ordering, wording, consistency) over adding new UI features.
- **Rationale**:
  - The existing UI already communicates “years” and optional usage range.
  - Content quality yields the biggest impact with the lowest risk.
- **Alternatives considered**:
  - Add filtering/sorting UI: higher complexity; not needed for a portfolio-first Skills section.
  - Introduce new scoring systems: risks becoming subjective/unclear vs “years”.

## Decision: Avoid confusing duplicates across categories

- **Decision**: A given skill label should ideally appear in **one** category; if it must appear in multiple, it needs a clear reason and must not confuse readers.
- **Rationale**: Repetition (e.g. TypeScript in Backend + Frontend) can read like drift or redundancy.
- **Alternatives considered**:
  - Keep duplicates and rely on UI: still confusing; undermines “at-a-glance strengths”.

## Decision: Make “top strengths” explicit via ordering

- **Decision**: Ensure the most important skills appear first (both in category ordering and within-category ordering).
- **Rationale**: Visitors scan top-to-bottom; ordering is the simplest way to highlight strengths without additional UI.

