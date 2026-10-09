import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Globe2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const [localTime, setLocalTime] = useState('');

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-surface-2 border-t border-border font-mono text-xs text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold">
              KP
            </div>
            <div>
              <span className="text-foreground font-bold tracking-tight text-sm">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-xs text-muted">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>

          {/* Center: System Status & Lilongwe Clock */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>Host Node: MW-LLW-01 (Online)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-muted">
              <Globe2 className="w-3.5 h-3.5 text-faint" />
              <span>{localTime} CAT (Lilongwe)</span>
            </div>
            <span>•</span>
            <button
              onClick={onOpenTerminal}
              className="text-warn hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>kortfolio-cli</span>
            </button>
          </div>

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-surface hover:bg-surface border border-border text-muted hover:text-foreground transition-all flex items-center gap-2 cursor-pointer"
            title="Return to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <div>
            © {new Date().getFullYear()} Kondwani Austin Phanga. Handcrafted with care in Lilongwe, Malawi.
          </div>
          <div className="flex items-center gap-1 text-muted">
            <span>Built with React 19, TypeScript, Tailwind CSS, and a deep respect for real-world constraints.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
