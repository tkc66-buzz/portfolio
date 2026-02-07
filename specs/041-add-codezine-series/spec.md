# Feature Spec: Add CodeZine Article Series to Activities

**Branch**: `041-add-codezine-series` | **Date**: 2026-02-07

## Problem

The user has published a serialized article on CodeZine (Platform Engineering入門) but there is no
"Articles" group in the Activities section. The current `ActivityGroup.name` union type only allows
`"Talks" | "Books" | "Community" | "Achievements"`. The article series needs its own group since it
is not a book (「activityのbookではない」).

## Goal

Add an **"Articles"** group to the Activities section and populate it with the CodeZine article series entry.

## Source Material

- **Article URL**: https://codezine.jp/article/detail/18856
- **Series title**: プラットフォームづくりを成功に導く！開発者のための「Platform Engineering」入門
- **Author**: 渡邊 武志（Buzz）
- **Published**: 2024/01/19
- **Publisher**: CodeZine (翔泳社)

## Requirements

1. Extend `ActivityGroup.name` union type to include `"Articles"`.
2. Add the CodeZine series as an `ActivityItem` inside a new `"Articles"` group.
3. Place the "Articles" group in a logical position within the groups array (after "Books" seems natural since both are written content).
4. The rendering should use the standard list layout (not the Talks card layout).
5. No new components are needed — the existing ActivitiesSection rendering handles non-"Talks" groups with the standard layout already.
6. Docs sync: update `CLAUDE.md` if the type system change is noteworthy.

## Non-Goals

- No changes to the rendering logic of ActivitiesSection.tsx.
- No new pixel icon for Articles (reuse existing Activities section structure).
- No additional article entries beyond the CodeZine series (user can add more later).
