/**
 * steam-hero.ts — the home hero's self-clearing steam (design.md §8).
 *
 * Dramaturgy: on load the hero is briefly fogged, then an unseen hand
 * "squeegees" the steam off in ~2s while the live "got soap?" type resolves
 * beneath it. No interaction is invited (the drag-to-wipe was retired).
 *
 * Division of labour (to kill the clean→fog flash without duplicating logic):
 *   - Hero.astro ships a tiny is:inline bootstrap that sets the PRE-PAINT
 *     fogged state (`data-hero="fogged"`) — but ONLY when motion is allowed —
 *     plus a failsafe that force-clears if this module never loads.
 *   - This island reads that state and runs the clear via CSS transitions.
 *
 * State machine on `#hero[data-hero]`:
 *   (unset) → clean baseline (no-JS / reduced-motion; steam pre-cleared)
 *   fogged  → steam covers, no transition (set pre-paint by the bootstrap)
 *   clearing→ steam clip-wipes away left→right; squeegee streak travels
 *   done    → settled clean; transitions off
 *
 * Guardrails (binding, design.md §8):
 *   - reduced-motion → never fogs here (bootstrap bails) → clean, no sweep.
 *   - plays once per load; scrolling mid-sweep completes it instantly.
 *   - the steam overlay sits ABOVE the hero content and never gates its paint,
 *     so the live headline (the LCP text) is unaffected.
 */

function run(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Only the bootstrap fogs, and only when motion is allowed. If we are not
  // fogged (reduced-motion, no-JS baseline, or already settled), do nothing.
  if (hero.getAttribute('data-hero') !== 'fogged') return;

  let settled = false;
  const settle = (): void => {
    if (settled) return;
    settled = true;
    hero.setAttribute('data-hero', 'done');
    window.removeEventListener('scroll', onScroll);
  };

  // Complete instantly if the reader scrolls before the sweep finishes.
  const onScroll = (): void => settle();

  const steam = hero.querySelector<HTMLElement>('.hero__steam');

  // Paint the fogged frame first, then trigger the clear on the next frame so
  // the transition actually runs (a same-frame class swap would jump).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (settled) return;
      window.addEventListener('scroll', onScroll, { passive: true, once: true });
      hero.setAttribute('data-hero', 'clearing');
    });
  });

  if (steam) {
    // Settle when the clip-path wipe finishes.
    steam.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName === 'clip-path') settle();
      },
      { once: true },
    );
  }
  // Belt-and-braces: settle even if transitionend never fires.
  window.setTimeout(settle, 2400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run, { once: true });
} else {
  run();
}

// Side-effect module — isolate scope.
export {};
