# Feature Specification: Motion polish (site-wide)

**Feature Branch**: `026-motion-polish`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "もっとデザイン性上げたいね。サイト内の動きが欲しいんだけど、何かブラッシュアップのいいアイディアないかな"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactions feel “alive” (Priority: P1)

閲覧者として、ボタンやリンク、セクション見出しなどの主要なUI要素に、押した/触れた/フォーカスしたことが分かる「気持ちいい反応」があり、サイト全体が生きているように感じたい。

**Why this priority**: まず体験の第一印象（触った瞬間の反応）が“作り込み感”を決めるため。

**Independent Test**: トップページで Menu / Work / Activities / Contact の主要ボタン・リンクを操作し、常に「反応が返る」ことが確認できる。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** Menu のボタンをクリック/タップする、**Then** 入力が受理されたことが視覚的に分かる（押下感 or 変化）
2. **Given** トップページ、**When** キーボードでリンクにフォーカスする、**Then** フォーカス位置が明確に分かる（見落とさない）

---

### User Story 2 - Scrolling has feedback (Priority: P2)

閲覧者として、スクロール中に「今どこを読んでいるか」「次に何があるか」が感覚的に分かり、読み進めるモチベーションが落ちないようにしたい。

**Why this priority**: 1ページ完結のサイトはスクロール量が増えやすく、位置の把握が難しいと離脱しやすい。

**Independent Test**: トップページを上から下へスクロールし、「現在地」と「進捗」を視覚的に把握できる。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** スクロールする、**Then** 現在地が分かるフィードバックが表示される

---

### User Story 3 - Motion is comfortable (Priority: P3)

閲覧者として、動きが“うるさすぎ”たり“酔う”ようなものではなく、好みや事情に合わせて不快にならない範囲で提供されてほしい。

**Why this priority**: 動きは品質を上げる一方で、過剰だと可読性/アクセシビリティを損なう。

**Independent Test**: 動きが苦手なユーザーでも主要情報（Hero/Work/Skills/Contact）が問題なく読める。

**Acceptance Scenarios**:

1. **Given** 動きが苦手なユーザー、**When** サイトを見る、**Then** 動きが主張しすぎず読みやすい

---

### Edge Cases

- 端末がタッチ操作で hover が成立しない場合でも、操作の反応が分かる
- キーボード操作時（フォーカス移動）に反応が分かる
- 低速端末/省電力モードでも“重い”体験にならない
- 既存のレトロ雰囲気（NES.css + Famicom palette）を壊さない

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システム MUST 主要なインタラクティブ要素（Menu/リンク/ボタン）に、操作の受理が分かる視覚フィードバックを提供する
- **FR-002**: システム MUST スクロールに対して「現在地」または「進捗」が分かるフィードバックを提供する
- **FR-003**: システム MUST 動きが主張しすぎないこと（可読性を阻害しない）を担保する
- **FR-004**: システム MUST 既存のレトロ表現（NES.css + 既存配色）と整合する動きに限定する
- **FR-005**: システム MUST 主要コンテンツ（Hero/Work/Skills/Contact）の情報価値を下げない（動きが邪魔をしない）

- **FR-006**: システム MUST 全体の動きの方向性を「派手」寄りにする（レトロな“ゲームっぽさ”を体感できる範囲で強める）
- **FR-007**: システム MUST スクロール時のフィードバックとして「進捗バー」と「現在のセクション強調」の両方を提供する（両立させる）

### Key Entities *(include if feature involves data)*

- **Motion feedback**: クリック/タップ/フォーカス/スクロールの操作に対する視覚的な反応
- **Scroll feedback**: 「現在地」または「進捗」を示すUI要素

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: トップページで、主要なリンク/ボタンの操作時に視覚フィードバックが **100%** 返る（無反応な主要要素が残らない）
- **SC-002**: スクロール中に「現在地」または「進捗」が常に把握できる（ページ中のどこにいても確認できる）
- **SC-003**: 主要コンテンツ（Hero/Work/Skills/Contact）の可読性が維持される（動きが読みを妨げない）
- **SC-004**: `pnpm lint` と `pnpm build` が通る
