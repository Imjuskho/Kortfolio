# QA Report — Kortfolio

Every result below was **actually executed** on this branch. Nothing is marked
passing on intent alone.

## Build & static checks

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npm run typecheck` | pass (0 errors) |
| ESLint | `npm run lint` | pass (0 warnings) |
| Unit/component tests | `npm test` | **5 files / 14 tests pass** (Vitest 5.0.3) |
| Production build | `npm run build` | pass |

## Accessibility (axe-core 4.12.1, settled page, all sections mounted)

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
| Reduced-motion | `MotionConfig reducedMotion="user"` + CSS media query | present |

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
