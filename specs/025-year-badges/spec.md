# Feature Specification: Year badge readability upgrade (non-Skills)

**Feature Branch**: `025-year-badges`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "skills以外のsectionのyearが小さすぎて見えないので大きくして統一したい"

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

### User Story 1 - Readable “year” badges (Priority: P1)

閲覧者として、Skills以外のセクションで表示される “year/period” バッジが小さすぎず、ひと目で読める大きさになっていてほしい。

**Why this priority**: 年（時系列）は一覧のキー情報なので、読めないと価値が落ちる。

**Independent Test**: `pnpm dev` → Workのperiod、ActivitiesのyearバッジがSkillsと同等の視認性で表示される。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** Workのperiodを見る、**Then** 小さすぎず読める
2. **Given** トップページ、**When** Activitiesのyearを見る、**Then** 小さすぎず読める

---

### User Story 2 - Keep layout stable (Priority: P2)

閲覧者として、yearバッジを大きくしてもレイアウトが崩れず、モバイルでも詰まりすぎない見た目であってほしい。

**Why this priority**: 文字だけ大きくすると詰まり・折返し・ズレが起きやすい。

**Independent Test**: モバイル幅でもバッジが潰れず、行の高さが極端に増えない。

**Acceptance Scenarios**:

1. **Given** モバイル幅、**When** 表示する、**Then** year/periodバッジで行が破綻しない

---

### User Story 3 - Single source of truth (Priority: P3)

開発者として、year/periodバッジのサイズ方針を一箇所に集約し、今後の追加で不揃いが再発しないようにしたい。

**Why this priority**: UIの一貫性を保つため。

**Independent Test**: 共通クラス（例: `.year-badge`）で管理され、個別の `text-[0.6rem]` が散らばらない。

**Acceptance Scenarios**:

1. **Given** year/periodバッジが複数箇所にある、**When** 実装を見る、**Then** 共通クラスで統一されている

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- 年/期間文字列が長い（例: “2019–2025”）場合でも見切れない
- モバイル幅で詰まる場合の折返し/省略の扱い
- Skillsは対象外（既存の見た目を維持）

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST Skills以外の year/period バッジの文字サイズを引き上げる
- **FR-002**: システム MUST Workのperiodバッジ（`WorkSection`）と Activitiesのyearバッジ（`ActivitiesSection`）の見た目を統一する
- **FR-003**: システム MUST モバイルでもレイアウトが崩れないようにする（折返し・詰まり対策）
- **FR-004**: システム SHOULD year/period バッジのスタイルを一箇所に集約する（共通クラス）
- **FR-005**: システム MUST Skillsセクションのyear表示は変更しない（対象外）

### Key Entities *(include if feature involves data)*

- N/A (UI-only)

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Work/Activitiesのyear/periodバッジがひと目で読めるサイズになっている
- **SC-002**: モバイル幅でレイアウトが破綻しない
- **SC-003**: `pnpm lint` と `pnpm build` が通る
