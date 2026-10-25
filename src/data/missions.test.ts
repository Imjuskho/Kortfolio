import { describe, expect, it } from 'vitest';
import { MISSIONS, FEATURED_MISSION, adjacentMissions, getMission } from './missions';

describe('mission model', () => {
  it('exposes a unique slug and mission code for every record', () => {
    const slugs = MISSIONS.map((mission) => mission.slug);
    const codes = MISSIONS.map((mission) => mission.code);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(codes).size).toBe(codes.length);
    expect(MISSIONS.length).toBeGreaterThan(0);
  });

  it('only publishes http(s) links', () => {
    for (const mission of MISSIONS) {
      for (const link of mission.links) {
        expect(link.href, `${mission.slug} ${link.label}`).toMatch(/^https?:\/\//i);
      }
    }
  });

  it('keeps the featured mission resolvable', () => {
    expect(FEATURED_MISSION).toBeDefined();
    expect(getMission(FEATURED_MISSION.slug)).toBe(FEATURED_MISSION);
  });

  it('wraps adjacent mission navigation', () => {
    const first = MISSIONS[0];
    const last = MISSIONS[MISSIONS.length - 1];
    expect(adjacentMissions(first.slug).previous.slug).toBe(last.slug);
    expect(adjacentMissions(last.slug).next.slug).toBe(first.slug);
  });
});
