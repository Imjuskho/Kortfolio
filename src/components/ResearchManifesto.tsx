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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-sky-400 font-bold mb-1">University of Malawi</div>
              <div className="text-slate-300">Chancellor College</div>
              <div className="text-slate-500 text-[11px] mt-2">Bachelor of Social Science • Environmental Awareness & Behavior Practicum</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-sky-400 font-bold mb-1">Beit CURE International</div>
              <div className="text-slate-300">Hospital Malawi</div>
              <div className="text-slate-500 text-[11px] mt-2">Communications Officer • Pediatric orthopedics, disability access, and health promotion</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-sky-400 font-bold mb-1">Phanga Media & Zisamale</div>
              <div className="text-slate-300">Founder & Creative Director</div>
              <div className="text-slate-500 text-[11px] mt-2">Directing health communications during COVID-19, community video, and digital platforms</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-sky-400 font-bold mb-1">British Council</div>
              <div className="text-slate-300">Fashion Futures Initiative</div>
              <div className="text-slate-500 text-[11px] mt-2">Cross-border field researcher across Malawi and Namibia examining sustainability</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
