# Feature Specification: Sticky MENU (Always Visible Navigation)

**Feature Branch**: `011-sticky-menu`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "011ではMENUを常に見える状態にしてほしい。一番上に行かないと見えないのは良くい。かっこいいデザインでよろしく。"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - どの位置でもMENUで迷子にならない (Priority: P1) 🎯 MVP

スクロールしても MENU が常に見えており、1クリックで任意のセクションへ移動できる。ページ上部へ戻らなくてもナビゲーションできる。

**Why this priority**: 長い1ページで「上まで戻らないと移動できない」はUXが悪く、閲覧が止まる。

**Independent Test**:

- ページを中腹/下部までスクロールしても MENU が視界にある
- MENU のボタンを押して `#experience` / `#projects` などへ移動できる

**Acceptance Scenarios**:

1. **Given** ページ下部までスクロール、**When** MENU の `Projects` を押す、**Then** `#projects` に移動する
2. **Given** モバイル幅、**When** MENU が表示される、**Then** 画面を邪魔しすぎず、押しやすい

---

### User Story 2 - “かっこいい”レトロHUDとして成立する (Priority: P2)

NES.css + Famicom配色に合う “HUD” っぽい常時表示デザインで、視認性と押しやすさを両立する。

**Why this priority**: 常時表示は目立つので、デザインが弱いとチープに見える。

**Independent Test**:

- 見た目が「固定ヘッダー」ではなく「レトロHUD」っぽい
- フォーカスリングが見え、キーボードでも操作できる

**Acceptance Scenarios**:

1. **Given** キーボード操作、**When** TabでMENUを移動、**Then** focusが分かりやすい
2. **Given** 320px幅、**When** MENU を表示、**Then** はみ出さず折り返す/圧縮される

---

### Edge Cases

- iOS Safari で `position: sticky` の挙動が崩れないか
- `scroll-mt-*` のオフセットが固定MENUでズレないか（アンカー遷移時）

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: MENU は常に視界に入る（`position: sticky` or fixed）
- **FR-002**: クリックで各セクションのhashへ遷移できる（既存の `tocHref()` を使用）
- **FR-003**: 視認性の高いスタイル（背景/枠/影/レイアウト）で “HUD” 感を出す
- **FR-004**: モバイルで邪魔しすぎない（高さ/余白/折返し）

### Key Entities _(include if feature involves data)_

- **Menu items**: `src/components/toc.ts` の `TOC_ITEMS`（既存SSOT）

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: ページ中腹からでも3秒以内に別セクションへ移動できる
- **SC-002**: モバイルでも操作しやすく、読みやすさを損なわない
