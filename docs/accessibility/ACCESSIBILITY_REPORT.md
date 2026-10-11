# Accessibility Report — Kortfolio

Target: **WCAG 2.2 AA**. Audited with axe-core **4.12.1** via `agent-browser
a11y`, both themes, on the settled page (all deferred sections mounted).

## Result

| Snapshot | Light | Dark |
| --- | --- | --- |
| Live baseline (pre-change) | 14 violations | 64 violations |
| Local baseline (pre-change) | 25 (all sections mounted) | 16 |
| **After fixes — desktop 1280** | **0 violations** | **0 violations** |
| **After fixes — mobile 390** | **0 violations** | — |
| **After fixes — ArchitectureLab tabs** (AMR / SolarEdge / PocketBody / Bawo) | **0** each | **0** each |

`counts` after fix: `{ violations: 0, passes: 45, incomplete: 1 (52 nodes),
inapplicable: 44 }`.

> The single `incomplete` rule is `color-contrast` on elements whose background
> axe cannot resolve (CSS gradient / translucent backdrop-blur navbar). It is a
> *manual-review* bucket, not a failure. The affected elements are the brand
> wordmark, hero heading (gradient `bg-clip-text`), and the active nav link over
> the `bg-background/85 backdrop-blur` header. Manual check: the header compos-
> ites to ≈ `#f7f6f2` (light) / near-`#090b10` (dark), and the foregrounds used
> there (`text-foreground`, `text-accent`, and the darkened accent token) all
> exceed 4.5:1 against those values. See "Token math" below.

## Root causes and fixes

### 1. Secondary accent tokens failed as 12 px chip text
Pattern `bg-<token>/10 text-<token>` (24+ occurrences: eyebrow chips, skill
tags, filter tabs, contact pills) measured **4.13–4.42:1** on `--surface-2`.
The default emerald (`#047857`) was the most common offender (4.41:1).

**Fix** — darkened the light-theme accent tokens one step, chosen so that the
`/10` **and** `/20` (hover) tints clear 4.5:1 on *every* light surface
(`--background #f7f6f2`, `--surface #ffffff`, `--surface-2 #f0eee8`):

| Token | Before | After | Worst-case `/20` contrast |
| --- | --- | --- | --- |
| `--accent` | `#047857` (emerald-700) | `#046345` | 4.63:1 |
| `--teal` | `#0f766e` (teal-700) | `#115e59` (teal-800) | 4.80:1 |
| `--violet` | `#7c3aed` (violet-600) | `#6a24cf` | 4.71:1 |
| `--info` | `#0369a1` (sky-700) | `#075985` (sky-800) | 4.77:1 |
| `--warn` | `#b45309` (amber-700) | `#92400e` (amber-800) | — (plain text) |

Dark-theme `--faint` was also raised: `#64748b` (3.87:1) → `#7d8fa6`.

### 2. Active filter tab was dark-on-dark
`SkillMatrix` active category tab used `bg-teal text-slate-950` →
`#020617` on `#115e59` = **2.65:1**. Fix: `text-background`, which resolves to
the near-white/near-black theme background and therefore contrasts against the
token in **both** themes.

### 3. LinkedIn pills failed at 4.43:1
`text-[#0a66c2]` on the `#0077b5` tint (`#d5e6ed`) = **4.43:1**. Fixed in all
three locations (`Hero`, `Navbar`, `ContactSection`): `#0a66c2` → `#0a5aa8`
(**5.38:1**). Dark variant (`dark:text-[#38bdf8]`) unchanged.

### 4. `opacity-50` on inactive panels halved text contrast
`ArchitectureLab` inactive pipeline-stage panels used `bg-black/30 … opacity-50`,
which composites the whole card to 50 % and dragged all inner text below AA in
both themes. Fix: removed `opacity-50`, used `bg-black/20` + `border-white/5`
to retain the "inactive" affordance without dimming the text. Inner
`text-slate-600` placeholders → `text-slate-400`. Same `text-slate-600` fix in
`PhotographyGallery` (lightbox separators) and `InteractiveTerminal`.

### 5. Sub-12 px type
Raised all `text-[10px]` / `text-[11px]` to `text-xs` (12 px) in
`ImpactMetrics`, `ArchitectureLab`, `PhotographyGallery`, `ClientsMarquee`,
`Navbar`.

## Interaction & semantics fixes

- **Project preview** — was `<div onClick>` (not focusable, not announced).
  Now a `<button type="button" aria-label="Open {title} … screenshots">`.
  10 real keyboard-reachable buttons verified in the DOM; decoding image has
  `alt=""` (decorative, container is labelled).
- **Nested interactive check** — 0 `a button` / `button button` / `a a`
  / `button a` combinations.
- **Images** — `loading="lazy" decoding="async"` added to marquee logos, modal
  thumbnails, and project previews; `decoding="async"` on the modal hero image;
  hero portrait `fetchPriority="high" decoding="async"`.
- Removed `opacity-60` from filter count badges (`ProjectsSection`) and
  `text-accent/80` → `text-accent` in `Hero` / `ImpactMetrics` / `Footer` badge.

## Token math (representative, sRGB, WCAG 2.x)

| Foreground | Background | Ratio |
| --- | --- | --- |
| `#046345` | `#000000`-blend `accent/10` on `#f0eee8` | 5.62:1 |
| `#046345` | `#ffffff` | 6.51:1 |
| `#115e59` | `#d5e6ed` (teal/20 on white) | 4.80:1 |
| `#020617`-equivalent `text-background` | `#115e59` | ≈ 9:1 |
| `#0a5aa8` | `#d5e6ed` | 5.38:1 |
| white `.text-white` | `#115e59` | ≈ 10:1 |

### 6. Non-default lab tabs (found by tab-by-tab audit)
Because ArchitectureLab renders only the active simulator's DOM, a normal page
audit misses the other three tabs. Clicking through them surfaced:

- **Solar Edge Vision** — the two `<input type="range">` sliders had **no
  accessible name**. Added `aria-label="Solar battery charge level"` and
  `aria-label="CLIP similarity purge threshold"`.
- **Bawo Traditional Game** — 22 × `text-amber-700` (#bb4d00) pit-index numbers
  on the near-black board (#0b0806) = **3.96:1**. Changed to `text-amber-400`.
- **Pocket Body Motion** — clean.

All four tabs now report 0 violations.

### Transient mid-animation false positive (documented, not a real defect)
A one-off dark-theme reading flagged the Navbar scroll-spy label
(`text-accent/90`) at 1.59:1. That sample was taken mid-flight during the
`AnimatePresence` fade-in (text transitions `opacity 0 → 1` over 180 ms), so axe
measured the label at ~10 % opacity. A settled re-audit of the same element
reports **0**, and an independent computed-style check confirms the rendered
colour is light emerald (`.oklab(0.77 -0.15 0.04 / 0.9)`) on `#090b10` — high
contrast. Real users never see a failing state; it only appears if an automated
audit samples during the entrance animation. `prefers-reduced-motion` removes
the animation entirely.

## Remaining / recommended

- **Focus-visible** styling relies on the global `:focus-visible` outline in
  `index.css`; verify on the new preview `<button>` and on high-contrast OS
  themes.
- **`prefers-reduced-motion`** — **handled**: the eager entrance animations are
  CSS keyframes/transitions neutralised by the `@media (prefers-reduced-motion:
  reduce)` block in `index.css`, and the below-fold Framer-Motion sections each
  wrap themselves in a local `MotionConfig reducedMotion="user"`.
- **Mobile 390 px** — **verified**: `agent-browser set viewport 390 844` then
  axe → 0 violations, and `scrollWidth − clientWidth = 0` (no horizontal
  overflow).
