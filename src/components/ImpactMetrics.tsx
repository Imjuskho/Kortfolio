import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Eye, DollarSign, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ImpactMetrics: React.FC = () => {
  const metricIcons = [
    <Server className="w-6 h-6 text-emerald-400" />,
    <ShieldCheck className="w-6 h-6 text-teal-400" />,
    <Eye className="w-6 h-6 text-amber-400" />,
    <DollarSign className="w-6 h-6 text-sky-400" />
  ];

  return (
    <section id="impact" className="py-14 border-y border-white/5 bg-[#0b0f19]/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Subtitle Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>VERIFIED ARCHITECTURAL METRICS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              High-Fidelity Engineering Measured by Hard Realities
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 max-w-md">
            Production systems engineered to survive national data centre compliance, off-grid power instability, and high financial audit standards.
          </div>
        </motion.div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 group overflow-hidden border border-white/5 hover:border-emerald-500/30 shadow-lg shadow-black/20"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                  {metricIcons[idx % metricIcons.length]}
                </div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  SPEC // 0{idx + 1}
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

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
