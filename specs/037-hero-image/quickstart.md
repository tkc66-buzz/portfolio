# Quickstart: Hero Image Display

**Feature**: 037-hero-image | **Date**: 2026-01-01 | **Phase**: 1

## Purpose

This guide helps developers quickly test and verify the hero image implementation locally before committing changes.

## Prerequisites

- Node.js v25.2.0 (via nvm)
- pnpm 10.13.1
- Profile image file prepared (400×400px JPEG/PNG, <100KB)

## Setup Steps

### 1. Prepare Profile Image

```bash
# Create a profile image (or use an existing one)
# Requirements:
# - Dimensions: 400×400px (minimum, 2x display size for Retina)
# - Format: JPEG or PNG
# - Aspect ratio: 1:1 (square)
# - File size: <100KB
# - Color space: sRGB

# Example: Using ImageMagick to prepare an image
convert input.jpg -resize 400x400^ -gravity center -extent 400x400 -quality 85 public/assets/profile.jpg

# Or manually:
# 1. Open image in photo editor
# 2. Crop to square (1:1 aspect ratio)
# 3. Resize to 400×400px
# 4. Export as JPEG with quality 85
# 5. Save to public/assets/profile.jpg
```

### 2. Verify File Placement

```bash
# Check that the file exists at the correct location
ls -lh public/assets/profile.jpg

# Expected output:
# -rw-r--r--  1 user  staff   85K Jan  1 12:00 public/assets/profile.jpg

# Verify file size (should be < 100KB)
du -h public/assets/profile.jpg
```

### 3. Start Development Server

```bash
# Ensure correct Node version
source ~/.nvm/nvm.sh
nvm use 25.2.0

# Install dependencies (if not already installed)
pnpm install

# Start dev server
pnpm dev
```

The server should start at `http://localhost:3000`.

## Testing Checklist

### Visual Testing

Open `http://localhost:3000` in your browser and verify:

- [ ] Profile image appears in the hero section
- [ ] Image is not distorted (maintains square aspect ratio)
- [ ] Image displays before "PRESS START" text
- [ ] Image has visible border (gold/ivory, NES.css style)
- [ ] Text content (name, title, bio) is still readable
- [ ] START button is still visible and functional

### Responsive Testing

Test across different viewport sizes:

#### Mobile (375px - 767px)

```bash
# Use browser DevTools to set viewport to 375×667 (iPhone SE)
# Or use responsive mode and drag to mobile width
```

Verify:

- [ ] Image is 128px (w-32) - smaller size for compact layout
- [ ] Image stacked above text (vertical layout)
- [ ] Image centered horizontally
- [ ] Text content not overlapped or cut off

#### Tablet (768px - 1023px)

```bash
# Set viewport to 768×1024 (iPad)
```

Verify:

- [ ] Image is 192px (w-48) - medium size
- [ ] Image beside text (horizontal layout starts)
- [ ] Balanced visual weight between image and text

#### Desktop (1024px+)

```bash
# Set viewport to 1920×1080 (Full HD)
```

Verify:

- [ ] Image is 224px (w-56) - largest size
- [ ] Image beside text with good spacing
- [ ] Hero section looks balanced and professional

### Accessibility Testing

#### Screen Reader

```bash
# macOS: Enable VoiceOver
# Cmd + F5

# Navigate to hero section and verify:
```

- [ ] Image has descriptive alt text announced
- [ ] Alt text says "Profile photo of Takeshi Watanabe" (not generic "profile")
- [ ] Image does not block navigation to heading or button

#### Keyboard Navigation

```bash
# Tab through page elements
```

- [ ] Tab order is logical: Menu → Image → Heading → Bio → Button
- [ ] No focus trap on image
- [ ] START button still keyboard-accessible

### Performance Testing

#### Network Throttling

```bash
# In Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Go to Network tab
# 3. Select "Fast 3G" throttling
# 4. Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
```

Verify:

- [ ] Image loads within 2 seconds
- [ ] No visible layout shift when image loads (CLS <0.1)
- [ ] Space reserved for image before load (no "pop-in")
- [ ] Optimized format served (WebP/AVIF in modern browsers)

#### Lighthouse Audit

```bash
# In Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Performance" and "Accessibility"
# 4. Run audit
```

Expected scores:

- [ ] Performance: 90+ (should not drop >5 points from baseline)
- [ ] Accessibility: 100 (image alt text should not cause issues)
- [ ] CLS: <0.1
- [ ] LCP: <2.5s

### Image Optimization Verification

Check that Next.js is serving optimized images:

```bash
# In DevTools Network tab, filter by "image"
# Click on the profile.jpg request
```

Verify:

- [ ] Request URL is `/_next/image?url=...` (not direct `/assets/profile.jpg`)
- [ ] Response includes `Content-Type: image/webp` (or `image/avif`)
- [ ] File size is significantly smaller than original (<30KB)
- [ ] Multiple variants generated for different widths (128, 192, 224)

### START Button Functionality

Ensure the image doesn't break existing functionality:

- [ ] "PRESS START" text visible before clicking START
- [ ] START button clickable and accessible
- [ ] Menu reveals correctly after clicking START
- [ ] Image remains visible during menu reveal animation
- [ ] No z-index or layout conflicts

## Build Verification

Before committing, ensure the production build works:

```bash
# Run linter
pnpm lint

# Expected: No errors related to Hero.tsx or image imports

# Run build
pnpm build

# Expected output includes:
# - Compiled successfully
# - No warnings about image optimization
# - Static page generation successful

# Test production build locally
pnpm start

# Open http://localhost:3000 and verify image displays correctly
```

## Common Issues & Solutions

### Issue: Image not appearing

**Symptoms**: Blank space or alt text only

**Solutions**:

1. Check file path: `public/assets/profile.jpg` (not `src/assets/`)
2. Restart dev server: `pnpm dev`
3. Clear Next.js cache: `rm -rf .next && pnpm dev`
4. Check browser console for 404 errors

### Issue: Image distorted or wrong aspect ratio

**Symptoms**: Image stretched or squashed

**Solutions**:

1. Verify source image is square (1:1 aspect ratio)
2. Check `width` and `height` props match (e.g., both 200)
3. Add `aspect-square` class to Image component

### Issue: Layout shift when image loads

**Symptoms**: Text jumps when image appears, poor CLS score

**Solutions**:

1. Ensure `width` and `height` props are set on Image component
2. Add `priority` prop to prevent lazy loading
3. Verify container has reserved space (inspect element for wrapper div)

### Issue: Image not optimized (large file size)

**Symptoms**: Slow load times, direct file served instead of `/_next/image`

**Solutions**:

1. Verify using `next/image` component (not `<img>`)
2. Check that `src` starts with `/` (absolute path from public)
3. Restart dev server to refresh image optimization cache

### Issue: Border not showing retro style

**Symptoms**: Plain image without NES.css-inspired border

**Solutions**:

1. Add `border-4 border-fami-gold` classes to Image component
2. Verify Tailwind config includes custom border colors
3. Check that `globals.css` defines `--fami-gold` CSS variable

## Next Steps

After local testing passes all checks:

1. Commit changes: `git add . && git commit -m "feat: add hero profile image"`
2. Push to remote: `git push origin 037-hero-image`
3. Create pull request
4. Deploy to preview environment (Vercel automatically creates preview)
5. Test on real devices (mobile, tablet) using preview URL
6. Merge to main after approval

## Reference Commands

```bash
# Quick start from scratch
source ~/.nvm/nvm.sh && nvm use 25.2.0
pnpm install
pnpm dev

# Verification commands
pnpm lint
pnpm format:check
pnpm build

# Clean restart (if issues occur)
rm -rf .next node_modules
pnpm install
pnpm dev
```

## Additional Resources

- [Next.js Image Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [Web Vitals (CLS, LCP)](https://web.dev/vitals/)
- [WCAG Image Alt Text Guidelines](https://www.w3.org/WAI/tutorials/images/)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
