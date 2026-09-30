import React from 'react';
import { ArrowDown, Cpu, ShieldCheck, Terminal, MapPin, Sparkles, Download, CheckCircle2, ChevronRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Biography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6 backdrop-blur-md shadow-lg shadow-emerald-950/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold tracking-wide">ACTIVE DEPLOYMENT</span>
              <span className="text-white/20">|</span>
              <span className="text-slate-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                Malawi & Global Health
              </span>
            </div>

            {/* Name & Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Resilient Systems</span> at the Edge of the World.
            </h1>

            {/* Sub-headline / Role */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6 text-lg sm:text-xl font-medium text-slate-300">
              <span className="text-emerald-400 font-mono font-semibold">{PERSONAL_INFO.title}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Computational Anthropologist</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-mono">Creative Director</span>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
              From solar-powered edge vision fleets deployed across rural Malawi and zero-cloud on-device kinematic perception, to AI-augmented community health intelligence supporting <strong className="text-white font-semibold">450 Health Surveillance Assistants</strong> and the mathematical preservation of traditional East African count-and-capture games.
            </p>

            {/* Key Engineering Pillars Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full max-w-xl mb-10 text-xs font-mono">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Offline-First (iCCM)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>On-Device CV (553 pts)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>103 Engine Unit Tests</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>Solar Edge Meshes</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>Oxford Global Health</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                <span>Zero Cloud Egress</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Flagship Systems</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#architecture-lab"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0f141f] hover:bg-[#161d2b] border border-white/10 hover:border-amber-400/50 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Launch Interactive Lab</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="px-4 py-3.5 rounded-xl bg-black/40 hover:bg-black/70 border border-emerald-500/30 text-emerald-400 font-mono text-xs transition-all flex items-center justify-center gap-2"
                title="Open Kortfolio CLI"
              >
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">kortfolio&gt;_</span>
              </button>
            </div>

          </div>

          {/* Right Column: Engineering Card with Authentic Portrait & Telemetry */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

              {/* Main Card */}
              <div className="relative rounded-2xl glass-panel p-4 overflow-hidden border border-white/10 bg-[#0c101a]/90">
                
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-black/60 rounded-xl border border-white/5 mb-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-white font-bold">KONDWANI PHANGA</span>
                  </div>
                  <span className="text-emerald-400/80">ID: KP-26-MW</span>
                </div>

                {/* Portrait with Optical Framing */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-900 border border-white/10 shadow-inner group">
                  <img
                    src="/assets/profile/kondwani.jpg"
                    alt="Kondwani Phanga"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent opacity-80" />

                  {/* Corner Target Marks */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400/80" />
                  <div className="absolute bottom-16 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-400/80" />
                  <div className="absolute bottom-16 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80" />

                  {/* Bottom Portrait Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#090b10]/85 backdrop-blur-md border border-white/10 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">University of Oxford Prospect</span>
                      <span className="text-emerald-400 font-mono text-[10px]">2026/28</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      PGDip in Global Health Research • Health Communication
                    </p>
                  </div>
                </div>

                {/* Telemetry Strip below image */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Primary Focus</div>
                    <div className="text-emerald-400 font-semibold truncate">Edge Health AI</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500 uppercase">Field Location</div>
                    <div className="text-amber-300 font-semibold truncate">Lilongwe, MW</div>
                  </div>
                </div>

                {/* Subtitle / Quote */}
                <div className="mt-2 p-2.5 text-center text-[11px] text-slate-400 italic font-mono border-t border-white/5">
                  "Health information must be communicated in ways communities trust, understand, and recognize as relevant to their lives."
                </div>

              </div>

            </div>
          </div>

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
