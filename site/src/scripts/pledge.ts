/**
 * pledge.ts — Form CW-1 progressive enhancement (design.md §7, copy §7).
 *
 * The form is a Buttondown embed (PRD §5.4). Without JS: it posts straight to
 * Buttondown's embed-subscribe endpoint (embed=1 suppresses the redirect). With
 * JS: we intercept submit, run in-fiction client validation (procedural CWAAA
 * error copy, already in the DOM as role="alert" text — never colour only),
 * subscribe the email to Buttondown in the background, then reveal the on-page
 * SWORN success state (NO navigation). The red SWORN stamp gets the CWAAA
 * system's single motion moment — one scale-settle — which prefers-reduced-motion
 * suppresses (CSS handles that; here we only toggle).
 *
 * When BUTTONDOWN_USERNAME is empty (config/site.ts) the network POST is skipped
 * (soft-fail + console.warn) but the SWORN success STILL shows, so the flow is
 * fully testable before the owner supplies the username.
 *
 * Only `email` (+ optional `metadata__first_name`) is sent to Buttondown; the
 * satire checkbox is a client-side gate and the honeypot is spam-only.
 *
 * Markup contract (PledgeForm.astro):
 *   [data-pledge-form]                 the <form>
 *   [data-field-first-name]            the first-name input
 *   [data-field-email]                 the email input
 *   [data-field-consent]               the satire-acknowledgment checkbox
 *   [data-honeypot]                    the off-screen spam trap
 *   [data-error-for="<key>"]           a field's hidden role="alert" <p>
 *   [data-pledge-success]              the success <section> (hidden)
 *   [data-success-name]                <strong> that receives the declarant name
 *   [data-sworn-stamp]                 the SWORN heading/stamp
 */
import { BUTTONDOWN_USERNAME, buttondownEmbedUrl } from '../config/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(
  form: HTMLFormElement,
  key: string,
  input: HTMLInputElement | null,
  invalid: boolean,
): void {
  const msg = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
  if (msg) msg.hidden = !invalid;
  if (input) {
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }
}

function revealSuccess(form: HTMLFormElement, firstName: string): void {
  const doc = form.closest('[data-pledge-doc]');
  const success = doc?.querySelector<HTMLElement>('[data-pledge-success]');
  if (!success) return;

  const nameSlot = success.querySelector<HTMLElement>('[data-success-name]');
  if (nameSlot) nameSlot.textContent = firstName;

  form.hidden = true;
  success.hidden = false;

  const stamp = success.querySelector<HTMLElement>('[data-sworn-stamp]');
  // Re-trigger the animation deterministically, then let CSS decide motion.
  if (stamp) {
    stamp.classList.remove('is-stamped');
    void stamp.offsetWidth; // reflow so the class re-add restarts the anim
    stamp.classList.add('is-stamped');
  }

  // Move focus into the freshly revealed region for keyboard + SR users.
  success.focus({ preventScroll: false });
}

async function subscribe(email: string, firstName: string): Promise<void> {
  if (!BUTTONDOWN_USERNAME) {
    console.warn(
      '[pledge] Buttondown is not configured (BUTTONDOWN_USERNAME is empty in ' +
        'config/site.ts); skipping the subscribe request. The SWORN success ' +
        'still shows — set BUTTONDOWN_USERNAME to activate real subscriptions.',
    );
    return;
  }
  const params = new URLSearchParams();
  params.set('email', email);
  params.set('embed', '1');
  if (firstName) params.set('metadata__first_name', firstName);
  try {
    await fetch(buttondownEmbedUrl(), {
      method: 'POST',
      mode: 'no-cors', // cross-origin to buttondown.com; response is opaque
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
  } catch {
    // Network/offline failure never blocks the on-page success.
  }
}

function initForm(form: HTMLFormElement): void {
  if (form.dataset.pledgeInit === 'true') return;
  form.dataset.pledgeInit = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstNameEl = form.querySelector<HTMLInputElement>('[data-field-first-name]');
    const emailEl = form.querySelector<HTMLInputElement>('[data-field-email]');
    const consentEl = form.querySelector<HTMLInputElement>('[data-field-consent]');
    const honeypotEl = form.querySelector<HTMLInputElement>('[data-honeypot]');

    // Honeypot: a filled trap means a bot — abort silently.
    if (honeypotEl && honeypotEl.value.trim().length > 0) return;

    const checks: { key: string; input: HTMLInputElement | null; valid: boolean }[] = [
      {
        key: 'firstName',
        input: firstNameEl,
        valid: !!firstNameEl && firstNameEl.value.trim().length > 0,
      },
      {
        key: 'email',
        input: emailEl,
        valid: !!emailEl && EMAIL_RE.test(emailEl.value.trim()),
      },
      {
        key: 'consent',
        input: consentEl,
        valid: !!consentEl && consentEl.checked,
      },
    ];

    let firstInvalid: HTMLInputElement | null = null;
    for (const check of checks) {
      setError(form, check.key, check.input, !check.valid);
      if (!check.valid && !firstInvalid) firstInvalid = check.input;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const email = emailEl ? emailEl.value.trim() : '';
    const firstName = firstNameEl ? firstNameEl.value.trim() : '';
    // Fire the subscribe (best-effort / soft-fail); reveal success either way.
    void subscribe(email, firstName).finally(() => revealSuccess(form, firstName));
  });
}

function init(): void {
  document
    .querySelectorAll<HTMLFormElement>('[data-pledge-form]')
    .forEach(initForm);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Isolate module scope (side-effect import; no exports needed at runtime).
export {};
