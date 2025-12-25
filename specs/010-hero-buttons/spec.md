# Feature Specification: Hero “Menu” Button (Navigation)

**Feature Branch**: `010-hero-buttons`  
**Created**: 2025-12-25  
**Status**: Implemented (retroactive spec)  
**Input**: User description: "010のものを後追いでいいから追加して"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Heroの「Menu」ボタンが迷わず使える (Priority: P1)

Hero に “Menu” ボタンが表示されている場合、押したら目次（TOC）へ移動し、迷子にならずに各セクションへ移動できる。

**Why this priority**: 入口のUIで「押せそうなのに何も起きない」はUXとして致命的で、離脱につながる。

**Independent Test**:
- “Menu” を押すと `#toc` に移動する

**Acceptance Scenarios**:
1. **Given** 任意の状態、**When** Menu を押す、**Then** `#toc` に移動する

---

### Edge Cases

- `#toc` が存在しない場合でも（想定外）、ページが壊れないこと

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Menu は `#toc` に遷移する
- **FR-002**: 追加依存は入れず、Server Componentを維持する（単純なアンカーリンク）

### Key Entities *(include if feature involves data)*

- なし（永続状態は持たない）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Heroボタンが“押しても何も起きない”状態がなくなる
- **SC-002**: Continue が “ワープ” として直感的に機能し、押すたびに動く


