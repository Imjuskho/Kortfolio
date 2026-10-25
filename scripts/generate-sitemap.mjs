/**
 * Generates public/sitemap.xml from the static route map and the mission ids in
 * src/data/portfolioData.ts. Run automatically before every production build so
 * the sitemap cannot drift from the archive.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://bambamdev.com/kortfolio';
const today = new Date().toISOString().slice(0, 10);

const data = readFileSync(resolve(root, 'src/data/portfolioData.ts'), 'utf8');
const projectStart = data.indexOf('export const PROJECTS');
const projectEnd = data.indexOf('export const PHOTOGRAPHY_GALLERY');
if (projectStart < 0 || projectEnd <= projectStart) {
  throw new Error('Could not isolate the PROJECTS block in portfolioData.ts');
}

const missionIds = Array.from(
  data.slice(projectStart, projectEnd).matchAll(/^\s{4}id:\s*"([^"]+)"/gm),
  (match) => match[1],
);

if (missionIds.length === 0) {
  throw new Error('No mission ids found; refusing to write an empty mission sitemap');
}

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'monthly' },
  { path: 'missions', priority: '0.9', changefreq: 'monthly' },
  { path: 'lab', priority: '0.8', changefreq: 'monthly' },
  { path: 'player', priority: '0.8', changefreq: 'monthly' },
  { path: 'media', priority: '0.7', changefreq: 'monthly' },
  { path: 'contact', priority: '0.7', changefreq: 'yearly' },
];

const urls = [
  ...staticRoutes.map((route) => ({ ...route, loc: route.path ? `${SITE}/${route.path}/` : `${SITE}/` })),
  ...missionIds.map((id) => ({
    loc: `${SITE}/missions/${id}/`,
    priority: '0.7',
    changefreq: 'yearly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml);
console.log(`Wrote public/sitemap.xml (${urls.length} URLs, ${missionIds.length} missions)`);
