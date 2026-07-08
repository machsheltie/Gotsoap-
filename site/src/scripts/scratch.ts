/**
 * scratch.ts — the first-visit scratch-n-sniff gag (copy-deck §1, PRD §5.1).
 *
 * NEVER a modal: the gag is a small, dismissible bar rendered inert in the
 * markup and revealed here only on a first visit. Dismissal persists via
 * localStorage. Reduced-motion-safe (CSS handles the transition; this only
 * toggles state). Fails silent if storage is unavailable (private mode).
 *
 * Markup contract (ScratchSniff.astro):
 *   [data-scratch-gag]                the bar (hidden until shown)
 *     [data-scratch-message]          optional slot for a rotated line
 *     [data-scratch-dismiss]          the "Noted →" button
 *   data-rotation='["…","…"]'         JSON array of alternate lines
 */

const STORAGE_KEY = 'gotsoap:scratch-dismissed';

function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function storageSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode — non-fatal; gag simply reappears next load */
  }
}

function init(): void {
  const gag = document.querySelector<HTMLElement>('[data-scratch-gag]');
  if (!gag) return;

  if (storageGet(STORAGE_KEY) === '1') {
    gag.remove();
    return;
  }

  // Optionally swap in a rotation line for variety (50/50 with the default).
  const slot = gag.querySelector<HTMLElement>('[data-scratch-message]');
  const raw = gag.dataset.rotation;
  if (slot && raw) {
    try {
      const rotation = JSON.parse(raw) as string[];
      if (Array.isArray(rotation) && rotation.length && Math.random() < 0.5) {
        const line = rotation[Math.floor(Math.random() * rotation.length)];
        if (typeof line === 'string') slot.textContent = line;
      }
    } catch {
      /* malformed rotation — keep the default line */
    }
  }

  gag.hidden = false;
  gag.setAttribute('data-scratch-shown', 'true');

  const dismiss = () => {
    storageSet(STORAGE_KEY, '1');
    gag.setAttribute('data-scratch-shown', 'false');
    // Allow the CSS transition to run, then remove from the a11y tree.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gag.remove();
    } else {
      window.setTimeout(() => gag.remove(), 320);
    }
  };

  gag
    .querySelector<HTMLButtonElement>('[data-scratch-dismiss]')
    ?.addEventListener('click', dismiss);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Isolate module scope (side-effect import; no exports needed at runtime).
export {};
