import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Play, RefreshCw, CheckCircle2, ShieldCheck, Wifi, WifiOff, Sun, Battery, Eye, Sliders, Database, ArrowRight, DollarSign, Lock } from 'lucide-react';

interface ArchitectureLabProps {
  initialSimulator?: string;
}

export const ArchitectureLab: React.FC<ArchitectureLabProps> = ({ initialSimulator = 'amr' }) => {
  const getMappedTab = (id: string): 'amr' | 'edge-vision' | 'pocket-body' | 'bawo' => {
    if (id === 'amr-fintech' || id === 'amr') return 'amr';
    if (id === 'edge-vision') return 'edge-vision';
    if (id === 'pocket-body') return 'pocket-body';
    if (id === 'bawo') return 'bawo';
    return 'amr';
  };

  const [activeTab, setActiveTab] = useState<'amr' | 'edge-vision' | 'pocket-body' | 'bawo'>(
    getMappedTab(initialSimulator)
  );

  useEffect(() => {
    if (initialSimulator) {
      setActiveTab(getMappedTab(initialSimulator));
    }
  }, [initialSimulator]);

  // AMR FinTech State
  const [amrProcessing, setAmrProcessing] = useState(false);
  const [amrStep, setAmrStep] = useState(0);
  const [amrOperator, setAmrOperator] = useState<'airtel' | 'tnm' | 'mpesa'>('airtel');

  // Pocket Body state
  const [trackingMode, setTrackingMode] = useState<'full' | 'pose' | 'hands' | 'face'>('full');
  const [metricDepth, setMetricDepth] = useState(true);

  // Bawo state
  const [selectedPit, setSelectedPit] = useState<number | null>(18);
  const [bawoRuleSet, setBawoRuleSet] = useState<'malawi' | 'kiswahili'>('malawi');
  const [boardState, setBoardState] = useState<number[]>([
    0, 2, 2, 0, 0, 2, 2, 0, // Player North Back
    2, 2, 2, 2, 2, 2, 2, 2, // Player North Front
    2, 2, 6, 2, 2, 2, 2, 2, // Player South Front (Pit 18 is Nyumba)
    0, 2, 2, 0, 0, 2, 2, 0  // Player South Back
  ]);

  // Edge Vision state
  const [batteryLevel, setBatteryLevel] = useState(74);
  const [networkStatus, setNetworkStatus] = useState<'offline' | '2g_burst' | 'online'>('offline');
  const [clipThreshold, setClipThreshold] = useState(0.88);

  const runAmrSimulation = () => {
    setAmrProcessing(true);
    setAmrStep(1);
    setTimeout(() => setAmrStep(2), 500);
    setTimeout(() => setAmrStep(3), 1100);
    setTimeout(() => {
      setAmrStep(4);
      setAmrProcessing(false);
    }, 1700);
  };

  const handleBawoPitClick = (index: number) => {
    setSelectedPit(index);
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
    <section id="architecture-lab" className="scroll-mt-24 py-24 relative bg-background border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Lab Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warn/10 border border-warn/30 text-warn text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>HANDS-ON SIMULATORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            The Interactive Lab
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            Instead of just talking about system design, I like to let people play with it. Try out live simulations of mobile money reconciliation, solar edge camera filtering, body motion tracking, and our traditional Bawo board game.
          </p>
        </motion.div>

        {/* Simulator Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-surface border border-border gap-1.5 max-w-full overflow-x-auto shadow-xl">
            <button
              onClick={() => setActiveTab('amr')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'amr'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Mobile Money Reconciler</span>
            </button>

            <button
              onClick={() => setActiveTab('edge-vision')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'edge-vision'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Solar Edge Vision</span>
            </button>

            <button
              onClick={() => setActiveTab('pocket-body')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'pocket-body'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pocket Body Motion</span>
            </button>

            <button
              onClick={() => setActiveTab('bawo')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'bawo'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Bawo Traditional Game</span>
            </button>
          </div>
        </div>

        {/* Tab 1: AMR FinTech Simulator */}
        <div className="dark">
        <AnimatePresence mode="wait">
          {activeTab === 'amr' && (
            <motion.div
              key="amr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Multi-Tenant Cloud Financial Architecture
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    AMR: Automated Mobile Money Reconciliation Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Simulating bulk disbursement and instant double-entry general ledger reconciliation across Malawian mobile operators.
                  </p>
                </div>

                {/* Operator Selector & Run Trigger */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                    <button
                      onClick={() => { setAmrOperator('airtel'); setAmrStep(0); }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        amrOperator === 'airtel' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Airtel Money MW
                    </button>
                    <button
                      onClick={() => { setAmrOperator('tnm'); setAmrStep(0); }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        amrOperator === 'tnm' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      TNM Mpamba
                    </button>
                    <button
                      onClick={() => { setAmrOperator('mpesa'); setAmrStep(0); }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        amrOperator === 'mpesa' ? 'bg-red-500/20 text-red-300 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      M-Pesa B2C
                    </button>
                  </div>

                  <button
                    onClick={runAmrSimulation}
                    disabled={amrProcessing}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                  >
                    {amrProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    <span>Execute Batch & Reconcile</span>
                  </button>
                </div>
              </div>

              {/* 4 Pipeline Stages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                
                {/* Stage 1 */}
                <div className={`p-5 rounded-xl border transition-all ${
                  amrStep >= 1 ? 'bg-emerald-950/30 border-emerald-500/40 shadow-lg shadow-emerald-950/30' : 'bg-black/30 border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <span className="text-xs font-bold text-emerald-400">01 // AWS VPC GATEWAY</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400">INGESTION</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">Disbursement Batch</div>
                  <p className="text-xs text-slate-400 mb-3">
                    Batch received via encrypted TLS endpoint with AWS IAM role auth.
                  </p>
                  {amrStep >= 1 ? (
                    <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-emerald-300 space-y-1">
                      <div>Tenant: <span className="text-white">UNICEF_RELIEF_MW</span></div>
                      <div>Recipients: <span className="text-amber-400">1,450 beneficiaries</span></div>
                      <div>Total Value: <span className="text-sky-300">MWK 42,500,000</span></div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-600">Awaiting disbursement trigger...</div>
                  )}
                </div>

                {/* Stage 2 */}
                <div className={`p-5 rounded-xl border transition-all ${
                  amrStep >= 2 ? 'bg-sky-950/30 border-sky-500/40 shadow-lg shadow-sky-950/30' : 'bg-black/30 border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <span className="text-xs font-bold text-sky-400">02 // OPERATOR DISPATCH</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400">TELECO B2C</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">Gateway Execution</div>
                  <p className="text-xs text-slate-400 mb-3">
                    Asynchronous BullMQ worker dispatches requests to operator B2C API.
                  </p>
                  {amrStep >= 2 ? (
                    <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-sky-300 space-y-1">
                      <div>Gateway: <span className="text-white uppercase">{amrOperator} B2C API</span></div>
                      <div>Concurrency: <span className="text-emerald-400">50 req/sec</span></div>
                      <div>Operator Status: <span className="text-emerald-400">200 SUCCESS</span></div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-600">Waiting for worker queue...</div>
                  )}
                </div>

                {/* Stage 3 */}
                <div className={`p-5 rounded-xl border transition-all ${
                  amrStep >= 3 ? 'bg-amber-950/30 border-amber-500/40 shadow-lg shadow-amber-950/30' : 'bg-black/30 border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <span className="text-xs font-bold text-amber-400">03 // STATEMENT MATCHING</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400">RECONCILER</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">Hash Verification</div>
                  <p className="text-xs text-slate-400 mb-3">
                    Automated reconciliation matching teleco txn IDs with bank ledger debits.
                  </p>
                  {amrStep >= 3 ? (
                    <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 space-y-1">
                      <div>Matched: <span className="text-emerald-400">1,450 / 1,450 (100%)</span></div>
                      <div>Discrepancies: <span className="text-white font-bold">0.00 MWK</span></div>
                      <div>Hash: <span className="text-slate-400 truncate">sha256:7f9a8b...</span></div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-600">Awaiting operator callback...</div>
                  )}
                </div>

                {/* Stage 4 */}
                <div className={`p-5 rounded-xl border transition-all ${
                  amrStep >= 4 ? 'bg-purple-950/30 border-purple-500/40 shadow-lg shadow-purple-950/30' : 'bg-black/30 border-white/5 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <span className="text-xs font-bold text-purple-400">04 // AUDIT COMMIT</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-400">IMMUTABLE</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">General Ledger Sign-off</div>
                  <p className="text-xs text-slate-400 mb-3">
                    PostgreSQL row-level security commit with cryptographic audit stamp.
                  </p>
                  {amrStep >= 4 ? (
                    <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-purple-300 space-y-1">
                      <div>Audit Status: <span className="text-emerald-400 font-bold">VERIFIED</span></div>
                      <div>Tenant Isolation: <span className="text-white">RLS Enforced</span></div>
                      <div>Report: <span className="text-emerald-300">Generated (PDF + CSV)</span></div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-slate-600">Awaiting double-entry commit...</div>
                  )}
                </div>

              </div>

              {/* Security & Isolation Spec Bar */}
              <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Isolation Layer:</span>
                  <span className="text-white font-semibold">AWS VPC + PostgreSQL RLS</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">Encryption:</span>
                  <span className="text-emerald-300">AES-256 (KMS KMS-MW-KEY)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audit Remediation: 84 Findings Remediated (100% Pass)</span>
                </div>
              </div>

            </motion.div>
          )}

          {/* Tab 2: Edge Vision Solar Simulator */}
          {activeTab === 'edge-vision' && (
            <motion.div
              key="edge-vision"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8"
            >
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
                    <div className="text-xs text-slate-400">
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
                    <div className="text-xs text-slate-400">
                      Frames with cosine similarity &gt; {clipThreshold} are purged locally before upload.
                    </div>
                  </div>
                </div>

                {/* Visual Pipeline Display */}
                <div className="lg:col-span-8 p-5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-4">
                  <div className="text-slate-400 uppercase text-xs">Active Data Pipeline Status</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-slate-400">RAW INGESTION</div>
                      <div className="text-white font-bold text-sm mt-0.5">1,240 frames/hr</div>
                      <div className="text-xs text-emerald-400 mt-1">Camera Sensor Online</div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
                      <div className="text-xs text-emerald-400">CLIP FILTERING</div>
                      <div className="text-emerald-300 font-bold text-sm mt-0.5">-78% Redundancy</div>
                      <div className="text-xs text-slate-300 mt-1">967 near-duplicates purged</div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-xs text-slate-400">TRANSMISSION BUFFER</div>
                      <div className="text-white font-bold text-sm mt-0.5">273 high-entropy frames</div>
                      <div className="text-xs text-amber-400 mt-1">
                        {networkStatus === 'offline' ? 'Queued to local SSD' : 'Transmitting via 2G burst'}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#070b12] border border-white/5 text-xs leading-relaxed text-slate-300">
                    <strong>Monthly Bandwidth Savings:</strong> Over 75% uplink payloads saved through neural deduplication. Raw frames stored safely in partitioned NVMe storage, transmitting during off-peak night windows.
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* Tab 3: Pocket Body Simulator */}
          {activeTab === 'pocket-body' && (
            <motion.div
              key="pocket-body"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8"
            >
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
                
                {/* 2D/3D Wireframe Skeleton Canvas Simulation */}
                <div className="lg:col-span-8 relative aspect-[16/10] rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

                  <svg className="w-full h-full p-8" viewBox="0 0 400 300">
                    <line x1="200" y1="90" x2="200" y2="170" stroke="#10b981" strokeWidth="3" />
                    <line x1="160" y1="100" x2="240" y2="100" stroke="#10b981" strokeWidth="3" />
                    <line x1="170" y1="170" x2="230" y2="170" stroke="#10b981" strokeWidth="3" />

                    <line x1="160" y1="100" x2="130" y2="140" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="130" y1="140" x2="110" y2="180" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="240" y1="100" x2="270" y2="140" stroke="#34d399" strokeWidth="2.5" />
                    <line x1="270" y1="140" x2="290" y2="180" stroke="#34d399" strokeWidth="2.5" />

                    <line x1="170" y1="170" x2="165" y2="230" stroke="#059669" strokeWidth="2.5" />
                    <line x1="165" y1="230" x2="160" y2="280" stroke="#059669" strokeWidth="2.5" />
                    <line x1="230" y1="170" x2="235" y2="230" stroke="#059669" strokeWidth="2.5" />
                    <line x1="235" y1="230" x2="240" y2="280" stroke="#059669" strokeWidth="2.5" />

                    <circle cx="200" cy="65" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                    
                    {(trackingMode === 'full' || trackingMode === 'face') && (
                      <>
                        <circle cx="193" cy="60" r="1.5" fill="#38bdf8" />
                        <circle cx="207" cy="60" r="1.5" fill="#38bdf8" />
                        <circle cx="200" cy="67" r="1.5" fill="#38bdf8" />
                        <path d="M190 75 Q200 80 210 75" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                      </>
                    )}

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

                    <circle cx="160" cy="100" r="4" fill="#10b981" />
                    <circle cx="240" cy="100" r="4" fill="#10b981" />
                    <circle cx="130" cy="140" r="3.5" fill="#10b981" />
                    <circle cx="270" cy="140" r="3.5" fill="#10b981" />
                    <circle cx="170" cy="170" r="4" fill="#10b981" />
                    <circle cx="230" cy="170" r="4" fill="#10b981" />
                    <circle cx="165" cy="230" r="3.5" fill="#10b981" />
                    <circle cx="235" cy="230" r="3.5" fill="#10b981" />
                  </svg>

                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono space-y-0.5">
                    <div className="text-emerald-400 font-bold">● PERCEPTION: ACTIVE (60 FPS)</div>
                    <div className="text-slate-400">Total Keypoints: <span className="text-white font-bold">{trackingMode === 'full' ? '553' : trackingMode === 'pose' ? '33' : trackingMode === 'hands' ? '42' : '478'}</span></div>
                    <div className="text-slate-400">Depth Mode: <span className="text-amber-400">{metricDepth ? 'World Metric (mm)' : 'Normalized (0..1)'}</span></div>
                  </div>

                  <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    Zero Cloud Egress Guaranteed
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <div className="text-slate-400 uppercase text-xs">Data Sovereignty Audit</div>
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
                    <div className="text-slate-400 uppercase text-xs">Guided 6-Pose Scan</div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      Ensures anterior, posterior, and lateral joint planes are unoccluded before export.
                    </div>
                    <div className="p-2 rounded bg-emerald-950/40 text-emerald-300 text-xs">
                      ✓ Coronal plane verified (100% confidence)
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* Tab 4: Bawo Simulator */}
          {activeTab === 'bawo' && (
            <motion.div
              key="bawo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass-panel bg-[#0d121f] border border-emerald-500/20 p-6 sm:p-8"
            >
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

              {/* Board Visualizer */}
              <div className="mt-8 p-6 rounded-2xl bg-[#1c1510] border-2 border-amber-900/60 shadow-2xl relative overflow-hidden">
                <div className="text-center text-xs font-mono text-amber-500/70 mb-4 tracking-widest uppercase">
                  NORTH PLAYER (OPPONENT TERRITORY)
                </div>

                <div className="space-y-3 max-w-3xl mx-auto">
                  {/* Row 0 */}
                  <div className="grid grid-cols-8 gap-2">
                    {boardState.slice(0, 8).map((seeds, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBawoPitClick(idx)}
                        className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          selectedPit === idx ? 'border-amber-400 bg-amber-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-amber-700/60'
                        }`}
                      >
                        <span className="text-xs font-mono text-amber-700">{idx}</span>
                        <span className="text-lg font-bold font-mono text-amber-200">{seeds}</span>
                      </button>
                    ))}
                  </div>

                  {/* Row 1 */}
                  <div className="grid grid-cols-8 gap-2 pb-3 border-b border-amber-900/40">
                    {boardState.slice(8, 16).map((seeds, idx) => (
                      <button
                        key={idx + 8}
                        onClick={() => handleBawoPitClick(idx + 8)}
                        className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          selectedPit === idx + 8 ? 'border-amber-400 bg-amber-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-amber-700/60'
                        }`}
                      >
                        <span className="text-xs font-mono text-amber-700">{idx + 8}</span>
                        <span className="text-lg font-bold font-mono text-amber-200">{seeds}</span>
                      </button>
                    ))}
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-8 gap-2 pt-3">
                    {boardState.slice(16, 24).map((seeds, idx) => {
                      const pitIndex = idx + 16;
                      const isNyumba = pitIndex === 18;
                      return (
                        <button
                          key={pitIndex}
                          onClick={() => handleBawoPitClick(pitIndex)}
                          className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                            selectedPit === pitIndex ? 'border-emerald-400 bg-emerald-950/80 scale-105' : 
                            isNyumba ? 'border-amber-500/60 bg-amber-950/40' : 'border-amber-950/80 bg-black/60 hover:border-emerald-700/60'
                          }`}
                        >
                          <span className="text-xs font-mono text-amber-700">
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

                  {/* Row 3 */}
                  <div className="grid grid-cols-8 gap-2">
                    {boardState.slice(24, 32).map((seeds, idx) => (
                      <button
                        key={idx + 24}
                        onClick={() => handleBawoPitClick(idx + 24)}
                        className={`h-16 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          selectedPit === idx + 24 ? 'border-emerald-400 bg-emerald-950/80 scale-105' : 'border-amber-950/80 bg-black/60 hover:border-emerald-700/60'
                        }`}
                      >
                        <span className="text-xs font-mono text-amber-700">{idx + 24}</span>
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

            </motion.div>
          )}
        </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
