/**
 * share.ts — Web Share API with a copy-link fallback (PRD §5.2/§6, design.md §4).
 *
 * Progressive enhancement: buttons work as plain links/no-ops without JS; this
 * wires the in-fiction share + copy affordances. Driven entirely by data
 * attributes emitted by ShareRow.astro so no per-instance JS is needed.
 *
 *   [data-share-root]                 wrapper, carries url/title/text
 *     [data-share-action="share"]     -> navigator.share() | copy fallback
 *     [data-share-action="copy"]      -> clipboard.writeText(url)
 *     [data-share-status]             aria-live region for feedback
 *
 * Buttons keep their in-fiction label; on copy success the status region
 * announces "Copied." transiently (screen-reader friendly).
 */

const COPIED_MS = 2000;

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  // Legacy fallback for non-secure contexts / older in-app browsers.
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function announce(root: HTMLElement, msg: string): void {
  const status = root.querySelector<HTMLElement>('[data-share-status]');
  if (!status) return;
  status.textContent = msg;
  window.setTimeout(() => {
    if (status.textContent === msg) status.textContent = '';
  }, COPIED_MS);
}

function initRoot(root: HTMLElement): void {
  if (root.dataset.shareInit === 'true') return;
  root.dataset.shareInit = 'true';

  const url = root.dataset.shareUrl || window.location.href;
  const title = root.dataset.shareTitle || document.title;
  const text = root.dataset.shareText || '';

  const shareBtn = root.querySelector<HTMLButtonElement>(
    '[data-share-action="share"]',
  );
  const copyBtn = root.querySelector<HTMLButtonElement>(
    '[data-share-action="copy"]',
  );

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title, text, url });
          return;
        } catch {
          // user cancelled or share failed — fall back to copy
        }
      }
      const ok = await copyText(url);
      announce(root, ok ? 'Link copied.' : 'Copy failed — long-press to copy.');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const ok = await copyText(url);
      announce(root, ok ? 'Copied.' : 'Copy failed — long-press to copy.');
    });
  }
}

function init(): void {
  document
    .querySelectorAll<HTMLElement>('[data-share-root]')
    .forEach(initRoot);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

// Isolate module scope (side-effect import; no exports needed at runtime).
export {};
