# Quickstart: Skills Brushup

**Feature**: `034-skills-brushup`  
**Date**: 2025-12-29  

## Goal

Confirm the Skills section clearly communicates top strengths, remains consistent, and is readable on mobile/desktop.

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

Open the site and scroll to **Skills** (or use the menu after **PRESS START**).

## Manual checks

### P1 — Strengths at a glance

- Within ~30 seconds, can you point to the top 3 strengths just by scanning the Skills section?
- Do the strongest skills appear near the top (category + item ordering)?

### Consistency

- Each skill shows a sensible years value.
- If usage range is displayed, it matches the narrative (no contradictions).
- No confusing duplicates across categories (or repetition is clearly intentional).

### Readability

- Mobile: labels/years remain readable with no horizontal scroll.

## Quality gates

```bash
pnpm lint
pnpm build
```

