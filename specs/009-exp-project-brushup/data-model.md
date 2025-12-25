# Data Model: Experience & Projects (Portfolio content)

## Source of truth

- `src/content/portfolio.ts` (public content)
- Optional private overrides via env/URL are merged server-side (no secrets in the repo)

## Current entities (today)

### Experience

- `experience.heading: string`
- `experience.highlights: { year: string; text: string }[]`

### Projects

- `projects.items: Project[]`
- `Project` fields:
  - `visibility?: "public" | "private"`
  - `title: string`
  - `summary: string`
  - `role: string`
  - `tech: string[]`
  - `outcomeOrLearning: string`
  - `status?: string`
  - `link?: { label: string; href: string }`

## Proposed refinements (backward-compatible)

This feature focuses on content + presentation first. If we need richer structure, prefer additive fields.

### Option A (no type changes) – Recommended for MVP

- Keep `experience.highlights` as-is, but rewrite each entry to emphasize:
  - scope/ownership
  - decision-making
  - how you work
- Keep `projects.items` as-is, but ensure each public item reads as:
  - problem → action → result/learning

**Chosen for this feature**: Option A (MVP).  
We may add a tiny optional field (`Project.anchorId?: string`) only for in-page linking between Experience evidence hints → Project cards.

### Option B (additive fields; future-proof)

Add optional fields without breaking existing rendering:

- `Project.tags?: string[]` (e.g., `["Platform","Observability"]`)
- `Project.problem?: string`
- `Project.actions?: string[]`
- `Project.result?: string` (or split metrics vs qualitative)

## Validation rules (content)

- Experience:
  - 3–6 highlights max (scanable)
  - `year` can be a range string (e.g., `2019–2023`)
- Projects:
  - public items must include `role`, `tech`, and `outcomeOrLearning`
  - private items must not include sensitive details; UI will redact details
