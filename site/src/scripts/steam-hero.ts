/**
 * steam-hero.ts — the home hero's self-clearing steam (specs.md §3.1).
 *
 * Dramaturgy: on the session's FIRST view the hero is briefly fogged, then an
 * unseen hand "squeegees" the steam off in ~2s while the live "got soap?"
 * type resolves beneath it. No interaction is invited (the drag-to-wipe was
 * retired).
 *
 * Division of labour (to kill the clean→fog flash without duplicating logic):
 *   - BaseLayout ships a SYNCHRONOUS <head> bootstrap (§3.1) that decides the
 *     first-visit state before body paint: it checks reduced motion and
 *     sessionStorage, and adds `steam-first-visit` to <html> only when motion
 *     is allowed and the session flag is absent. It also carries a failsafe
 *     that drops the class (and stores, when a hero exists) if this module
 *     never takes over.
 *   - Hero.astro's fog CSS keys exclusively off that class; the clear state
 *     is the default.
 *   - This island runs the clear via CSS transitions and records completion
 *     in sessionStorage.
 *
 * States (`html.steam-first-visit` × `#hero[data-hero]`):
 *   no class, no attr → clean baseline (no-JS, return visit, storage error,
 *                       or reduced motion; steam pre-cleared)
 *   class, no attr    → fogged (decided pre-paint in the head)
 *   clearing          → steam clip-wipes away left→right; reduced motion gets
 *                       a short opacity crossfade instead (§3.1)
 *   done              → settled clean; transitions off
 *
 * Guardrails (binding, specs.md §3.1):
 *   - plays once per browser SESSION: completion is stored under
 *     `gotsoap:steam-cleared:v1` in sessionStorage, and return visits render
 *     the clear state before first paint (the bootstrap checks the key).
 *   - scrolling mid-sweep completes it instantly AND stores completion.
 *   - if storage access throws, the clear state shows.
 *   - the steam overlay sits ABOVE the hero content and never gates its
 *     paint, so the live headline (the LCP text) is unaffected.
 */

// Must match the <head> bootstrap in layouts/BaseLayout.astro.
const CLEARED_KEY = 'gotsoap:steam-cleared:v1';

function storeCleared(): void {
  try {
    window.sessionStorage.setItem(CLEARED_KEY, '1');
  } catch {
    // Storage unavailable — the bootstrap then shows the clear state on
    // every view rather than re-fogging (§3.1 fail-safe).
  }
}

function run(): void {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Only the head bootstrap fogs, and only on the session's motion-allowed
  // first view. If it did not (return visit, storage error, reduced motion),
  // or another pass already advanced the state, do nothing.
  if (!document.documentElement.classList.contains('steam-first-visit')) return;
  if (hero.getAttribute('data-hero')) return;

  // Scrolling completes the sweep and stores completion (§3.1). The home
  // scrolls normally now, so `scroll` is the primary signal; `wheel` and
  // `touchmove` stay as intent listeners for the one boundary where the
  // document cannot move (scrolling up while already at the top) — the
  // visitor asked to move on, so the sweep completes rather than gating them.
  const SCROLL_EVENTS = ['scroll', 'wheel', 'touchmove'] as const;

  let settled = false;
  const settle = (): void => {
    if (settled) return;
    settled = true;
    hero.setAttribute('data-hero', 'done');
    for (const ev of SCROLL_EVENTS) window.removeEventListener(ev, settle);
    storeCleared();
  };

  // Attach the scroll-completion listeners IMMEDIATELY — a scroll during the
  // fogged pre-sweep phase must complete the clear too. (Phase-3 rendered
  // verification caught the regression: when first paint is late, rAF is
  // starved, and listeners attached inside the rAF callback miss early
  // scroll intent entirely.)
  for (const ev of SCROLL_EVENTS) {
    window.addEventListener(ev, settle, { passive: true });
  }

  const steam = hero.querySelector<HTMLElement>('.hero__steam');

  // Paint the fogged frame first, then trigger the clear on the next frame so
  // the transition actually runs (a same-frame class swap would jump).
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (settled) return;
      hero.setAttribute('data-hero', 'clearing');
      // Failsafe measured from the SWEEP START (1.95s transition + margin).
      // An absolute from-module-load timer truncated the sweep whenever the
      // first renderable frame came late.
      window.setTimeout(settle, 2200);
    });
  });

  if (steam) {
    // Settle when the clear finishes — the clip-path wipe normally, the
    // opacity crossfade under reduced motion.
    steam.addEventListener(
      'transitionend',
      (e) => {
        if (e.propertyName === 'clip-path' || e.propertyName === 'opacity') settle();
      },
      { once: true },
    );
  }
  // Absolute cap: if rendering frames never come at all, never leave the
  // visitor fogged (§3.1 — the effect must never block content).
  window.setTimeout(settle, 4000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run, { once: true });
} else {
  run();
}

// Side-effect module — isolate scope.
export {};
