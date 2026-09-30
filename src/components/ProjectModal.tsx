import React, { useState } from 'react';
import { X, Layers, Cpu, ShieldAlert, CheckCircle2, HardDrive, Terminal, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSimulator?: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenSimulator }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background dismiss click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl rounded-2xl glass-panel bg-[#0d121e] border border-white/10 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090d16]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.period}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {['amr-fintech', 'pocket-body', 'bawo', 'edge-vision'].includes(project.id) && onOpenSimulator && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSimulator(project.id);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono transition-all cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Test in Lab</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Header Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-400 font-mono">
              {project.role}
            </p>
            <p className="text-slate-300 text-base mt-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Screenshot Gallery if available */}
          {project.previewImages && project.previewImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Visual Interface & Artifacts
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {activeImageIndex + 1} of {project.previewImages.length}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-white/10 shadow-lg group">
                <img 
                  src={project.previewImages[activeImageIndex]} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-contain"
                />

                {project.previewImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.previewImages!.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < project.previewImages!.length - 1 ? prev + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {project.previewImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.previewImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-emerald-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Impact Metrics Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Verified Metrics & Performance Specs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 font-mono">
                  <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                  <div className="text-lg font-bold text-emerald-400 tracking-tight">{m.value}</div>
                  {m.detail && <div className="text-[11px] text-slate-400 mt-0.5">{m.detail}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Problem Statement vs Solution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-800/30">
              <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                The Structural Challenge
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
              <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Engineering Solution
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solutionArchitecture}
              </p>
            </div>
          </div>

          {/* Architecture Layers Breakdown */}
          {project.architectureLayers && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Multi-Tier Architecture Topology
              </h4>
              <div className="space-y-3">
                {project.architectureLayers.map((layer, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#090d16] border border-white/5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <span className="font-bold text-white text-sm tracking-tight">{layer.name}</span>
                      <span className="text-xs text-slate-400 font-mono">{layer.description}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {layer.components.map((comp, cIdx) => (
                        <span key={cIdx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offline-First & Real-World Constraints */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/30">
            <h4 className="text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" />
              Offline-First & Power Fault Tolerance
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.offlineConsiderations}
            </p>
          </div>

          {/* Key Highlights Bullets */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Engineering Hallmarks & Field Insights
            </h4>
            <ul className="space-y-2">
              {project.keyHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Full Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Full Technology Ecosystem
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] text-slate-300 font-mono text-xs border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Local Path & Verification */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Host Machine Path:</span>
              <code className="text-emerald-300">{project.localPath}</code>
            </div>
            <span className="text-[10px] text-slate-500">Verified Local Repository</span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#090d16] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all cursor-pointer"
          >
            Close Overview
          </button>

          {['zisamale', 'pocket-body', 'bawo', 'edge-vision'].includes(project.id) && onOpenSimulator && (
            <button
              onClick={() => {
                onClose();
                onOpenSimulator(project.id);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Launch Interactive Simulator</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
