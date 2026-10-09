import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactMetrics } from './components/ImpactMetrics';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitectureLab } from './components/ArchitectureLab';
import { ArchitecturalJourney } from './components/ArchitecturalJourney';
import { PhotographyGallery } from './components/PhotographyGallery';
import { SkillMatrix } from './components/SkillMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [labSimulator, setLabSimulator] = useState<string>('amr');

  // Top Reading / Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to toggle CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSimulator = (projectId: string) => {
    setLabSimulator(projectId);
    const element = document.getElementById('architecture-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#090b10] text-[#e2e8f0] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      
      {/* Scroll Progress Bar at very top of screen */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Sticky Navigation */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Impact Metrics Bar */}
        <ImpactMetrics />

        {/* Production Systems & Projects Section */}
        <ProjectsSection onOpenSimulator={handleOpenSimulator} />

        {/* Interactive Architecture & Engineering Lab */}
        <ArchitectureLab initialSimulator={labSimulator} />

        {/* Architectural Journey: Career, Education & Engineering Theses */}
        <ArchitecturalJourney />

        {/* Photography & Documentary Visual Archive */}
        <PhotographyGallery />

        {/* Full Capabilities & Tech Stack */}
        <SkillMatrix />

        {/* Contact & Collaboration */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive CLI Terminal Drawer */}
      <InteractiveTerminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        onSelectProject={handleOpenSimulator}
      />

    </div>
    </MotionConfig>
  );
}

export default App;
