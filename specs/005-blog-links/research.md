# Research: 005 – Writing / Blog Links

## Decision 1: Link-only vs latest posts (RSS)

- **Decision**: Link-only (v1)
- **Rationale**: Avoid new deps and external fetch/parsing. Keep the portfolio durable and fast.
- **Alternatives considered**:
  - Fetch RSS/Atom and render latest posts → rejected for v1 (extra complexity + reliability concerns)

## Decision 2: Where to place blog links

- **Decision**: Add a dedicated `Writing` section + TOC entry.
- **Rationale**: Makes the “writing proof surface” obvious and discoverable. Keeps Contact focused on contact channels.
- **Alternatives considered**:
  - Put links into `Contact` only → rejected (discoverability; dilutes CTA)

## Decision 3: External link safety

- **Decision**: For external links, open in new tab and set `rel="noreferrer"`.
- **Rationale**: Standard safety practice; avoids leaking referrer and prevents tabnabbing patterns.
