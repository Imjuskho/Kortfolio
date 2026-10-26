import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Camera,
  Cpu,
  Crosshair,
  Mail,
  Play,
  UserRound,
} from 'lucide-react';
import { GameWorld } from '../components/GameWorld';
import { Link } from '../lib/router';
import { useRouter } from '../lib/routerCore';
import { MISSIONS } from '../data/missions';
import { PERSONAL_INFO } from '../data/portfolioData';
import { track } from '../lib/analytics';
import { useSound } from '../lib/sfxCore';

const MENU = [
  {
    to: '/missions',
    code: '01',
    label: 'Missions',
    hint: 'Project case studies',
    icon: Crosshair,
    event: 'missions_opened' as const,
  },
  {
    to: '/lab',
    code: '02',
    label: 'Tech Lab',
    hint: 'Interactive systems',
    icon: Cpu,
    event: 'lab_opened' as const,
  },
  {
    to: '/player',
    code: '03',
    label: 'Player File',
    hint: 'Career, education, capabilities',
    icon: UserRound,
    event: null,
  },
  {
    to: '/media',
    code: '04',
    label: 'Media Archive',
    hint: 'Photography & documentary',
    icon: Camera,
    event: null,
  },
  {
    to: '/contact',
    code: '05',
    label: 'Contact',
    hint: 'Start the next mission',
    icon: Mail,
    event: 'contact_started' as const,
  },
];

const INTRO_KEY = 'kortfolio-intro-seen';

export const HomeView: React.FC = () => {
  const { navigate } = useRouter();
  const { play } = useSound();
  const [activeIndex, setActiveIndex] = useState(0);
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return (
        sessionStorage.getItem(INTRO_KEY) === 'yes' ||
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      );
    } catch {
      return true;
    }
  });
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const introTracked = useRef(false);

  useEffect(() => {
    if (introDone) return;
    if (!introTracked.current) {
      introTracked.current = true;
      track('intro_shown');
    }
    const timer = window.setTimeout(() => {
      setIntroDone(true);
      try {
        sessionStorage.setItem(INTRO_KEY, 'yes');
      } catch {
        // Session storage is optional.
      }
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [introDone]);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    track('intro_skipped');
    try {
      sessionStorage.setItem(INTRO_KEY, 'yes');
    } catch {
      // Session storage is optional.
    }
  }, []);

  const focusItem = (index: number) => {
    const next = (index + MENU.length) % MENU.length;
    setActiveIndex(next);
    itemRefs.current[next]?.focus();
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
      event.preventDefault();
      play('move');
      focusItem(activeIndex + 1);
    } else if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
      event.preventDefault();
      play('move');
      focusItem(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(MENU.length - 1);
    }
  };

  const handleStart = () => {
    play('open');
    track('missions_opened', { surface: 'start' });
    navigate('/missions');
  };

  return (
    <div className="relative">
      <GameWorld />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <section aria-labelledby="home-title" className="max-w-3xl">
            <div
              className={`mb-6 flex flex-wrap items-center gap-2 ${introDone ? '' : 'intro-reveal'}`}
              style={introDone ? undefined : { animation: 'intro-in 600ms cubic-bezier(0.16,1,0.3,1) both' }}
            >
              <span className="tag tag-mint">
                <span className="status-dot" aria-hidden="true" />
                Press start to explore
              </span>
              <span className="tag">SYS / ONLINE</span>
              <span className="tag">LLW / MW</span>
            </div>

            <h1 id="home-title" className="relative">
              <span className="sr-only">
                KORTFOLIO — the portfolio of Kondwani Austin Phanga, Computer Engineer and Creative Director
              </span>
              <span
                aria-hidden="true"
                className="glitch-text display-xl block text-ink"
                style={introDone ? undefined : { animation: 'intro-in 800ms cubic-bezier(0.16,1,0.3,1) 80ms both' }}
              >
                KORT<span className="text-mint">FOLIO</span>
              </span>
            </h1>

            <div className="mt-7 max-w-2xl rounded-r-sm border-y border-r border-line/40 border-l-2 border-line-mint bg-void/85 p-5 shadow-2xl backdrop-blur-md dark:bg-void/80 sm:p-6">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                {PERSONAL_INFO.name}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-mint">
                Computer Engineer · Creative Director
              </p>
              <p className="body-copy mt-4 max-w-xl text-base font-medium text-ink/90 dark:text-ink/85">
                “Building systems. Engineering ideas. Creating experiences.”
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                A decade architecting high-availability infrastructure, edge AI, and offline-first mobile money systems —
                engineered in Malawi for international organizations, founders, and enterprises where reliability under real constraints is mandatory.
              </p>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
              style={introDone ? undefined : { animation: 'intro-in 700ms cubic-bezier(0.16,1,0.3,1) 340ms both' }}
            >
              <button type="button" className="btn min-w-44" onClick={handleStart}>
                <Play className="h-4 w-4" aria-hidden="true" />
                Start game
              </button>
              <Link
                to="/missions"
                className="btn btn-secondary"
                onClick={() => {
                  play('select');
                  track('missions_opened', { surface: 'home_secondary' });
                }}
              >
                View projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="btn btn-ghost border border-line"
                onClick={() => {
                  play('select');
                  track('contact_started', { surface: 'home' });
                }}
              >
                Hire / Contact
              </Link>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-2"
              style={introDone ? undefined : { animation: 'intro-in 700ms cubic-bezier(0.16,1,0.3,1) 440ms both' }}
            >
              <span className="tag font-mono text-[11px]">{MISSIONS.length} mission records</span>
              <span className="tag font-mono text-[11px]">10+ years in production</span>
              <span className="tag tag-mint font-mono text-[11px]">Available for advisory & builds</span>
            </div>
          </section>

          <section
            aria-labelledby="main-menu-title"
            className="pixel-panel scan-sweep relative w-full max-w-md justify-self-start p-4 sm:p-5 lg:justify-self-end"
            style={introDone ? undefined : { animation: 'pixel-pop 700ms cubic-bezier(0.16,1,0.3,1) 300ms both' }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
              <div>
                <p className="hud-label text-mint">Main menu</p>
                <h2 id="main-menu-title" className="mt-1 font-display text-lg font-semibold text-ink">
                  Select destination
                </h2>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-faint">v2.6</span>
            </div>

            <ul className="space-y-1.5" onKeyDown={handleMenuKeyDown} aria-label="Main menu destinations">
              {MENU.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      ref={(element) => {
                        itemRefs.current[index] = element;
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => {
                        play('open');
                        if (item.event) track(item.event, { surface: 'menu', destination: item.to });
                      }}
                      className={`group flex min-h-14 items-center gap-3 border px-3 py-2.5 transition-all ${
                        activeIndex === index
                          ? 'border-line-mint bg-mint/10 text-ink shadow-sm'
                          : 'border-line bg-panel/50 text-muted hover:border-line-strong hover:bg-panel/80 hover:text-ink'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border transition-colors ${
                          activeIndex === index ? 'border-mint/40 text-mint' : 'border-line text-faint group-hover:text-muted'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2">
                          <span
                            className={`font-mono text-[10px] transition-colors ${
                              activeIndex === index ? 'text-mint' : 'text-faint group-hover:text-muted'
                            }`}
                          >
                            {item.code}
                          </span>
                          <span className="font-display text-sm font-bold uppercase tracking-[0.06em]">
                            {item.label}
                          </span>
                        </span>
                        <span
                          className={`mt-0.5 block truncate text-xs transition-colors ${
                            activeIndex === index ? 'text-ink/80' : 'text-muted group-hover:text-ink'
                          }`}
                        >
                          {item.hint}
                        </span>
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 flex-shrink-0 transition-transform ${
                          activeIndex === index ? 'translate-x-0.5 text-mint' : 'text-faint group-hover:text-muted'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
              <span>↑↓ select · Enter open</span>
              <span>⌘K jump</span>
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
          <span>KORTFOLIO OS · build 2026.10</span>
          <span className="text-muted">A working record, not a highlight reel.</span>
        </div>
      </div>

      {!introDone ? (
        <div className="fixed bottom-4 left-4 z-40 w-[min(22rem,calc(100vw-2rem))] border border-line bg-void-deep/95 p-3 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mint">Booting interface</span>
            </div>
            <button
              type="button"
              onClick={finishIntro}
              className="min-h-9 border border-line px-2.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
            >
              Skip intro
            </button>
          </div>
          <div className="mt-2 h-0.5 w-full bg-line">
            <div className="h-full w-2/3 bg-mint" style={{ animation: 'scan 1.8s linear infinite' }} />
          </div>
          <p className="mt-2 text-[11px] leading-snug text-faint">
            The interface is already live — explore immediately.
          </p>
        </div>
      ) : null}
    </div>
  );
};
