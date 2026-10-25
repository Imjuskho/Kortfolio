import { createContext, useContext } from 'react';

export type SoundEffect = 'select' | 'move' | 'open' | 'close' | 'toggle';

export interface SoundValue {
  enabled: boolean;
  toggle: () => void;
  play: (effect: SoundEffect) => void;
}

export const SoundContext = createContext<SoundValue | null>(null);

export function useSound(): SoundValue {
  const value = useContext(SoundContext);
  if (!value) throw new Error('useSound must be used inside <SoundProvider>');
  return value;
}
