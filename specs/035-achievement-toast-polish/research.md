# Research: Achievement Toast Close Polish

**Feature**: `035-achievement-toast-polish`  
**Date**: 2025-12-29  

## Finding: The “empty gap” is structural

- **Observation**: `ActivitiesSection` wraps `AchievementToast` with a static spacer (`<div className="mt-3">...`).
- **Impact**: When `AchievementToast` returns `null` (hidden or dismissed), the spacer remains, producing an awkward empty area. After clicking close, the toast disappears but the gap remains, which reads as “broken” rather than “acknowledged”.

## Decision: Render something after close (“collected” trace)

- **Decision**: After close, show a minimal indicator (badge/chip) instead of rendering nothing.
- **Rationale**: Preserves the “achievement” narrative and avoids the “deleted message” feel.
- **Alternatives considered**:
  - Remove the toast entirely after close: simplest but loses gamefeel and leaves the spacer issue if not fixed.
  - Auto-reopen or repeated animations: risks annoyance and violates “non-intrusive”.

## Decision: Keep it CSS-first and reduced-motion aware

- **Decision**: Use lightweight CSS transitions/animations (opacity/transform) and respect reduced motion by disabling or shortening animations.
- **Rationale**: Matches the repo’s motion style and avoids adding dependencies.

