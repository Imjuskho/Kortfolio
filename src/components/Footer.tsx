import React, { useEffect, useState } from 'react';
import { ArrowUp, Briefcase, Camera, Code2, Download, Mail, Music } from 'lucide-react';
import { Link } from '../lib/router';
import { PERSONAL_INFO } from '../data/portfolioData';
import { formatZoneClock } from '../lib/time';
import { asset } from '../lib/asset';
import { track } from '../lib/analytics';

const FOOTER_LINKS = [
  { to: '/missions', label: 'Missions' },
  { to: '/lab', label: 'Tech Lab' },
  { to: '/player', label: 'Player File' },
  { to: '/media', label: 'Media Archive' },
  { to: '/contact', label: 'Contact' },
];

export const Footer: React.FC = () => {
  const [clock, setClock] = useState(() => formatZoneClock(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => setClock(formatZoneClock(new Date())), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="relative mt-16 border-t border-line bg-void-deep">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-line pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3" aria-label="KORTFOLIO — return home">
              <span className="flex h-9 w-9 items-center justify-center border border-line-mint bg-mint/10 font-pixel text-xs text-mint">
                K
              </span>
              <span className="font-pixel text-xs tracking-[0.14em] text-ink">KORTFOLIO</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              The working portfolio and systems lab of {PERSONAL_INFO.name}. Production software, field
              engineering, and documentary craft — built in Malawi.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="icon-btn" aria-label={`Email ${PERSONAL_INFO.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Briefcase className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="Instagram photography (opens in a new tab)"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PERSONAL_INFO.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="SoundCloud music profile (opens in a new tab)"
              >
                <Music className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="hud-label text-faint">Navigate</h2>
            <ul className="mt-3 space-y-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="hud-label text-faint">Direct</h2>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="mt-3 block break-all text-sm text-mint underline-offset-4 hover:underline"
            >
              {PERSONAL_INFO.email}
            </a>
            <p className="mt-2 text-sm text-muted">{PERSONAL_INFO.location}</p>
            <a
              href={asset(PERSONAL_INFO.cv)}
              download="Kondwani-Phanga-CV.pdf"
              className="mt-4 inline-flex min-h-10 items-center gap-2 border border-line px-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
              onClick={() => track('cv_downloaded', { surface: 'footer' })}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}</span>
            <span className="hidden sm:inline" aria-hidden="true">/</span>
            <span className="flex items-center gap-1.5">
              <span className="status-dot" aria-hidden="true" />
              Lilongwe {clock} CAT
            </span>
            <span className="hidden sm:inline" aria-hidden="true">/</span>
            <span>Sound off by default</span>
          </div>
          <div className="flex items-center gap-3">
            <span>No trackers bundled</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex min-h-9 items-center gap-1.5 border border-line px-2.5 text-muted transition-colors hover:border-line-mint hover:text-mint"
            >
              Top <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
