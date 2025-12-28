# Data Model: Unified Work section (Company = 1 paragraph + Projects)

**Feature**: `specs/020-unify-exp-projects-vivid/spec.md`  
**Date**: 2025-12-28

## Overview

This feature replaces the split `experience` + `projects` sections with a single `work` section.
The content is authored in-repo (no Spreadsheet operation).

## Entities

### `Portfolio`

- **Change**: Add `work` and remove/stop using `experience` and `projects` in the public UI.
- **Relevant fields** (conceptual):
  - `profile`
  - `work` *(new)*
  - `writing`
  - `activities`
  - `skills`
  - `contact`

### `WorkSection`

- **Fields**:
  - `id`: `"work"` (stable anchor for TOC)
  - `heading`: `"Work"` (or `"Experience"` if we decide to keep label; UI copy decision)
  - `items`: `WorkEntry[]`

### `WorkEntry`

Represents one company/organization block with exactly one main paragraph and nested projects.

- **Fields**:
  - `key`: string (stable React key; can be derived from `company` + `period`)
  - `period`: string (e.g. `"2022–2025"` or `"2024"`; display-only)
  - `company`: string (public-safe label; can be generic if needed)
  - `summary`: string (the single paragraph)
  - `projects`: `WorkProject[]` (nested projects under the company)
  - `tech?`: string[] (optional, short tags)
  - `links?`: { label: string; href: string }[] (optional, public-safe)

### `WorkProject`

Represents one project under a company/organization.

- **Fields**:
  - `title`: string
  - `summary`: string (one-line summary)
  - `role`: string
  - `tech`: string[] (short tags)
  - `outcomeOrLearning`: string
  - `links?`: { label: string; href: string }[] (optional)

## Validation / Rendering Rules

- Each `WorkEntry` MUST render exactly one paragraph from `summary`.
- Each `WorkEntry` MUST render its nested `projects` list (if non-empty).
- Each `WorkProject` MUST render the required fields (title/summary/role/tech/outcomeOrLearning).
- Text MUST wrap safely on mobile (`break-words`, `whitespace-pre-line` if we allow newlines).
- `id="work"` MUST remain stable to avoid breaking in-page navigation.


