# Feature Specification: Local Dev Experience Freshness

**Feature Branch**: `012-local-dev-no-fetch-cache`  
**Created**: 2025-12-26  
**Status**: Draft  
**Input**: User description: "ローカル開発だけ変更をすぐに確認したいので、fetchのcacheはなしにしてほしい。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Experience updates immediately in local dev (Priority: P1)

As the site owner/developer, when I edit the Experience spreadsheet (the Experience data source),
I want to refresh the local site and immediately see the updated Experience content so I can iterate
quickly without fighting stale cached data.

**Why this priority**: This is the primary pain point blocking fast iteration on Experience content.

**Independent Test**: Start local development, change the Experience data source, reload the page,
and verify the Experience section reflects the change without any extra manual steps.

**Acceptance Scenarios**:

1. **Given** the site is running in local development mode, **When** the Experience data source changes and I reload the page, **Then** the Experience section shows the updated content on that reload.
2. **Given** the site is running in local development mode, **When** I navigate away and back (or reload) after an Experience data source change, **Then** I do not see stale Experience content from an old cached response.

---

### User Story 2 - Production visitors keep fast loads (Priority: P2)

As a production visitor, I want the site to remain fast and stable. This change must not accidentally
disable caching in production and cause unnecessary performance regressions.

**Why this priority**: The portfolio is user-facing; performance regressions are user-visible bugs.

**Independent Test**: Build/run in a production-like mode and confirm the “always fresh on every
reload” behavior is not forced on (i.e., this feature is limited to local development).

**Acceptance Scenarios**:

1. **Given** the site is running in production mode, **When** the Experience data source changes, **Then** the site continues to behave according to the existing production freshness/caching policy (this feature does not override it).

---

### User Story 3 - No workflow hacks needed (Priority: P3)

As the site owner/developer, I want a simple workflow where I can confirm Experience edits without
having to restart the dev server, open incognito, or do a hard reload.

**Why this priority**: Reduces friction and makes content iteration sustainable.

**Independent Test**: After a data source change, confirm that a normal browser reload is sufficient
to observe the updated Experience content in local development.

**Acceptance Scenarios**:

1. **Given** local development mode, **When** the Experience data source changes, **Then** a normal browser reload (not a hard reload) is sufficient to see the updated Experience content.

---

### Edge Cases

- **Data source temporarily unavailable**: the page should still render and make it clear Experience content may be missing/stale.
- **Data source returns invalid/unexpected data**: the site should not crash; Experience should fail gracefully.
- **Rapid consecutive edits**: repeated reloads should always reflect the latest available data in local development mode.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: In local development mode, the system MUST not show stale Experience content due to cached data source responses.
- **FR-002**: In local development mode, after the Experience data source changes, the system MUST show updated Experience content on the next normal browser reload.
- **FR-003**: In production mode, the system MUST preserve the existing Experience freshness/caching behavior (this feature MUST be scoped to local development only).
- **FR-004**: This feature MUST NOT change the visual layout, information architecture, or public content structure; it only affects local development freshness.

### Key Entities *(include if feature involves data)*

- **Experience Data Source**: A canonical external source of Experience entries (currently edited outside the repo).
- **Experience Entry**: A single record rendered in the Experience section (e.g., role, company/project, dates, summary).
- **Runtime Mode**: Whether the site is running in local development mode or production mode.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In local development mode, after updating the Experience data source, the updated Experience content is visible within one normal browser reload.
- **SC-002**: In local development mode, developers do not need workarounds (server restart, incognito, hard reload) to observe updated Experience content.
- **SC-003**: In production mode, the portfolio’s perceived load speed and stability does not regress due to this change (no new “always refresh” behavior applied to visitors).

## Assumptions

- The portfolio has a single canonical Experience data source that is fetched/rendered for the Experience section.
- The runtime can reliably distinguish “local development mode” from “production mode.”
- The developer confirms freshness by editing the Experience data source and reloading the page.

## Out of Scope

- Changing Experience content structure, copy, or design.
- Changing the production freshness/caching policy (this feature is scoped to local development only).
- Introducing new content pipelines, authentication, or long-running services.
