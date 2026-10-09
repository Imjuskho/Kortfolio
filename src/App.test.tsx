import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders the primary hero heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the navigation landmark', () => {
    render(<App />);
    expect(screen.getAllByRole('banner').length).toBeGreaterThan(0);
  });
});
