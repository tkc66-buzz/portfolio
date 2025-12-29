# Contracts: Press Start Reveal

This feature is UI-only and does not introduce network APIs. The “contract” is the
publicly observable DOM/CSS behavior that other components rely on.

## DOM / CSS Contract

### Document classes (on `<html>`)

- `not-started`
  - Meaning: The Menu/sections are locked and should be hidden/non-interactive.
- `is-starting`
  - Meaning: A brief boot/transition is playing.
- `is-started`
  - Meaning: The Menu/sections are unlocked and visible/interactive.

### Start-gated wrapper

- `.start-gated`
  - Meaning: Container for content that is hidden until started.
  - Behavior: Hidden only when the document is in `not-started` or `is-starting`.

## Accessibility Contract

- The START control must be keyboard-activatable.
- After unlocking, focus must land on a predictable navigation point (Menu container or first Menu item).
- Reduced motion preference must be respected (minimal/no animation).


