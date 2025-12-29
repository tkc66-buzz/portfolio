# Quickstart: Press Start Reveal

## Run locally

```bash
pnpm install
pnpm dev
```

## Manual verification checklist

1. **Fresh load**
   - Confirm the Hero shows “PRESS START”.
   - Confirm the Menu/sections are not visible yet (locked state).

2. **Unlock**
   - Activate START (mouse/tap).
   - Confirm a short retro transition plays (or is minimal under reduced motion).
   - Confirm the screen blocks interaction briefly during the transition (no accidental clicks).
   - Confirm the Menu becomes visible and interactive.

3. **Keyboard**
   - Tab to START and activate with Enter/Space.
   - Confirm focus lands on the Menu (or first Menu item) after unlock.

4. **Session persistence**
   - After unlocking, reload the page.
   - Confirm the Menu is already unlocked.

5. **Reduced motion**
   - Enable reduced motion at OS level.
   - Confirm unlock does not use motion-heavy effects.

6. **JS disabled (progressive enhancement)**
   - With JavaScript disabled, confirm the Menu remains visible so the portfolio is still navigable.


