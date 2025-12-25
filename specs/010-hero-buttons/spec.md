# Feature Specification: Hero Start/Continue Buttons (Navigation)

**Feature Branch**: `010-hero-buttons`  
**Created**: 2025-12-25  
**Status**: Implemented (retroactive spec)  
**Input**: User description: "010のものを後追いでいいから追加して"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Heroのボタンが迷わず使える (Priority: P1)

Hero に “Start / Continue” ボタンが表示されている場合、押したら期待通りにページ内ナビゲーションが発生し、押しても何も起きない混乱をなくす。

**Why this priority**: 入口のUIで「押せそうなのに何も起きない」はUXとして致命的で、離脱につながる。

**Independent Test**:
- “Start” を押すと `#profile` に移動する
- “Continue” を押すと、最後に見ていたセクション（hash）に戻る（初回はデフォルトへ）

**Acceptance Scenarios**:
1. **Given** 初回訪問（保存hashなし）、**When** Continue を押す、**Then** `#experience` に移動する
2. **Given** 目次で `#projects` に移動済み、**When** Continue を押す、**Then** `#projects` に移動する
3. **Given** 任意の状態、**When** Start を押す、**Then** `#profile` に移動する

---

### Edge Cases

- localStorage が使えない（プライベートブラウズ/ブロック）場合でも壊れないこと
- 不正なhash（`#`のみ、空）を保存/復帰しないこと

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Start は `#profile` に遷移する
- **FR-002**: Continue は直近のhashに遷移し、未保存時はデフォルト（`#experience`）に遷移する
- **FR-003**: 直近hashは、ページ内のhashchange（TOCやHero操作）から保存する
- **FR-004**: localStorage が利用できない環境でもサイトを壊さない（例外を握りつぶす）

### Key Entities *(include if feature involves data)*

- **LastVisitedHash**: `localStorage["portfolio:lastHash"]` に保存する `#...` 文字列

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Heroボタンが“押しても何も起きない”状態がなくなる
- **SC-002**: 初回でも Continue が意図した場所（デフォルト）へ案内できる


