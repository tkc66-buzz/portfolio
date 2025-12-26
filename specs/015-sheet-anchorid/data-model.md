# Data Model: Spreadsheet-managed Project Anchor IDs

**Feature**: `specs/015-sheet-anchorid/spec.md`  
**Date**: 2025-12-26

## Entities

- **Project (Spreadsheet row)**:
  - Key fields: `title`, `anchorId` (new), plus existing public/private fields

- **Project (Portfolio JSON patch)**:
  - Key fields: `title`, `anchorId?`

- **Evidence Reference (derived from Experience text)**:
  - Preferred form: `#anchorId`
  - Legacy form: project title (best-effort)

## Relationships / flow

```text
Spreadsheet (projects sheet)
  └─(Apps Script normalizeProjects_)─> Private JSON patch (Partial<Portfolio>)
        └─(getPortfolio merge)─> projects.items[].anchorId
              └─(ProjectsSection)─> <article id={anchorId}>
                    └─(ExperienceSection Evidence)─> href="#{anchorId}"
```

## Invariants

- `anchorId` must be stable once published (deep links).
- `anchorId` should be URL-fragment-safe (letters/numbers/hyphens).
- If `anchorId` is missing/invalid/duplicated, the UI must fail gracefully (Evidence becomes plain text).

