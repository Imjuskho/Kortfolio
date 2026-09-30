import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Sparkles, BookOpen, Camera, Layers, Mail, Menu, X, Globe2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090b10]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <img
                src="/assets/profile/kondwani.png"
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  MW 🇲🇼
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono tracking-tight flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Systems Architect & AI</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0f141f]/70 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <a 
              href="#projects" 
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Projects
            </a>
            <a 
              href="#architecture-lab" 
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Engineering Lab
            </a>
            <a 
              href="#research" 
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              Research & Vision
            </a>
            <a 
              href="#photography" 
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5 text-purple-400" />
              Visual Archive
            </a>
            <a 
              href="#skills" 
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Stack
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Telemetry Clock */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-slate-400">
              <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lilongwe: {localTime} CAT</span>
            </div>

            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] cursor-pointer"
              title="Open Kortfolio CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">CLI</span>
            </button>

            {/* LinkedIn Link */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0077b5]/15 hover:bg-[#0077b5]/25 text-[#38bdf8] border border-[#0077b5]/40 text-xs font-mono transition-all hover:border-[#38bdf8] cursor-pointer"
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
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 bg-[#0f141f] rounded-2xl p-4 shadow-xl">
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a 
                href="#projects" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                Featured Projects
              </a>
              <a 
                href="#architecture-lab" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                Engineering Lab
              </a>
              <a 
                href="#research" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                Research Manifesto
              </a>
              <a 
                href="#photography" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-purple-400" />
                Visual Archive
              </a>
              <a 
                href="#skills" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                Technical Stack
              </a>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg"
                >
                  Contact Kondwani
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
