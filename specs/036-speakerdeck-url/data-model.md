# Data Model: Speaker Deck URL

**Feature**: `036-speakerdeck-url`  
**Date**: 2025-12-29  

## Summary

No new entities. This feature adds one more Activities/Talks entry using the existing content model.

## Existing entities used

- **ActivityGroup**
  - `name: string` (e.g., `"Talks"`)
  - `items: ActivityItem[]`
- **ActivityItem**
  - `year: string`
  - `title: string`
  - `context?: string`
  - `link?: { label: string; href: string }`

## Validation rules

- Speaker Deck link MUST be clearly labeled (label includes “Speaker Deck”).
- Link MUST be a valid `https://` URL.

