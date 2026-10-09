import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, CheckCircle2, Search, Filter, Cpu, Server, Shield, Layers, Code, Briefcase } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.title)];

  const getDomainIcon = (title: string) => {
    if (title.includes('Data Centre')) return <Server className="w-4 h-4 text-emerald-400" />;
    if (title.includes('Edge')) return <Cpu className="w-4 h-4 text-teal-400" />;
    if (title.includes('Full-Stack')) return <Code className="w-4 h-4 text-sky-400" />;
    if (title.includes('Leadership')) return <Briefcase className="w-4 h-4 text-amber-400" />;
    return <Layers className="w-4 h-4 text-purple-400" />;
  };

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.filter(cat => {
      const matchesCategory = selectedCategory === 'All' || cat.title === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatches = cat.title.toLowerCase().includes(q);
      const skillMatches = cat.skills.some(s => s.toLowerCase().includes(q));

      return titleMatches || skillMatches;
    }).map(cat => {
      if (!searchQuery.trim()) return cat;
      const q = searchQuery.toLowerCase().trim();
      return {
        ...cat,
        skills: cat.skills.filter(s => s.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q))
      };
    });
  }, [selectedCategory, searchQuery]);

  const totalSkills = useMemo(() => {
    return SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 py-24 relative bg-[#090c14] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950/70 border border-teal-500/30 text-teal-400 text-xs font-mono mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>THE TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Practical Craft
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Tools are just instruments—what matters is what you build with them. Over the last decade, these are the languages, frameworks, and hardware environments I've developed deep muscle memory in.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. AWS, PyTorch)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>

        {/* Domains Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => (
              <motion.div 
                key={cat.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-6 rounded-2xl glass-panel glass-panel-hover border border-white/5 hover:border-teal-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                    <div className="flex items-center gap-2">
                      {getDomainIcon(cat.title)}
                      <span>DISCIPLINE // 0{idx + 1}</span>
                    </div>
                    <span className="text-xs text-slate-400">{cat.skills.length} tools & skills</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4 tracking-tight group-hover:text-teal-300 transition-colors">
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => {
                      const isHighlighted = searchQuery.trim() && skill.toLowerCase().includes(searchQuery.toLowerCase().trim());
                      return (
                        <span 
                          key={sIdx}
                          className={`px-3 py-1 rounded-lg font-mono text-xs border transition-all ${
                            isHighlighted
                              ? 'bg-teal-500/20 text-teal-200 border-teal-400 font-semibold'
                              : 'bg-white/[0.03] text-slate-300 border border-white/5 hover:border-teal-500/40 hover:text-teal-300'
                          }`}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span className="text-slate-400">Battle-Tested</span>
                  <div className="flex items-center gap-1.5 text-teal-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active in Production</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 rounded-2xl glass-panel p-8">
            <p className="text-slate-400 font-mono text-sm">
              No skills found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Competencies Footer Banner */}
        <div className="mt-12 p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All {totalSkills} skills learned and used in actual client work, products, or field deployments</span>
          </div>
          <div className="text-slate-400 text-xs">
            Core Philosophy: Pragmatic, Resilient & Built to Last
          </div>
        </div>

      </div>
    </section>
  );
};
