# Contracts: Evidence format and linking (Experience → Projects)

**Feature**: `specs/013-exp-projects-brushup/spec.md`  
**Date**: 2025-12-26

## Purpose

Define the supported “Evidence” reference formats embedded in Experience text and how they resolve
to in-page Project anchors.

This contract is intentionally minimal and backwards-compatible.

## Current format (supported)

- Experience item text may include an Evidence suffix using the delimiter:
  - ` / Evidence: `
- Everything after the delimiter is treated as the Evidence reference string.

Example:

- `... / Evidence: #<anchorId>`

## Matching rules (supported)

When resolving Evidence to a Project:

- The system SHOULD normalize whitespace on both Evidence text and Project title:
  - Trim leading/trailing whitespace
  - Collapse runs of whitespace (spaces/tabs/newlines) into a single space
- If a match is found against a Project title, the link target is that Project’s `anchorId`.
- If no match is found, Evidence renders as plain text (non-clickable).

## Optional format (supported if implemented)

- If Evidence begins with `#`, treat it as a direct in-page anchor reference:
  - ` / Evidence: #project-go-migration`

## Non-goals

- No HTML parsing of spreadsheet content
- No changes to the underlying private content endpoint contract in this feature

