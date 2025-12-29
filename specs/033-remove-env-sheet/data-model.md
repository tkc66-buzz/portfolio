# Data Model: Remove Env/Spreadsheet Private Content

**Feature**: `033-remove-env-sheet`  
**Date**: 2025-12-29  

## Summary

This change **removes** an optional sourcing path. The portfolio data model stays the same, but the runtime “private patch” source is eliminated.

## Entities

- **Portfolio**: unchanged
- **PortfolioPatch (private override)**: removed as a supported runtime concept

## State / Transitions

- `getPortfolio()` no longer branches on configuration; it always returns committed content.

## Validation Rules

- Portfolio normalization/validation can remain only if it still adds value for committed content.

