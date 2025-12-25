# Data Model: 005 – Writing / Blog Links

## Overview

This feature adds a new public section to the single-page portfolio for writing/blog links.

## Entities

### Writing (new)

Proposed shape (compatible with existing content patterns):

```ts
type Writing = SectionContent & {
  items: ExternalLink[];
};
```

**Rules**

- `items` must include at least:
  - Tech blog (Medium)
  - Casual blog (しずかなインターネット)
- Links are external and must be rendered safely (`target="_blank"` + `rel="noreferrer"`).

## Relationships

- `Portfolio.writing` is a sibling section alongside `profile/experience/projects/skills/contact`.
- `Writing.id` must match the TOC id for anchor navigation.
