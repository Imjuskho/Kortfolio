import React, { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { RouterProvider, type Route } from './lib/router';
import { toHref, useRouter } from './lib/routerCore';
import { SoundProvider } from './lib/sfx';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { applyRouteMeta } from './lib/seo';
import { getMission } from './data/missions';
import { HomeView } from './views/HomeView';

const MissionsView = lazy(() => import('./views/MissionsView').then((m) => ({ default: m.MissionsView })));
const MissionView = lazy(() => import('./views/MissionView').then((m) => ({ default: m.MissionView })));
const TechLabView = lazy(() => import('./views/TechLabView').then((m) => ({ default: m.TechLabView })));
const PlayerView = lazy(() => import('./views/PlayerView').then((m) => ({ default: m.PlayerView })));
const MediaView = lazy(() => import('./views/MediaView').then((m) => ({ default: m.MediaView })));
const ContactView = lazy(() => import('./views/ContactView').then((m) => ({ default: m.ContactView })));
const NotFoundView = lazy(() => import('./views/NotFoundView').then((m) => ({ default: m.NotFoundView })));

function routeLabel(route: Route): string {
  switch (route.name) {
    case 'home':
      return 'KORTFOLIO start screen';
    case 'missions':
      return 'Mission select';
    case 'mission':
      return getMission(route.slug)?.title ?? 'Mission record missing';
    case 'lab':
      return 'Tech Lab';
    case 'player':
      return 'Player File';
    case 'media':
      return 'Media Archive';
    case 'contact':
      return 'Contact and next mission';
    default:
      return 'Signal lost';
  }
}

const RouteView: React.FC<{ route: Route; search: string }> = ({ route, search }) => {
  switch (route.name) {
    case 'home':
      return <HomeView />;
    case 'missions':
      return <MissionsView />;
    case 'mission':
      return <MissionView slug={route.slug} />;
    case 'lab':
      return <TechLabView />;
    case 'player':
      return <PlayerView />;
    case 'media':
      return <MediaView />;
    case 'contact':
      return <ContactView key={search} />;
    default:
      return <NotFoundView />;
  }
};

const RouteFallback: React.FC = () => (
  <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-hidden="true">
    <div className="h-3 w-32 animate-pulse bg-panel-3" />
    <div className="mt-5 h-12 w-2/3 max-w-xl animate-pulse bg-panel-2" />
    <div className="mt-4 h-4 w-full max-w-2xl animate-pulse bg-panel-2" />
    <div className="mt-2 h-4 w-4/5 max-w-xl animate-pulse bg-panel-2" />
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-44 animate-pulse border border-line bg-panel-2/60" />
      ))}
    </div>
  </div>
);

class RouteErrorBoundary extends React.Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    if (import.meta.env.DEV) {
      console.error('KORTFOLIO route failure', error);
    }
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16 sm:px-6">
          <div className="pixel-panel p-7 sm:p-10">
            <p className="hud-label text-amber">System fault / route contained</p>
            <h1 className="display-md mt-3 text-ink">This screen failed to load.</h1>
            <p className="body-copy mt-3 max-w-xl">
              The rest of the archive is still available. Reload the page, or return to the start screen and pick
              another destination.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="btn" onClick={() => window.location.reload()}>
                Reload interface
              </button>
              <a href={toHref('/')} className="btn btn-secondary">
                Start screen
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppShell: React.FC = () => {
  const { route, path, search } = useRouter();
  const [commandOpen, setCommandOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    applyRouteMeta(route);
  }, [route]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setAnnouncement(`Navigated to ${routeLabel(route)}`);

    const focusTimer = window.setTimeout(() => {
      mainRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => window.clearTimeout(focusTimer);
    // `path` identifies the route destination; search-only changes must not
    // move focus or scroll the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex min-h-svh flex-col bg-void text-ink">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <TopBar onOpenCommand={() => setCommandOpen(true)} />

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="min-h-[70svh] flex-1 focus:outline-none"
      >
        <Suspense fallback={<RouteFallback />}>
          <RouteErrorBoundary key={path}>
            <div key={`${path}${search}`} className="route-enter">
              <RouteView route={route} search={search} />
            </div>
          </RouteErrorBoundary>
        </Suspense>
      </main>

      <Footer />

      <CommandPalette
        key={commandOpen ? 'open' : 'closed'}
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <RouterProvider>
      <SoundProvider>
        <AppShell />
      </SoundProvider>
    </RouterProvider>
  );
}

export default App;
