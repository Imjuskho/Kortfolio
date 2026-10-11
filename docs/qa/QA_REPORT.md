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

| Theme | Violations | Passes | Incomplete |
| --- | --- | --- | --- |
| Light | **0** | 45 | 1 (52 gradient-bg nodes) |
| Dark | **0** | 45 | 1 |

## Behavioural checks

| Check | Method | Result |
| --- | --- | --- |
| Project preview keyboard-reachable | DOM query for `button[aria-label^="Open"]` | 10 real `<button>`s |
| Nested interactive elements | `a button, button button, a a, button a` | 0 |
| No stale asset refs | `rg` for removed `.png`/`.jpg` names | clean |
| WebP outputs valid | `cwebp` output inspection | valid, opaque |
| CLS on clean load (light) | `PerformanceObserver layout-shift, buffered` | 0 shifts |
| No horizontal overflow | `scrollWidth − clientWidth` | 0 at the tested width |

## Lab performance (local `vite preview`, warm cache — Lab only)

FCP ≈ 60 ms · LCP ≈ 1072 ms · CLS 0.00.

## Coverage gaps (documented, not hidden)

1. **Mobile viewport** — the CLI `viewport` command did not change
   `window.innerWidth`, so a live 390 px overlap re-test could not be run;
   carried from the prior design review. The one "wide" element found
   (ClientsMarquee `w-max animate-marquee`) is inside an `overflow-hidden`
   clip by design.
2. **ArchitectureLab non-default tabs** — only the active tab's DOM is
   rendered; axe cannot see the other simulators. Patterns were fixed
   globally, but a manual keyboard pass is recommended.
3. **Lighthouse** not installed → the ≥3-run median protocol and CWV field
   data were not collected. Report is Lab-only.
4. **Screen-reader spot check** — axe + DOM semantics only; no NVDA/VoiceOver
   pass was run.
5. **Cross-browser** — Chromium (agent-browser) only; no Safari/Firefox run.

## Recommendation

Ship with these limitations documented (see `docs/FINAL_RELEASE_REPORT.md`).
Before public launch, run: real-device 390/768/1280 passes, one Lighthouse
median, and a short VoiceOver/NVDA sweep.
