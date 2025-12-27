# Quickstart: 018 – Activities: Achievements (Awards)

## Goal

Add awards/achievements under the existing Activities section, using the same list UI and item schema.

## 1) Add content

Edit `src/content/portfolio.ts` and add an `Achievements` group (or items within it) under `publicPortfolio.activities.groups`.

## 2) Verify behavior

1. Run `pnpm dev`.
2. Open the site and scroll to `#activities`.
3. Confirm:
   - The group header `Achievements` is visible.
   - Items show `year` + `title` (and optional `context`).
   - If `link.href` is external (`http(s)`), it opens in a new tab and does not send a referrer (`rel="noreferrer"`).
   - If the group has zero items, the UI shows “Coming soon”.

## 3) Optional: private override

If you want to keep achievements private, override via `PORTFOLIO_PRIVATE_JSON` / `PORTFOLIO_PRIVATE_URL` using the contract in `specs/018-activities-achievements/contracts/README.md`.


