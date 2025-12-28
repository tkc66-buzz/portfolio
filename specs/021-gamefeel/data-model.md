# Data Model: Assets + Motion

**Feature**: `specs/021-gamefeel/spec.md`  
**Date**: 2025-12-28

## Overview

This feature enriches the existing Work → Projects proof surface with optional visual assets
(images/diagrams) and adds subtle, accessible motion.

## Entities

### `Asset`

Represents a visual attached to a Project (or later, to a WorkEntry).

- `src`: string (path under `public/`, e.g. `"/assets/diagrams/go-migration.svg"`)
- `alt`: string (required for accessibility)
- `kind`: `"diagram" | "screenshot" | "pixel-art"`
- `width?` / `height?`: number (required for raster images if using `next/image`)

### `Project` (extension)

- Add optional field:
  - `asset?: Asset`

### `MotionPreset` (CSS concept)

Not stored as data initially; represented by CSS classes:

- `pixel-float` (subtle vertical bob)
- `blink-soft` (low-frequency blink)
- Must be disabled under `prefers-reduced-motion: reduce`

## Rendering / Validation Rules

- If `project.asset` exists:
  - UI MUST render it (diagram or thumbnail)
  - UI MUST include `alt` text
- If the asset path is invalid/missing, UI MUST fall back gracefully (placeholder area or hide asset region without layout break).
- Motion MUST be subtle and MUST respect reduced motion preference.


