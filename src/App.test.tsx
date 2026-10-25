import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('<App /> User Journeys & Route Resilience', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('renders the start screen heading, primary navigation, and skip link', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
  });

  it('opens and closes the command palette with keyboard shortcuts', () => {
    render(<App />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByRole('dialog', { name: /command menu/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /command menu/i })).not.toBeInTheDocument();
  });

  it('renders missions overview directly from /missions', async () => {
    window.history.replaceState({}, '', '/missions');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /selected systems/i }),
    ).toBeInTheDocument();
  });

  it('renders a specific mission case study directly from /missions/tilemera', async () => {
    window.history.replaceState({}, '', '/missions/tilemera');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /tilemera/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/full-stack architect/i).length).toBeGreaterThan(0);
  });

  it('gracefully renders not-found state when a mission slug does not exist', async () => {
    window.history.replaceState({}, '', '/missions/unknown-mission-code-99');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /mission record missing/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/that mission identifier is not in the archive/i)).toBeInTheDocument();
  });

  it('renders Tech Lab directly from /lab', async () => {
    window.history.replaceState({}, '', '/lab');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /touch the trade-offs/i }),
    ).toBeInTheDocument();
  });

  it('renders Player File directly from /player', async () => {
    window.history.replaceState({}, '', '/player');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /kondwani austin phanga/i }),
    ).toBeInTheDocument();
  });

  it('renders Media Archive directly from /media', async () => {
    window.history.replaceState({}, '', '/media');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /the camera came before the code/i }),
    ).toBeInTheDocument();
  });

  it('renders Contact screen directly from /contact', async () => {
    window.history.replaceState({}, '', '/contact');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: /bring the constraint/i }),
    ).toBeInTheDocument();
  });

  it('renders a 404 signal lost screen for an unknown route', async () => {
    window.history.replaceState({}, '', '/not-a-real-route');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /signal lost/i })).toBeInTheDocument();
  });

  it('synchronizes navigation with browser history popstate events', async () => {
    window.history.replaceState({}, '', '/missions');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /selected systems/i })).toBeInTheDocument();

    // Navigate to /player via popstate (simulating back/forward)
    window.history.pushState({}, '', '/player');
    fireEvent(window, new PopStateEvent('popstate'));
    expect(await screen.findByRole('heading', { level: 1, name: /kondwani austin phanga/i })).toBeInTheDocument();

    // Navigate to /contact via popstate
    window.history.pushState({}, '', '/contact');
    fireEvent(window, new PopStateEvent('popstate'));
    expect(await screen.findByRole('heading', { level: 1, name: /bring the constraint/i })).toBeInTheDocument();
  });

  it('prefills contact form mission from query parameter without crashing on malformed input', async () => {
    window.history.replaceState({}, '', '/contact?project=edge-vision&extra=%FF%FE');
    render(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: /bring the constraint/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/related mission/i)).toHaveValue('edge-vision');
  });

  it('renders every mission directly without missing records', async () => {
    const slugs = [
      'amr-fintech',
      'edge-vision',
      'pocket-body',
      'bawo',
      'tilemera',
      'mwayi-grid',
      'parking-ledger',
      'routerpass',
      'zisamale',
      'mboni',
      'youth-enterprises',
      'malawi-governance',
    ];

    for (const slug of slugs) {
      window.history.replaceState({}, '', `/missions/${slug}`);
      const { unmount } = render(<App />);
      expect(await screen.findByRole('heading', { level: 1 })).not.toHaveTextContent(/mission record missing/i);
      unmount();
    }
  });
});
