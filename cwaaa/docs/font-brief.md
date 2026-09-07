# CWAAA font brief — harvesting and screening

**Status:** owner-interview input for `ui-system.md §3` (Pending typography system). This brief
proposes **roles and selection criteria**. It does **not** name families and does **not** lock §3.
The owner selects; §12's prohibition against agents choosing typefaces stands until §3 is locked.

**Reads with:** `design.md §9`, `ui-system.md §3`, `world-bible.md`, `DESIGN-SYSTEM.md`.

---

## 1. What the type has to do

CWAAA is a functioning national advocacy coalition with exceptional art direction. Its emotional
result is **collective relief** — someone finally wrote this down, put a seal on it, and made the
expectation legible. The comedy is meticulous civic procedure applied to an absurdly low bar, and it
never comes at a participant's expense.

So the type must read as **competent, contemporary, humane, and public**. Not governmental. Not
whimsical. Not a filing cabinet. Not a fashion magazine.

Two failure modes bracket every choice below:

- **Too institutional** → faux-government portal, federal masthead, records room. Kills the humanity.
- **Too soft** → pastel wellness nonprofit, friendly geometric sans, template pairing. Kills the
  authority and makes the joke evaporate.

## 2. Hard constraint: distinctness from Got Soap?

The two systems ship from the same runtime and must remain visibly distinct authors. Got Soap?'s cast
is already locked:

| Got Soap? voice | Family | Classification |
|---|---|---|
| Commands | Oswald | condensed grotesque |
| Persuades | Behind The Nineties Sans | contemporary sans |
| Seduces | Moxie Twist | display serif |
| Operates | Marlin Sans SQ | squarish interface sans |
| Records | Moanslight | display sans |

**Therefore CWAAA must avoid a condensed grotesque display voice.** It would collide with Oswald at
exactly the moment both systems are shouting. Width and structure are the cheapest available
separators: where Got Soap? is compressed and vertical, CWAAA should be broader, calmer, and more
horizontal.

## 3. The roles

### R1 — Proposition / Display

**Where it lives:** `THE BAR IS SOAP.` owning two-thirds of the opening field; Findings figures at
exhibition scale; the `DOCUMENT. ADVOCATE. ORGANIZE.` composition; route-opening statements.

**Job:** carry a monumental public statement without becoming a government seal or a luxury headline.
This is the voice that has to make an absurd proposition look like a reasonable collective
expectation.

**Look for:**
- Sturdy construction that survives being set enormous — closed apertures, even color, no fragile
  hairlines.
- Low-to-moderate stroke contrast. High contrast reads fashion/editorial-luxury, which is Got Soap?'s
  register.
- A real heavy weight (700–900) that stays legible rather than turning into a blob.
- Normal-to-wide width. Not condensed.
- Excellent ALL-CAPS performance — the proposition is set in caps.

**Reject:** Didone / high-contrast display, geometric sans (too friendly), anything condensed,
distressed or stamped faces, typewriter faces, blackletter, script, anything with a "seal" or
"federal" marketing angle.

**Screening test:** set `THE BAR IS SOAP.` at 120px and look at it cold. If the first association is
a fashion magazine, a wedding invitation, or a federal form, reject. You want a public-health poster
or a well-funded advocacy campaign.

---

### R2 — Text & Interface

**Where it lives:** navigation, mission copy, explanatory body, form labels and controls, buttons,
finding annotations, chapter listings. The workhorse — most words on the site.

**Job:** plain, highly readable, and completely trustworthy. This is where the "institutional layer"
earns the trust that lets the expressive layer be strange.

**Look for:**
- Humanist or neo-grotesque sans with genuinely open apertures. Readability at 16–18px is the whole
  job.
- A real weight range: 400 / 500 / 600 or 700 minimum, plus true italics.
- **Tabular lining figures.** Non-negotiable — Findings tables, chapter counts, dates, and `RC-NNN`
  identifiers all need columns that align. Many display-oriented families ship proportional figures
  only; check before you download.
- Unambiguous `1` / `l` / `I` and `0` / `O`, because identifiers and form data depend on it.
- Comfortable at small sizes for form labels and legal copy.

**Reject:** geometric sans with a single-storey `a` (reads juvenile in forms), anything with
personality that competes with R1, ultra-neutral corporate faces that read as SaaS, and the
explicitly banned template partners (Inter, Montserrat, Poppins and equivalents).

**Screening test:** build a fake Form CW-1 — label, input, helper text, error message, submit button
— at real sizes. If any label is ambiguous or the error text is hard to scan, reject. Then set a
four-column table of figures. If they don't align, reject.

---

### R3 — Testimony

**Where it lives:** Recovery Stories long-form only. Participant voice.

**Job:** make an intimate personal account genuinely readable at length, and feel different from the
institutional voice without becoming decorative.

**Per `design.md §9` this role is conditional:** a restrained serif may support long testimony **only
when it improves reading**. If R2 reads beautifully at 18px/1.6 for 600 words, skip R3 entirely and
save the payload. Do not buy a third family to prove the site has three families.

**Look for:**
- A text serif — designed for reading, not for display. Moderate contrast, sturdy serifs, generous
  x-height.
- A true italic (drawn, not slanted), because testimony uses it.
- Comfortable at 18–20px with 1.6 line-height across a 60–70ch measure.

**Reject:** display serifs, anything with strong period flavor (Victorian, Art Deco, Wild West),
slabs heavy enough to read as branding, and any serif that resembles Moxie Twist.

**Screening test:** set 400 real words of testimony and *actually read all of them*. If you skim,
reject. This is the only role where reading endurance beats character.

---

### R4 — Notation

**Where it lives:** metadata, chapter notation, table labels, `RC-NNN` identifiers, dates, figure
captions, finding dispositions.

**Recommendation: do not buy a family for this.** Derive it from R2 at small size with tracking and
weight — that is exactly what `design.md §9` means by hierarchy coming from "scale, measure, weight,
rules, and whitespace." A fourth family is the moment a design system starts collecting fonts instead
of using them.

**Absolutely not monospace.** `ui-system.md §3` forbids monospace on normal CWAAA surfaces, and
Courier is the Office's only family — borrowing it would collapse the authorship boundary that the
whole fiction depends on.

---

## 4. Two coherent directions

Pick one. Do not blend them.

### Direction A — "Public Serif" (recommended)

**R1** heavy contemporary serif · **R2** humanist sans · **R3** the R1 serif at text weights.

Two families, three voices. The serif does monumental propositions *and* testimony, which is
economical and gives the site one recognizable identity voice. Differentiates hardest from Got Soap?,
whose commanding voice is a sans. Reads as an institution with a real design department. It is also
continuous with the incumbent identity — PT Serif is already CWAAA's serif, so the seal and existing
artifacts stay coherent while the *material* world changes around them.

**Risk:** a serif at monumental scale can drift toward "university" or "newspaper masthead." Guard by
choosing low contrast and real weight rather than elegance.

### Direction B — "Civic Gothic"

**R1** heavy wide news gothic / grotesque · **R2** humanist sans · **R3** restrained text serif.

Three families. Reads as movement and protest rather than institution — closer to public-health
campaign and civic signage. More immediately contemporary.

**Risk:** R1 and R2 are both sans, so they must be *clearly* different in width and structure or the
system looks like one font in two weights. Also lands nearer Got Soap?'s sans territory, so the width
separation has to be deliberate.

---

## 5. Technical requirements (both directions)

- **WOFF2**, self-hosted from `site/public/fonts/` via `/fonts/…` URLs. No CDN, no `@fontsource/*`.
- **Webfont embedding rights required.** Verify per item — an Envato Elements download is not
  automatically licensed for webfont use, and desktop-only licensing is common. Record the license
  with the asset.
- Register every shipped file in `site/config/cwaaa-font-manifest.json` with `declaredFamily`,
  `declaredWeight`, `declaredStyle`, and a `role` string. Unregistered files fail the font audit.
- **Ship only the weights that have an assigned role.** The Got Soap? package holds 19 unassigned
  binaries precisely because this rule was applied late; presence in the directory is not permission
  to load.
- Subset to Latin. Declare `font-display` consistently with the campaign package.
- Keep `font-synthesis: none` — no faux bold or faux italic. If a weight is needed, it must be a real
  file.

## 6. Screening checklist

Before adopting anything, confirm all of it:

- [ ] Webfont license verified and recorded.
- [ ] WOFF2 available or convertible under the license.
- [ ] Tabular lining figures present (R1 and R2).
- [ ] Real italics where the role needs them (R2, R3).
- [ ] Weight range covers every assigned role without synthesis.
- [ ] `THE BAR IS SOAP.` at 120px does not read as fashion, wedding, or federal.
- [ ] Form CW-1 mock is unambiguous at real sizes.
- [ ] 400 words of testimony read without skimming (R3, if adopted).
- [ ] Set beside a Got Soap? surface, the two systems read as different authors.
- [ ] Not a banned template pairing, not monospace, not distressed, not a faux-government face.

## 7. What this brief does not decide

Exact families, weights, type scale, leading, tracking, measures, case discipline, and responsive
behavior all remain open in `ui-system.md §3`. Record the chosen families and their reasoning there
and in the decision log, then update `DESIGN-SYSTEM.md`'s Typography section from UNLOCKED to the
locked system.
