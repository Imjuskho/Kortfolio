# SEO Report — Kortfolio

## Status: strong

`index.html` already carries a complete, well-formed head. No changes were
required for the core tags.

### Present and correct

- `<title>` and meta `description` — descriptive, keyword-aware, human.
- `canonical` → `https://bambamdev.com/kortfolio/`.
- `<meta name="robots" content="index, follow">`.
- **Open Graph** — `og:type`, `og:site_name`, `og:title`, `og:description`,
  `og:url`, `og:image` (+ width/height/alt), `og:locale`.
- **Twitter** — `summary_large_image` card with title/description/image.
- **JSON-LD** `Person` schema (name, jobTitle, url, image, email, …).
- `theme-color` for light and dark.
- `lang="en"` on `<html>`.
- `public/robots.txt` — `Allow: /` + sitemap reference.
- `public/sitemap.xml` — one URL (single-page site), `changefreq monthly`,
  `priority 1.0`.

### Notes / recommendations (non-blocking)

1. **`og:image` / `twitter:image`** point at `og-image.png` — confirm it exists
   in `public/` and is a real 1200×630 raster (the build serves it fine, but the
   file was not re-verified after asset work).
2. **Sitemap `lastmod`** is absent; add `<lastmod>` on content updates.
3. **Single-URL sitemap** is correct for this SPA, but because content is
   client-rendered, ensure any future deep links either get prerendering or are
   excluded from the sitemap.
4. **`access-control-allow-origin: *`** is emitted globally (see Security); it
   is unnecessary for a same-origin portfolio and slightly widens surface.
5. Consider `og:image:secure_url` and a `WebSite`/`Person` `sameAs` array pulling
   from `portfolioData` (LinkedIn, GitHub, Instagram, YouTube).

## Live deploy parity

Local `dist/index.html` matches the live `index.html` byte-for-byte (identical
asset hashes) — the deployed shell is in sync with the source of truth.
