# Feature Specification: Work Content Writing

**Feature Branch**: `[031-work-content-writing]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "workの中身のcontentsの文章を作っていきたい。"

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

### User Story 1 - Understand proof through Work (Priority: P1)

As a visitor, I can read the Work section and understand what the owner did, why it mattered, and what they learned, using concrete evidence rather than generic claims.

**Why this priority**: Work is the primary “proof surface” in this portfolio; unclear or placeholder copy weakens credibility.

**Independent Test**: Read only the Work section and confirm each company/entry and each project communicate context, role, and outcome/learning clearly.

**Acceptance Scenarios**:

1. **Given** I am on the Work section, **When** I read a company/organization entry, **Then** I can identify the period, context, and a clear outcome or learning from a single paragraph.
2. **Given** I am on a project detail, **When** I read it, **Then** I can identify the project’s purpose, the owner’s role, key technologies, and outcome/learning without needing external context.

---

### User Story 2 - Stay public-safe while being specific (Priority: P2)

As the site owner, I can publish Work content that is specific and convincing while staying public-safe (no confidential names, identifiers, or sensitive metrics).

**Why this priority**: The portfolio must be publishable and durable; leaking sensitive details is high-risk.

**Independent Test**: Review Work content for sensitive identifiers and confirm it still reads as concrete proof.

**Acceptance Scenarios**:

1. **Given** the updated Work content, **When** I scan for sensitive data, **Then** no confidential company-internal identifiers, customer names, or private URLs are present.
2. **Given** the updated Work content, **When** I read it, **Then** it still contains concrete actions and outcomes (not vague claims).

---

### User Story 3 - Maintainable editing workflow (Priority: P3)

As the site owner, I can iteratively improve Work copy without breaking structure or introducing inconsistent tone.

**Why this priority**: Work content is likely to evolve; changes should be easy and consistent.

**Independent Test**: Make a small copy change and confirm Work rendering stays consistent and readable.

**Acceptance Scenarios**:

1. **Given** I edit Work content, **When** I build and view the site, **Then** layout remains readable and structured (no broken headings or missing required fields).

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- What happens when details are too sensitive to publish—how do we write a public-safe version without becoming vague?
- What happens when a project is private—should it be omitted, redacted, or kept as a minimal “shape” entry?
- What happens when numbers/metrics cannot be shared—how do we still communicate impact?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The Work section MUST use anonymized, public-safe labels for company/product names (no real company/product names).
- **FR-002**: Each Work company/organization entry MUST have exactly one paragraph that includes role/context and either outcome/impact or learning (public-safe).
- **FR-003**: Each Project item MUST include a clear one-line summary, role, technologies, and outcome/learning written as concrete evidence.
- **FR-004**: Work content MUST avoid confidential identifiers (internal system names, private URLs, customer names) and MUST NOT include numerical impact metrics (even approximate/rounded).
- **FR-005**: The Work content MUST be consistent in tone and readable (short paragraphs, clear phrasing, minimal jargon or explained jargon).

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*
- **WorkEntry**: A company/organization block (public-safe label, period, one-paragraph summary, optional tags/links) with nested projects.
- **Project**: A proof item under a WorkEntry (title, summary, role, tech, outcome/learning; optional public-safe asset/link).

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Each WorkEntry has a clear one-paragraph summary that includes context + outcome/learning (0 missing entries).
- **SC-002**: Each Project has a concrete summary and outcome/learning (0 missing entries).
- **SC-003**: A reader can summarize “what you did and why it mattered” from Work in under 2 minutes (subjective but testable via quick review).
- **SC-004**: Work content contains 0 obviously sensitive identifiers (manual review checklist passes).
