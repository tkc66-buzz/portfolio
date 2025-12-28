# Research: Unify Experience + Projects (No Spreadsheet) + Vivid UI

**Feature**: `specs/020-unify-exp-projects-vivid/spec.md`  
**Date**: 2025-12-28

## Decisions

### Decision: Replace Experience + Projects with a single `work` section

- **Chosen**: Add `portfolio.work` and render it with a new `src/components/sections/WorkSection.tsx`.
  Work is company/organization-based (1 paragraph per company) and can contain Projects under each company. Remove (or stop rendering) `ExperienceSection` and `ProjectsSection`.
- **Rationale**:
  - The current split requires cross-linking and creates maintenance overhead.
  - “会社ごとに1文章” maps naturally to a single list of company blocks.
  - Improves first-time visitor comprehension (<2 minutes) by reducing navigation complexity.
- **Alternatives considered**:
  - Keep split and strengthen linking (rejected: user explicitly wants unified, and linking was a repeated failure point).

### Decision: Stop spreadsheet operation by disabling URL-based private content

- **Chosen**: Treat Spreadsheet/Apps Script integration as out-of-scope for operation:
  - Remove/disable `PORTFOLIO_PRIVATE_SOURCE="url"` path (so no Google Sheet fetch is expected).
  - Keep the site fully functional with repo-committed content only.
  - (Optional) Keep `PORTFOLIO_PRIVATE_JSON` for local/private overrides, but not required for normal use.
- **Rationale**:
  - Reduces operational complexity and avoids “silent fallback” confusion.
  - Aligns with safety: fewer external moving parts and fewer accidental disclosures.
- **Alternatives considered**:
  - Keep URL mode but document as “not used” (rejected: code path remains a footgun and source of confusion).

### Decision: Make the UI more vivid by adjusting palette + accents, not by adding new dependencies

- **Chosen**:
  - Increase color contrast of accents (titles, links, badges) and add an additional “highlight” accent color.
  - Keep NES.css visual language; adjust Tailwind/CSS variables and a few component classes.
  - Avoid new runtime dependencies (no theme libs).
- **Rationale**:
  - Maintains retro aesthetic and modern usability (constitution).
  - Low risk: mostly CSS / class changes.
- **Alternatives considered**:
  - Introduce new theming dependency (rejected: violates “Lightweight, Fast, Durable” without strong need).
  - Use heavy animated backgrounds (rejected: readability/perf risk on mobile).

## Clarifications Resolved

- “Experience と Projects を一つにする” → new single section `work` (TOC item `Work`)
- “一社毎に1つの文章” → per-company item has exactly one main paragraph field; optional metadata (period/tech/links) allowed but not required
- “見た目を鮮やかに” → palette/accents and hierarchy improvements while keeping text readability and retro framing


