# Data Model: Font polish (retro readability)

**Date**: 2025-12-28  
**Branch**: `027-font-polish`

外部データは持たない（永続化なし）。ただし運用と一貫性のため、フォント適用ルールを“トークン”として定義する。

## Entities

### TypographyTokens

- **fontBody**: 本文用（可読性優先）
- **fontDisplay**: 見出し/HUD用（レトロ感優先）
- **fontMono (optional)**: コード/数値用（必要なら）

## Rules

- 本文（`.section-body`, `.section-body-muted`）は `fontBody` を使用する
- 見出し（Hero/各セクション見出し/HUD）だけ `fontDisplay` を使用する
- フォント未取得でも、必ずフォールバックで表示が成立する


