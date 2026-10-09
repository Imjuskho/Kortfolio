import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLIENT_PARTNERS, PERSONAL_INFO, PROJECTS } from './portfolioData';

const publicDir = resolve(process.cwd(), 'public');

describe('portfolio data integrity', () => {
  it('every client logo points at a file that exists in public/', () => {
    for (const partner of CLIENT_PARTNERS) {
      if (!partner.logo) continue;
      const file = resolve(publicDir, partner.logo.replace(/^\/+/, ''));
      expect(existsSync(file), `missing logo for ${partner.name}: ${partner.logo}`).toBe(true);
    }
  });

  it('every impact stat exposes the fields the UI depends on', () => {
    expect(PERSONAL_INFO.stats.length).toBeGreaterThan(0);
    for (const stat of PERSONAL_INFO.stats) {
      expect(stat.tag, 'tag').toBeTruthy();
      expect(stat.value, 'value').toBeTruthy();
      expect(stat.label, 'label').toBeTruthy();
      expect(stat.detail, 'detail').toBeTruthy();
    }
  });

  it('projects have unique ids and preview imagery', () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of PROJECTS) {
      expect(project.title).toBeTruthy();
      expect(project.category).toBeTruthy();
    }
  });
});
