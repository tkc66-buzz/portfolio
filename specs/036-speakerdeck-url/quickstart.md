# Quickstart: Speaker Deck URL

**Feature**: `036-speakerdeck-url`  
**Date**: 2025-12-29  

## Goal

Verify the Speaker Deck profile link is discoverable in Activities → Talks and opens safely.

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

## Manual checks

- Navigate to **Activities**.
- Under **Talks**, confirm there is a clearly labeled entry/link for **Speaker Deck**.
- Click it:
  - It opens successfully (external destination).
  - The portfolio page remains usable after opening.

## Quality gates

```bash
pnpm lint
pnpm build
```

