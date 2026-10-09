import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Search, Code, Cpu, Server, Layers, Briefcase } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...SKILL_CATEGORIES.map(c => c.title)];

  const getDomainIcon = (title: string) => {
    if (title.includes('Data Centre')) return <Server className="w-4 h-4 text-accent" />;
    if (title.includes('Edge')) return <Cpu className="w-4 h-4 text-teal" />;
    if (title.includes('Full-Stack')) return <Code className="w-4 h-4 text-info" />;
    if (title.includes('Leadership')) return <Briefcase className="w-4 h-4 text-warn" />;
    return <Layers className="w-4 h-4 text-violet" />;
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
    <section className="py-24 relative bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal/10 border border-teal/30 text-teal text-xs font-mono mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>THE TOOLKIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Skills & Practical Craft
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Tools are just instruments—what matters is what you build with them. Over the last decade, these are the languages, frameworks, and hardware environments I've developed deep muscle memory in.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto scrollbar-none">
            <LayerIcon />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal text-slate-950 font-bold shadow-md shadow-teal/20'
                    : 'bg-surface hover:bg-surface-2 text-muted border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, languages, infra..."
              aria-label="Search skills"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-xs font-mono text-foreground placeholder:text-faint focus:outline-none focus:border-teal transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat) => (
              <motion.div
                key={cat.title}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl glass-panel glass-panel-hover border border-border hover:border-teal/40 transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-surface-2 border border-border">
                    {getDomainIcon(cat.title)}
                  </div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => {
                    const isHighlighted = searchQuery.trim() && skill.toLowerCase().includes(searchQuery.toLowerCase().trim());
                    return (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-lg font-mono text-xs border transition-all ${
                          isHighlighted
                            ? 'bg-teal/20 text-teal border-teal font-semibold'
                            : 'bg-surface-2 text-muted border border-border hover:border-teal/40 hover:text-teal'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 rounded-2xl glass-panel p-8">
            <p className="text-muted font-mono text-sm">
              No skills match "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal text-slate-950 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Stat */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-mono text-muted">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span>{totalSkills} capabilities developed through real production and field deployments</span>
        </div>

      </div>
    </section>
  );
};

const LayerIcon: React.FC = () => (
  <Layers className="w-4 h-4 text-faint flex-shrink-0 mr-1" />
);
