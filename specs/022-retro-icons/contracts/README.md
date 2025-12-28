# Contracts: Retro icon assets (internal)

**Feature**: `specs/022-retro-icons/spec.md`  
**Date**: 2025-12-28

## Purpose

Define internal conventions for icon assets and rendering.

## Asset contract

- All icons MUST live under `public/assets/pixel/icons/`
- Prefer SVG
- Filenames SHOULD be kebab-case and semantic (e.g. `work.svg`, `skills.svg`, `github.svg`)

## Accessibility contract

- Decorative icons MUST be rendered with:
  - `alt=""`
  - `aria-hidden="true"`
- If an icon conveys meaning not present in adjacent text, it MUST have meaningful `alt`.


