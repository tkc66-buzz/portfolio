# Feature Specification: Achievement Unlocked toast (Activities)

**Feature Branch**: `028-achievement-unlocked`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Activitiesセクションに『Achievement Unlocked』風のトースト演出を追加したい。初回だけ表示（初回スクロールでActivitiesが画面内に入ったタイミングで1回）、閉じる操作も可能、reduced-motionでは演出を無効化して静的表示/非表示にする。"

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

### User Story 1 - [Brief Title] (Priority: P1)

閲覧者として、Activitiesへ到達した瞬間に「Achievement Unlocked」風のトーストが1回だけ出て、サイト体験に“ゲームらしさ”が追加されてほしい。

**Why this priority**: 全セクションが似た構造になりがちなので、Activitiesに1つだけ強い体験を入れて印象を作る。

**Independent Test**: ページを上からスクロールし、Activitiesが初めて画面内に入った時に1回だけトーストが表示される。

**Acceptance Scenarios**:

1. **Given** 初回訪問のページ表示、**When** Activitiesが画面内に入る、**Then** トーストが1回だけ表示される
2. **Given** トーストが表示済み、**When** 上下にスクロールして再度Activitiesへ入る、**Then** 再表示されない

---

### User Story 2 - [Brief Title] (Priority: P2)

閲覧者として、トーストが邪魔なら閉じられて、その後は再表示されないでほしい。

**Why this priority**: “派手”は副作用が出やすいので、ユーザー主導で制御できるようにする。

**Independent Test**: トーストの閉じるUIが押せ、閉じた後は再表示されない。

**Acceptance Scenarios**:

1. **Given** トースト表示中、**When** Close を押す、**Then** トーストが消える
2. **Given** Close 済み、**When** スクロールでActivitiesへ入り直す、**Then** 再表示されない

---

### User Story 3 - [Brief Title] (Priority: P3)

閲覧者として、動きが苦手な場合は派手な演出なしで（または非表示で）、サイトが読みやすいままであってほしい。

**Why this priority**: 憲法の “Retro + Usability” と reduced-motion 方針を守る。

**Independent Test**: reduced-motion 環境で、派手なアニメーションが起きない。

**Acceptance Scenarios**:

1. **Given** reduced-motion 有効、**When** Activitiesへスクロールする、**Then** アニメーション無しで静的に表示（または表示しない）

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- ページ再読み込みでの扱い（“初回だけ”をどこまで永続化するか）
- Activitiesが最初から画面内にある（小さい画面/スクロール位置復元）
- JSが無効/遅延しても本文が読める（トーストは任意）
- 連打/多重表示が起きない（Observer/scroll handlerの多重登録）

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST Activitiesが初めて画面内に入ったタイミングで、Achievement Unlocked トーストを1回だけ表示する
- **FR-002**: システム MUST トーストをユーザーが閉じられるようにする
- **FR-003**: システム MUST 閉じた後は再表示しない
- **FR-004**: システム MUST reduced-motion では派手な演出を無効化する（静的表示 or 非表示）
- **FR-005**: システム MUST Activitiesの本文可読性を損なわない（被り/レイアウト崩れを防ぐ）
- **FR-006**: システム SHOULD トースト表示状態をセッション内で記録し、リロード/戻るでも過剰再表示を避ける

### Key Entities *(include if feature involves data)*

- **Toast state**: shown/dismissed flags（session-scoped）
- **Trigger**: Activities section in-view detection

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Activities到達時にトーストが1回だけ表示される（再スクロールで増殖しない）
- **SC-002**: ユーザーがトーストを閉じられる（閉じた後に再表示されない）
- **SC-003**: reduced-motion 環境で派手なアニメーションが発生しない
- **SC-004**: `pnpm lint` と `pnpm build` が通る
