# Research: Hero “Menu” behavior

## Decision: Keep only “Menu” (remove Start/Continue)

**Decision**: Remove Start/Continue and keep a single Menu button that jumps to the Menu.

**Rationale**:
- Removes “clickable but does nothing” confusion at the page entry point
- Keeps the retro vibe (Menu is still a “game-like” affordance) while being unambiguous
- Uses plain anchor navigation (no client code needed)

**Alternatives considered**:
- **Keep Start/Continue**: can add personality, but tends to feel arbitrary on a one-page portfolio.
- **Random warp**: playful but can feel noisy; “Menu” is simpler and always useful.


