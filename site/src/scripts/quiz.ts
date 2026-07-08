/**
 * quiz.ts — the Sniff Test island behavior (Task B; design.md §7, mechanics §1).
 *
 * One question per screen, no page reloads. Scoring is INTERNAL PLUMBING:
 *   - Each answer's index is its score (0..3), read from the radio's value.
 *   - The running total lives ONLY in this module's `answers`/`total` locals.
 *   - The total is NEVER written to the DOM. On completion we map total → a
 *     verdict SLUG and redirect to the static verdict page by slug. No number,
 *     no ?score= query param, ever reaches a rendered surface (design.md §7).
 *
 * Accessibility: native radio groups (free arrow-key nav + SR semantics); focus
 * moves to each new question's prompt; an aria-live region announces
 * "Question n of 7."; the completion beat is role="status". Reduced-motion is
 * respected in CSS; the ~1.2s beat dwell is reading time, not animation, so it
 * is preserved either way.
 */

interface Band {
  max: number;
  slug: string;
}
interface QuizConfig {
  bands: Band[];
  redirectBase: string;
  dwellMs: number;
  total: number;
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
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-quiz-next]');
  const live = root.querySelector<HTMLElement>('[data-quiz-live]');
  const beat = root.querySelector<HTMLElement>('[data-quiz-beat]');
  const progressLabel = root.querySelector<HTMLElement>('[data-progress-label]');
  const segs = Array.from(
    root.querySelectorAll<HTMLElement>('[data-progress-seg]'),
  );

  if (!intro || !assessment || !beginBtn || !form || !nextBtn || !beat) return;
  // Capture the narrowed (non-null) nodes so nested closures keep the type.
  const nextButton: HTMLButtonElement = nextBtn;
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

  const nextDefaultLabel = nextButton.textContent?.trim() || 'Continue →';
  const nextFinalLabel = nextButton.dataset.finalLabel || 'See my verdict →';

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

  function goTo(index: number): void {
    questions.forEach((q, i) => show(q, i === index));
    current = index;

    updateProgress(index);

    // Back is hidden on the first question.
    show(backBtn, index > 0);

    // Next reflects position + whether this question is answered.
    nextButton.textContent =
      index === finalIndex ? nextFinalLabel : nextDefaultLabel;
    nextButton.disabled = answers[index] === null;

    // Move focus to the new question's prompt (WCAG 2.4.3 focus order).
    const prompt = questions[index].querySelector<HTMLElement>('.q__prompt');
    prompt?.focus();
  }

  function begin(): void {
    show(intro, false);
    show(assessment, true);
    goTo(0);
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
    beatEl.querySelector<HTMLElement>('[data-quiz-beat-line]')?.focus();

    window.setTimeout(() => {
      window.location.assign(config.redirectBase + slug);
    }, config.dwellMs);
  }

  // Selection: only the visible question can emit change events.
  form.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement | null;
    if (!input || input.type !== 'radio') return;
    const fieldset = input.closest<HTMLFieldSetElement>('[data-question]');
    if (!fieldset) return;
    const index = Number(fieldset.dataset.question);

    answers[index] = Number(input.value);

    // Reflect selection on the row (belt-and-braces with :has() in CSS).
    fieldset.querySelectorAll<HTMLElement>('.answer').forEach((row) => {
      const radio = row.querySelector<HTMLInputElement>('.answer__input');
      row.classList.toggle('is-selected', !!radio?.checked);
    });

    if (index === current) nextButton.disabled = false;
  });

  beginBtn.addEventListener('click', begin);

  nextButton.addEventListener('click', () => {
    if (answers[current] === null) return; // guarded by disabled state too
    if (current < finalIndex) goTo(current + 1);
    else finish();
  });

  backBtn?.addEventListener('click', () => {
    if (current > 0) goTo(current - 1);
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
