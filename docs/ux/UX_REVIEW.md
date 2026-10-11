# UX Review — Kortfolio

## Verdict

Coherent, authored, and clearly *not* a template. The information architecture
and progressive disclosure match the goal of presenting a senior engineer.

## Information architecture

Nav → Hero → ImpactMetrics → Projects → ArchitecturalJourney → ArchitectureLab
→ SkillMatrix → Photography → Clients → Contact. This is a good narrative:
claim (hero) → proof (metrics, projects) → depth (journey, lab) → breadth
(skills) → personality (photography) → trust (clients) → conversion (contact).

## What works

- **Deferred loading** (`Deferred` + IntersectionObserver) keeps first paint
  cheap without making sections feel stubbed.
- **ArchitectureLab** is the differentiator — interactive, on-brand, and gives a
  reason to linger beyond a static résumé.
- **Theme toggle** persists and defaults to light (good for first impressions
  and daylight use).
- Contact routes (email copy, LinkedIn, etc.) are present near the fold in the
  navbar and again at the bottom.

## Issues found and addressed

- Project preview was a non-semantic clickable `<div>` → now a focusable,
  announced `<button>`. Fixes both keyboard UX and screen-reader UX.
- Filter count badges were dimmed (`opacity-60`) for no semantic reason → full
  opacity.
- "Inactive" lab stages dimmed their *text* via `opacity-50` → now distinguished
  by surface/border only, so state is still legible.

## Recommendations (not done)

1. **`prefers-reduced-motion`** — entrance animations should be suppressible.
   Add `MotionConfig reducedMotion="user"` (or a media guard).
2. **First-focus after modal open** already moves into the modal; confirm a
   visible focus ring on the new preview button and a clean focus return on
   close (services exist: `useDialogA11y`).
3. **Contact redundancy** — three "get in touch" affordances; consider whether
   the navbar CTA should collapse on small screens.
4. **Empty search state** in SkillMatrix — confirm a friendly message when the
   query matches nothing (not verified in this pass).
