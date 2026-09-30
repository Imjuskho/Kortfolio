import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, ShieldCheck, Terminal, MapPin, Sparkles, Download, CheckCircle2, ChevronRight, Server, Database } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

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
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-emerald-950/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold tracking-wide">ENGINEER • CREATIVE DIRECTOR • BUILDER</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                Lilongwe, Malawi
              </span>
            </motion.div>

            {/* Name & Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Building systems that hold up in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">real world.</span>
            </motion.h1>

            {/* Sub-headline / Role */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-base sm:text-lg font-medium text-slate-300"
            >
              <span className="text-emerald-400 font-mono font-semibold">BSc Computer Engineering</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200">Telecom & Cloud Veteran</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-mono">Managing Director, 7arts</span>
            </motion.div>

            {/* Bio paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8"
            >
              I’m Kondwani. Over the last decade, my work has lived where heavy infrastructure meets human stories—from the quiet hum of server racks inside <strong className="text-white font-semibold">Malawi Telecommunications Limited</strong>, to directing documentaries across rural communities for <strong className="text-white font-semibold">the UN, World Bank, and EU</strong>, to writing code for solar edge hardware and mobile payments. I care about building things that work with honesty and care.
            </motion.p>

            {/* Key Engineering Pillars Chips */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-xl mb-10 text-xs font-mono"
            >
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-emerald-500/30 transition-colors">
                <Server className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Telecom Server Roots</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-teal-500/30 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>AWS Cloud Architecture</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-amber-500/30 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>84 Security Fixes Closed</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-sky-500/30 transition-colors">
                <Cpu className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>Solar Edge & Offline AI</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-purple-500/30 transition-colors">
                <Database className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>Mobile Money Reconciler</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300 hover:border-rose-500/30 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>7arts Studio Leader</span>
              </div>
            </motion.div>

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
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0f141f] hover:bg-[#161d2b] border border-white/10 hover:border-amber-400/50 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Try the Lab</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/30 border border-[#0077b5]/50 text-[#38bdf8] font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0077b5]/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3.5 rounded-xl bg-black/40 hover:bg-black/70 border border-emerald-500/30 text-emerald-400 font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl glass-panel p-4 overflow-hidden border border-white/10 bg-[#0c101a]/90 shadow-2xl">
                
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-black/60 rounded-xl border border-white/5 mb-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
                  </div>
                  <span className="text-emerald-400/80">ID: KP-26-MW</span>
                </div>

                {/* Headshot Portrait with Optical Framing */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-900 border border-white/10 shadow-inner group">
                  <img
                    src="/assets/profile/kondwani.png"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-75" />

                  {/* Corner Target Marks */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400/80" />
                  <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400/80" />
                  <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80" />

                  {/* Bottom Portrait Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#090b10]/90 backdrop-blur-md border border-white/10 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">BSc Computer Engineering</span>
                      <span className="text-emerald-400 font-mono text-[10px]">Univ of Livingstonia</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      AWS Solutions Architect Candidate • 10+ Yrs Systems Leadership
                    </p>
                  </div>
                </div>

                {/* Telemetry Strip below image */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Focus</div>
                    <div className="text-emerald-400 font-semibold truncate">Systems & Stories</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Home Base</div>
                    <div className="text-amber-300 font-semibold truncate">Lilongwe, Malawi</div>
                  </div>
                </div>

                {/* Subtitle Quote */}
                <div className="mt-2 p-2.5 text-center text-[11px] text-slate-300 italic font-mono border-t border-white/5">
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
          className="inline-flex flex-col items-center text-slate-500 hover:text-emerald-400 transition-colors text-xs font-mono"
        >
          <span className="mb-1">SYSTEM TELEMETRY</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

    </section>
  );
};
