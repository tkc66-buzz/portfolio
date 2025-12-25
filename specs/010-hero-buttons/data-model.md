# Data Model: Hero Start/Continue

This feature has no server-side data model changes.

## Client-side state

- **Key**: `localStorage["portfolio:lastHash"]`
- **Value**: `#<section-id>` string (e.g., `#projects`)
- **Validation**:
  - must start with `#`
  - must not be `#` only
  - if missing/invalid, Continue falls back to `#experience`


