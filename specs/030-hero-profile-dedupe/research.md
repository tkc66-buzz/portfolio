# Research: Hero/Profile 역할 분리

## Decision 1: 明確な役割分担（情報の粒度）

- **Decision**: Hero は「一文の役割/軸 + START CTA」に集中し、Profile は「背景/強み/価値観の補足」に寄せる。
- **Rationale**: 一番上の画面はスキャン性能が重要。重複排除でストーリーが前に進む。
- **Alternatives considered**:
  - Hero を長文にして Profile を短くする: START CTA の視認性が下がるため不採用。

## Decision 2: Copy の単一責任（更新コスト）

- **Decision**: “同じ主張の再掲” を避けるため、コピーの責任範囲を定義し、更新時の二重編集が起きにくい構造にする。
- **Rationale**: 今後のコンテンツ更新時に、重複が再発しやすい。
- **Alternatives considered**:
  - その都度手動でコピペ調整: 再発リスクが高い。

## Decision 3: SSR/hydration の安全性

- **Decision**: サーバー/クライアントでテキストが変わる分岐を避ける（特に Hero は hydration mismatch を起こしやすい）。
- **Rationale**: 既存で hydration mismatch を経験済み。コピー変更でも再発し得る。
- **Alternatives considered**:
  - `typeof window` でレンダー分岐: mismatch の温床になりやすい。


