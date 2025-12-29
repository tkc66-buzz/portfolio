# Feature Specification: Remove Env/Spreadsheet Private Content

**Feature Branch**: `[033-remove-env-sheet]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "環境変数とスプレッドシートを使用しなくなったので参照とそれに該当するコードを全部削除してほしい"

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

### User Story 1 - Portfolio renders from committed content only (Priority: P1)

As a visitor, I see the portfolio content consistently, and it does not depend on hidden/private configuration (environment variables or spreadsheets).

**Why this priority**: The site should be durable and predictable; removing unused private override paths reduces confusion and failure modes.

**Independent Test**: Build and run the site with no special configuration and confirm all sections render as before.

**Acceptance Scenarios**:

1. **Given** a clean environment with no special configuration, **When** I open the site, **Then** the portfolio renders normally and content is present.
2. **Given** environment variables related to private/spreadsheet content are set, **When** I open the site, **Then** the site behavior is unchanged (variables are ignored because the feature is removed).

---

### User Story 2 - Remove dead code and stale docs (Priority: P2)

As a maintainer, I can remove all unused references and code paths related to environment-variable overrides and spreadsheet sourcing, so the repository is simpler and easier to reason about.

**Why this priority**: Unused “optional sources” create ongoing maintenance cost and confusing documentation.

**Independent Test**: Search the repo for the removed feature’s identifiers and confirm they no longer exist.

**Acceptance Scenarios**:

1. **Given** the repository, **When** I search for private override/spreadsheet identifiers, **Then** there are no remaining references.
2. **Given** documentation, **When** I read setup instructions, **Then** there is no mention of configuring private content via env vars or spreadsheets.

---

### User Story 3 - Keep the repo deployable and safe (Priority: P3)

As a maintainer, I can remove spreadsheet/App Script tooling and any related guidance without breaking build/deploy, ensuring the repo remains ready for Vercel deployment.

**Why this priority**: The repo should remain lightweight and production-ready.

**Independent Test**: Run the standard quality gates and ensure they pass.

**Acceptance Scenarios**:

1. **Given** the main branch, **When** I run the standard quality gates, **Then** they pass.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Existing environment variables for private/spreadsheet content are still set in a developer machine or CI: site should ignore them and behave normally.
- Old documentation or spec folders still exist: they should be removed or updated so there is no suggestion that the feature is supported.
- Local `.env.local` exists with unrelated variables: no behavior change.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The portfolio content MUST be sourced only from the committed/public content (no environment-variable “private override” mode).
- **FR-002**: All references to spreadsheet-based content sourcing MUST be removed from code and documentation.
- **FR-003**: Any spreadsheet/App Script artifacts that were only used for the removed feature MUST be removed from the repository.
- **FR-004**: The repo MUST remain buildable and deployable using the standard workflow.
- **FR-005**: Documentation MUST not instruct users to configure private content via environment variables or spreadsheets.

*No [NEEDS CLARIFICATION] items for this feature.*

### Key Entities *(include if feature involves data)*
*(No new data entities; removal/refactor only.)*

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: A developer can run the site locally without any private/spreadsheet configuration and see the full portfolio.
- **SC-002**: Repository documentation contains no mentions of configuring private content via environment variables or spreadsheets.
- **SC-003**: Standard quality gates pass (`lint` and `build`).
