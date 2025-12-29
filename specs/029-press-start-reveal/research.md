# Research: Press Start Reveal

## Decision 1: Progressive enhancement gating

- **Decision**: Hide the Menu/sections only when JavaScript successfully marks the document as “not started”.
- **Rationale**: If JavaScript is disabled, the portfolio must remain navigable and usable (constitution: modern usability). The “PRESS START” interaction is treated as an enhancement.
- **Alternatives considered**:
  - Always hide via CSS by default: rejected because it breaks navigation for JS-disabled users.

## Decision 2: Persist “started” state in-session

- **Decision**: Store a simple started flag for the current browsing session.
- **Rationale**: Minimizes friction while keeping the “boot” moment as a one-time interaction.
- **Alternatives considered**:
  - No persistence: rejected as repeated friction on reload/back.
  - Long-term persistence: rejected as unnecessary for a portfolio UX.

## Decision 3: Reduced motion handling

- **Decision**: When reduced motion is enabled, unlock should skip or greatly minimize transition motion.
- **Rationale**: Inclusive UX; avoids discomfort while preserving the interaction.
- **Alternatives considered**:
  - Always animate: rejected due to accessibility concerns.


