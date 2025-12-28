# Data Model: Retro icons

**Feature**: `specs/022-retro-icons/spec.md`  
**Date**: 2025-12-28

## Overview

This feature adds optional retro icon assets and uses them in headings and link lists.

## Entities

### `IconAsset`

- `src`: string (path under `public/`, e.g. `"/assets/pixel/icons/work.svg"`)
- `alt`: string (use `""` for decorative icons)
- `size`: `"sm" | "md"` (maps to pixel sizes in UI)
- `decorative`: boolean (when true, render with `aria-hidden` and `alt=""`)

### `IconPlacement`

- Section heading icons (Profile/Work/Writing/Activities/Skills/Contact)
- Contact link icons (Email/GitHub/X/LinkedIn)

## Rendering Rules

- Decorative icons MUST NOT be read by screen readers (`aria-hidden="true"` and `alt=""`).
- Icons MUST have consistent sizing and alignment to avoid layout jitter on mobile.


