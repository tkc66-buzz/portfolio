# Feature Specification: Refine Experience vs Projects (IA + Content)

**Feature Branch**: `009-exp-project-brushup`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "ExperienceとProjectをブラッシュアップしたい。そもそもどのように分けるのがいいのかを知りたい。"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - 読み手が「Experience」と「Projects」の違いを迷わず理解できる (Priority: P1)

初見の読み手が、Experience = 経歴/役割/責務の流れ、Projects = 具体的な成果物/事例（証拠）として理解でき、2分以内に全体像を掴める。

**Why this priority**: IAが曖昧だと、内容が良くても「結局何が強みなのか」が伝わらないため。

**Independent Test**:

- ページを上から読んだときに「Experienceは職務の流れ」「Projectsは選抜した事例」と一言で説明できる
- 目次→各セクションで迷子にならない

**Acceptance Scenarios**:

1. **Given** 初見ユーザー、**When** Experienceセクションを見る、**Then** 役割/領域/責務の変遷が時系列でわかる
2. **Given** 初見ユーザー、**When** Projectsセクションを見る、**Then** 具体的な課題→アクション→結果（証拠）が短時間で読める

---

### User Story 2 - Projectsが「証拠」として機能し、かつ秘匿も守れる (Priority: P2)

Projectsは「何を/なぜ/どうやって/何が起きた」を最短で伝え、公開できない情報は伏せても価値が落ちすぎない形にする。

**Why this priority**: プロジェクトの公開範囲には制約があるが、成果/学びはポートフォリオの中心だから。

**Independent Test**:

- public項目は、role/tech/outcome が揃っていて、読み手が「再現できそう」と感じる
- private項目は、詳細を出さずに「話せる範囲/扱い方針」が明確

**Acceptance Scenarios**:

1. **Given** `visibility: "public"` のProject、**When** 表示する、**Then** 課題/役割/技術/結果が揃う
2. **Given** `visibility: "private"` のProject、**When** 表示する、**Then** 秘匿を守りつつ「面談で話せる」ことが明示される

---

### User Story 3 - ExperienceとProjectsが相互参照でき、重複せず強化し合う (Priority: P3)

Experienceは「職務の軸」を語り、Projectsは「軸の証拠」を語る。重複は避け、相互参照で理解を加速する。

**Why this priority**: 同じ話を二重に書くと冗長になり、読み手の集中が切れる。

**Independent Test**:

- Experienceの項目から「代表プロジェクト（Projectsへ）」が自然に連想できる

**Acceptance Scenarios**:

1. **Given** Experienceの年表、**When** 読む、**Then** Projectsのどれが根拠か想像できる

---

### Edge Cases

- publicに出せる指標（売上/ユーザー数等）がないプロジェクトでも、学び/判断/トレードオフで価値を示せるか？
- 1つのプロジェクトが複数年/複数役割に跨る場合、Experience/Projectsのどちらに詳細を書くか？
- private情報が多い場合でも、Projectsセクションがスカスカに見えないか？

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: システム（サイト）は Experience と Projects の違いを、見出し/補足文/構造で明確にする
- **FR-002**: Experience は「時系列の役割/責務/領域」を中心に、詳細な事例は Projects に寄せる
- **FR-003**: Projects は「課題→アクション→結果（または学び）」が最短で分かるカード/一覧として提示する
- **FR-004**: Projects は public/private を維持し、private は秘匿方針を明示しつつ詳細は伏せる
- **FR-005**: 既存の `src/content/portfolio.ts` をSSOTとして、型/データ/UIを整合させる

### Key Entities _(include if feature involves data)_

- **Experience entry**: 期間/役割/責務/領域/要点（必要なら代表プロジェクト参照）
- **Project**: 課題/背景、役割、技術、成果/学び、リンク（publicのみ）

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 初見の読み手が2分以内に「何ができる人か」を説明できる（Experience×Projectsが噛み合う）
- **SC-002**: Projectsの各カードが30秒以内に読める（課題→アクション→結果が揃う）
- **SC-003**: private案件でも「話せる範囲/方針」が明記され、違和感が残らない
