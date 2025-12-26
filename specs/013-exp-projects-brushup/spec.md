# Feature Specification: Experience & Projects Content Brush-up

**Feature Branch**: `013-exp-projects-brushup`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "013でExperienceとProjectsのContentsを充実させるためのブラッシュアップ。既知課題: (1) Experienceのyear表示が小さい (2) spreadsheet上の改行がWebで改行されない (3) Evidenceとの紐付けができていない。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experience timeline is readable and matches spreadsheet formatting (Priority: P1)

As the site owner, when I maintain Experience content in a spreadsheet (including multi-line text),
I want the website’s Experience section to render it readably (year label is legible; line breaks are preserved)
so that the timeline communicates clearly.

**Why this priority**: Experience is a primary narrative surface; readability directly affects comprehension.

**Independent Test**: Update an Experience entry in the spreadsheet to include line breaks, load the page,
and confirm the Experience entry shows those line breaks and the year label is comfortably readable.

**Acceptance Scenarios**:

1. **Given** an Experience entry contains line breaks in the spreadsheet, **When** the site renders the Experience section, **Then** the line breaks are displayed (not collapsed into a single line).
2. **Given** the Experience section is rendered on desktop and mobile, **When** I scan the timeline, **Then** the year label is clearly legible and not visually “too small.”

---

### User Story 2 - Evidence links from Experience reliably jump to the correct Project (Priority: P2)

As a reader, when an Experience item references an “Evidence” project, I want to click it and jump to
the corresponding Project entry so I can validate the claim with concrete details.

**Why this priority**: This directly supports “Personality-First Storytelling” (claim → proof).

**Independent Test**: Ensure at least one Experience item includes Evidence, click it, and confirm the page scrolls to the correct Project card.

**Acceptance Scenarios**:

1. **Given** an Experience item includes an Evidence reference, **When** I click the Evidence link, **Then** the page navigates to the matching Project entry.
2. **Given** minor formatting differences (extra spaces / line breaks) between spreadsheet Evidence text and Project title, **When** the Experience section renders, **Then** the Evidence link still resolves to the correct Project.

---

### User Story 3 - Experience & Projects content can be enriched without breaking layout (Priority: P3)

As the site owner, I want to expand Experience and Projects content (longer text, more details) while keeping
the layout readable and consistent with the retro-but-modern UX.

**Why this priority**: This is the broader “content brush-up” goal beyond the three known rendering/linking issues.

**Independent Test**: Add richer content to a few items and confirm the page remains readable (no overflow, no broken layout).

**Acceptance Scenarios**:

1. **Given** longer Experience/Project text, **When** the page renders, **Then** text wraps properly and the layout remains readable on mobile and desktop.

---

### Edge Cases

- **Evidence mismatch**: Evidence text does not match any Project (should render as plain text, not a broken link).
- **Evidence by anchor id**: Evidence is provided as a direct anchor reference (e.g., `#project-...`), if supported by implementation.
- **Mixed newline types**: Spreadsheet may contain `\r\n` or `\n` line breaks (should render consistently).
- **Very long entries**: Ensure long text doesn’t overflow or degrade readability.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Experience section MUST render multi-line spreadsheet text with line breaks preserved.
- **FR-002**: The Experience section MUST display the year label in a legible size on mobile and desktop.
- **FR-003**: When an Experience item includes an Evidence reference, the system MUST link it to the matching Project entry when possible.
- **FR-004**: Evidence matching MUST be resilient to trivial formatting differences (leading/trailing whitespace, multiple spaces, line breaks).
- **FR-005**: If Evidence cannot be resolved to a Project, the system MUST render Evidence as non-clickable text (no broken links).
- **FR-006**: Changes MUST NOT add new runtime dependencies and MUST keep the site deployable on Vercel.

### Key Entities *(include if feature involves data)*

- **Experience Highlight**: `{ year, text }` rendered in Experience; may include an Evidence hint.
- **Project**: `{ title, anchorId, ... }` rendered in Projects; can be a target of Evidence linking.
- **Evidence Reference**: A string embedded in Experience text that should resolve to a Project (by title or anchor id).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An Experience entry containing multiple lines in the spreadsheet renders with the same line breaks on the web page.
- **SC-002**: At least one Evidence link in Experience successfully navigates to the correct Project entry.
- **SC-003**: On mobile and desktop, the Experience year label is readable without zooming.

## Assumptions

- Experience and Projects are sourced from the portfolio content model (public + optional private spreadsheet patch).
- The Experience “Evidence” hint continues to be embedded in the Experience text (not a separate structured field), unless later tasks introduce a safe, backward-compatible enhancement.

## Out of Scope

- Adding new third-party dependencies or a CMS.
- Large information architecture changes beyond Experience/Projects display and linking.
