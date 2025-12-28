# Research: Work RPG UI (status + quest log)

## Decision 1: Keep Work as Server Component; isolate interactivity into a small Client component

- **Decision**: `WorkSection` は Server Component のまま。クエスト（Projects）の「選択状態」と「詳細表示」だけを小さな Client Component に閉じ込める。
- **Rationale**:
  - 憲法の “Prefer Server Components by default” に沿う
  - 既存のデータ取得（`getPortfolio()`）をそのまま使える
  - インタラクション範囲を限定でき、全体に副作用が出にくい（FR-007）
- **Alternatives considered**:
  - Work全体を Client にする: 容易だが、範囲が広がりがちで性能/保守性リスクが上がる
  - URL hash で選択状態を同期: 深いリンクは便利だが、今回の “奇抜UI” のコアに必須ではない（将来拡張に回す）

## Decision 2: “Status panel + Quest log + Quest detail” の 3ペイン構成（レスポンシブで折りたたみ）

- **Decision**: Work の内部を以下で構成する:
  - **Status panel**: 会社/期間/要約 + “stats” を表示（読みやすさ優先）
  - **Quest log**: プロジェクト一覧（選択可能）
  - **Quest detail**: 選択中プロジェクトの詳細（role/tech/outcome/link/asset）
- **Rationale**:
  - “RPGステータス画面/クエストログ” の比喩に一致（FR-001/FR-002）
  - 情報の入口（一覧）と深掘り（詳細）が自然に繋がる（SC-002）
  - モバイルでは「Quest log → Detail」を縦方向に並べ、破綻を避ける（FR-003）
- **Alternatives considered**:
  - アコーディオンで一覧のみ: 差別化が弱い
  - 1画面に全詳細を展開: 情報過多になりやすく、読みにくい

## Decision 3: “Stats” は実データから派生する軽量な指標にする（嘘をつかない）

- **Decision**: ステータスは “演出” だが、**既存のWorkデータから派生する指標**に限定する（例: Projects数、Techタグ数、Asset数、Link数など）。
- **Rationale**:
  - “Personality-First Storytelling” に沿い、根拠のない強さ表現を避ける（憲法I）
  - 実装が軽く、追加データ/運用が不要（憲法IV）
- **Alternatives considered**:
  - 手動で「STR/INT」などを入力: 主観が強くなり、更新負荷も増える

## Decision 4: A11yは “ボタン + 選択状態 + フォーカス” の最小セットを保証

- **Decision**:
  - Quest log は `<button>` を使用（リンクではなく選択の意味）
  - `aria-selected` / `aria-controls` / `role="listbox"` or `role="tablist"` 相当で選択を明示
  - フォーカス可視（既存の focus-visible ring を活用）
- **Rationale**:
  - キーボード操作で迷わない（Edge case）
  - “奇抜UI” でも操作性は現代的に保てる（憲法II）
- **Alternatives considered**:
  - `div` クリック: A11yが崩れやすい

## Decision 5: Motion は transforms/opacity のみ、reduced-motion では無効化

- **Decision**:
  - 演出は CSS-only で “scanline/shine/selection ping” 程度に留める
  - `prefers-reduced-motion: reduce` では animation を止める（既存方針に合わせる）
- **Rationale**:
  - 低コストでレトロ感を出せる
  - 酔い/うるささを避ける（FR-006）
- **Alternatives considered**:
  - 大きなパララックス/粒子: 目立つが副作用が大きい


