# Implementation Plan: Section typography size upgrade

**Branch**: `024-section-typography` | **Date**: 2025-12-28 | **Spec**: `specs/024-section-typography/spec.md`
**Input**: Feature specification from `specs/024-section-typography/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

SectionContent（各セクション本文）の文字サイズが小さすぎる問題を解消する。
各セクションの本文系 `text-sm/text-xs` を見直し、`text-base` へ引き上げる。
再発防止として “本文トークン” を共通クラス/定数として集約する（CSS or TSX）。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: No new deps; CSS-first; no layout shift/regressions  
**Constraints**: Retro aesthetic + modern usability; keep hierarchy; avoid dense sections becoming noisy  
**Scale/Scope**: Section body text across all sections

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

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
├── app/globals.css                 # optional typography utility classes
└── components/sections/*           # update body text classes
```

**Structure Decision**: 原則は “本文トークン（CSSクラス）” を `globals.css` に置き、
各セクションは本文要素にそのクラスを付与して統一する（差分は最小）。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
