import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Globe2, ShieldCheck, Heart } from 'lucide-react';
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
    <footer className="py-12 bg-[#040609] border-t border-white/5 font-mono text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              KP
            </div>
            <div>
              <span className="text-white font-bold tracking-tight text-sm">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-[11px] text-slate-400">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>

          {/* Center: System Status & Lilongwe Clock */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Host Node: MW-LLW-01 (Online)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{localTime} CAT (Lilongwe)</span>
            </div>
            <span>•</span>
            <button
              onClick={onOpenTerminal}
              className="text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3 h-3" />
              <span>kortfolio-cli</span>
            </button>
          </div>

          {/* Right: Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            title="Return to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Kondwani Austin Phanga. Handcrafted with care in Lilongwe, Malawi.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with React 19, TypeScript, Tailwind CSS, and a deep respect for real-world constraints.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
