# Security Report — Kortfolio

## Status: acceptable for a static portfolio; harden at the edge

This is a fully static, client-side site (Vite SPA + PWA). There is no server
code, no database, no auth, and no user-submitted data persisted anywhere. The
attack surface is therefore small.

## Findings

### No code-level issues found
- **No `dangerouslySetInnerHTML`** and **no `eval`** in `src/`.
- **External links** all use `target="_blank"` with `rel="noreferrer"` (which
  implies `noopener` in modern browsers across all 6 sites in the codebase).
  *Recommendation:* add explicit `noopener` for older engines.
- **No secrets**: no API keys, tokens, or `.env` values referenced in client
  code. (Confirmed by inspection of source and config.)
- The only input is the Skills search box — purely client-side filtering, never
  transmitted.

### Response headers (live, observed)

| Header | Value | Assessment |
| --- | --- | --- |
| `access-control-allow-origin` | `*` | Unnecessary for same-origin; widen-surface only. Remove at edge. |
| `platform` | `hostinger` | — |
| `server` | `hcdn` | — |
| Content-Security-Policy | only `upgrade-insecure-requests` | Weak. No `default-src`/`script-src`. |
| Strict-Transport-Security | **absent** | Add HSTS at edge. |
| X-Content-Type-Options | **absent** | Add `nosniff`. |
| Referrer-Policy | **absent** | Add `strict-origin-when-cross-origin`. |
| Permissions-Policy | **absent** | Add a restrictive policy. |
| X-Frame-Options / `frame-ancestors` | **absent** | Add `frame-ancestors 'none'`. |

### Caching anomaly (integrity-adjacent)

Live `sw.js` is served with `cache-control: public, max-age=604800`, **despite**
`.htaccess` setting `no-cache, no-store, must-revalidate` for `sw.js`. The
`.htaccess` rule is not taking effect on Hostinger's hcdn edge. Consequence:
clients (including the service worker's own update checks, which the browser is
allowed to bypass) may hold a stale worker for up to 7 days. This is a **host /
edge configuration** fix, not a code change.

## Recommendations (edge/host config — require authorization)

1. Emit a real CSP at the edge, e.g.
   `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';
   font-src 'self'; frame-ancestors 'none'; base-uri 'self'`.
2. Add `Strict-Transport-Security: max-age=31536000; includeSubDomains`.
3. Add `X-Content-Type-Options: nosniff`,
   `Referrer-Policy: strict-origin-when-cross-origin`,
   `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
4. Remove the global `Access-Control-Allow-Origin: *` (or scope it).
5. Fix `sw.js` cache header at the edge so the `.htaccess` intent actually
   applies.

## Authorization note

No production deploy, DNS, billing, or infrastructure changes were performed.
The header/CSP items above are **recommendations for the deployment owner** and
must be applied with explicit authorization.
