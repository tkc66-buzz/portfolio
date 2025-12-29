# Feature Specification: Work Two-Column Layout

**Feature Branch**: `[032-work-two-column-layout]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "workの部分横３列だと見にくいのでmax横2列までにしたい。画面構成から見直してほしい。"

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

### User Story 1 - Read Work comfortably on desktop (Priority: P1)

As a visitor on desktop, I can read the Work section without the layout becoming too dense; the Work UI uses at most two columns so text remains readable.

**Why this priority**: The Work section is a proof surface; readability is more important than packing everything on one row.

**Independent Test**: On a desktop viewport, open the Work section and confirm the Work “RPG” layout never uses three side-by-side columns.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** I view a Work entry, **Then** the layout shows at most two columns (no 3-panel horizontal layout).
2. **Given** a desktop viewport, **When** I switch projects (quests), **Then** the detail area remains readable without horizontal crowding.

---

### User Story 2 - Keep navigation efficient (Priority: P2)

As a visitor, I can still scan the Work entry status and choose a project quickly; reducing columns does not make the interaction slower or harder.

**Why this priority**: The “quest log” interaction is part of the unique screen; the redesign must preserve usability.

**Independent Test**: Using mouse and keyboard arrows, select different quests and confirm the UI remains responsive and understandable.

**Acceptance Scenarios**:

1. **Given** a Work entry, **When** I use Arrow keys to move between quests, **Then** the selection changes and the detail updates as before.

---

### User Story 3 - Responsive & accessible (Priority: P3)

As a visitor on mobile/tablet or using assistive tech, the Work layout remains readable and keyboard-friendly after the redesign.

**Why this priority**: Modern usability is required even with retro aesthetic.

**Independent Test**: On a narrow viewport, confirm the layout stacks naturally and keyboard interactions still work.

**Acceptance Scenarios**:

1. **Given** a narrow viewport, **When** I view Work, **Then** panels stack vertically and nothing overflows horizontally.
2. **Given** keyboard navigation, **When** I move between quests, **Then** focus and selection behavior remains correct.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when a Work entry has 0 quests (projects)? The layout should still look intentional and readable.
- What happens when quest titles are long? The list should remain usable without breaking layout.
- What happens when the browser width is between tablet and desktop? The max-2-column rule should still hold.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The Work entry UI MUST render using at most two columns on desktop-width viewports.
- **FR-002**: The Work entry UI MUST not introduce horizontal scrolling on common viewport sizes.
- **FR-003**: Quest selection via mouse and keyboard MUST continue to work as before.
- **FR-004**: The “No quests yet” state MUST remain readable and visually coherent in the new layout.
- **FR-005**: The redesign MUST preserve retro theme styling and readable typography hierarchy.

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*
*(No new data entities; layout-only change.)*

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: On desktop, Work never shows three side-by-side panels; maximum is two columns.
- **SC-002**: No horizontal scrolling occurs in Work on common desktop/tablet widths.
- **SC-003**: Keyboard quest navigation remains functional (Arrow keys switch selection and focus).
