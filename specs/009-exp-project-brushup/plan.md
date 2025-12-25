# Implementation Plan: Refine Experience vs Projects (IA + Content)

**Branch**: `009-exp-project-brushup` | **Date**: 2025-12-25 | **Spec**: `specs/009-exp-project-brushup/spec.md`  
**Input**: Feature specification from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/009-exp-project-brushup/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Experience と Projects の役割分担（情報設計）を明確化し、内容（公開/秘匿含む）をブラッシュアップするための設計を行う。

- **Experience**: 「職務/役割/責務/領域の変遷」を時系列で短く提示（Why/Howの“軸”）
- **Projects**: 「課題→アクション→結果（証拠）/学び」の事例集（軸の“証拠”）

実装は `src/content/portfolio.ts`（SSOT）と `src/components/sections/ExperienceSection.tsx` / `ProjectsSection.tsx` のUI改善を中心に行う前提。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS, NES.css  
**Storage**: `src/content/portfolio.ts` (public) + optional private overrides via env/URL (server-side)  
**Testing**: No automated tests currently; verify with `pnpm lint` + `pnpm build` + manual check  
**Target Platform**: Web (Vercel deploy; SSR/SSG via Next.js)  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: Keep single-page scan fast; no heavy deps; avoid over-rendering  
**Constraints**: Respect privacy (Projects/Experience may have private overrides); do not leak secrets to client  
**Scale/Scope**: Content/UI refinement (no new backend)

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

- Principle compliance: ✅（情報設計を明確にし、ストーリーの“証拠”を強化する）
- Retro+Usability: ✅（テキスト階層・読みやすさを優先しつつNES.cssの枠を維持）
- Lightweight: ✅（原則追加依存なしで改善）
- SSOT: ✅（`src/content/portfolio.ts` 中心で整合させる）

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
  components/
    sections/
      ExperienceSection.tsx
      ProjectsSection.tsx
  content/
    portfolio.ts
```

**Structure Decision**: Web application (Next.js App Router). Content is centralized in `src/content/portfolio.ts`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
