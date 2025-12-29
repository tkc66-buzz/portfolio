# Feature Specification: Achievement Toast Close Polish

**Feature Branch**: `[035-achievement-toast-polish]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "ACHIEVEMENT UNLOCKED / Activities を発見した！ で閉じるを押した後の挙動が微妙。もっといい演出ない？"

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

### User Story 1 - Dismiss feels satisfying and intentional (Priority: P1)

As a visitor, when I close the “ACHIEVEMENT UNLOCKED / Activities を発見した！” message, it feels like a deliberate “acknowledgement” moment rather than an awkward disappearance.

**Why this priority**: This toast is meant to add gamefeel; if the close feels off, it detracts from the section instead of enhancing it.

**Independent Test**: Scroll into Activities, wait for the toast, click close, and confirm the post-close behavior looks intentional and does not leave a weird gap.

**Acceptance Scenarios**:

1. **Given** the toast is visible, **When** I press close, **Then** it transitions out in a satisfying way (not a sudden pop).
2. **Given** I closed the toast, **When** I continue reading Activities, **Then** the layout remains stable and there is no “empty area” or awkward spacing.

---

### User Story 2 - Post-close affordance (Priority: P2)

As a visitor, after I close the toast, the site still provides a subtle, non-intrusive hint that an “achievement” happened (so it feels like a collected item, not a deleted message).

**Why this priority**: The “achievement” framing benefits from a lightweight persistent trace.

**Independent Test**: Close the toast and confirm there is a small, tasteful indication that can be ignored (no distraction).

**Acceptance Scenarios**:

1. **Given** I closed the toast, **When** I look at the Activities section header area, **Then** I see a subtle indicator that an achievement was unlocked (and it does not steal attention).

---

### User Story 3 - Reduced-motion friendly and accessible (Priority: P3)

As a visitor who prefers reduced motion or uses assistive tech, the improved close behavior remains comfortable and accessible.

**Why this priority**: Retro aesthetic must not compromise usability or accessibility.

**Independent Test**: Enable reduced motion and confirm close behavior remains immediate and non-distracting; verify focus/aria are sensible.

**Acceptance Scenarios**:

1. **Given** reduced motion is enabled, **When** I close the toast, **Then** it dismisses without noticeable animation and without breaking layout.
2. **Given** keyboard navigation, **When** I focus and close the toast, **Then** focus handling is predictable and nothing becomes unreachable.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- User closes the toast immediately after it appears: no jank, no stuck intermediate state.
- User closes the toast and then scrolls away/returns: behavior remains consistent within the browsing session.
- Storage is unavailable (blocked session storage): toast behavior should still degrade gracefully.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: Closing the Activities achievement toast MUST not cause awkward layout shifts or leave a strange blank area.
- **FR-002**: Closing the toast MUST feel intentional (a short, polished transition or an equivalent non-jarring behavior).
- **FR-003**: After closing, the UI MUST provide a subtle post-close affordance (non-intrusive “collected” trace) within the Activities section.
- **FR-004**: The improved behavior MUST respect reduced-motion preferences.
- **FR-005**: The repo MUST remain buildable and deployable using the standard workflow.

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*
*(No new data entities required; behavior/presentation only.)*

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Dismissing the toast never leaves visible awkward spacing in Activities (manual check on mobile + desktop).
- **SC-002**: With reduced motion enabled, dismiss is comfortable and not animation-heavy (manual check).
- **SC-003**: `pnpm lint` and `pnpm build` pass.
