# Data Model: Achievement Unlocked toast (Activities)

## Scope

この機能は Activities に表示する **トーストの状態**のみを扱う。  
サーバー側のデータモデルや `Portfolio` スキーマは変更しない。

## Key Entities

### ToastState (client-only)

- `hasShown: boolean` — セッション内で “表示したことがある”
- `isDismissed: boolean` — ユーザーが閉じた
- `lastShownAtMs?: number` — 任意（デバッグ用、UIには不要）

### Trigger

- `activitiesInView: boolean` — Activities セクションが viewport に入った（初回のみ使用）

## Storage (session-scoped)

- sessionStorage key:
  - `achievement_toast:v1:shown`
  - `achievement_toast:v1:dismissed`

## State Transitions

Initial:

- Read sessionStorage
  - if dismissed → do nothing
  - else if shown → do nothing
  - else → wait for trigger

OnTrigger (Activities in view):

- if not shown and not dismissed → show toast, set `shown=true`

OnDismiss (Close):

- hide toast, set `dismissed=true`

Reduced motion:

- If reduced-motion → toast can render without animation (static)

## Validation Rules

- Toast MUST not render more than once per session after `shown=true`.
- Toast MUST not re-render after user dismisses (`dismissed=true`).
- Trigger wiring MUST avoid multiple observers/listeners.


