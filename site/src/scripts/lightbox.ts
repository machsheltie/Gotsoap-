/**
 * lightbox.ts — keyboard-accessible poster lightbox (Task D, `/psas/<slug>`).
 *
 * Progressive enhancement: without JS the trigger is an inert button (the
 * poster is already shown full-bleed on the page, so nothing is hidden).
 * With JS, it opens the matching native <dialog> via showModal(), which
 * gives Esc-to-close and top-layer isolation for free. This script adds:
 *   - an explicit Tab focus trap (native support for constraining focus
 *     inside <dialog> varies across engines, so we don't rely on it alone),
 *   - focus placed on the close button on open, restored to the trigger on
 *     close (covers every close path: Esc, backdrop click, close button),
 *   - close-on-true-backdrop-click (click target === the dialog element).
 *
 * No animation is added on open/close: design.md §8's motion policy reserves
 * motion for the hero auto-clear, quiet scroll-reveals, and the SWORN stamp
 * settle only — a lightbox transition would be an unlisted fourth motion.
 * That also makes this `prefers-reduced-motion`-safe by construction: there
 * is no motion to disable.
 *
 * Markup contract (components/psas/Lightbox.astro):
 *   [data-lightbox-open="<dialogId>"]   trigger button (may be more than one)
 *   dialog[data-lightbox]#<dialogId>    the modal
 *   [data-lightbox-close]               close control(s) inside the dialog
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(dialog: HTMLDialogElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

function trapFocus(dialog: HTMLDialogElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const focusable = getFocusable(dialog);
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

function wireDialog(dialog: HTMLDialogElement): void {
  if (dialog.dataset.lightboxInit === 'true') return;
  dialog.dataset.lightboxInit = 'true';

  let lastTrigger: HTMLElement | null = null;

  const open = (trigger: HTMLElement) => {
    lastTrigger = trigger;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      // Legacy fallback (no <dialog> support): plain attribute toggle.
      dialog.setAttribute('open', '');
    }
    const closeBtn = dialog.querySelector<HTMLElement>('[data-lightbox-close]');
    (closeBtn ?? dialog).focus();
  };

  document
    .querySelectorAll<HTMLElement>(`[data-lightbox-open="${dialog.id}"]`)
    .forEach((trigger) => {
      trigger.addEventListener('click', () => open(trigger));
    });

  dialog.querySelectorAll<HTMLElement>('[data-lightbox-close]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close());
  });

  // True backdrop click: the event target is the <dialog> itself (the
  // ::backdrop pseudo-element and the padding around the frame both report
  // the dialog as the target), not a descendant of the content frame.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => trapFocus(dialog, event));

  // Esc is handled natively (fires 'cancel' then 'close'). This listener
  // restores focus for every close path — Esc, backdrop, or the close button.
  dialog.addEventListener('close', () => {
    lastTrigger?.focus();
    lastTrigger = null;
  });
}

function init(): void {
  document
    .querySelectorAll<HTMLDialogElement>('dialog[data-lightbox]')
    .forEach(wireDialog);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Isolate module scope (side-effect import; no exports needed at runtime).
export {};
