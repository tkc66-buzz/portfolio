# Feature Specification: Section typography size upgrade

**Feature Branch**: `024-section-typography`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "各SectionContentの文字サイズが小さすぎるので上げたい。"

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

### User Story 1 - Readable section body text (Priority: P1)

訪問者として、各セクション本文（説明文・段落・補足）が小さすぎず、自然に読める文字サイズになっていてほしい。

**Why this priority**: 読めないと内容が伝わらない。最重要の品質。

**Independent Test**: `pnpm dev` → Profile/Work/Writing/Activities/Skills/Contact の本文が “text-base相当以上” になり、モバイルでも読みやすい。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** 各セクション本文を見る、**Then** 小さすぎないサイズで表示される
2. **Given** モバイル幅、**When** 表示する、**Then** 行間/折返しが崩れず読みやすい

---

### User Story 2 - Keep hierarchy and retro mood (Priority: P2)

訪問者として、文字サイズを上げても見出し階層が崩れず、レトロな雰囲気が保たれていてほしい。

**Why this priority**: 文字が大きいだけで “野暮ったい” になるのを防ぐ。

**Independent Test**: 見出し（H2/H3）と本文のコントラストが維持され、セクション間の情報設計が分かりやすい。

**Acceptance Scenarios**:

1. **Given** 各セクション、**When** 見出し/本文を見る、**Then** 見出しが相対的に目立ち続ける

---

### User Story 3 - Maintainable typography tokens (Priority: P3)

開発者として、本文の文字サイズ/行間を“方針として一箇所”で管理できるようにしたい（増改築でブレない）。

**Why this priority**: 今後のUI調整でも再発しにくい。

**Independent Test**: 主要セクションは `section-body` のような共通クラス/定数で統一できる。

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- モバイルでの折り返し/はみ出し（ボタン・バッジ・長文）
- 文字サイズ上げにより “情報量が多く見える” ので、余白/行間が必要になる
- Activities/Skills のような密度が高い箇所が破綻しない

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST 各セクション本文（段落/説明文）のデフォルト文字サイズを上げる
- **FR-002**: システム SHOULD `text-xs` 相当の本文を減らし、必要箇所のみ小さめ表示に限定する
- **FR-003**: システム MUST 見出し階層（H2/H3）と本文の視覚的コントラストを維持する
- **FR-004**: システム SHOULD 本文のタイポグラフィ（サイズ/行間）を共通トークンとして一箇所に集約する（CSSクラス or 定数）

### Key Entities *(include if feature involves data)*

- N/A (UI-only)

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 主要セクション本文が読みやすい文字サイズになっている（目視で “小さすぎない”）
- **SC-002**: `pnpm lint` と `pnpm build` が通る
