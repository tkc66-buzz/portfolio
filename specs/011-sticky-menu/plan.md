# Implementation Plan: Sticky MENU (Always Visible Navigation)

**Branch**: `011-sticky-menu` | **Date**: 2025-12-25 | **Spec**: `specs/011-sticky-menu/spec.md`  
**Input**: Feature specification from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/011-sticky-menu/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

スクロールしても常に見える MENU を実装し、長い1ページでも迷子にならないようにする。

- 既存の `TOC_ITEMS`（SSOT）をそのまま使う
- 既存の `TableOfContents` を “Sticky HUD Menu” として再スタイリング
- アンカー遷移のオフセット（`scroll-mt-*`）を固定メニュー高さに合わせる

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS, NES.css  
**Storage**: N/A  
**Testing**: No automated tests requested; validate manually + `pnpm lint` + `pnpm build`  
**Target Platform**: Web (Vercel)  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: Keep JS at 0 if possible (pure CSS sticky); no new deps  
**Constraints**: Must remain readable on mobile; sticky menu must not cover section headings on anchor jump  
**Scale/Scope**: Navigation UX + styling only

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate evaluation (pre-research)**:

- Principle compliance: ✅（閲覧体験の改善＝ストーリーの到達性を上げる）
- Retro+Usability: ✅（レトロHUD + 押しやすさ/視認性を両立）
- Lightweight: ✅（CSS中心、依存追加なし）

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
  app/
    page.tsx
    globals.css
  components/
    TableOfContents.tsx   # will become sticky HUD menu
    toc.ts                # TOC_ITEMS (SSOT)
  components/sections/
    *Section.tsx          # each section has stable id + scroll-mt-*
```

**Structure Decision**: Web application (Next.js App Router). Implement sticky menu via CSS + existing anchor links.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
