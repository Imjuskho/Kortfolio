# Final Release Report — Kortfolio

**Engagement:** production engineering & UX pass on `bambamdev.com/kortfolio/`
**Branch:** `improve/kortfolio-production-audit` (off `main` @ `de0b3ea`)
**Date:** 2026-10-11

## Status: **READY WITH DOCUMENTED LIMITATIONS**

The branch is a strict, verifiable improvement over `main`: lighter, accessible
(0 axe violations across desktop, mobile, and all four lab tabs), and
behaviourally unchanged where it matters. It is safe to merge/deploy. The
limitations below are real and documented rather than hidden.

## Summary of change

| Area | Before | After |
| --- | --- | --- |
| axe violations — light 1280 | 14 (live) / 25 (all sections) | **0** |
| axe violations — dark 1280 | 64 | **0** |
| axe violations — mobile 390 | not tested | **0** |
| axe violations — lab tabs (×3) | not tested | **0 each** |
| Lighthouse — Accessibility | — | **100** |
| Lighthouse — Performance (mobile, median) | — | **86** |
| Lighthouse — Best Practices / SEO | — | **100 / 100** |
| `public/assets` | 49 MB | **6.3 MB** (−87 %) |
| `dist/` | 56 MB | **9.3 MB** (−83 %) |
| Hero `kondwani.webp` | 122 KB | **53 KB** |
| Sub-12 px type | present | removed (12 px floor) |
| Project preview | `<div onClick>` | semantic `<button>` |

All checks executed: typecheck ✓ · lint ✓ · tests **14/14** ✓ · build ✓ · axe
desktop light/dark **0** ✓ · axe mobile **0** ✓ · axe lab tabs **0** ✓ ·
Lighthouse 86/100/100/100 ✓.

## Deliverables

- `docs/audit/INITIAL_AUDIT.md`
- `docs/accessibility/ACCESSIBILITY_REPORT.md`
- `docs/performance/PERFORMANCE_REPORT.md`
- `docs/engineering/ENGINEERING_CHANGELOG.md`
- `docs/ux/UX_REVIEW.md`
- `docs/design/DESIGN_REVIEW.md`
- `docs/content/CONTENT_REVIEW.md`
- `docs/seo/SEO_REPORT.md`
- `docs/security/SECURITY_REPORT.md`
- `docs/qa/QA_REPORT.md`
- `docs/deployment/DEPLOYMENT_AND_ROLLBACK.md`
- `scripts/optimize-images.sh`

## Documented limitations (why not "READY FOR RELEASE")

1. **No field (CrUX) data.** Lighthouse Lab median is 86 with **LCP 3.04 s**
   (mobile). The SPA cannot paint until its JS boots, so FCP ≈ LCP ≈ 3 s under
   mobile throttling. Reaching ≤2.5 s needs prerender/SSR or a main-bundle
   reduction (Framer Motion). TBT is 0 and CLS is 0.
2. **Assistive-tech & cross-browser passes** (NVDA/VoiceOver, Safari/Firefox)
   were not run — axe + Chromium only.
3. **Main JS bundle (147 KB gz, Framer Motion)** not reduced. `LazyMotion`+`m`
   was trialled and measured no gain; a real cut needs removing Framer Motion
   from all above-the-fold components. Documented, not done.
4. **Edge header / SW-cache items** (CSP, HSTS, Permissions-Policy, removing the
   global ACAO, and the `sw.js` `max-age=604800` override) are host/edge fixes
   requiring explicit authorization. `nosniff`, `Referrer-Policy`, hashed-asset
   immutable caching, and an explicit `sw.js` no-cache rule **were** added to
   `.htaccess`, subject to the host honouring them.

## Pre-launch checklist (owner)

- [x] Mobile 390 px visual + a11y pass.
- [x] Lighthouse median on the local production build.
- [x] `prefers-reduced-motion` honoured (MotionConfig + CSS).
- [x] Contact email reconciled (JSON-LD / noscript / UI).
- [x] ArchitectureLab non-default tabs audited.
- [ ] VoiceOver/NVDA sweep of nav, project modal, Skills search.
- [ ] Safari/Firefox pass.
- [ ] Apply remaining edge headers (CSP, HSTS) — **with authorization**.
- [ ] Confirm host honours the `.htaccess` `sw.js` no-cache rule; purge
      `sw.js` + `index.html` on deploy.
- [ ] Optional: prerender the hero to bring LCP under 2.5 s.

## Rollback

Assets pristine at `/tmp/kf-asset-backup/assets`; code isolated on the feature
branch. See `docs/deployment/DEPLOYMENT_AND_ROLLBACK.md`. No production deploy,
DNS, billing, or infra change was made.
