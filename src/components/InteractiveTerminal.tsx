import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { useDialogA11y } from '../hooks/useDialogA11y';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

const SUGGESTED_COMMANDS = [
  'whoami',
  'projects',
  'cat amr-fintech',
  'cat edge-vision',
  'cat pocket-body',
  'stack',
  'metrics',
  'contact',
  'clear'
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose, onSelectProject }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1.5 text-slate-300">
          <p className="text-emerald-400 font-bold">Kondwani Austin Phanga — Interactive Shell</p>
          <p className="text-slate-400">
            Hi! If you prefer the command line, you can explore my projects, background, and toolkit right here. Type <span className="text-amber-300 font-bold">'help'</span> or click any quick command below.
          </p>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const dialogRef = useDialogA11y(isOpen, onClose, inputRef);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (cmdString: string) => {
    const cmd = cmdString.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const lower = cmd.toLowerCase();
    let response: React.ReactNode;

    if (lower === 'help') {
      response = (
        <div className="space-y-1 text-xs">
          <p className="text-emerald-400 font-bold">Available Commands:</p>
          <p><span className="text-amber-300 font-bold">whoami</span> — A quick intro to who I am and what I do</p>
          <p><span className="text-amber-300 font-bold">projects</span> — Browse the software and hardware projects I've built</p>
          <p><span className="text-amber-300 font-bold">cat &lt;id&gt;</span> — Read the story and tech behind a project (e.g. `cat amr-fintech`, `cat edge-vision`)</p>
          <p><span className="text-amber-300 font-bold">stack</span> — See the tools, languages, and hardware in my daily toolkit</p>
          <p><span className="text-amber-300 font-bold">metrics</span> — Real-world numbers from a decade in the field</p>
          <p><span className="text-amber-300 font-bold">contact</span> — How to reach me directly</p>
          <p><span className="text-amber-300 font-bold">clear</span> — Clear the screen</p>
        </div>
      );
    } else if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lower === 'whoami') {
      response = (
        <div className="space-y-1.5 text-xs text-slate-300">
          <p><strong className="text-white text-sm">{PERSONAL_INFO.name}</strong> — {PERSONAL_INFO.title}</p>
          <p className="text-emerald-400 font-mono">{PERSONAL_INFO.affiliation}</p>
          <p className="text-slate-400">Based in: {PERSONAL_INFO.location}</p>
          <p className="mt-2 text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
        </div>
      );
    } else if (lower === 'projects') {
      response = (
        <div className="space-y-2 text-xs">
          <p className="text-emerald-400 font-bold">Projects I've Built ({PROJECTS.length} selected works):</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {PROJECTS.map((p) => (
              <div 
                key={p.id} 
                onClick={() => executeCommand(`cat ${p.id}`)}
                className="p-2 rounded bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-950/20 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold">{p.id}</span>
                  <span className="text-xs text-slate-400">{p.period}</span>
                </div>
                <div className="text-white font-medium truncate mt-0.5">{p.title.split('—')[0]}</div>
                <div className="text-xs text-slate-400 truncate">{p.category}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 mt-2">Click any project above or type `cat &lt;id&gt;` to read more.</p>
        </div>
      );
    } else if (lower.startsWith('cat ')) {
      const targetId = lower.replace('cat ', '').trim();
      const proj = PROJECTS.find((p) => p.id === targetId || p.title.toLowerCase().includes(targetId));

      if (proj) {
        response = (
          <div className="space-y-2 text-xs p-3.5 rounded-xl bg-black/50 border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold text-sm">{proj.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {proj.category}
              </span>
            </div>
            <div className="text-slate-400 font-mono text-xs">{proj.tagline}</div>
            <div className="text-white mt-1 leading-relaxed">{proj.summary}</div>
            
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5 items-center">
              <span className="text-slate-400 font-mono text-xs">Stack:</span>
              {proj.techStack.map((tech, i) => (
                <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-xs text-slate-300 font-mono">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">Workspace: <code className="text-amber-300">{proj.localPath}</code></span>
              {['amr-fintech', 'pocket-body', 'bawo', 'edge-vision'].includes(proj.id) && onSelectProject && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectProject(proj.id);
                  }}
                  className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono cursor-pointer transition-all"
                >
                  Try Interactive Demo →
                </button>
              )}
            </div>
          </div>
        );
      } else {
        response = (
          <p className="text-rose-400 text-xs">
            Project '{targetId}' not found. Type `projects` to see the full list.
          </p>
        );
      }
    } else if (lower === 'stack' || lower === 'skills') {
      response = (
        <div className="space-y-3 text-xs">
          <p className="text-emerald-400 font-bold">Tools, Languages & Technical Skills:</p>
          <div className="space-y-2">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5">
                <div className="text-amber-300 font-semibold mb-1">{cat.title}</div>
                <div className="text-slate-300 font-mono text-xs leading-relaxed">
                  {cat.skills.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (lower === 'metrics' || lower === 'stats') {
      response = (
        <div className="grid grid-cols-2 gap-2 text-xs">
          {PERSONAL_INFO.stats.map((s, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5">
              <div className="text-emerald-400 font-bold text-base">{s.value}</div>
              <div className="text-white text-xs">{s.label}</div>
              <div className="text-slate-400 text-xs">{s.detail}</div>
            </div>
          ))}
        </div>
      );
    } else if (lower === 'contact') {
      response = (
        <div className="space-y-1.5 text-xs text-slate-300 p-2 rounded bg-black/30 border border-white/5 font-mono">
          <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></p>
          <p>Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-teal-400 underline">{PERSONAL_INFO.phone}</a></p>
          <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.linkedin}</a></p>
          <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-slate-300 underline">{PERSONAL_INFO.github}</a></p>
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.toLowerCase().trim();
      if (!current) return;
      const match = SUGGESTED_COMMANDS.find(c => c.startsWith(current));
      if (match) setInput(match);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Kortfolio interactive terminal"
        tabIndex={-1}
        className="relative w-full max-w-3xl rounded-2xl glass-panel bg-[#0a0d15] border border-emerald-500/30 shadow-2xl overflow-hidden z-10 flex flex-col h-[540px]"
      >
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#07090e] border-b border-white/10 font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">kortfolio-cli</span>
            <span className="text-slate-600">@</span>
            <span className="text-slate-400">macbook-air-mw:~</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-slate-400">ESC to close</span>
            <button
              onClick={() => setHistory([])}
              className="px-2 py-0.5 rounded text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Close terminal"
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
                <span className="text-slate-400">kortfolio&gt;</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4 border-l border-white/10">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#080b12] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          <span className="text-slate-400 flex-shrink-0 text-xs">Quick:</span>
          {SUGGESTED_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/30 whitespace-nowrap cursor-pointer transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(input);
          }} 
          className="p-3 bg-[#07090e] border-t border-white/10 flex items-center gap-2"
        >
          <span className="font-mono text-xs text-emerald-400 pl-2">kortfolio&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'whoami', 'projects', 'cat amr-fintech'..."
            className="flex-1 bg-transparent border-none text-xs font-mono text-white focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
            title="Execute command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
