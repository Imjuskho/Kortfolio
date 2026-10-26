/**
 * Tactile / Haptic feedback utility using navigator.vibrate.
 * Gracefully no-ops on browsers/platforms without vibration hardware.
 */

export const isHapticSupported = (): boolean =>
  typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

export const haptic = {
  /** Crisp micro-tick for standard button clicks & nav link taps (8ms) */
  tick: () => {
    try {
      if (isHapticSupported()) navigator.vibrate(8);
    } catch {}
  },

  /** Snappy tactile switch click for primary actions & command palette (12ms) */
  click: () => {
    try {
      if (isHapticSupported()) navigator.vibrate(12);
    } catch {}
  },

  /** Card flip / swipe / chapter stepper haptic bump (15ms) */
  swipe: () => {
    try {
      if (isHapticSupported()) navigator.vibrate(15);
    } catch {}
  },

  /** Double-pulse for sound or theme toggle */
  toggle: () => {
    try {
      if (isHapticSupported()) navigator.vibrate([8, 30, 12]);
    } catch {}
  },

  /** Positive confirmation arpeggio pattern for form submit & copy action */
  success: () => {
    try {
      if (isHapticSupported()) navigator.vibrate([10, 40, 15, 40, 25]);
    } catch {}
  },
};
