# Research: Sticky MENU design (retro HUD + modern UX)

## Decision 1: Use CSS `position: sticky` (no JS)

**Decision**: Implement MENU as a sticky component using CSS only (`position: sticky; top: ...`).

**Rationale**:

- Zero runtime deps and minimal complexity (Constitution IV: Lightweight/Fast/Durable)
- Works well for single-page navigation + hash links

**Alternatives considered**:

- **`position: fixed`**: more intrusive; requires more padding/margins to avoid covering content
- **JS scroll spy + collapsible menu**: cool but unnecessary complexity for MVP

## Decision 2: “HUD” styling guidelines

**Decision**: Style the sticky menu as a compact HUD panel:

- Frame background: `bg-[#1b1b1b]` + `frame`
- Add subtle “glass/CRT” feel using:
  - `backdrop-blur` (optional) and/or semi-transparent border overlay
  - small shadow and high-contrast gold accent
- Keep buttons small, consistent, and wrap on mobile

**Rationale**:

- Looks intentional and “cool” while remaining readable
- Keeps the NES.css vibe without overpowering the content

## Decision 3: Anchor offset strategy

**Decision**: Ensure each section’s `scroll-mt-*` accounts for the sticky menu height.

**Rationale**:

- Without offset, anchor jumps land under the sticky menu and headings get hidden

**Implementation approach**:

- Define CSS variables for the sticky menu geometry:
  - `--menu-top`: sticky top spacing
  - `--menu-offset`: anchor jump offset (>= menu height + top spacing)
- Apply:
  - Sticky: `top-[var(--menu-top)]` on `src/components/TableOfContents.tsx`
  - Anchor offsets: `scroll-mt-[var(--menu-offset)]` on each section (and project card anchors)
