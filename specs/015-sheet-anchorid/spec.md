# Feature Specification: Spreadsheet-managed Project Anchor IDs *(Deprecated)*

> **Status (2025-12-28)**: Spreadsheet-based authoring is **no longer used** for this repo.
> Work/Projects are authored in-repo; keep this document as historical reference only.

**Feature Branch**: `015-sheet-anchorid`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "ProjectsをSpreadsheet側で安定ID(anchorId)管理できるようにする。Projects sheetに anchorId 列を追加し、Apps Script のJSON出力に projects.items[].anchorId を含める。ExperienceのEvidenceは title一致ではなく ' / Evidence: #<anchorId>' 形式で運用できるようにする。"

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

### User Story 1 - Maintain stable Experience→Projects links via anchorId (Priority: P1)

As the site owner, when I edit Experience and Projects in a spreadsheet, I want a stable identifier
(`anchorId`) for each Project so that Experience “Evidence” links never break due to title edits or formatting changes.

**Why this priority**: Title-based matching is fragile; anchorId makes linking reliable and maintenance-friendly.

**Independent Test**: Assign an anchorId to a project in the spreadsheet, reference it from an Experience item as
`/ Evidence: #<anchorId>`, reload the site, and confirm the Evidence link jumps to the correct Project card.

**Acceptance Scenarios**:

1. **Given** a Project row has `anchorId`, **When** the site renders Projects, **Then** the Project card has a stable in-page anchor matching that `anchorId`.
2. **Given** an Experience item references `/ Evidence: #<anchorId>`, **When** I click the Evidence link, **Then** the page navigates to the matching Project card.
3. **Given** the Project title changes, **When** I reload the site, **Then** the Evidence link still works because it depends on `anchorId`, not title text.

---

### User Story 2 - Authoring workflow is clear and safe (Priority: P2)

As the site owner, I want a clear spreadsheet schema and quickstart instructions so I can reliably author
Projects with `anchorId` and reference them from Experience without confusion.

**Why this priority**: Reliability depends on consistent data entry; docs and schema prevent mistakes.

**Independent Test**: Follow the docs from scratch to add one Project and one Experience Evidence link and confirm it works.

**Acceptance Scenarios**:

1. **Given** the spreadsheet template, **When** I add a new Project, **Then** I know how to choose a stable `anchorId` and avoid collisions.
2. **Given** a malformed or missing `anchorId`, **When** the site renders, **Then** it fails gracefully (no crash; Evidence becomes non-clickable).

---

### User Story 3 - Backwards compatibility for existing Evidence (Priority: P3)

As the site owner, I want existing content to keep working while we migrate: title-based Evidence should still
work (best-effort), but `#anchorId` becomes the preferred, stable path.

**Why this priority**: Avoids a big-bang rewrite and reduces maintenance risk.

**Independent Test**: Confirm both Evidence styles work: title-based (if present) and `#anchorId`.

**Acceptance Scenarios**:

1. **Given** an Experience item uses title-based Evidence, **When** the site renders, **Then** it still links if a matching Project exists.
2. **Given** an Experience item uses `#anchorId` Evidence, **When** the site renders, **Then** it links even if titles differ.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- **Duplicate anchorId**: If two Projects share an anchorId, the behavior should be deterministic and the docs should warn against it.
- **Invalid anchorId characters**: anchorId must be safe for in-page anchors (letters/numbers/hyphens).
- **Missing anchorId**: Project still renders; Evidence `#anchorId` cannot resolve and should render as plain text.
- **Spreadsheet typos**: Evidence points to an unknown anchorId; render as plain text (non-clickable).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The Projects spreadsheet schema MUST include an `anchorId` column that uniquely identifies each Project for linking.
- **FR-002**: The private content export MUST include `projects.items[].anchorId` when present.
- **FR-003**: Projects MUST render with a stable in-page anchor derived from `anchorId` (no breaking changes to published anchors).
- **FR-004**: Experience Evidence MUST support direct anchor references in the form `/ Evidence: #<anchorId>`.
- **FR-005**: If Evidence cannot be resolved, the UI MUST render Evidence as plain text (non-clickable) and MUST NOT crash.
- **FR-006**: This change MUST remain deployable on Vercel and MUST NOT add new runtime dependencies.

### Key Entities *(include if feature involves data)*

- **Project**: A case/evidence entry that can be linked to via a stable `anchorId`.
- **Project Anchor ID (anchorId)**: A stable, URL-fragment-safe identifier used for in-page navigation.
- **Evidence Reference**: A string embedded in Experience text, supporting the `#anchorId` form.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A Project title can change without breaking Evidence links that use `#anchorId`.
- **SC-002**: Adding a new Project + Evidence link via spreadsheet takes under 5 minutes when following the documented schema.
- **SC-003**: Invalid/missing `anchorId` never causes a runtime crash; Evidence falls back to plain text.

## Assumptions

- The private content pipeline (Apps Script → JSON patch) is the source for spreadsheet-driven Experience/Projects.
- Projects already render with `id={project.anchorId}`; this feature makes it reliable by authoring `anchorId` in the spreadsheet.

## Out of Scope

- Adding authentication or recruiter-only private pages.
- Introducing a new CMS or third-party dependencies.
