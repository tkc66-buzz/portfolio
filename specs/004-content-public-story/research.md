# Research: Phase 2 Content – Public Storytelling

## Decision 1: Public-safe proof set for Experience/Projects

- **Decision**: Use a “proof set” that avoids identifiers but keeps evidence:
  - Scope (traffic, scale, team size) as ranges (e.g., “daily active users: 7-figure range”) ONLY if approved; otherwise qualitative.
  - Role + responsibilities (what you owned).
  - Outcome/learning framed as capability (e.g., “reduced operational toil”, “improved release confidence”).
- **Rationale**: Preserves NDA/privacy while still demonstrating seniority and impact.
- **Alternatives considered**:
  - Full disclosure with names/numbers → rejected (privacy/NDA risk).
  - Vague claims without evidence → rejected (weak credibility).

## Decision 2: Quantitative impact when numbers are sensitive

- **Decision**: Prefer one of:
  - Exact numbers when public/approved.
  - Ranges (“~”, “approx.” avoided on page; use “X–Y” bands).
  - Proxy metrics (latency p95 improvement, incident count, lead time).
  - “Before/after” with relative terms (“significantly”, “materially”) ONLY if accompanied by mechanism (what changed).
- **Rationale**: Keeps statements defensible and non-hand-wavy.
- **Alternatives considered**:
  - Always show exact numbers → rejected (often sensitive).
  - Always avoid metrics → rejected (reduces proof).

## Decision 3: Contact CTA shape

- **Decision**: Provide a short list of “good inbound” examples (3–5 bullets) and a response-time expectation.
- **Rationale**: Reduces friction, increases qualified inbound.
- **Alternatives considered**:
  - Generic “お気軽に” only → rejected (low intent, unclear).

## Public-proof writing checklist (NDA-safe)

Use this checklist when editing `src/content/portfolio.ts` (Experience/Projects/Contact):

- **No identifiers**: avoid internal project names, private URLs, customer names, unreleased features.
- **Evidence over adjectives**: replace “頑張った/改善した” with mechanism + outcome.
- **Impact without leakage**: prefer safe bands (`X–Y`) or proxy metrics (p95 latency, incident count, lead time).
- **Role clarity**: state what you owned (design / implementation / ops / leadership).
- **Scan-first**: each project must communicate `role + tech + outcome` in one card.
- **Private items**: show only safe meta + “話せる範囲” guidance; never include sensitive details.
