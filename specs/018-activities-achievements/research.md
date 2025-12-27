# Research: 018 – Activities: Achievements (Awards)

## Decision 1: Where to place awards/achievements

- **Decision**: Add a new `Activities` group named `Achievements`.
- **Rationale**: Minimal UX and data-model change; keeps “proof” content grouped with talks/books/community; avoids adding a new TOC item or section.
- **Alternatives considered**:
  - New top-level section “Achievements” → more prominent, but increases TOC size and splits proof surfaces.
  - Merge into `Projects` → mixes “work output” with “recognition”; less scannable.

## Decision 2: Data shape

- **Decision**: Reuse `ActivityItem` as-is: `{ year, title, context?, link? }`.
- **Rationale**: Awards/achievements fit the existing item model (year + title + optional context/link). No new schema needed.
- **Alternatives considered**:
  - Add structured fields like `issuer`, `category`, `rank` → richer, but premature complexity for a portfolio.

## Decision 3: Naming / UI label

- **Decision**: Use English group label `Achievements` to match existing group names (`Talks`, `Books`, `Community`).
- **Rationale**: Consistent visual hierarchy (uppercase group headers) and minimal code change.
- **Alternatives considered**:
  - `Awards` only → too narrow (achievements can include certifications / selections).
  - Japanese group labels → could be fine, but would diverge from current group naming.

## Decision 4: Private content integration

- **Decision**: Keep authoring for Achievements in `publicPortfolio` (repo) or via existing private JSON patch override.
- **Rationale**: Current Apps Script / spreadsheet exporter supports only `experience` + `projects`. Extending spreadsheet schema is a separate scope increase and can be added later if desired.
- **Alternatives considered**:
  - Extend Apps Script with an `activities` sheet → nice workflow parity, but requires new sheet schema + docs + migration support.


