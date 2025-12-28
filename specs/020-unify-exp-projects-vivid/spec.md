# Feature Specification: Unify Experience + Projects (No Spreadsheet) + Vivid UI

**Feature Branch**: `020-unify-exp-projects-vivid`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "1.まずはスプレッドシートの運用は無しにする。 2. ExperienceとProjectsは一つにする。一社毎に1つの文章を用意する。 3. 見た目を鮮やかにしたい。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Unified “Work” section (Priority: P1)

訪問者として、経歴と実績を別々に探さずに「会社ごとの文章」を読み、その会社の中の具体的な取り組み（Projects）まで一続きで把握したい。これにより短時間で人物像と実績の要点を理解できる。

**Why this priority**: 主要情報（何をやってきたか＋具体例）の到達性が最重要。  
**Independent Test**: ローカルで `pnpm dev` → トップページで Work セクションが1つになり、会社ごとに1文章 + 会社配下の Projects が表示されることを確認できる。  

**Acceptance Scenarios**:

1. **Given** トップページを開く、**When** 目次から Work を押す、**Then** Work セクションにスクロールし会社ごとの文章が読める
2. **Given** Work セクション、**When** 会社ブロックを複数表示する、**Then** 各会社が「1文章」で表現され、モバイルでも読める（改行/折返しが崩れない）
3. **Given** 会社ブロック、**When** その会社の Projects を表示する、**Then** 各 Project が title/summary/role/tech/outcome を満たす形で読める

---

### User Story 2 - No spreadsheet operation required (Priority: P2)

運用者として、Google Spreadsheet / Apps Script を使わず、リポジトリ内の `src/content/portfolio.ts` 編集だけで内容を管理したい。

**Why this priority**: 運用の複雑さ/事故リスクを下げるため。  
**Independent Test**: `.env.local` を作らなくても（または private URL を設定しなくても）`pnpm dev` が動き、公開内容が表示される。  

**Acceptance Scenarios**:

1. **Given** 環境変数が未設定、**When** `pnpm dev`、**Then** エラーなくページが表示される
2. **Given** Spreadsheet/URLベースの private 取得が無効、**When** リロード、**Then** 公開データのみで安定して描画される

---

### User Story 3 - More vivid look while keeping retro usability (Priority: P3)

訪問者として、全体が少し暗く地味に見えるので、レトロ感は保ちつつも鮮やかで楽しい見た目にしたい。

**Why this priority**: 第一印象（テンション/記憶）に効く。  
**Independent Test**: 変更前と比較して、背景/枠/見出し/リンクなどのアクセントが増え、かつ文字の可読性が落ちていないことを確認できる。  

**Acceptance Scenarios**:

1. **Given** トップページ、**When** スクロール、**Then** 見出し・アクセント・リンクが明確に見分けられる
2. **Given** モバイル幅、**When** 表示、**Then** コントラスト不足や読みにくさが発生しない

---

### Edge Cases

- 会社ブロックの文章が長い（3〜8行）場合でも、枠からはみ出さず読みやすいか？
- 会社数が 0 / 1 の場合でも、セクションが破綻しないか？
- リンク（Writing/Contact など）を鮮やかにしても、視認性とアクセシビリティを満たすか？

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システム MUST Experience と Projects を統合した単一セクション（例: `work`）を提供する
- **FR-002**: システム MUST `work` の中に会社（組織）単位のエントリを持ち、会社ごとに「1文章」を表示できるデータ構造を持つ
- **FR-003**: システム MUST 目次（TOC）から統合セクションへ遷移できる
- **FR-004**: システム MUST Spreadsheet/Apps Script を前提にしない（公開データはrepo内で完結する）
- **FR-005**: システム MUST レトロ aesthetic を維持しつつ、色のアクセントを増やして“鮮やかさ”を改善する
- **FR-006**: システム MUST 会社（work entry）配下に Projects を持てるようにし、各 Project は title/summary/role/tech/outcome(or learning) を提供する

### Key Entities *(include if feature involves data)*

- **WorkEntry (Company)**: 会社（または組織）単位のブロック。期間（year range）と本文（1文章）を持ち、配下に Projects を持てる
- **WorkProject**: 会社配下の具体的な取り組み（title/summary/role/tech/outcome）
- **Portfolio**: `work` セクションを含む全体モデル

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: トップページに Work セクションが1つだけ表示される（Experience/Projects の二重表示がない）
- **SC-002**: Work 内の各会社が 1文章で表示される（箇条書き多段化しない）
- **SC-003**: `.env.local` 未設定でも `pnpm dev` が動き、ページが表示できる
- **SC-004**: 見出し/リンク/アクセントの視認性が向上し、モバイルでも読みやすい（目視確認）
- **SC-005**: Work 内で Projects まで辿れ、各 Project が required fields を満たして表示される


