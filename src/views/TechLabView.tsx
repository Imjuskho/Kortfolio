import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Battery,
  CheckCircle2,
  Cpu,
  Eye,
  Play,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { ContactCTA, PageHeader, SectionLabel } from '../components/GameUI';
import { Link } from '../lib/router';
import { track } from '../lib/analytics';

type LabTab = 'amr' | 'edge' | 'body' | 'bawo';

const TABS: Array<{ id: LabTab; code: string; label: string; sub: string; icon: React.ElementType }> = [
  { id: 'amr', code: 'LAB-01', label: 'Reconciliation', sub: 'Mobile money', icon: ShieldCheck },
  { id: 'edge', code: 'LAB-02', label: 'Edge buffer', sub: 'Solar vision', icon: Sun },
  { id: 'body', code: 'LAB-03', label: 'Motion capture', sub: 'On-device AI', icon: Eye },
  { id: 'bawo', code: 'LAB-04', label: 'Bawo engine', sub: 'Cultural systems', icon: Cpu },
];

const AMR_OPERATORS = [
  { id: 'airtel', label: 'Airtel Money', tone: 'text-danger' },
  { id: 'tnm', label: 'TNM Mpamba', tone: 'text-mint' },
  { id: 'mpesa', label: 'M-Pesa B2C', tone: 'text-amber' },
] as const;

const STAGES = [
  {
    code: '01',
    title: 'Batch intake',
    tag: 'INGEST',
    copy: 'A tenant-scoped disbursement batch is accepted over an authenticated TLS endpoint.',
    lines: ['tenant: INSTITUTION_MW', 'recipients: 1,450', 'value: MWK 42,500,000'],
  },
  {
    code: '02',
    title: 'Operator dispatch',
    tag: 'B2C API',
    copy: 'Queued workers dispatch payouts through the selected mobile-money gateway with retries.',
    lines: ['queue: bullmq / settlement', 'concurrency: 50 req/s', 'callback: 200 SUCCESS'],
  },
  {
    code: '03',
    title: 'Statement match',
    tag: 'RECONCILE',
    copy: 'Operator transaction IDs are paired against bank debits and wallet confirmation hashes.',
    lines: ['matched: 1,450 / 1,450', 'discrepancy: 0.00 MWK', 'proof: sha256:7f9a…'],
  },
  {
    code: '04',
    title: 'Audit commit',
    tag: 'IMMUTABLE',
    copy: 'A double-entry ledger commit closes the batch with tenant isolation and an audit stamp.',
    lines: ['ledger: balanced', 'tenant isolation: RLS', 'report: PDF + CSV'],
  },
];

const BOARD_START = [
  0, 2, 2, 0, 0, 2, 2, 0,
  2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 6, 2, 2, 2, 2, 2,
  0, 2, 2, 0, 0, 2, 2, 0,
];

const AmrLab: React.FC = () => {
  const [operator, setOperator] = useState<(typeof AMR_OPERATORS)[number]['id']>('airtel');
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timers = [1, 2, 3, 4].map((value) =>
      window.setTimeout(() => setStep(value), value * 420),
    );
    const finish = window.setTimeout(() => setRunning(false), 1900);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(finish);
    };
  }, [running, runId]);

  const run = () => {
    setStep(0);
    setRunning(true);
    setRunId((value) => value + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel tone="mint">LAB-01 / Multi-tenant finance</SectionLabel>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Mobile-money reconciliation pipeline
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            A simplified walkthrough of the AMR batch lifecycle. All figures are illustrative demo data, not live
            production records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Simulated operator gateway" className="flex flex-wrap gap-1.5">
            {AMR_OPERATORS.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => {
                  setOperator(entry.id);
                  setStep(0);
                }}
                aria-pressed={operator === entry.id}
                className={`min-h-9 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  operator === entry.id
                    ? 'border-line-mint bg-mint/10 text-mint'
                    : 'border-line text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <button type="button" className="btn min-h-10 px-4" onClick={run} disabled={running}>
            {running ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {running ? 'Processing' : 'Run batch'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage, index) => {
          const active = step >= index + 1;
          return (
            <div
              key={stage.code}
              className={`border p-4 transition-colors ${
                active ? 'border-line-mint bg-mint/[0.045]' : 'border-line bg-void-deep/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`font-pixel text-[11px] ${active ? 'text-mint' : 'text-faint'}`}>{stage.code}</span>
                <span className="tag">{stage.tag}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{stage.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{stage.copy}</p>
              <div className="mt-3 min-h-16 border border-line bg-void-deep p-2 font-mono text-[10px] leading-relaxed text-muted">
                {active ? (
                  stage.lines.map((line) => (
                    <div key={line} className={line.includes('SUCCESS') || line.includes('balanced') || line.includes('0.00') ? 'text-mint' : ''}>
                      {line}
                    </div>
                  ))
                ) : (
                  <span className="text-faint">awaiting pipeline…</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-2 border border-line bg-void-deep p-4 font-mono text-[11px] uppercase tracking-wider text-faint sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-mint" aria-hidden="true" />
          Isolation: AWS VPC + PostgreSQL row-level security
        </span>
        <span className="flex items-center gap-2 text-mint">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          {step >= 4 ? 'Batch reconciled · demo complete' : 'Awaiting batch run'}
        </span>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
        Demo only · the real architecture is documented in{' '}
        <Link to="/missions/amr-fintech" className="text-mint underline underline-offset-4">
          MSN-01
        </Link>
        .
      </p>
    </div>
  );
};

const EdgeLab: React.FC = () => {
  const [battery, setBattery] = useState(74);
  const [network, setNetwork] = useState<'offline' | '2g'>('offline');
  const [threshold, setThreshold] = useState(0.82);

  const captured = 1240;
  const purgeRate = Math.max(35, Math.min(96, Math.round(100 - (threshold - 0.7) * 190)));
  const purged = Math.round((captured * purgeRate) / 100);
  const buffered = captured - purged;
  const conserving = battery < 25;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel tone="amber">LAB-02 / Solar edge mesh</SectionLabel>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Store-and-forward under a weak signal
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Adjust battery and similarity thresholds to see how local buffering behaves. This is an illustrative
            model, not a live fleet.
          </p>
        </div>
        <div role="group" aria-label="Simulated network condition" className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setNetwork('offline')}
            aria-pressed={network === 'offline'}
            className={`inline-flex min-h-9 items-center gap-1.5 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              network === 'offline' ? 'border-line-amber bg-amber/10 text-amber' : 'border-line text-muted'
            }`}
          >
            <WifiOff className="h-3.5 w-3.5" aria-hidden="true" /> Air-gapped
          </button>
          <button
            type="button"
            onClick={() => setNetwork('2g')}
            aria-pressed={network === '2g'}
            className={`inline-flex min-h-9 items-center gap-1.5 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              network === '2g' ? 'border-line-mint bg-mint/10 text-mint' : 'border-line text-muted'
            }`}
          >
            <Wifi className="h-3.5 w-3.5" aria-hidden="true" /> 2G burst
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[20rem_1fr]">
        <div className="space-y-4">
          <div className="panel-quiet p-4">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="battery" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <Battery className="h-4 w-4 text-mint" aria-hidden="true" /> Solar battery
              </label>
              <output htmlFor="battery" className="font-mono text-sm font-bold text-ink">{battery}%</output>
            </div>
            <input
              id="battery"
              type="range"
              min={10}
              max={100}
              value={battery}
              onChange={(event) => setBattery(Number(event.target.value))}
              className="mt-3 w-full accent-[#72f1b8]"
            />
            <p className={`mt-2 text-xs ${conserving ? 'text-amber' : 'text-faint'}`} aria-live="polite">
              {conserving ? 'Power-saving mode: camera frame rate throttled.' : 'Normal solar absorption cycle.'}
            </p>
          </div>

          <div className="panel-quiet p-4">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="threshold" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                <SlidersHorizontal className="h-4 w-4 text-amber" aria-hidden="true" /> CLIP threshold
              </label>
              <output htmlFor="threshold" className="font-mono text-sm font-bold text-ink">{threshold.toFixed(2)}</output>
            </div>
            <input
              id="threshold"
              type="range"
              min={0.7}
              max={0.99}
              step={0.01}
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              className="mt-3 w-full accent-[#f4b860]"
            />
            <p className="mt-2 text-xs leading-relaxed text-faint">
              Frames with cosine similarity above the threshold are deduplicated locally before upload.
            </p>
          </div>
        </div>

        <div className="border border-line bg-void-deep p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="hud-label text-mint">Node telemetry</p>
            <span className={`tag ${conserving ? 'tag-amber' : 'tag-mint'}`}>{conserving ? 'THROTTLED' : 'NOMINAL'}</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-line p-3">
              <p className="meta-label">Raw capture</p>
              <p className="mt-1 font-display text-xl text-ink">{captured.toLocaleString()}</p>
              <p className="mt-1 font-mono text-[10px] text-faint">frames / hour</p>
            </div>
            <div className="border border-line-mint bg-mint/[0.04] p-3">
              <p className="meta-label text-mint">Deduplicated</p>
              <p className="mt-1 font-display text-xl text-mint">−{purgeRate}%</p>
              <p className="mt-1 font-mono text-[10px] text-muted">{purged.toLocaleString()} redundant frames purged</p>
            </div>
            <div className="border border-line p-3">
              <p className="meta-label">Uplink queue</p>
              <p className="mt-1 font-display text-xl text-ink">{buffered.toLocaleString()}</p>
              <p className={`mt-1 font-mono text-[10px] ${network === 'offline' ? 'text-amber' : 'text-mint'}`}>
                {network === 'offline' ? 'buffered to local SSD' : 'transmitting on 2G burst'}
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 w-full bg-panel-2" aria-hidden="true">
            <div className="h-full bg-mint transition-[width] duration-300" style={{ width: `${purgeRate}%` }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
            <span>Local retention</span>
            <span>{purgeRate}% filtered</span>
          </div>

          <div className="mt-5 flex items-start gap-2 border border-line p-3 text-xs leading-relaxed text-muted">
            <Activity className="mt-0.5 h-4 w-4 flex-shrink-0 text-mint" aria-hidden="true" />
            <p>
              A real node keeps the raw buffer encrypted and negotiates opportunistic sync. The demo exists to make
              the trade-off tangible: local compute versus expensive uplink.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
        Demo only · the real deployment is documented in{' '}
        <Link to="/missions/edge-vision" className="text-mint underline underline-offset-4">
          MSN-02
        </Link>
        .
      </p>
    </div>
  );
};

const BodyLab: React.FC = () => {
  const [mode, setMode] = useState<'full' | 'pose' | 'hands' | 'face'>('full');
  const [metricDepth, setMetricDepth] = useState(true);

  const keypoints = useMemo(() => {
    if (mode === 'pose') return 33;
    if (mode === 'hands') return 42;
    if (mode === 'face') return 478;
    return 553;
  }, [mode]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel tone="violet">LAB-03 / On-device kinematics</SectionLabel>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Motion capture that never leaves the device
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Toggle the perception stack to see the landmark budget. The wireframe is a schematic demo; no camera
            access is requested.
          </p>
        </div>
        <div role="group" aria-label="Perception mode" className="flex flex-wrap gap-1.5">
          {(['full', 'pose', 'hands', 'face'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              aria-pressed={mode === item}
              className={`min-h-9 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                mode === item ? 'border-line-violet bg-violet/10 text-violet' : 'border-line text-muted'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMetricDepth((value) => !value)}
            aria-pressed={metricDepth}
            className={`min-h-9 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              metricDepth ? 'border-line-amber bg-amber/10 text-amber' : 'border-line text-muted'
            }`}
          >
            Metric Z {metricDepth ? 'on' : 'off'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-black">
          <div className="absolute inset-0 grid-floor opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 scanlines opacity-40" aria-hidden="true" />

          <svg
            viewBox="0 0 400 300"
            className="relative h-full w-full p-6"
            role="img"
            aria-label={`Schematic skeleton showing ${keypoints} tracked landmarks in ${mode} mode`}
          >
            <g stroke="#72f1b8" strokeWidth="3" strokeLinecap="square">
              <line x1="200" y1="82" x2="200" y2="168" />
              <line x1="158" y1="98" x2="242" y2="98" />
              <line x1="168" y1="168" x2="232" y2="168" />
            </g>
            <g stroke="#b9a0ff" strokeWidth="2.5">
              <line x1="158" y1="98" x2="126" y2="140" />
              <line x1="126" y1="140" x2="106" y2="182" />
              <line x1="242" y1="98" x2="274" y2="140" />
              <line x1="274" y1="140" x2="294" y2="182" />
            </g>
            <g stroke="#f4b860" strokeWidth="2.5">
              <line x1="168" y1="168" x2="162" y2="228" />
              <line x1="162" y1="228" x2="158" y2="280" />
              <line x1="232" y1="168" x2="238" y2="228" />
              <line x1="238" y1="228" x2="242" y2="280" />
            </g>

            <circle cx="200" cy="60" r="22" fill="none" stroke="#b9a0ff" strokeWidth="1.5" strokeDasharray="3 3" />
            {mode === 'full' || mode === 'face' ? (
              <>
                <circle cx="193" cy="55" r="1.7" fill="#b9a0ff" />
                <circle cx="207" cy="55" r="1.7" fill="#b9a0ff" />
                <circle cx="200" cy="62" r="1.7" fill="#b9a0ff" />
                <path d="M190 70 Q200 75 210 70" fill="none" stroke="#b9a0ff" strokeWidth="1.5" />
              </>
            ) : null}

            {mode === 'full' || mode === 'hands' ? (
              <>
                <circle cx="106" cy="182" r="4" fill="#f4b860" />
                <circle cx="101" cy="191" r="2" fill="#f4b860" />
                <circle cx="106" cy="194" r="2" fill="#f4b860" />
                <circle cx="111" cy="191" r="2" fill="#f4b860" />
                <circle cx="294" cy="182" r="4" fill="#f4b860" />
                <circle cx="289" cy="191" r="2" fill="#f4b860" />
                <circle cx="294" cy="194" r="2" fill="#f4b860" />
                <circle cx="299" cy="191" r="2" fill="#f4b860" />
              </>
            ) : null}

            {[
              [158, 98], [242, 98], [126, 140], [274, 140],
              [168, 168], [232, 168], [162, 228], [238, 228],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="#72f1b8" />
            ))}
          </svg>

          <div className="absolute left-3 top-3 border border-line bg-void-deep/90 p-2 font-mono text-[10px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-mint">
              <span className="status-dot" aria-hidden="true" /> PERCEPTION ACTIVE
            </div>
            <div className="mt-1 text-muted">
              keypoints: <span className="text-ink">{keypoints}</span>
            </div>
            <div className="text-muted">
              depth: <span className="text-amber">{metricDepth ? 'metric (mm)' : 'normalized'}</span>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 border border-line-mint bg-void-deep/90 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-mint">
            Zero cloud egress
          </div>
        </div>

        <div className="space-y-3">
          <div className="panel-quiet p-4">
            <p className="hud-label text-mint">Sovereignty audit</p>
            <dl className="mt-3 space-y-2 font-mono text-[11px]">
              {[
                ['Cloud packets sent', '0.00 KB'],
                ['On-device memory', '124 MB RAM'],
                ['Pipeline latency', '14.8 ms'],
                ['Native engine', 'CoreML ANE'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 border-b border-line pb-1.5">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-line-violet bg-violet/[0.04] p-4">
            <p className="hud-label text-violet">Guided scan</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              The capture flow verifies anterior, posterior, and lateral planes before a session can export. A
              contributor reviews the tracked skeleton before saving.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
        Demo only · the real implementation is documented in{' '}
        <Link to="/missions/pocket-body" className="text-mint underline underline-offset-4">
          MSN-03
        </Link>
        .
      </p>
    </div>
  );
};

const BawoLab: React.FC = () => {
  const [board, setBoard] = useState<number[]>(BOARD_START);
  const [selected, setSelected] = useState<number | null>(18);
  const [ruleSet, setRuleSet] = useState<'malawi' | 'kiswahili'>('malawi');

  const sow = (index: number) => {
    setSelected(index);
    setBoard((current) => {
      const next = [...current];
      const seeds = next[index];
      if (seeds <= 1) return current;
      next[index] = 0;
      for (let step = 1; step <= seeds; step += 1) {
        next[(index + step) % 32] += 1;
      }
      return next;
    });
  };

  const renderPit = (index: number, seeds: number) => {
    const isNyumba = index === 18;
    const active = selected === index;
    return (
      <button
        key={index}
        type="button"
        onClick={() => sow(index)}
        aria-label={`Pit ${index}, ${seeds} seeds${isNyumba ? ', nyumba' : ''}`}
        aria-pressed={active}
        className={`flex h-14 flex-col items-center justify-center border transition-all ${
          active
            ? 'border-mint bg-mint/10 text-mint'
            : isNyumba
              ? 'border-amber/60 bg-amber/10 text-amber'
              : 'border-amber/20 bg-black/30 text-amber/80 hover:border-amber/50'
        }`}
      >
        <span className="font-mono text-[9px] leading-none opacity-70">{index}</span>
        <span className="mt-1 font-mono text-lg font-bold leading-none">{seeds}</span>
        {isNyumba ? <span className="mt-0.5 font-mono text-[8px] uppercase">nyumba</span> : null}
      </button>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel tone="amber">LAB-04 / Cultural systems</SectionLabel>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Bawo engine: 4 × 8 board
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            A simplified sowing demonstration. The real engine is test-pinned to traditional rule sets; this board
            illustrates movement, not tournament legality.
          </p>
        </div>
        <div role="group" aria-label="Rule set" className="flex flex-wrap gap-1.5">
          {(['malawi', 'kiswahili'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRuleSet(item)}
              aria-pressed={ruleSet === item}
              className={`min-h-9 border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                ruleSet === item ? 'border-line-amber bg-amber/10 text-amber' : 'border-line text-muted'
              }`}
            >
              {item === 'malawi' ? 'Malawian Bawo' : 'Bao la Kiswahili'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto border border-line bg-[#17110c] p-4 sm:p-6">
        <div className="min-w-[560px]">
          <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-amber/80">
            North player · opponent territory
          </p>
          {[0, 8].map((start) => (
            <div key={start} className="mb-1.5 grid grid-cols-8 gap-1.5">
              {board.slice(start, start + 8).map((seeds, offset) => {
                const index = start + offset;
                return renderPit(index, seeds);
              })}
            </div>
          ))}

          <div className="my-3 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-amber/25" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-amber/50">centre line</span>
            <span className="h-px flex-1 bg-amber/25" />
          </div>

          <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-mint/80">
            South player · your territory
          </p>
          {[16, 24].map((start) => (
            <div key={start} className="mb-1.5 grid grid-cols-8 gap-1.5">
              {board.slice(start, start + 8).map((seeds, offset) => {
                const index = start + offset;
                return renderPit(index, seeds);
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted" aria-live="polite">
          {selected === null
            ? 'Select a pit with two or more seeds to sow.'
            : `Pit ${selected} selected. Click any pit with 2+ seeds to sow counter-clockwise.`}
        </p>
        <button
          type="button"
          className="inline-flex min-h-9 items-center gap-2 border border-line px-3 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-amber hover:text-amber"
          onClick={() => {
            setBoard(BOARD_START);
            setSelected(18);
          }}
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Reset board
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ['Front-row priority', 'Sow from the front row while it holds two or more seeds.'],
          ['Mtaji capture chain', 'A final seed landing opposite occupied enemy pits triggers capture.'],
          ['The nyumba', 'Pit 18 holds six seeds and carries special tactical rules.'],
        ].map(([title, copy]) => (
          <div key={title} className="border border-line bg-void-deep p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-amber">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{copy}</p>
          </div>
        ))}
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-faint">
        Demo only · the real engine is documented in{' '}
        <Link to="/missions/bawo" className="text-mint underline underline-offset-4">
          MSN-04
        </Link>
        .
      </p>
    </div>
  );
};

export const TechLabView: React.FC = () => {
  const [active, setActive] = useState<LabTab>('amr');

  useEffect(() => {
    track('lab_opened', { surface: 'lab' });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        eyebrow="Tech lab"
        title="Touch the trade-offs."
        lede="Four interactive schematics from the work: reconciliation pipelines, solar edge buffering, on-device perception, and a cultural game engine. They are demonstrations of system behaviour — not live production consoles."
        aside={
          <div className="flex flex-wrap gap-2">
            <span className="tag tag-mint">4 demos</span>
            <span className="tag tag-amber">Illustrative data</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Select a lab demo">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              aria-pressed={selected}
              className={`flex min-h-20 items-center gap-3 border p-3 text-left transition-colors ${
                selected ? 'border-line-mint bg-mint/[0.06]' : 'border-line bg-void-deep/60 hover:border-line-strong'
              }`}
            >
              <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center border ${selected ? 'border-mint/50 text-mint' : 'border-line text-faint'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-faint">{tab.code}</span>
                <span className={`block font-display text-sm font-semibold ${selected ? 'text-ink' : 'text-muted'}`}>
                  {tab.label}
                </span>
                <span className="block text-[11px] text-faint">{tab.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <section className="pixel-panel mt-5 p-5 sm:p-7" aria-label={`${active.toUpperCase()} interactive demo`}>
        {active === 'amr' ? <AmrLab /> : null}
        {active === 'edge' ? <EdgeLab /> : null}
        {active === 'body' ? <BodyLab /> : null}
        {active === 'bawo' ? <BawoLab /> : null}
      </section>

      <div className="mt-10">
        <ContactCTA compact />
      </div>
    </div>
  );
};
