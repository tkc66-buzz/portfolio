# Quickstart: Portfolio TOC + Section Granularity

## Goal

Verify that the landing page has a clear TOC and that each TOC item navigates to the
intended section reliably on desktop and mobile.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification checklist

1. The page shows a TOC near the top with these items:
   Profile / Experience / Projects / Skills / Contact
2. Clicking each TOC item scrolls to the corresponding section.
3. The section heading matches the TOC label intent (not ambiguous like “About”).
4. On mobile width, TOC remains readable and tappable without horizontal scrolling.
5. Keyboard navigation:
   - `Tab` can focus each TOC link
   - focused link is visually obvious

## Quality gates

```bash
pnpm lint
pnpm build
```
