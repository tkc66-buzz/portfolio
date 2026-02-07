# Data Model: Fix Hydration Error and Start Gate Visibility

**Feature Branch**: `039-fix-hydration-error`
**Date**: 2026-01-10

## State Model

This feature has no persistent data model (no database, no API). It manages ephemeral client-side state through DOM classes and sessionStorage.

### Entity: StartGateState

Represents the current state of the "PRESS START" gate.

| Field | Type | Storage | Description |
|-------|------|---------|-------------|
| `gateClass` | `"not-started" \| "is-starting" \| "is-started"` | `document.documentElement.classList` | Current gate phase |
| `persisted` | `"1" \| null` | `sessionStorage["portfolio.started.v1"]` | Whether START was pressed this session |

### State Transitions

```text
                    ┌─────────────────────────────────┐
                    │    Page Load                      │
                    └───────────┬─────────────────────┘
                                │
                    ┌───────────▼───────────────────────┐
                    │  Inline Script (layout.tsx)         │
                    │  Check sessionStorage               │
                    └───────────┬─────────────────────┘
                                │
                ┌───────────────┼────────────────────┐
                │ (no storage)  │                      │ (storage = "1")
                ▼               │                      ▼
        ┌──────────────┐       │              ┌──────────────┐
        │  not-started  │       │              │  is-started   │
        └──────┬───────┘       │              └──────────────┘
               │                │
               │ User clicks    │
               │ PRESS START    │
               ▼                │
        ┌──────────────┐       │
        │  is-starting  │       │
        │  (520ms anim) │       │
        └──────┬───────┘       │
               │                │
               │ Animation done │
               ▼                │
        ┌──────────────┐       │
        │  is-started   │───────┘
        └──────────────┘
```

### Entity: MobileMenuVisibility

Derived state controlling whether MobileMenu renders.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| `mounted` | `boolean` | `useSyncExternalStore` (client snapshot: `true`, server: `false`) | React hydration complete |
| `started` | `boolean` | `useSyncExternalStore` (reads `is-started` class) | Gate is open |
| `visible` | `boolean` | `mounted && started` | Whether to render Portal content |

### Relationships

```text
StartGateState.gateClass ──controls──▶ CSS .start-gated display
StartGateState.gateClass ──observed-by──▶ useStartGateStarted() hook
StartGateState.persisted ──read-by──▶ layout.tsx inline script
MobileMenuVisibility.visible ──controls──▶ Portal rendering
```

### Validation Rules

- `gateClass` must be exactly one of the three valid values at any time
- `persisted` in sessionStorage is write-once per session (set on START, never cleared)
- `mounted` can only transition from `false` to `true` (never reverts)
- `started` can only transition from `false` to `true` (gate never closes)

## Constants (startGate.ts)

| Constant | Value | Usage |
|----------|-------|-------|
| `START_GATE_STORAGE_KEY` | `"portfolio.started.v1"` | sessionStorage key |
| `START_GATE_CLASS_NOT_STARTED` | `"not-started"` | Initial HTML class |
| `START_GATE_CLASS_STARTING` | `"is-starting"` | Animation phase class |
| `START_GATE_CLASS_STARTED` | `"is-started"` | Final active class |
| `START_GATE_EVENT` | `"start-gate-change"` | Custom event name |
