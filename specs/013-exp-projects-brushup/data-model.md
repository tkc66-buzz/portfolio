# Data Model: Experience & Projects Brush-up

**Feature**: `specs/013-exp-projects-brushup/spec.md`  
**Date**: 2025-12-26

## Entities

- **ExperienceHighlight**
  - Fields: `year: string`, `text: string`
  - Notes: `text` may include an Evidence hint that refers to a Project.

- **Project**
  - Fields (relevant): `title: string`, `anchorId?: string`
  - Notes: `anchorId` is used as the in-page `id` for linking.

- **EvidenceReference** (derived)
  - Extracted from `ExperienceHighlight.text`
  - Can resolve to a Project by:
    - Project title (normalized match), or
    - Direct `#anchorId` reference (optional enhancement)

## Relationships / navigation

```text
ExperienceHighlight.text
  └─(parse)─> EvidenceReference (string)
              ├─(match by title)─────> Project.anchorId
              └─(match by #anchorId)─> Project.anchorId
```

## Invariants

- Project `anchorId` values must remain stable once published (deep links).
- If EvidenceReference cannot be resolved, it must render as plain text (non-clickable).
