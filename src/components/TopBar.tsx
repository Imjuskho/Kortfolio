import React, { useEffect, useRef, useState } from 'react';
import { Command, Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { Link } from '../lib/router';
import { useRouter } from '../lib/routerCore';
import { useSound } from '../lib/sfxCore';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { PERSONAL_INFO } from '../data/portfolioData';
import { track } from '../lib/analytics';

const NAV_ITEMS = [
  { to: '/missions', label: 'Missions', code: '01' },
  { to: '/lab', label: 'Tech Lab', code: '02' },
  { to: '/player', label: 'Player File', code: '03' },
  { to: '/media', label: 'Media Archive', code: '04' },
  { to: '/contact', label: 'Contact', code: '05' },
];

function isActive(pathname: string, to: string): boolean {
  if (to === '/missions') return pathname.startsWith('/missions');
  return pathname === to;
}

export const TopBar: React.FC<{ onOpenCommand: () => void }> = ({ onOpenCommand }) => {
  const { path } = useRouter();
  const { enabled, toggle, play, trackTitle, trackArtist } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightMode, setLightMode] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light',
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useDialogA11y(mobileOpen, () => setMobileOpen(false), closeButtonRef);

  useEffect(() => {
    if (!mobileOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  const handleSound = () => {
    play('toggle');
    toggle();
    if (!enabled) track('sound_enabled', { enabled: true });
  };

  const handleTheme = () => {
    play('toggle');
    const next = !lightMode;
    setLightMode(next);
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    try {
      localStorage.setItem('kortfolio-theme', next ? 'light' : 'dark');
    } catch {
      // Theme preference is optional.
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-void/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex min-h-11 items-center gap-3"
            aria-label="KORTFOLIO — return to start screen"
          >
            <span className="relative flex h-8 w-8 items-center justify-center border border-line-mint bg-mint/10 font-pixel text-[11px] text-mint">
              K
              <span className="absolute -right-px -top-px h-1.5 w-1.5 bg-mint" aria-hidden="true" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-pixel text-[11px] tracking-[0.14em] text-ink">KORTFOLIO</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Systems / Story / Craft
              </span>
            </span>
          </Link>

          <div className="ml-2 hidden items-center gap-1.5 border-l border-line pl-4 xl:flex">
            <span className="status-dot" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">Interface online</span>
          </div>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link"
                aria-current={isActive(path, item.to) ? 'page' : undefined}
                onClick={() => play('move')}
              >
                <span className="font-mono text-[10px] tracking-normal text-faint" aria-hidden="true">
                  {item.code}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
            <button
              type="button"
              className="icon-btn hidden sm:inline-flex"
              onClick={() => {
                play('open');
                onOpenCommand();
              }}
              aria-label="Open command menu (Control or Command K)"
              title="Command menu (⌘K)"
            >
              <Command className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1 font-mono text-[10px]">K</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={handleTheme}
              aria-pressed={lightMode}
              aria-label={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
              title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {lightMode ? <Moon className="h-4 w-4" aria-hidden="true" /> : <Sun className="h-4 w-4" aria-hidden="true" />}
            </button>
            {enabled && (
              <button
                type="button"
                onClick={handleSound}
                className="group hidden items-center gap-2 rounded-xs border border-line-mint/30 bg-mint/5 px-2.5 py-1 text-left transition-colors hover:border-line-mint hover:bg-mint/10 md:flex"
                title={`Soundtrack: ${trackTitle} by ${trackArtist} — Click to mute`}
                aria-label={`Soundtrack active: ${trackTitle} by ${trackArtist}. Click to mute`}
              >
                <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
                  <span className="w-0.5 rounded-full bg-mint animate-eq-1" />
                  <span className="w-0.5 rounded-full bg-mint animate-eq-2" />
                  <span className="w-0.5 rounded-full bg-mint animate-eq-3" />
                  <span className="w-0.5 rounded-full bg-mint animate-eq-4" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-mint">
                    BGM · {trackTitle}
                  </span>
                  <span className="font-mono text-[8px] tracking-wider text-faint group-hover:text-ink">
                    {trackArtist}
                  </span>
                </div>
              </button>
            )}
            <button
              type="button"
              className={`icon-btn relative ${enabled ? 'border-line-mint text-mint' : ''}`}
              onClick={handleSound}
              aria-pressed={enabled}
              aria-label={enabled ? 'Disable interface sound' : 'Enable interface sound (off by default)'}
              title={enabled ? `Sound on — ${trackTitle} playing` : 'Sound off — click to enable'}
            >
              {enabled ? (
                <>
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                </>
              ) : (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <Link
              to="/contact"
              className="btn hidden min-h-10 px-4 md:inline-flex"
              onClick={() => play('click')}
            >
              Hire / Contact
            </Link>
            <button
              type="button"
              className="icon-btn lg:hidden"
              onClick={() => {
                play('open');
                setMobileOpen(true);
              }}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-mint/35 to-transparent" aria-hidden="true" />
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] bg-void-deep/98 lg:hidden">
          <div
            ref={dialogRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="flex h-full flex-col"
            tabIndex={-1}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <span id="mobile-navigation-title" className="hud-label text-mint">
                Navigation Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-btn"
                onClick={() => {
                  play('close');
                  setMobileOpen(false);
                }}
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-4 py-8">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex min-h-16 items-center justify-between gap-4 border-b border-line px-1 py-4 transition-colors hover:text-mint"
                      aria-current={isActive(path, item.to) ? 'page' : undefined}
                      onClick={() => {
                        play('open');
                        setMobileOpen(false);
                      }}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-faint">{item.code}</span>
                        <span className="font-display text-2xl font-semibold uppercase tracking-tight">
                          {item.label}
                        </span>
                      </span>
                      <span className="text-mint" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-8 flex min-h-11 w-full items-center justify-center gap-2 border border-line px-4 font-mono text-xs uppercase tracking-wider text-muted"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommand();
                }}
              >
                <Command className="h-4 w-4" aria-hidden="true" />
                Command menu
              </button>

              <div className="mt-8 border border-line bg-panel-2 p-4">
                <p className="meta-label">Direct channel</p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="mt-2 block break-all text-sm text-mint underline-offset-4 hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
                <p className="mt-2 text-xs text-faint">Lilongwe, Malawi · /kortfolio</p>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
};
