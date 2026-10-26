import { createContext, useContext } from 'react';

export type SoundEffect =
  | 'select'
  | 'move'
  | 'open'
  | 'close'
  | 'toggle'
  | 'click'
  | 'swipe'
  | 'success';

export interface SoundValue {
  enabled: boolean;
  toggle: () => void;
  play: (effect: SoundEffect, options?: { haptic?: boolean }) => void;
  musicPlaying: boolean;
  trackTitle: string;
  trackArtist: string;
}

const DEFAULT_SOUND_VALUE: SoundValue = {
  enabled: false,
  toggle: () => {},
  play: () => {},
  musicPlaying: false,
  trackTitle: 'ZioZenZhu',
  trackArtist: 'Kondwani Austin Phanga',
};

export const SoundContext = createContext<SoundValue | null>(null);

export function useSound(): SoundValue {
  const value = useContext(SoundContext);
  return value ?? DEFAULT_SOUND_VALUE;
}
