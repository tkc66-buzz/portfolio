# Research: Responsive Mobile Layout

**Feature Branch**: `040-responsive-mobile-layout`
**Date**: 2026-02-07

## Research Task 1: Breakpoint Strategy for NES.css Portfolio

### Context
The site currently has inconsistent breakpoint usage. Some components jump from default (0px) directly to `md:` (768px), skipping the `sm:` (640px) breakpoint entirely. Need to decide whether to add a custom `xs` breakpoint or use Tailwind defaults more consistently.

### Decision
Use Tailwind's default breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`) with mobile-first approach. Do NOT add a custom `xs` breakpoint.

### Rationale
- Adding custom breakpoints increases complexity with minimal benefit
- The real issue is not missing breakpoints but inconsistent use of existing ones
- Mobile-first means default styles target 320px+, then `sm:` for 640px+, `md:` for 768px+
- Tailwind's defaults cover the key device categories: phone (default), large phone/small tablet (sm), tablet (md), desktop (lg)

### Alternatives Considered
1. **Add `xs: 320px` breakpoint**: Increases tailwind config complexity; most issues can be solved with better default (mobile) styles
2. **Use container queries**: Overkill for this project; not needed for a single-page portfolio
3. **Keep desktop-first approach**: Contradicts Tailwind's mobile-first design and is the root cause of current issues

## Research Task 2: NES.css Responsive Overrides

### Context
NES.css is designed for desktop and has fixed padding, borders, and sizing that cause overflow on mobile. Need to determine the best approach to make NES.css components responsive without breaking the retro aesthetic.

### Decision
Apply targeted CSS overrides in `globals.css` for NES.css components at mobile widths, using `max-width` media queries to avoid affecting desktop layout.

### Rationale
- NES.css components use fixed pixel values for padding and borders
- Overriding with Tailwind utilities is unreliable because NES.css uses `!important` in some places
- A small set of `globals.css` overrides is more maintainable than wrapper components
- Using `max-width` media queries preserves desktop styles exactly as they are

### Alternatives Considered
1. **Replace NES.css with custom retro CSS**: Major rewrite, loses the authentic NES look
2. **Wrap each NES.css component with a responsive div**: Adds DOM complexity, doesn't solve padding issues
3. **Use Tailwind `!important` modifier**: Fragile approach, fights with NES.css specificity

## Research Task 3: Hero Section Mobile Layout

### Context
Hero section uses `p-8` (32px padding all around), which leaves only 256px content width at 320px viewport. Image, title, and bio need more breathing room.

### Decision
Reduce Hero padding to `p-4 sm:p-6 md:p-8` and adjust font sizes to `text-xl sm:text-2xl md:text-3xl` for the title.

### Rationale
- `p-4` (16px) gives 288px content width at 320px viewport — sufficient for all content
- `sm:p-6` provides intermediate step before desktop `md:p-8`
- Title at `text-xl` (20px) is readable on small screens without dominating
- Mobile-first progression feels natural

### Alternatives Considered
1. **Use viewport units (vw) for padding**: Inconsistent with Tailwind approach; harder to maintain
2. **Keep p-8 and overflow-hidden**: Hides content rather than fixing layout
3. **Reduce only horizontal padding**: Inconsistent; vertical padding should also scale

## Research Task 4: Button Group Responsive Strategy

### Context
Multiple sections (Contact, Writing, TableOfContents) use `flex flex-wrap gap-3` for button groups. At 288px content width, NES.css buttons (~80-120px each) cause awkward wrapping.

### Decision
Use `flex flex-col sm:flex-row sm:flex-wrap` for button groups that need to stack on mobile, and `w-full sm:w-auto` on individual buttons for full-width stacking on phones.

### Rationale
- Vertical stacking on mobile gives each button full width — better touch targets
- `sm:flex-row sm:flex-wrap` restores horizontal layout on larger screens
- `w-full sm:w-auto` ensures buttons are tappable on mobile (44px+ height × full width)
- Preserves existing desktop layout

### Alternatives Considered
1. **Reduce button font size on mobile**: Makes text unreadable; violates usability principle
2. **Use CSS grid with auto-fit**: More complex; flex-col is simpler for this case
3. **Limit buttons per row with explicit widths**: Fragile; breaks with content changes

## Research Task 5: Work RPG Panel Mobile Optimization

### Context
Work RPG UI uses a CSS grid that collapses to single column on mobile (< 768px). The STATUS panel contains flex-wrapped badges that may overflow at 288px width.

### Decision
Add `text-xs` and reduced padding to badges on mobile via globals.css overrides. Keep single-column grid layout on mobile as-is.

### Rationale
- Single-column layout is correct for mobile — no change needed to grid
- Badge overflow is caused by NES.css badge fixed sizing, not layout structure
- Small text on badges is acceptable on mobile since they are supplementary info
- CSS overrides in globals.css are consistent with Research Task 2 approach

### Alternatives Considered
1. **Hide badges on mobile**: Removes useful information
2. **Replace badges with text labels**: Loses retro aesthetic
3. **Add horizontal scrolling to badge container**: Poor UX; conflicts with FR-001
