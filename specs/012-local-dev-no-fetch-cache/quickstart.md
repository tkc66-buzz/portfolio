# Quickstart: Verify “always fresh Experience” in local development

## Goal

In **local development only**, after you edit the Experience spreadsheet (data source), a normal browser
reload should show the updated Experience content immediately—without server restarts, incognito, or hard reloads.

Production behavior must remain unchanged.

## Prerequisites

- You already have a working private content endpoint (spreadsheet-backed) that returns a portfolio patch JSON.
- Local environment variables are set so the app loads private content from that endpoint.

## Steps (local dev)

1. Start the app:

   - `pnpm dev`

2. Load the page and note the current Experience content.

3. Edit the Experience spreadsheet (e.g., change a timeline item text).

4. Reload the page normally.

5. Confirm the Experience section reflects the edit on that reload.

## Safety check (production-like)

1. Run:

   - `pnpm build`
   - `pnpm start`

2. Confirm the site still follows the existing production freshness policy (it should not be forced into “always fresh” mode by this feature).

## Troubleshooting

- If you edit Apps Script code (not the spreadsheet data), ensure the Web App is redeployed; otherwise it may serve older code.

