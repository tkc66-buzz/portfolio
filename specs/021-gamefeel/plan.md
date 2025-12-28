# Implementation Plan: Gamefeel Upgrade (Images/Diagrams + Retro Motion)

**Branch**: `021-gamefeel` | **Date**: 2025-12-28 | **Spec**: `specs/021-gamefeel/spec.md`
**Input**: Feature specification from `specs/021-gamefeel/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Retro雰囲気を維持しつつ、Work/Projects に画像/図（サムネ/ダイアグラム）を追加し、
CSS中心の軽量な“ゲームっぽい動き”を導入して体験品質を上げる。
`prefers-reduced-motion` に対応し、パフォーマンス劣化を避ける。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x (Next.js App Router)  
**Primary Dependencies**: Next.js 16, React 19, Tailwind CSS 3, NES.css  
**Storage**: N/A (static assets under `public/`)  
**Testing**: N/A (no automated tests; rely on `pnpm lint` + `pnpm build`)  
**Target Platform**: Vercel  
**Project Type**: Web application (Next.js App Router under `src/`)  
**Performance Goals**: Keep static-first; avoid heavy JS; images optimized; motion CSS-first  
**Constraints**: Must respect `prefers-reduced-motion`; avoid motion sickness; keep retro aesthetic + readability  
**Scale/Scope**: Single-page portfolio; add a small number of curated visuals (not a gallery)

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
- Principle I (Personality-First): Visuals must serve proof/decision-making, not decoration only.
- Principle II (Retro + usability): Motion must be subtle and accessible.
- Principle IV (Lightweight): No heavy animation libs by default; prefer CSS/SVG.

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
│   ├── globals.css              # motion + image helpers
│   └── page.tsx
├── components/
│   ├── sections/WorkSection.tsx # add visuals
│   └── ...other components
└── content/portfolio.ts         # optional asset metadata

public/
└── assets/                      # new diagrams/pixel art (svg/png/webp)
```

**Structure Decision**: `public/assets/` に静的アセットを追加し、`WorkSection` で表示する。
モーションは `globals.css` と Tailwind class を中心に実装し、Client Component化は最小限に抑える。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
