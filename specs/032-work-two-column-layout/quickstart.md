# Quickstart: Work Two-Column Layout

**Feature**: `032-work-two-column-layout`  
**Date**: 2025-12-29  

## Goal

Verify the Work section “RPG” screen uses **max 2 columns** on desktop and remains usable (mouse + keyboard), with no horizontal overflow.

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

Open the site and scroll to **Work** (or use the menu after **PRESS START**).

## Manual checks

### Desktop (≥ 768px)

- Work layout shows **two columns max**:
  - Left: STATUS + QUEST LOG stacked
  - Right: DETAIL (spans the full height)
- No horizontal scroll bars appear.
- Click different quests; DETAIL updates correctly.

### Keyboard

- Focus a quest, press ArrowUp/ArrowDown (or ArrowLeft/ArrowRight).
- Selection changes and focus moves with it.

### Mobile (< 768px)

- Panels stack vertically; no overflow.

