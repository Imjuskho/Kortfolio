# Performance Report — Kortfolio

## Headline

| Metric | Before | After |
| --- | --- | --- |
| `public/assets` on disk | **49 MB** | **6.3 MB** (−87 %) |
| `dist/` output | **56 MB** | **9.3 MB** (−83 %) |
| Hero portrait `kondwani.webp` | 122 KB (1000²) | **53 KB** (900²) |
| Main JS (`index-*.js`) | 468 KB raw / 147 KB gz | 468 KB raw / 148 KB gz (unchanged — see below) |
| CSS (`index-*.css`) | 80 KB raw / 13 KB gz | 80 KB raw / 13 KB gz |

## Lighthouse (mobile emulation, median of 3 runs)

Run against the local production build (`vite preview`), Lighthouse 12,
default mobile throttling (Moto G Power / slow 4G), `--headless=new`.

| Category | Score |
| --- | --- |
| Performance | **86** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

| Metric | Median |
| --- | --- |
| FCP | 3.0 s |
| LCP | 3.04 s |
| TBT | 0 ms |
| CLS | 0.000 |
| Speed Index | ~5.9 s |
| Total byte weight | 257 KiB |
| Unused JS (est.) | 60 KiB |

> **Why LCP ≈ FCP ≈ 3.0 s.** This is a client-rendered SPA: nothing paints until
> the main bundle parses and React renders. Under Lighthouse's mobile CPU/network
> throttle that is ~3 s. TBT is 0 and CLS is 0, and the mobile LCP *element* is
> the hero **paragraph** (not the image), i.e. the metric is gated by JS boot, not
> by image weight. This is the documented trade-off of the architecture.

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
- `prefers-reduced-motion` fully honoured: `MotionConfig reducedMotion="user"`
  (App.tsx) **and** a CSS `@media (prefers-reduced-motion: reduce)` block that
  neutralises marquee/transitions/scroll-behavior (index.css).

## Recommended next (to move LCP under 2.5 s)

1. **Prerender / static shell** for the hero so first paint doesn't wait on JS.
   This is the single highest-leverage change for LCP. (Not implemented — it is
   an architectural change with SSR/prerender tooling.)
2. **Trim main JS.** 147 KB gz is Framer Motion. `LazyMotion`+`m` was trialled
   and measured **no** improvement (layout/layoutId force the full `domMax`
   feature set), so it was reverted rather than left as churn. A real reduction
   requires removing framer-motion from all above-the-fold components (CSS
   reveals for Hero/ImpactMetrics/ClientsMarquee and refactoring the Navbar
   scroll rail + ProjectsSection layout grid).
3. **Self-host / preload fonts** (Google Fonts stylesheet is render-blocking).
4. **Fix `sw.js` cache header** at the edge (currently `max-age=604800` despite
   `.htaccess` `no-cache`; note `.htaccess` now applies immutable caching to
   hashed assets and explicit no-cache to `sw.js`, but the host/edge must honour
   it — see Security report).

### Verified vs. measured

- CLS 0 is confirmed both by Lighthouse and by a `PerformanceObserver`
  (`layout-shift`, buffered) over a full scroll. An earlier 0.58 reading was a
  measurement artifact from toggling the theme and reloading inside the audit
  loop.
