import { describe, expect, it } from 'vitest';
import { formatZoneClock, formatZoneDelta, zoneOffsetMinutes } from './time';

const instant = new Date('2026-01-01T00:00:00Z');

describe('time helpers', () => {
  it('formats the Lilongwe clock with seconds', () => {
    expect(formatZoneClock(instant)).toBe('02:00:00');
  });

  it('reports Malawi as UTC+2 year round', () => {
    expect(zoneOffsetMinutes('Africa/Blantyre', instant)).toBe(120);
    expect(zoneOffsetMinutes('Africa/Blantyre', new Date('2026-07-01T00:00:00Z'))).toBe(120);
  });

  it('labels the visitor delta readably', () => {
    expect(formatZoneDelta(0)).toBe('your time');
    expect(formatZoneDelta(120)).toBe('+2h');
    expect(formatZoneDelta(-90)).toBe('−1:30h');
  });
});
