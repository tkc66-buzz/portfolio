# Data Model: Press Start Reveal

## Entity: StartGateState

Represents whether the visitor has “started” for the current browsing session.

### Fields

- **started**: boolean
  - **Meaning**: Whether the Menu/sections are unlocked
  - **Valid values**: true / false

### Persistence

- **Scope**: Session-scoped (resets in a new session)
- **Data stored**: A single flag only (no personal data)

### State transitions

- **Initial**: `started = false` (fresh load)
- **On START**: `started = true`
- **On reload (same session)**: `started = true` (if previously started)


