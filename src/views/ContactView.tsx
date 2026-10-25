import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Briefcase,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { PageHeader, SectionLabel } from '../components/GameUI';
import { MISSIONS, getMission } from '../data/missions';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useRouter } from '../lib/routerCore';
import { track } from '../lib/analytics';

interface FormState {
  name: string;
  email: string;
  organisation: string;
  project: string;
  message: string;
  website: string; // Honeypot field for anti-spam bots
}

type FieldName = keyof FormState;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  organisation: '',
  project: 'general',
  message: '',
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function projectTitle(value: string): string {
  if (value === 'general') return 'General enquiry';
  return getMission(value)?.title ?? 'General enquiry';
}

function buildDraft(form: FormState): { subject: string; body: string } {
  const subject = `[KORTFOLIO] ${projectTitle(form.project)} — ${form.name.trim()}`;
  const lines = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    form.organisation.trim() ? `Organisation: ${form.organisation.trim()}` : null,
    `Project: ${projectTitle(form.project)}`,
    '',
    form.message.trim(),
    '',
    '—',
    'Draft composed from the KORTFOLIO contact screen.',
  ].filter((line): line is string => line !== null);

  return { subject, body: lines.join('\r\n') };
}

export const ContactView: React.FC = () => {
  const { search } = useRouter();

  const requestedProject = useMemo(() => {
    const value = new URLSearchParams(search).get('project') ?? 'general';
    return getMission(value) ? value : 'general';
  }, [search]);

  const [form, setForm] = useState<FormState>(() => ({ ...EMPTY_FORM, project: requestedProject }));
  const [errors, setErrors] = useState<Errors>({});
  const [mode, setMode] = useState<'direct' | 'client'>('direct');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'send-failed' | 'drafted' | 'copied' | 'copy-failed'
  >('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [copyDraftState, setCopyDraftState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [copyEmailState, setCopyEmailState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const mountTimestamp = useRef<number>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    mountTimestamp.current = Math.floor(Date.now() / 1000);
    track('contact_started', { surface: 'contact' });
  }, []);

  const update = (field: FieldName, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    if (status !== 'idle' && status !== 'sent') setStatus('idle');
  };

  const validate = (): Errors => {
    const next: Errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) next.name = 'Enter the name you would like to be addressed by.';
    else if (name.length > 80) next.name = 'Keep the name under 80 characters.';

    if (!email) next.email = 'Enter an email address so a reply is possible.';
    else if (!EMAIL_PATTERN.test(email)) next.email = 'That email address does not look complete.';

    if (form.organisation.trim().length > 120) {
      next.organisation = 'Keep the organisation under 120 characters.';
    }

    if (message.length < 20) next.message = 'Add at least 20 characters of context.';
    else if (message.length > 2000) next.message = 'Keep the brief under 2,000 characters.';

    return next;
  };

  const handleModeChange = (newMode: 'direct' | 'client') => {
    setMode(newMode);
    setStatus('idle');
    setServerError(null);
    track('contact_mode_switched', { mode: newMode, surface: 'contact' });
  };

  const submitDirect = async () => {
    setStatus('sending');
    setServerError(null);

    try {
      const response = await fetch('/kortfolio/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organisation: form.organisation.trim(),
          project: form.project,
          message: form.message.trim(),
          website: form.website.trim(),
          _ts: mountTimestamp.current,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setStatus('sent');
        track('contact_form_submitted', { method: 'api', surface: 'contact' });
      } else {
        const errorMsg =
          data?.error ??
          'Direct delivery is currently unavailable on this connection. Your message is safely preserved below—you can open your email app or copy the brief with one click.';
        setServerError(errorMsg);
        setStatus('send-failed');
        track('contact_form_failed', { surface: 'contact' });
      }
    } catch {
      setServerError(
        'Connection to server failed. Your message is safely preserved below—you can open your email app or copy the brief with one click.',
      );
      setStatus('send-failed');
      track('contact_form_failed', { surface: 'contact' });
    }
  };

  const submitClientMail = () => {
    const draft = buildDraft(form);
    const href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      draft.subject,
    )}&body=${encodeURIComponent(draft.body)}`;

    setStatus('drafted');
    track('contact_email_drafted', { method: 'mailto', surface: 'contact' });
    window.location.href = href;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = (['name', 'email', 'organisation', 'message'] as const).find(
      (field) => nextErrors[field],
    );

    if (firstError) {
      const target =
        firstError === 'name'
          ? nameRef.current
          : firstError === 'email'
            ? emailRef.current
            : firstError === 'message'
              ? messageRef.current
              : null;
      target?.focus();
      return;
    }

    if (mode === 'direct') {
      void submitDirect();
    } else {
      submitClientMail();
    }
  };

  const copyDraft = async () => {
    const draft = buildDraft(form);
    const text = `To: ${PERSONAL_INFO.email}\r\nSubject: ${draft.subject}\r\n\r\n${draft.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyDraftState('copied');
      setStatus('copied');
      track('email_draft_copied', { surface: 'contact' });
      window.setTimeout(() => setCopyDraftState('idle'), 3200);
    } catch {
      setCopyDraftState('failed');
      setStatus('copy-failed');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopyEmailState('copied');
      track('email_address_copied', { surface: 'contact' });
      window.setTimeout(() => setCopyEmailState('idle'), 3200);
    } catch {
      setCopyEmailState('failed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <PageHeader
        eyebrow="Contact / next mission"
        title="Bring the constraint."
        lede="Tell me what has to work, where it has to work, and what is currently failing. Send directly from this screen or compose a draft in your own email client."
        aside={
          <div className="flex flex-wrap gap-2">
            <span className="tag tag-mint">Direct inbox</span>
            <span className="tag tag-amber">Verified channel</span>
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start">
        <section aria-labelledby="contact-form-title" className="pixel-panel p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
            <div>
              <SectionLabel>Inquiry channel</SectionLabel>
              <h2 id="contact-form-title" className="font-display text-2xl font-semibold tracking-tight text-ink">
                Start the next mission
              </h2>
            </div>

            <div
              role="group"
              aria-label="Delivery channel options"
              className="flex items-center rounded-none border border-line bg-void-deep p-1"
            >
              <button
                type="button"
                onClick={() => handleModeChange('direct')}
                aria-pressed={mode === 'direct'}
                className={`min-h-8 px-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  mode === 'direct'
                    ? 'border border-line-mint bg-mint/15 font-semibold text-mint'
                    : 'border border-transparent text-muted hover:text-ink'
                }`}
              >
                Send in-page
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('client')}
                aria-pressed={mode === 'client'}
                className={`min-h-8 px-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  mode === 'client'
                    ? 'border border-line-amber bg-amber/15 font-semibold text-amber'
                    : 'border border-transparent text-muted hover:text-ink'
                }`}
              >
                Open in mail app
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            {mode === 'direct'
              ? 'Sends your message directly to Kondwani’s inbox via the verified site endpoint. Includes automatic client-side fallback if disconnected.'
              : 'Constructs an email draft with your brief pre-filled in your device’s default mail app. Nothing is stored.'}
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Honeypot anti-spam field */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-website">Website (leave empty)</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) => update('website', event.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="field-label">
                  Name <span className="text-amber">*</span>
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className="field-input"
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p id="contact-name-error" className="field-error">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-email" className="field-label">
                  Email <span className="text-amber">*</span>
                </label>
                <input
                  ref={emailRef}
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className="field-input"
                  placeholder="you@organisation.com"
                />
                {errors.email ? (
                  <p id="contact-email-error" className="field-error">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-organisation" className="field-label">
                  Organisation <span className="text-faint">(optional)</span>
                </label>
                <input
                  id="contact-organisation"
                  name="organisation"
                  type="text"
                  autoComplete="organization"
                  value={form.organisation}
                  onChange={(event) => update('organisation', event.target.value)}
                  aria-invalid={Boolean(errors.organisation)}
                  aria-describedby={errors.organisation ? 'contact-organisation-error' : undefined}
                  className="field-input"
                  placeholder="Company, NGO, or team"
                />
                {errors.organisation ? (
                  <p id="contact-organisation-error" className="field-error">
                    {errors.organisation}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-project" className="field-label">
                  Related mission
                </label>
                <select
                  id="contact-project"
                  name="project"
                  value={form.project}
                  onChange={(event) => update('project', event.target.value)}
                  className="field-input"
                >
                  <option value="general">General enquiry</option>
                  {MISSIONS.map((mission) => (
                    <option key={mission.slug} value={mission.slug}>
                      {mission.code} · {mission.title.split('—')[0].trim()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="contact-message" className="field-label">
                  The brief <span className="text-amber">*</span>
                </label>
                <span className="font-mono text-[10px] tabular-nums text-faint">{form.message.length} / 2000</span>
              </div>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                rows={7}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-hint'}
                className="field-input resize-y"
                placeholder="What needs to work? Who uses it? What constraints — bandwidth, hardware, regulation, budget — matter most?"
              />
              {errors.message ? (
                <p id="contact-message-error" className="field-error">
                  {errors.message}
                </p>
              ) : (
                <p id="contact-message-hint" className="mt-1.5 text-xs leading-relaxed text-faint">
                  Useful context: the problem, the people affected, the systems already in place, and the timeline.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Transmitting…
                  </>
                ) : mode === 'direct' ? (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send message
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Compose email
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={copyDraft}
                disabled={!form.name.trim() || !form.message.trim()}
              >
                {copyDraftState === 'copied' ? (
                  <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copyDraftState === 'copied' ? 'Draft copied' : 'Copy draft text'}
              </button>
            </div>

            {/* Live status container */}
            <div
              role="status"
              aria-live="polite"
              className={`border p-3.5 text-sm leading-relaxed ${
                status === 'sent' || status === 'copied'
                  ? 'border-line-mint bg-mint/[0.05] text-muted'
                  : status === 'drafted'
                    ? 'border-line-mint bg-mint/[0.05] text-muted'
                    : status === 'send-failed' || status === 'copy-failed'
                      ? 'border-line-amber bg-amber/[0.06] text-ink'
                      : 'border-line bg-void-deep text-faint'
              }`}
            >
              {status === 'sent' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-mint" aria-hidden="true" />
                    <span className="font-display font-semibold text-mint sm:text-base">
                      Message dispatched successfully!
                    </span>
                  </div>
                  <p className="text-muted">
                    Your brief regarding <span className="text-ink font-medium">{projectTitle(form.project)}</span> has
                    been delivered directly to Kondwani’s inbox. Inquiries are typically reviewed at{' '}
                    <span className="text-ink font-mono text-xs">{form.email}</span> within 1 to 2 business days.
                  </p>
                </div>
              ) : status === 'send-failed' ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-amber">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">{serverError}</p>
                    </div>
                  </div>
                  <div className="border-t border-line-amber/30 pt-3">
                    <p className="text-xs text-muted">Use one of these verified alternative routes right now:</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={submitClientMail}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line-mint bg-mint/10 px-2.5 font-mono text-[11px] uppercase tracking-wider text-mint transition-colors hover:bg-mint/20"
                      >
                        <Send className="h-3.5 w-3.5" aria-hidden="true" />
                        Open in mail app
                      </button>
                      <button
                        type="button"
                        onClick={copyDraft}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-line-mint hover:text-mint"
                      >
                        {copyDraftState === 'copied' ? (
                          <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {copyDraftState === 'copied' ? 'Draft copied' : 'Copy draft text'}
                      </button>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                          PERSONAL_INFO.email,
                        )}&su=${encodeURIComponent(buildDraft(form).subject)}&body=${encodeURIComponent(
                          buildDraft(form).body,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('contact_webmail_opened', { destination: 'gmail', surface: 'contact' })}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-line-mint hover:text-mint"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Open in Gmail web
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : status === 'drafted' ? (
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold text-mint">Draft handed to your mail app.</span> Nothing has been sent
                    from this site. Review the draft, add anything missing, and send it from your own email client.
                  </p>
                  <div className="border-t border-line-mint/30 pt-3">
                    <p className="text-xs text-muted">Did your email application not open automatically?</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={copyDraft}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-line-mint hover:text-mint"
                      >
                        {copyDraftState === 'copied' ? (
                          <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {copyDraftState === 'copied' ? 'Draft copied' : 'Copy draft text'}
                      </button>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                          PERSONAL_INFO.email,
                        )}&su=${encodeURIComponent(buildDraft(form).subject)}&body=${encodeURIComponent(
                          buildDraft(form).body,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('contact_webmail_opened', { destination: 'gmail', surface: 'contact' })}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-line-mint hover:text-mint"
                      >
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Open in Gmail web
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="inline-flex min-h-8 items-center gap-1.5 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
                      >
                        {copyEmailState === 'copied' ? (
                          <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {copyEmailState === 'copied' ? 'Address copied' : 'Copy address only'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : status === 'copied' ? (
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold text-mint">Draft copied to clipboard.</span> Paste it into an email addressed to{' '}
                    <span className="break-all text-ink">{PERSONAL_INFO.email}</span>.
                  </p>
                  <p className="text-xs text-muted">You can also email {PERSONAL_INFO.email} directly from your preferred client.</p>
                </div>
              ) : status === 'copy-failed' ? (
                <p>
                  Clipboard access was blocked by your browser. Select the text manually, or send an email to{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-mint underline underline-offset-4">
                    {PERSONAL_INFO.email}
                  </a>{' '}
                  directly.
                </p>
              ) : mode === 'direct' ? (
                <p>
                  Inquiries are transmitted directly to Kondwani’s inbox via the verified site endpoint. No marketing lists, no trackers.
                </p>
              ) : (
                <p>
                  This mode builds a <span className="text-ink">mailto:</span> draft locally, so your message is never transmitted to or stored by this site.
                </p>
              )}
            </div>
          </form>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24" aria-label="Direct contact details">
          <div className="pixel-panel p-5">
            <h2 className="hud-label text-mint">Direct channel</h2>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="mt-3 flex items-start gap-2 break-all text-sm text-ink underline-offset-4 transition-colors hover:text-mint hover:underline"
            >
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-mint" aria-hidden="true" />
              {PERSONAL_INFO.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-3 inline-flex min-h-9 items-center gap-2 border border-line px-2.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-mint hover:text-mint"
            >
              {copyEmailState === 'copied' ? (
                <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copyEmailState === 'copied' ? 'Copied' : copyEmailState === 'failed' ? 'Copy failed' : 'Copy address'}
            </button>

            <p className="mt-4 flex items-start gap-2 border-t border-line pt-3 text-sm text-muted">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber" aria-hidden="true" />
              {PERSONAL_INFO.location}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tag transition-colors hover:border-line-mint hover:text-mint"
              >
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tag transition-colors hover:border-line-mint hover:text-mint"
              >
                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="panel-quiet p-4">
            <h2 className="hud-label text-mint">Advisory & Scope</h2>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex gap-2">
                <span className="font-mono text-[10px] text-faint">01</span>
                <span>
                  <strong className="text-ink font-medium">Architecture Review:</strong> Resilience audits, network design, and failover runbooks.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[10px] text-faint">02</span>
                <span>
                  <strong className="text-ink font-medium">Edge & Vision:</strong> Low-power solar computer vision, on-device pose/movement models.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[10px] text-faint">03</span>
                <span>
                  <strong className="text-ink font-medium">Financial Tools:</strong> Mobile money reconciliation, USSD integration, and audit trails.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[10px] text-faint">04</span>
                <span>
                  <strong className="text-ink font-medium">Strategic Media:</strong> Documentary production and field visual assets for institutional partners.
                </span>
              </li>
            </ol>
          </div>

          <div className="border border-line-amber bg-amber/[0.04] p-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber" aria-hidden="true" />
              <p className="hud-label text-amber">Communication</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Inquiries are typically reviewed within 1 to 2 business days. If your project has a specific timeline or grant milestone, feel free to note it in your brief.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
