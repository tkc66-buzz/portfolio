# Quickstart: Achievement Unlocked toast (Activities)

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm install
pnpm dev --port 3000
```

Open `http://localhost:3000` and scroll down to **Activities**.

## Verify behavior

- First time Activities enters the viewport, a toast appears once.
- Scrolling away and back does **not** show it again (same tab/session).
- Close button dismisses it immediately.
- After closing, it does **not** re-appear when you re-enter Activities.

## Reduced motion

- Enable “Reduce motion” in OS settings (or browser devtools emulation).
- Reload and scroll into Activities:
  - Toast appears without flashy animation (static).

## Quality gates

```bash
pnpm lint
pnpm build
```
