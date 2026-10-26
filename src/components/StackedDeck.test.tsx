import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SoundProvider } from '../lib/sfx';
import { StackedDeck, type StackedDeckItem } from './StackedDeck';

const MOCK_ITEMS: StackedDeckItem[] = [
  {
    id: 'stage-1',
    code: 'CH 01',
    label: 'Curiosity',
    period: '2010',
    tone: 'amber',
    renderContent: () => <div>Curiosity Content</div>,
  },
  {
    id: 'stage-2',
    code: 'CH 02',
    label: 'Experimentation',
    period: '2015',
    tone: 'violet',
    renderContent: () => <div>Experimentation Content</div>,
  },
  {
    id: 'stage-3',
    code: 'CH 03',
    label: 'Perspective',
    period: '2020',
    tone: 'rose',
    renderContent: () => <div>Perspective Content</div>,
  },
];

function renderDeck() {
  return render(
    <SoundProvider>
      <StackedDeck
        id="test-deck"
        title="Test Origin Story"
        unitName="Chapter"
        tone="amber"
        items={MOCK_ITEMS}
      />
    </SoundProvider>,
  );
}

describe('<StackedDeck />', () => {
  it('renders all deck items and progress indicator', () => {
    renderDeck();

    expect(screen.getByText(/CH 01 \/ 03/i)).toBeInTheDocument();
    expect(screen.getByText('Curiosity Content')).toBeInTheDocument();
    expect(screen.getByText('Experimentation Content')).toBeInTheDocument();
    expect(screen.getByText('Perspective Content')).toBeInTheDocument();

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
  });

  it('navigates with next and previous stepper buttons', () => {
    // Mock scrollTo
    window.scrollTo = vi.fn();

    renderDeck();

    const prevBtn = screen.getByRole('button', { name: /previous chapter/i });
    const nextBtn = screen.getByRole('button', { name: /next chapter/i });

    // Initial state: previous button is disabled at index 0
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();

    // Click next
    fireEvent.click(nextBtn);
    expect(window.scrollTo).toHaveBeenCalled();

    // Click jump pill for Chapter 3
    const tabPill = screen.getByRole('tab', { name: /3 Perspective/i });
    fireEvent.click(tabPill);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
