# Contracts: Hero/Profile 역할 분리

This feature does not introduce network APIs. The “contract” is content and IA behavior.

## Content Contract

- **Hero**: Must remain concise and focused on identity/role + primary CTA (START).
- **Profile**: Must add additional context not already stated in Hero.
- **No duplication**: No verbatim repeated sentences between Hero and Profile.

## Copy Ownership (to avoid future regressions)

- **Hero copy** lives in `src/components/Hero.tsx` and should stay “one-screen scannable”.
- **Profile copy** lives in `src/content/portfolio.ts` (`publicPortfolio.profile.body`) and can be longer narrative context.
- When updating Profile content, avoid pasting the same sentence into Hero; keep Hero as a short lede + CTA.


