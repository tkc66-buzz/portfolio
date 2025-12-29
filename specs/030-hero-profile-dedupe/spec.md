# Feature Specification: Hero/Profile 역할 분리

**Feature Branch**: `[030-hero-profile-dedupe]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "Hero.tsx と ProfileSection.tsx の内容がかなり被っている気がするので変えたい。"

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

### User Story 1 - First screen communicates “who” without repeating “about” (Priority: P1)

As a first-time visitor, I can understand who the person is and what they do from the first screen (Hero) without seeing duplicated text that is repeated again in the Profile section.

**Why this priority**: The first screen sets the tone; duplication reduces clarity and makes the page feel less intentional.

**Independent Test**: Read only the Hero + Profile sections and confirm they each add distinct information (no repeated sentences/claims).

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** I read Hero and then Profile, **Then** I do not encounter the same description repeated verbatim (or near-verbatim).
2. **Given** the page is loaded, **When** I read Hero and then Profile, **Then** Hero gives a concise role/identity and Profile expands with additional context that is not already stated.

---

### User Story 2 - Keep “Press Start” hero interaction focused (Priority: P2)

As a visitor, I can still use the Hero “PRESS START” interaction without the Hero becoming text-heavy; the interaction remains the primary call-to-action and the copy remains scannable.

**Why this priority**: The game-feel interaction should not compete with long copy above the fold.

**Independent Test**: On mobile and desktop, verify that Hero copy remains brief and the START control remains visually prominent.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** I view the Hero, **Then** the START call-to-action is immediately visible without excessive scrolling.

---

### User Story 3 - Maintain tone and readability (Priority: P3)

As a visitor, the adjusted copy still feels consistent with the retro theme, and remains readable and accessible.

**Why this priority**: Copy changes must not degrade the site’s tone or usability.

**Independent Test**: Verify the updated copy is readable, concise, and does not introduce awkward line breaks or overly dense paragraphs.

**Acceptance Scenarios**:

1. **Given** the updated copy, **When** I navigate the page, **Then** headings and paragraphs remain readable and well-structured.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when Profile content is edited in the content source—does Hero remain distinct without manual double-updating?
- What happens when text length grows (Japanese/English mix)—does the Hero remain scannable?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The Hero section MUST communicate a concise identity/role without repeating the Profile section’s copy.
- **FR-002**: The Profile section MUST provide additional context beyond what is already stated in the Hero.
- **FR-003**: The Hero MUST remain scannable (no dense paragraphs that compete with the primary call-to-action).
- **FR-004**: The change MUST NOT remove or reduce the existing “PRESS START” interaction’s clarity.
- **FR-005**: Copy updates MUST preserve readability and accessibility (clear hierarchy, readable line lengths).

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*

*(No new data entities; this feature is copy/structure only.)*

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Hero and Profile contain **0** verbatim repeated sentences.
- **SC-002**: On mobile, the START call-to-action remains visible without scrolling on initial load.
- **SC-003**: Readers can understand “what you do” from Hero in under 10 seconds, and “more detail” from Profile in under 30 seconds.
