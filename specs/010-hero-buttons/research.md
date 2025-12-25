# Research: Hero Start/Continue behavior

## Decision: Implement real navigation (don’t remove buttons)

**Decision**: Keep the Start/Continue buttons and make them functional.

- Start: jump to a stable first section (`#profile`)
- Continue: resume from last visited in-page hash (fallback `#experience`)

**Rationale**:
- Removes “clickable but does nothing” confusion at the page entry point
- Matches retro UI (“PRESS START”) while keeping modern usability
- Keeps the landing page scannable (no modal/stateful flows)

**Alternatives considered**:
- **Remove buttons**: simplest, but loses the retro “PRESS START” affordance and makes Hero less interactive.
- **Only anchors (`<a href>` without state)**: simpler but “Continue” becomes meaningless.
- **Use IntersectionObserver to track section in view**: more accurate but adds complexity and JS weight; not needed for MVP.

## Decision: Make Continue a “WARP” (random section)

**Decision**: Treat Continue as a playful “random warp” that always scrolls to a section.

- Picks a random TOC section id
- Avoids the section that appears to be currently in view (heuristic)

**Rationale**:
- Gives the button a clear “game” meaning even without a long session state
- Avoids adding persistence or observers while still feeling dynamic

**Alternatives considered**:
- **Resume last visited hash**: felt “meaningless” in practice for this portfolio context
- **Next unread section**: useful but requires state/persistence; can be added later if desired


