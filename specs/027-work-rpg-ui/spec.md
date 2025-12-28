# Feature Specification: Work RPG UI (status + quest log)

**Feature Branch**: `027-work-rpg-ui`  
**Created**: 2025-12-28  
**Status**: Draft  
**Input**: User description: "WorkセクションをRPGのステータス画面/クエストログ風にして、1つだけ奇抜な見た目とアニメーションを入れたい"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - A “different game screen” in Work (Priority: P1)

閲覧者として、他のセクションとは明確に違う「RPGのステータス画面」っぽい見た目の Work セクションがあり、スクロールしていて“ここが見どころ”だと直感できる状態になってほしい。

**Why this priority**: いまは全セクションが似た構成で、印象がフラットになりがち。WorkはProof面なので、ここを差別化すると体験の価値が上がる。

**Independent Test**: トップページで Work セクションを表示すると、他セクションと構造/見た目が明確に異なり、内容（会社/期間/プロジェクト）が読みやすい。

**Acceptance Scenarios**:

1. **Given** トップページ、**When** Work セクションへスクロールする、**Then** RPGのステータス画面/クエストログ風のUIが表示される
2. **Given** Work セクション、**When** プロジェクト一覧を見る、**Then** 一覧→詳細の導線が分かりやすい

---

### User Story 2 - Quest log interaction (Priority: P2)

閲覧者として、クエスト（Projects）を選ぶ/開く操作が気持ちよく、必要な情報（role/tech/outcome）が迷わず見えるようにしたい。

**Why this priority**: “奇抜”でも読みづらいと逆効果。情報設計と導線の良さを守る。

**Independent Test**: Work内でプロジェクトを選択でき、詳細が表示される（モバイルでも操作できる）。

**Acceptance Scenarios**:

1. **Given** Work セクション、**When** クエスト（プロジェクト）を選択する、**Then** 選択状態が分かり、詳細が表示される

---

### User Story 3 - Motion is safe (Priority: P3)

閲覧者として、アニメーションが過剰で“うるさい/酔う”ものではなく、読みやすさを壊さない範囲で提供されてほしい。

**Why this priority**: レトロ演出は副作用が出やすい。可読性と快適性（憲法）を守る。

**Independent Test**: Workの演出があっても本文が読める。動きを抑えたい環境でも破綻しない。

**Acceptance Scenarios**:

1. **Given** 動きが苦手なユーザー、**When** Work を読む、**Then** 読みにくさを感じない

---

### Edge Cases

- プロジェクト数が多い場合でも崩れない（縦に長い/折返し/スクロール）
- モバイル幅でステータス表示が詰まりすぎない
- キーボード操作でも導線が分かる（フォーカスが見える）
- 動きは抑制可能（OS設定等）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システム MUST Workセクションを、他セクションと明確に異なる“RPGステータス画面/クエストログ”風の見た目にする
- **FR-002**: システム MUST Work内でプロジェクト（クエスト）の一覧と詳細を分かりやすく提示する
- **FR-003**: システム MUST モバイルでも操作でき、レイアウトが破綻しない
- **FR-004**: システム MUST 既存のレトロ雰囲気（NES.css + Famicom palette）を維持する
- **FR-005**: システム MUST 可読性を損なわない（本文/要点が読める）
- **FR-006**: システム MUST 動きが過剰にならない/抑制可能である（快適性）
- **FR-007**: システム SHOULD Workの“奇抜UI”は Work のみに閉じ、他セクションへ波及させない

### Key Entities *(include if feature involves data)*

- **Work entry**: 会社/組織ごとのブロック（既存データ）
- **Quest**: プロジェクト（既存データ）
- **Selected quest**: 選択中のプロジェクト（表示状態）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Workセクションが“他セクションと明確に違う画面”として認識できる
- **SC-002**: Work内のプロジェクト情報を迷わず参照できる（一覧→詳細が分かる）
- **SC-003**: モバイル幅でも破綻しない
- **SC-004**: `pnpm lint` と `pnpm build` が通る
