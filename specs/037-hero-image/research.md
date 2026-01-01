# Research: Hero Image Display

**Feature**: 037-hero-image | **Date**: 2026-01-01 | **Phase**: 0 (Outline & Research)

## Research Questions

This document consolidates research findings for technical decisions needed to implement the hero image feature.

## 1. Image Placement & Layout Strategy

**Decision**: Position image above text content on mobile, beside text on desktop using flexbox

**Rationale**:

- Maintains existing centered text layout without major refactoring
- Mobile-first approach: stack vertically on small screens for readability
- Desktop: horizontal layout leverages wider viewport space
- Flexbox provides natural responsive behavior without media query complexity
- Preserves existing "PRESS START" button functionality at bottom of hero section

**Alternatives considered**:

- Float-based layout: Rejected due to complexity and potential text wrapping issues
- Grid layout: Overkill for simple two-element layout (image + text container)
- Background image: Rejected because it doesn't allow proper semantic HTML and accessibility
- Absolute positioning: Would interfere with responsive behavior and accessibility

**Implementation approach**:

- Wrap existing text content in a `<div>` container
- Add image element before or beside text container
- Use `flex-direction: column` on mobile, `flex-direction: row` on tablet+
- Use Tailwind responsive utilities: `flex flex-col md:flex-row`

## 2. Next.js Image Component Best Practices

**Decision**: Use `next/image` with explicit width/height and `priority` prop

**Rationale**:

- Next.js Image component provides automatic optimization (WebP, AVIF, responsive sizing)
- Prevents layout shift by reserving space before image loads (CLS <0.1 requirement)
- `priority` prop ensures hero image loads immediately (above-the-fold content)
- Built-in lazy loading for non-priority images (not needed here, but good to know)
- No additional dependencies required (already available in Next.js 16)

**Alternatives considered**:

- Plain `<img>` tag: No optimization, no automatic responsive images, no layout shift prevention
- Third-party image service (Cloudinary, Imgix): Unnecessary complexity and cost for single static image
- CSS background-image: No semantic HTML, poor accessibility, no Next.js optimization

**Technical specifications**:

```tsx
import Image from "next/image";

<Image
  src="/assets/profile.jpg"
  alt="Profile photo of Takeshi Watanabe"
  width={200}
  height={200}
  priority
  className="..."
/>
```

**Key considerations**:

- `width` and `height` must match actual image dimensions for proper aspect ratio
- `priority` prop prevents lazy loading for above-the-fold content
- `alt` text must be descriptive (not just "profile" but context about who)
- Use responsive Tailwind classes for sizing: `w-32 md:w-48` (px → responsive rem units)

## 3. Responsive Image Sizing Strategy

**Decision**: Use Tailwind responsive width classes with `aspect-square` constraint

**Rationale**:

- Square aspect ratio (1:1) is standard for profile images
- Tailwind provides clean responsive breakpoints: `w-32` (mobile) → `w-48` (tablet) → `w-56` (desktop)
- `aspect-square` utility ensures consistent shape across all sizes
- Prevents need for multiple image variants (Next.js handles optimization automatically)
- Maintains visual balance relative to text content at each breakpoint

**Alternatives considered**:

- Fixed pixel sizes: Not responsive, poor UX on different devices
- Percentage-based sizing: Unpredictable, depends on parent container size
- Multiple image files for different sizes: Next.js Image component handles this automatically
- Object-fit cover with container: More complex, not needed for square profile images

**Recommended sizes**:

- Mobile (< 768px): 128px (w-32) - balances with compact text
- Tablet (768px - 1024px): 192px (w-48) - more prominent without overwhelming
- Desktop (>= 1024px): 224px (w-56) - large enough to be impactful

## 4. Accessibility Implementation

**Decision**: Semantic `<Image>` with descriptive alt text, no decorative treatment

**Rationale**:

- Profile image is content, not decoration (conveys identity)
- Alt text should describe who is in the photo: "Profile photo of Takeshi Watanabe"
- Image is keyboard-navigable by default (no custom focus handling needed)
- Screen readers will announce image with alt text before hero heading
- No `aria-hidden` needed (unlike decorative icons)

**Alternatives considered**:

- Empty alt text (`alt=""`): Incorrect, image is meaningful content
- Generic alt text (`alt="profile"`): Too vague, doesn't convey identity
- aria-label on wrapper: Redundant when alt text is sufficient
- Role="img" on div: Wrong approach, use native `<Image>` semantics

**Best practices applied**:

- Alt text format: "Profile photo of [Full Name]" (clear, concise, descriptive)
- No redundant text ("image of", "photo of") - screen readers announce "image" automatically
- If image fails to load, alt text provides fallback context
- Logical tab order maintained (image → heading → bio → button)

## 5. Retro Aesthetic Integration

**Decision**: Add subtle NES.css-inspired border treatment and maintain Famicom palette

**Rationale**:

- Round/circular images don't match retro aesthetic - use square with border
- NES.css provides `.nes-container` border style that can be adapted
- Keep image itself unaltered (no pixelation filter) for professionalism
- Use existing palette colors for border: `border-fami-gold` or `border-fami-ivory`
- Subtle approach: border adds retro flavor without being gimmicky

**Alternatives considered**:

- Circular image: Too modern, doesn't match NES.css theme
- Heavy pixelation filter: Makes photo unprofessional and hard to see
- 8-bit style avatar: Loses personal identity, becomes generic
- No border treatment: Looks out of place in retro-themed design

**Implementation approach**:

```tsx
<div className="relative">
  <Image
    src="/assets/profile.jpg"
    alt="..."
    width={200}
    height={200}
    priority
    className="border-4 border-fami-gold"
  />
</div>
```

**Visual considerations**:

- 4px border matches NES.css container border width
- Gold border (`border-fami-gold`) complements existing accent color usage
- No shadow or glow effects (not period-appropriate for 8-bit aesthetic)
- Sharp corners maintain retro feel while keeping image recognizable

## 6. Performance Optimization Strategy

**Decision**: Use Next.js automatic optimization with quality=85 and modern formats

**Rationale**:

- Next.js 16 automatically generates WebP and AVIF formats
- Quality=85 provides good balance between file size and visual quality
- Responsive srcset generated automatically (no manual configuration needed)
- Image served from `/_next/image` optimized endpoint
- Meets performance requirements: <500ms load increase, <2s total load on 3G

**Alternatives considered**:

- Manual image optimization: Error-prone, requires build-time tooling
- CDN with manual configuration: Unnecessary complexity for single image
- Lower quality (60-70): Visible quality loss, unprofessional appearance
- Higher quality (90-100): Larger file size, slower load times

**Technical specifications**:

- Source image should be 2x target size for Retina displays (e.g., 400×400px for 200×200px display)
- Format: JPEG or PNG (Next.js converts to WebP/AVIF automatically)
- File size target: <100KB source image (optimized to ~20-30KB WebP)
- Color space: sRGB for web compatibility

**Optimization checklist**:

- ✅ Use `priority` prop to prevent lazy loading
- ✅ Specify explicit width/height to prevent CLS
- ✅ Use responsive sizing classes for different viewports
- ✅ Ensure source image is properly compressed before committing
- ✅ Test on 3G throttled connection to verify <2s load time

## 7. Layout Shift Prevention

**Decision**: Reserve space with explicit dimensions and aspect-ratio CSS

**Rationale**:

- Next.js Image component automatically reserves space when width/height provided
- Prevents Cumulative Layout Shift (CLS) by allocating space before image loads
- Meets performance requirement: CLS <0.1
- No manual skeleton/placeholder needed with proper Image component usage

**Implementation**:

```tsx
// Next.js Image automatically reserves space based on width/height
<Image
  src="/assets/profile.jpg"
  alt="Profile photo of Takeshi Watanabe"
  width={200}
  height={200}
  priority
  className="aspect-square" // Ensures container maintains ratio
/>
```

**Technical details**:

- Image component renders wrapper with intrinsic aspect ratio
- Space allocated during SSR/initial render (before image downloads)
- No flash of unstyled content or jumping layout
- Works with responsive sizing (space adjusts per breakpoint)

## Summary of Key Decisions

| Aspect | Decision | Key Benefit |
|--------|----------|-------------|
| Layout | Flexbox with responsive direction (column → row) | Maintains existing structure, responsive without complexity |
| Image Component | Next.js Image with priority prop | Automatic optimization, CLS prevention, no new dependencies |
| Sizing | Tailwind responsive classes (w-32 → w-48 → w-56) | Clean responsive behavior, maintains visual balance |
| Accessibility | Descriptive alt text, semantic HTML | Screen reader friendly, keyboard navigable |
| Aesthetic | Square with NES.css-style border | Retro flavor without sacrificing professionalism |
| Performance | Default Next.js optimization (quality=85, auto formats) | Meets <500ms load increase, <2s total requirement |
| CLS Prevention | Explicit width/height on Image component | Prevents layout shift, achieves CLS <0.1 |

## Next Steps

All research complete. Proceed to Phase 1:

- Create data-model.md (minimal - just image asset metadata)
- Create quickstart.md (developer guide for testing implementation)
- Update agent context with research findings
