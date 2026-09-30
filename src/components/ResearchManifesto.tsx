import React from 'react';
import { BookOpen, GraduationCap, Award, Building2, Quote, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { RESEARCH_TOPICS } from '../data/portfolioData';

export const ResearchManifesto: React.FC = () => {
  return (
    <section id="research" className="py-24 relative bg-[#090c14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/70 border border-sky-500/30 text-sky-400 text-xs font-mono mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>GLOBAL HEALTH & PUBLIC UNDERSTANDING OF SCIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Research Manifesto & Field Philosophy
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Why access to information alone never saves lives: closing the gap between world-class clinical research and the lived sociocultural realities of communities in sub-Saharan Africa.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-slate-400">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Oxford PGDip Global Health Research</span>
          </div>
        </div>

        {/* Featured Philosophy Callout Box */}
        <div className="relative rounded-2xl glass-panel bg-gradient-to-br from-[#0c1220] to-[#080d17] border border-sky-500/20 p-8 sm:p-10 mb-16 overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-sky-500/10 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">
              STATEMENT OF PURPOSE // CORE THESIS
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-100 leading-snug tracking-tight mb-6">
              "Access to information alone is not enough. Health knowledge must be communicated in ways that communities trust, understand, and recognize as relevant to their lives. When interventions fail to reflect the sociocultural, linguistic, and religious realities of the communities they address, science remains locked outside the village square."
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
              <span className="text-white font-bold">Kondwani Phanga</span>
              <span>•</span>
              <span className="text-sky-300">University of Oxford Candidate</span>
              <span>•</span>
              <span>University of Malawi (Chancellor College) Alumnus</span>
            </div>
          </div>
        </div>

        {/* 3 Research Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {RESEARCH_TOPICS.map((topic, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-sky-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                  <span className="text-sky-400 font-semibold">{topic.institution}</span>
                  <span>{topic.period}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-tight">
                  {topic.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {topic.summary}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5 text-xs font-mono">
                <div>
                  <span className="text-slate-500 uppercase text-[10px]">Methodology:</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">{topic.methodology}</p>
                </div>
                <div>
                  <span className="text-sky-400 uppercase text-[10px]">Clinical & Policy Impact:</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{topic.relevance}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Institutional Journey Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/5">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            Institutional Experience & Interdisciplinary Trajectory
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-emerald-400 font-bold mb-1">Univ. of Livingstonia</div>
              <div className="text-white">BSc Computer Engineering</div>
              <div className="text-slate-400 text-[11px] mt-2">Network Security, Distributed Systems, Relational Database Management, Software Architecture</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-teal-400 font-bold mb-1">Malawi Telecoms Ltd (MTL)</div>
              <div className="text-white">National Data Centre Operations</div>
              <div className="text-slate-400 text-[11px] mt-2">Managed core enterprise server virtualization, SAN/NAS arrays, perimeter firewalls, and DR hot-standby</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-sky-400 font-bold mb-1">University of Oxford</div>
              <div className="text-white">PGDip Global Health (Candidate)</div>
              <div className="text-slate-400 text-[11px] mt-2">Implementation science, health information intermediaries, and community research translation</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-purple-400 font-bold mb-1">7arts Creative & Phanga Studio</div>
              <div className="text-white">Managing Director (MWK 200M+)</div>
              <div className="text-slate-400 text-[11px] mt-2">Institutional contracts for UNDP, UNICEF, World Bank, EU, and US Embassy; IT infrastructure lead</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-amber-400 font-bold mb-1">Beit CURE Hospital</div>
              <div className="text-white">Health Communications Lead</div>
              <div className="text-slate-400 text-[11px] mt-2">Pediatric orthopedic surgery access, caregiver storytelling, and community engagement in rural Malawi</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-rose-400 font-bold mb-1">Northern Region Water Board</div>
              <div className="text-white">SCADA & Infrastructure</div>
              <div className="text-slate-400 text-[11px] mt-2">Industrial control networks, real-time telemetry acquisition, and converged IT/OT water plant systems</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
