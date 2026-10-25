import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Lock } from 'lucide-react';
import { ContactCTA, EvidenceLink, FactRow, MediaFrame, Metric, SectionLabel } from '../components/GameUI';
import { Lightbox, type LightboxItem } from '../components/Lightbox';
import { adjacentMissions, CONTENT_PROVENANCE, getMission } from '../data/missions';
import { Link } from '../lib/router';
import { asset } from '../lib/asset';
import { track } from '../lib/analytics';
import { NotFoundView } from './NotFoundView';

const CaseSection: React.FC<{
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}> = ({ number, label, title, children, id }) => (
  <section id={id} aria-labelledby={`${id ?? label}-title`} className="scroll-mt-24 border-t border-line pt-6">
    <div className="mb-4 flex items-center gap-3">
      <span className="font-pixel text-xs text-mint">{number}</span>
      <span className="hud-label text-faint">{label}</span>
    </div>
    <h2 id={`${id ?? label}-title`} className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
      {title}
    </h2>
    <div className="mt-4">{children}</div>
  </section>
);

export const MissionView: React.FC<{ slug: string }> = ({ slug }) => {
  const mission = getMission(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (mission) track('case_study_viewed', { mission: mission.slug, category: mission.category });
  }, [mission]);

  const images = useMemo(() => mission?.previewImages ?? [], [mission]);

  const galleryItems = useMemo<LightboxItem[]>(
    () =>
      images.map((src, index) => ({
        src,
        title: `${mission?.code ?? 'EVIDENCE'} · FRAME ${String(index + 1).padStart(2, '0')}`,
        description: `Interface or field evidence from ${mission?.title ?? 'the project'}. Supplied from the owner’s project record.`,
        meta: mission?.category,
      })),
    [images, mission],
  );

  if (!mission) return <NotFoundView title="Mission record missing" message="That mission identifier is not in the archive." />;

  const { previous, next } = adjacentMissions(mission.slug);
  const hasImages = images.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        <Link to="/missions" className="inline-flex min-h-9 items-center gap-1.5 text-muted transition-colors hover:text-mint">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Mission select
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-mint">{mission.code}</span>
        <span aria-hidden="true">/</span>
        <span>{mission.categoryCode}</span>
      </nav>

      <section aria-labelledby="mission-title" className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="tag tag-mint">{mission.code}</span>
            <span className="tag tag-violet">{mission.category}</span>
            <span className={`tag ${mission.statusLabel === 'LIVE PRODUCT' ? 'tag-mint' : 'tag-amber'}`}>
              {mission.statusLabel}
            </span>
          </div>

          <h1 id="mission-title" className="display-md text-ink sm:text-[clamp(2.1rem,4vw,3.4rem)]">
            {mission.title}
          </h1>
          <p className="body-copy mt-4 max-w-2xl text-base">{mission.tagline}</p>

          <dl className="mt-6 grid max-w-xl grid-cols-1 gap-4 border-y border-line py-4 sm:grid-cols-2">
            <div>
              <dt className="meta-label">Role</dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{mission.role}</dd>
            </div>
            <div>
              <dt className="meta-label">Period</dt>
              <dd className="mt-1 text-sm leading-snug text-ink">{mission.period}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a href="#mission-brief" className="btn">
              Read the case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {mission.links.map((link) => (
              <EvidenceLink
                key={link.href}
                href={link.href}
                label={link.label}
                kind={link.kind}
                onClick={() => track('external_project_link', { mission: mission.slug, surface: 'hero', destination: link.kind })}
              />
            ))}
          </div>
        </div>

        <div>
          <MediaFrame
            src={mission.hero}
            alt={hasImages ? `Interface evidence from ${mission.title}` : `Visual evidence placeholder for ${mission.title}`}
            code={mission.code}
            eager
            className="aspect-[16/10]"
            label="No public screenshots listed"
          />
          <div className="mt-2 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            <span>{hasImages ? `${images.length} visual record${images.length === 1 ? '' : 's'}` : 'Visual record pending'}</span>
            <span>{mission.code} / {mission.categoryCode}</span>
          </div>
        </div>
      </section>

      {mission.impactMetrics.length ? (
        <section aria-label="Documented impact metrics" className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {mission.impactMetrics.map((metric) => (
            <Metric key={metric.label} label={metric.label} value={metric.value} detail={metric.detail} />
          ))}
        </section>
      ) : null}

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
        <div className="space-y-9">
          <CaseSection id="mission-brief" number="01" label="Mission brief" title="What this mission is">
            <p className="body-copy prose-max">{mission.summary}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="panel-quiet p-4">
                <p className="meta-label">Discipline</p>
                <p className="mt-1 text-sm text-ink">{mission.category}</p>
              </div>
              <div className="panel-quiet p-4">
                <p className="meta-label">Public evidence</p>
                <p className="mt-1 text-sm text-ink">
                  {mission.links.length ? `${mission.links.length} verified external link${mission.links.length === 1 ? '' : 's'}` : 'No public link listed'}
                </p>
              </div>
            </div>
          </CaseSection>

          <CaseSection id="mission-objective" number="02" label="Objective" title="The problem in front of us">
            <p className="body-copy prose-max">{mission.problemStatement}</p>
          </CaseSection>

          <CaseSection id="mission-strategy" number="03" label="Strategy" title="How the system was approached">
            <p className="body-copy prose-max">{mission.solutionArchitecture}</p>
            <div className="mt-5 border border-line-amber bg-amber/[0.04] p-4">
              <SectionLabel tone="amber">Field constraint</SectionLabel>
              <p className="text-sm leading-relaxed text-muted">{mission.offlineConsiderations}</p>
            </div>
          </CaseSection>

          {mission.architectureLayers?.length ? (
            <CaseSection id="mission-architecture" number="04" label="Architecture" title="System layers">
              <ol className="space-y-3">
                {mission.architectureLayers.map((layer, index) => (
                  <li key={layer.name} className="panel-quiet p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        <span className="mr-2 font-mono text-xs text-mint">{String(index + 1).padStart(2, '0')}</span>
                        {layer.name}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-faint">Layer {index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{layer.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {layer.components.map((component) => (
                        <span key={component} className="tag">
                          {component}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </CaseSection>
          ) : null}

          <CaseSection id="mission-execution" number="05" label="Execution" title="What was built">
            <ul className="space-y-3">
              {mission.keyHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-mint" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l border-line-mint pl-4 text-sm leading-relaxed text-muted">
              <span className="text-ink">Contribution:</span> {mission.role}. See the mission data panel for the full
              stack and public evidence.
            </p>
          </CaseSection>

          <CaseSection id="mission-evidence" number="06" label="Evidence" title="What can be inspected">
            {hasImages ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative aspect-[4/3] overflow-hidden border border-line bg-void-deep transition-colors hover:border-line-mint"
                    aria-label={`Enlarge evidence image ${index + 1} for ${mission.title}`}
                  >
                    <img
                      src={asset(src)}
                      alt={`${mission.title} evidence image ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-void-deep/90 px-1.5 py-0.5 font-mono text-[10px] text-mint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <MediaFrame
                src={undefined}
                alt={`${mission.title} visual evidence`}
                code={mission.code}
                className="aspect-[16/9]"
                label="Owner-supplied screenshots not available"
              />
            )}

            <div className="mt-5">
              <h3 className="hud-label text-faint">External records</h3>
              {mission.links.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {mission.links.map((link) => (
                    <EvidenceLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      kind={link.kind}
                      onClick={() =>
                        track('external_project_link', {
                          mission: mission.slug,
                          surface: 'evidence',
                          destination: link.kind,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-2 flex items-start gap-2 border border-line bg-void-deep p-3 text-sm text-muted">
                  <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-faint" aria-hidden="true" />
                  <p>
                    No public repository, demo, or deployment URL is listed for this mission. Architecture and
                    outcomes are described from the owner’s project record; confidential system details are not
                    reproduced.
                  </p>
                </div>
              )}
            </div>
          </CaseSection>

          <CaseSection id="mission-outcome" number="07" label="Outcome" title="What changed">
            <p className="body-copy prose-max">
              {mission.impactMetrics.length
                ? 'The metrics below are the recorded outcomes for this mission. They are presented with the evidence available, not as independently audited claims.'
                : 'No numeric outcome is recorded for this mission. The qualitative result is described through the execution notes and the evidence above.'}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {mission.impactMetrics.map((metric) => (
                <Metric key={metric.label} label={metric.label} value={metric.value} detail={metric.detail} />
              ))}
            </div>
            <p className="mt-4 border-l border-line pl-4 font-mono text-[10px] leading-relaxed tracking-wide text-faint">
              {CONTENT_PROVENANCE}
            </p>
          </CaseSection>

          <section aria-labelledby="mission-next-title" className="border-t border-line pt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-pixel text-xs text-mint">08</span>
              <span className="hud-label text-faint">Next objective</span>
            </div>
            <h2 id="mission-next-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Build the next one.
            </h2>
            <div className="mt-4">
              <ContactCTA project={mission.slug} compact />
            </div>
          </section>
        </div>

        <aside aria-label="Mission data" className="space-y-4 lg:sticky lg:top-24">
          <div className="pixel-panel p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="hud-label text-mint">Mission data</h2>
              <span className="font-mono text-[10px] text-faint">{mission.code}</span>
            </div>
            <dl className="mt-3">
              <FactRow label="Role">{mission.role}</FactRow>
              <FactRow label="Period">{mission.period}</FactRow>
              <FactRow label="Category">{mission.category}</FactRow>
              <FactRow label="Status">{mission.statusLabel}</FactRow>
              <FactRow label="Stack">
                <span className="flex flex-wrap gap-1.5">
                  {mission.techStack.map((tech) => (
                    <span key={tech} className="tag normal-case tracking-normal">
                      {tech}
                    </span>
                  ))}
                </span>
              </FactRow>
            </dl>

            <div className="mt-5 border-t border-line pt-4">
              <p className="meta-label">Public records</p>
              {mission.links.length ? (
                <div className="mt-2 flex flex-col gap-2">
                  {mission.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track('external_project_link', {
                          mission: mission.slug,
                          surface: 'sidebar',
                          destination: link.kind,
                        })
                      }
                      className="inline-flex min-h-10 items-center justify-between gap-2 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-faint">
                  None listed. Case-study content is limited to non-confidential detail.
                </p>
              )}
            </div>

            <Link to={`/contact?project=${mission.slug}`} className="btn mt-5 w-full">
              Discuss this work
            </Link>
          </div>

          <div className="panel-quiet p-4">
            <p className="meta-label">Navigation</p>
            <div className="mt-2 flex flex-col gap-2">
              <Link
                to={`/missions/${previous.slug}`}
                className="group flex min-h-11 items-center gap-2 border border-line px-2.5 text-xs text-muted transition-colors hover:border-line-mint hover:text-mint"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="truncate">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-faint">Previous</span>
                  {previous.title.split('—')[0]}
                </span>
              </Link>
              <Link
                to={`/missions/${next.slug}`}
                className="group flex min-h-11 items-center justify-end gap-2 border border-line px-2.5 text-right text-xs text-muted transition-colors hover:border-line-mint hover:text-mint"
              >
                <span className="truncate">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-faint">Next</span>
                  {next.title.split('—')[0]}
                </span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <Link to="/missions" className="btn btn-secondary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All missions
        </Link>
        <Link to="/contact" className="btn btn-ghost border border-line">
          Contact / Next mission
        </Link>
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          items={galleryItems}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  );
};
