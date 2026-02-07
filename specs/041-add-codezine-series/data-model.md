# Data Model: Add CodeZine Article Series

**Branch**: `041-add-codezine-series` | **Date**: 2026-02-07

## Type Change

### Before
```typescript
// src/content/portfolio.ts
export type ActivityGroup = {
  name: "Talks" | "Books" | "Community" | "Achievements";
  items: ActivityItem[];
};
```

### After
```typescript
export type ActivityGroup = {
  name: "Talks" | "Books" | "Articles" | "Community" | "Achievements";
  items: ActivityItem[];
};
```

## New Data Entry

```typescript
{
  name: "Articles",
  items: [
    {
      year: "2024",
      title: "CodeZine連載：Platform Engineering入門",
      context: "CodeZine（翔泳社）でPlatform Engineeringの入門連載を執筆しました。",
      link: { label: "CodeZine", href: "https://codezine.jp/article/detail/18856" },
    },
  ],
}
```

## Rendering Impact

- `ActivitiesSection.tsx` uses `group.name === "Talks"` to decide card vs list layout.
- `"Articles"` ≠ `"Talks"` → standard list layout is used automatically.
- No rendering code changes required.

## Affected Files

| File | Change |
|------|--------|
| `src/content/portfolio.ts` | Extend union type + add Articles group to data |
