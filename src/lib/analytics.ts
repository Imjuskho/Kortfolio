/**
 * Privacy-conscious analytics bridge.
 *
 * No tracker is bundled. If the owner later adds a consent-gated tag manager,
 * queued events appear as `kortfolio_*` entries in `window.dataLayer` and as
 * `kortfolio:analytics` CustomEvents. Payloads are allow-listed and never
 * include form contents, email addresses, or other personal data.
 */
export type AnalyticsEvent =
  | 'intro_shown'
  | 'intro_skipped'
  | 'missions_opened'
  | 'mission_selected'
  | 'case_study_viewed'
  | 'external_project_link'
  | 'contact_started'
  | 'contact_email_drafted'
  | 'contact_form_submitted'
  | 'contact_form_failed'
  | 'contact_mode_switched'
  | 'email_address_copied'
  | 'email_draft_copied'
  | 'contact_webmail_opened'
  | 'cv_downloaded'
  | 'lab_opened'
  | 'sound_enabled';

type Payload = Record<string, string | number | boolean>;

const SAFE_KEYS = new Set([
  'mission',
  'category',
  'destination',
  'method',
  'surface',
  'enabled',
  'source',
  'mode',
  'status',
]);

function sanitize(payload: Payload = {}): Payload {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([key, value]) =>
        SAFE_KEYS.has(key) &&
        (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'),
    ),
  );
}

export function track(event: AnalyticsEvent, payload: Payload = {}): void {
  if (typeof window === 'undefined') return;

  const detail = { event, ...sanitize(payload) };

  window.dispatchEvent(new CustomEvent('kortfolio:analytics', { detail }));

  const tagged = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  tagged.dataLayer?.push({ ...detail, event: `kortfolio_${event}` });
}
