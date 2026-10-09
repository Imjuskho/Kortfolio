import { describe, it, expect } from 'vitest';
import { asset } from './asset';

// BASE_URL is the deploy prefix ('/kortfolio/' in production, '/' under test).
const base = import.meta.env.BASE_URL;

describe('asset()', () => {
  it('prefixes paths with the deployed base URL', () => {
    expect(asset('/assets/x.png')).toBe(`${base}assets/x.png`);
  });

  it('tolerates missing or repeated leading slashes', () => {
    expect(asset('assets/x.png')).toBe(`${base}assets/x.png`);
    expect(asset('///assets/x.png')).toBe(`${base}assets/x.png`);
  });
});
