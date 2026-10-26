import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { asset } from './asset';
import { haptic } from './haptics';
import { SoundContext, type SoundEffect, type SoundValue } from './sfxCore';

export type { SoundEffect, SoundValue } from './sfxCore';
export { useSound } from './sfxCore';

const STORAGE_KEY = 'kortfolio-sfx';
const TARGET_MUSIC_VOLUME = 0.28;

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(STORAGE_KEY) === 'on';
    } catch {
      return false;
    }
  });

  const [musicPlaying, setMusicPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // Background music management
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const clearFade = () => {
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    };

    if (enabled) {
      if (!audioRef.current) {
        const audio = new Audio();
        audio.loop = true;
        audio.preload = 'auto';
        const canPlayM4A = audio.canPlayType('audio/mp4; codecs="mp4a.40.2"') !== '';
        audio.src = canPlayM4A
          ? asset('assets/Audio/zio-zen-zhu.m4a')
          : asset('assets/Audio/ZioZenZhu.mp3');
        audio.volume = 0;
        audioRef.current = audio;
      }

      const audio = audioRef.current;
      clearFade();

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setMusicPlaying(true);
            // Smooth fade-in
            let currentVol = audio.volume;
            fadeIntervalRef.current = window.setInterval(() => {
              currentVol = Math.min(TARGET_MUSIC_VOLUME, currentVol + 0.04);
              if (audioRef.current) audioRef.current.volume = currentVol;
              if (currentVol >= TARGET_MUSIC_VOLUME) clearFade();
            }, 60);
          })
          .catch(() => {
            // Autoplay policy or browser block
            setMusicPlaying(false);
          });
      }
    } else {
      if (audioRef.current) {
        const audio = audioRef.current;
        clearFade();
        let currentVol = audio.volume;
        fadeIntervalRef.current = window.setInterval(() => {
          currentVol = Math.max(0, currentVol - 0.07);
          if (audioRef.current) audioRef.current.volume = currentVol;
          if (currentVol <= 0) {
            clearFade();
            audio.pause();
            setMusicPlaying(false);
          }
        }, 50);
      }
    }

    return () => {
      clearFade();
    };
  }, [enabled]);

  // Tab visibility: pause audio when tab is in background, resume when active
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (enabled) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = useCallback(
    (effect: SoundEffect, options?: { haptic?: boolean }) => {
      // Trigger tactile haptic feedback on supported touch devices
      if (options?.haptic !== false) {
        switch (effect) {
          case 'click':
            haptic.click();
            break;
          case 'swipe':
            haptic.swipe();
            break;
          case 'toggle':
            haptic.toggle();
            break;
          case 'success':
            haptic.success();
            break;
          default:
            haptic.tick();
            break;
        }
      }

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
          case 'click':
            // Crisp high-frequency micro-switch click
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(1200, now);
            oscillator.frequency.exponentialRampToValueAtTime(320, now + 0.025);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
            oscillator.start(now);
            oscillator.stop(now + 0.03);
            break;

          case 'swipe':
            // Tactile retro card flip / deck slide sweep
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(460, now);
            oscillator.frequency.exponentialRampToValueAtTime(190, now + 0.06);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);
            oscillator.start(now);
            oscillator.stop(now + 0.065);
            break;

          case 'success': {
            // Retro 8-bit positive triad arpeggio (C5, E5, G5, C6)
            const notes = [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((freq, idx) => {
              const noteOsc = context.createOscillator();
              const noteGain = context.createGain();
              noteOsc.type = 'triangle';
              noteOsc.frequency.setValueAtTime(freq, now + idx * 0.05);
              noteGain.gain.setValueAtTime(0.08, now + idx * 0.05);
              noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.1);
              noteOsc.connect(noteGain);
              noteGain.connect(context.destination);
              noteOsc.start(now + idx * 0.05);
              noteOsc.stop(now + idx * 0.05 + 0.1);
            });
            break;
          }

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

        window.setTimeout(() => void context.close().catch(() => {}), 350);
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

  const value = useMemo<SoundValue>(
    () => ({
      enabled,
      toggle,
      play,
      musicPlaying,
      trackTitle: 'ZioZenZhu',
      trackArtist: 'Kondwani Austin Phanga',
    }),
    [enabled, toggle, play, musicPlaying],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};
