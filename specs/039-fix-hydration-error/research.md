# Research: Fix Hydration Error and Start Gate Visibility

**Feature Branch**: `039-fix-hydration-error`
**Date**: 2026-01-10

## Research Task 1: React Hydration Mismatch with Portal Components

### Context
MobileMenu used `createPortal(content, document.body)` to render outside the component tree. Portal-rendered elements bypass parent CSS classes like `start-gated`, causing the menu to be visible before the START gate opens. Additionally, the Portal target (`document.body`) doesn't exist during SSR, creating a hydration mismatch.

### Decision
Use `useSyncExternalStore` with separate server and client snapshots to safely detect client-side mounting and gate state.

### Rationale
- `useSyncExternalStore` is React's recommended API for subscribing to external stores with SSR support
- The server snapshot always returns `false` (safe default: don't render)
- The client snapshot reads the actual DOM state (`document.documentElement.classList`)
- This eliminates the server/client mismatch that causes hydration errors

### Alternatives Considered
1. **`useEffect` + `useState`**: Causes a flash of incorrect content before the effect runs; not hydration-safe
2. **`suppressHydrationWarning` on MobileMenu**: Only suppresses warnings, doesn't fix the underlying rendering issue
3. **CSS-only hiding**: Insufficient because Portal renders outside the `start-gated` container
4. **Remove Portal entirely**: Would fix the gating issue but creates iOS Safari fixed-positioning problems within scrollable containers

## Research Task 2: Dual-Gate Pattern (mounted + started)

### Context
Two conditions must both be true before MobileMenu renders:
1. React has finished hydrating (mounted)
2. User has pressed START (started)

### Decision
Implement two independent hooks (`useHasMounted` and `useStartGateStarted`) and require both to be true.

### Rationale
- Separating concerns makes each hook testable and reusable
- `useHasMounted` prevents any client-only rendering during SSR/hydration
- `useStartGateStarted` tracks the business logic of the gate state
- Combined check `if (!mounted || !started) return null` is clear and correct

### Alternatives Considered
1. **Single combined hook**: Less clear about which condition is failing; harder to debug
2. **Context provider**: Adds unnecessary complexity for a simple boolean state
3. **Global variable**: Not reactive; wouldn't trigger re-renders

## Research Task 3: State Synchronization via Custom Events

### Context
The START gate state is managed by manipulating HTML element classes (in `layout.tsx` inline script and `Hero.tsx` click handler). React components need to react to these changes.

### Decision
Use a custom DOM event (`START_GATE_EVENT`) dispatched on `document` to notify subscribers when the gate state changes.

### Rationale
- Custom events are lightweight and built into the browser
- `useSyncExternalStore`'s subscribe function maps naturally to `addEventListener`
- No state management library needed
- Works across component boundaries without prop drilling or context

### Alternatives Considered
1. **React Context + state lifting**: Would require restructuring component hierarchy; Hero and MobileMenu are not in a direct parent-child relationship
2. **External state library (Zustand, Jotai)**: Overkill for a single boolean state; adds a dependency (violates Constitution Principle IV)
3. **MutationObserver on classList**: More complex, less intentional; custom event is explicit

## Research Task 4: Session Persistence of Gate State

### Context
When users reload the page, the START gate should remain open if they already pressed START during the session.

### Decision
Use `sessionStorage` with an inline `<script>` in `layout.tsx` that runs before React hydration.

### Rationale
- Inline script executes synchronously before first paint, preventing FOUC
- `sessionStorage` scopes to the browser tab (not persisted across sessions, which is intentional for the "game start" experience)
- `suppressHydrationWarning` on `<html>` allows the class change without React errors
- The inline script is minimal (~5 lines) and has no dependencies

### Alternatives Considered
1. **`localStorage`**: Persists across sessions, which would remove the "PRESS START" experience on subsequent visits
2. **Cookie-based**: Requires server-side logic; unnecessary complexity
3. **React state only**: Would cause a flash of the gate on every reload even for returning users

## Research Task 5: Portal Retention vs Removal

### Context
The original MobileMenu used a Portal. The spec mentions "Portal廃止" (Portal removal) as part of the solution.

### Decision
Retain the Portal but make it conditional on `mounted && started`. The Portal is still used when the menu renders.

### Rationale
- Portal solves real iOS Safari issues with fixed positioning inside scrollable containers
- The hydration problem was not the Portal itself, but rendering it unconditionally
- Conditional rendering (`if (!mounted || !started) return null`) means the Portal is never created during SSR or before START
- No Portal during SSR = no hydration mismatch

### Alternatives Considered
1. **Remove Portal entirely**: Simpler but would reintroduce iOS Safari positioning bugs
2. **Lazy-load Portal target**: Unnecessary complexity; conditional rendering achieves the same goal
