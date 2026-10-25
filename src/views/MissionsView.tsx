import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { ContactCTA, EvidenceLink, MediaFrame, MissionCard, PageHeader } from '../components/GameUI';
import { FEATURED_MISSION, MISSIONS, MISSION_CATEGORIES } from '../data/missions';
import { Link } from '../lib/router';
import { track } from '../lib/analytics';

export const MissionsView: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    track('missions_opened', { surface: 'missions_hub' });
  }, []);

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();
    return MISSIONS.filter((mission) => {
      const matchesCategory = category === 'All' || mission.category === category;
      if (!matchesCategory) return false;
      if (!clean) return true;
      return `${mission.title} ${mission.tagline} ${mission.summary} ${mission.role} ${mission.techStack.join(' ')} ${mission.category} ${mission.code}`
        .toLowerCase()
        .includes(clean);
    });
  }, [category, query]);

  const reset = () => {
    setCategory('All');
    setQuery('');
  };

  const featuredVisible =
    (category === 'All' || FEATURED_MISSION.category === category) &&
    (!query.trim() ||
      `${FEATURED_MISSION.title} ${FEATURED_MISSION.tagline} ${FEATURED_MISSION.summary} ${FEATURED_MISSION.techStack.join(' ')}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        eyebrow="Mission select"
        title="Selected systems. Real constraints."
        lede={`${MISSIONS.length} records from the field: mobile-money infrastructure, solar edge vision, clinical systems, cultural game engines, and data platforms. Every case study opens with an objective and closes with the evidence that exists.`}
        aside={
          <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-end">
            <div className="panel-quiet px-4 py-3">
              <p className="meta-label">Records</p>
              <p className="font-display text-2xl font-semibold text-mint">
                {String(MISSIONS.length).padStart(2, '0')}
                <span className="ml-1 text-sm text-faint">missions</span>
              </p>
            </div>
            <Link to="/contact" className="btn btn-secondary">
              Hire / Contact <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        }
      />

      {featuredVisible ? (
        <section aria-labelledby="featured-mission" className="mb-12">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span className="hud-label text-amber">Featured mission</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Chosen for evidence &amp; technical depth
            </span>
          </div>

          <article className="pixel-panel grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
            <Link
              to={`/missions/${FEATURED_MISSION.slug}`}
              className="group relative block min-h-64 overflow-hidden sm:min-h-80"
              aria-label={`Open featured mission: ${FEATURED_MISSION.title}`}
            >
              <MediaFrame
                src={FEATURED_MISSION.hero}
                alt={`Interface evidence from ${FEATURED_MISSION.title}`}
                code={FEATURED_MISSION.code}
                eager
                className="h-full min-h-64 border-0 sm:min-h-80"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="tag tag-amber">{FEATURED_MISSION.code}</span>
                <span className="tag tag-mint">{FEATURED_MISSION.statusLabel}</span>
              </div>
            </Link>

            <div className="flex flex-col p-6 sm:p-8">
              <p className="meta-label">{FEATURED_MISSION.category}</p>
              <h2 id="featured-mission" className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                <Link
                  to={`/missions/${FEATURED_MISSION.slug}`}
                  className="underline-offset-4 transition-colors hover:text-mint hover:underline"
                >
                  {FEATURED_MISSION.title}
                </Link>
              </h2>
              <p className="body-copy mt-3">{FEATURED_MISSION.tagline}</p>

              <dl className="mt-5 grid grid-cols-1 gap-3 border-y border-line py-4 sm:grid-cols-2">
                <div>
                  <dt className="meta-label">Role</dt>
                  <dd className="mt-0.5 text-sm text-ink">{FEATURED_MISSION.role}</dd>
                </div>
                <div>
                  <dt className="meta-label">Period</dt>
                  <dd className="mt-0.5 text-sm text-ink">{FEATURED_MISSION.period}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {FEATURED_MISSION.techStack.slice(0, 5).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                <Link
                  to={`/missions/${FEATURED_MISSION.slug}`}
                  className="btn"
                  onClick={() => track('mission_selected', { mission: FEATURED_MISSION.slug, surface: 'featured' })}
                >
                  Open case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {FEATURED_MISSION.links.slice(0, 1).map((link) => (
                  <EvidenceLink key={link.href} href={link.href} label={link.label} kind={link.kind} />
                ))}
              </div>
            </div>
          </article>
        </section>
      ) : null}

      <section aria-labelledby="mission-archive-title" id="mission-grid" className="scroll-mt-24">
        <div className="mb-5 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="mission-archive-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Mission archive
            </h2>
            <p className="mt-1 text-sm text-muted" aria-live="polite">
              Showing {filtered.length} of {MISSIONS.length} records
              {category !== 'All' ? ` in ${category}` : ''}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden="true" />
              <label htmlFor="mission-search" className="sr-only">
                Search missions
              </label>
              <input
                id="mission-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search missions, tools, roles…"
                className="field-input min-w-0 pl-9 sm:w-72"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-faint hover:text-ink"
                  aria-label="Clear mission search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div role="group" aria-label="Filter missions by category" className="mb-7 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-faint" aria-hidden="true" />
          {['All', ...MISSION_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`min-h-9 flex-shrink-0 border px-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                category === item
                  ? 'border-mint bg-mint text-void-deep'
                  : 'border-line bg-white/[0.02] text-muted hover:border-line-strong hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((mission, index) => (
              <MissionCard key={mission.slug} mission={mission} priority={index < 3 && !featuredVisible} />
            ))}
          </div>
        ) : (
          <div className="pixel-panel flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="hud-label text-amber">No records found</p>
            <p className="mt-3 max-w-md text-sm text-muted">
              Nothing matches “{query}” in {category === 'All' ? 'the archive' : category}. Try a broader term or
              reset the filters.
            </p>
            <button type="button" className="btn btn-secondary mt-5" onClick={reset}>
              Reset filters
            </button>
          </div>
        )}
      </section>

      <div className="mt-12">
        <ContactCTA compact />
      </div>
    </div>
  );
};
