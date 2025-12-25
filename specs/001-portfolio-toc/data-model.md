# Data Model: Portfolio TOC + Section Granularity

## Entities

### Section

Represents a top-level content block on the landing page.

- **id**: stable identifier used for anchor navigation (e.g., `profile`, `projects`)
- **label**: human-readable label shown in the TOC (e.g., `Profile`)
- **heading**: the visible section heading (can match label, but not required)
- **order**: integer ordering for rendering and TOC display
- **contentOwner**: which component owns rendering the section

### TOC Item

Represents a navigation entry pointing to a section.

- **id**: must match exactly one `Section.id`
- **href**: `#${id}`
- **label**: string shown in the TOC

## Constraints / Validation Rules

- `Section.id` MUST be unique across the page.
- TOC MUST include at least the base set:
  `profile`, `experience`, `projects`, `skills`, `contact`.
- Total TOC items SHOULD stay <= 8 (per FR-006) unless explicitly justified.
- Each section MUST have a visible heading that is meaningful out of context.

## Proposed IDs (initial set)

| id         | label      | owned by (planned)                              |
| ---------- | ---------- | ----------------------------------------------- |
| profile    | Profile    | `src/components/sections/ProfileSection.tsx`    |
| experience | Experience | `src/components/sections/ExperienceSection.tsx` |
| projects   | Projects   | `src/components/sections/ProjectsSection.tsx`   |
| skills     | Skills     | `src/components/sections/SkillsSection.tsx`     |
| contact    | Contact    | `src/components/sections/ContactSection.tsx`    |
