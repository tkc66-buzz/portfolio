# Feature Specification: Phase 2 Content – Public Storytelling (Experience/Projects/Contact)

**Feature Branch**: `004-content-public-story`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "003はmergeした。次はExperience/Projects/Contactの公開向けコンテンツを完成させたい（Privateは外部データ運用）。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 初見で「何ができる人か」が2分で伝わる (Priority: P1)

採用/協業の初見ユーザーとして、スクロールしながら短時間で「強み・実績・仕事の進め方」を把握したい。

**Why this priority**: ポートフォリオの第一目的（理解/判断）に直結するため。

**Independent Test**: 初見の第三者が `Profile → Experience → Projects → Skills` を順に読んで、要約（強み/証拠/価値）を説明できる。

**Acceptance Scenarios**:

1. **Given** ページを開く、**When** Profile/Experience/Projects を読む、**Then** 強みが具体的な証拠（成果/役割/規模感）と一緒に提示される
2. **Given** Projects を開く、**When** 各カードを見る、**Then** 役割/技術/成果(または学び)が1カード内で完結する

---

### User Story 2 - 守秘しながらも価値が伝わる (Priority: P2)

サイトオーナーとして、NDA等で公開できない情報は外部データやredactionで守りつつ、公開ページだけでも価値が伝わる見せ方にしたい。

**Why this priority**: 守秘が最優先だが、公開ページの説得力も落としたくないため。

**Independent Test**: `visibility="private"` の実績が混ざっていても、公開側のProjects/Experienceが薄く見えない。

**Acceptance Scenarios**:

1. **Given** private project が存在する、**When** Projects を見る、**Then** 機密を漏らさず「どんな課題領域/役割/インパクトか」が最小情報で伝わる
2. **Given** private override が落ちる、**When** 表示する、**Then** public の文章で破綻なく成立する（壊れない）

---

### User Story 3 - 連絡導線が明確で行動に繋がる (Priority: P3)

採用担当/協業相手として、何を依頼できる人かが分かり、連絡手段を迷わず選べる。

**Why this priority**: CTAの強さはコンバージョン（連絡）に直結するため。

**Independent Test**: Contactを見て、どの手段で連絡すべきか迷わない。

**Acceptance Scenarios**:

1. **Given** Contact を開く、**When** 文面を見る、**Then** 依頼/相談の例と返信期待（目安）が明確
2. **Given** 外部リンクをクリックする、**When** 別タブで開く、**Then** 安全に開く（`rel="noreferrer"` 等）

---

### Edge Cases

- publicPortfolio だけの場合（private override無し）でも文脈が壊れない
- private override が部分的（Experienceだけ/Projectsだけ）でも成立する
- `visibility="private"` が多い場合でも Projects がスカスカに見えない

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 公開ページの主要コピー（Profile/Experience/Projects/Contact）は placeholder を含まず、読める文章で成立しなければならない
- **FR-002**: Projects の各カードは最低限「title/summary/role/tech/outcomeOrLearning」を満たさなければならない（privateの場合はredaction方針に従う）
- **FR-003**: Experience は「期間感/責務/成果（定量 or 代替表現）」が少なくとも1つは含まれなければならない（守秘範囲で）
- **FR-004**: Contact には “何を連絡してほしいか” の例が含まれなければならない
- **FR-005**: 既存の private overrides（env/url）機構を壊さず、public-only でも壊れない

### Key Entities *(include if feature involves data)*

- **Experience**: 見せたい責務・成果・期間感（公開用の最小単位）
- **Project**: 公開/非公開の見せ方（redaction込み）
- **Contact CTA**: 依頼の種類/期待値

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 初見ユーザーが2分で「強み・実績」を要約できる（第三者レビューで確認）
- **SC-002**: public-only でも placeholder/破綻した文章が無い
- **SC-003**: private project が混ざっても「価値が薄い」印象にならない（カード密度/説明で補完）

