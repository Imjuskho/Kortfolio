import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Command, Mail, Search, X } from 'lucide-react';
import { MISSIONS } from '../data/missions';
import { PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { track } from '../lib/analytics';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { useRouter } from '../lib/routerCore';

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  group: 'Navigate' | 'Missions' | 'Actions';
  keywords: string;
  run: () => void;
}

export const CommandPalette: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useDialogA11y(open, onClose, inputRef);

  const commands = useMemo<CommandItem[]>(
    () => [
      { id: 'nav-home', label: 'Start screen', hint: 'KORTFOLIO', group: 'Navigate', keywords: 'home start intro', run: () => navigate('/') },
      { id: 'nav-missions', label: 'Mission Select', hint: 'All case studies', group: 'Navigate', keywords: 'projects work missions', run: () => navigate('/missions') },
      { id: 'nav-lab', label: 'Tech Lab', hint: 'Interactive demos', group: 'Navigate', keywords: 'lab simulator demos', run: () => navigate('/lab') },
      { id: 'nav-player', label: 'Player File', hint: 'Profile & career', group: 'Navigate', keywords: 'about cv career education skills', run: () => navigate('/player') },
      { id: 'nav-media', label: 'Media Archive', hint: 'Photography', group: 'Navigate', keywords: 'photos documentary archive', run: () => navigate('/media') },
      { id: 'nav-contact', label: 'Contact / Next Mission', hint: 'Start a project', group: 'Navigate', keywords: 'email hire enquiry', run: () => navigate('/contact') },
      ...MISSIONS.map<CommandItem>((mission) => ({
        id: `mission-${mission.slug}`,
        label: mission.title,
        hint: `${mission.code} · ${mission.category}`,
        group: 'Missions',
        keywords: `${mission.slug} ${mission.category} ${mission.techStack.join(' ')}`,
        run: () => {
          track('mission_selected', { mission: mission.slug, surface: 'command' });
          navigate(`/missions/${mission.slug}`);
        },
      })),
      {
        id: 'action-email',
        label: 'Email Kondwani',
        hint: PERSONAL_INFO.email,
        group: 'Actions',
        keywords: 'mail contact',
        run: () => {
          window.location.href = `mailto:${PERSONAL_INFO.email}`;
        },
      },
      {
        id: 'action-cv',
        label: 'Download CV',
        hint: 'PDF',
        group: 'Actions',
        keywords: 'resume download pdf',
        run: () => {
          track('cv_downloaded', { surface: 'command' });
          window.location.href = asset(PERSONAL_INFO.cv);
        },
      },
    ],
    [navigate],
  );

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint} ${command.keywords}`.toLowerCase().includes(clean),
    );
  }, [commands, query]);

  if (!open) return null;

  const run = (command: CommandItem | undefined) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(filtered[activeIndex]);
    }
  };

  let lastGroup = '';

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-void-deep/85 px-4 pt-[12vh] backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        className="pixel-panel relative z-10 w-full max-w-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <Command className="h-4 w-4 text-mint" aria-hidden="true" />
            <h2 id="command-title" className="hud-label text-ink">
              Command menu
            </h2>
          </div>
          <button type="button" className="icon-btn h-9 w-9" onClick={onClose} aria-label="Close command menu">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 flex-shrink-0 text-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a mission, page, or action…"
            aria-label="Search commands"
            aria-controls="command-results"
            className="min-h-14 w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">ESC</kbd>
        </div>

        <div id="command-results" className="max-h-[54vh] overflow-y-auto p-2">
          {filtered.length ? (
            <ul aria-label="Commands">
              {filtered.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <li key={command.id}>
                    {showGroup ? <div className="meta-label px-2 pb-1 pt-3 first:pt-1">{command.group}</div> : null}
                    <button
                      type="button"
                      onClick={() => run(command)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex min-h-11 w-full items-center justify-between gap-4 px-2.5 py-2 text-left transition-colors ${
                        activeIndex === index ? 'bg-mint/10 text-ink' : 'text-muted hover:bg-white/5'
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm">{command.label}</span>
                        <span className="block truncate font-mono text-[11px] text-faint">{command.hint}</span>
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 flex-shrink-0 ${activeIndex === index ? 'text-mint' : 'text-faint'}`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-3 py-10 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-faint">No matching command</p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-3 font-mono text-xs text-mint underline underline-offset-4"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-faint">
          <span>↑↓ Move</span>
          <span>↵ Open</span>
          <span>Esc Close</span>
          <span className="ml-auto flex items-center gap-1">
            <Mail className="h-3 w-3" aria-hidden="true" /> {PERSONAL_INFO.email}
          </span>
        </div>
      </div>
    </div>
  );
};
