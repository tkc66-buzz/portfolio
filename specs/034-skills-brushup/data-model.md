# Data Model: Skills Brushup

**Feature**: `034-skills-brushup`  
**Date**: 2025-12-29  

## Summary

No new entities are introduced. This feature refines the existing Skills content and how it is organized.

## Entities (existing)

- **Skill**
  - `label: string`
  - `years: number`
  - `firstUsedYear?: number`
  - `lastUsedYear?: number`
- **SkillCategory**
  - `name: string`
  - `items: Skill[]`
- **Skills**
  - `items: Skill[]` (derived/flattened when categories exist)
  - `categories?: SkillCategory[]`

## Validation / Invariants

- Each displayed skill MUST have `years`.
- If `firstUsedYear` is set, `lastUsedYear` MUST also be set (and vice versa).
- Prefer avoiding duplicate `label` across categories to reduce confusion.

