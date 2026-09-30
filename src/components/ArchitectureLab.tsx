import React, { useState } from 'react';
import { Cpu, Activity, Play, RefreshCw, CheckCircle2, ShieldCheck, Wifi, WifiOff, Sun, Battery, Eye, Sliders, Database, ArrowRight } from 'lucide-react';

interface ArchitectureLabProps {
  initialSimulator?: string;
}

export const ArchitectureLab: React.FC<ArchitectureLabProps> = ({ initialSimulator = 'zisamale' }) => {
  const [activeTab, setActiveTab] = useState<'zisamale' | 'pocket-body' | 'bawo' | 'edge-vision'>(
    (initialSimulator as any) || 'zisamale'
  );

  // Zisamale state
  const [clinicalCase, setClinicalCase] = useState<'pneumonia' | 'malaria' | 'cholera'>('pneumonia');
  const [zisamaleProcessing, setZisamaleProcessing] = useState(false);
  const [zisamaleStep, setZisamaleStep] = useState(0);

  // Pocket Body state
  const [trackingMode, setTrackingMode] = useState<'full' | 'pose' | 'hands' | 'face'>('full');
  const [metricDepth, setMetricDepth] = useState(true);
  const [simulatedFrame, setSimulatedFrame] = useState(1);

  // Bawo state
  const [selectedPit, setSelectedPit] = useState<number | null>(10);
  const [bawoRuleSet, setBawoRuleSet] = useState<'malawi' | 'kiswahili'>('malawi');
  const [boardState, setBoardState] = useState<number[]>([
    0, 2, 2, 0, 0, 2, 2, 0, // Player North Back
    2, 2, 2, 2, 2, 2, 2, 2, // Player North Front
    2, 2, 6, 2, 2, 2, 2, 2, // Player South Front (Pit 18 is Nyumba)
    0, 2, 2, 0, 0, 2, 2, 0  // Player South Back
  ]);

  // Edge Vision state
  const [batteryLevel, setBatteryLevel] = useState(72);
  const [networkStatus, setNetworkStatus] = useState<'offline' | '2g_burst' | 'online'>('offline');
  const [clipThreshold, setClipThreshold] = useState(0.88);

  const runZisamaleSimulation = () => {
    setZisamaleProcessing(true);
    setZisamaleStep(1);
    setTimeout(() => setZisamaleStep(2), 600);
    setTimeout(() => setZisamaleStep(3), 1200);
    setTimeout(() => {
      setZisamaleStep(4);
      setZisamaleProcessing(false);
    }, 1800);
  };

  const handleBawoPitClick = (index: number) => {
    setSelectedPit(index);
    // Simple visual simulation of sowing
    const newBoard = [...boardState];
    const seeds = newBoard[index];
    if (seeds > 1) {
      newBoard[index] = 0;
      for (let i = 1; i <= seeds; i++) {
        const nextPit = (index + i) % 32;
        newBoard[nextPit] += 1;
      }
      setBoardState(newBoard);
    }
  };

  return (
    <section id="architecture-lab" className="py-24 relative bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lab Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE ENGINEERING PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Architecture Lab
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Inspect and test the deterministic algorithms, offline-first sync pipelines, on-device kinematic perception, and game engines directly in your browser.
          </p>
        </div>

        {/* Simulator Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0f1422] border border-white/10 gap-1.5 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('zisamale')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'zisamale'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Zisamale 4-AI Engines</span>
            </button>

            <button
              onClick={() => setActiveTab('pocket-body')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'pocket-body'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pocket Body (553 Pts)</span>
            </button>

            <button
              onClick={() => setActiveTab('bawo')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'bawo'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Bawo Engine (103 Tests)</span>
            </button>

            <button
              onClick={() => setActiveTab('edge-vision')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'edge-vision'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Edge Vision Solar Mesh</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Zisamale 4-Engine Simulator */}
        {activeTab === 'zisamale' && (
          <div className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Community Health Orchestration Engine
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Zisamale Multi-Agent Clinical Triage & Surveillance
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Simulating offline-first iCCM protocol execution by a Health Surveillance Assistant in rural Malawi.
                </p>
              </div>

              {/* Case Selection & Trigger */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => { setClinicalCase('pneumonia'); setZisamaleStep(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      clinicalCase === 'pneumonia' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Child 14mo (Chest Indrawing)
                  </button>
                  <button
                    onClick={() => { setClinicalCase('malaria'); setZisamaleStep(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      clinicalCase === 'malaria' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Child 3yo (High Fever & RDT+)
                  </button>
                  <button
                    onClick={() => { setClinicalCase('cholera'); setZisamaleStep(0); }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      clinicalCase === 'cholera' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cluster (Severe Dehydration)
                  </button>
                </div>

                <button
                  onClick={runZisamaleSimulation}
                  disabled={zisamaleProcessing}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  {zisamaleProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  <span>Execute Triage Cycle</span>
                </button>
              </div>
            </div>

            {/* 4 Engine Cards Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              
              {/* Engine 1: MAMA-AI */}
              <div className={`p-5 rounded-xl border transition-all ${
                zisamaleStep >= 1 ? 'bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/30' : 'bg-black/30 border-white/5 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="text-xs font-bold text-emerald-400">01 // MAMA-AI</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">ON-DEVICE</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">Clinical Risk Scoring</div>
                <p className="text-xs text-slate-400 mb-3">
                  Runs locally on Android inside SQLite WAL transaction.
                </p>
                {zisamaleStep >= 1 ? (
                  <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-emerald-300 space-y-1">
                    <div>Status: <span className="text-white font-bold">TRIAGED</span></div>
                    <div>Score: <span className="text-amber-400">0.94 CRITICAL</span></div>
                    <div>Protocol: <span className="text-sky-300">Amoxicillin + Urgent Ref</span></div>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-600">Awaiting clinical input...</div>
                )}
              </div>

              {/* Engine 2: ULALO-AI */}
              <div className={`p-5 rounded-xl border transition-all ${
                zisamaleStep >= 2 ? 'bg-sky-950/30 border-sky-500/40 shadow-lg shadow-sky-950/30' : 'bg-black/30 border-white/5 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="text-xs font-bold text-sky-400">02 // ULALO-AI</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">GEO-SPATIAL</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">Outbreak Clustering</div>
                <p className="text-xs text-slate-400 mb-3">
                  Spatiotemporal anomaly detection against 14-day village baselines.
                </p>
                {zisamaleStep >= 2 ? (
                  <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-sky-300 space-y-1">
                    <div>GPS: <span className="text-white">Ntchisi Central (13.37°S)</span></div>
                    <div>Cluster Index: <span className="text-amber-400">+2.8σ (Elevated)</span></div>
                    <div>Alert: <span className="text-rose-300">DHO Sentinel Dispatched</span></div>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-600">Waiting for GPS lock...</div>
                )}
              </div>

              {/* Engine 3: CHUMA-AI */}
              <div className={`p-5 rounded-xl border transition-all ${
                zisamaleStep >= 3 ? 'bg-amber-950/30 border-amber-500/40 shadow-lg shadow-amber-950/30' : 'bg-black/30 border-white/5 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="text-xs font-bold text-amber-400">03 // CHUMA-AI</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">LOGISTICS</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">Facility & Supply Load</div>
                <p className="text-xs text-slate-400 mb-3">
                  Calculates referral facility bed availability and drug stock.
                </p>
                {zisamaleStep >= 3 ? (
                  <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-amber-300 space-y-1">
                    <div>Referral: <span className="text-white">Ntchisi Dist Hospital</span></div>
                    <div>Bed Status: <span className="text-emerald-400">Oxygen Slot Reserved</span></div>
                    <div>Amox Stock: <span className="text-emerald-400">420 units (Adequate)</span></div>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-600">Awaiting routing query...</div>
                )}
              </div>

              {/* Engine 4: SAMALA-AI */}
              <div className={`p-5 rounded-xl border transition-all ${
                zisamaleStep >= 4 ? 'bg-purple-950/30 border-purple-500/40 shadow-lg shadow-purple-950/30' : 'bg-black/30 border-white/5 opacity-50'
              }`}>
                <div className="flex items-center justify-between mb-3 font-mono">
                  <span className="text-xs font-bold text-purple-400">04 // SAMALA-AI</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">TRANSLATION</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">Chichewa Caregiver Audio</div>
                <p className="text-xs text-slate-400 mb-3">
                  Synthesizes evidence into trusted vernacular counseling prompts.
                </p>
                {zisamaleStep >= 4 ? (
                  <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-purple-300 space-y-1">
                    <div>Audio: <span className="text-emerald-300">Generated (18s)</span></div>
                    <div className="italic text-slate-300">"Tengani mwanayu ku chipatala mwachangu..."</div>
                    <div>Caregiver Trust: <span className="text-white">Culturally Verified</span></div>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-600">Awaiting protocol output...</div>
                )}
              </div>

            </div>

            {/* Offline Sync Ledger Bar */}
            <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Local Ledger:</span>
                <span className="text-white font-semibold">SQLite WAL (Encrypted)</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Record ID:</span>
                <span className="text-emerald-300">REC-2026-09-MW-8821</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <WifiOff className="w-4 h-4 text-amber-400" />
                <span>Offline Queue: 1 item pending opportunistic sync</span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Pocket Body Simulator */}
        {activeTab === 'pocket-body' && (
          <div className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  On-Device Optical Kinematics
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Pocket Body Kinematic Tracking Engine (553 Landmarks)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  MediaPipe BlazePose + Hand + Face Mesh running zero-cloud perception with metric depth.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  {(['full', 'pose', 'hands', 'face'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTrackingMode(mode)}
                      className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                        trackingMode === mode ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setMetricDepth(!metricDepth)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                    metricDepth ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-black/40 text-slate-400 border-white/10'
                  }`}
                >
                  Metric World Z: {metricDepth ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Visual Canvas Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              
              {/* Left: 2D/3D Wireframe Skeleton Canvas Simulation */}
              <div className="lg:col-span-8 relative aspect-[16/10] rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

                {/* SVG Skeleton Simulation */}
                <svg className="w-full h-full p-8" viewBox="0 0 400 300">
                  {/* Torso & Spine */}
                  <line x1="200" y1="90" x2="200" y2="170" stroke="#10b981" strokeWidth="3" />
                  <line x1="160" y1="100" x2="240" y2="100" stroke="#10b981" strokeWidth="3" />
                  <line x1="170" y1="170" x2="230" y2="170" stroke="#10b981" strokeWidth="3" />

                  {/* Arms */}
                  <line x1="160" y1="100" x2="130" y2="140" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="130" y1="140" x2="110" y2="180" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="240" y1="100" x2="270" y2="140" stroke="#34d399" strokeWidth="2.5" />
                  <line x1="270" y1="140" x2="290" y2="180" stroke="#34d399" strokeWidth="2.5" />

                  {/* Legs */}
                  <line x1="170" y1="170" x2="165" y2="230" stroke="#059669" strokeWidth="2.5" />
                  <line x1="165" y1="230" x2="160" y2="280" stroke="#059669" strokeWidth="2.5" />
                  <line x1="230" y1="170" x2="235" y2="230" stroke="#059669" strokeWidth="2.5" />
                  <line x1="235" y1="230" x2="240" y2="280" stroke="#059669" strokeWidth="2.5" />

                  {/* Head & Neck */}
                  <circle cx="200" cy="65" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                  
                  {/* Face Mesh Dots (simulated 478 points) */}
                  {(trackingMode === 'full' || trackingMode === 'face') && (
                    <>
                      <circle cx="193" cy="60" r="1.5" fill="#38bdf8" />
                      <circle cx="207" cy="60" r="1.5" fill="#38bdf8" />
                      <circle cx="200" cy="67" r="1.5" fill="#38bdf8" />
                      <path d="M190 75 Q200 80 210 75" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    </>
                  )}

                  {/* Hand Mesh (simulated 42 points) */}
                  {(trackingMode === 'full' || trackingMode === 'hands') && (
                    <>
                      <circle cx="110" cy="180" r="4" fill="#fbbf24" />
                      <circle cx="105" cy="190" r="2" fill="#fbbf24" />
                      <circle cx="110" cy="192" r="2" fill="#fbbf24" />
                      <circle cx="115" cy="190" r="2" fill="#fbbf24" />

                      <circle cx="290" cy="180" r="4" fill="#fbbf24" />
                      <circle cx="285" cy="190" r="2" fill="#fbbf24" />
                      <circle cx="290" cy="192" r="2" fill="#fbbf24" />
                      <circle cx="295" cy="190" r="2" fill="#fbbf24" />
                    </>
                  )}

                  {/* Key Joint Nodes */}
                  <circle cx="160" cy="100" r="4" fill="#10b981" />
                  <circle cx="240" cy="100" r="4" fill="#10b981" />
                  <circle cx="130" cy="140" r="3.5" fill="#10b981" />
                  <circle cx="270" cy="140" r="3.5" fill="#10b981" />
                  <circle cx="170" cy="170" r="4" fill="#10b981" />
                  <circle cx="230" cy="170" r="4" fill="#10b981" />
                  <circle cx="165" cy="230" r="3.5" fill="#10b981" />
                  <circle cx="235" cy="230" r="3.5" fill="#10b981" />
                </svg>

                {/* HUD Live Overlay */}
                <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono space-y-0.5">
                  <div className="text-emerald-400 font-bold">● PERCEPTION: ACTIVE (60 FPS)</div>
                  <div className="text-slate-400">Total Keypoints: <span className="text-white font-bold">{trackingMode === 'full' ? '553' : trackingMode === 'pose' ? '33' : trackingMode === 'hands' ? '42' : '478'}</span></div>
                  <div className="text-slate-400">Depth Mode: <span className="text-amber-400">{metricDepth ? 'World Metric (mm)' : 'Normalized (0..1)'}</span></div>
                </div>

                <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                  Zero Cloud Egress Guaranteed
                </div>
              </div>

              {/* Right: Telemetry & Invariant Checks */}
              <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 uppercase text-[10px]">Data Sovereignty Audit</div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Cloud Packets Sent:</span>
                    <span className="text-emerald-400 font-bold">0.00 KB</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>On-Device Memory:</span>
                    <span className="text-white">124 MB RAM</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Pipeline Latency:</span>
                    <span className="text-emerald-400 font-bold">14.8 ms</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Apple Vision Engine:</span>
                    <span className="text-white">CoreML ANE</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-slate-400 uppercase text-[10px]">Guided 6-Pose Scan</div>
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    Ensures anterior, posterior, and lateral joint planes are unoccluded before export.
                  </div>
                  <div className="p-2 rounded bg-emerald-950/40 text-emerald-300 text-[10px]">
                    ✓ Coronal plane verified (100% confidence)
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 3: Bawo Traditional Mancala Simulator */}
        {activeTab === 'bawo' && (
          <div className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Mathematical Cultural Preservation
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Bawo Engine: 4×8 Board & Tournament Rules
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Interactive simulation of Malawian Bawo and Zanzibari Bao la Kiswahili (103 unit tests pinned).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBawoRuleSet('malawi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    bawoRuleSet === 'malawi' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'text-slate-400 border-white/10'
                  }`}
                >
                  Malawian Bawo
                </button>
                <button
                  onClick={() => setBawoRuleSet('kiswahili')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    bawoRuleSet === 'kiswahili' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'text-slate-400 border-white/10'
                  }`}
                >
                  Zanzibari Bao la Kiswahili
                </button>
              </div>
            </div>

            {/* Board Visualizer (4 Rows of 8 Pits) */}
            <div className="mt-8 p-6 rounded-2xl bg-[#1c1510] border-2 border-amber-900/60 shadow-2xl relative overflow-hidden">
              <div className="text-center text-xs font-mono text-amber-500/70 mb-4 tracking-widest uppercase">
                NORTH PLAYER (OPPONENT TERRITORY)
              </div>

              {/* 4 Rows */}
              <div className="space-y-3 max-w-3xl mx-auto">
                {/* Row 0: North Back */}
                <div className="grid grid-cols-8 gap-2">
                  {boardState.slice(0, 8).map((seeds, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBawoPitClick(idx)}
                      className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedPit === idx ? 'border-amber-400 bg-amber-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-amber-700/60'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-amber-700">{idx}</span>
                      <span className="text-lg font-bold font-mono text-amber-200">{seeds}</span>
                    </button>
                  ))}
                </div>

                {/* Row 1: North Front */}
                <div className="grid grid-cols-8 gap-2 pb-3 border-b border-amber-900/40">
                  {boardState.slice(8, 16).map((seeds, idx) => (
                    <button
                      key={idx + 8}
                      onClick={() => handleBawoPitClick(idx + 8)}
                      className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedPit === idx + 8 ? 'border-amber-400 bg-amber-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-amber-700/60'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-amber-700">{idx + 8}</span>
                      <span className="text-lg font-bold font-mono text-amber-200">{seeds}</span>
                    </button>
                  ))}
                </div>

                {/* Row 2: South Front (Player Active) */}
                <div className="grid grid-cols-8 gap-2 pt-3">
                  {boardState.slice(16, 24).map((seeds, idx) => {
                    const pitIndex = idx + 16;
                    const isNyumba = pitIndex === 18; // Traditional Nyumba Pit
                    return (
                      <button
                        key={pitIndex}
                        onClick={() => handleBawoPitClick(pitIndex)}
                        className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          selectedPit === pitIndex ? 'border-emerald-400 bg-emerald-950/80 scale-105' : 
                          isNyumba ? 'border-amber-500/60 bg-amber-950/40' : 'border-amber-950/80 bg-black/60 hover:border-emerald-700/60'
                        }`}
                      >
                        <span className="text-[10px] font-mono text-amber-700">
                          {pitIndex} {isNyumba && '★'}
                        </span>
                        <span className="text-lg font-bold font-mono text-white">{seeds}</span>
                        {isNyumba && (
                          <span className="absolute bottom-1 text-[8px] font-mono text-amber-400">NYUMBA</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Row 3: South Back */}
                <div className="grid grid-cols-8 gap-2">
                  {boardState.slice(24, 32).map((seeds, idx) => (
                    <button
                      key={idx + 24}
                      onClick={() => handleBawoPitClick(idx + 24)}
                      className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedPit === idx + 24 ? 'border-emerald-400 bg-emerald-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-emerald-700/60'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-amber-700">{idx + 24}</span>
                      <span className="text-lg font-bold font-mono text-amber-200">{seeds}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center text-xs font-mono text-emerald-400/80 mt-4 tracking-widest uppercase">
                SOUTH PLAYER (YOUR TERRITORY)
              </div>
            </div>

            {/* Rule Explanation Strip */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">Front-Row Priority:</span>
                <p className="text-slate-400 mt-1">
                  Must sow from front row while any front pit has 2+ seeds. Back row unlocks only when front row is depleted.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">Mtaji Capture Chain:</span>
                <p className="text-slate-400 mt-1">
                  When the last seed lands in an occupied front pit opposite enemy seeds, full opponent column is captured!
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-amber-400 font-bold">The Nyumba ("House"):</span>
                <p className="text-slate-400 mt-1">
                  Holds 6+ seeds; grants tactical choice to stop sowing (ku lala) or trigger reverse directional safaris.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Edge Vision Solar Mesh Simulator */}
        {activeTab === 'edge-vision' && (
          <div className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Solar Edge Computing Mesh
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Edge Vision: On-Device CLIP Deduplication & Store-and-Forward
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Managing thermal, power, and cellular satellite uplink costs across rural Malawian deployments.
                </p>
              </div>

              {/* Network State Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setNetworkStatus('offline')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    networkStatus === 'offline' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold' : 'text-slate-400 border-white/10'
                  }`}
                >
                  <WifiOff className="w-3.5 h-3.5 inline mr-1" />
                  Air-Gapped
                </button>
                <button
                  onClick={() => setNetworkStatus('2g_burst')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    networkStatus === '2g_burst' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : 'text-slate-400 border-white/10'
                  }`}
                >
                  <Wifi className="w-3.5 h-3.5 inline mr-1" />
                  2G Burst (TNM/Airtel)
                </button>
              </div>
            </div>

            {/* Sliders & Visual Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
              
              {/* Sliders Control Panel */}
              <div className="lg:col-span-4 space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Battery className="w-3.5 h-3.5 text-emerald-400" />
                      Solar Battery Charge:
                    </span>
                    <span className="text-white font-bold">{batteryLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={batteryLevel}
                    onChange={(e) => setBatteryLevel(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    {batteryLevel < 25 ? '⚠️ Power conservation mode: throttling camera FPS' : 'Normal solar absorption cycle'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      CLIP Sim Threshold:
                    </span>
                    <span className="text-white font-bold">{clipThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min="0.70"
                    max="0.99"
                    step="0.01"
                    value={clipThreshold}
                    onChange={(e) => setClipThreshold(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-500">
                    Frames with cosine similarity &gt; {clipThreshold} are purged locally before upload.
                  </div>
                </div>
              </div>

              {/* Visual Pipeline Display */}
              <div className="lg:col-span-8 p-5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-4">
                <div className="text-slate-400 uppercase text-[10px]">Active Data Pipeline Status</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] text-slate-500">RAW INGESTION</div>
                    <div className="text-white font-bold text-sm mt-0.5">1,240 frames/hr</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Camera Sensor Online</div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                    <div className="text-[10px] text-emerald-400">CLIP FILTERING</div>
                    <div className="text-emerald-300 font-bold text-sm mt-0.5">-78% Redundancy</div>
                    <div className="text-[10px] text-slate-300 mt-1">967 near-duplicates purged</div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] text-slate-500">TRANSMISSION BUFFER</div>
                    <div className="text-white font-bold text-sm mt-0.5">273 high-entropy frames</div>
                    <div className="text-[10px] text-amber-400 mt-1">
                      {networkStatus === 'offline' ? 'Queued to local SSD' : 'Transmitting via 2G burst'}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#070b12] border border-white/5 text-[11px] leading-relaxed text-slate-300">
                  <strong>Estimated Monthly Satellite/Cellular Savings:</strong> $840 USD per solar edge node. Ground truth images are safely stored in local partitioned NVMe flash and transmitted in compressed batches during off-peak night windows.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
