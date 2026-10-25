import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from '../lib/router';
import { ContactView } from './ContactView';

const originalLocation = window.location;

function setLocation(pathname: string, search = '') {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...originalLocation, pathname, search, href: '' },
  });
}

function renderContact() {
  return render(
    <RouterProvider>
      <ContactView />
    </RouterProvider>,
  );
}

describe('<ContactView />', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/kortfolio/contact');
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
    vi.restoreAllMocks();
  });

  it('prefills the related mission from the query string', () => {
    setLocation('/contact', '?project=edge-vision');
    renderContact();
    expect(screen.getByLabelText(/related mission/i)).toHaveValue('edge-vision');
  });

  it('falls back to general enquiry if the mission in query string is unknown', () => {
    setLocation('/contact', '?project=not-a-mission');
    renderContact();
    expect(screen.getByLabelText(/related mission/i)).toHaveValue('general');
  });

  it('blocks an empty submission and surfaces field errors', () => {
    setLocation('/contact');
    renderContact();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/enter the name you would like/i)).toBeInTheDocument();
    expect(screen.getByText(/enter an email address/i)).toBeInTheDocument();
    expect(screen.getByText(/add at least 20 characters/i)).toBeInTheDocument();
  });

  it('switches to mail app mode, builds a mailto draft, and never claims the message was sent', () => {
    setLocation('/contact');
    renderContact();

    // Switch to mail client mode
    fireEvent.click(screen.getByRole('button', { name: /open in mail app/i }));

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'Test Person' } });
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/the brief/i), {
      target: { value: 'We need an offline-first reconciliation system for three districts.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /compose email/i }));

    expect(window.location.href).toMatch(/^mailto:kayphanga@gmail\.com\?/);
    expect(window.location.href).toContain('subject=');
    expect(screen.getByText(/nothing has been sent from this site/i)).toBeInTheDocument();
    expect(screen.getByText(/did your email application not open automatically\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open in gmail web/i })).toBeInTheDocument();
  });

  it('handles successful direct server submission with confirmation feedback', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, message: 'Inquiry received.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    setLocation('/contact');
    renderContact();

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'David Banda' } });
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'david@enterprise.mw' } });
    fireEvent.change(screen.getByLabelText(/the brief/i), {
      target: { value: 'Requesting a technical review for our enterprise payment gateway.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      '/kortfolio/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    );

    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(callBody.name).toBe('David Banda');
    expect(callBody.email).toBe('david@enterprise.mw');
    expect(callBody.website).toBe('');

    await waitFor(() => {
      expect(screen.getByText(/message dispatched successfully!/i)).toBeInTheDocument();
    });
  });

  it('falls back gracefully to mail draft buttons if direct submission fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network offline'));
    vi.stubGlobal('fetch', fetchMock);

    setLocation('/contact');
    renderContact();

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'Grace Kelly' } });
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'grace@ngo.org' } });
    fireEvent.change(screen.getByLabelText(/the brief/i), {
      target: { value: 'Evaluating edge AI computer vision deployment for agriculture.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/connection to server failed/i)).toBeInTheDocument();
      expect(screen.getByText(/use one of these verified alternative routes/i)).toBeInTheDocument();
    });
  });

  it('includes a hidden honeypot field for bot deterrence', () => {
    setLocation('/contact');
    renderContact();

    const honeypot = screen.getByLabelText(/website \(leave empty\)/i);
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('tabIndex', '-1');
    expect(honeypot).toHaveValue('');
  });

  it('copies verified email address and shows confirmed feedback', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    setLocation('/contact');
    renderContact();

    const copyAddressBtn = screen.getByRole('button', { name: /copy address/i });
    fireEvent.click(copyAddressBtn);

    expect(writeTextMock).toHaveBeenCalledWith('kayphanga@gmail.com');
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });
  });

  it('copies the prepared draft text to clipboard on demand', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    setLocation('/contact');
    renderContact();

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'Sarah Connor' } });
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'sarah@example.com' } });
    fireEvent.change(screen.getByLabelText(/the brief/i), {
      target: { value: 'Looking for a technical consultant to review our architecture.' },
    });

    const copyDraftBtn = screen.getByRole('button', { name: /copy draft text/i });
    fireEvent.click(copyDraftBtn);

    expect(writeTextMock).toHaveBeenCalled();
    const copiedText = writeTextMock.mock.calls[0][0];
    expect(copiedText).toContain('To: kayphanga@gmail.com');
    expect(copiedText).toContain('Sarah Connor');
    expect(copiedText).toContain('sarah@example.com');
    await waitFor(() => {
      expect(screen.getByText(/draft copied to clipboard/i)).toBeInTheDocument();
    });
  });

  it('handles clipboard refusal gracefully without uncaught exceptions', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    setLocation('/contact');
    renderContact();

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'Alex Smith' } });
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/the brief/i), {
      target: { value: 'Offline mesh network consultation required for regional deployment.' },
    });

    const copyDraftBtn = screen.getByRole('button', { name: /copy draft text/i });
    fireEvent.click(copyDraftBtn);

    await waitFor(() => {
      expect(screen.getByText(/clipboard access was blocked by your browser/i)).toBeInTheDocument();
    });
  });
});
