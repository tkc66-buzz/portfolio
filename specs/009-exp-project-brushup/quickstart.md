# Quickstart: Validate Experience & Projects refinement

## Prerequisites

- Node.js >= 20.9
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` and verify:

1. **Experience** reads as a timeline of role/ownership evolution (not a project list).
2. **Projects** reads as evidence/case cards (problem → action → result/learning).
3. **Private projects** remain redacted (no sensitive details).
4. Reader can scan Experience + Projects in **under ~2 minutes**.

## Quality gates

```bash
pnpm lint
pnpm build
```


