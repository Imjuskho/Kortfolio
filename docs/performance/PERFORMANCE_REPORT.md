# Performance Report — Kortfolio

## Headline

| Metric | Before | After |
| --- | --- | --- |
| `public/assets` on disk | **49 MB** | **6.3 MB** (−87 %) |
| `dist/` output | **56 MB** | **9.3 MB** (−83 %) |
| Hero portrait `kondwani.webp` | 122 KB (1000²) | **53 KB** (900²) |
| Main JS (`index-*.js`) | 468 KB raw / 147 KB gz | **334 KB raw / 103 KB gz** (−30 % gz) |
| CSS (`index-*.css`) | 80 KB raw / 13 KB gz | 80 KB raw / 13 KB gz |

> **Main-bundle reduction.** Framer Motion (plus its `motion-dom`/`motion-utils`
> engine, ~515 KB of source, ~44 KB gz of the main chunk) was **removed from all
> eager components** (Hero, ImpactMetrics, ClientsMarquee, ProjectsSection,
> Navbar, and App's `MotionConfig`). Entrance reveals are now CSS keyframes /
> an IntersectionObserver `Reveal` component; the Navbar's scroll rail, sliding
> active pill, tagline swap, theme-icon spin and mobile sheet were reimplemented
> with plain DOM/CSS. The engine now lives in a shared chunk that only loads with
> the first below-the-fold lazy section (ArchitectureLab / Journey / SkillMatrix).

## Lighthouse (mobile emulation, median of 3 runs)

Run against the local production build (`vite preview`), Lighthouse 12,
default mobile throttling (Moto G Power / slow 4G), `--headless=new`.

| Category | Score |
| --- | --- |
| Performance | **88** (was 86) |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Metric | Median |
| --- | --- |
| FCP | 3.00 s |
| LCP | 3.00 s (was 3.04 s) |
| TBT | 0 ms |
| CLS | 0.000 |
| Speed Index | 3.67 s (was ~5.9 s) |
| Total byte weight | 211 KiB (was 257 KiB) |
| Unused JS (est.) | 36 B (was 60 KiB) |

> **Why LCP ≈ FCP ≈ 3.0 s.** This is a client-rendered SPA: nothing paints until
> the main bundle (now 103 KB gz) parses and React renders. Under Lighthouse's
> mobile CPU/network throttle that is ~3 s. TBT is 0 and CLS is 0. The LCP
> element is above-the-fold text (the navbar brand at first paint; the hero
> paragraph/headline once its entrance completes) — i.e. the metric is gated by
> JS boot, not by image weight or by the removed animation engine. This is the
> documented trade-off of the architecture.

## Lab metrics (local, warm cache)

FCP ≈ 60 ms · LCP ≈ 1072 ms (desktop) · CLS 0.00 · TTFB <1 ms. These are warm
localhost numbers and are **not** field data — the Lighthouse mobile run above is
the more meaningful figure.

## What changed

### Images (the dominant win)
`scripts/optimize-images.sh` (idempotent, `cwebp` + ImageMagick):

1. **Photos** `photo_*.jpg` → max 2000 px, q82, **written to temp then `mv`**
   (ImageMagick's in-place write silently inflates JPEG size ~2×).
2. **Project shots** `*.jpg` → max 1600 px, q82.
3. **Device mockups** (6 PNGs) → WebP q90 @1600 px.
4. **Profile** `kondwani.png` → `kondwani.webp` (900 px, q82, 53 KB); removed
   `.png`/`.jpg`.
5. **Deleted dead assets**: `ipad-kiswahili.png`, `iphone-home.png`.

`src/data/portfolioData.ts` updated: 6 project refs `.png` → `.webp`.

### Loading behaviour
- `loading="lazy" decoding="async"` on all below-fold images.
- Desktop hero portrait **preload**: `<link rel="preload" as="image"
  fetchpriority="high" media="(min-width: 1024px)">` — scoped to the desktop
  layout where the portrait is the largest paint.
- `prefers-reduced-motion` fully honoured: the **eager** entrance animations are
  CSS keyframes/transitions neutralised by the `@media (prefers-reduced-motion:
  reduce)` block (index.css); the **below-fold lazy sections** (which still use
  Framer Motion) each wrap themselves in a local `MotionConfig
  reducedMotion="user"`.

### Animation engine out of the main bundle (new)
- Hero entrance (mount-time fade/slide/zoom) → CSS keyframes (`animate-rise*`).
- ImpactMetrics / ClientsMarquee / ProjectsSection headers & cards → an
  IntersectionObserver-based `Reveal` component (`src/components/Reveal.tsx`)
  toggling `.reveal-visible` (no framer-motion dependency).
- ProjectsSection grid → plain keyed `div`s with an `animate-card-in` keyframe
  (filter reordering is instant; no FLIP layout pass).
- Navbar → scroll listener + rAF drives the progress rail (`scaleX` via CSS
  transition instead of `useScroll`/`useSpring`); the sliding active pill is a
  single absolutely-positioned span whose `left`/`width` come from a measured
  ref (CSS transition instead of `layoutId`); tagline/theme-icon/mobile-sheet use
  small CSS animations instead of `AnimatePresence`.

## Recommended next (to move LCP under 2.5 s)

1. **Prerender / static hero shell** so first paint doesn't wait on JS. This is
   now the single highest-leverage change left: the main bundle is 103 KB gz and
   LCP is still ~3.0 s purely because the SPA paints after JS boot. (Not
   implemented — it is an architectural change with SSR/prerender tooling and
   hydration concerns for an animation-heavy client-rendered shell.)
2. **Self-host / preload fonts** (Google Fonts stylesheet is render-blocking).
3. **Fix `sw.js` cache header** at the edge (currently `max-age=604800` despite
   `.htaccess` `no-cache`; note `.htaccess` now applies immutable caching to
   hashed assets and explicit no-cache to `sw.js`, but the host/edge must honour
   it — see Security report).

### Verified vs. measured

- CLS 0 is confirmed both by Lighthouse and by a `PerformanceObserver`
  (`layout-shift`, buffered) over a full scroll. An earlier 0.58 reading was a
  measurement artifact from toggling the theme and reloading inside the audit
  loop.
