# Feature Specification: 019 – Remove Experience & Projects (Safety)

**Feature Branch**: `019-remove-exp-projects`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "OK 019に移ろう。ExperienceとProjectsは削除したい。やっぱり情報公開は危ないと判断した。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Experience/Projects are not displayed (Priority: P1)

As the site owner, I want to remove Experience and Projects from the public page so I can avoid accidental information disclosure.

**Why this priority**: It directly reduces public-facing exposure and aligns with the safety decision.

**Independent Test**: Open the home page and confirm there is no Experience/Projects section in the UI and no menu entries for them.

**Acceptance Scenarios**:

1. **Given** the home page is rendered, **When** I scroll the page, **Then** I cannot find Experience/Projects sections.
2. **Given** the Menu (TOC) is shown, **When** I look at the items, **Then** Experience/Projects are not present.

---

### User Story 2 - Default content is scrubbed (Priority: P2)

As the site owner, I want the repository’s default portfolio content to not contain detailed Experience/Projects text so that the codebase itself is safer to share.

**Why this priority**: Even if not rendered, committed text can be leaked via repo access or screenshots; removing it reduces risk.

**Independent Test**: Search the repository for the previous Experience/Projects default copy and confirm it no longer exists.

**Acceptance Scenarios**:

1. **Given** `src/content/portfolio.ts` defines defaults, **When** I inspect `publicPortfolio.experience` and `publicPortfolio.projects`, **Then** they contain no detailed items (empty arrays).

---

### Edge Cases

- Removing sections must not break build/lint or TOC rendering.
- Existing private overrides may still provide `experience/projects`; they should not crash the app even if unused.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST not render Experience and Projects sections on the landing page (`src/app/page.tsx`).
- **FR-002**: System MUST not show Experience/Projects links in the Menu (`src/components/toc.ts`).
- **FR-003**: System MUST remove detailed default Experience/Projects content from the repository (`src/content/portfolio.ts`).
- **FR-004**: System MUST keep the site deployable: `pnpm lint` and `pnpm build` pass.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Public UI shows fewer sections and contains no Experience/Projects.
- **SC-002**: Repo no longer contains detailed default Experience/Projects text.
- **SC-003**: `pnpm lint` and `pnpm build` pass.


