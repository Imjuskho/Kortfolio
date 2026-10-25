import React from 'react';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { MISSIONS, type Mission } from '../data/missions';
import { Link } from '../lib/router';
import { asset } from '../lib/asset';

export const PageHeader: React.FC<{
  eyebrow: string;
  title: string;
  lede?: string;
  aside?: React.ReactNode;
}> = ({ eyebrow, title, lede, aside }) => (
  <header className="mb-9 border-b border-line pb-7 sm:mb-12 sm:pb-9">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-2">
          <span className="status-dot" aria-hidden="true" />
          <span className="hud-label text-mint">{eyebrow}</span>
        </div>
        <h1 className="display-lg text-ink">{title}</h1>
        {lede ? <p className="body-copy mt-4 max-w-2xl">{lede}</p> : null}
      </div>
      {aside ? <div className="flex-shrink-0">{aside}</div> : null}
    </div>
  </header>
);

export const SectionLabel: React.FC<{ children: React.ReactNode; tone?: 'mint' | 'amber' | 'violet' }> = ({
  children,
  tone = 'mint',
}) => (
  <div className="mb-3 flex items-center gap-2">
    <span
      className={`h-px w-6 ${tone === 'amber' ? 'bg-amber' : tone === 'violet' ? 'bg-violet' : 'bg-mint'}`}
      aria-hidden="true"
    />
    <span className={`hud-label ${tone === 'amber' ? 'text-amber' : tone === 'violet' ? 'text-violet' : 'text-mint'}`}>
      {children}
    </span>
  </div>
);

export const Metric: React.FC<{ label: string; value: string; detail?: string }> = ({ label, value, detail }) => (
  <div className="panel-quiet p-4">
    <div className="meta-label">{label}</div>
    <div className="mt-1 font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">{value}</div>
    {detail ? <div className="mt-1 text-xs leading-snug text-faint">{detail}</div> : null}
  </div>
);

export const MediaFrame: React.FC<{
  src?: string;
  alt: string;
  code?: string;
  className?: string;
  eager?: boolean;
  label?: string;
}> = ({ src, alt, code = 'IMG', className = '', eager = false, label }) => {
  if (!src) {
    return (
      <div
        className={`relative flex min-h-52 items-center justify-center overflow-hidden border border-line bg-void-deep ${className}`}
        role="img"
        aria-label={`${alt} — visual evidence pending`}
      >
        <div className="absolute inset-0 grid-floor opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 scanlines opacity-60" aria-hidden="true" />
        <div className="absolute left-3 top-3 h-2 w-2 border-l border-t border-amber/70" aria-hidden="true" />
        <div className="absolute right-3 bottom-3 h-2 w-2 border-b border-r border-amber/70" aria-hidden="true" />
        <div className="relative px-6 text-center">
          <div className="hud-label text-amber">{code}</div>
          <div className="mt-2 font-pixel text-sm text-ink">VISUAL EVIDENCE PENDING</div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-faint">
            {label ?? 'Owner-supplied screenshots not available'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden border border-line bg-void-deep ${className}`}>
      <img
        src={asset(src)}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void-deep/55 via-transparent to-transparent" />
    </div>
  );
};

export const MissionCard: React.FC<{ mission: Mission; priority?: boolean }> = ({ mission, priority = false }) => (
  <article className="pixel-panel group flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-line-mint">
    <Link to={`/missions/${mission.slug}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
      <MediaFrame
        src={mission.thumb}
        alt=""
        code={mission.code}
        eager={priority}
        className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.015]"
      />
    </Link>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="hud-label text-faint">{mission.code}</span>
        <span className="h-3 w-px bg-line" aria-hidden="true" />
        <span className="tag tag-violet">{mission.categoryCode}</span>
        <span className={`tag ${mission.statusLabel === 'LIVE PRODUCT' ? 'tag-mint' : 'tag-amber'}`}>
          {mission.statusLabel}
        </span>
      </div>

      <h2 className="font-display text-xl font-semibold leading-tight tracking-tight text-ink">
        <Link
          to={`/missions/${mission.slug}`}
          className="underline-offset-4 transition-colors hover:text-mint hover:underline"
        >
          {mission.title}
        </Link>
      </h2>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{mission.tagline}</p>

      <dl className="mt-4 grid grid-cols-1 gap-2 border-t border-line pt-3 text-xs sm:grid-cols-2">
        <div>
          <dt className="meta-label">Role</dt>
          <dd className="mt-0.5 leading-snug text-ink">{mission.role}</dd>
        </div>
        <div>
          <dt className="meta-label">Period</dt>
          <dd className="mt-0.5 leading-snug text-ink">{mission.period}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {mission.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
        {mission.techStack.length > 3 ? <span className="tag">+{mission.techStack.length - 3}</span> : null}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <Link
          to={`/missions/${mission.slug}`}
          className="inline-flex min-h-11 items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.1em] text-mint transition-transform group-hover:translate-x-0.5"
        >
          Open mission <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
          {String(mission.index + 1).padStart(2, '0')} / {String(MISSIONS.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  </article>
);

export const EvidenceLink: React.FC<{
  href: string;
  label: string;
  kind?: 'code' | 'live';
  onClick?: () => void;
}> = ({ href, label, kind = 'live', onClick }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className="group inline-flex min-h-11 items-center gap-2 border border-line bg-void-deep px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
  >
    <span className="text-mint" aria-hidden="true">
      {kind === 'code' ? '</>' : '↗'}
    </span>
    {label}
    <span className="sr-only"> (opens in a new tab)</span>
    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

export const ContactCTA: React.FC<{ project?: string; compact?: boolean }> = ({ project, compact = false }) => {
  const query = project ? `?project=${encodeURIComponent(project)}` : '';
  return (
    <aside className={`pixel-panel ${compact ? 'p-5 sm:p-6' : 'p-6 sm:p-9'}`}>
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <SectionLabel tone="amber">Next objective</SectionLabel>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Have a system that needs building?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Bring the constraint — low bandwidth, high trust, hostile conditions. I can help scope, architect,
            and ship it.
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2">
          <Link to={`/contact${query}`} className="btn">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Start a mission
          </Link>
        </div>
      </div>
    </aside>
  );
};

export const FactRow: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid grid-cols-1 gap-1 border-b border-line py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
    <dt className="meta-label">{label}</dt>
    <dd className="text-sm leading-relaxed text-ink">{children}</dd>
  </div>
);
