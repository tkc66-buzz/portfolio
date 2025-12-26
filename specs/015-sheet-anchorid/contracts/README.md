# Contracts: Spreadsheet schema + Private JSON patch for `anchorId`

**Feature**: `specs/015-sheet-anchorid/spec.md`  
**Date**: 2025-12-26

## Spreadsheet schema (projects sheet)

### Required / existing columns

- `visibility` (`public` or `private`; optional, defaults to `public`)
- `title`
- `summary`
- `role`
- `tech` (comma-separated)
- `outcomeOrLearning`
- `status`
- `linkLabel`
- `linkHref`

### New column (this feature)

- `anchorId` (optional but strongly recommended)

### `anchorId` rules

- Must be unique within the sheet.
- Must be stable once used publicly.
- Should be URL-fragment-safe: `^[a-z0-9-]+$` (lowercase, numbers, hyphen).

## Private JSON patch contract (Projects)

Apps Script must export Projects items as a `Partial<Portfolio>` patch including:

- `projects: { items: [{ ..., anchorId?: string }] }`

Notes:

- `anchorId` is optional for backward compatibility; when missing, linking falls back to title-based Evidence (best-effort).
- Invalid `anchorId` must not crash the site; Evidence should render as plain text.

## Detail authoring contract (Experience)

Preferred Detail format:

- ` / Detail: #<anchorId>`

Legacy (best-effort) formats:

- ` / Detail: <Project title>`
- ` / Evidence: #<anchorId>`
- ` / Evidence: <Project title>`

