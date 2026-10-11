# Content Review — Kortfolio

## Verdict

Confident, specific, and free of filler. The voice is consistent across hero,
project descriptions, and the lab copy.

## Strengths

- Concrete claims ("a decade of production systems for donors, fintech, and edge
  AI") rather than adjectives.
- Project names and locales are specific (Bawo, Zisamale, Mwayi Grid, Lilongwe,
  Malawi) — lends credibility.
- Metadata (`title`, `description`, OG, JSON-LD `Person`) is written for humans
  *and* machines.

## Checks

- **Name/brand consistency**: "Kondwani Austin Phanga" is spelled consistently
  in `<title>`, JSON-LD, and meta. (Manually scan project copy for any
  variant spellings.)
- **Contact truth**: email in JSON-LD is `hello@bambamdev.com`; the UI copies
  `kayphanga@gmail.com`. *Recommend aligning or intentionally documenting both.*
- **Dates/claims**: no obvious stale dates in copy; impact numbers depend on
  `portfolioData.ts` and should be reviewed by the owner for accuracy.

## Recommendations

1. Resolve the two-email discrepancy (JSON-LD vs UI copy).
2. Add `alt`/captions where imagery carries meaning (photography captions exist;
   project screenshots are decorative-labelled — acceptable).
3. Add a brief, human "what I'm looking for" line near the contact section to
   convert more deliberately.
4. Keep the Skills search placeholder (`Search tools, languages, infra...`)
   aligned with reality if the taxonomy changes.
