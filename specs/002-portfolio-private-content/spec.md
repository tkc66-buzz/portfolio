# Feature Specification: 外部データ（Google Sheets）で経験・実績を管理し、公開/非公開を制御する

**Feature Branch**: `002-portfolio-private-content`  
**Created**: 2025-12-24  
**Status**: Draft  
**Input**: User description: "外部データ（Google Sheets/Apps Script）から経験・実績を注入し、公開/非公開を制御する"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 公開RepoにPrivate情報を置かずに、内容を更新できる (Priority: P1)

サイトオーナーとして、Experience/Projects の詳細を Google Sheets 上で管理し、
公開GitHubリポジトリにPrivate情報をコミットせずにサイトへ反映したい。

**Why this priority**: Private情報の漏洩は取り返しがつかないため、運用の安全性が最重要。

**Independent Test**: Sheetのデータを変更しても、リポジトリにPrivate内容を置かずにサイト表示を更新できる。

**Acceptance Scenarios**:

1. **Given** Privateデータが外部URLまたは環境変数で提供されている、**When** サイトが表示される、**Then** Publicに加えてPrivate上書きが反映される
2. **Given** Privateデータ取得に失敗する（認証/ネットワーク等）、**When** サイトが表示される、**Then** Publicデータにフォールバックしてサイトは壊れない

---

### User Story 2 - Private実績は必要最低限だけ公開する (Priority: P2)

サイトオーナーとして、NDA等の理由で公開したくない実績は “Private” として扱い、
タイトルなどの最小情報にとどめたい。

**Why this priority**: 実績の価値は伝えつつ、守るべき情報は守りたい。

**Independent Test**: `visibility="private"` のプロジェクトがUI上でredactされることを確認できる。

**Acceptance Scenarios**:

1. **Given** `visibility="private"` のプロジェクトが存在する、**When** Projectsを開く、**Then** 詳細（summary/outcome/link等）が表示されない

---

### User Story 3 - 外部データ取得をキャッシュし、運用負荷を下げる (Priority: P3)

サイトオーナーとして、外部データ取得が毎リクエストで走らないようにし、
上流（Apps Script等）への負荷と遅延を抑えたい。

**Why this priority**: 外部データ元は落ちやすく/遅くなりやすいので、サイト表示の安定性を上げたい。

**Independent Test**: キャッシュ期間（例: 24h）を設定でき、頻繁に外部取得しないことを確認できる。

**Acceptance Scenarios**:

1. **Given** キャッシュ期間が設定されている、**When** サイトが短時間に複数回表示される、**Then** 外部データの取得回数が抑制される

---

### Edge Cases

- 外部データのJSONが壊れている/スキーマが違う
- Bearerトークンが漏れた/無効化したい
- 外部データが遅い/落ちている（タイムアウト含む）
- キャッシュ中に更新が反映されない（運用上の期待値調整）

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: システムはPublicデータを常に表示できなければならない（外部データがなくてもサイトは成立する）
- **FR-002**: システムは外部データ（URLまたは環境変数）を用いてPublicデータを上書きできなければならない
- **FR-003**: 外部データ取得が失敗した場合、システムはPublicデータにフォールバックしなければならない
- **FR-004**: Projectsは `visibility` を持ち、`private` のものは公開ページ上で詳細を表示してはならない
- **FR-005**: システムは外部データ取得をキャッシュできなければならない（例: 24時間）

### Key Entities *(include if feature involves data)*

- **Portfolio (Partial)**: 外部データとして注入される上書きデータ（Experience/Projects等の一部でも可）
- **Project.visibility**: `public | private`（公開ページでの開示レベル）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Publicデータのみでサイトが常に表示できる（外部データがなくても壊れない）
- **SC-002**: 外部データを使って Experience/Projects の表示が更新できる
- **SC-003**: `visibility="private"` のプロジェクトで、summary/outcome/link 等の詳細が公開されない
- **SC-004**: キャッシュ（例: 24h）により外部データ取得頻度が抑制される
