# Feature Specification: Gamefeel Upgrade (Images/Diagrams + Retro Motion)

**Feature Branch**: `021-gamefeel`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "雰囲気を残しつつ、図や画像やゲームらしい動きを入れてクオリティを上げたい。"

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

### User Story 1 - Visual proof assets (Priority: P1)

訪問者として、文章だけでなく図/画像があることで、理解が早く・印象に残る形で Work/Projects を読めるようにしたい。

**Why this priority**: Portfolioは初見の理解速度が価値。画像/図は最短で伝わる“証拠”になる。

**Independent Test**: `pnpm dev` → Workセクションの少なくとも1つのProjectに画像/図が表示され、リンク/レイアウトが崩れない。

**Acceptance Scenarios**:

1. **Given** トップページを開く、**When** Workを読む、**Then** Projectカードにサムネイル/図が表示される
2. **Given** 画像が読み込めない/存在しない、**When** 表示する、**Then** 代替（プレースホルダ/alt）がありレイアウトが壊れない

---

### User Story 2 - Game-like micro motion (Priority: P2)

訪問者として、レトロ雰囲気を損なわずに“ゲームっぽい動き”があることで、触って楽しい・記憶に残る体験にしたい。

**Why this priority**: “雰囲気”の強化が差別化要因になり、滞在/スクロールを促す。

**Independent Test**: 主要UIに軽量なモーションが追加され、`prefers-reduced-motion` では無効化される。

**Acceptance Scenarios**:

1. **Given** 標準設定、**When** Hero/Menu/Work を見る、**Then** 目立ちすぎないレトロなモーションが確認できる
2. **Given** `prefers-reduced-motion: reduce`、**When** 表示する、**Then** モーションが抑制される（静的に見える）

---

### User Story 3 - Quality + performance guardrails (Priority: P3)

運用者として、画像/モーション追加でサイトが重くならず、Next.js/Vercelで安全に運用できる形にしたい。

**Why this priority**: パフォーマンス劣化はユーザー体験のバグ。特にモバイルで顕著。

**Independent Test**: `pnpm lint` と `pnpm build` が通り、画像は最適化され、モーションはCSS中心で軽量。

**Acceptance Scenarios**:

1. **Given** 変更後、**When** `pnpm build`、**Then** ビルドが成功する
2. **Given** 画像が多いページ、**When** スクロール、**Then** 体感で引っかかりが増えない（過度なアニメ/JSを避ける）

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- 画像が未設定/ファイルが欠けている場合
- SVG/PNG/WebP など形式差が混在する場合
- `prefers-reduced-motion` での挙動
- モバイル（低スペック）での描画負荷（アニメの多用/影/ぼかし）
- 外部リンクの安全性（target/rel）

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: システム MUST Work/Projects に図や画像（サムネ/ダイアグラム）を表示できる
- **FR-002**: システム MUST 画像が欠けても壊れない（代替表示/レイアウト維持）
- **FR-003**: システム MUST “ゲームらしい動き”を追加する（CSS中心、過度な演出は避ける）
- **FR-004**: システム MUST `prefers-reduced-motion` に従いモーションを抑制できる
- **FR-005**: システム MUST パフォーマンスを悪化させない（大きなJS追加・重いアニメを避ける）

### Key Entities *(include if feature involves data)*

- **Asset**: 画像/図のメタ（src, alt, kind）
- **MotionPreset**: UIで使うモーション（name, duration, reducedMotionBehavior）

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Work内の少なくとも1つのProjectに画像/図が表示される
- **SC-002**: `prefers-reduced-motion` 有効時、主要なモーションが抑制される
- **SC-003**: `pnpm lint` と `pnpm build` が通る
