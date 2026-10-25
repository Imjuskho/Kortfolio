import { createContext, useContext } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'missions' }
  | { name: 'mission'; slug: string }
  | { name: 'lab' }
  | { name: 'player' }
  | { name: 'media' }
  | { name: 'contact' }
  | { name: 'notfound' };

export interface LocationState {
  route: Route;
  /** App-relative pathname, always starting with a slash. `/` for home. */
  path: string;
  search: string;
}

export interface RouterValue extends LocationState {
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

export const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** Site-relative href for an internal route (`/missions` → `/kortfolio/missions`). */
export function toHref(to: string, base = BASE_PATH): string {
  if (/^(?:[a-z]+:)?\/\//i.test(to) || /^(?:mailto|tel):/i.test(to)) return to;

  const hashIndex = to.indexOf('#');
  const queryIndex = to.indexOf('?');
  let cut = to.length;
  if (hashIndex >= 0) cut = Math.min(cut, hashIndex);
  if (queryIndex >= 0) cut = Math.min(cut, queryIndex);

  const path = to.slice(0, cut).replace(/^\/+/, '').replace(/\/+$/, '');
  const suffix = to.slice(cut);
  return path ? `${base}/${path}${suffix}` : `${base}/${suffix}`;
}

export function parseRoute(pathname: string, base = BASE_PATH): Route {
  let path = pathname || '/';

  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/';
  }

  path = path.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);

  if (!parts.length) return { name: 'home' };

  switch (parts[0]) {
    case 'missions':
      return parts[1] ? { name: 'mission', slug: parts[1] } : { name: 'missions' };
    case 'lab':
      return { name: 'lab' };
    case 'player':
      return { name: 'player' };
    case 'media':
      return { name: 'media' };
    case 'contact':
      return { name: 'contact' };
    default:
      return { name: 'notfound' };
  }
}

export function routeToPath(route: Route): string {
  switch (route.name) {
    case 'home':
      return '/';
    case 'mission':
      return `/missions/${route.slug}`;
    default:
      return `/${route.name}`;
  }
}

export function readLocation(): LocationState {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const search = typeof window === 'undefined' ? '' : window.location.search;
  return {
    route: parseRoute(pathname),
    path: routeToPath(parseRoute(pathname)),
    search,
  };
}

export const RouterContext = createContext<RouterValue | null>(null);

export function useRouter(): RouterValue {
  const value = useContext(RouterContext);
  if (!value) throw new Error('useRouter must be used inside <RouterProvider>');
  return value;
}
