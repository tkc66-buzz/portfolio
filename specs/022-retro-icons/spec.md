# Feature Specification: Retro Icon Pack (UI icons)

**Feature Branch**: `022-retro-icons`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "アイコン画像を増やしたい。もちろんレトロなアイコン。"

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

### User Story 1 - Section icons (Priority: P1)

訪問者として、各セクションを一目で識別できるように、レトロなアイコンが見出しに付いていてほしい。

**Why this priority**: スクロール中の「どこを読んでいるか」の認知負荷を下げ、記憶に残る。

**Independent Test**: `pnpm dev` → Profile/Work/Writing/Activities/Skills/Contact の見出しにピクセルアイコンが表示される。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** セクション見出しを見る、**Then** 見出し左にレトロなアイコンが表示される
2. **Given** 画面幅が小さい、**When** 表示する、**Then** アイコンが潰れず、文字の可読性が落ちない

---

### User Story 2 - Link icons (Priority: P2)

訪問者として、Contact や外部リンクが“どこへ行くリンクか”直感的に分かるよう、アイコン付きで表示されてほしい。

**Why this priority**: 外部遷移への不安を減らし、クリック率を上げる（分かりやすさ）。

**Independent Test**: Contact のリンク（Email/GitHub/X/LinkedIn）がアイコン付きで表示され、キーボード操作でも破綻しない。

**Acceptance Scenarios**:

1. **Given** Contact セクション、**When** リンクを見る、**Then** ラベルの左にアイコンが付く
2. **Given** スクリーンリーダー、**When** 読み上げる、**Then** 装飾アイコンがノイズにならない（alt/ariaが適切）

---

### User Story 3 - Asset & accessibility guardrails (Priority: P3)

運用者として、アイコン追加でサイトが重くならず、アクセシビリティも担保したい。

**Why this priority**: 小さな改善でも“積み上げ”で重くなる。ルール化して劣化を防ぐ。

**Independent Test**: `pnpm lint` と `pnpm build` が通り、アイコンは `public/assets/pixel/icons/` 配下で一元管理される。

**Acceptance Scenarios**:

1. **Given** アイコン追加後、**When** `pnpm build`、**Then** 成功する
2. **Given** アイコンファイルが欠けている、**When** 表示する、**Then** レイアウトが壊れない（必要ならフォールバック）

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- アイコンのパスが間違っている/ファイルが欠けている
- 装飾アイコンの alt が読み上げのノイズになる
- アイコンが増えすぎて UI がうるさくなる（適用箇所の節度）
- モバイル表示でアイコンが潰れる

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST セクション見出しにレトロアイコンを表示できる
- **FR-002**: システム MUST Contact 等のリンクにレトロアイコンを表示できる
- **FR-003**: システム MUST アイコンを `public/assets/pixel/icons/` 配下で管理する
- **FR-004**: システム MUST 装飾アイコンのアクセシビリティを担保する（alt/aria）
- **FR-005**: システム MUST パフォーマンスを悪化させない（SVG中心、過剰に増やさない）

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*

- **IconAsset**: レトロアイコン（src, alt, size）
- **IconPlacement**: どこに表示するか（section heading, contact link, etc）

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 主要セクション（Profile/Work/Writing/Activities/Skills/Contact）の見出しにアイコンが付く
- **SC-002**: Contact リンクにアイコンが付く
- **SC-003**: `pnpm lint` と `pnpm build` が通る
