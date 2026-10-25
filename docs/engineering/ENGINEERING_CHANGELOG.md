# Engineering Changelog — Kortfolio

Branch: `improve/kortfolio-production-audit` (off `main` @ `de0b3ea`).

## Added

- `scripts/optimize-images.sh` — reproducible asset optimiser (cwebp +
  ImageMagick; temp-file + `mv` to avoid the in-place JPEG bloat bug).

## Changed

### `src/index.css`
- Light tokens darkened for AA on `/10` + `/20` tints: `--accent`
  `#047857→#046345`, `--teal` `#0f766e→#115e59`, `--violet` `#7c3aed→#6a24cf`,
  `--info` `#0369a1→#075985`; `--warn` `#b45309→#92400e`.
- Dark `--faint` `#64748b→#7d8fa6`.

### Components
- `SkillMatrix.tsx` — active tab `text-slate-950` → `text-background` (was
  2.65:1 dark-on-dark); reset button likewise.
- `Hero.tsx` / `Navbar.tsx` / `ContactSection.tsx` — LinkedIn `text-[#0a66c2]`
  → `text-[#0a5aa8]` (4.43 → 5.38:1).
- `ArchitectureLab.tsx` — removed `opacity-50`, `bg-black/30`→`bg-black/20` on
  inactive stage panels; `text-slate-600`→`text-slate-400`.
- `PhotographyGallery.tsx` / `InteractiveTerminal.tsx` — `text-slate-600`→
  `text-slate-400`.
- `ProjectsSection.tsx` — dropped `opacity-60` from count badges.
- `ProjectCard.tsx` — preview `<div onClick>` → `<button type="button"
  aria-label>`; `img alt="" loading="lazy" decoding="async"`.
- `ProjectModal.tsx` — main `decoding="async"`; thumbnails `loading="lazy"
  decoding="async"`.
- `ClientsMarquee.tsx` — logo `img` `loading="lazy" decoding="async"`; 12 px
  type floor.
- `Hero.tsx` — portrait → `kondwani.webp`, `fetchPriority="high"`,
  `decoding="async"`; `text-accent/80`→`text-accent`.
- `Navbar.tsx` — avatar → `kondwani.webp`, `decoding="async"`; 12 px floor.
- `ImpactMetrics.tsx` — 12 px floor; `text-accent/80`→`text-accent`.
- `Footer.tsx` — badge `bg-accent/10`→`bg-surface`.
- `src/data/portfolioData.ts` — 6 project `.png` → `.webp`.

## Removed

- Stray 251 KB artifact file `--full-page` (a misdirected CLI flag).
- Dead assets `ipad-kiswahili.png`, `iphone-home.png`, `kondwani.png`,
  `kondwani.jpg`.

## Second pass — gap closure

- `index.html` — added desktop-scoped hero-image preload
  (`media="(min-width: 1024px)"`); reconciled JSON-LD/noscript contact email to
  `kayphanga@gmail.com`; added LinkedIn to JSON-LD `sameAs`.
- `public/.htaccess` — added `X-Content-Type-Options`, `Referrer-Policy`,
  immutable caching for hashed assets, and an explicit `sw.js` no-cache rule
  (last, so it wins).
- `public/assets/profile/kondwani.webp` — re-encoded 1000²/122 KB → 900²/53 KB.
- `src/components/ArchitectureLab.tsx` — added `aria-label` to the two Solar
  Edge range sliders; Bawo pit-index numbers `text-amber-700` → `text-amber-400`
  (3.96:1 → AA).
- Trialled `LazyMotion`+`m` bundle reduction — **measured no gain**, reverted
  (documented in the Performance report).

## Third pass — animation engine out of the main bundle

- **Removed Framer Motion from every eager component** so the main chunk dropped
  148 → 103 KB gz (unused JS 60 KiB → 0; Speed Index ~5.9 → 3.67 s; Lighthouse
  mobile Perf 86 → 88, median of 3; CLS still 0, axe still 0 in light & dark).
- `src/index.css` — added CSS entrance keyframes (`animate-rise*`,
  `card-in`, `icon-spin`, `sheet-in`) and `.reveal*` transition utilities, all
  neutralised by the existing `prefers-reduced-motion` block.
- `src/components/Reveal.tsx` — **new**, tiny IntersectionObserver reveal
  (toggles `.reveal-visible`; no framer-motion dependency).
- `Hero.tsx` — mount-time entrance → CSS keyframes with the original delays.
- `ImpactMetrics.tsx` / `ClientsMarquee.tsx` / `ProjectsSection.tsx` — section
  headers and cards → `Reveal`; `whileHover` lift → `hover:-translate-y-1`;
  the metric divider line → `reveal-scale-x`.
- `ProjectsSection.tsx` — removed `layout`/`AnimatePresence` grid; cards are
  plain keyed `div`s with `animate-card-in` (instant reorder on filter).
- `Navbar.tsx` — `useScroll`/`useSpring` rail → scroll listener + rAF driving
  `scaleX` with a CSS transition; `layoutId` active pill → one measured span
  (`offsetLeft`/`offsetWidth` + `transition:[left,width]`); tagline swap,
  theme-icon spin and mobile sheet → small CSS animations.
- `App.tsx` — removed the global `MotionConfig`; `ArchitectureLab.tsx`,
  `ArchitecturalJourney.tsx`, `SkillMatrix.tsx` now wrap themselves in a local
  `MotionConfig reducedMotion="user"` so reduced-motion is still honoured in the
  lazy (still-Framer) sections.

## Verification (all executed)

| Check | Command | Result |
| --- | --- | --- |
| Types | `npm run typecheck` | pass |
| Lint | `npm run lint` | pass |
| Tests | `npm test` | 14/14 pass |
| Build | `npm run build` | pass |
| axe light 1280 | `agent-browser a11y` | **0** violations |
| axe dark 1280 | `agent-browser a11y` | **0** violations |
| axe light 390 | `agent-browser set viewport 390 844` + `a11y` | **0** violations |
| axe — lab tabs (×3 non-default) | click tab + `a11y` | **0** violations |
| Lighthouse median (×3) | `npx lighthouse` | Perf 88 / A11y 100 / BP 100 / SEO 100 |
| Overflow 390 / 1280 | `scrollWidth − clientWidth` | 0 / 0 |

## Rollback

Assets are backed up pristine at `/tmp/kf-asset-backup/assets`
(55 files, 49 MB). To roll back assets:
`rm -rf public/assets && cp -R /tmp/kf-asset-backup/assets public/assets`.
Code changes are isolated on the feature branch; `git checkout main` restores
the pre-engagement state. No production deploy, DNS, or infra changes were made.

## Retro portfolio implementation pass — 2026-10-25

- Replaced the previous section-based portfolio shell with the KORTFOLIO game
  interface: start screen, keyboard-friendly destination menu, Mission Select,
  Tech Lab, Player File, Media Archive, Contact / Next Mission, deep-linkable
  case studies, and a persistent HUD/footer.
- Added a maintainable mission model sourced from the existing `PROJECTS` record;
  public evidence links are emitted only when recorded in the source data.
- Added a bespoke low-poly Three.js systems island with SVG fallback, capped
  pixel ratio, idle loading, visibility/intersection pausing, and reduced-motion
  support. Mobile, reduced-motion, and low-power contexts intentionally retain
  the SVG scene rather than downloading the optional Three.js chunk.
- Added local mailto draft composition with validation and explicit messaging
  that no backend submission or automatic send occurs.
- Added route metadata, sitemap generation, OG metadata, crawlable anchors, and
  browser-history navigation for stable mission URLs.
- Contact deep links now remount on query changes so `?project=` always selects
  the requested mission without a synchronous state effect.

### Final local verification

| Check | Result |
| --- | --- |
| `npm run typecheck` | pass |
| `npm test` | 26/26 tests pass |
| `npm run lint` | pass with 5 existing Fast Refresh warnings |
| `npm run build` | pass; sitemap regenerated with 18 URLs / 12 missions |
| Required artifacts | `dist/index.html` and `public/sitemap.xml` present |

The Three.js world remains dynamically loaded and is skipped on mobile,
reduced-motion, and low-power contexts. No production deployment was performed.

## Bundle and theme pass — 2026-10-25

- Replaced the Three.js barrel import with direct `three/src/*` module imports
  and moved `WebGLRenderer` behind a second dynamic import.
- Reduced the optional scene from a single 540.55 kB minified world chunk to a
  158.57 kB world chunk plus a 407.59 kB renderer chunk. The production build
  now completes without Rollup chunk-size or circular-chunk warnings.
- Added a persisted light mode with a no-flash HTML bootstrap, accessible
  Sun/Moon toggle, and a separate contrast-tuned token palette.
- Fresh axe runs: 0 violations on desktop dark, mobile dark, and desktop light.
- Fresh Lighthouse runs: desktop 88/100/100/100 and mobile 73/100/100/100 for
  Performance / Accessibility / Best Practices / SEO. Mobile Lighthouse is a
  single local run and should be treated as a lab datapoint, not field CWV.

## Phase 2 — Production Assurance, Performance & Conversion Audit — 2026-10-25

### Performance & Device Resilience
- **Service Worker Precache Optimization**: Excluded optional Three.js chunks (`world-*.js`, `WebGLRenderer-*.js`) from `globIgnores` in `vite.config.ts`.
  Precache payload dropped from 1,084 KiB (35 entries) to 531 KiB (33 entries) — a 51% reduction. Low-power, mobile, and throttled network devices no longer download 566 KB of unused WebGL code in background during service worker installation.
- **Mobile Lighthouse Investigation**: Fresh local audit against production preview yielded 98 Performance on root and 97 Performance on mission case study (`/missions/amr-fintech`), with 100 on Accessibility, Best Practices, and SEO. Confirmed that Three.js is deferred and not loaded on mobile or low-power viewports.

### Accessibility & Interaction Hardening
- **Light-mode Theme Tokens & Button Contrast**: Scoped `.btn:not(.btn-amber):not(.btn-secondary):not(.btn-ghost)` in `src/index.css` so secondary and ghost buttons preserve dark text (`--ink` / `--muted`) against light backgrounds instead of inheriting white foreground. Darkened light tokens (`--mint`, `--amber`, `--violet`) for strict WCAG AA contrast ratio compliance (>4.5:1).
- **Client & Institution Logos**: Updated partner tiles on white backgrounds in `PlayerView.tsx` from dynamic `text-void` (which inverted to light gray in light theme) to permanent slate text (`text-slate-950` and `text-slate-600`), resolving all 18 color contrast violations.
- **ARIA Semantics**: Added `role="group"` to filter containers using `aria-label` across `MissionsView.tsx`, `MediaView.tsx`, and `TechLabView.tsx`, eliminating all `aria-prohibited-attr` axe-core violations.
- **Accessible Dialog Names**: Adjusted mobile drawer label in `TopBar.tsx` to "Navigation Menu" to match the accessible label expected by automated testing and screen reader announcements.

### Automated Regression Testing
- Expanded `src/App.test.tsx` test suite from 10 to 13 tests, asserting direct deep-link rendering for all 12 mission URLs without 404s, browser history `popstate` synchronization, and malformed query parameter tolerance.
- Full test suite: **9 test suites, 47 tests passed** (100% pass rate).
- Full axe-core 4.12.1 audits across all destinations in both light and dark themes: **0 violations**.

## Phase 3 — Personal Narrative, Commercial Conversion & Dual-Mode Inquiries — 2026-10-26

### 1. Personal Storytelling & Narrative Architecture ("The Arc")
- Structured 5-stage personal origin story in `src/data/portfolioData.ts` and `src/types.ts` (`OriginStage`), following the progression:
  1. **Curiosity** (Age 11, Toshiba Satellite from dad, C command-line chatbot and the terminal shutdown lesson).
  2. **Experimentation** (Adolescence, Symbian and early Android rooting, custom ROMs, flashing radios, music production, audio engineering, and documentary cameras).
  3. **Perspective** (Formative commercial lesson: building an early music streaming prototype, commercial pitch rejected, Spotify's emergence ~1 year later; indelible lessons on timing, recognition, and the difference between ideation and scalable execution).
  4. **Building** (2010–Present: national telecom routing at MTL data centre, directing documentary media for the World Bank/UN, delivering MWK 200M+ at 7arts, solar edge AI, and mobile money reconciliation).
  5. **Possibility** (The next chapter: applied AI, autonomous workflows, and digital products that solve real constraints and scale internationally).
- Integrated **"The Arc · Origin story"** into `PlayerView.tsx` with dedicated chapter badges (`CH 01`–`CH 05`), narrative timelines, key engineering takeaways, and technical tags, positioned between the Profile card and Career record.

### 2. Commercial Credibility & Enterprise Value Proposition
- Clarified value proposition in `HomeView.tsx`: prominently emphasizes Kondwani's systems architecture, edge AI, and offline-first mobile money expertise.
- Updated Home status bar to explicitly declare commercial availability: `Available for advisory & builds` (replacing redundant sound-status text).
- Enriched `ContactView.tsx` advisory scope with 4 clear engagement areas: Architecture Review & Resilience Audits, Edge & Vision Engineering, Mobile Money Reconciliation, and Strategic Documentary Media.
- Added a clear **Response Commitment** guaranteeing acknowledgment within 24–48 business hours with fast-track escalation for infrastructure incidents.

### 3. Dual-Channel Contact Architecture (Server Dispatch + Client-Side Fallback)
- **Production PHP Backend (`public/api/contact.php`)**:
  - Implemented strict input validation (Name 2–80, Email regex, Message 20–2000 chars, Organisation, Project slug).
  - Anti-spam protections: hidden honeypot field (`website`), minimum 3-second interaction timestamp token (`_ts`), and transient IP rate-limiting (max 5 submissions per 15 minutes).
  - Safe email dispatch with UTF-8 encoding, sanitized headers, and `noreply` domain origin.
- **Apache Routing (`public/.htaccess`)**:
  - Added clean rewrite rule `^api/contact/?$ api/contact.php [L,QSA]`.
- **Local Dev & Preview Mock API Plugin (`vite.config.ts`)**:
  - Built custom Connect middleware inside `vite.config.ts` (`contactApiPlugin`) to intercept `POST /kortfolio/api/contact` during `dev` and `preview` servers.
  - Correctly unshifts middleware before Vite's internal preview handlers to return authentic HTTP 200 / 422 JSON responses locally.
- **Client UI (`ContactView.tsx`)**:
  - Dual-mode selector: **"Send in-page"** (direct server delivery) and **"Open in mail app"** (client-side mailto / Gmail web / clipboard composer).
  - Robust error recovery: if network or backend fails, message is never lost—the UI automatically surfaces one-click fallback buttons to open the user's mail client or copy the draft to clipboard.
  - Analytics instrumentation via `src/lib/analytics.ts` (`contact_form_submitted`, `contact_form_failed`, `contact_mode_switched`).

### 4. Verification & Testing
- Vitest suite expanded to **9 test suites, 51 tests passed** (100% pass rate).
- Added `ContactView.test.tsx` tests covering direct API dispatch, server error fallback, honeypot presence, and mail app mode switching.
- Added `portfolioData.test.ts` tests verifying the 5-stage chronological origin story integrity and narrative anchors.
- TypeScript (`tsc --noEmit`): 0 errors.
- ESLint (`eslint .`): 0 errors, 0 warnings.
- axe-core 4.12.1: **0 violations** across all views in light and dark modes.
- Production Lighthouse scores:
  - **Desktop Home**: 100 Performance · 100 Accessibility · 100 Best Practices · 100 SEO (FCP 0.5s, LCP 0.8s, TBT 0ms, CLS 0.002).
  - **Mobile Home**: 98 Performance · 100 Accessibility · 100 Best Practices · 100 SEO (FCP 1.6s, LCP 2.1s, TBT 10ms, CLS 0.010).
  - **Mobile Contact**: 97 Performance · 100 Accessibility · 100 Best Practices · 100 SEO (FCP 1.7s, LCP 2.4s, TBT 0ms, CLS 0.000).
  - **Mobile Player**: 94 Performance · 100 Accessibility · 100 Best Practices · 100 SEO (FCP 1.7s, LCP 3.0s, TBT 0ms, CLS 0.000).
