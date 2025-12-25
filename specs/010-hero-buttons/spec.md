# Feature Specification: Menu Navigation (Hero + Menu)

**Feature Branch**: `010-hero-buttons`  
**Created**: 2025-12-25  
**Status**: Implemented (retroactive spec)  
**Input**: User description: "010のものを後追いでいいから追加して"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Menuが迷わず使える (Priority: P1)

Hero 直下に Menu が表示されており、迷子にならずに各セクションへ移動できる。

**Why this priority**: 入口のUIで「押せそうなのに何も起きない」はUXとして致命的で、離脱につながる。

**Independent Test**:

- Menu から任意のセクションへ移動できる

**Acceptance Scenarios**:

1. **Given** 初見ユーザー、**When** Menu のボタンを押す、**Then** 対応するセクションへ移動する

---

### Edge Cases

- Menu が画面外にある場合でも、スクロールで到達できること

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Menu から各セクションへ hash navigation できる
- **FR-002**: 追加依存は入れず、Server Componentを維持する（単純なアンカーリンク）

### Key Entities _(include if feature involves data)_

- なし（永続状態は持たない）

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Heroボタンが“押しても何も起きない”状態がなくなる
- **SC-002**: Continue が “ワープ” として直感的に機能し、押すたびに動く
