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
- “Start” を押すと `#experience` に移動する
- “Continue” を押すと、毎回ランダムなセクションへ移動する（現在見ているセクションは避ける）

**Acceptance Scenarios**:
1. **Given** 任意の状態、**When** Start を押す、**Then** `#experience` に移動する
2. **Given** `#projects` を表示中、**When** Continue を押す、**Then** `#projects` 以外のどこかへ移動する
3. **Given** `#skills` を表示中、**When** Continue を連続で押す、**Then** 毎回いずれかのセクションへ移動する（同一セクション固定にならない）

---

### Edge Cases

- hashが付いていない状態でスクロールしていても、Continueが現在表示中のセクションを避けられること
- すべてのセクションがDOM上に存在しないケースでも（想定外）、Continueが落ちないこと

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Start は `#experience` に遷移する
- **FR-002**: Continue はランダムにセクションへ遷移する（現在見ているセクションは避ける）
- **FR-003**: Continue は “必ず動く” こと（同一セクションへの遷移を避ける）
- **FR-004**: 追加依存は入れず、クライアントコードを最小に保つ

### Key Entities *(include if feature involves data)*

- なし（永続状態は持たない）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Heroボタンが“押しても何も起きない”状態がなくなる
- **SC-002**: Continue が “ワープ” として直感的に機能し、押すたびに動く


