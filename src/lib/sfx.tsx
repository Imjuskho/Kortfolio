import React, {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { SoundContext, type SoundEffect, type SoundValue } from './sfxCore';

export type { SoundEffect, SoundValue } from './sfxCore';

const STORAGE_KEY = 'kortfolio-sfx';

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on';
    } catch {
      return false;
    }
  });

  const play = useCallback(
    (effect: SoundEffect) => {
      if (!enabled || typeof window === 'undefined') return;

      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      try {
        const context = new AudioContextClass();
        const now = context.currentTime;
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.connect(gain);
        gain.connect(context.destination);

        switch (effect) {
          case 'select':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(440, now);
            oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
            oscillator.start(now);
            oscillator.stop(now + 0.09);
            break;

          case 'move':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(220, now);
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
            oscillator.start(now);
            oscillator.stop(now + 0.035);
            break;

          case 'open':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(320, now);
            oscillator.frequency.exponentialRampToValueAtTime(640, now + 0.12);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
            oscillator.start(now);
            oscillator.stop(now + 0.13);
            break;

          case 'close':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(540, now);
            oscillator.frequency.exponentialRampToValueAtTime(270, now + 0.1);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
            oscillator.start(now);
            oscillator.stop(now + 0.11);
            break;

          case 'toggle':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(520, now);
            oscillator.frequency.exponentialRampToValueAtTime(780, now + 0.07);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
            oscillator.start(now);
            oscillator.stop(now + 0.08);
            break;
        }

        window.setTimeout(() => void context.close().catch(() => {}), 250);
      } catch {
        // Audio is an enhancement; failure must never affect navigation.
      }
    },
    [enabled],
  );

  const toggle = useCallback(() => {
    setEnabled((previous) => {
      const next = !previous;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        // Storage can be unavailable in private modes.
      }
      return next;
    });
  }, []);

  const value = useMemo<SoundValue>(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};
