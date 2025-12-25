# Quickstart: Phase 2 Content – Public Storytelling

## Goal

Verify that the public portfolio reads as a coherent narrative (no placeholders) and remains safe with private overrides.

## Setup

```bash
cd /Users/takeshiwatanabe/EureWorks/private/git/portfolio
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification checklist

1. **Public-only reads well**
   - Temporarily disable private overrides (`PORTFOLIO_PRIVATE_SOURCE` unset) and refresh.
   - Confirm Experience/Projects/Contact are still coherent and not placeholder text.
2. **Private override does not break public**
   - Re-enable private overrides (`PORTFOLIO_PRIVATE_SOURCE=url` or `env`) and refresh.
   - Confirm the page renders without errors.
3. **Private project redaction**
   - Ensure at least one `visibility="private"` project exists in override.
   - Confirm sensitive fields are not shown on the public page.
4. **Quality gates**
   - Run `pnpm lint` and `pnpm build` successfully.

## Definition of Done (quick)

- Public-only (no private overrides) still reads as a complete narrative (no placeholder-ish copy).
- With private overrides enabled, the page still renders and private projects remain redacted.
- Contact includes explicit CTA examples + response expectation.
