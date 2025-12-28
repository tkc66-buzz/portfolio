# Data Model: Work RPG UI (status + quest log)

## Scope

この機能は **既存の `Portfolio.work` データ構造を変更しない**。  
表示/UIのための “派生 view model” を定義し、Workセクション内でのみ利用する。

## Inputs (existing)

### `WorkSection`

- `id: string`
- `heading: string`
- `items: WorkEntry[]`

### `WorkEntry`

- `key: string`
- `period: string` (display-only)
- `company: string` (public-safe)
- `summary: string` (one paragraph)
- `tech?: string[]`
- `links?: ExternalLink[]`
- `projects: WorkProject[]`

### `WorkProject` (Quest)

- `anchorId?: string`
- `title: string`
- `summary: string`
- `role: string`
- `tech: string[]`
- `outcomeOrLearning: string`
- `link?: ExternalLink`
- `status?: string`
- `asset?: Asset`

## Derived View Model (new)

### `WorkRpgEntryVM`

Represents one company/organization screen.

- `key: string`
- `header`: `{ period: string; company: string }`
- `body`: `{ summary: string; techTags: string[]; links: ExternalLink[] }`
- `stats: WorkRpgStats`
- `quests: WorkRpgQuestVM[]`
- `initialSelectedQuestId: string | null`

### `WorkRpgStats`

All stats must be derived from existing Work data (no manual inputs).

- `projectsCount: number` (quests length)
- `uniqueTechCount: number` (unique tech tags across entry + quests)
- `assetsCount: number` (quests with asset)
- `linksCount: number` (entry links + quests with link)

### `WorkRpgQuestVM`

- `id: string` (stable): `anchorId ?? slug(title)` (slug must be deterministic; if duplicates exist, apply suffix `-2`, `-3`, ...)
- `title: string`
- `statusBadge?: string` (from `status`)
- `summary: string`
- `detail`: `{ role: string; tech: string; outcomeOrLearning: string }`
- `link?: ExternalLink`
- `asset?: Asset`

## Validation Rules

- `id` generation must be stable and deterministic across renders.
- `quests` must preserve input order (portfolio content author controls narrative).
- `initialSelectedQuestId`:
  - If there is at least 1 quest → first quest’s `id`
  - Else → `null` (UI shows “No quests yet”)

## UI State (Client-only)

### `selectedQuestId: string | null`

- Initial: `initialSelectedQuestId`
- Transitions:
  - `SELECT_QUEST(id)` → `selectedQuestId = id`
  - `CLEAR` (only if no quests) → `null`

## Accessibility Semantics (contract)

- Quest list must expose selected state:
  - `aria-selected=true` for selected quest button
  - focus-visible ring must be visible on keyboard navigation


