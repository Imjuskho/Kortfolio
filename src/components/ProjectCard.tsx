import React from 'react';
import { ArrowUpRight, Cpu, HardDrive, ShieldCheck, Terminal, Layers, CheckCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onOpenSimulator?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onOpenSimulator }) => {
  return (
    <div className={`relative flex flex-col justify-between rounded-2xl glass-panel glass-panel-hover p-6 transition-all duration-300 group border ${
      project.featured ? 'border-emerald-500/30 bg-[#0e1320]/80 shadow-lg shadow-emerald-950/20' : 'border-white/5 bg-[#0b0e17]/80'
    }`}>
      
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-500">
            {project.period}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 tracking-tight flex items-start justify-between gap-2">
          <span>{project.title}</span>
          <button 
            onClick={() => onSelect(project)}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-950/50 transition-all flex-shrink-0"
            title="Inspect project details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
          {project.tagline}
        </p>

        {/* Preview image if available */}
        {project.previewImages && project.previewImages.length > 0 && (
          <div 
            onClick={() => onSelect(project)}
            className="relative mb-4 rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10 cursor-pointer group/img"
          >
            <img 
              src={project.previewImages[0]} 
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/img:opacity-40 transition-opacity" />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-white/10">
              {project.previewImages.length} Screenshots
            </div>
          </div>
        )}

        {/* Badges / Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.badges.slice(0, 3).map((badge, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300/90 border border-emerald-800/40"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Impact Metrics Mini-Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs font-mono">
          {project.impactMetrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase">{m.label}</span>
              <span className="text-white font-bold text-sm tracking-tight group-hover:text-emerald-300 transition-colors">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Tech Stack & CTA */}
      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 5).map((tech, idx) => (
            <span 
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 text-slate-500">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/5">
          <button
            onClick={() => onSelect(project)}
            className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-emerald-950/50 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/10 text-xs font-medium text-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>How It Works</span>
          </button>

          {['amr-fintech', 'pocket-body', 'bawo', 'edge-vision'].includes(project.id) && onOpenSimulator && (
            <button
              onClick={() => onOpenSimulator(project.id)}
              className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
              title="Test in Interactive Lab"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Demo</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
