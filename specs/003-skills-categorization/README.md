# 003: Skills Categorization & Years (History)

This document is a **post-merge historical note** for PR **#7** (`003-skills-categorization`).

## What we changed

### 1) Skills are expressed as **years**, not subjective scores

- Skill entries use **`years` (required)**.
- No percentage / level scoring is used.

### 2) Skills support **recency** via a strict year range

- Optional: `firstUsedYear` / `lastUsedYear` (both required if either is present).
- The UI can display: `7y (2019–2025)`.
- Validation rejects incomplete ranges or inverted years.

### 3) Categories are the **single source of truth**

To avoid drift from double definitions:

- `skills.categories` is the source of truth.
- `skills.items` is **derived** from categories (flatten + dedupe by label) for backward compatibility.

## Key implementation files

- `src/content/portfolio.ts`
  - Types: `Skill` includes `years` + optional `firstUsedYear`/`lastUsedYear`
  - `normalizeSkills()` derives `items` from `categories`
  - Validation enforces strictness
- `src/components/sections/SkillsSection.tsx`
  - Renders years + optional year range
- Docs updated during the work
  - `README.md`
  - `AGENTS.md`
  - `CLAUDE.md`

## Notable commits (from the feature branch)

- `891ae01` feat: categorize skills
- `c0310f0` feat: represent skills by years
- `6d36ff9` feat: require exact skill years
- `ce9de8e` refactor: derive skills.items from categories
- `27bf8ba` feat: show skill usage range (first/last year)
- `233b349` chore: fill skill year ranges
- `097c51b` chore: finalize skills (backend label + python)


