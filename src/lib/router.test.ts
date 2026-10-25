import { describe, expect, it } from 'vitest';
import { parseRoute, routeToPath, toHref } from './routerCore';

describe('router', () => {
  it('maps the deployed base path and home route', () => {
    expect(parseRoute('/kortfolio/', '/kortfolio')).toEqual({ name: 'home' });
    expect(parseRoute('/kortfolio', '/kortfolio')).toEqual({ name: 'home' });
  });

  it('maps every top-level destination', () => {
    expect(parseRoute('/kortfolio/missions', '/kortfolio')).toEqual({ name: 'missions' });
    expect(parseRoute('/kortfolio/missions/', '/kortfolio')).toEqual({ name: 'missions' });
    expect(parseRoute('/kortfolio/lab', '/kortfolio')).toEqual({ name: 'lab' });
    expect(parseRoute('/kortfolio/player', '/kortfolio')).toEqual({ name: 'player' });
    expect(parseRoute('/kortfolio/media', '/kortfolio')).toEqual({ name: 'media' });
    expect(parseRoute('/kortfolio/contact', '/kortfolio')).toEqual({ name: 'contact' });
  });

  it('extracts a mission slug and tolerates a trailing slash', () => {
    expect(parseRoute('/kortfolio/missions/edge-vision', '/kortfolio')).toEqual({
      name: 'mission',
      slug: 'edge-vision',
    });
    expect(parseRoute('/kortfolio/missions/edge-vision/', '/kortfolio')).toEqual({
      name: 'mission',
      slug: 'edge-vision',
    });
  });

  it('returns notfound for unknown routes', () => {
    expect(parseRoute('/kortfolio/unknown', '/kortfolio')).toEqual({ name: 'notfound' });
  });

  it('round-trips route paths', () => {
    expect(routeToPath({ name: 'home' })).toBe('/');
    expect(routeToPath({ name: 'missions' })).toBe('/missions');
    expect(routeToPath({ name: 'mission', slug: 'bawo' })).toBe('/missions/bawo');
  });

  it('prefixes internal hrefs and leaves external ones untouched', () => {
    expect(toHref('/missions', '/kortfolio')).toBe('/kortfolio/missions');
    expect(toHref('/contact?project=bawo', '/kortfolio')).toBe('/kortfolio/contact?project=bawo');
    expect(toHref('/missions/edge-vision#evidence', '/kortfolio')).toBe('/kortfolio/missions/edge-vision#evidence');
    expect(toHref('https://github.com/imjuskho', '/kortfolio')).toBe('https://github.com/imjuskho');
    expect(toHref('mailto:kayphanga@gmail.com', '/kortfolio')).toBe('mailto:kayphanga@gmail.com');
  });
});
