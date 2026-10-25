import React, { useEffect, useRef, useState } from 'react';

type SceneState = 'loading' | 'ready' | 'fallback';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

const SceneFallback: React.FC = () => (
  <svg
    viewBox="0 0 1200 760"
    className="absolute inset-0 h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="kf-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0b1220" />
        <stop offset="70%" stopColor="#090d18" />
        <stop offset="100%" stopColor="#05070d" />
      </linearGradient>
      <linearGradient id="kf-island" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1b2a45" />
        <stop offset="100%" stopColor="#0d1525" />
      </linearGradient>
      <radialGradient id="kf-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#72f1b8" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#72f1b8" stopOpacity="0" />
      </radialGradient>
    </defs>

    <rect width="1200" height="760" fill="url(#kf-sky)" />

    <g opacity="0.7" fill="#b9a0ff">
      <circle cx="160" cy="120" r="1.5" />
      <circle cx="340" cy="80" r="1" />
      <circle cx="910" cy="150" r="1.5" />
      <circle cx="1060" cy="90" r="1" />
      <circle cx="760" cy="60" r="1" />
      <circle cx="520" cy="180" r="1" />
    </g>

    <circle cx="245" cy="190" r="78" fill="#f4b860" opacity="0.08" />
    <circle cx="245" cy="190" r="58" fill="none" stroke="#f4b860" strokeOpacity="0.2" />

    <g transform="translate(600 520)">
      <ellipse cx="0" cy="0" rx="430" ry="120" fill="#72f1b8" opacity="0.05" />
      <ellipse cx="0" cy="0" rx="340" ry="96" fill="none" stroke="#72f1b8" strokeOpacity="0.16" />
      <ellipse cx="0" cy="0" rx="250" ry="70" fill="none" stroke="#72f1b8" strokeOpacity="0.12" />
      <ellipse cx="0" cy="0" rx="160" ry="45" fill="none" stroke="#72f1b8" strokeOpacity="0.1" />

      <polygon points="-300,-24 -150,-70 110,-58 300,0 180,64 -120,72 -310,30" fill="url(#kf-island)" stroke="#72f1b8" strokeOpacity="0.28" />
      <polygon points="-300,-24 -310,30 -180,182 -120,72" fill="#0b1322" stroke="#72f1b8" strokeOpacity="0.14" />
      <polygon points="-120,72 180,64 210,198 40,244" fill="#08101d" stroke="#72f1b8" strokeOpacity="0.1" />
      <polygon points="180,64 300,0 290,104 210,198" fill="#0a1220" stroke="#72f1b8" strokeOpacity="0.12" />

      <g stroke="#72f1b8" strokeOpacity="0.75">
        <rect x="-22" y="-170" width="44" height="120" fill="#16233a" />
        <rect x="-34" y="-60" width="68" height="36" fill="#16233a" />
        <line x1="0" y1="-208" x2="0" y2="-170" />
      </g>
      <circle cx="0" cy="-194" r="12" fill="url(#kf-glow)" />
      <circle cx="0" cy="-194" r="5" fill="#72f1b8" />

      <g stroke="#b9a0ff" strokeOpacity="0.7">
        <rect x="-190" y="-118" width="34" height="98" fill="#17253f" />
        <rect x="152" y="-92" width="26" height="76" fill="#17253f" />
      </g>
      <g stroke="#f4b860" strokeOpacity="0.7">
        <rect x="76" y="-142" width="20" height="124" fill="#1b2942" />
      </g>

      <g fill="none" stroke="#72f1b8" strokeOpacity="0.32">
        <ellipse cx="0" cy="-160" rx="118" ry="36" transform="rotate(-14 0 -160)" />
        <ellipse cx="0" cy="-160" rx="150" ry="42" transform="rotate(18 0 -160)" />
      </g>

      <g fill="#f4b860" opacity="0.9">
        <polygon points="-232,-230 -220,-214 -236,-208" />
        <polygon points="268,-176 280,-160 264,-154" />
      </g>
      <g fill="#72f1b8" opacity="0.8">
        <polygon points="140,-244 150,-230 132,-228" />
      </g>
    </g>

    <g opacity="0.28" stroke="#72f1b8">
      {Array.from({ length: 14 }).map((_, index) => (
        <line key={index} x1={index * 90} y1="610" x2={600 + (index - 7) * 46} y2="760" />
      ))}
      <line x1="0" y1="660" x2="1200" y2="660" />
      <line x1="0" y1="710" x2="1200" y2="710" />
    </g>
  </svg>
);

/**
 * Home-world layer. The vector fallback paints instantly; Three.js is imported
 * only after first paint and only when WebGL is available. The canvas is
 * decorative and never receives focus.
 */
export const GameWorld: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SceneState>('loading');
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const lowPower =
        window.innerWidth < 768 ||
        ((navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 8) <= 4;

      // The vector scene is the intentional reduced-motion and small-screen
      // experience. Keep the HTML interface immediate and avoid downloading
      // Three.js where animation would add cost without adding meaning.
      if (reducedMotion || lowPower) {
        if (!disposed) setState('fallback');
        return;
      }

      try {
        const { createWorld } = await import('../three/world');
        if (disposed) return;
        cleanup = await createWorld(host, { reducedMotion, lowPower });
        if (!disposed) setState('ready');
      } catch {
        if (!disposed) setState('fallback');
      }
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(() => void start(), { timeout: 1400 });
    } else {
      timeoutHandle = window.setTimeout(() => void start(), 260);
    }

    return () => {
      disposed = true;
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      cleanup?.();
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" data-scene={state}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_10%,rgba(114,241,184,0.10),transparent_65%)]" />
      <div className="absolute inset-0 starfield opacity-60" />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          state === 'ready' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SceneFallback />
      </div>
      <div ref={hostRef} className="absolute inset-0" />
      <div className="scanlines absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
    </div>
  );
};
