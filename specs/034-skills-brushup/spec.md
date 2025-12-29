# Feature Specification: Skills Brushup

**Feature Branch**: `[034-skills-brushup]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "skillsをもっとブラッシュアップしたい"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Strengths are obvious at a glance (Priority: P1)

As a visitor, I can quickly understand the owner’s strongest skills and where they have recent hands-on experience.

**Why this priority**: Skills is a core “proof surface” that supports the narrative; it should be immediately scannable and credible.

**Independent Test**: Open the Skills section and confirm a first-time visitor can identify the top strengths quickly without needing external context.

**Acceptance Scenarios**:

1. **Given** I am a first-time visitor, **When** I view Skills, **Then** I can identify the top 3 strengths within 30 seconds.
2. **Given** I view Skills, **When** I scan individual skills, **Then** the displayed experience is consistent (years and optional usage range) and does not feel contradictory.

---

### User Story 2 - Skills stay maintainable and consistent (Priority: P2)

As a maintainer, I can update Skills content in a single place without creating duplicates, drift, or inconsistent formatting.

**Why this priority**: Skills will evolve over time; the data should remain easy to edit and consistent.

**Independent Test**: Edit skills data and confirm the rendered output remains consistent without additional code changes.

**Acceptance Scenarios**:

1. **Given** I update skills content, **When** I rebuild the site, **Then** Skills renders without duplicates or obvious inconsistencies.

---

### User Story 3 - Readable and accessible presentation (Priority: P3)

As a visitor (including on mobile), the Skills section remains readable, and the “years / range” signals are understandable.

**Why this priority**: Retro aesthetic must not compromise modern usability.

**Independent Test**: View Skills on narrow and wide viewports and confirm text remains readable and meaning remains clear.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** I view Skills, **Then** I can read labels/years without horizontal scrolling.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Skills categories contain repeated skills (e.g., TypeScript appears in multiple categories): presentation should not confuse readers.
- Some skills have old usage only: recency should be communicated clearly (if usage range is shown).
- Skills list becomes longer: it should remain scannable (no “wall of badges” feeling).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The Skills content MUST clearly communicate top strengths and areas of expertise.
- **FR-002**: Each listed skill MUST have a consistent experience signal (years required; usage range optional but consistent when shown).
- **FR-003**: The Skills content MUST avoid duplicates that would confuse readers (either dedupe or make intentional repetition clearly justified by context).
- **FR-004**: Updating Skills MUST be possible by editing the content source of truth (no manual duplication across multiple files).
- **FR-005**: The repo MUST remain buildable and deployable using the standard workflow.

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*

- **Skill**: label, years, optional usage range
- **SkillCategory**: name, list of skills

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify the top 3 strengths from the Skills section within 30 seconds.
- **SC-002**: Skills contain no confusing duplicates or inconsistent experience signals (manual review).
- **SC-003**: `pnpm lint` and `pnpm build` pass.

## Assumptions

- Skills “brushup” primarily means improving the Skills content quality (ordering, naming, coverage, consistency) rather than adding new site features.
- The experience signal remains “years” (with optional usage range) and should stay believable and internally consistent.
