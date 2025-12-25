# Feature Specification: 005 – Writing / Blog Links

**Feature Branch**: `005-blog-links`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "自身のblogを載せたい（Tech: Medium / Casual: しずかなインターネット）"

## Scope

- Add a **Writing** (or **Blog**) entry point on the portfolio page that links to:
  - Tech blog (Medium): `https://medium.com/@buzz_tkc`
  - Casual blog (しずかなインターネット): `https://sizu.me/buzz`

## Non-goals / constraints

- No scraping or auth. Link-only is sufficient for v1.
- Avoid adding new runtime dependencies.
- Preserve the single-page UX + TOC navigation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 読者がブログへ迷わず到達できる (Priority: P1)

採用/協業の読者として、ポートフォリオを読んだ後に文章（テック寄り/雑記寄り）も見て人物像を掴みたい。

**Why this priority**: 文章は価値観/判断/継続性の証拠になり、ポートフォリオの説得力を上げるため。

**Independent Test**: TOCからWritingへ移動し、2つのリンクが安全に開ける（外部は別タブ + `rel="noreferrer"`）。

**Acceptance Scenarios**:

1. **Given** ポートフォリオを開く、**When** TOCからWritingへ移動する、**Then** Writingセクションが見える
2. **Given** Writingセクションを見る、**When** Tech/Casual blogリンクを押す、**Then** 正しいURLが別タブで開く（安全属性付き）

---

### Edge Cases

- TOC項目追加で8項目を超えない（超える場合は統合）
- 外部リンクが一時的に落ちていてもページ自体は壊れない
- 既存の private overrides 機構を壊さない（このfeatureはpublic側の導線追加のみ）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: ポートフォリオ上にブログ導線（Writing/Blog）が存在しなければならない
- **FR-002**: Tech blog と Casual blog の2リンクを表示しなければならない
- **FR-003**: 外部リンクは別タブで開き、`rel="noreferrer"` を付与しなければならない
- **FR-004**: 既存のTOC/アンカー移動のUXを壊してはならない

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 読者が1クリックでTech/Casual blogへ到達できる
- **SC-002**: `pnpm lint` と `pnpm build` が通る


