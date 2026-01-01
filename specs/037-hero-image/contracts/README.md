# API Contracts: Hero Image Display

**Feature**: 037-hero-image | **Date**: 2026-01-01

## Overview

This feature has **no API contracts** as it is a frontend-only, UI implementation with no backend integration.

## Why No Contracts?

This feature:

- Uses only static file serving (no custom APIs)
- Has no database interactions
- Has no external service integrations
- Requires no request/response schemas
- Has no authentication or authorization logic

## Static Asset Serving

The only "contract" is the standard Next.js static file serving behavior:

**Endpoint**: `/assets/profile.jpg`

- **Method**: GET
- **Response**: Static JPEG/PNG file
- **Cache**: Standard browser caching (1 year)
- **Optimization**: Automatic via Next.js Image Optimization API

**Next.js Image Optimization Endpoint**: `/_next/image`

- **Method**: GET
- **Query Parameters**:
  - `url`: Source image path (e.g., `/assets/profile.jpg`)
  - `w`: Width in pixels (e.g., `128`, `192`, `224`)
  - `q`: Quality percentage (default: `85`)
- **Response**: Optimized image (WebP, AVIF, or fallback format)
- **Cache**: Handled by Next.js automatically

These endpoints are provided by Next.js framework and require no custom implementation or contract definition.

## Component Interface

If you need the component props "contract", see [data-model.md](../data-model.md) for the `HeroImageConfig` interface.

## Future Considerations

If this feature evolves to include:

- Image upload functionality
- Dynamic profile picture selection
- Integration with external avatar services (Gravatar, etc.)

Then API contracts would be defined here with OpenAPI/Swagger specifications.
