# Initial Audit — Kortfolio

> Scope: production engineering & UX engagement on the live portfolio at
> `https://bambamdev.com/kortfolio/`. This document records the *measure-first*
> baseline taken before any change.

## Repository

| Item | Value |
| --- | --- |
| Path | `/Users/mac/Sites/Kortfolio` |
| Remote | `origin` (Hostinger deploy under `/kortfolio/`) |
| Base branch | `main` |
| Baseline HEAD | `de0b3ea` |
| Working branch | `improve/kortfolio-production-audit` |
| Deploy target | `https://bambamdev.com/kortfolio/` |

## Stack (verified from `package.json` / config, not assumed)

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build | Vite 6.4.3 |
| Styling | Tailwind CSS **v4** via `@tailwindcss/vite` |
| Motion | Framer Motion v13 |
| Icons | lucide-react |
| PWA | `vite-plugin-pwa` v2 (Workbox) |
| Tests | Vitest + Testing Library (jsdom), 5 files / 14 tests |
| Lint | ESLint 10 (flat config) |
| Runtime | Node v26.5.0, npm 11.17.0 |

> Note: `PROJECT_DESIGN.md` claims "Tailwind v3" and lists code-splitting as
> "still open". Both are **stale** — the project is on Tailwind v4 and already
> lazy-loads sections (`React.lazy` + `Deferred` IntersectionObserver in
> `src/App.tsx`).

## Architecture

- `src/main.tsx` — entry; `registerSW({ immediate: true })`.
- `src/App.tsx` — `Suspense` + lazy section loading; `Deferred` gates below-fold
  sections behind an IntersectionObserver.
- `src/index.css` — semantic design tokens (CSS custom properties); **light is
  default**, dark via `.dark` class.
- `src/lib/asset.ts` — `asset()` prefixes `import.meta.env.BASE_URL` so paths
  work under `/kortfolio/`.
- `src/data/portfolioData.ts` — single source of truth for projects/skills/assets.
- Theme: localStorage key `kortfolio-theme` + `.dark` on `<html>`; browser
  `prefers-color-scheme` is **not** consulted.

## Baseline checks (all green before work)

| Check | Command | Result |
| --- | --- | --- |
| Types | `npm run typecheck` | pass |
| Lint | `npm run lint` | pass |
| Tests | `npm test` | 14/14 pass |
| Build | `npm run build` | pass |

## Baseline findings (drivers of the work)

1. **Asset weight** — `public/assets` = **49 MB**; `dist` = **56 MB**. Several
   multi-MB PNG device mockups and oversized JPEGs shipped 1:1.
2. **Accessibility** — live axe (axe-core 4.12.1) baseline: **light 14 / dark 64**
   color-contrast violations; sub-12px type (`text-[10px]`/`[11px]`); a
   non-semantic clickable `<div>` for the project preview.
3. **Images** — no `loading="lazy"`/`decoding="async"` on many `<img>`; hero
   portrait served as PNG.
4. **Bundle** — main JS 468 KB raw / 147 KB gzip (Framer Motion dominant).
5. **Service worker caching** — live `sw.js` served with
   `cache-control: public, max-age=604800` despite `.htaccess` `no-cache`
   (rule not effective on Hostinger's hcdn edge).

## Tooling available in this environment

- `agent-browser` — drives a headless browser; `a11y --json` runs axe-core
  4.12.1. **Caveat:** it truncates the node list to 10 per rule but reports the
  true `nodeCount`.
- `cwebp` and ImageMagick `convert` (`/opt/ImageMagick/bin/convert`).
- `magick`, `sharp`, and `lighthouse` are **not** installed.
- Local preview: `npx vite preview --port 4173 --host` →
  `http://localhost:4173/kortfolio/`.

## Method notes / gotchas

- **Animations pollute axe.** Framer Motion entrance animations leave transient
  low-opacity text mid-flight. Audits must *settle* the page first: scroll to
  bottom (mount deferred sections), wait, scroll to top, wait, then audit.
  Without this, violations are masked or fabricated.
- **ImageMagick in-place JPEG conversion inflates file size (~2×).** Always
  write to a temp file and `mv` into place (see `scripts/optimize-images.sh`).
- The agent cannot view images; all visual judgments are made from the a11y
  tree, axe output, and source.
