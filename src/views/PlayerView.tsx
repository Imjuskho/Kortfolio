import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Clapperboard,
  Compass,
  Download,
  Globe,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import { PageHeader, SectionLabel } from '../components/GameUI';
import {
  BRAND_DIMENSIONS,
  BRAND_DIMENSIONS_INTRO,
  CAREER_EXPERIENCES,
  CLIENT_PARTNERS,
  EDUCATION_CREDENTIALS,
  ENGINEERING_THESES,
  ORIGIN_STAGES,
  PERSONAL_INFO,
  SKILL_CATEGORIES,
} from '../data/portfolioData';
import { Link } from '../lib/router';
import { asset } from '../lib/asset';
import { track } from '../lib/analytics';

const DIMENSION_ICONS = {
  compass: Compass,
  terminal: Terminal,
  clapperboard: Clapperboard,
  globe: Globe,
};

const TONE_STYLES = {
  amber: {
    icon: 'text-amber',
    line: 'bg-amber',
  },
  mint: {
    icon: 'text-mint',
    line: 'bg-mint',
  },
  violet: {
    icon: 'text-violet',
    line: 'bg-violet',
  },
  cyan: {
    icon: 'text-cyan-400',
    line: 'bg-cyan-400',
  },
};

const SOCIALS = [
  { label: 'GitHub', href: PERSONAL_INFO.github },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
  { label: 'Instagram', href: PERSONAL_INFO.instagram },
  { label: 'SoundCloud', href: PERSONAL_INFO.soundcloud },
];

export const PlayerView: React.FC = () => {
  const [skillQuery, setSkillQuery] = useState('');

  const filteredSkills = useMemo(() => {
    const clean = skillQuery.trim().toLowerCase();
    if (!clean) return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.map((category) => ({
      ...category,
      skills: category.skills.filter((skill) => skill.toLowerCase().includes(clean)),
    })).filter((category) => category.skills.length > 0);
  }, [skillQuery]);

  const totalSkills = SKILL_CATEGORIES.reduce((total, category) => total + category.skills.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        eyebrow="Player file"
        title="Kondwani Austin Phanga"
        lede="Computer engineer, systems builder, and creative director. A decade working where national infrastructure, institutional money, field data, and human stories meet."
        aside={
          <a
            href={asset(PERSONAL_INFO.cv)}
            download="Kondwani-Phanga-CV.pdf"
            className="btn"
            onClick={() => track('cv_downloaded', { surface: 'player' })}
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download CV
          </a>
        }
      />

      <section aria-labelledby="profile-title" className="grid gap-7 lg:grid-cols-[22rem_1fr] lg:items-start">
        <div className="pixel-panel overflow-hidden">
          <div className="relative aspect-[4/5] overflow-hidden border-b border-line bg-void-deep">
            <img
              src={asset('/assets/profile/kondwani.webp')}
              alt="Portrait of Kondwani Austin Phanga"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={720}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-deep/60 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 tag tag-mint">PLAYER_01</span>
          </div>
          <div className="p-4">
            <p className="meta-label">Base of operations</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink">
              <MapPin className="h-4 w-4 text-mint" aria-hidden="true" />
              {PERSONAL_INFO.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag transition-colors hover:border-line-mint hover:text-mint"
                >
                  {social.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 id="profile-title" className="sr-only">
            Profile
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag tag-mint">Computer engineer</span>
            <span className="tag tag-amber">Creative director</span>
            <span className="tag tag-violet">Systems builder</span>
          </div>
          <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {PERSONAL_INFO.title}
          </p>
          <p className="body-copy mt-4 max-w-3xl">{PERSONAL_INFO.bio}</p>

          <blockquote className="mt-6 border-l-2 border-line-mint pl-5">
            <p className="font-display text-lg leading-relaxed text-ink sm:text-xl">“{PERSONAL_INFO.quote}”</p>
            <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Working principle
            </footer>
          </blockquote>

          {/* Four-Dimensional Personal Brand Section */}
          <section aria-labelledby="brand-dimensions-title" className="mt-8 border-t border-line/60 pt-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-mint" aria-hidden="true" />
                <span className="hud-label text-mint">{BRAND_DIMENSIONS_INTRO.eyebrow}</span>
              </div>
              <h3 id="brand-dimensions-title" className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {BRAND_DIMENSIONS_INTRO.heading}
              </h3>
              <p className="body-copy mt-1.5 max-w-2xl text-xs sm:text-sm">
                {BRAND_DIMENSIONS_INTRO.supportingCopy}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {BRAND_DIMENSIONS.map((dim) => {
                const IconComponent = DIMENSION_ICONS[dim.icon];
                const toneStyle = TONE_STYLES[dim.tone];
                return (
                  <article
                    key={dim.id}
                    className="panel-quiet flex flex-col justify-between p-3.5 sm:p-4 transition-colors duration-200 hover:border-line-strong"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-muted">
                          {dim.label}
                        </span>
                        <IconComponent className={`h-4 w-4 flex-shrink-0 ${toneStyle.icon}`} aria-hidden="true" />
                      </div>
                      <h4 className="mt-2.5 font-display text-base font-semibold text-ink">
                        {dim.heading}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">
                        {dim.body}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside
              aria-label="Underlying philosophy"
              className="mt-4 border-l-2 border-line-mint bg-void-deep/60 px-4 py-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                {BRAND_DIMENSIONS_INTRO.philosophyLabel}
              </p>
              <p className="mt-1 font-display text-xs italic leading-relaxed text-ink sm:text-sm">
                “{BRAND_DIMENSIONS_INTRO.philosophyStatement}”
              </p>
            </aside>
          </section>
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="space-y-12">
          <section aria-labelledby="origin-arc-title">
            <SectionLabel tone="amber">The Arc · Origin story</SectionLabel>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 id="origin-arc-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                From an 11-year-old’s laptop to enterprise scale
              </h2>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Curiosity → Possibility
              </span>
            </div>
            <p className="body-copy mt-2 max-w-2xl text-sm">
              How curiosity turned into deep systems discipline, commercial perspective, and products built for real constraints.
            </p>

            <ol className="mt-6 space-y-4 border-l border-line pl-5 sm:pl-6">
              {ORIGIN_STAGES.map((stage, index) => (
                <li key={stage.id} className="relative">
                  <span
                    className={`absolute -left-[1.45rem] top-3 h-2 w-2 sm:-left-[1.7rem] ${
                      stage.stage === 'Curiosity'
                        ? 'bg-amber'
                        : stage.stage === 'Experimentation'
                          ? 'bg-violet'
                          : stage.stage === 'Perspective'
                            ? 'bg-rose-400'
                            : stage.stage === 'Building'
                              ? 'bg-mint'
                              : 'bg-emerald-400'
                    }`}
                    aria-hidden="true"
                  />
                  <article className="pixel-panel p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="tag tag-amber font-mono text-[10px]">
                          CH 0{index + 1}
                        </span>
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-ink">
                          {stage.stage}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-faint">{stage.period}</span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-semibold text-ink sm:text-xl">
                      {stage.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {stage.narrative}
                    </p>

                    <div className="mt-3.5 border-l-2 border-line-mint bg-void-deep/80 p-3 font-mono text-xs text-ink">
                      <span className="text-mint font-semibold uppercase tracking-wider">Lesson:</span> {stage.takeaway}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
                      {stage.tags.map((tag) => (
                        <span key={tag} className="tag text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="career-title">
            <SectionLabel>Career record</SectionLabel>
            <h2 id="career-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Where the systems were built
            </h2>

            <ol className="mt-5 space-y-4 border-l border-line pl-5 sm:pl-6">
              {CAREER_EXPERIENCES.map((experience, index) => (
                <li key={`${experience.company}-${experience.period}`} className="relative">
                  <span
                    className="absolute -left-[1.45rem] top-2 h-2 w-2 bg-mint sm:-left-[1.7rem]"
                    aria-hidden="true"
                  />
                  <article className="pixel-panel p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mint">
                        {String(CAREER_EXPERIENCES.length - index).padStart(2, '0')} / {experience.period}
                      </span>
                      <span className="tag">{experience.location}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">{experience.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-amber">{experience.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{experience.description}</p>

                    <ul className="mt-4 space-y-2">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                          <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-mint" aria-hidden="true" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
                      {experience.skills.map((skill) => (
                        <span key={skill} className="tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="education-title">
            <SectionLabel tone="violet">Education & credentials</SectionLabel>
            <h2 id="education-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Formal training
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {EDUCATION_CREDENTIALS.map((entry) => (
                <article key={entry.degree} className="panel-quiet p-5">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 flex-shrink-0 text-violet" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-tight text-ink">{entry.degree}</h3>
                      <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                    </div>
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
                    {entry.period} · {entry.location}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{entry.focus}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="principles-title">
            <SectionLabel tone="amber">Engineering principles</SectionLabel>
            <h2 id="principles-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Field notes, not slogans
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {ENGINEERING_THESES.map((thesis) => (
                <article key={thesis.title} className="pixel-panel p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber">{thesis.domain}</span>
                    <span className="font-mono text-[10px] text-faint">{thesis.period}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-ink">{thesis.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{thesis.summary}</p>
                  <div className="mt-3 border border-line bg-void-deep p-3 font-mono text-[11px] leading-relaxed text-muted">
                    <span className="text-mint">Architecture:</span> {thesis.architectureDetails}
                  </div>
                  <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber" aria-hidden="true" />
                    <span>{thesis.impact}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="capabilities-title">
            <SectionLabel>Capabilities</SectionLabel>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="capabilities-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  The toolkit
                </h2>
                <p className="mt-1 text-sm text-muted">{totalSkills} capabilities across systems, software, and leadership.</p>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden="true" />
                <label htmlFor="skill-search" className="sr-only">
                  Search capabilities
                </label>
                <input
                  id="skill-search"
                  type="search"
                  value={skillQuery}
                  onChange={(event) => setSkillQuery(event.target.value)}
                  placeholder="Search tools, languages, infra…"
                  className="field-input pl-9 sm:w-72"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {filteredSkills.map((category) => (
                <article key={category.title} className="panel-quiet p-5">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-mint" aria-hidden="true" />
                    <h3 className="font-display text-base font-semibold text-ink">{category.title}</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span key={skill} className="tag normal-case tracking-normal">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {!filteredSkills.length ? (
              <div className="mt-5 border border-line p-6 text-center">
                <p className="text-sm text-muted">No capability matches “{skillQuery}”.</p>
                <button type="button" className="btn btn-secondary mt-4" onClick={() => setSkillQuery('')}>
                  Clear search
                </button>
              </div>
            ) : null}
          </section>

          <section aria-labelledby="clients-title">
            <SectionLabel tone="violet">Client record</SectionLabel>
            <h2 id="clients-title" className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Institutions &amp; partners
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Organisations named in the owner’s project record. Logos are reproduced from the existing portfolio
              assets; inclusion here is not a claim of endorsement beyond that record.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CLIENT_PARTNERS.map((partner) => (
                <li key={partner.name} className="border border-line bg-white p-3">
                  <div className="flex h-14 items-center justify-center">
                    {partner.logo ? (
                      <img
                        src={asset(partner.logo)}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        decoding="async"
                        className={`max-h-10 max-w-full object-contain ${
                          partner.logoNeedsContrast ? 'brightness-0' : ''
                        }`}
                      />
                    ) : (
                      <span className="font-display text-xl font-bold text-slate-950">{partner.mark}</span>
                    )}
                  </div>
                  <div className="mt-2 border-t border-slate-200 pt-2">
                    <p className="text-xs font-semibold leading-tight text-slate-950">{partner.name}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-600">{partner.sector}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="pixel-panel p-5">
            <h2 className="hud-label text-mint">Quick actions</h2>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/missions" className="btn btn-secondary w-full">
                View missions <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn w-full">
                Start a project
              </Link>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="btn btn-ghost w-full border border-line"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>

          <div className="panel-quiet p-4">
            <p className="meta-label">Currently</p>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted">
              <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber" aria-hidden="true" />
              {PERSONAL_INFO.affiliation}
            </p>
          </div>

          <div className="border border-line-amber bg-amber/[0.04] p-4">
            <p className="hud-label text-amber">Availability</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Open to systems architecture, cloud and edge engineering, technical direction, and documentary
              collaborations. Enquiries go directly to the owner.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
