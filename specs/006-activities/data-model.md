# Data Model: 006 – Activities (Talks / Books / Community)

## Overview

This feature adds a new public proof surface for talks, books, and community contributions.

## Entities

### ActivityItem (new)

```ts
type ActivityItem = {
  year: string;
  title: string;
  context?: string; // event / publisher / role (optional)
  link?: ExternalLink; // optional external link
};
```

### ActivityGroup (new)

```ts
type ActivityGroup = {
  name: "Talks" | "Books" | "Community";
  items: ActivityItem[];
};
```

### ActivitiesSection (new)

```ts
type Activities = SectionContent & {
  groups: ActivityGroup[];
};
```

## Relationships

- `Portfolio.activities` is a sibling of `portfolio.writing`.
- `activities.id` must match the TOC id for anchor navigation (`#activities`).

## Validation rules (UI-level)

- Empty groups are allowed, but the section should show a clear empty state (“Coming soon”).
- External links must be rendered safely (`target="_blank"` + `rel="noreferrer"`).
