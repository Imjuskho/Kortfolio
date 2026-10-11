# Deployment & Rollback — Kortfolio

## Target

Static SPA/PWA deployed to Hostinger, served from
`https://bambamdev.com/kortfolio/` (base path `/kortfolio/`). Edge = Hostinger
`hcdn`.

## Build

```
npm ci
npm run typecheck && npm run lint
npm test
npm run build          # emits dist/
```

`dist/` is what gets uploaded. Expect ≈ **9.3 MB** (down from ≈ 56 MB).

## Rollback plan

1. **Assets (pre-optimisation state is backed up pristine):**
   ```
   rm -rf public/assets
   cp -R /tmp/kf-asset-backup/assets public/assets   # 55 files, 49 MB
   npm run build
   ```
2. **Code:** all changes are isolated on branch
   `improve/kortfolio-production-audit` off `main` @ `de0b3ea`.
   `git checkout main` restores the exact pre-engagement state; delete the
   branch to discard entirely.
3. **Deploy rollback:** re-upload the previous `dist/` (or the previous release
   artifact) and purge the edge cache. Because asset filenames are content-
   hashed, only `index.html` and `sw.js` are stale-prone; purge those first.

## Service-worker caution

Live `sw.js` is served `max-age=604800` (see Security/Performance reports). If a
bad release ships and the SW is pinned, users may need a hard reload (or the
edge cache purged) to pick up `index.html`. **Purge `sw.js` and `index.html` at
the edge on every deploy.**

## Authorization

No production deploy, DNS, billing, or infra change was made in this
engagement. The `.htaccess`/edge header fixes recommended in the Security and
Performance reports must be applied by the deployment owner with explicit
authorization.
