# Quickstart: 006 – Activities (Talks / Books / Community)

## Goal

Verify that Activities is discoverable, scannable, and safe (external links).

## Setup

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification checklist

1. **TOC navigation**
   - Click TOC item `Activities` and confirm it scrolls to `#activities`.
2. **Content**
   - Confirm `Talks / Books / Community` group headings render.
   - If any group has 0 items, ensure an explicit empty state is shown.
3. **Link safety**
   - Any external links open in a new tab and include `rel="noreferrer"`.
4. **Quality gates**
   - `pnpm lint`
   - `pnpm build`


