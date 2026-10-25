import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider } from '../lib/router';
import { SoundProvider } from '../lib/sfx';
import { TopBar } from './TopBar';

function renderTopBar(onOpenCommand = vi.fn()) {
  return render(
    <RouterProvider>
      <SoundProvider>
        <TopBar onOpenCommand={onOpenCommand} />
      </SoundProvider>
    </RouterProvider>,
  );
}

describe('<TopBar />', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark';
    try {
      localStorage.clear();
    } catch {}
  });

  it('toggles theme, persists preference to localStorage, and updates document dataset', () => {
    renderTopBar();
    const themeBtn = screen.getByRole('button', { name: /switch to light mode/i });
    expect(themeBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(themeBtn);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('kortfolio-theme')).toBe('light');

    const darkBtn = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(darkBtn).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(darkBtn);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('kortfolio-theme')).toBe('dark');
  });

  it('triggers onOpenCommand when command button is clicked', () => {
    const onOpenCommand = vi.fn();
    renderTopBar(onOpenCommand);
    const cmdBtn = screen.getByRole('button', { name: /open command menu/i });
    fireEvent.click(cmdBtn);
    expect(onOpenCommand).toHaveBeenCalledTimes(1);
  });

  it('toggles sound on and off', () => {
    renderTopBar();
    const soundBtn = screen.getByRole('button', { name: /enable interface sound/i });
    expect(soundBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(soundBtn);
    expect(screen.getByRole('button', { name: /disable interface sound/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('opens mobile navigation drawer on toggle', () => {
    renderTopBar();
    const menuBtn = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(menuBtn);

    expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument();
  });
});
