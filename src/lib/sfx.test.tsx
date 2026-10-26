import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SoundProvider, useSound } from './sfx';

const TestConsumer: React.FC = () => {
  const { enabled, toggle, play, musicPlaying, trackTitle, trackArtist } = useSound();
  return (
    <div>
      <span data-testid="enabled">{enabled ? 'on' : 'off'}</span>
      <span data-testid="music">{musicPlaying ? 'playing' : 'paused'}</span>
      <span data-testid="track">{trackTitle}</span>
      <span data-testid="artist">{trackArtist}</span>
      <button onClick={toggle}>Toggle Sound</button>
      <button onClick={() => play('click')}>Play Click</button>
      <button onClick={() => play('swipe')}>Play Swipe</button>
      <button onClick={() => play('success')}>Play Success</button>
    </div>
  );
};

describe('SoundProvider & Audio Engine', () => {
  beforeEach(() => {
    try {
      localStorage.clear();
    } catch {}
  });

  it('initializes sound as disabled by default and provides track info', () => {
    render(
      <SoundProvider>
        <TestConsumer />
      </SoundProvider>,
    );

    expect(screen.getByTestId('enabled').textContent).toBe('off');
    expect(screen.getByTestId('track').textContent).toBe('ZioZenZhu');
    expect(screen.getByTestId('artist').textContent).toBe('Kondwani Austin Phanga');
  });

  it('toggles sound on and off and persists to localStorage', () => {
    render(
      <SoundProvider>
        <TestConsumer />
      </SoundProvider>,
    );

    const toggleBtn = screen.getByText('Toggle Sound');
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId('enabled').textContent).toBe('on');
    expect(localStorage.getItem('kortfolio-sfx')).toBe('on');

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('enabled').textContent).toBe('off');
    expect(localStorage.getItem('kortfolio-sfx')).toBe('off');
  });

  it('plays audio effects without error when enabled or disabled', () => {
    render(
      <SoundProvider>
        <TestConsumer />
      </SoundProvider>,
    );

    expect(() => {
      fireEvent.click(screen.getByText('Play Click'));
      fireEvent.click(screen.getByText('Play Swipe'));
      fireEvent.click(screen.getByText('Play Success'));
    }).not.toThrow();

    // Enable sound and test again
    fireEvent.click(screen.getByText('Toggle Sound'));

    expect(() => {
      fireEvent.click(screen.getByText('Play Click'));
      fireEvent.click(screen.getByText('Play Swipe'));
      fireEvent.click(screen.getByText('Play Success'));
    }).not.toThrow();
  });

  it('handles tab visibility changes gracefully', () => {
    render(
      <SoundProvider>
        <TestConsumer />
      </SoundProvider>,
    );

    // Enable sound
    fireEvent.click(screen.getByText('Toggle Sound'));

    // Trigger tab visibility change
    act(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    act(() => {
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(screen.getByTestId('enabled').textContent).toBe('on');
  });
});
