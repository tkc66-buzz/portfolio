# Quickstart: Work RPG UI

## Prerequisites

- Node.js 20+ / pnpm

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm install
pnpm dev --port 3000
```

Open `http://localhost:3000` and scroll to **Work**.

## Verify behavior

- Work looks clearly different from other sections (RPG status + quest log vibe).
- You can select a quest (project) and see its details update.
- Focus is visible when using keyboard navigation (Tab/Shift+Tab/Enter/Space).
- Existing Famicom palette still looks consistent (no “sudden vivid theme” regression).

## Reduced motion

- Enable “Reduce motion” in OS settings (or browser devtools emulation).
- Reload and confirm major animations in Work are disabled (should still look good).

## Quality gates

```bash
pnpm lint
pnpm build
```


