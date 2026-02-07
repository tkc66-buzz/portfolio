# Feature Specification: Responsive Mobile Layout

**Feature Branch**: `040-responsive-mobile-layout`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "スマホ対応ができていない。レスポンシブ対応して、全体の表示が崩れないようにして。"

## Problem Statement

ポートフォリオサイトが小さい画面幅（320px〜414px）で表示が崩れている。主な原因は：

- デスクトップファーストのレイアウトで、モバイル向けの中間ブレイクポイントが不足
- NES.cssコンポーネント（nes-btn, nes-badge, nes-container, nes-progress）の固定パディングがモバイル幅で溢れる
- Hero セクションの `p-8` パディングが320px画面で過大
- ボタン群（Writing, Contact, TableOfContents）がモバイル幅で横並びに収まらない
- Work RPG UIのステータスパネルでバッジが予期せずラップする

### 影響範囲

- `src/app/page.tsx` — ページ全体のパディング
- `src/components/Hero.tsx` — Heroセクションのパディング・フォントサイズ
- `src/components/TableOfContents.tsx` — メニューボタンの配置
- `src/components/MobileMenu.tsx` — オーバーレイのパディング
- `src/components/sections/WorkQuestLog.tsx` — バッジのラップ
- `src/components/sections/SkillsSection.tsx` — プログレスバーとラベル
- `src/components/sections/ActivitiesSection.tsx` — グリッドとバッジ
- `src/components/sections/WritingSection.tsx` — リンクボタンの配置
- `src/components/sections/ContactSection.tsx` — コンタクトボタンの配置
- `src/app/globals.css` — モバイルメニュースタイル、Work RPGレイアウト
- `tailwind.config.js` — ブレイクポイント設定

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Mobile Phone Layout (Priority: P1)

320px〜414px幅のスマートフォンで全セクションが正しく表示され、横スクロールが発生しない。

**Why this priority**: モバイルユーザーが最も多く、現在最も崩れが大きい画面幅

**Independent Test**: iPhone SE (375px) とiPhone 14 (390px) のビューポートでサイト全体をスクロールし、横方向のはみ出しがないことを確認

**Acceptance Scenarios**:

1. **Given** 320px幅のビューポート, **When** 全セクションを表示, **Then** 水平スクロールバーが表示されない
2. **Given** 375px幅のビューポート, **When** Heroセクションを表示, **Then** プロフィール画像・名前・BIOが画面内に収まる
3. **Given** 375px幅のビューポート, **When** Contactセクションを表示, **Then** ボタンが縦並びまたは折り返して全て画面内に収まる
4. **Given** 375px幅のビューポート, **When** Workセクションを表示, **Then** バッジとステータス要素が溢れない

---

### User Story 2 — Tablet & Small Desktop Layout (Priority: P2)

640px〜1024px幅のタブレットやスモールデスクトップで、レイアウトが自然に中間表示される。

**Why this priority**: タブレットユーザーは二番目に多い層

**Independent Test**: iPad (768px) ビューポートで全セクションがデスクトップに近いレイアウトで表示されること

**Acceptance Scenarios**:

1. **Given** 768px幅のビューポート, **When** 全セクションを表示, **Then** Work RPGが2カラムレイアウトで表示される
2. **Given** 640px幅のビューポート, **When** メニュー表示, **Then** TableOfContentsが表示される（MobileMenuは非表示）
3. **Given** 768px幅のビューポート, **When** Activitiesセクション表示, **Then** Talksが2カラムグリッドで表示される

---

### Edge Cases

- 320px（最小サポート幅）: 全要素がオーバーフローしないこと
- ランドスケープモード（568px × 320px）: コンテンツが切れないこと
- NES.cssコンポーネント: 固定パディングによるオーバーフローがないこと
- 長いテキストコンテンツ: word-breakで折り返されること

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 320px幅以上の全画面幅で水平スクロールバーが表示されないこと
- **FR-002**: Heroセクションのパディングとフォントサイズがモバイルに最適化されていること
- **FR-003**: ボタン群（Contact, Writing, TableOfContents）がモバイル幅で適切に折り返しまたは縦並びになること
- **FR-004**: Work RPG UIのバッジ・ステータスがモバイル幅で溢れないこと
- **FR-005**: NES.cssコンポーネントがモバイル幅で溢れないこと（必要に応じてCSSオーバーライド）
- **FR-006**: 既存のデスクトップレイアウトが変更されないこと

### Non-Functional Requirements

- **NFR-001**: レスポンシブ対応はTailwind CSSのユーティリティクラスで実装すること（新規CSSは最小限）
- **NFR-002**: 新しい依存関係を追加しないこと
- **NFR-003**: `pnpm lint` と `pnpm build` がパスすること

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 320px, 375px, 414px, 768px, 1024px の全幅で水平スクロールが発生しない
- **SC-002**: Hero, Work, Skills, Activities, Writing, Contact の全セクションがモバイルで読みやすく表示される
- **SC-003**: 既存のデスクトップレイアウト（1280px以上）に視覚的変化がない
- **SC-004**: `pnpm lint` と `pnpm build` がパスする
