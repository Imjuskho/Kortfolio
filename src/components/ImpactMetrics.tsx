import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Eye, DollarSign } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ImpactMetrics: React.FC = () => {
  const metricIcons = [
    <Server className="w-5 h-5 text-accent" />,
    <DollarSign className="w-5 h-5 text-info" />,
    <ShieldCheck className="w-5 h-5 text-teal" />,
    <Eye className="w-5 h-5 text-warn" />
  ];

  return (
    <section id="impact" className="scroll-mt-24 py-16 border-y border-border bg-surface/60 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-radial-gradient pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-12 gap-4 md:items-end mb-10"
        >
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>OPERATING RECORD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight text-balance">
              Ten years, measured in what shipped.
            </h2>
          </div>
          <p className="md:col-span-5 text-sm text-muted leading-relaxed md:pb-1">
            Four numbers that keep the work honest — servers racked in Blantyre, donor contracts run through 7arts, audit findings closed, and AI that works where there is no signal.
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <motion.div
              key={stat.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="relative flex flex-col p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 shadow-[0_10px_30px_-20px_var(--shadow-strong)] hover:shadow-[0_24px_50px_-24px_var(--shadow-strong)] transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

              <div className="relative flex items-center justify-between mb-5">
                <div className="p-2.5 rounded-xl bg-surface-2 border border-border group-hover:border-accent/40 group-hover:scale-105 transition-all">
                  {metricIcons[idx % metricIcons.length]}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 px-2 py-1 rounded-full bg-accent/5 border border-accent/20">
                  {stat.tag}
                </span>
              </div>

              <div className="relative flex items-end gap-1.5 tabular-nums">
                {stat.prefix && (
                  <span className="text-base font-mono font-semibold text-muted leading-none mb-1">{stat.prefix}</span>
                )}
                <span className="text-4xl font-extrabold font-mono text-foreground tracking-tight leading-none group-hover:text-accent transition-colors">
                  {stat.number}
                </span>
                {stat.unit && (
                  <span className="text-sm font-mono font-semibold text-muted leading-none mb-1">{stat.unit}</span>
                )}
              </div>

              <div className="relative my-4 h-px w-full bg-border overflow-hidden rounded-full">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.12, duration: 0.9, ease: 'easeOut' }}
                  className="h-full w-full origin-left bg-accent"
                />
              </div>

              <div className="relative text-sm font-semibold text-foreground mb-1.5 leading-snug">
                {stat.label}
              </div>
              <div className="relative text-xs text-muted leading-relaxed">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};