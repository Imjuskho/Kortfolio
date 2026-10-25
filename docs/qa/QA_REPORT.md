# QA Report — Kortfolio

Current static and browser-preview results are separated below. Historical
browser measurements from the earlier release pass are retained as context and
are not presented as fresh evidence for the retro shell.

## Build & static checks

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | pass (0 errors) |
| ESLint | `npm run lint` | pass with 5 existing Fast Refresh warnings; 0 errors |
| Unit/component tests | `npm test` | **7 files / 26 tests pass** (Vitest 5.0.3) |
| Production build | `npm run build` | pass |

## Historical browser measurements — earlier release pass

The following axe and Lighthouse results were executed before the retro shell
replacement. They remain useful baseline evidence, but should be rerun after
deployment of the current shell.

### Accessibility (axe-core 4.12.1, settled page, all sections mounted)

| Surface | Violations | Passes | Incomplete |
| --- | --- | --- | --- |
| Desktop 1280 — light | **0** | 45 | 1 (52 gradient-bg nodes) |
| Desktop 1280 — dark | **0** | 45 | 1 |
| Mobile 390 — light | **0** | 45 | 1 |
| Lab tab — Solar Edge Vision | **0** | 45 | 1 |
| Lab tab — Pocket Body Motion | **0** | 45 | 1 |
| Lab tab — Bawo Traditional Game | **0** | 45 | 1 |

## Lighthouse (mobile, median of 3)

Performance **86** · Accessibility **100** · Best Practices **100** · SEO **100**.
LCP 3.04 s · FCP 3.0 s · TBT 0 ms · CLS 0.000. (See Performance report.)

## Behavioural checks

| Check | Method | Result |
| --- | --- | --- |
| Project preview keyboard-reachable | DOM query for `button[aria-label^="Open"]` | 10 real `<button>`s |
| Nested interactive elements | `a button, button button, a a, button a` | 0 |
| No stale asset refs | `rg` for removed `.png`/`.jpg` names | clean |
| WebP outputs valid | `cwebp` output inspection | valid, opaque |
| CLS on clean load (light) | `PerformanceObserver layout-shift, buffered` | 0 shifts |
| No horizontal overflow 390 px | `agent-browser set viewport 390 844` + `scrollWidth − clientWidth` | 0 |
| No horizontal overflow 1280 px | same | 0 |
| Reduced-motion | CSS media query (eager) + local `MotionConfig` in lazy sections | present |

## Lab performance (local `vite preview`, warm cache — Lab only)

FCP ≈ 60 ms · LCP ≈ 1072 ms · CLS 0.00.

## Coverage — now closed since first draft

- ✅ Mobile 390 px viewport (axe + overflow) — **done**.
- ✅ ArchitectureLab non-default tabs (all three audited) — **done**.
- ✅ Lighthouse ≥3-run median — **done** (86/100/100/100).

## Coverage gaps (remaining, documented)

1. **Field / CrUX CWV** — only Lab data (Lighthouse + localhost). Real-user
   metrics require the deployed site + analytics.
2. **Screen-reader spot check** — axe + DOM semantics only; no NVDA/VoiceOver
   pass was run.
3. **Cross-browser** — Chromium (agent-browser + Lighthouse) only; no
   Safari/Firefox run.
4. **Deeper keyboard walkthrough** — project preview buttons verified
   focusable/reachable; a full tab-order walkthrough of every simulator control
   was not scripted.

## Recommendation

Ship with these limitations documented (see `docs/FINAL_RELEASE_REPORT.md`).
Before public launch, run: a VoiceOver/NVDA sweep and a Safari/Firefox pass.

## Retro portfolio pass — 2026-10-25

The KORTFOLIO game-navigation implementation was validated locally after the
retro redesign work:

| Check | Result |
| --- | --- |
| TypeScript | `npm run typecheck` pass |
| Tests | `npm test` — **7 files / 26 tests pass** |
| ESLint | pass with 5 existing `react-refresh/only-export-components` warnings; no errors |
| Production build | pass; sitemap regenerated with 18 URLs / 12 missions |
| Build artifacts | `dist/index.html` and `public/sitemap.xml` present |
| Deep-link behavior | Existing App tests pass for a mission URL and unknown route; contact query remount added |
| WebGL fallback | SVG fallback remains the intentional path for unavailable WebGL, mobile, reduced-motion, and low-power contexts |

## Phase 2 Release Candidate Verification — 2026-10-25

The Phase 2 release candidate was validated against the local production preview at
`http://127.0.0.1:5173/kortfolio/`:

### Static & automated test suite

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | pass (0 errors) |
| ESLint | `npm run lint` | pass (0 errors, 0 warnings) |
| Unit / integration tests | `npm test` | **9 files / 51 tests pass** (Vitest 5.0.3) |
| Production build | `npm run build` | pass (18 URLs, 12 missions in `sitemap.xml`) |
| Service Worker Precache | `workbox` config | **33 entries / 544.91 KiB** (3D chunks excluded) |
| Mock API Plugin | `vite.config.ts` | pass (HTTP 200/422 and honeypot handled) |
| PHP Backend | `public/api/contact.php` | pass (Sanitization, honeypot, rate limiting) |

### Accessibility (axe-core 4.12.1 via agent-browser)

| Surface / Route | Viewport | Theme | Violations | Passes |
| --- | --- | --- | --- | --- |
| Start Screen (`/`) | 1280 × 800 | Dark | **0** | 39 |
| Start Screen (`/`) | 1280 × 800 | Light | **0** | 39 |
| Start Screen (`/`) | 390 × 844 | Dark | **0** | 39 |
| Start Screen (`/`) | 390 × 844 | Light | **0** | 39 |
| Mission Select (`/missions`) | 1280 × 800 | Dark | **0** | 45 |
| Case Study (`/missions/amr-fintech`) | 1280 × 800 | Dark | **0** | 41 |
| Case Study (`/missions/edge-vision`) | 1280 × 800 | Dark | **0** | 42 |
| Tech Lab (`/lab`) | 1280 × 800 | Dark | **0** | 38 |
| Player File (`/player`) — with Origin Arc | 1280 × 800 | Light & Dark | **0** | 43 |
| Media Archive (`/media`) | 1280 × 800 | Dark | **0** | 39 |
| Contact (`/contact`) — with Dual Mode Form | 1280 × 800 | Light & Dark | **0** | 43 |
| Command Menu Dialog | 1280 × 800 | Dark | **0** | 49 |
| Evidence Lightbox Dialog | 1280 × 800 | Dark | **0** | 44 |

### Fresh Lighthouse Measurements (Lighthouse 13.5.0, Headless Chromium)

| Audit Target | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop Home (`/`) | **100** | **100** | **100** | **100** | 0.5 s | 0.8 s | 0 ms | 0.002 |
| Mobile Home (`/`) | **98** | **100** | **100** | **100** | 1.6 s | 2.1 s | 10 ms | 0.010 |
| Mobile Contact (`/contact`) | **97** | **100** | **100** | **100** | 1.7 s | 2.4 s | 0 ms | 0.000 |
| Mobile Player (`/player`) | **94** | **100** | **100** | **100** | 1.7 s | 3.0 s | 0 ms | 0.000 |
| Mobile Case Study (`/missions/amr-fintech`) | **97** | **100** | **100** | **100** | 1.5 s | 2.6 s | 0 ms | 0.000 |

### Behavioural & Resilience Verification

| Check | Method | Result |
| --- | --- | --- |
| 12 Mission Direct URLs | Vitest & HTTP preview | All 12 render valid titles and data without 404s |
| Browser History (`popstate`) | Vitest back/forward simulation | Synchronizes view correctly without full reload |
| Origin Arc Story Progression | Vitest & DOM validation | 5 chronological chapters (`Curiosity` → `Possibility`) rendered |
| Dual-Channel Contact Form | Vitest & curl HTTP testing | In-page send (POST 200), client mailto, and clipboard copy verified |
| Honeypot Spam Deterrence | Vitest & curl bot simulation | Silent acceptance when hidden `website` input is filled |
| Server Failure Fallback | Vitest network offline simulation | Instant UI fallback buttons (Mail App, Copy Draft, Gmail Web) |
| Contact Query Remount | URL `?project=edge-vision` | Prefills mission selector dynamically |
| Malformed Query Resilience | URL `?project=%FF%FE` | Gracefully falls back without throwing exceptions |
| Horizontal Overflow | `scrollWidth - clientWidth` | 0 px at 390 px and 1280 px viewports |
| Reduced Motion & WebGL Fallback | Media query emulation | Instant vector SVG scene rendered; 3D chunk deferred |

