# Implementation Plan: Hero Image Display

**Branch**: `037-hero-image` | **Date**: 2026-01-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/037-hero-image/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a single profile image to the hero section that maintains the retro aesthetic while providing modern responsive image optimization. The image will be displayed alongside existing hero content (name, title, bio, START button) without interfering with the "PRESS START" reveal functionality. Implementation uses Next.js Image component with responsive sizing, prevents layout shift, and includes accessibility features (alt text, semantic markup).

## Technical Context

**Language/Version**: TypeScript 5.x with Next.js 16.0.7
**Primary Dependencies**: Next.js (next/image for optimization), React 19.2.1, Tailwind CSS 3.4.18, NES.css 2.3.0
**Storage**: Static file in `public/assets/` directory (no database)
**Testing**: Manual visual testing across viewports; lint via ESLint, build via Next.js build
**Target Platform**: Web (responsive: mobile 375px to desktop 1920px+)
**Project Type**: Web application (Next.js App Router, Server + Client Components)
**Performance Goals**: Page load time increase <500ms, CLS <0.1, image load <2s on 3G+
**Constraints**: Must maintain existing hero layout and START button functionality; must match retro aesthetic
**Scale/Scope**: Single component modification (Hero.tsx), single static asset, ~50-100 LOC change

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Evaluation (Pre-Phase 0)

**Principle I - Personality-First Storytelling**: ✅ PASS

- Adding a profile image directly supports showing "Who am I" with visual evidence
- Enhances personal branding and makes the owner immediately recognizable
- Complements existing text-based personality narrative

**Principle II - Retro Aesthetic, Modern Usability**: ✅ PASS

- Uses Next.js Image component for modern responsive optimization
- Maintains retro visual language (NES.css theme, Famicom palette compatibility)
- Ensures accessibility (alt text, semantic markup) and performance (CLS <0.1)

**Principle III - Content Is a Product Surface**: ✅ PASS

- Requires actual profile image (not placeholder) for production
- Image placement and alt text must be intentional and meaningful
- No generic stock photos or filler content

**Principle IV - Lightweight, Fast, and Durable**: ✅ PASS

- Uses existing Next.js image optimization (no new dependencies)
- Performance constraints explicit: <500ms load time increase, CLS <0.1
- Simple static asset approach (no external APIs or complex state)

**Principle V - One Source of Truth**: ✅ PASS (conditional)

- No new dependencies, scripts, or runtime changes
- Top-level UX change (hero section) but no architectural changes
- Documentation update not required unless implementation approach changes significantly

**Quality Gates**:

- ✅ Will verify `pnpm lint` passes before completion
- ✅ Will verify `pnpm build` passes before completion

**Result**: ALL GATES PASS - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/037-hero-image/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Spec quality checklist (already created)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── page.tsx           # Homepage (imports Hero component)
│   ├── layout.tsx         # Root layout (metadata for OG images if needed)
│   └── globals.css        # Global styles
├── components/
│   └── Hero.tsx           # [MODIFIED] Add profile image rendering
└── content/
    └── portfolio.ts       # Portfolio data (no changes needed)

public/
└── assets/
    └── profile.jpg        # [NEW] Hero profile image (to be provided)
```

**Structure Decision**: Web application using Next.js App Router. This is a UI-only feature requiring modification of a single component (`Hero.tsx`) and addition of one static asset. No backend, API, or data model changes needed. The Hero component is already a client component ("use client") so no architectural changes required.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution checks passed. No complexity justifications needed.

## Phase 1 Completion: Constitution Re-Check

**Required by plan workflow**: Re-evaluate Constitution Check after Phase 1 design

### Post-Design Evaluation

**Principle I - Personality-First Storytelling**: ✅ PASS

- Research confirms image placement strategy that doesn't overshadow text content
- Profile image enhances "Who am I" without replacing written narrative
- Maintains balance between visual and textual personality expression

**Principle II - Retro Aesthetic, Modern Usability**: ✅ PASS

- Design specifies NES.css-style border treatment (4px gold border)
- Next.js Image component provides modern performance (WebP, AVIF, responsive sizing)
- Accessibility requirements met (alt text, semantic HTML, keyboard navigation)
- Performance targets defined and achievable (CLS <0.1, <500ms load increase)

**Principle III - Content Is a Product Surface**: ✅ PASS

- Data model requires actual profile image (not placeholder)
- Alt text must be descriptive: "Profile photo of Takeshi Watanabe"
- Image specifications defined (400×400px, <100KB, square aspect ratio)
- No generic stock photos or filler content allowed

**Principle IV - Lightweight, Fast, and Durable**: ✅ PASS

- Zero new dependencies (uses existing Next.js Image component)
- Static file approach (no external APIs or state management)
- Performance budgets explicitly defined in data model
- Simple implementation (~50-100 LOC change to single component)

**Principle V - One Source of Truth**: ✅ PASS

- Documentation complete: spec.md, plan.md, research.md, data-model.md, quickstart.md
- Agent context updated via automated script
- No changes to README.md, AGENTS.md, or CLAUDE.md needed (no dependency/script/runtime changes)
- All design artifacts consistent and synchronized

**Quality Gates**: ✅ PENDING (will verify during implementation)

- Will verify `pnpm lint` passes
- Will verify `pnpm build` passes
- Will verify performance targets met (CLS, load time)

**Result**: ALL GATES PASS - Design approved, proceed to Phase 2 (tasks generation via `/speckit.tasks`)

### Design Artifacts Summary

| Artifact                                                 | Status       | Key Content                                         |
| -------------------------------------------------------- | ------------ | --------------------------------------------------- |
| [spec.md](spec.md)                                       | ✅ Complete  | User stories, requirements, success criteria        |
| [plan.md](plan.md)                                       | ✅ Complete  | Technical context, architecture decisions           |
| [research.md](research.md)                               | ✅ Complete  | 7 key decisions with rationale and alternatives     |
| [data-model.md](data-model.md)                           | ✅ Complete  | Image asset specs, component props, file structure  |
| [contracts/](contracts/)                                 | ✅ Complete  | No API contracts (frontend-only feature)            |
| [quickstart.md](quickstart.md)                           | ✅ Complete  | Testing checklist, troubleshooting guide            |
| [checklists/requirements.md](checklists/requirements.md) | ✅ Complete  | Spec quality validation (all items passed)          |

## Next Steps

**Planning phase complete.** To proceed with implementation:

1. **Generate tasks**: Run `/speckit.tasks` to create actionable task breakdown
2. **Implement tasks**: Run `/speckit.implement` to execute the implementation plan
3. **Create issues** (optional): Run `/speckit.taskstoissues` to sync with GitHub

**Ready for implementation** - all design decisions documented, constitution compliance verified, quality gates identified.
