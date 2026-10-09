import React, { useState, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, Filter } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';

const ProjectModal = React.lazy(() =>
  import('./ProjectModal').then((m) => ({ default: m.ProjectModal })),
);

interface ProjectsSectionProps {
  onOpenSimulator: (projectId: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Cloud & Data Centre',
  'Edge Computing & CV',
  'FinTech & SaaS',
  'Cultural Tech & Gaming',
  'Systems & Infra'
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenSimulator }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.tagline.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q) ||
        proj.techStack.some((t) => t.toLowerCase().includes(q)) ||
        proj.badges.some((b) => b.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="scroll-mt-24 py-24 relative bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>THINGS I'VE BUILT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Software Made for Real Life
            </h2>
            <p className="text-muted text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Tools designed for real constraints: patchy mobile signals, off-grid solar power, local disbursements that must balance down to the tambala, and our traditional cultural games.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, domain, keywords..."
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-xs font-mono text-foreground placeholder:text-faint focus:outline-none focus:border-accent transition-colors shadow-inner"
            />
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-4 h-4 text-faint flex-shrink-0 mr-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-surface hover:bg-surface-2 text-muted border border-border'
              }`}
            >
              {cat}
              <span className="ml-1.5 opacity-60 text-xs">
                ({cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  onOpenSimulator={onOpenSimulator}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if nothing matches */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 rounded-2xl glass-panel p-8">
            <p className="text-muted font-mono text-sm">
              No systems match your filter "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modal for detailed inspection (code-split, loaded on first open) */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenSimulator={onOpenSimulator}
          />
        </Suspense>
      )}

    </section>
  );
};
