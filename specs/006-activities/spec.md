# Feature Specification: 006 – Activities (Talks / Books / Community)

**Feature Branch**: `006-activities`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "登壇歴、書籍の執筆、コミュニティ活動などをまとめたい。blogと一緒にするか分けるかは考えたい。"

## Scope

- Add an **Activities** proof surface for:
  - **Talks** (登壇)
  - **Books** (書籍執筆)
  - **Community** (コミュニティ活動)
- Decide IA:
  - **Option A**: Keep `Writing` as-is and add a separate `Activities` section + TOC item
  - **Option B**: Merge into a single section (e.g., `Writing & Activities`) to keep TOC compact

## Non-goals / constraints

- No scraping / auth / API integration for v1 (link-only + short metadata is enough).
- Avoid adding new runtime dependencies.
- Preserve the single-page UX + TOC navigation (<= 8 items guideline).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 第三者が「アウトプット/社会的活動」を把握できる (Priority: P1)

採用/協業の読者として、プロダクト実績だけでなく、登壇・執筆・コミュニティ活動からも人物像と影響範囲を理解したい。

**Why this priority**: アウトプットは意思決定/継続性/発信力の証拠で、ポートフォリオの説得力を上げるため。

**Independent Test**: TOC→該当セクションへ移動し、Talks/Books/Community が見つかり、リンクが安全に開く。

**Acceptance Scenarios**:

1. **Given** ポートフォリオを開く、**When** TOCからActivities（または統合セクション）へ移動する、**Then** 一覧が見える
2. **Given** 各項目にリンクがある、**When** クリックする、**Then** 別タブで安全に開く（`rel="noreferrer"`）

---

### User Story 2 - blogとの情報設計が破綻しない (Priority: P2)

サイトオーナーとして、blog（Writing）と活動（Talks/Books/Community）の住み分けが自然で、TOCが過密にならないようにしたい。

**Why this priority**: 目次の認知負荷が上がると、読み手が迷うため。

**Independent Test**: TOC項目が過剰にならず、WritingとActivitiesの区別が明確。

**Acceptance Scenarios**:

1. **Given** TOCを開く、**When** 一覧を見る、**Then** 8項目以内でスキャンできる
2. **Given** Writing/Activities がある、**When** それぞれ開く、**Then** 役割（文章 vs 活動）が直感的にわかる

---

### Edge Cases

- Activitiesの項目が0件の場合でもUIが壊れない（“Coming soon” など明示）
- 外部リンクが一時的に落ちていてもページ自体は壊れない
- private override 機構を壊さない（このfeatureはpublic側の導線/表示追加）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Talks/Books/Community を表現できるセクションが存在しなければならない
- **FR-002**: 各項目は最小限のメタデータ（title/year + optional link）を持てなければならない
- **FR-003**: 外部リンクは別タブで開き、`rel="noreferrer"` を付与しなければならない
- **FR-004**: TOC/アンカー移動のUXを壊してはならない（8項目ガイドも考慮）
- **FR-005**: 既存の `portfolio.writing` と整合する情報設計でなければならない（統合/分離の判断含む）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 読者が1分以内に「登壇/執筆/コミュニティ活動」の有無と概要を把握できる
- **SC-002**: `pnpm lint` と `pnpm build` が通る


