# Data Model: 018 – Activities: Achievements (Awards)

## Overview

This feature extends the existing `portfolio.activities.groups` model by adding a new group name `Achievements`.

No new top-level sections are introduced.

## Types (conceptual)

### ActivityItem

- `year`: string (display label; e.g. `"2024"` or `"2019–2025"`)
- `title`: string
- `context?`: string (optional)
- `link?`: `{ label: string; href: string }` (optional)

### ActivityGroup

- `name`: `"Talks" | "Books" | "Community" | "Achievements"`
- `items`: `ActivityItem[]`

### Portfolio.activities

- `id`: `"activities"` (TOC anchor)
- `heading`: string
- `groups`: `ActivityGroup[]`

## Validation / rendering rules

- `items=[]` is allowed; UI must show an explicit empty state (“Coming soon”).
- External links (`href` starting with `http://` or `https://`) must open in a new tab and include `rel="noreferrer"`.
- Group ordering is determined by content order in `portfolio.activities.groups` (no sorting).


