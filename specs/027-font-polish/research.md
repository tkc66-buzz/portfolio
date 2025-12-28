# Research: Font polish (retro readability)

**Date**: 2025-12-28  
**Branch**: `027-font-polish`  
**Spec**: `specs/027-font-polish/spec.md`

## Decisions

### 1) Use NES.css-compatible fonts, but keep body readable

- **Decision**: 見出し/HUDは“レトロ表示用フォント”へ寄せ、本文は既存の読みやすいフォントを維持する（役割分離）。
- **Rationale**: NES.cssは **コンポーネント提供（CSSのみ）**で、フォント自体は同梱しないため、サイト側で適切に選ぶ必要がある。雰囲気は上げつつ、長文（日本語）の可読性を守るのが最優先。  
- **Reference**: NES.css README（フォント推奨リスト・CSS only）: [nostalgic-css/NES.css](https://github.com/nostalgic-css/NES.css)

### 2) Prefer fonts with clear licensing and stable distribution

- **Decision**: 公開リポジトリとして、利用条件が明確で、将来の運用でも壊れにくいフォントを優先する（不明瞭な配布/再配布条件のものは避ける）。
- **Rationale**: フォントは配布元/ライセンスの扱いがリスクになりやすい。採用時点で“安全”を満たしておく。
- **Alternatives considered**:
  - 個人配布/再配布条件が曖昧なフォント: リスクが高い

### 3) Avoid FOIT; always show text with a fallback chain

- **Decision**: “文字が消える”体験（FOIT）を避け、フォント未取得でもフォールバックで表示が成立する方針にする。
- **Rationale**: 読めない時間があるのはUX上のバグ。特に1ページのポートフォリオでは離脱に直結する。


