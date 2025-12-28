# Implementation Plan: Retro Icon Pack (UI icons)

**Branch**: `022-retro-icons` | **Date**: 2025-12-28 | **Spec**: `specs/022-retro-icons/spec.md`
**Input**: Feature specification from `specs/022-retro-icons/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Retroな雰囲気を保ったまま、セクション見出し・Contactリンクなどにピクセル調のアイコンを追加して
UIのスキャン性と“ゲームっぽさ”を上げる。アイコンは `public/assets/pixel/icons/` に集約し、
SVG中心・アクセシビリティ（decorative alt/aria）を守る。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A (static SVG assets under `public/`)  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: SVG-first; keep icon count small; avoid new runtime deps  
**Constraints**: Retro aesthetic + readability; icons must not harm accessibility (alt/aria)  
**Scale/Scope**: A curated icon set (not an icon library)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate Evaluation (pre-research)**:
- Principle II (Retro + usability): icons enhance hierarchy; must not reduce readability.
- Principle IV (Lightweight): no new icon packs or heavy deps; use a small curated SVG set.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   └── globals.css                 # optional icon sizing helpers
├── components/
│   ├── PixelIcon.tsx               # NEW helper component (wrap next/image)
│   └── sections/*                  # add icons to headings and link lists
└── content/portfolio.ts

public/
└── assets/pixel/icons/             # NEW pixel-style SVG icons
```

**Structure Decision**: `public/assets/pixel/icons/` にSVGを置き、`PixelIcon` で表示する。
適用箇所は「見出し」「Contactリンク」に限定し、うるさくなりすぎないようにする。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
