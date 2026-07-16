/**
 * entry-complete.ts — the §6 scroll clause, as one class.
 *
 *   "Normal scrolling completes the transition; no animation reverses when
 *    the visitor scrolls back." — specs.md §6
 *
 * Every environment's entry animation is authored so its BASE state is the
 * final composition: keyframes describe only where elements COME FROM. So
 * "complete the transition" is simply switching the animations off — the
 * elements land exactly where they already live. This module owns no layout,
 * no styling, and no DOM; each environment declares its own `.entry-done`
 * rules against its own elements. Reversal is impossible by construction:
 * entries play once on load and never re-trigger from scroll position.
 *
 * Progressive enhancement: without JS the CSS entry simply plays to its end.
 */
const stages = document.querySelectorAll('[data-entry-stage]');
if (stages.length) {
  const complete = () => {
    stages.forEach((stage) => stage.classList.add('entry-done'));
  };
  window.addEventListener('scroll', complete, { once: true, passive: true });
}

export {};
