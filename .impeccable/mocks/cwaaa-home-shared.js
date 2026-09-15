// Shared markup for the three CWAAA home comps: nav, section 2, section 3.
// Comps differ only in the first viewport.
const SEAL = `<svg viewBox="0 0 120 120" role="img" aria-label="CWAAA seal">
  <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="60" cy="60" r="37" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <g fill="none" stroke="currentColor" stroke-width="2"><rect x="63" y="45" width="13" height="27" rx="2"/><rect x="66.5" y="38" width="6" height="7"/></g>
  <rect x="38" y="57" width="28" height="15" rx="7" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="45" cy="51" r="2.6" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <circle cx="52" cy="46.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <rect x="33" y="51" width="54" height="5.5" fill="#a63d2f" transform="rotate(-22 60 54)"/>
</svg>`;

document.querySelectorAll('[data-nav]').forEach(el => {
  el.innerHTML = `
  <div class="brand">${SEAL}<div class="name">Concerned Women<br>Against Axe Abuse<small>Est. 2024 · A national coalition</small></div></div>
  <nav class="menu"><a>Findings</a><a>Recovery Stories</a><a>Tie One On</a><a>Chapters</a><a>About</a><a class="pledge">Take the Pledge</a></nav>
  <a class="burger">Menu</a>`;
});

document.querySelectorAll('[data-rest]').forEach(el => {
  el.innerHTML = `
  <section class="dao">
    <p class="line">Document. <i>Advocate.</i> Organize.</p>
    <div class="run">
      <p><span class="n">01 · DOCUMENT</span>We keep the record. Findings are numbered, dated, and written plainly enough to read aloud at a chapter table.</p>
      <p><span class="n">02 · ADVOCATE</span>We state the expectation in public. Routine washing is reasonable, and someone has to say so where it can be heard.</p>
      <p><span class="n">03 · ORGANIZE</span>We give people a practical way to act: a ribbon, a referral, a form, and a next step that fits in one afternoon.</p>
    </div>
  </section>
  <section class="finding">
    <div>
      <p class="tag">Current finding · number pending register (CW-D04)</p>
      <h2 class="statement">Fragrance is not a cleansing event.</h2>
      <div class="rule"></div>
      <p class="support">Body spray may alter the immediate air. It does not remove sweat, oil, dirt, or the consequences of avoiding soap and water.</p>
      <p class="disposition">Disposition · entered into the public record</p>
    </div>
    <aside class="side"><b>Methodology note</b>Observations were collected at chapter tables, gym benches, and one very long elevator ride. The committee declines to name the elevator.</aside>
  </section>
  <div class="continues">Continues · one recovery voice · Tie One On · coalition scale · pledge action · campaign seam</div>`;
});
