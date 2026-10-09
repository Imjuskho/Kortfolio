import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ShieldCheck, Cpu, GraduationCap, CheckCircle2, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, CAREER_EXPERIENCES, EDUCATION_CREDENTIALS, ENGINEERING_THESES } from '../data/portfolioData';

export const ArchitecturalJourney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'theses'>('experience');

  const tabClass = (tab: typeof activeTab) =>
    `px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
      activeTab === tab
        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
        : 'text-muted hover:text-foreground hover:bg-foreground/5'
    }`;

  return (
    <section id="journey" className="scroll-mt-24 py-24 relative bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono mb-3">
              <Server className="w-3.5 h-3.5" />
              <span>MY STORY & PATH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Where I've Been, What I've Learned
            </h2>
            <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              A decade spent working across national telecom server racks, documentary film trips, creative agency direction, and hands-on software development.
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-surface border border-border gap-1.5 self-start md:self-auto font-mono text-xs">
            <button onClick={() => setActiveTab('experience')} className={tabClass('experience')}>
              <Briefcase className="w-3.5 h-3.5" />
              <span>Where I've Worked</span>
            </button>
            <button onClick={() => setActiveTab('education')} className={tabClass('education')}>
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education & Studies</span>
            </button>
            <button onClick={() => setActiveTab('theses')} className={tabClass('theses')}>
              <Cpu className="w-3.5 h-3.5" />
              <span>Principles & Field Notes</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Philosophy Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl glass-panel border border-accent/20 p-8 sm:p-10 mb-16 overflow-hidden shadow-[0_24px_60px_-24px_var(--shadow-strong)]"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-bl-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>HOW I THINK ABOUT SYSTEMS</span>
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed tracking-tight mb-6">
              "I started my career inside the cold server rooms of Malawi Telecommunications Limited. That early experience shaped everything I do: when power cuts hit and national lines stay alive because your failover works, you realize good engineering isn't about vanity metrics or trendy frameworks. It's about respecting the people on the other side of the screen and building things that last."
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-4 border-t border-border">
              <span className="text-foreground font-bold">{PERSONAL_INFO.name}</span>
              <span>•</span>
              <span className="text-accent font-semibold">Lilongwe, Malawi</span>
              <span>•</span>
              <span>BSc Computer Engineering (Univ. of Livingstonia)</span>
              <span>•</span>
              <span className="text-warn">Managing Director, 7arts Agency</span>
            </div>
          </div>
        </motion.div>

        {/* Tab 1: Career Experiences */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CAREER_EXPERIENCES.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-border hover:border-accent/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                        <span className="text-accent font-semibold">{exp.company}</span>
                        <span>{exp.period}</span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                        {exp.role}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2 text-xs text-muted leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-xs font-mono px-2 py-0.5 rounded bg-surface-2 text-muted border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Education & Credentials */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {EDUCATION_CREDENTIALS.map((edu, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-border hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                      <span className="text-accent font-semibold">{edu.location}</span>
                      <span>{edu.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 tracking-tight">
                      {edu.degree}
                    </h3>

                    <div className="text-sm font-semibold text-muted mb-3">
                      {edu.institution}
                    </div>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed font-mono">
                      {edu.focus}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
                    <span>Verified Academic Credential</span>
                    <ShieldCheck className="w-4 h-4 text-accent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Architectural Theses */}
          {activeTab === 'theses' && (
            <motion.div
              key="theses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {ENGINEERING_THESES.map((thesis, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-border hover:border-accent/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                      <span className="text-accent font-semibold">{thesis.domain}</span>
                      <span>{thesis.period}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                      {thesis.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                      {thesis.summary}
                    </p>

                    <div className="p-3.5 rounded-xl bg-surface-2 border border-border font-mono text-xs space-y-1.5 mb-4">
                      <div className="text-xs text-muted uppercase">Architecture & Implementation:</div>
                      <div className="text-muted text-xs leading-relaxed">{thesis.architectureDetails}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border font-mono text-xs text-accent flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Impact: {thesis.impact}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
