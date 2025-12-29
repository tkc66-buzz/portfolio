# Quickstart: Remove Env/Spreadsheet Private Content

**Feature**: `033-remove-env-sheet`  
**Date**: 2025-12-29  

## Goal

Confirm the portfolio renders from committed content only, and the repo contains no remaining references to env-var/spreadsheet private content workflows.

## Run locally

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm dev
```

Open the site and confirm all sections render normally.

## Verification steps

### Content sourcing

- Ensure the site renders without setting any private/spreadsheet env vars.
- (Optional) Set old variables (if present on your machine) and confirm behavior is unchanged.

### Repo search (must be empty)

Search for:

- `PORTFOLIO_PRIVATE_SOURCE`
- `PORTFOLIO_PRIVATE_JSON`
- `spreadsheet`
- `Apps Script`

### Quality gates

```bash
pnpm lint
pnpm build
```

