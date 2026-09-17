/**
 * pledge.ts — Form CW-1 progressive enhancement.
 *
 * Brief: .impeccable/surfaces/cwaaa-src-pages-pledge-astro.md (confirmed
 * 2026-09-15). Contract: docs/contracts/pledge.v1.json.
 *
 * WITHOUT JAVASCRIPT the form posts natively to Buttondown's embed-subscribe
 * endpoint (embed=1 suppresses the redirect), so the declaration can still be
 * filed. WITH JAVASCRIPT we intercept, validate in place against the approved
 * error copy already in the DOM, send the subscription, and then settle the
 * declaration — the form is NOT swapped for a receipt. The oath stays, the
 * entries read back as filed, and SWORN lands on the document (owner decision
 * 2026-09-15: "you can see what you signed").
 *
 * TRUTHFULNESS — the reason this file is not a copy of site/src/scripts/pledge.ts.
 * That script's own header says the SWORN success "STILL shows" when Buttondown
 * is unconfigured, and its catch block says a network failure "never blocks the
 * on-page success". CWAAA does not certify a filing that did not happen. Here:
 *
 *   • Buttondown not configured  → NOT FILED. Nothing was sent, so nothing is
 *                                  certified. Console warns why.
 *   • Request threw (offline,
 *     DNS, blocked)              → NOT FILED. The entries stay on the form.
 *   • Request completed          → SWORN.
 *
 * KNOWN RESIDUAL LIMIT, recorded deliberately. The embed endpoint is
 * cross-origin and CORS-less, so the POST must be `no-cors` and its response is
 * opaque: a completed request proves the bytes left the browser, not that
 * Buttondown accepted them. A 4xx from Buttondown is therefore indistinguishable
 * from acceptance at this layer. Closing that gap needs a server-side proxy (a
 * Netlify function holding the API key) rather than a browser embed POST; it is
 * a deployment decision, not a design one. Until then this is the strongest
 * truthful signal obtainable, and the two failure classes above — which is where
 * every pre-launch build actually lands, `BUTTONDOWN_USERNAME` being empty — are
 * reported honestly rather than papered over with a stamp.
 *
 * Only `email` and `metadata__first_name` reach Buttondown. The consent
 * checkbox is a client gate with no `name` (contract: `buttondownName: null`),
 * and the honeypot is spam-only. No field value is logged or sent anywhere else
 * (contract: `analyticsMayReceiveFieldValues: false`).
 *
 * Markup contract (pledge.astro):
 *   [data-pledge-doc]            the <article> wrapping the whole declaration
 *   [data-pledge-form]           the <form>
 *   [data-field-first-name]      first-name input
 *   [data-field-email]           email input
 *   [data-field-consent]         consent checkbox
 *   [data-honeypot]              off-screen spam trap
 *   [data-error-for="<key>"]     a field's hidden role="alert" <p>
 *   [data-settle]                the SWORN / NOT FILED settle region (hidden)
 *   [data-settle-sworn]          the sworn branch inside it (hidden)
 *   [data-settle-failed]         the failure branch inside it (hidden)
 *   [data-success-name]          receives the declarant's first name
 *   [data-submit-label]          the submit control's label span (NOT the button:
 *                                writing to the button's textContent deletes the
 *                                micro note beside the label)
 *   [data-announce]              visually-hidden live region
 *   [data-share]                 the share control; its data-share-* attributes
 *                                carry the title, text and confirmation wording
 *   [data-share-done-slot]       the shared role="status" confirmation line, which
 *                                reveal.ts also writes into for the copy-link
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

/**
 * Send the subscription. Resolves true only if the request completed; see the
 * residual-limit note above for exactly how much that proves.
 */
async function subscribe(email: string, firstName: string): Promise<boolean> {
  if (!BUTTONDOWN_USERNAME) {
    console.warn(
      '[pledge] PUBLIC_BUTTONDOWN_USERNAME is empty (src/config/site.ts), so no ' +
        'subscription was sent. Form CW-1 reports NOT FILED rather than SWORN: ' +
        'the declaration genuinely was not filed. Set the variable to file for real.',
    );
    return false;
  }
  const params = new URLSearchParams();
  params.set('email', email);
  params.set('embed', '1');
  if (firstName) params.set('metadata__first_name', firstName);
  try {
    await fetch(buttondownEmbedUrl(), {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * The settle. The declaration is not replaced: the form stays where it is, its
 * entries become read-only, and the stamp lands above the oath the visitor just
 * swore. On failure the entries stay editable so nothing has to be re-typed.
 */
function settle(doc: HTMLElement, form: HTMLFormElement, filed: boolean, firstName: string): void {
  const region = doc.querySelector<HTMLElement>('[data-settle]');
  const sworn = doc.querySelector<HTMLElement>('[data-settle-sworn]');
  const failed = doc.querySelector<HTMLElement>('[data-settle-failed]');
  if (!region || !sworn || !failed) return;

  sworn.hidden = !filed;
  failed.hidden = filed;
  region.hidden = false;
  doc.dataset.filed = filed ? 'true' : 'false';

  if (filed) {
    const nameSlot = doc.querySelector<HTMLElement>('[data-success-name]');
    if (nameSlot) nameSlot.textContent = firstName;

    /* Read-only, not disabled: a disabled control leaves the tab order and is
       announced as unavailable, but these entries are the point — the visitor
       is meant to be able to read back what they signed. A checkbox has no
       readonly, so it is disabled and its state is restated in text beside it. */
    form.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"]').forEach((el) => {
      el.readOnly = true;
      el.setAttribute('aria-readonly', 'true');
    });
    const consent = form.querySelector<HTMLInputElement>('[data-field-consent]');
    if (consent) consent.disabled = true;
  }

  const announce = doc.querySelector<HTMLElement>('[data-announce]');
  if (announce) {
    const heading = (filed ? sworn : failed).querySelector('[data-settle-stamp]');
    const body = (filed ? sworn : failed).querySelector('[data-settle-body]');
    announce.textContent = [heading?.textContent, body?.textContent].filter(Boolean).join(' ');
  }

  region.focus({ preventScroll: false });
}

/** Share, then clipboard, then nothing louder than a sentence. */
function initShare(doc: HTMLElement): void {
  const button = doc.querySelector<HTMLButtonElement>('[data-share]');
  const done = doc.querySelector<HTMLElement>('[data-share-done-slot]');
  if (!button) return;

  button.addEventListener('click', async () => {
    const payload = {
      title: button.dataset.shareTitle ?? '',
      text: button.dataset.shareText ?? '',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* Dismissing the sheet is not a failure; fall through to the clipboard. */
      }
    }
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(`${payload.text} ${payload.url}`.trim());
        if (done) done.textContent = button.dataset.shareDone ?? '';
      } catch {
        /* No clipboard access: the copy-link control beside this one still works. */
      }
    }
  });
}

function initForm(form: HTMLFormElement): void {
  const doc = form.closest<HTMLElement>('[data-pledge-doc]');
  if (!doc || form.dataset.pledgeInit === 'true') return;
  form.dataset.pledgeInit = 'true';
  initShare(doc);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstNameEl = form.querySelector<HTMLInputElement>('[data-field-first-name]');
    const emailEl = form.querySelector<HTMLInputElement>('[data-field-email]');
    const consentEl = form.querySelector<HTMLInputElement>('[data-field-consent]');
    const honeypotEl = form.querySelector<HTMLInputElement>('[data-honeypot]');

    /* A filled trap means a bot. Abort silently: no error, no settle. */
    if (honeypotEl && honeypotEl.value.trim().length > 0) return;

    const firstName = firstNameEl?.value.trim() ?? '';
    const email = emailEl?.value.trim() ?? '';

    const checks: { key: string; input: HTMLInputElement | null; valid: boolean }[] = [
      { key: 'firstName', input: firstNameEl, valid: firstName.length > 0 },
      { key: 'email', input: emailEl, valid: EMAIL_RE.test(email) },
      { key: 'consent', input: consentEl, valid: !!consentEl?.checked },
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

    /* In flight: the document does not move, the control reports the work. */
    const submitEl = form.querySelector<HTMLButtonElement>('[type="submit"]');
    const labelEl = form.querySelector<HTMLElement>('[data-submit-label]');
    const idleLabel = labelEl?.textContent ?? '';
    if (submitEl) {
      submitEl.disabled = true;
      submitEl.setAttribute('aria-busy', 'true');
    }
    if (labelEl && submitEl?.dataset.filing) labelEl.textContent = submitEl.dataset.filing;

    void subscribe(email, firstName).then((filed) => {
      if (submitEl) {
        submitEl.removeAttribute('aria-busy');
        /* Only a failure returns the control: after SWORN there is nothing
           left to press, and the settle explains why. */
        submitEl.disabled = filed;
      }
      if (labelEl) labelEl.textContent = filed ? idleLabel : (submitEl?.dataset.retry ?? idleLabel);
      settle(doc, form, filed, firstName);
    });
  });
}

document.querySelectorAll<HTMLFormElement>('[data-pledge-form]').forEach(initForm);
