import React, { useState, useEffect } from 'react';
import { X, Layers, Cpu, ShieldAlert, CheckCircle2, HardDrive, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useDialogA11y } from '../hooks/useDialogA11y';
import { asset } from '../lib/asset';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenSimulator?: (projectId: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenSimulator }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const dialogRef = useDialogA11y(!!project, onClose);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [project?.id]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">

      {/* Background dismiss click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
        tabIndex={-1}
        className="relative w-full max-w-4xl rounded-2xl glass-panel border border-border shadow-[0_24px_60px_-20px_var(--shadow-strong)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
      >

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-accent/10 text-accent border border-accent/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted">
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
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warn/10 hover:bg-warn/20 text-warn border border-warn/30 text-xs font-mono transition-all cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Test in Lab</span>
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="p-1.5 rounded-lg bg-surface hover:bg-surface-2 text-muted hover:text-foreground transition-all cursor-pointer"
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-accent font-mono">
              {project.role}
            </p>
            <p className="text-muted text-base mt-2 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Screenshot Gallery if available */}
          {project.previewImages && project.previewImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  Visual Interface & Artifacts
                </span>
                <span className="text-xs font-mono text-muted">
                  {activeImageIndex + 1} of {project.previewImages.length}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-black border border-border shadow-lg group">
                <img
                  src={asset(project.previewImages[activeImageIndex])}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-contain"
                />

                {project.previewImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.previewImages!.length - 1))}
                      aria-label="Previous screenshot"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev < project.previewImages!.length - 1 ? prev + 1 : 0))}
                      aria-label="Next screenshot"
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
                      aria-label={`Show screenshot ${idx + 1} of ${project.previewImages!.length}`}
                      aria-current={activeImageIndex === idx}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-accent scale-105' : 'border-border opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={asset(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Impact Metrics Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
              Verified Metrics & Performance Specs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface-2 border border-border font-mono">
                  <div className="text-xs text-muted uppercase">{m.label}</div>
                  <div className="text-lg font-bold text-accent tracking-tight">{m.value}</div>
                  {m.detail && <div className="text-xs text-muted mt-0.5">{m.detail}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Problem Statement vs Solution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 dark:border-rose-800/30">
              <h4 className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                The Structural Challenge
              </h4>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-accent/5 border border-accent/20 dark:border-emerald-800/30">
              <h4 className="text-xs font-mono font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Engineering Solution
              </h4>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.solutionArchitecture}
              </p>
            </div>
          </div>

          {/* Architecture Layers Breakdown */}
          {project.architectureLayers && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" />
                Multi-Tier Architecture Topology
              </h4>
              <div className="space-y-3">
                {project.architectureLayers.map((layer, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-surface-2 border border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <span className="font-bold text-foreground text-sm tracking-tight">{layer.name}</span>
                      <span className="text-xs text-muted font-mono">{layer.description}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {layer.components.map((comp, cIdx) => (
                        <span key={cIdx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface text-muted border border-border">
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
          <div className="p-4 rounded-xl bg-warn/5 dark:bg-amber-950/20 border border-warn/20 dark:border-amber-800/30">
            <h4 className="text-xs font-mono font-semibold text-warn uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" />
              Offline-First & Power Fault Tolerance
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {project.offlineConsiderations}
            </p>
          </div>

          {/* Key Highlights Bullets */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
              Engineering Hallmarks & Field Insights
            </h4>
            <ul className="space-y-2">
              {project.keyHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Full Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted mb-3">
              Full Technology Ecosystem
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-surface-2 text-muted font-mono text-xs border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Local Path & Verification */}
          <div className="p-3.5 rounded-xl bg-surface-2 border border-border font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-muted">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Host Machine Path:</span>
              <code className="text-accent">{project.localPath}</code>
            </div>
            <span className="text-xs text-muted">Verified Local Repository</span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-border bg-surface-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface hover:bg-surface text-muted text-xs font-medium transition-all cursor-pointer"
          >
            Close Overview
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface hover:bg-surface text-muted hover:text-foreground border border-border text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
                title="View Source on GitHub"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            )}

            {['amr-fintech', 'pocket-body', 'bawo', 'edge-vision'].includes(project.id) && onOpenSimulator && (
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

    </div>
  );
};
