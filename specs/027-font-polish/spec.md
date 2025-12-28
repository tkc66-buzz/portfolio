# Feature Specification: Font polish (retro readability)

**Feature Branch**: `027-font-polish`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "フォントの具体強化をまずはやろう"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Headings feel more “8-bit” without hurting reading (Priority: P1)

閲覧者として、各セクションの見出しやHUD（MENU/ステージ表示）が、より“ゲームっぽい”フォント表現になっていて、サイトの世界観が強く感じられる一方で、本文の読みやすさは落ちないでほしい。

**Why this priority**: 見出しは第一印象を決める“顔”なので、ここが整うと全体の作り込み感が一気に上がる。

**Independent Test**: トップページ（Hero→Menu→各セクション）を見て、見出しがよりレトロに見える一方、本文は読みやすいまま。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** 各セクション見出しを見る、**Then** レトロ感のある見出し表現になっている
2. **Given** トップページ、**When** 本文を読む、**Then** 文字が潰れず読みやすい

---

### User Story 2 - Japanese text stays legible (Priority: P2)

閲覧者として、日本語の情報が多いページでも、フォントの変更によって読みにくくならず、長文でも目が疲れにくい状態を維持してほしい。

**Why this priority**: 日本語のドット系フォントは雰囲気が出る一方、読みづらくなりやすい。読みやすさを守る。

**Independent Test**: Profile/Work/Activities/Skills/Contact の文章をスクロールして読んでも、可読性が維持される。

**Acceptance Scenarios**:

1. **Given** 長文の日本語本文、**When** スクロールして読む、**Then** 可読性が維持される（小さすぎ/潰れ/詰まりがない）

---

### User Story 3 - Font choice is safe and durable (Priority: P3)

開発者として、導入するフォントがライセンス的に安全で、将来の運用でも“変な依存”にならず、サイトの表示が壊れにくい状態にしたい。

**Why this priority**: フォントは見た目に直結し、かつライセンス/配布元変更などのリスクがあるため。

**Independent Test**: フォントが読み込めない状況でも、フォールバックで表示が成立する。

**Acceptance Scenarios**:

1. **Given** フォントが取得できない環境、**When** ページを表示する、**Then** 代替フォントで破綻せず表示される

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システム MUST 見出し（Hero/各セクション見出し/HUDラベル）に対して、よりレトロ感のあるフォント表現を適用する
- **FR-002**: システム MUST 本文の可読性を維持する（本文用フォントは“読みやすさ”優先のままにする）
- **FR-003**: システム MUST 日本語テキストの可読性を損なわない（小さすぎ/潰れ/詰まりを避ける）
- **FR-004**: システム MUST フォントが読み込めない場合でも表示が破綻しない（フォールバックが機能する）
- **FR-005**: システム MUST 導入するフォントの利用条件が明確で、公開リポジトリとして安全である
- **FR-006**: システム SHOULD フォントの適用範囲をトークン化し、追加セクションでも一貫性が保てる

### Edge Cases

- 小さい画面や縮小表示でも、見出しが読める
- 太字/細字がないフォントでもレイアウトが崩れない
- ネットワークが遅い/フォントが取得できない場合でもFOIT（文字が消える）を避ける

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 見出しの“レトロ感”が増したと感じられる（見出しと本文の役割が視覚的に分離される）
- **SC-002**: 本文の読みやすさが維持される（長文でも読み進められる）
- **SC-003**: フォントが読み込めない状況でも内容が読める（フォールバックで破綻しない）
- **SC-004**: `pnpm lint` と `pnpm build` が通る
