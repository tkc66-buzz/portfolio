# Research: 006 – Activities (Talks / Books / Community)

## Decision 1: Split vs merge with Writing

- **Decision**: Split (recommended default)
  - Keep `Writing` for blog/articles.
  - Add `Activities` for talks/books/community.
- **Rationale**: Current TOC has 6 items, so adding one more stays within the “8 items” guideline while keeping semantics clear.
- **Alternatives considered**:
  - Merge into “Writing & Activities” → fewer TOC items, but the section becomes larger and less scannable.

## Decision 2: Data shape for Activities

- **Decision**: Grouped list: Talks / Books / Community
- **Rationale**: Readers scan by category; each item can remain minimal and NDA-safe.
- **Alternatives considered**:
  - One flat list with tags → more flexible but noisier and harder to scan.

## Decision 3: External link safety

- **Decision**: External links open in new tab with `rel="noreferrer"`.
- **Rationale**: Matches existing safety pattern in the repo and avoids referrer leakage/tabnabbing patterns.
