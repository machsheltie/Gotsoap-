/**
 * pledge.ts — Form CW-1 progressive enhancement (design.md §7, copy §7).
 *
 * Without JS: the static Netlify form posts and Netlify shows its own receipt.
 * With JS: we intercept submit, run in-fiction client validation (procedural
 * CWAAA error copy, already in the DOM as role="alert" text — never colour
 * only), POST the declaration to Netlify in the background, then reveal the
 * on-page SWORN success state (NO navigation). The red SWORN stamp gets the
 * CWAAA system's single motion moment — one scale-settle — which
 * prefers-reduced-motion suppresses (CSS handles that; here we only toggle).
 *
 * Markup contract (PledgeForm.astro):
 *   [data-pledge-form]                 the Netlify <form>
 *   [data-error-for="<field-name>"]    the field's hidden role="alert" <p>
 *   [data-pledge-success]              the success <section> (hidden)
 *   [data-success-name]                <strong> that receives the declarant name
 *   [data-sworn-stamp]                 the SWORN heading/stamp
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldCheck {
  /** The input's `name` (matches data-error-for). */
  name: string;
  input: HTMLInputElement | null;
  valid: boolean;
}

function byName(form: HTMLFormElement, name: string): HTMLInputElement | null {
  return form.querySelector<HTMLInputElement>(`[name="${name}"]`);
}

function setError(form: HTMLFormElement, name: string, invalid: boolean): void {
  const msg = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  const input = byName(form, name);
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

async function submitToNetlify(form: HTMLFormElement): Promise<void> {
  const params = new URLSearchParams();
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string') params.append(key, value);
  });
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
  } catch {
    // Netlify only captures once deployed; a local/offline failure never blocks UX.
  }
}

function initForm(form: HTMLFormElement): void {
  if (form.dataset.pledgeInit === 'true') return;
  form.dataset.pledgeInit = 'true';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = byName(form, 'first-name');
    const email = byName(form, 'email');
    const ack = byName(form, 'satire-acknowledgment');

    const checks: FieldCheck[] = [
      {
        name: 'first-name',
        input: firstName,
        valid: !!firstName && firstName.value.trim().length > 0,
      },
      {
        name: 'email',
        input: email,
        valid: !!email && EMAIL_RE.test(email.value.trim()),
      },
      {
        name: 'satire-acknowledgment',
        input: ack,
        valid: !!ack && ack.checked,
      },
    ];

    let firstInvalid: HTMLInputElement | null = null;
    for (const check of checks) {
      setError(form, check.name, !check.valid);
      if (!check.valid && !firstInvalid) firstInvalid = check.input;
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const declarant = firstName ? firstName.value.trim() : '';
    // Fire the real submission (best-effort); reveal success either way.
    void submitToNetlify(form).finally(() => revealSuccess(form, declarant));
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
