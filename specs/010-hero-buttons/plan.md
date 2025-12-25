# Implementation Plan: Menu Navigation (Hero + Menu)

**Branch**: `010-hero-buttons` | **Date**: 2025-12-25 | **Spec**: `specs/010-hero-buttons/spec.md`  
**Input**: Feature specification from `/Users/takeshiwatanabe/EureWorks/private/git/portfolio/specs/010-hero-buttons/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Hero 直下に Menu を表示し、入口で迷子にならないようにする。

実装は最小の Client Component で行い、既存の Server Component 構成（Hero/sections）は崩さない。

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
**Performance Goals**: Keep JS minimal (no client components required)  
**Constraints**: Keep Server Components by default  
**Scale/Scope**: Hero + Menu area UX (top-level UX)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Use `.specify/memory/constitution.md` as the source of truth. This repo’s default
gates (adapt per feature) are:

- Principle compliance: changes support “Personality-First Storytelling” and do not
  dilute the retro aesthetic + usability balance.
- Quality gates: `pnpm lint` and `pnpm build` pass.
- Docs sync: if dependencies/scripts/runtime/deploy/top-level UX change, update
  `README.md`, `AGENTS.md`, and `CLAUDE.md` together.

**Gate evaluation (pre-research)**:
- Principle compliance: ✅（入口UIの混乱を解消し、ナビゲーションを明確化）
- Retro+Usability: ✅（見た目はそのまま、挙動だけ現代的に）
- Lightweight: ✅（依存追加なし・小さいClient Componentのみ）
- Docs sync: ✅（README/AGENTS/CLAUDEに挙動を追記）

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
    layout.tsx
  components/
    Hero.tsx
    TableOfContents.tsx
```

**Structure Decision**: Web application (Next.js App Router). Use simple anchor navigation to `#menu`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
