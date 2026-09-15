/**
 * reveal.ts — scroll-driven reveal in reading order.
 *
 * Owner request 2026-09-14: the page should reveal itself as the visitor
 * scrolls, as on the reference site. design.md §10 bounds it: restrained,
 * material, no parallax, no cursor tracking. Elements are visible without JS;
 * base.css offsets them only under `html.has-js.motion-ok`, and this script
 * settles each one once it enters the viewport.
 */
const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

// Utility bar: its pledge link is redundant while the primary navigation is on
// screen (desktop). Mark the root once the nav has scrolled away.
const primaryNav = document.querySelector<HTMLElement>('header.nav');
if (primaryNav && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => root.classList.toggle('nav-away', !entry.isIntersecting),
    { threshold: 0 },
  ).observe(primaryNav);
} else {
  root.classList.add('nav-away');
}

// Mobile menu: Close button, Escape, and outside tap all close the disclosure.
document.querySelectorAll<HTMLDetailsElement>('details[data-menu]').forEach((menu) => {
  const close = () => { if (menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); } };
  menu.querySelector('[data-menu-close]')?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  document.addEventListener('pointerdown', (e) => { if (menu.open && !menu.contains(e.target as Node)) close(); });
});

// Referral: a real link to the pledge, enhanced to copy the pledge URL and
// confirm in place (design.md §10). Without JavaScript, or without clipboard
// access, the link simply navigates.
document.querySelectorAll<HTMLAnchorElement>('a[data-copy-link]').forEach((link) => {
  const status = link.parentElement?.querySelector<HTMLElement>('[role="status"]');
  if (!navigator.clipboard || !window.isSecureContext) return;
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(link.href);
      if (status) status.textContent = link.dataset.done ?? 'Link copied.';
    } catch {
      window.location.assign(link.href);
    }
  });
});

function settleAll(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}

if (reduce.matches || !('IntersectionObserver' in window)) {
  root.classList.remove('motion-ok');
  settleAll();
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el));

  // Anything already in view at load settles immediately, in order.
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add('is-in');
    });
  });

  reduce.addEventListener('change', (e) => {
    if (e.matches) {
      root.classList.remove('motion-ok');
      settleAll();
    }
  });
}
