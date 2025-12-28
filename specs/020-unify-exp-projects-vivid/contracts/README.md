# Contracts: Public content authoring (Work + nested Projects)

**Feature**: `specs/020-unify-exp-projects-vivid/spec.md`  
**Date**: 2025-12-28

## Purpose

Define the minimal authoring contract for the unified `work` section.
This is an internal contract (repo-authored content), designed to keep the UI stable.

## `work` contract (repo-authored)

- `portfolio.work.id` MUST be `"work"`
- `portfolio.work.heading` SHOULD be `"Work"`
- `portfolio.work.items` is an array of company blocks

Each item:

- MUST have a `period` string (display-only)
- MUST have a `company` string (public-safe label)
- MUST have a `summary` string (the single paragraph shown for that company)
- MAY have `projects` (nested under the company)
- MAY have:
  - `tech`: string[]
  - `links`: `{ label: string; href: string }[]`

If `projects` is present, each project:

- MUST have `title`
- MUST have `summary` (one-line)
- MUST have `role`
- MUST have `tech` (string[])
- MUST have `outcomeOrLearning`
- MAY have `links`

## Non-goals

- No Spreadsheet/Apps Script schema
- No URL-based private patch contract for this feature


