# Performance Report — Kortfolio

## Headline

| Metric | Before | After |
| --- | --- | --- |
| `public/assets` on disk | **49 MB** | **6.3 MB** (−87 %) |
| `dist/` output | **56 MB** | **9.3 MB** (−83 %) |
| Main JS (`index-*.js`) | 468 KB raw / 147 KB gz | 468 KB raw / 147 KB gz (unchanged — see below) |
| CSS (`index-*.css`) | 80 KB raw / 13 KB gz | 80 KB raw / 13 KB gz |

## Lab metrics (local `vite preview`, warm cache, Lab only)

| Metric | Value |
| --- | --- |
| FCP | ~60 ms |
| LCP | ~1072 ms |
| CLS | **0.00** (0 layout-shift entries across a full scroll) |

> These are **lab** numbers on localhost with a warm cache and are *not*
> representative of field/CrUX. The CLS check was done with `PerformanceObserver`
> (`layout-shift`, `buffered: true`) over a load that scrolls to the bottom
> (mounting all deferred sections) and back. An earlier reading of 0.58 was a
> **measurement artifact** caused by toggling the theme and reloading inside the
> audit loop; a clean load reports zero shifts. Treat CLS 0 as "no obvious
> layout-shift sources", pending real-device confirmation.

## What changed

### Images (the dominant win)
New script `scripts/optimize-images.sh` (idempotent, `cwebp` + ImageMagick):

1. **Photos** `photo_*.jpg` → max 2000 px, q82, **written to temp then `mv`**
   (ImageMagick's in-place write silently inflates JPEG size ~2×).
2. **Project shots** `*.jpg` → max 1600 px, q82.
3. **Device mockups** (6 PNGs) → WebP q90 @1600 px: `bawo_glass`, `ipad-home`,
   `ipad-malawi`, `iphone-kiswahili`, `iphone-kujifunza`, `iphone-malawi`.
4. **Profile** `kondwani.png` → `kondwani.webp` (q90, 1000 px); removed the
   `.png` and an unused `.jpg`.
5. **Deleted dead assets**: `ipad-kiswahili.png`, `iphone-home.png`.

`src/data/portfolioData.ts` updated: 6 project image refs `.png` → `.webp`.

WebP outputs verified valid; originals were already opaque (no alpha loss).

### Image loading behaviour
- `loading="lazy" decoding="async"` on marquee logos, project previews, and
  modal thumbnails (all below the fold).
- Modal hero image `decoding="async"`; hero portrait `fetchPriority="high"`
  (above-the-fold LCP candidate) + `decoding="async"`.
- Hero portrait and navbar avatar now point at `kondwani.webp`.

## Not yet done (recommended, high value)

1. **Main bundle 147 KB gz is Framer Motion.** Consider `MotionConfig`-driven
   tree-shaking, replacing simple entrance fades with CSS, or lazy-loading the
   heaviest motion sections. Biggest remaining JS cost.
2. **Preload the LCP image.** Add `<link rel="preload" as="image"
   href="…/kondwani.webp" fetchpriority="high">` in `index.html` so the hero
   image is fetched during HTML parse rather than after the JS bundle.
3. **`sw.js` cache header.** Live `sw.js` is served `max-age=604800` on
   Hostinger's hcdn despite `.htaccess` `no-cache`; this can pin clients to a
   stale service worker. Needs a host-level header rule (edge config), not a
   code change.
4. **Lighthouse** is not installed in this environment, so the ≥3-run median
   protocol could not be executed. Budget/field data should be collected with
   the host's analytics or PageSpeed Insights.
