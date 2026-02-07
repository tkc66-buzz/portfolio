# Data Model: Responsive Mobile Layout

**Feature Branch**: `040-responsive-mobile-layout`
**Date**: 2026-02-07

## Overview

This feature has no data model. It is a CSS/layout-only change that modifies Tailwind utility classes and adds targeted CSS overrides. No state, storage, or data structures are involved.

## Responsive Breakpoint Model

The breakpoint system defines how layout adapts across screen sizes.

### Breakpoints (Tailwind Defaults)

| Token | Width | Target Devices | Usage |
|-------|-------|---------------|-------|
| (default) | 0px+ | iPhone SE, small phones (320-639px) | Base mobile styles |
| `sm:` | 640px+ | Large phones, small tablets | Intermediate layout |
| `md:` | 768px+ | Tablets (iPad portrait) | Two-column layouts |
| `lg:` | 1024px+ | Desktop, iPad landscape | Full desktop layout |

### Component Layout Rules

| Component | Default (mobile) | sm (640px+) | md (768px+) | lg (1024px+) |
|-----------|------------------|-------------|-------------|--------------|
| Page padding | `px-3` | `px-4` | `px-8` | (same) |
| Hero padding | `p-4` | `p-6` | `p-8` | (same) |
| Hero title | `text-xl` | `text-2xl` | `text-3xl` | (same) |
| Hero image | `w-28` | `w-32` | `w-48` | `w-56` |
| Button groups | `flex-col` | `flex-row flex-wrap` | (same) | (same) |
| Button width | `w-full` | `w-auto` | (same) | (same) |
| Work RPG grid | 1 column | (same) | 2 columns | (same) |
| Activities grid | 1 column | (same) | 2 columns | (same) |
| TableOfContents | hidden | block | (same) | (same) |
| MobileMenu btn | block | hidden | (same) | (same) |

### NES.css Override Rules

| Component | Default NES.css | Mobile Override | Applied When |
|-----------|----------------|-----------------|-------------|
| `.nes-btn` | `padding: 4px 8px` | Reduce horizontal padding | `max-width: 639px` |
| `.nes-badge` | `padding: 2px 8px` | Reduce to `2px 4px`, `font-size: 0.625rem` | `max-width: 639px` |
| `.nes-container` | `padding: 1.5rem` | `padding: 0.75rem` | `max-width: 639px` |
| `.nes-progress` | `width: auto` | `max-width: 100%` | Always (safety) |
