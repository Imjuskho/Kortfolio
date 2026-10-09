import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Eye, DollarSign } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ImpactMetrics: React.FC = () => {
  const metricIcons = [
    <Server className="w-6 h-6 text-accent" />,
    <ShieldCheck className="w-6 h-6 text-teal" />,
    <Eye className="w-6 h-6 text-warn" />,
    <DollarSign className="w-6 h-6 text-info" />
  ];

  return (
    <section id="impact" className="scroll-mt-24 py-14 border-y border-border bg-surface/60 relative overflow-hidden">
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
            <div className="text-xs font-mono uppercase tracking-widest text-accent mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>WHERE CODE MEETS REALITY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              A Decade of Building, Learning, and Delivering
            </h2>
          </div>
          <div className="text-xs font-mono text-muted max-w-md">
            Numbers don't tell the whole story, but they show the discipline behind the craft—from server rooms in Blantyre to community projects nationwide.
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
              className="relative p-6 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 group overflow-hidden hover:border-accent/40 shadow-lg"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/15 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-surface-2 border border-border group-hover:scale-110 transition-transform">
                  {metricIcons[idx % metricIcons.length]}
                </div>
                <span className="text-xs font-mono text-muted uppercase tracking-wider">
                  SPEC // 0{idx + 1}
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1 font-mono group-hover:text-accent transition-colors">
                {stat.value}
              </div>

              <div className="text-sm font-semibold text-foreground mb-2">
                {stat.label}
              </div>

              <div className="text-xs text-muted leading-relaxed font-mono">
                {stat.detail}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
