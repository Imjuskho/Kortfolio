import React from 'react';
import { Users, Eye, Cpu, WifiOff, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ImpactMetrics: React.FC = () => {
  const metricIcons = [
    <Users className="w-6 h-6 text-emerald-400" />,
    <Eye className="w-6 h-6 text-teal-400" />,
    <Cpu className="w-6 h-6 text-amber-400" />,
    <WifiOff className="w-6 h-6 text-sky-400" />
  ];

  return (
    <section id="impact" className="py-12 border-y border-white/5 bg-[#0b0f19]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Subtitle Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
              Field Telemetry & Verified Impact
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              High-Fidelity Engineering Measured by Hard Realities
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 max-w-md">
            Production systems engineered to survive sub-Saharan power instability, rural network blackouts, and high data sovereignity thresholds.
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="relative p-6 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 group overflow-hidden border border-white/5 hover:border-emerald-500/30"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                  {metricIcons[idx % metricIcons.length]}
                </div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  STAT // 0{idx + 1}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1 font-mono group-hover:text-emerald-300 transition-colors">
                {stat.value}
              </div>

              <div className="text-sm font-semibold text-slate-200 mb-2">
                {stat.label}
              </div>

              <div className="text-xs text-slate-400 leading-relaxed font-mono">
                {stat.detail}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
