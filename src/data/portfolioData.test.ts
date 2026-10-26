import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { CLIENT_PARTNERS, PERSONAL_INFO, PROJECTS, PHOTOGRAPHY_GALLERY, BRAND_DIMENSIONS, BRAND_DIMENSIONS_INTRO } from './portfolioData';

const publicDir = resolve(process.cwd(), 'public');

describe('portfolio data integrity', () => {
  it('every client logo points at a file that exists in public/', () => {
    for (const partner of CLIENT_PARTNERS) {
      if (!partner.logo) continue;
      const file = resolve(publicDir, partner.logo.replace(/^\/+/, ''));
      expect(existsSync(file), `missing logo for ${partner.name}: ${partner.logo}`).toBe(true);
    }
  });

  it('brand dimensions provide complete four-dimensional identity data', () => {
    expect(BRAND_DIMENSIONS).toHaveLength(4);
    const expectedIds = ['person', 'builder', 'creative', 'entrepreneur'];
    expect(BRAND_DIMENSIONS.map((d) => d.id)).toEqual(expectedIds);

    for (const dim of BRAND_DIMENSIONS) {
      expect(dim.id).toBeTruthy();
      expect(dim.label).toMatch(/^0[1-4] \//);
      expect(dim.heading).toBeTruthy();
      expect(dim.body).toBeTruthy();
      expect(['compass', 'terminal', 'clapperboard', 'globe']).toContain(dim.icon);
    }

    expect(BRAND_DIMENSIONS_INTRO.eyebrow).toBe('BEYOND THE PORTFOLIO');
    expect(BRAND_DIMENSIONS_INTRO.heading).toBe('Four sides of how I build.');
    expect(BRAND_DIMENSIONS_INTRO.supportingCopy).toContain('Curiosity drives the ideas');
    expect(BRAND_DIMENSIONS_INTRO.philosophyLabel).toBe('THE UNDERLYING PHILOSOPHY');
    expect(BRAND_DIMENSIONS_INTRO.philosophyStatement).toContain('curiosity meets execution');
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

  it('personal info includes active social and creative channels', () => {
    expect(PERSONAL_INFO.github).toContain('github.com');
    expect(PERSONAL_INFO.linkedin).toContain('linkedin.com');
    expect(PERSONAL_INFO.instagram).toContain('instagram.com');
    expect(PERSONAL_INFO.soundcloud).toBe('https://soundcloud.com/kay-phanga');
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
