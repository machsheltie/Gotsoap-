/**
 * quiz.ts — the Sniff Test island behavior (specs.md §8).
 *
 * TAP-TO-ADVANCE: activating an answer (tap / Enter / Space on a real button)
 * records it and advances — there is no Continue button. A short dwell lets the
 * recorded state register before the swap. The only nav control is a visible
 * Back action, which re-shows the previous question with its recorded answer
 * still pressed; re-activating any answer OVERWRITES answers[index], so the
 * score can never be counted twice (§8).
 *
 * No page scroll on advance (§8): the shell height is stable (one grid cell,
 * see Quiz.astro) and every programmatic focus uses { preventScroll: true }.
 * Question swaps animate with opacity + a short horizontal transform via
 * data-state / --q-dir (CSS in Question.astro); reduced motion swaps instantly.
 *
 * Scoring is INTERNAL PLUMBING:
 *   - Each answer button's data-score is its score (0..3).
 *   - The running total lives ONLY in this module's `answers` local.
 *   - The total is NEVER written to the DOM. On completion we map total → a
 *     verdict SLUG and redirect to the static verdict page by slug. No number,
 *     no ?score= query param, ever reaches a rendered surface.
 *
 * Accessibility: fieldset/legend group semantics; aria-pressed marks the
 * recorded answer; focus moves to each new question's prompt; an aria-live
 * region announces "Question n of 7."; the completion beat is role="status".
 */

interface Band {
  max: number;
  slug: string;
}
interface QuizConfig {
  bands: Band[];
  redirectBase: string;
  dwellMs: number;
  progressTemplate: string;
  ariaTemplate: string;
}

function initQuiz(root: HTMLElement): void {
  if (root.dataset.quizInit === 'true') return;
  root.dataset.quizInit = 'true';

  const configEl = root.querySelector<HTMLScriptElement>('[data-quiz-config]');
  if (!configEl?.textContent) return;
  let config: QuizConfig;
  try {
    config = JSON.parse(configEl.textContent) as QuizConfig;
  } catch {
    return;
  }

  const intro = root.querySelector<HTMLElement>('[data-quiz-intro]');
  const assessment = root.querySelector<HTMLElement>('[data-quiz-assessment]');
  const beginBtn = root.querySelector<HTMLButtonElement>('[data-quiz-begin]');
  const form = root.querySelector<HTMLFormElement>('[data-quiz-form]');
  const backBtn = root.querySelector<HTMLButtonElement>('[data-quiz-back]');
  const live = root.querySelector<HTMLElement>('[data-quiz-live]');
  const beat = root.querySelector<HTMLElement>('[data-quiz-beat]');
  const progressLabel = root.querySelector<HTMLElement>('[data-progress-label]');
  const segs = Array.from(
    root.querySelectorAll<HTMLElement>('[data-progress-seg]'),
  );

  if (!intro || !assessment || !beginBtn || !form || !beat) return;
  const beatEl: HTMLElement = beat;

  const questions = Array.from(
    form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-question]'),
  );
  const count = questions.length;
  if (count === 0) return;
  const finalIndex = count - 1;

  // Selected score per question; null until answered. INTERNAL — never rendered.
  const answers: (number | null)[] = new Array(count).fill(null);
  let current = -1; // -1 = intro screen
  // Swap lock: one recorded answer produces exactly one advance; stray taps
  // during the dwell (or after completion) are ignored.
  let advancing = false;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Dwell so the pressed state is perceptible before the swap — feedback, not
  // decoration, so reduced motion keeps a short beat rather than zero.
  const selectDwell = reduced ? 80 : 220;

  function show(el: HTMLElement | null, visible: boolean): void {
    if (!el) return;
    if (visible) el.removeAttribute('hidden');
    else el.setAttribute('hidden', '');
  }

  function updateProgress(index: number): void {
    const n = index + 1;
    if (progressLabel) {
      progressLabel.textContent = config.progressTemplate.replace(
        '{n}',
        String(n),
      );
    }
    segs.forEach((seg) => {
      const segN = Number(seg.dataset.progressSeg);
      seg.dataset.active = segN <= n ? 'true' : 'false';
    });
    if (live) live.textContent = config.ariaTemplate.replace('{n}', String(n));
  }

  /**
   * Activate question `index`. `dir` is the travel direction (+1 forward,
   * -1 back): the outgoing question exits opposite to travel, the incoming
   * one enters from the travel side (CSS reads --q-dir; §8 short horizontal
   * transform).
   */
  function goTo(index: number, dir: 1 | -1): void {
    const prev = questions[current];
    if (prev) {
      prev.style.setProperty('--q-dir', String(-dir));
      prev.dataset.state = 'off';
      prev.setAttribute('inert', '');
    }

    const q = questions[index];
    q.style.setProperty('--q-dir', String(dir));
    void q.offsetWidth; // commit the start transform before activating
    q.dataset.state = 'active';
    q.removeAttribute('inert');
    current = index;

    updateProgress(index);

    // Back is hidden on the first question.
    show(backBtn, index > 0);

    // Focus the new question's prompt (WCAG 2.4.3 focus order) WITHOUT
    // scrolling — §8: advancing must not move the page.
    const prompt = q.querySelector<HTMLElement>('.q__prompt');
    prompt?.focus({ preventScroll: true });
  }

  function begin(): void {
    show(intro, false);
    show(assessment, true);
    goTo(0, 1);
  }

  function bandFor(total: number): string {
    for (const band of config.bands) {
      if (total <= band.max) return band.slug;
    }
    // Defensive fallback: the last (highest) band.
    return config.bands[config.bands.length - 1].slug;
  }

  function finish(): void {
    // Sum happens here and nowhere the DOM can see it.
    const total = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
    const slug = bandFor(total);

    show(assessment, false);
    show(beatEl, true);
    // Move focus to the beat line so screen readers reliably read the transient
    // completion message (revealing a role="status" from hidden isn't reliable).
    beatEl
      .querySelector<HTMLElement>('[data-quiz-beat-line]')
      ?.focus({ preventScroll: true });

    window.setTimeout(() => {
      window.location.assign(config.redirectBase + slug);
    }, config.dwellMs);
  }

  // Tap-to-advance (§8): activation records the answer and advances. Buttons
  // fire click on tap, Enter, and Space alike, and — unlike radios — Tab can
  // browse the options without committing one.
  form.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement | null)?.closest<HTMLButtonElement>(
      '[data-answer]',
    );
    if (!btn || advancing) return;
    const fieldset = btn.closest<HTMLFieldSetElement>('[data-question]');
    if (!fieldset) return;
    const index = Number(fieldset.dataset.question);
    if (index !== current) return; // inert guards this; belt and braces

    // Assignment, not accumulation — Back + re-answer can never double-count.
    answers[index] = Number(btn.dataset.score);
    fieldset
      .querySelectorAll<HTMLButtonElement>('[data-answer]')
      .forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));

    advancing = true;
    window.setTimeout(() => {
      if (index < finalIndex) {
        advancing = false;
        goTo(index + 1, 1);
      } else {
        // Keep the lock: the assessment is over; no further taps may re-fire.
        finish();
      }
    }, selectDwell);
  });

  beginBtn.addEventListener('click', begin);

  backBtn?.addEventListener('click', () => {
    if (advancing || current <= 0) return;
    goTo(current - 1, -1);
  });
}

function init(): void {
  document
    .querySelectorAll<HTMLElement>('[data-quiz]')
    .forEach((el) => initQuiz(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

export {};
