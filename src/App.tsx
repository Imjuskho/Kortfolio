import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactMetrics } from './components/ImpactMetrics';
import { ProjectsSection } from './components/ProjectsSection';
import { ArchitectureLab } from './components/ArchitectureLab';
import { ResearchManifesto } from './components/ResearchManifesto';
import { PhotographyGallery } from './components/PhotographyGallery';
import { SkillMatrix } from './components/SkillMatrix';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [labSimulator, setLabSimulator] = useState<string>('zisamale');

  const handleOpenSimulator = (projectId: string) => {
    setLabSimulator(projectId);
    const element = document.getElementById('architecture-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-[#e2e8f0] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-emerald-500/30 selection:text-emerald-300">
      
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

        {/* Research Manifesto & Philosophy */}
        <ResearchManifesto />

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
      />

    </div>
  );
}

export default App;
