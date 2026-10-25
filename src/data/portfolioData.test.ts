import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLIENT_PARTNERS, PERSONAL_INFO, PROJECTS, PHOTOGRAPHY_GALLERY } from './portfolioData';

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

  it('every gallery photo points at a file that exists in public/', () => {
    const ids = PHOTOGRAPHY_GALLERY.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const photo of PHOTOGRAPHY_GALLERY) {
      const file = resolve(publicDir, photo.url.replace(/^\/+/, ''));
      expect(existsSync(file), `missing photo ${photo.id}: ${photo.url}`).toBe(true);
    }
  });

  it('origin narrative has 5 chronological stages with complete storytelling data', async () => {
    const { ORIGIN_STAGES } = await import('./portfolioData');
    expect(ORIGIN_STAGES).toHaveLength(5);

    const stages = ORIGIN_STAGES.map((s) => s.stage);
    expect(stages).toEqual([
      'Curiosity',
      'Experimentation',
      'Perspective',
      'Building',
      'Possibility',
    ]);

    for (const stage of ORIGIN_STAGES) {
      expect(stage.id).toBeTruthy();
      expect(stage.period).toBeTruthy();
      expect(stage.title).toBeTruthy();
      expect(stage.narrative.length).toBeGreaterThan(60);
      expect(stage.takeaway.length).toBeGreaterThan(20);
      expect(stage.tags.length).toBeGreaterThan(0);
    }

    // Specific verifiable narrative anchors
    const curiosity = ORIGIN_STAGES.find((s) => s.stage === 'Curiosity')!;
    expect(curiosity.narrative).toMatch(/Toshiba Satellite/i);
    expect(curiosity.narrative).toMatch(/chatbot written in C/i);

    const perspective = ORIGIN_STAGES.find((s) => s.stage === 'Perspective')!;
    expect(perspective.narrative).toMatch(/Spotify/i);
    expect(perspective.narrative).toMatch(/rejected/i);
  });
});
