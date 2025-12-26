# Quickstart: Add `anchorId` to Projects spreadsheet and use `#anchorId` Evidence

## Goal

Make Experience → Projects Evidence linking stable by authoring a Project `anchorId` in the spreadsheet and referencing it from Experience as:

- ` / Evidence: #<anchorId>`

## 1) Update the Google Sheet schema

In the `projects` sheet header row, add:

- `anchorId`

Recommended: keep `anchorId` near `title`.

## 2) Choose stable anchorIds

- Use lowercase + numbers + hyphens: `project-go-migration`
- Never change an `anchorId` once it’s published.
- Ensure uniqueness across all projects in the sheet.

## 3) Update Apps Script (Code.gs) and redeploy

Update `specs/002-portfolio-private-content/apps-script/Code.gs` so `normalizeProjects_` includes `anchorId` in each project item when present.

After editing Apps Script, redeploy the Web App (otherwise old code may keep serving).

## 4) Author Evidence in Experience

In the `experience` sheet `text` cells, use:

- ` / Evidence: #<anchorId>`

Example:

- `... / Evidence: #project-go-migration`

## 5) Verify

1. Start local dev: `pnpm dev`
2. Reload the site and click the Evidence link.
3. Confirm it scrolls to the correct Project card.

