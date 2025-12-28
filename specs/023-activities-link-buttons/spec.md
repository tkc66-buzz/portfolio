# Feature Specification: Activities link button sizing unification

**Feature Branch**: `023-activities-link-buttons`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "Activitiesのlinkボタンが大きさ違くてダサいので統一したい。"

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

### User Story 1 - Consistent Activities link buttons (Priority: P1)

閲覧者として、Activities の各アイテムに付くリンクボタンが同じ見た目（サイズ/高さ/余白）で揃っていてほしい。

**Why this priority**: 視覚的なノイズが減り、一覧のリズムが良くなる（“ダサい”を潰す）。

**Independent Test**: `pnpm dev` → Activities の複数リンクボタンが、ラベル長に関わらず同じ高さで表示される（折返しで高さが変わらない）。

**Acceptance Scenarios**:

1. **Given** Activities に複数のリンク付きアイテムがある、**When** 画面表示する、**Then** ボタンの高さ/文字サイズ/余白が統一される
2. **Given** リンクラベルが長い、**When** 表示する、**Then** ボタンが折り返さず（高さが増えず）見た目が崩れない

---

### User Story 2 - A11y + focus consistency (Priority: P2)

閲覧者として、キーボード操作時のフォーカス状態が他のボタンと同様に分かりやすいままであってほしい。

**Why this priority**: “揃える”変更でアクセシビリティや視認性が悪化しないようにする。

**Independent Test**: Activities のリンクボタンに Tab で移動しても視認性が保たれ、クリック領域が小さくなりすぎない。

**Acceptance Scenarios**:

1. **Given** キーボード操作、**When** Tab でリンクボタンにフォーカス、**Then** フォーカスが視認できる

---

### User Story 3 - Maintainability (Priority: P3)

開発者として、Activities のリンクボタンの見た目を一箇所の定義で管理できるようにしたい。

**Why this priority**: 今後ラベルや表示箇所が増えても “不揃い” が再発しにくい。

**Independent Test**: 変更が `src/components/sections/ActivitiesSection.tsx`（必要なら `src/app/globals.css`）に閉じる。

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- リンクラベルが長い（折返しで高さが変わる問題の再発）
- リンクがないアイテム（ボタンが存在しない）
- モバイル幅での表示（ボタンがはみ出す/潰れる）

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST Activities のリンクボタンの高さ/文字サイズ/余白を統一する（`src/components/sections/ActivitiesSection.tsx`）
- **FR-002**: システム MUST 長いラベルでもボタンが折り返して高さが増えないようにする（例: `whitespace-nowrap`）
- **FR-003**: システム MUST キーボードフォーカスの視認性を維持する
- **FR-004**: システム SHOULD ボタンスタイルの定義を一箇所に集約する（定数 or CSSクラス）

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- N/A (UI-only change)

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Activities のリンクボタンが統一された見た目になっている
- **SC-002**: `pnpm lint` と `pnpm build` が通る
