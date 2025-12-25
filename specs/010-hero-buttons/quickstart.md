# Quickstart: Verify Hero Start/Continue

## Run

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and verify:

1. **Start** jumps to `#experience`.
2. **Continue** warps to a random section (and avoids the section currently in view).
3. Repeated Continue clicks keep moving you around (no “stuck” behavior).

## Quality gates

```bash
pnpm lint
pnpm build
```


