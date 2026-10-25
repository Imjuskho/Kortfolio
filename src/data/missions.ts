import { PROJECTS, type ClientPartner } from './portfolioData';
import type { Project } from '../types';

export interface MissionLink {
  label: string;
  href: string;
  kind: 'code' | 'live';
}

export interface Mission extends Project {
  slug: string;
  code: string;
  index: number;
  categoryCode: string;
  thumb?: string;
  hero?: string;
  links: MissionLink[];
  statusLabel: 'LIVE PRODUCT' | 'PUBLIC REPO' | 'CASE STUDY';
}

const CATEGORY_CODES: Record<string, string> = {
  'FinTech & SaaS': 'FIN',
  'Edge Computing & CV': 'EDGE',
  'Cloud & Data Centre': 'CLOUD',
  'Cultural Tech & Gaming': 'CULT',
  'Systems & Infra': 'SYS',
};

export const MISSIONS: Mission[] = PROJECTS.map((project, index) => {
  const links: MissionLink[] = [];
  if (project.githubUrl) links.push({ label: 'Source repository', href: project.githubUrl, kind: 'code' });
  if (project.liveDemoUrl) links.push({ label: 'Live product', href: project.liveDemoUrl, kind: 'live' });
  if (/^https?:\/\//i.test(project.localPath)) {
    links.push({ label: 'Live website', href: project.localPath, kind: 'live' });
  }

  return {
    ...project,
    slug: project.id,
    code: `MSN-${String(index + 1).padStart(2, '0')}`,
    index,
    categoryCode: CATEGORY_CODES[project.category] ?? 'SYS',
    thumb: project.previewImages?.[0],
    hero: project.previewImages?.[0],
    links,
    statusLabel: links.some((link) => link.kind === 'live')
      ? 'LIVE PRODUCT'
      : links.length
        ? 'PUBLIC REPO'
        : 'CASE STUDY',
  };
});

export function getMission(slug: string): Mission | undefined {
  return MISSIONS.find((mission) => mission.slug === slug);
}

/**
 * Featured mission rationale: Edge Vision has the strongest combination of
 * technical depth, client relevance, real interface imagery, and a public
 * repository that can be independently inspected. AMR is the business-critical
 * flagship but ships no public visual evidence.
 */
export const FEATURED_MISSION =
  MISSIONS.find((mission) => mission.slug === 'edge-vision') ?? MISSIONS[0];

export const MISSION_CATEGORIES = Array.from(new Set(MISSIONS.map((mission) => mission.category)));

export function adjacentMissions(slug: string): { previous: Mission; next: Mission } {
  const index = MISSIONS.findIndex((mission) => mission.slug === slug);
  const safeIndex = index < 0 ? 0 : index;
  return {
    previous: MISSIONS[(safeIndex - 1 + MISSIONS.length) % MISSIONS.length],
    next: MISSIONS[(safeIndex + 1) % MISSIONS.length],
  };
}

export const CONTENT_PROVENANCE =
  'Figures and outcomes are reproduced from the owner’s existing project record. They have not been independently audited. External links are shown only where a public URL is recorded and was reachable at build time.';

export type { ClientPartner };
