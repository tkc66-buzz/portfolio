# Quickstart: Validate Experience + Projects brush-up

## Goal

Confirm the three known issues are fixed while you enrich Experience and Projects content:

1. Experience year label is readable (not “too small”).
2. Spreadsheet line breaks render as line breaks on the web page.
3. Evidence links in Experience jump to the correct Project.

## Steps (local)

1. Start dev server:
   - `pnpm dev`

2. Update Experience spreadsheet content:
   - Add line breaks to at least one Experience `text` cell.
   - Add an Evidence reference (e.g., ` / Evidence: <Project title>`).

3. Reload the site and validate:
   - Year badge is legible.
   - Line breaks are preserved.
   - Evidence is clickable and jumps to the correct Project entry.

## Negative case

1. Add an Evidence reference that does not match any Project.
2. Confirm Evidence renders as plain text (not a broken link).

## Production-like sanity check

1. Run:
   - `pnpm build`
   - `pnpm start`
2. Confirm the page renders and anchors still work.

