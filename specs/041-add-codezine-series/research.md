# Research: Add CodeZine Article Series

**Branch**: `041-add-codezine-series` | **Date**: 2026-02-07

## Q1: What is the current ActivityGroup type constraint?

**Status**: RESOLVED

`ActivityGroup.name` in `src/content/portfolio.ts:85` is a string union:
```typescript
name: "Talks" | "Books" | "Community" | "Achievements";
```
This must be extended to include `"Articles"`.

## Q2: How does ActivitiesSection render different group types?

**Status**: RESOLVED

In `src/components/sections/ActivitiesSection.tsx:60`:
```typescript
const isTalk = group.name === "Talks";
```
- **Talks**: Rendered in a 2-column grid (`grid grid-cols-1 md:grid-cols-2`) with `TALK_CARD_CLASS` card styling and `TalkLinkPreview` component.
- **All other groups**: Rendered as a vertical list (`space-y-3`) with year badge + title + optional context + optional link button.

Adding `"Articles"` requires **no rendering changes** — it will automatically use the standard (non-Talks) list layout.

## Q3: Where should the "Articles" group be placed in the groups array?

**Status**: RESOLVED

Current order: Talks → Books → Community → Achievements.

"Articles" is serialized written content (like Books but periodical). Placing it **after Books** and **before Community** groups the written output together.

New order: Talks → Books → **Articles** → Community → Achievements.

## Q4: What data should the CodeZine entry contain?

**Status**: RESOLVED

Based on the fetched article page:
- **year**: `"2024"` (publication date: 2024/01/19)
- **title**: `"CodeZine連載：Platform Engineering入門"`
- **context**: `"CodeZine（翔泳社）でPlatform Engineeringの入門連載を執筆しました。"`
- **link**: `{ label: "CodeZine", href: "https://codezine.jp/article/detail/18856" }`

## Q5: Are there any Constitution violations?

**Status**: RESOLVED — No violations.

- **Principle I (Personality-First)**: Adding real published articles strengthens the evidence surface.
- **Principle II (Retro + Modern UX)**: No visual changes; uses existing responsive layout.
- **Principle III (Content as Product)**: Real content, not placeholder.
- **Principle IV (Lightweight)**: No new dependencies or components.
- **Principle V (Docs Sync)**: Only the type union changes — minor, but CLAUDE.md should note the expanded type.
