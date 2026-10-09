import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  Camera,
  Check,
  Copy,
  Cpu,
  Globe2,
  Layers,
  Mail,
  Menu,
  Moon,
  Server,
  Sparkles,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { useTheme } from '../hooks/useTheme';
import { useActiveSection } from '../hooks/useActiveSection';
import { formatZoneClock, formatZoneDelta, zoneOffsetMinutes } from '../lib/time';

interface NavbarProps {
  onOpenTerminal: () => void;
}

interface NavItem {
  id: string;
  label: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'projects', label: 'Selected Work', short: 'Work', icon: Layers, accent: 'text-accent' },
  { id: 'architecture-lab', label: 'Interactive Lab', short: 'Lab', icon: Cpu, accent: 'text-warn' },
  { id: 'journey', label: 'My Journey', short: 'Journey', icon: Server, accent: 'text-info' },
  { id: 'photography', label: 'Field Stories', short: 'Photos', icon: Camera, accent: 'text-violet' },
  { id: 'skills', label: 'Tools & Craft', short: 'Skills', icon: Sparkles, accent: 'text-teal' },
];

const SPY_IDS = [...NAV_ITEMS.map((i) => i.id), 'contact'];

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const iconButton =
  'flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 hover:bg-foreground/5 text-muted hover:text-foreground border border-border hover:border-accent/40 transition-all cursor-pointer';

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [time, setTime] = useState('--:--:--');
  const [delta, setDelta] = useState('your time');
  const [copied, setCopied] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(SPY_IDS);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const activeItem = NAV_ITEMS.find((i) => i.id === activeSection);
  const activeLabel = activeSection === 'contact' ? 'Contact' : activeItem?.label ?? null;

  // Condense the bar once the page has scrolled away from the top.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Live Lilongwe clock + how far it is from the visitor's own time.
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(formatZoneClock(now));
      const visitorOffset = -now.getTimezoneOffset();
      setDelta(formatZoneDelta(zoneOffsetMinutes('Africa/Blantyre', now) - visitorOffset));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section tick marks for the reading-progress rail.
  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setTicks([]);
        return;
      }
      setTicks(
        SPY_IDS.map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return Math.min(1, Math.max(0, (el.offsetTop - 90) / max));
        }).filter((n): n is number => n !== null),
      );
    };
    measure();
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 1800);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, [activeSection]);

  // Mobile sheet: Escape to close + lock background scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className={iconButton}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-[0_8px_30px_-14px_var(--shadow-strong)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">

          {/* Brand lockup */}
          <a
            href="#"
            onClick={scrollTop}
            aria-label="Back to top — Kondwani Austin Phanga"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-teal/10 border border-accent/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-accent group-hover:shadow-[0_0_15px_var(--glow)]">
              <img
                src={asset('/assets/profile/kondwani.png')}
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/30">
                  MW
                </span>
              </div>
              <div className="h-4 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={activeLabel ?? 'tagline'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="text-xs text-muted font-mono tracking-tight flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full bg-accent shrink-0 ${
                        activeLabel ? '' : 'animate-pulse'
                      }`}
                    />
                    {activeLabel ? (
                      <span className="text-accent/90">▸ {activeLabel}</span>
                    ) : (
                      <span>Systems Builder &amp; Storyteller</span>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </a>

          {/* Center navigation with sliding active indicator */}
          <nav
            aria-label="Primary"
            className="relative hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-surface/70 border border-border backdrop-blur-sm"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? 'true' : undefined}
                  title={item.label}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                    active ? 'text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-foreground/[0.06] border border-accent/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <item.icon className={`relative w-3.5 h-3.5 ${item.accent}`} />
                  <span className="relative">{item.short}</span>
                </a>
              );
            })}
          </nav>

          {/* Right action cluster */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <div
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-muted"
              title={`Lilongwe time — your clock is ${delta} vs here`}
            >
              <Globe2 className="w-3.5 h-3.5 text-accent" />
              <span className="tabular-nums text-foreground/90">{time}</span>
              <span className="text-faint">CAT</span>
            </div>

            <div className="hidden xl:flex items-center gap-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className={iconButton}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0a66c2] dark:text-[#38bdf8] border border-[#0077b5]/40 transition-all cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <button
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : `Copy email ${PERSONAL_INFO.email}`}
                title={copied ? 'Copied' : `Copy email — ${PERSONAL_INFO.email}`}
                className={iconButton}
              >
                {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {themeToggle}

            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 text-xs font-mono transition-all hover:border-accent hover:shadow-[0_0_12px_var(--glow)] cursor-pointer group"
              title="Open Kortfolio CLI (⌘K / Ctrl+K)"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold">CLI</span>
              <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-background/60 text-accent/80 border border-accent/20 group-hover:border-accent/40 font-mono">
                ⌘K
              </kbd>
            </button>

            <a
              href="#contact"
              aria-current={activeSection === 'contact' ? 'true' : undefined}
              className={`px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5 ${
                activeSection === 'contact' ? 'ring-2 ring-accent/50 ring-offset-2 ring-offset-background' : ''
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </a>
          </div>

          {/* Mobile cluster */}
          <div className="flex lg:hidden items-center gap-2">
            {themeToggle}
            <button
              onClick={onOpenTerminal}
              aria-label="Open Kortfolio CLI"
              className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/30 text-xs font-mono"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="p-2 rounded-lg bg-surface border border-border text-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Click-outside catcher for the mobile sheet */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 -z-10"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 rounded-2xl border border-border bg-surface/95 backdrop-blur-md p-3 shadow-2xl"
            >
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-border">
                <span className="text-[10px] font-mono uppercase tracking-widest text-faint">
                  Navigate
                </span>
                <span className="text-[10px] font-mono text-faint tabular-nums">
                  Lilongwe {time.slice(0, 5)} · {delta}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'true' : undefined}
                      className={`px-3 py-2.5 rounded-xl flex items-center gap-2.5 text-sm transition-colors border ${
                        active
                          ? 'bg-accent/10 text-accent border-accent/20'
                          : 'text-muted hover:text-foreground hover:bg-foreground/5 border-transparent'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${item.accent}`} />
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-xs font-mono text-muted hover:text-foreground flex items-center gap-2"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="px-3 py-2 rounded-xl bg-accent/10 text-accent border border-accent/30 flex items-center gap-2 text-sm font-mono"
                >
                  <Terminal className="w-4 h-4" /> CLI
                </button>
                <button
                  onClick={copyEmail}
                  className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-muted hover:text-foreground flex items-center gap-2 text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Email'}
                </button>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-surface-2 border border-border text-muted hover:text-foreground flex items-center gap-2 text-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 w-full text-center py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Say Hello
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Reading progress rail with section ticks */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/50 overflow-hidden">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400"
        />
        {ticks.map((f, i) => (
          <span
            key={i}
            style={{ left: `${f * 100}%` }}
            className="absolute top-0 h-full w-[2px] -translate-x-1/2 bg-foreground/25"
          />
        ))}
      </div>
    </header>
  );
};
