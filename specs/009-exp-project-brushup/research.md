# Research: How to split Experience vs Projects (Portfolio IA)

## Decision 1: Split rule (Experience = axis, Projects = evidence)

**Decision**: Keep Experience and Projects as separate sections with a clear division of labor.

- **Experience** answers: “What responsibilities did you own, and how did your scope evolve?”
  - Axis: roles, domains, responsibilities, constraints, ways of working
  - Output form: timeline / highlights with short bullets
- **Projects** answers: “Show me proof—what did you ship, and what changed because of it?”
  - Evidence: concrete case studies with outcomes/learning
  - Output form: cards/list optimized for 30–60s scanning per item

**Rationale**:

- Reduces repetition: Experience stays high-level; Projects carry details.
- Increases credibility: Projects become “proof artifacts,” not a second timeline.
- Matches the constitution: “Personality-First Storytelling” + “Content is a product surface.”

**Alternatives considered**:

- **Merge into one section**: simpler navigation, but tends to become a wall of text and mixes axis/evidence.
- **Only Projects**: can work, but loses the multi-role narrative (ML/Data/Infra/Backend) you want to show.

## Decision 2: Canonical inclusion criteria (“which bucket?” rubric)

**Decision**: Use this rubric:

- Put in **Experience** when the primary value is **scope/ownership/role evolution**.
  - Examples: “introduced on-call,” “established observability,” “led migration design,” “platformized X”
- Put in **Projects** when the primary value is **a shippable artifact/case** with:
  - **Problem** (why it mattered)
  - **Actions** (what you did; tradeoffs)
  - **Result** (metric or qualitative impact) **or** **Learning** (if metrics can’t be shared)

**Rationale**:

- Helps avoid “project list” inside Experience and avoids “career timeline” inside Projects.

## Decision 3: Privacy + proof without leaking sensitive details

**Decision**: Keep `visibility: "public" | "private"` and treat private projects as:

- “Proof exists, but details are NDA-sensitive.”
- Show: title (generic), broad domain, your role category, and the fact you can discuss in interview.
- Hide: exact metrics, customer/company identifiers, internal architecture details, links.

**Rationale**:

- Keeps the section useful without putting sensitive information in the repo.

## Copy/structure suggestions (MVP)

### Experience (timeline)

- 3–6 rows max
- Each row: year/period + 1 sentence responsibility + 1 sentence proof pointer (implicit)

### Projects (case cards)

Each card should contain (public):

- **Title** (specific but safe)
- **One-line summary**
- **Role**
- **Tech**
- **Outcome / Learning**
- Optional link (public only)

## Open questions (to resolve in implementation)

- Do we want a “Project type” label (Platform / Backend / Infra / Data) for fast scanning?
- Do we need a “proof icon” or “badge” to visually link Experience → Projects?
