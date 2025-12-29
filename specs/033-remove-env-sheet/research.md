# Research: Remove Env/Spreadsheet Private Content

**Feature**: `033-remove-env-sheet`  
**Date**: 2025-12-29  

## Decision: Remove env-var “private override” mode entirely

- **Decision**: Delete the `PORTFOLIO_PRIVATE_SOURCE` / `PORTFOLIO_PRIVATE_JSON` behavior and any related fallback/warning logic.
- **Rationale**:
  - The feature is no longer used; keeping it adds maintenance and documentation burden.
  - “Hidden” configuration paths increase risk of inconsistent renders across environments.
  - Simplifies server rendering and reduces failure modes.
- **Alternatives considered**:
  - **Keep but hide** (leave code, remove docs): still leaves a footgun and dead code.
  - **Keep env only** (remove spreadsheet only): does not meet the user request (“env vars also not used”).

## Decision: Remove spreadsheet/App Script artifacts from repo

- **Decision**: Delete spreadsheet/App Script related artifacts that exist solely to support the removed private content workflow.
- **Rationale**: Keeps the repo lightweight and avoids confusion for maintainers.
- **Alternatives considered**:
  - **Archive in specs/**: would still keep references around, which conflicts with “remove references”.

## Decision: Docs sync is required

- **Decision**: Update `README.md`, `AGENTS.md`, and `CLAUDE.md` to remove all mentions of env/spreadsheet sourcing.
- **Rationale**: Constitution principle V (docs kept in sync) and prevents future misuse.

