# Research: Motion polish (site-wide)

**Date**: 2025-12-28  
**Branch**: `026-motion-polish`  
**Spec**: `specs/026-motion-polish/spec.md`

## Decisions

### 1) Scroll feedback is “both”: progress + current section

- **Decision**: スクロール時フィードバックは **「進捗バー」＋「現在セクション強調」** を両方提供する。
- **Rationale**: 進捗は“あとどれくらい”の不安を減らし、現在セクションは“今どこ”を明確にする。1ページ完結の読み物として両方が効く。
- **Alternatives considered**:
  - 進捗バーのみ: 現在地が曖昧になりやすい
  - セクション強調のみ: 長いページだと読み切り感が弱い

### 2) Progress bar is “HUD-like” and retro-aligned

- **Decision**: 進捗は HUD（Menu）周辺に表示し、レトロ表現と整合させる。
- **Rationale**: 既に Menu が sticky HUD として機能しているため、視線移動が少なく、UIの一貫性も保てる。
- **Alternatives considered**:
  - 画面端に固定バー: 近代的すぎて雰囲気が崩れやすい

### 3) “派手”の出しどころは入力とHUDに集中させる

- **Decision**: 派手さは「クリック/タップ」「フォーカス」「メニュー強調」「軽い点滅/フロート」に集中し、本文（長文）は主張を抑える。
- **Rationale**: 可読性（憲法II）を守りつつ、ゲームらしさを体感させる最短距離が“入力フィードバック”と“HUD演出”。
- **Alternatives considered**:
  - セクション本文を常時アニメ: 読みを邪魔しやすい／酔いやすい

### 4) Performance & comfort guardrails

- **Decision**: スクロール追従は更新頻度を抑え、重さを体感させない。動きが苦手でも読めるように“動きの強さ”は抑制可能にする。
- **Rationale**: パフォーマンス劣化はユーザー影響が大きい（憲法IV）。動きは価値だが副作用を最小化する。
- **Alternatives considered**:
  - 常時高頻度更新: 端末によってはガタつきやすい


