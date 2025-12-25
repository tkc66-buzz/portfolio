# Quickstart: 005 – Writing / Blog Links

## Goal

Verify that the portfolio exposes blog links clearly and safely via a dedicated Writing section.

## Setup

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification checklist

1. **TOC navigation**
   - Click the TOC item `Writing` and confirm it scrolls to the Writing section.
2. **Links**
   - Confirm both links exist:
     - Tech blog (Medium): `https://medium.com/@buzz_tkc`
     - Casual blog: `https://sizu.me/buzz`
3. **Safety**
   - Links open in a new tab.
   - External links include `rel="noreferrer"`.
4. **Quality gates**
   - `pnpm lint`
   - `pnpm build`


