import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Sparkles, Camera, Layers, Mail, Menu, X, Globe2, Server, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Blantyre',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setLocalTime(timeStr);
      } catch {
        setLocalTime('14:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const themeToggle = (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-2 hover:bg-accent/10 text-muted hover:text-accent border border-border hover:border-accent/40 transition-all cursor-pointer"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-background/85 backdrop-blur-md border-b border-border shadow-[0_8px_30px_-14px_var(--shadow-strong)] py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-teal/10 border border-accent/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-accent group-hover:shadow-[0_0_15px_var(--glow)]">
              <img
                src={asset('/assets/profile/kondwani.png')}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/30">
                  MW 🇲🇼
                </span>
              </div>
              <p className="text-xs text-muted font-mono tracking-tight flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                <span>Systems Builder & Storyteller</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface/70 border border-border rounded-full px-4 py-1.5 backdrop-blur-sm">
            <a
              href="#projects"
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-accent" />
              Selected Work
            </a>
            <a
              href="#architecture-lab"
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-warn" />
              Interactive Lab
            </a>
            <a
              href="#journey"
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Server className="w-3.5 h-3.5 text-info" />
              My Journey
            </a>
            <a
              href="#photography"
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-violet" />
              Field Stories
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-foreground/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              Tools & Craft
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Telemetry Clock */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-border text-xs font-mono text-muted">
              <Globe2 className="w-3.5 h-3.5 text-accent" />
              <span>Lilongwe: {localTime} CAT</span>
            </div>

            {/* Theme Toggle */}
            {themeToggle}

            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 text-xs font-mono transition-all hover:border-accent hover:shadow-[0_0_12px_var(--glow)] cursor-pointer group"
              title="Open Kortfolio CLI (⌘K / Ctrl+K)"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold">CLI</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-background/60 text-accent/80 border border-accent/20 group-hover:border-accent/40 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* LinkedIn Link */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0a66c2] dark:text-[#38bdf8] border border-[#0077b5]/40 text-xs font-mono transition-all hover:border-[#0a66c2] dark:hover:border-[#38bdf8] cursor-pointer"
              title="View LinkedIn Profile"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            {themeToggle}
            <button
              onClick={onOpenTerminal}
              aria-label="Open Kortfolio CLI"
              className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/30 text-xs font-mono"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg bg-surface border border-border text-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border bg-surface rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-muted hover:text-accent hover:bg-foreground/5 rounded-lg flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-accent" />
                Selected Work
              </a>
              <a
                href="#architecture-lab"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-muted hover:text-accent hover:bg-foreground/5 rounded-lg flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-warn" />
                Interactive Lab
              </a>
              <a
                href="#journey"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-muted hover:text-accent hover:bg-foreground/5 rounded-lg flex items-center gap-2"
              >
                <Server className="w-4 h-4 text-info" />
                My Journey
              </a>
              <a
                href="#photography"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-muted hover:text-accent hover:bg-foreground/5 rounded-lg flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-violet" />
                Field Stories
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-muted hover:text-accent hover:bg-foreground/5 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal" />
                Tools & Craft
              </a>
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-lg"
                >
                  Say Hello
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
