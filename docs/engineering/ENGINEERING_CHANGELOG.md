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

## Verification (all executed)

| Check | Command | Result |
| --- | --- | --- |
| Types | `npm run typecheck` | pass |
| Lint | `npm run lint` | pass |
| Tests | `npm test` | 14/14 pass |
| Build | `npm run build` | pass |
| axe light | `agent-browser a11y` | **0** violations |
| axe dark | `agent-browser a11y` | **0** violations |

## Rollback

Assets are backed up pristine at `/tmp/kf-asset-backup/assets`
(55 files, 49 MB). To roll back assets:
`rm -rf public/assets && cp -R /tmp/kf-asset-backup/assets public/assets`.
Code changes are isolated on the feature branch; `git checkout main` restores
the pre-engagement state. No production deploy, DNS, or infra changes were made.
