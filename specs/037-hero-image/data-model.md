# Data Model: Hero Image Display

**Feature**: 037-hero-image | **Date**: 2026-01-01 | **Phase**: 1 (Design & Contracts)

## Overview

This feature requires minimal data modeling as it involves a single static asset (profile image) with no database storage or complex state management. The "data" is limited to file metadata and component props.

## Entities

### HeroImage (Static Asset)

**Description**: The profile image file stored in the public assets directory and rendered in the hero section.

**Storage Location**: `public/assets/profile.jpg`

**Attributes**:

| Attribute | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
| filePath | string | Relative path from public directory | Yes | "/assets/profile.jpg" |
| alt | string | Descriptive alternative text for accessibility | Yes | "Profile photo of Takeshi Watanabe" |
| width | number | Display width in pixels (source should be 2x for Retina) | Yes | 200 |
| height | number | Display height in pixels (1:1 aspect ratio) | Yes | 200 |
| priority | boolean | Whether to disable lazy loading (above-the-fold) | Yes | true |

**File Specifications**:

- **Format**: JPEG or PNG (Next.js converts to WebP/AVIF automatically)
- **Dimensions**: 400×400px minimum (2x display size for Retina displays)
- **Aspect Ratio**: 1:1 (square)
- **Color Space**: sRGB
- **File Size**: <100KB (unoptimized source)
- **Optimized Size**: ~20-30KB (WebP after Next.js optimization)

**Validation Rules**:

- File must exist at specified path
- Dimensions must maintain 1:1 aspect ratio
- Alt text must be descriptive (not empty, not generic "profile")
- File size should be reasonable (<100KB source) to meet performance requirements

### HeroImageComponent (UI Component Props)

**Description**: Props interface for rendering the hero image within the Hero component.

**Component**: `Hero.tsx` (modified)

**Props Structure**:

```typescript
// No new props needed for Hero component
// Image configuration is hardcoded within component

interface HeroImageConfig {
  src: string;           // "/assets/profile.jpg"
  alt: string;           // "Profile photo of Takeshi Watanabe"
  width: number;         // 200
  height: number;        // 200
  priority: boolean;     // true
  className?: string;    // Tailwind responsive classes
}
```

**State Management**: None required - static configuration

## Relationships

```text
Hero.tsx (Component)
  ├── imports: next/image (Image component)
  ├── renders: HeroImage asset
  └── maintains: Existing hero content (name, title, bio, START button)

public/assets/profile.jpg (Static Asset)
  └── served by: Next.js static file serving
  └── optimized by: Next.js Image Optimization API
```

**Data Flow**:

1. Browser requests homepage (`/`)
2. Next.js SSR renders Hero component
3. Hero component includes `<Image>` with src="/assets/profile.jpg"
4. Next.js Image Optimization API processes request
5. Optimized image (WebP/AVIF) served from `/_next/image` endpoint
6. Browser displays image with reserved space (no CLS)

## State Transitions

**Not applicable** - Static image display has no state transitions. The image is either:

- **Loaded**: Image successfully fetched and displayed
- **Loading**: Brief transition state (handled by Next.js Image component)
- **Error**: Image failed to load (fallback: alt text displayed)

No user interaction triggers state changes. The "PRESS START" functionality affects menu visibility but not the hero image display.

## Data Validation

### Pre-Implementation Checklist

Before implementing, ensure:

- [ ] Profile image file prepared at correct dimensions (400×400px minimum)
- [ ] Image compressed to <100KB file size
- [ ] Image aspect ratio is exactly 1:1 (square)
- [ ] Image is in JPEG or PNG format
- [ ] Image saved to `public/assets/profile.jpg`
- [ ] Alt text decided and documented

### Runtime Validation

No runtime validation needed. If image fails to load:

- Next.js Image component displays alt text
- No error thrown (graceful degradation)
- Layout space still reserved (no CLS)

## Integration Points

### File System

```text
public/assets/
├── diagrams/
│   └── go-migration.svg
└── pixel/
    └── icons/
        └── *.svg
└── profile.jpg  ← NEW FILE
```

### Component Integration

```text
src/components/Hero.tsx
  ├── Import: Image from "next/image"
  ├── Add: Image component in JSX
  ├── Maintain: Existing text content structure
  └── Maintain: START button functionality
```

### No Backend Integration

- No API endpoints needed
- No database queries
- No external service calls
- No server-side data fetching

## Performance Considerations

### Image Loading

- **Initial Load**: Image loads with priority (no lazy loading)
- **Subsequent Loads**: Cached by browser and Next.js Image Optimization API
- **Cache Duration**: Default Next.js cache headers (1 year for static assets)

### Responsive Variants

Next.js automatically generates multiple sizes:

```text
Original: /assets/profile.jpg (400×400px)
↓ Next.js Image Optimization
├── /next/image?url=/assets/profile.jpg&w=128&q=85 (mobile)
├── /next/image?url=/assets/profile.jpg&w=192&q=85 (tablet)
└── /next/image?url=/assets/profile.jpg&w=224&q=85 (desktop)

Format variants (automatic):
├── WebP (modern browsers)
├── AVIF (cutting-edge browsers)
└── JPEG/PNG fallback (legacy browsers)
```

### Size Breakdown

| Viewport | Display Size | Source Request | Optimized Size (WebP) |
|----------|--------------|----------------|----------------------|
| Mobile (<768px) | 128×128px | w=128 | ~8-12KB |
| Tablet (768-1024px) | 192×192px | w=192 | ~15-20KB |
| Desktop (>1024px) | 224×224px | w=224 | ~20-30KB |

## Contracts

This feature has no API contracts (no backend, no external services). See [contracts/](./contracts/) directory for placeholder structure.

## Summary

This is a minimal data model for a UI-only feature:

- **1 Static Asset**: Profile image file in `public/assets/`
- **0 Database Tables**: No persistence layer
- **0 API Endpoints**: No backend integration
- **0 State Objects**: No complex state management
- **1 Component Modification**: Hero.tsx to render image

The simplicity aligns with Constitution Principle IV (Lightweight, Fast, and Durable) and avoids unnecessary complexity.
