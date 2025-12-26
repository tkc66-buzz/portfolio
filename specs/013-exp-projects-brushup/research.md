# Research: Experience & Projects Content Brush-up

**Feature**: `specs/013-exp-projects-brushup/spec.md`  
**Date**: 2025-12-26

## Decision 1 — Preserve spreadsheet line breaks safely

**Decision**: Render Experience text using CSS whitespace preservation (e.g., `white-space: pre-line`) rather than injecting HTML.

**Rationale**:

- Spreadsheet text may include `\n`/`\r\n`, which normal HTML flow collapses.
- Using CSS for whitespace is safe and preserves semantics (no HTML parsing, no XSS surface increase).

**Alternatives considered**:

- Injecting `<br>` via `dangerouslySetInnerHTML`: rejected due to XSS risk and unnecessary complexity.

## Decision 2 — Evidence link matching strategy

**Decision**: Keep the existing “Evidence” hint embedded in Experience text, but make matching tolerant of formatting differences by normalizing whitespace.

**Normalization rules** (proposed):

- Trim leading/trailing whitespace.
- Collapse runs of whitespace (spaces, tabs, newlines) into a single space.

**Optional supported format**:

- If Evidence starts with `#`, treat it as a direct anchor reference to `project.anchorId` (e.g., `#project-go-migration`).

**Rationale**:

- Current implementation requires exact string match (`evidence === project.title`) and breaks on minor differences.
- A simple normalization is lightweight and predictable.

**Alternatives considered**:

- Adding a new structured field to Experience highlights (e.g., `evidenceAnchorId`): possible later, but out of scope unless needed.

## Decision 3 — Year label legibility

**Decision**: Increase the year badge text size in Experience to improve legibility while keeping the NES badge style.

**Rationale**:

- The current year badge is intentionally compact, but user feedback indicates it’s too small.
- This is a pure presentation tweak; it improves UX without affecting content.
