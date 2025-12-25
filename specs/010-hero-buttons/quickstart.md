# Quickstart: Verify Hero Start/Continue

## Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and verify:

1. **Start** jumps to `#profile`.
2. **Continue**:
   - first visit (no stored hash) → jumps to `#experience`
   - after clicking a TOC item (e.g., `#projects`) → jumps back to that hash
3. The site does not break if localStorage is blocked (Continue still navigates to fallback).

## Quality gates

```bash
pnpm lint
pnpm build
```


