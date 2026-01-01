# Tasks: Hero Image Display

**Input**: Design documents from `/specs/037-hero-image/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: NOT REQUESTED - No test tasks included (manual testing only per quickstart.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3) - Setup/Foundational/Polish tasks have NO story label
- Include exact file paths in descriptions

## Path Conventions

- Single Next.js project: `src/`, `public/` at repository root
- Component modifications: `src/components/Hero.tsx`
- Static assets: `public/assets/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Asset preparation and verification before implementation

- [ ] T001 Prepare profile image file (400×400px, <100KB, JPEG/PNG, 1:1 aspect ratio)
- [ ] T002 Save profile image to public/assets/profile.jpg
- [ ] T003 Verify image file exists and meets specifications (<100KB, square aspect)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational tasks needed - all infrastructure already exists

**⚠️ SKIP**: This feature requires no new infrastructure. Next.js Image component and static file serving are already available.

**Checkpoint**: Ready to implement user stories immediately

---

## Phase 3: User Story 1 - First Impression Visual Identity (Priority: P1) 🎯 MVP

**Goal**: Visitor immediately sees a profile image that establishes visual identity and professionalism

**Independent Test**: Load homepage and verify profile image is visible in hero section with correct aspect ratio and no layout shift

### Implementation for User Story 1

- [x] T004 [US1] Add Image import from next/image in src/components/Hero.tsx
- [x] T005 [US1] Create image container with responsive flexbox layout in src/components/Hero.tsx
- [x] T006 [US1] Add Image component with src="/assets/profile.jpg" in src/components/Hero.tsx
- [x] T007 [US1] Configure Image component props (width=200, height=200, priority=true, alt text) in src/components/Hero.tsx
- [x] T008 [US1] Apply retro border styling (border-4 border-fami-gold) to Image in src/components/Hero.tsx
- [x] T009 [US1] Wrap existing text content in container div for flexbox layout in src/components/Hero.tsx
- [x] T010 [US1] Verify START button functionality still works with new image layout in src/components/Hero.tsx

**Checkpoint**: Profile image displays in hero section with proper aspect ratio and no layout shift (CLS <0.1)

---

## Phase 4: User Story 2 - Responsive Image Display (Priority: P2)

**Goal**: Visitors on different devices see hero image optimized for their screen size without degrading performance

**Independent Test**: View portfolio on mobile (375px), tablet (768px), and desktop (1920px) to verify appropriate sizing and fast loading

### Implementation for User Story 2

- [x] T011 [US2] Add responsive width classes (w-32 md:w-48 lg:w-56) to Image component in src/components/Hero.tsx
- [x] T012 [US2] Add aspect-square class to maintain 1:1 aspect ratio across breakpoints in src/components/Hero.tsx
- [x] T013 [US2] Configure flexbox direction (flex-col md:flex-row) for layout switching in src/components/Hero.tsx
- [x] T014 [US2] Add responsive spacing classes for image-text gap in src/components/Hero.tsx
- [ ] T015 [US2] Verify Next.js serves optimized images (WebP/AVIF) via /_next/image endpoint
- [ ] T016 [US2] Test image loading on throttled 3G connection (<2s load time requirement)

**Checkpoint**: Image displays appropriately on all device sizes (mobile 128px, tablet 192px, desktop 224px) with optimized formats

---

## Phase 5: User Story 3 - Accessibility and Semantic Markup (Priority: P3)

**Goal**: Screen reader users and visitors using assistive technologies can understand what the image represents

**Independent Test**: Use VoiceOver/NVDA to verify image has descriptive alt text and doesn't interfere with keyboard navigation

### Implementation for User Story 3

- [x] T017 [US3] Verify alt text is descriptive ("Profile photo of Takeshi Watanabe") in src/components/Hero.tsx
- [x] T018 [US3] Test keyboard navigation (Tab order: image → heading → bio → button)
- [x] T019 [US3] Verify screen reader announces alt text correctly
- [x] T020 [US3] Ensure image doesn't create focus trap or break tab order
- [x] T021 [US3] Verify fallback behavior when image fails to load (alt text displayed)

**Checkpoint**: Image is fully accessible with proper alt text, logical tab order, and screen reader support

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and quality assurance

- [x] T022 [P] Run pnpm lint and fix any errors in src/components/Hero.tsx
- [x] T023 [P] Run pnpm build and verify successful compilation
- [ ] T024 Run performance audit (Lighthouse: CLS <0.1, Performance 90+, Accessibility 100)
- [ ] T025 Execute quickstart.md testing checklist (all visual, responsive, accessibility, performance checks)
- [ ] T026 [P] Verify image file size after Next.js optimization (<30KB WebP)
- [ ] T027 [P] Test START button functionality across all viewport sizes
- [x] T028 Verify documentation sync (CLAUDE.md updated with active technologies - already done in planning phase)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: SKIPPED - no infrastructure changes needed
- **User Stories (Phase 3-5)**: Each can start after Phase 1 (Setup) completes
  - US1 (First Impression) - MUST complete first (MVP)
  - US2 (Responsive) - Depends on US1 (modifies same component)
  - US3 (Accessibility) - Depends on US1 (verifies implementation)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup (Phase 1) - No dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 completion - Adds responsive behavior to existing image
- **User Story 3 (P3)**: Depends on US1 completion - Verifies accessibility of existing implementation

### Within Each User Story

- **US1**: Sequential implementation (import → container → image → props → styling → layout → verification)
- **US2**: Sequential implementation (responsive classes → aspect ratio → flexbox → spacing → verification → testing)
- **US3**: Sequential verification tasks (alt text → keyboard nav → screen reader → focus behavior → fallback)

### Parallel Opportunities

- **Phase 1**: All tasks can run in parallel if team has multiple people
- **Phase 6**: Tasks T022, T023, T026, T027 can run in parallel (different concerns)
- **User Stories**: Must be sequential (US1 → US2 → US3) due to same-file modifications

**Note**: This feature has LIMITED parallelization opportunities because all changes are in a single component file (src/components/Hero.tsx). User stories must be implemented sequentially to avoid merge conflicts.

---

## Parallel Example: Polish Phase

```bash
# Launch parallelizable polish tasks together:
Task: "Run pnpm lint and fix any errors in src/components/Hero.tsx"
Task: "Run pnpm build and verify successful compilation"
Task: "Verify image file size after Next.js optimization (<30KB WebP)"
Task: "Test START button functionality across all viewport sizes"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (prepare and place image file)
2. Complete Phase 3: User Story 1 (basic image display)
3. **STOP and VALIDATE**:
   - Load homepage
   - Verify image displays correctly
   - Check aspect ratio maintained
   - Verify no layout shift
   - Test START button still works
4. Deploy/demo if ready

**This delivers immediate value**: Visitors see profile image that establishes visual identity

### Incremental Delivery

1. Complete Setup → Image file ready
2. Add User Story 1 → Test independently → **Deploy/Demo (MVP!)**
3. Add User Story 2 → Test responsiveness → Deploy/Demo
4. Add User Story 3 → Verify accessibility → Deploy/Demo
5. Complete Polish → Final quality checks → Final Deploy

### Why This Order?

- **US1 (P1)**: Core value - image must be visible before optimizing it
- **US2 (P2)**: Enhancement - responsive behavior improves experience across devices
- **US3 (P3)**: Quality - accessibility verification ensures inclusivity

Each story builds on the previous one while being independently testable.

---

## Notes

- [P] tasks = different concerns, can run in parallel
- [Story] label maps task to specific user story for traceability
- NO [P] within user stories (all tasks modify same file)
- All tasks modify src/components/Hero.tsx except setup tasks (public/assets/)
- Commit after completing each user story phase
- Stop at any checkpoint to validate story independently
- Performance targets: <500ms page load increase, CLS <0.1, <2s image load on 3G
- Accessibility targets: WCAG AA compliance, screen reader support
- Visual targets: Square aspect ratio, NES.css-style border, retro aesthetic

---

## Edge Cases Handled

- **Image missing**: Next.js Image component displays alt text fallback
- **Large image file**: Next.js automatically optimizes and serves WebP/AVIF
- **Unusual aspect ratio**: aspect-square class constrains to 1:1 ratio
- **Slow network**: priority prop ensures above-the-fold loading, <2s requirement
- **Layout shift**: Explicit width/height props reserve space before load
- **START button conflict**: Image positioned before button, no z-index conflicts
- **Keyboard navigation**: Natural tab order maintained (image → heading → bio → button)
- **Screen readers**: Descriptive alt text provides context

---

## Task Count Summary

- **Phase 1 (Setup)**: 3 tasks
- **Phase 3 (US1)**: 7 tasks (MVP)
- **Phase 4 (US2)**: 6 tasks
- **Phase 5 (US3)**: 5 tasks
- **Phase 6 (Polish)**: 7 tasks

**Total**: 28 tasks

**MVP Scope**: Phase 1 + Phase 3 = 10 tasks (delivers core value)

**Parallel Opportunities**: 4 tasks in Phase 6 (Polish) can run in parallel

**Independent Test Points**: 3 checkpoints (one per user story) for validation
