# Data Model: Achievement Toast Close Polish

**Feature**: `035-achievement-toast-polish`  
**Date**: 2025-12-29  

## Summary

No new entities. This is a UI/interaction refinement on top of the existing session-scoped toast.

## State

- **Toast state** (existing): `hidden` → `showing` → `visible` → `closing`
- **Dismissed flag** (existing): session-scoped; currently removes the toast entirely

## Proposed refinement

- Keep the existing session keys, but treat “dismissed” as “toast panel dismissed” while allowing a lightweight “collected indicator” to remain visible.

## Invariants

- Reduced motion users should not receive animation-heavy transitions.
- The Activities layout should not have an empty spacer when toast is absent.

