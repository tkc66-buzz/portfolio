# Data Model: Phase 2 Content – Public Storytelling

## Overview

This feature is content-focused. It primarily updates text and presentation while preserving:

- server-side private overrides (`PORTFOLIO_PRIVATE_*`)
- redaction behavior for `Project.visibility="private"`

## Entities

### Portfolio (existing)

- **profile**: unchanged
- **experience**: may be enriched but must remain backward compatible
- **projects**: unchanged shape, content updated
- **skills**: unchanged for this feature
- **contact**: copy/CTA updated

### Experience (current)

```ts
type ExperienceHighlight = { year: string; text: string };
type Experience = SectionContent & { highlights: ExperienceHighlight[] };
```

**Notes**

- If richer “timeframe/role” is desired later, add optional fields (not required for this feature).

### Project (current)

```ts
type Project = {
  visibility?: "public" | "private";
  title: string;
  summary: string;
  role: string;
  tech: string[];
  outcomeOrLearning: string;
  link?: ExternalLink;
  status?: string;
};
```

**Validation / Rules**

- For public projects, all proof fields should be present.
- For private projects, the UI must redact sensitive fields (already implemented).

### Contact (current)

```ts
type Contact = SectionContent & { blurb: string; links: ExternalLink[] };
```

**Rules**

- `blurb` should include CTA examples (what to contact about) and response expectation.
