# Implementation Plan: Unify Experience + Projects (No Spreadsheet) + Vivid UI

**Branch**: `020-unify-exp-projects-vivid` | **Date**: 2025-12-28 | **Spec**: `specs/020-unify-exp-projects-vivid/spec.md`
**Input**: Feature specification from `specs/020-unify-exp-projects-vivid/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Experience と Projects を単一セクション（仮: `work`）に統合し、会社（組織）ごとに「1文章」+ 配下に Projects を持てる構造に置き換える。
Spreadsheet/Apps Script を前提にせず、公開コンテンツは repo 内（`src/content/portfolio.ts`）で完結させる。
NES.css のレトロ感は維持しつつ、背景/枠/アクセント/リンク/見出しの配色を調整して“鮮やかさ”を上げる。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A (static content; optional env-based private patch exists today but spreadsheet運用は停止)  
**Testing**: N/A (no automated tests in repo; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel (static + server rendering where needed)  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: Keep static-first; no additional runtime deps; maintain current build time and fast TTFB  
**Constraints**: Retro aesthetic with modern readability; mobile-first responsiveness; keep TOC anchor navigation stable  
**Scale/Scope**: Single-page portfolio with 6–8 sections

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
- Principle compliance: OK (統合で “Proof” の到達性が上がる。鮮やか化も usability を前提に実施)
- Quality gates: MUST remain green (`pnpm lint`, `pnpm build`)
- Docs sync: REQUIRED (TOC/section構成の変更は top-level UX)

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
```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── TableOfContents.tsx
│   ├── toc.ts
│   └── sections/
│       ├── ProfileSection.tsx
│       ├── WorkSection.tsx          # NEW (Experience+Projectsの統合先)
│       ├── WritingSection.tsx
│       ├── ActivitiesSection.tsx
│       ├── SkillsSection.tsx
│       └── ContactSection.tsx
└── content/
    └── portfolio.ts                 # Work data source (repo内で完結)
```

**Structure Decision**: Next.js App Router (`src/`) のまま、統合セクション用に `WorkSection.tsx` を追加し、
`ExperienceSection.tsx` / `ProjectsSection.tsx` は削除または未使用化する。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
