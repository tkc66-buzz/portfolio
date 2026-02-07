# Responsive Contracts: Mobile Layout

**Feature Branch**: `040-responsive-mobile-layout`

## Overview

This feature has no REST/GraphQL API. The "contracts" define the responsive behavior rules that each component must follow.

## Global Contract: No Horizontal Overflow

```
For ALL viewport widths >= 320px:
  document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

This is the primary acceptance criterion. No component may cause horizontal scrollbar to appear.

## Component Responsive Contracts

### Page Container (`src/app/page.tsx`)

```
Viewport   | Horizontal Padding
-----------+-------------------
< 640px    | px-3 (12px)
>= 640px   | px-4 (16px)
>= 768px   | px-8 (32px)
```

### Hero Section (`src/components/Hero.tsx`)

```
Viewport   | Padding | Title Size | Image Width
-----------+---------+------------+------------
< 640px    | p-4     | text-xl    | w-28 (112px)
>= 640px   | p-6     | text-2xl   | w-32 (128px)
>= 768px   | p-8     | text-3xl   | w-48 (192px)
>= 1024px  | p-8     | text-3xl   | w-56 (224px)
```

### Button Groups (`ContactSection.tsx`, `WritingSection.tsx`)

```
Viewport   | Direction    | Button Width
-----------+-------------+-------------
< 640px    | flex-col     | w-full
>= 640px   | flex-row     | w-auto
           | flex-wrap    |
```

### TableOfContents (`src/components/TableOfContents.tsx`)

```
Viewport   | Visibility
-----------+-----------
< 640px    | hidden (MobileMenu shown instead)
>= 640px   | block (sticky header)
```

### MobileMenu Button (`src/components/MobileMenu.tsx`)

```
Viewport   | Visibility
-----------+-----------
< 640px    | block (fixed, top-right)
>= 640px   | hidden (TableOfContents shown instead)
```

### Work RPG Grid (`src/app/globals.css`)

```
Viewport   | Columns
-----------+--------
< 768px    | 1 column (stacked)
>= 768px   | 2 columns (grid-template-columns: 1fr 1.25fr)
```

### Activities Grid (`src/components/sections/ActivitiesSection.tsx`)

```
Viewport   | Columns (Talks group)
-----------+---------------------
< 768px    | 1 column
>= 768px   | 2 columns
```

## NES.css Override Contract (`src/app/globals.css`)

### Scope

Overrides apply ONLY at `max-width: 639px` (below `sm:` breakpoint) to avoid affecting desktop layout.

### Rules

```css
/* Contract: NES.css buttons reduce padding on mobile */
@media (max-width: 639px) {
  .nes-btn { padding: 2px 6px; font-size: 0.75rem; }
}

/* Contract: NES.css badges reduce size on mobile */
@media (max-width: 639px) {
  .nes-badge { font-size: 0.625rem; }
}

/* Contract: NES.css containers reduce padding on mobile */
@media (max-width: 639px) {
  .nes-container { padding: 0.75rem; }
}

/* Contract: NES.css progress bars respect parent width */
.nes-progress { max-width: 100%; }
```

### Guarantee

- Desktop layout (>= 640px) is IDENTICAL to before this feature
- NES.css retro aesthetic is maintained at all sizes
- Touch targets remain >= 44px height on mobile
