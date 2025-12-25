# Quickstart: Verify Sticky MENU

## Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and verify:

1. Scroll to the middle/bottom of the page → **MENU stays visible**.
2. Click any MENU button → jumps to the corresponding section.
3. Section headings are not hidden behind the sticky MENU after hash navigation.
4. Mobile width: MENU remains usable (wraps/scrolls as designed; not blocking content too much).

## Quality gates

```bash
pnpm lint
pnpm build
```
