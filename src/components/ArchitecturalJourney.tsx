import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ShieldCheck, Cpu, HardDrive, Building, GraduationCap, Award, CheckCircle2, ChevronRight, Terminal, Globe2, Briefcase } from 'lucide-react';
import { PERSONAL_INFO, CAREER_EXPERIENCES, EDUCATION_CREDENTIALS, ENGINEERING_THESES } from '../data/portfolioData';

export const ArchitecturalJourney: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'theses'>('experience');

  return (
    <section id="journey" className="py-24 relative bg-[#080b12] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Server className="w-3.5 h-3.5" />
              <span>SYSTEMS ARCHITECT TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Enterprise Data Centre to Distributed Edge
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Over a decade of progressive experience bridging national telecommunications infrastructure, C-suite revenue leadership, and high-concurrency cloud-native platforms.
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0f1422] border border-white/10 gap-1.5 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'experience'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Milestones</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education & Credentials</span>
            </button>
            <button
              onClick={() => setActiveTab('theses')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'theses'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Architectural Theses</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Philosophy Quote Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl glass-panel bg-gradient-to-br from-[#0c1220] via-[#090e1a] to-[#070b14] border border-emerald-500/20 p-8 sm:p-10 mb-16 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ENGINEERING PHILOSOPHY & EXECUTIVE LEADERSHIP</span>
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-100 leading-relaxed tracking-tight mb-6">
              "I began inside the engine rooms of Malawi's national telecommunications backbone—managing servers, storage, network security, and disaster recovery. Whether safeguarding national billing databases or deploying containerized edge-computing meshes across off-grid districts, systems must be deterministic, fault-tolerant, and verified against hard realities."
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
              <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.title.split('|')[0]}</span>
              <span>•</span>
              <span>BSc Computer Engineering (Univ. of Livingstonia)</span>
              <span>•</span>
              <span className="text-amber-300">AWS Solutions Architect Candidate</span>
            </div>
          </div>
        </motion.div>

        {/* Tab 1: Career Experiences */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CAREER_EXPERIENCES.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                        <span className="text-emerald-400 font-semibold">{exp.company}</span>
                        <span>{exp.period}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                        {exp.role}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                      {exp.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Education & Credentials */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {EDUCATION_CREDENTIALS.map((edu, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span className="text-emerald-400 font-semibold">{edu.location}</span>
                      <span>{edu.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                      {edu.degree}
                    </h3>

                    <div className="text-sm font-semibold text-slate-300 mb-3">
                      {edu.institution}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
                      {edu.focus}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Verified Academic Credential</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Architectural Theses */}
          {activeTab === 'theses' && (
            <motion.div
              key="theses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {ENGINEERING_THESES.map((thesis, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                      <span className="text-emerald-400 font-semibold">{thesis.domain}</span>
                      <span>{thesis.period}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                      {thesis.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {thesis.summary}
                    </p>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono text-xs space-y-1.5 mb-4">
                      <div className="text-[10px] text-slate-500 uppercase">Architecture & Implementation:</div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">{thesis.architectureDetails}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Impact: {thesis.impact}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Institutional Client Marquee */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">
            Institutional Organizations, Donors & Multilateral Partners Served
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs">
            {PERSONAL_INFO.institutionalClients.map((client, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] text-slate-300 border border-white/5 hover:border-emerald-500/30 hover:text-white transition-all shadow-sm"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
