# Research: Achievement Unlocked toast (Activities)

## Decision 1: Trigger with IntersectionObserver on Activities section root

- **Decision**: Activities セクションが *初めて* viewport に入った瞬間を、IntersectionObserver で検知する。
- **Rationale**:
  - scroll handler 連打より軽い（憲法IV）
  - “初めて入った” のイベントを取りやすい
  - Activities は既に `id={activities.id}` を持つため、DOM参照が簡単
- **Alternatives considered**:
  - scrollYベースの計算（ScrollHudと同様）: 実装は可能だが、トーストだけのためには過剰

## Decision 2: “1回だけ”はまず session-scoped で保証（sessionStorage）

- **Decision**: 「表示済み」「dismiss済み」を sessionStorage で持ち、同一タブ内では再表示しない。
- **Rationale**:
  - “初回だけ”を自然に満たす（戻る/リロードでも過剰に出ない）
  - 永続化（localStorage）より privacy/副作用が少ない
- **Alternatives considered**:
  - localStorage: ブラウザを跨いで効くが、意図せず出なくなりやすい
  - メモリのみ: リロードで毎回出てしまう可能性

## Decision 3: Dismissible + accessible by default

- **Decision**:
  - Close ボタンで dismiss
  - `role="status"`（あるいは `role="dialog"` は避ける）で “通知” として扱い、フォーカスを強制しない
- **Rationale**:
  - コンテンツ閲覧の邪魔を最小化（憲法II）
  - “うるさい” を自分で止められる（FR-002/003）
- **Alternatives considered**:
  - モーダル: 体験は派手だが、可読性/操作負荷が上がる

## Decision 4: reduced-motion では “アニメーション無しで静的表示” をデフォルト

- **Decision**: reduced-motion 環境では、トーストは **表示自体はする**が、派手なアニメーションは行わない（静的表示）。
- **Rationale**:
  - “演出はあるが安全” の落とし所。要件も満たしやすい（FR-004）
- **Alternatives considered**:
  - reduced-motion では完全非表示: さらに安全だが、ユーザーが“何が起きたか”分からない場合がある

## Decision 5: Scope the styling to Activities only

- **Decision**: トースト用CSSは Activities 配下（または専用 class）にスコープし、他セクションへ影響させない。
- **Rationale**: 既存の見た目を崩さない（FR-005）
