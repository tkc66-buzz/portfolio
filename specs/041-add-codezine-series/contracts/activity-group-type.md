# Contract: ActivityGroup Name Union

**Branch**: `041-add-codezine-series` | **Date**: 2026-02-07

## Interface

```typescript
// src/content/portfolio.ts
export type ActivityGroup = {
  name: "Talks" | "Books" | "Articles" | "Community" | "Achievements";
  items: ActivityItem[];
};
```

## Invariants

1. `ActivityGroup.name` MUST be one of the union members — TypeScript enforces this at compile time.
2. The `ActivitiesSection` renderer treats `"Talks"` specially (card layout + `TalkLinkPreview`). All other group names use the standard list layout.
3. Group ordering in `publicPortfolio.activities.groups` determines display order on the page.
4. Each group with zero items renders "Coming soon" text.

## Consumers

| Consumer | How it uses `name` |
|----------|-------------------|
| `ActivitiesSection.tsx` | `group.name === "Talks"` for card layout branch |
| `ActivitiesSection.tsx` | `group.name` rendered as `<h3>` heading |
| `ActivitiesCollectGate.tsx` | Wraps all groups (no name-dependent logic) |

## Migration

- Adding a new union member is backward-compatible — no existing code references `"Articles"` so there is nothing to break.
- `pnpm build` will catch any type errors.
