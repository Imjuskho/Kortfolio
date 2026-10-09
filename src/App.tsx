import React, { useState, useEffect, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactMetrics } from './components/ImpactMetrics';
import { ClientsMarquee } from './components/ClientsMarquee';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { Deferred, SectionSkeleton } from './components/Deferred';

// Below-the-fold sections are code-split and mounted on approach.
const ArchitectureLab = React.lazy(() =>
  import('./components/ArchitectureLab').then((m) => ({ default: m.ArchitectureLab })),
);
const ArchitecturalJourney = React.lazy(() =>
  import('./components/ArchitecturalJourney').then((m) => ({ default: m.ArchitecturalJourney })),
);
const PhotographyGallery = React.lazy(() =>
  import('./components/PhotographyGallery').then((m) => ({ default: m.PhotographyGallery })),
);
const SkillMatrix = React.lazy(() =>
  import('./components/SkillMatrix').then((m) => ({ default: m.SkillMatrix })),
);
const ContactSection = React.lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const InteractiveTerminal = React.lazy(() =>
  import('./components/InteractiveTerminal').then((m) => ({ default: m.InteractiveTerminal })),
);

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalMounted, setTerminalMounted] = useState(false);
  const [labSimulator, setLabSimulator] = useState<string>('amr');

  const openTerminal = () => {
    setTerminalMounted(true);
    setTerminalOpen(true);
  };

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to toggle CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalMounted(true);
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSimulator = (projectId: string) => {
    setLabSimulator(projectId);
    const element = document.getElementById('architecture-lab');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-accent/30 selection:text-accent relative">

        <Navbar onOpenTerminal={openTerminal} />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero onOpenTerminal={openTerminal} />

          {/* Impact Metrics Bar */}
          <ImpactMetrics />

          {/* Trusted Partners & Client Logo Wall */}
          <ClientsMarquee />

          {/* Production Systems & Projects Section */}
          <ProjectsSection onOpenSimulator={handleOpenSimulator} />

          {/* Interactive Architecture & Engineering Lab */}
          <Deferred id="architecture-lab" minHeight={880} className="scroll-mt-24">
            <Suspense fallback={<SectionSkeleton minHeight={880} />}>
              <ArchitectureLab initialSimulator={labSimulator} />
            </Suspense>
          </Deferred>

          {/* Architectural Journey: Career, Education & Engineering Theses */}
          <Deferred id="journey" minHeight={760} className="scroll-mt-24">
            <Suspense fallback={<SectionSkeleton minHeight={760} />}>
              <ArchitecturalJourney />
            </Suspense>
          </Deferred>

          {/* Photography & Documentary Visual Archive */}
          <Deferred id="photography" minHeight={760} className="scroll-mt-24">
            <Suspense fallback={<SectionSkeleton minHeight={760} />}>
              <PhotographyGallery />
            </Suspense>
          </Deferred>

          {/* Full Capabilities & Tech Stack */}
          <Deferred id="skills" minHeight={680} className="scroll-mt-24">
            <Suspense fallback={<SectionSkeleton minHeight={680} />}>
              <SkillMatrix />
            </Suspense>
          </Deferred>

          {/* Contact & Collaboration */}
          <Deferred id="contact" minHeight={600} className="scroll-mt-24">
            <Suspense fallback={<SectionSkeleton minHeight={600} />}>
              <ContactSection />
            </Suspense>
          </Deferred>
        </main>

        {/* Footer */}
        <Footer onOpenTerminal={openTerminal} />

        {/* Interactive CLI Terminal Drawer (loaded on first open) */}
        {terminalMounted && (
          <Suspense fallback={null}>
            <InteractiveTerminal
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
              onSelectProject={handleOpenSimulator}
            />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
