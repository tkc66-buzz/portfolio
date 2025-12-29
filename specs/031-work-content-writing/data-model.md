# Data Model: Work Content Writing

## Entity: WorkEntry

Represents a company/organization block in the Work section.

### Fields (public-safe)

- **company**: string (anonymized label)
- **period**: string (display-only)
- **summary**: string (exactly one paragraph: role/context + outcome/learning)
- **projects**: list of Project
- **tech**: optional list of strings (high-level technologies)
- **links**: optional list of ExternalLink (public URLs only)

## Entity: Project

Represents a nested proof item under a WorkEntry.

### Fields (public-safe)

- **title**: string (public-safe)
- **summary**: string (one-line, concrete)
- **role**: string
- **tech**: list of strings
- **outcomeOrLearning**: string (concrete, qualitative; no numeric metrics)
- **asset/link**: optional (public-safe)


