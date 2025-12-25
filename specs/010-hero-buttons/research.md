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

## Decision: Store last visited hash via `hashchange` + localStorage

**Decision**: Use a tiny global tracker that listens to `hashchange` and stores the last meaningful hash in `localStorage`.

**Rationale**:
- Most navigation is already hash-based (TOC links)
- Minimal client code; no DOM observers; no extra deps
- Works across reloads

**Constraints**:
- localStorage can be blocked → must fail safe
- ignore invalid hashes (empty / `#`)


