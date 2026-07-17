/**
 * contents-dialog.ts — behavior for the §9.1 contents sheet, site-wide.
 *
 * The markup contract lives in chrome/ContentsDialog.astro (the sheet) and
 * the chrome/*Masthead components (the triggers; the inline list covers
 * no-JS). One dialog per page, any number of triggers:
 *   [data-contents-open]    the masthead trigger (JS-only; inline list covers no-JS)
 *   dialog[data-contents]   the native contents sheet
 *   [data-contents-close]   the close control inside the sheet
 *   [data-contents-link]    every navigation link inside the sheet
 *
 * §9.1 behaviors implemented here:
 *   - open via showModal(); focus moves INTO the dialog (the close control);
 *   - background scroll locks while open (html.contents-open, CSS in the
 *     component);
 *   - focus is trapped: native <dialog> top-layer isolation PLUS an explicit
 *     Tab loop (engine support for containment varies — same belt-and-braces
 *     as lightbox.ts);
 *   - Escape closes (native cancel → close);
 *   - focus returns to the trigger on close — EXCEPT when the close was caused
 *     by activating a navigation link: then focus must follow the navigation
 *     target, not bounce back to the masthead. For same-page anchors the
 *     scroll lock is released synchronously BEFORE the default action so the
 *     fragment jump can actually scroll.
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const LOCK_CLASS = 'contents-open';

function trapFocus(dialog: HTMLDialogElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement as HTMLElement | null;

  if (!active || !dialog.contains(active)) {
    event.preventDefault();
    first.focus();
    return;
  }
  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function init(): void {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-contents]');
  if (!dialog || dialog.dataset.contentsInit === 'true') return;
  dialog.dataset.contentsInit = 'true';

  const triggers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-contents-open]'),
  );
  if (triggers.length === 0) return;

  let lastTrigger: HTMLElement | null = null;
  let restoreFocus = true;

  const open = (trigger: HTMLElement): void => {
    lastTrigger = trigger;
    restoreFocus = true;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      // Legacy fallback (no <dialog> support): plain attribute toggle.
      dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add(LOCK_CLASS);
    // §9.1: move focus into the dialog.
    const closeBtn = dialog.querySelector<HTMLElement>('[data-contents-close]');
    (closeBtn ?? dialog).focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  dialog
    .querySelectorAll<HTMLElement>('[data-contents-close]')
    .forEach((btn) => btn.addEventListener('click', () => dialog.close()));

  // Navigation links: close first, and DON'T yank focus back to the trigger —
  // focus follows the navigation. Unlock scroll synchronously so the browser's
  // default fragment jump (which runs right after this handler) can scroll.
  dialog
    .querySelectorAll<HTMLElement>('[data-contents-link]')
    .forEach((link) =>
      link.addEventListener('click', () => {
        restoreFocus = false;
        document.documentElement.classList.remove(LOCK_CLASS);
        dialog.close();
      }),
    );

  // True backdrop click closes: the ::backdrop reports the <dialog> itself as
  // the event target; clicks inside the frame report descendants.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => trapFocus(dialog, event));

  // Fires for every close path — Esc (native cancel→close), backdrop, the
  // close button, and link activation. §9.1: unlock scroll + focus return.
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove(LOCK_CLASS);
    if (restoreFocus) lastTrigger?.focus();
    lastTrigger = null;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export {};
