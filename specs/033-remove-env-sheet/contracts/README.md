# Contracts: Remove Env/Spreadsheet Private Content

**Feature**: `033-remove-env-sheet`  
**Date**: 2025-12-29  

No API contracts. This feature is a refactor/removal of internal content sourcing and documentation references.

## Internal Contract

- `getPortfolio(): Promise<Portfolio>` remains available and stable for callers.
- Portfolio rendering MUST NOT depend on env vars or spreadsheets.

