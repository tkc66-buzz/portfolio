# Data Model: Local Dev Experience Freshness

**Feature**: `specs/012-local-dev-no-fetch-cache/spec.md`  
**Date**: 2025-12-26

## Key entities

- **Portfolio (public)**: The baseline, committed content shipped with the repo.
- **Portfolio Patch (private override)**: Optional overrides loaded at runtime and merged into the public portfolio.
- **Experience Section**: The content rendered by `ExperienceSection`, sourced from the merged portfolio.
- **Experience Highlight**: A single timeline item rendered in Experience (e.g., `{ year, text }`).
- **Projects Section (supporting)**: Used by Experience to link “Evidence” strings to project anchors.
- **Experience Data Source**: The external canonical source for Experience (currently a spreadsheet-backed endpoint).
- **Runtime Mode**: Development vs production mode, used to apply different freshness policies.

## Relationships / flow

```text
Experience Data Source
   │
   ├─(fetch / parse)─> Portfolio Patch (private override)
   │                      │
   │                      ├─(merge)─> Portfolio (merged)
   │                      │             │
   │                      │             └─> Experience Section / Projects Section render
   │                      │
   │                      └─(freshness policy depends on Runtime Mode)
   │
Public Portfolio (committed)
```

## Freshness policy (by runtime mode)

- **Development**:
  - Freshness is prioritized: the next page reload should reflect the latest data source state.
  - Caching for the private patch retrieval path is disabled.

- **Production**:
  - Existing caching behavior remains in effect (revalidate-based window).
  - The feature must not broaden its scope to force “always fresh” production behavior.

## External data notes (high level)

- The private patch endpoint returns a JSON object that can partially override portfolio fields (e.g., Experience and Projects).
- The patch is validated before merging; invalid patches are ignored and the site falls back to public content.

