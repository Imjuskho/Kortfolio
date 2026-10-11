# Design Review — Kortfolio

## Verdict

Distinctive and intentional. The paper/ink palette with emerald accents and a
technical-mono voice reads as a systems person's portfolio, not a UI kit.

## System

- **Tokens** are semantic (`--background`, `--surface`, `--surface-2`,
  `--foreground`, `--muted`, `--faint`, `--accent`, `--warn`, `--info`,
  `--violet`, `--teal`, `--border`), themed light/dark via `.dark`. This is the
  right approach and made the AA fix a handful of token edits rather than 24
  component edits.
- **Type** — a mono/sans pairing; a 12 px floor was enforced across the UI.
- **Motion** — Framer Motion for entrance reveals; tasteful, but see the
  reduced-motion recommendation.

## Changes made

- Accent tokens darkened so `/10` + `/20` tints meet AA in light mode (see
  Accessibility report) — a subtle, low-risk hue shift that preserves the
  identity.
- Inactive lab stages no longer dim their own text; state is expressed through
  surface/border instead.
- LinkedIn pill text darkened to a readable brand-blue derivative.

## Recommendations

1. Formalise the token scale in a short `docs/design/TOKENS.md` (values +
   intended contrast) so future hires don't reintroduce failing tints.
2. Document the gradient hero text as *decorative-large* (3:1 not required, but
   confirm it isn't carrying essential info).
3. Consider a documented spacing/radius scale; the current tailwind utilities
   are consistent but implicit.
