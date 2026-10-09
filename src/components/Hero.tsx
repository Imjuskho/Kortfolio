import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, MapPin, ChevronRight, ArrowDown, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { asset } from '../lib/asset';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Biography & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >

            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-accent/30 text-accent text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_24px_-8px_var(--glow)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-semibold tracking-wide">ENGINEER • CREATIVE DIRECTOR • BUILDER</span>
              <span className="text-foreground/20">|</span>
              <span className="text-muted flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent" />
                Lilongwe, Malawi
              </span>
            </motion.div>

            {/* Name & Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 text-balance"
            >
              Building systems that hold up in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300">real world.</span>
            </motion.h1>

            {/* Sub-headline / Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-base sm:text-lg font-medium text-muted"
            >
              <span className="text-accent font-mono font-semibold">BSc Computer Engineering</span>
              <span className="text-faint">•</span>
              <span className="text-foreground">Telecom & Cloud Veteran</span>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
            >
              I'm Kondwani. Over the last decade, my work has lived where heavy infrastructure meets human stories—from the quiet hum of server racks inside <strong className="text-foreground font-semibold">Malawi Telecommunications Limited</strong>, to directing documentaries across rural communities for <strong className="text-foreground font-semibold">the UN, World Bank, and EU</strong>, to writing code for solar edge hardware and mobile payments. I care about building things that work with honesty and care.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>See My Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#architecture-lab"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-warn/50 text-foreground font-medium text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-warn" />
                <span>Try the Lab</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/50 text-[#0a66c2] dark:text-[#38bdf8] font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0077b5]/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={asset(PERSONAL_INFO.cv)}
                download="Kondwani-Phanga-CV.pdf"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-surface hover:bg-surface-2 border border-border hover:border-accent/50 text-foreground font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download CV</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3.5 rounded-xl bg-surface-2 hover:bg-accent/10 border border-accent/30 text-accent font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                title="Open Kortfolio CLI (⌘K)"
              >
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">kortfolio&gt;_</span>
              </button>
            </motion.div>

          </motion.div>

          {/* Right Column: Engineering Card with Authentic Headshot & Telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Main Card */}
              <div className="relative rounded-2xl glass-panel p-4 overflow-hidden shadow-[0_20px_50px_-20px_var(--shadow-strong)]">

                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-surface-2 rounded-xl border border-border mb-3 text-xs font-mono text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span className="text-foreground font-bold">{PERSONAL_INFO.name}</span>
                  </div>
                  <span className="text-accent/80">ID: KP-26-MW</span>
                </div>

                {/* Headshot Portrait with Optical Framing */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-surface-2 border border-border shadow-inner group">
                  <img
                    src={asset('/assets/profile/kondwani.png')}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-75" />

                  {/* Corner Target Marks */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-accent/80" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-accent/80" />
                  <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-accent/80" />
                  <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-accent/80" />

                  {/* Bottom Portrait Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-background/90 backdrop-blur-md border border-border text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">BSc Computer Engineering</span>
                      <span className="text-accent font-mono text-xs">Univ of Livingstonia</span>
                    </div>
                    <p className="text-xs text-muted line-clamp-1">
                      AWS Solutions Architect Candidate • 10+ Yrs Systems Leadership
                    </p>
                  </div>
                </div>

                {/* Telemetry Strip below image */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-surface-2 border border-border">
                    <div className="text-xs text-muted uppercase">Focus</div>
                    <div className="text-accent font-semibold truncate">Systems & Stories</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-2 border border-border">
                    <div className="text-xs text-muted uppercase">Home Base</div>
                    <div className="text-warn font-semibold truncate">Lilongwe, Malawi</div>
                  </div>
                </div>

                {/* Subtitle Quote */}
                <div className="mt-2 p-2.5 text-center text-xs text-muted italic font-mono border-t border-border">
                  "Good technology doesn't demand perfect conditions. It respects the environment and the people it lives with."
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="max-w-7xl mx-auto px-4 mt-16 text-center">
        <a
          href="#impact"
          className="inline-flex flex-col items-center text-muted hover:text-accent transition-colors text-xs font-mono"
        >
          <span className="mb-1">SYSTEM TELEMETRY</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

    </section>
  );
};
