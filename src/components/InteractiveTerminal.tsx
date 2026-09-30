import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">Kortfolio System CLI v2.6.0 [Host: Lilongwe, Malawi]</p>
          <p className="text-slate-400">Type <span className="text-amber-300 font-bold">'help'</span> to inspect available system commands or <span className="text-amber-300 font-bold">'projects'</span> to list local repositories.</p>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response: React.ReactNode;

    if (lower === 'help') {
      response = (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">Available System Commands:</p>
          <p><span className="text-amber-300 font-bold">whoami</span> — Display Kondwani Phanga's profile, role, and Oxford candidacy</p>
          <p><span className="text-amber-300 font-bold">projects</span> — List all 10 verified local software repositories</p>
          <p><span className="text-amber-300 font-bold">cat &lt;id&gt;</span> — Inspect specific project details (e.g. `cat zisamale`, `cat bawo`)</p>
          <p><span className="text-amber-300 font-bold">metrics</span> — View live field telemetry and impact counters</p>
          <p><span className="text-amber-300 font-bold">stack</span> — Print full engineering and research stack</p>
          <p><span className="text-amber-300 font-bold">contact</span> — Get direct contact details & communication channels</p>
          <p><span className="text-amber-300 font-bold">clear</span> — Clear terminal output buffer</p>
        </div>
      );
    } else if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lower === 'whoami') {
      response = (
        <div className="space-y-1 text-xs text-slate-300">
          <p><strong className="text-white">{PERSONAL_INFO.name}</strong> — {PERSONAL_INFO.title}</p>
          <p className="text-emerald-400">{PERSONAL_INFO.affiliation}</p>
          <p className="text-slate-400">Location: {PERSONAL_INFO.location}</p>
          <p className="mt-2 text-slate-300">{PERSONAL_INFO.bio}</p>
        </div>
      );
    } else if (lower === 'projects') {
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-emerald-400 font-bold">Discovered Software Repositories ({PROJECTS.length} verified):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {PROJECTS.map((p) => (
              <div key={p.id} className="p-2 rounded bg-white/[0.03] border border-white/5">
                <span className="text-amber-300 font-bold">{p.id}</span>
                <span className="text-slate-500 mx-1.5">|</span>
                <span className="text-white">{p.title.split('—')[0]}</span>
                <div className="text-[10px] text-slate-400 truncate">{p.category}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 mt-2">Type `cat &lt;id&gt;` (e.g. `cat zisamale`) to inspect architecture details.</p>
        </div>
      );
    } else if (lower.startsWith('cat ')) {
      const targetId = lower.replace('cat ', '').trim();
      const proj = PROJECTS.find((p) => p.id === targetId || p.title.toLowerCase().includes(targetId));

      if (proj) {
        response = (
          <div className="space-y-2 text-xs p-3 rounded-lg bg-black/40 border border-emerald-500/20">
            <div className="text-emerald-400 font-bold text-sm">{proj.title}</div>
            <div className="text-slate-400 font-mono text-[11px]">{proj.tagline}</div>
            <div className="text-white mt-1">{proj.summary}</div>
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
              <span className="text-slate-400 font-mono">Host Path:</span>
              <code className="text-amber-300">{proj.localPath}</code>
            </div>
          </div>
        );
      } else {
        response = (
          <p className="text-rose-400 text-xs">
            Repository '{targetId}' not found. Type `projects` to list valid IDs.
          </p>
        );
      }
    } else if (lower === 'metrics' || lower === 'stats') {
      response = (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {PERSONAL_INFO.stats.map((s, idx) => (
            <div key={idx} className="p-2 rounded bg-black/40 border border-white/5">
              <div className="text-emerald-400 font-bold text-base">{s.value}</div>
              <div className="text-white text-xs">{s.label}</div>
              <div className="text-slate-400 text-[10px]">{s.detail}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'contact') {
      response = (
        <div className="space-y-1 text-xs text-slate-300">
          <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></p>
          <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.github}</a></p>
          <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-purple-400 underline">{PERSONAL_INFO.linkedin}</a></p>
        </div>
      );
    } else {
      response = (
        <p className="text-rose-400 text-xs">
          Command not recognized: '{cmd}'. Type <span className="text-amber-300 font-bold">'help'</span> for list of commands.
        </p>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl rounded-2xl glass-panel bg-[#0a0d15] border border-emerald-500/30 shadow-2xl overflow-hidden z-10 flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#07090e] border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">kortfolio-cli</span>
            <span className="text-slate-600">@</span>
            <span className="text-slate-400">macbook-air-mw:~</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="px-2 py-0.5 rounded text-[10px] text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="text-slate-500">kortfolio&gt;</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-white/10">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="p-3 bg-[#07090e] border-t border-white/10 flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 pl-2">kortfolio&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'whoami', 'projects', 'cat zisamale'..."
            className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
