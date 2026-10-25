import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider } from '../lib/router';
import { MissionsView } from './MissionsView';
import { MISSIONS } from '../data/missions';

function renderMissionsView() {
  return render(
    <RouterProvider>
      <MissionsView />
    </RouterProvider>,
  );
}

describe('<MissionsView />', () => {
  it('renders all mission records initially', () => {
    renderMissionsView();
    expect(screen.getByText(String(MISSIONS.length).padStart(2, '0'))).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /selected systems/i })).toBeInTheDocument();
  });

  it('filters missions when typing in the search box', () => {
    renderMissionsView();
    const searchInput = screen.getByPlaceholderText(/search missions/i);
    fireEvent.change(searchInput, { target: { value: 'Tilemera' } });

    expect(screen.getByText(/Tilemera/i)).toBeInTheDocument();
  });

  it('shows empty filter state when no missions match query and allows resetting', () => {
    renderMissionsView();
    const searchInput = screen.getByPlaceholderText(/search missions/i);
    fireEvent.change(searchInput, { target: { value: 'xyznonexistentmission123' } });

    expect(screen.getByText(/no records found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset filters/i });
    fireEvent.click(resetBtn);

    expect(searchInput).toHaveValue('');
    expect(screen.queryByText(/no records found/i)).not.toBeInTheDocument();
  });

  it('filters missions by category button', () => {
    renderMissionsView();
    const fintechBtn = screen.getByRole('button', { name: /fintech & saas/i });
    fireEvent.click(fintechBtn);
    expect(fintechBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
