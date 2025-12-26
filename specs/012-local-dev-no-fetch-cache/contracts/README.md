# Contracts: Private Portfolio Patch Endpoint (Experience data source)

**Feature**: `specs/012-local-dev-no-fetch-cache/spec.md`  
**Date**: 2025-12-26

## Purpose

Define the expectations for the external “Experience data source” endpoint used to load private
portfolio overrides (including Experience and Projects) without committing private content.

This contract is intentionally lightweight: it documents *what* the endpoint must do, not the
implementation.

## Endpoint behavior

- **Request**:
  - The system initiates a request to an “execute” URL.
  - The execute request is a **POST** with a JSON body.
  - A bearer token may be provided (e.g., for private spreadsheets); transport details are an implementation choice.

- **Redirects**:
  - The execute endpoint may respond with redirects to a content URL.
  - The client follows redirects with **GET** to retrieve the final JSON content.

- **Response**:
  - Final response must be **JSON**.
  - Shape is a **partial portfolio patch** (only the fields that need overriding).
  - If the response is invalid or cannot be fetched within a timeout, the site must fall back to public content.

## Example patch scope (non-exhaustive)

- `experience`: heading + timeline items
- `projects`: items that are used by Experience’s “Evidence” linking

## Non-goals

- This contract does not define cache headers.
- This contract does not require a particular hosting provider or spreadsheet mechanism.

