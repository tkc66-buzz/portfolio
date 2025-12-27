# Feature Specification: 018 – Activities: Achievements (Awards)

**Feature Branch**: `018-activities-achievements`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Activityに賞の受賞とかAchivementを入れたい。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Achievements are visible under Activities (Priority: P1)

As a reader, I want to quickly scan awards/achievements so I can understand credibility and proof beyond Projects.

**Why this priority**: Adds concrete “proof” content with minimal NDA risk; aligns with Personality-First Storytelling.

**Independent Test**: Add at least one Achievement item in content, reload page, and confirm it renders under Activities with year + title + optional link.

**Acceptance Scenarios**:

1. **Given** Activities section exists, **When** a group named `Achievements` has at least 1 item, **Then** the UI shows that group and lists the item(s).
2. **Given** an Achievement item has an external `link`, **When** I click it, **Then** it opens in a new tab with `rel="noreferrer"`.

---

### User Story 2 - Empty state is explicit (Priority: P2)

As the site owner, I want a clear empty state so the UI never looks broken even if Achievements is not populated yet.

**Why this priority**: Prevents awkward blank sections; keeps UX consistent with existing Activities groups.

**Independent Test**: Set Achievements group `items=[]` and confirm “Coming soon” is shown for that group.

**Acceptance Scenarios**:

1. **Given** Activities groups include `Achievements` with zero items, **When** I scroll to Activities, **Then** that group shows “Coming soon”.

---

### Edge Cases

- Achievements item has no `context` and no `link` → still renders cleanly (year + title).
- Many items in a group → still readable and scannable (wrapping, no layout break).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support an `Achievements` group inside `portfolio.activities.groups`.
- **FR-002**: System MUST render Achievements using the same item schema as other Activities groups (`year`, `title`, optional `context`, optional `link`).
- **FR-003**: System MUST keep external links safe (`target="_blank"` + `rel="noreferrer"`).
- **FR-004**: System MUST show an explicit empty state (“Coming soon”) when a group has no items.
- **FR-005**: System MUST remain backward compatible with existing Activities groups (Talks/Books/Community).

### Key Entities

- **ActivityGroup**: `{ name, items[] }` where `name` includes `Achievements`.
- **ActivityItem**: `{ year, title, context?, link? }`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Achievements can be added without introducing a new section or new data shape (minimal maintenance).
- **SC-002**: The page remains scannable; Achievements items are readable on mobile and desktop.
- **SC-003**: `pnpm lint` and `pnpm build` pass.


