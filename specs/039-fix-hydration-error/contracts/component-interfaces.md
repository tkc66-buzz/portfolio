# Component Interfaces: Fix Hydration Error and Start Gate Visibility

**Feature Branch**: `039-fix-hydration-error`

## Overview

This feature has no REST/GraphQL API. The "contracts" are internal component interfaces and hook signatures that define how the start gate system communicates across components.

## Hook Interfaces

### useHasMounted(): boolean

```typescript
/**
 * Returns true once React has completed hydration on the client.
 * Server snapshot always returns false.
 * Used to prevent rendering client-only content during SSR.
 */
function useHasMounted(): boolean
```

**Contract**:
- Server: always returns `false`
- Client (first render): returns `true`
- Never reverts to `false`
- No dependencies or parameters

### useStartGateStarted(): boolean

```typescript
/**
 * Returns true when the START gate is open (is-started class on <html>).
 * Subscribes to START_GATE_EVENT for reactive updates.
 * Server snapshot always returns false.
 */
function useStartGateStarted(): boolean
```

**Contract**:
- Server: always returns `false`
- Client: reads `document.documentElement.classList.contains('is-started')`
- Subscribes to `START_GATE_EVENT` on `document`
- Transitions from `false` → `true` only (never reverts)

## Event Interface

### START_GATE_EVENT

```typescript
// Dispatched on document when gate state changes
document.dispatchEvent(new Event("start-gate-change"));
```

**Contract**:
- Dispatched by: `Hero.tsx` after `is-started` class is applied
- Consumed by: `useStartGateStarted()` subscribe callback
- Payload: none (consumers check classList directly)

## CSS Contract

### .start-gated

```css
/* Elements with this class are hidden until gate opens */
html.not-started .start-gated,
html.is-starting .start-gated {
  display: none;
}
```

**Contract**:
- Any element with `className="start-gated"` is hidden before START
- Elements become visible when `<html>` has `is-started` class
- Works for server-rendered content without JavaScript
- Does NOT affect Portal-rendered content (hence the need for hook-based gating)

## sessionStorage Contract

### portfolio.started.v1

| Operation | When | Value |
|-----------|------|-------|
| Read | Page load (inline script in layout.tsx) | `"1"` if exists |
| Write | User clicks PRESS START (Hero.tsx) | `"1"` |
| Clear | Never (session ends when tab closes) | — |
