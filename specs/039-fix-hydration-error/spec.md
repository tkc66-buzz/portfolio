# Feature Specification: Fix Hydration Error and Start Gate Visibility

**Feature Branch**: `039-fix-hydration-error`
**Created**: 2026-01-10
**Status**: Implemented
**Input**: User description: "startボタンを押す前に他のcontentsが見えてしまう問題を解決したい"

## Problem Statement

ポートフォリオサイトでは「PRESS START」ボタンを押すまでコンテンツが非表示になるゲーム風の演出がある。しかし、モバイルメニュー（ハンバーガーメニュー）がSTARTボタンを押す前に表示されてしまい、演出が壊れていた。

### 原因
- MobileMenuコンポーネントがReact Portalを使用してdocument.bodyに直接レンダリングされていた
- Portalでレンダリングされた要素は`start-gated`クラスの制御外にあった
- ハイドレーション時にサーバーとクライアントの状態が一致せずエラーが発生

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Initial Page Load Experience (Priority: P1)

ユーザーがポートフォリオサイトにアクセスした際、「PRESS START」ボタンのみが表示され、他のコンテンツ（メニュー含む）は非表示になっている。

**Why this priority**: サイトのゲーム風演出の核心部分であり、最初の印象を決める

**Independent Test**: サイトにアクセスし、STARTボタンを押す前にハンバーガーメニューが表示されないことを確認

**Acceptance Scenarios**:

1. **Given** 新規ユーザーがサイトにアクセス, **When** ページが読み込まれる, **Then** Heroセクションと「PRESS START」ボタンのみが表示される
2. **Given** モバイルデバイスでサイトにアクセス, **When** ページが読み込まれる, **Then** ハンバーガーメニューボタンは表示されない
3. **Given** JavaScriptが有効, **When** ページがハイドレーション完了, **Then** コンソールにハイドレーションエラーが表示されない

---

### User Story 2 - Post-START Menu Visibility (Priority: P2)

ユーザーが「PRESS START」ボタンを押した後、モバイルメニューが正常に表示・動作する。

**Why this priority**: START後のナビゲーション機能は必須

**Independent Test**: STARTボタンを押した後、モバイルでハンバーガーメニューが表示され、タップで開閉できることを確認

**Acceptance Scenarios**:

1. **Given** ユーザーがSTARTボタンを押した後, **When** モバイルビューで確認, **Then** 右上にハンバーガーメニューが表示される
2. **Given** STARTボタンが押された状態, **When** ハンバーガーメニューをタップ, **Then** メニューが展開される

---

### Edge Cases

- ページリロード時：sessionStorageにSTART状態が保存されている場合は即座にメニューを表示
- JavaScriptが無効の場合：コンテンツは表示される（プログレッシブエンハンスメント）
- ハイドレーション中：サーバーとクライアントの状態が一致するまでメニューを非表示

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: MobileMenuコンポーネントはSTARTボタンが押されるまで非表示であること
- **FR-002**: MobileMenuはハイドレーション完了後にのみレンダリングされること
- **FR-003**: STARTボタンが押された後、MobileMenuは正常に表示・動作すること
- **FR-004**: ハイドレーションエラーが発生しないこと

## Technical Solution (Implemented)

### 実装内容

1. **useSyncExternalStore使用**: ハイドレーション対応のためReactの`useSyncExternalStore`を使用
   - `useHasMounted()`: クライアントサイドマウント検出
   - `useStartGateStarted()`: START状態の監視

2. **条件付きレンダリング**: `mounted && started`の両方がtrueの場合のみコンテンツをレンダリング

3. **Portal廃止**: iOS Safariでのfixed positioning問題のため、Portalを使用せず直接レンダリング

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: ページ初期読み込み時にハンバーガーメニューが表示されない
- **SC-002**: STARTボタン押下後、ハンバーガーメニューが正常に表示される
- **SC-003**: ブラウザコンソールにハイドレーションエラーが表示されない
- **SC-004**: 既存のモバイルメニュー機能（開閉、ナビゲーション）が維持される
