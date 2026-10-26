import { beforeEach, describe, expect, it, vi } from 'vitest';
import { haptic, isHapticSupported } from './haptics';

describe('haptics', () => {
  const vibrateMock = vi.fn();

  beforeEach(() => {
    vibrateMock.mockReset();
    Object.defineProperty(navigator, 'vibrate', {
      value: vibrateMock,
      configurable: true,
      writable: true,
    });
  });

  it('detects haptic support when navigator.vibrate is a function', () => {
    expect(isHapticSupported()).toBe(true);
  });

  it('triggers micro-tick vibration', () => {
    haptic.tick();
    expect(vibrateMock).toHaveBeenCalledWith(8);
  });

  it('triggers tactile click vibration', () => {
    haptic.click();
    expect(vibrateMock).toHaveBeenCalledWith(12);
  });

  it('triggers swipe vibration', () => {
    haptic.swipe();
    expect(vibrateMock).toHaveBeenCalledWith(15);
  });

  it('triggers toggle vibration pattern', () => {
    haptic.toggle();
    expect(vibrateMock).toHaveBeenCalledWith([8, 30, 12]);
  });

  it('triggers success vibration pattern', () => {
    haptic.success();
    expect(vibrateMock).toHaveBeenCalledWith([10, 40, 15, 40, 25]);
  });

  it('gracefully handles missing navigator.vibrate', () => {
    // @ts-expect-error intentionally deleting for test
    delete navigator.vibrate;
    expect(isHapticSupported()).toBe(false);
    expect(() => haptic.click()).not.toThrow();
  });
});
