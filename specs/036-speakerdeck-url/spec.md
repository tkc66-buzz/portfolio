# Feature Specification: Speaker Deck URL

**Feature Branch**: `[036-speakerdeck-url]`  
**Created**: 2025-12-29  
**Status**: Draft  
**Input**: User description: "登壇資料のURLを追加したい。どこに追加するのがいいか考えて。"

## Context / Placement Decision

登壇資料は “活動（Talks）” の成果物として探されることが多いため、URLは **Activities セクションの Talks 文脈に置く**のが最も自然です。

- 対象URL: [Speaker Deck プロフィール](https://speakerdeck.com/tkc66buzz)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitors can discover talk slides easily (Priority: P1)

As a visitor, I can find the portfolio owner's talk slide decks from the Activities/Talks area and open them without confusion.

**Why this priority**: 登壇実績を見た流れで「資料も見たい」が最短で満たせるため。

**Independent Test**: Activities の Talks を確認し、Speaker Deck へのリンクが見つかり、クリックで遷移できること。

**Acceptance Scenarios**:

1. **Given** I am viewing the Activities section, **When** I look at the Talks area, **Then** I can find an item/link that clearly points to Speaker Deck.
2. **Given** I click the Speaker Deck link, **When** the browser navigates, **Then** the Speaker Deck profile page opens successfully and the portfolio page remains usable (no broken layout).

---

### User Story 2 - External links are safe and clearly labeled (Priority: P2)

As a visitor, when I open the Speaker Deck link, it is clearly an external destination and opens safely.

**Why this priority**: 外部リンクの挙動が曖昧だと信頼性が落ちるため。

**Independent Test**: Speaker Deck リンクが外部リンクとして認識でき、開き方が安全であることを確認する。

**Acceptance Scenarios**:

1. **Given** the Speaker Deck link is visible, **When** I activate it, **Then** it behaves like an external link (clear destination, safe open behavior).

---

### Edge Cases

- Speaker Deck 側が一時的に閲覧できない/ブロックされている: ポートフォリオ側は壊れず、リンクは通常の外部リンクとして扱われる。
- JavaScript が無効: Activities/Talks のリンクは閲覧・クリックできる（基本は静的コンテンツとして動作）。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The portfolio MUST include a clearly labeled Speaker Deck URL within the Activities/Talks context.
- **FR-002**: The Speaker Deck URL MUST be presented as an external link (destination is clear to the visitor).
- **FR-003**: Clicking the Speaker Deck URL MUST not break page layout or navigation.
- **FR-004**: The change MUST be consistent with the existing content structure (Talks items/links) so it remains maintainable.
- **FR-005**: The repo MUST remain buildable and deployable using the standard workflow.

### Key Entities *(include if feature involves data)*

- **External Link**: label + URL for the Speaker Deck profile.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach the Speaker Deck profile from the Activities/Talks area in ≤ 2 clicks.
- **SC-002**: The Speaker Deck link label is unambiguous to a first-time visitor (“Speaker Deck” or equivalent).
- **SC-003**: `pnpm lint` and `pnpm build` succeed.
