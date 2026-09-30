import React from 'react';
import { Sparkles, Terminal, CheckCircle2, Shield, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-[#090c14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950/70 border border-teal-500/30 text-teal-400 text-xs font-mono mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>FULL ARCHITECTURAL CAPABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Stack & Interdisciplinary Domains
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Synthesizing low-level edge systems, on-device neural vision, modern web/mobile engineering, and qualitative health systems research.
          </p>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-teal-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                  <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                  <span>DOMAIN // 0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-4 tracking-tight">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] text-slate-300 font-mono text-xs border border-white/5 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Production Validated</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
