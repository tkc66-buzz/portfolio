# Contracts: Work Content Writing

This feature is content-only and introduces no network APIs. The “contract” is the
expected structure and privacy rules for Work copy.

## Content Contract

- Each WorkEntry summary is exactly one paragraph and includes:
  - role/context, and
  - either outcome/impact (qualitative) or learning.
- Each Project includes:
  - one-line summary,
  - role,
  - tech,
  - outcome/learning (qualitative; no numeric metrics).

## Privacy Contract

- Company/product names are anonymized labels (no real names).
- No confidential identifiers (internal system names, private URLs, customer names).
- No numerical impact metrics (even approximate/rounded).

## “No numerical metrics” guardrails (examples)

Avoid any quantitative impact statements, including approximate/rounded forms:

- Percentages: “-30%”, “2x”, “99.9%”, “top 1%”
- Latency/throughput: “p95 200ms”, “10k rps”, “TPS”
- Counts: “1M users”, “~500k”, “thousands/day”
- Money: “¥X”, “$X”, “revenue”, “cost reduced by …”
- Time saved as a number: “saved 3 hours/day”

Allowed:

- Display-only periods like “2019–2025”
- Qualitative impact phrasing (e.g., “reduced on-call toil”, “made changes safer to ship”, “improved signal-to-noise”)

## Editing guidance (what goes where)

- **WorkEntry.summary** (one paragraph, no line breaks):
  - Context (what kind of environment/problem)
  - Your role/scope
  - Outcome/learning (qualitative; no numbers)
- **Project.summary** (one sentence, no line breaks):
  - “What you did” in concrete terms
- **Project.outcomeOrLearning** (1–2 sentences, no numbers):
  - Tradeoffs, constraints, what improved, what you learned


