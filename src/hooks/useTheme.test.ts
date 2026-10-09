import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme, getStoredTheme } from './useTheme';

describe('useTheme()', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('defaults to light when nothing is stored', () => {
    expect(getStoredTheme()).toBe('light');
  });

  it('reads a previously stored selection', () => {
    window.localStorage.setItem('kortfolio-theme', 'dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('applies the class and persists when toggled', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('kortfolio-theme')).toBe('dark');
  });
});
