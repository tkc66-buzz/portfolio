# Research: Spreadsheet-managed Project Anchor IDs

**Feature**: `specs/015-sheet-anchorid/spec.md`  
**Date**: 2025-12-26

## Current state

- The Apps Script sample (`specs/002-portfolio-private-content/apps-script/Code.gs`) currently exports Projects from a sheet with headers:
  - `visibility,title,summary,role,tech,outcomeOrLearning,status,linkLabel,linkHref`
- The UI supports Evidence links from Experience to Projects, including `#anchorId` references.
- Projects cards already render with `id={project.anchorId}` when `anchorId` is present.

## Decision

Add a stable `anchorId` column to the spreadsheet `projects` sheet and propagate it through the private JSON patch:

- Spreadsheet `projects` adds `anchorId` column
- Apps Script exports `projects.items[].anchorId` (optional)
- Authoring convention: Experience Evidence should prefer ` / Evidence: #<anchorId>`
- Keep best-effort compatibility for title-based Evidence

## Rationale

- Title-based linking is fragile (edits, whitespace, localization).
- Stable IDs are the simplest, dependency-free solution and align with “proof via anchors”.
- Works with public and private items without exposing company names.

## Alternatives considered

- Encode evidence references by title only:
  - Rejected: brittle and creates ongoing maintenance.
- Add a separate “projectId” field and transform into anchorId:
  - Overkill: `anchorId` already exists and is the correct target for in-page navigation.

