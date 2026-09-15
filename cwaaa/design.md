# CWAAA target design system

**This file is prose authority; it carries no token values by design.** Colors, the type scale,
measures, spacing, the breakpoint ladder, and the component set live in the tokenized companion,
[`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md), which also records the home page as the reference
implementation and keeps the drift register. This file wins on conflict (`AGENTS.md` authority
order). Do not move token values here to satisfy a tooling report that this file has no Colors or
Components section — the split is deliberate.

## 1. Creative thesis

**CWAAA: A Coalition Making Its Case in Public.**

CWAAA is a functioning national advocacy coalition with exceptional art direction. Its public site
validates a reasonable expectation, organizes people around practical action, and presents its case
with confidence. It is a public advocacy platform, not a document pretending to be a website, a
filing-cabinet simulation, a government portal, a museum exhibit, or a generic nonprofit theme.

The locked proposition is:

> **THE BAR IS SOAP.**

> Routine washing is a reasonable collective expectation.

The governing public progression is:

```text
Home → Findings → Recovery Stories → Tie One On → Pledge → Chapters / About → Office referral
```

CWAAA earns trust before introducing any unease. Its comedy comes from treating an absurdly low bar
with competent civic seriousness. Participant records are presented as advocacy files, never enforcement files;
their fictional subjects can still be foolish, selfish, disgusted, funny, or changed as canon requires.

## 2. Institutional and expressive layers

The institutional layer creates trust through ordinary navigation, mission clarity, explicit program
ownership, accessible forms, participant stories, chapter information, findings, contact paths, and
restrained institutional language.

The expressive layer prevents generic design through monumental public statements, exhibition-scale
findings, intimate testimony, documentary photographs of people, tactile program artifacts, authored
composition, route-specific spatial laws, narrative material transitions, and sparse cumulative
wrongness.

Physical operation is evidenced through coherent correspondence, event materials, ribbon packets,
signed declarations, testimony, reports, meeting notices, envelopes, and complete program artifacts.
The two layers share one continuous public composition rather than alternating between a website and
a simulated archive.

## 3. Visitor progression

1. **Home:** credible, sharp, funny, and operational, with no horror or performed mystery.
2. **Findings:** CWAAA has studied the problem far more seriously than expected; one sparse neutral
   citation may appear.
3. **Recovery Stories:** continuity is deeper than expected; each person has a specific before-state,
   consequence, and desirable change, told through his own character rather than an institutional verdict.
4. **Tie One On For Suds:** warmth, solidarity, and tactile relief.
5. **Pledge:** a safe, formal, meaningful civic commitment with no Office presence.
6. **Chapters and About:** legitimacy, scale, contemporary origin, and then a chronology crack.
7. **Office referral:** an administratively ordinary external reference creates a quiet rupture; its
   destination supplies the meaning.

Most routes need no fracture, and no route may use more than one meaningful fracture.

## 4. Navigation and routes

Primary navigation is **Findings**, **Recovery Stories**, **Tie One On**, **Chapters**, **About**, and
**Take the Pledge**. The seal and full organization name return Home. Desktop navigation remains
visible; mobile uses an ordinary accessible menu. The pledge action may receive restrained
red/rule/weight emphasis, never a pill, gradient, or floating SaaS treatment.

The canonical public routes are `/`, `/findings`, `/recovery-stories`,
`/recovery-stories/[id]`, `/tie-one-on`, `/pledge`, `/chapters`, `/about`, and `/404`.
Public labels always say **Recovery Stories**. Only an opened individual story may introduce
**Recovery Record** and an `RC-NNN` identifier.

Do not use INDEX, file tabs, registry numbers in route labels, or bureaucratic usability theater.
Global navigation remains available even while the composition gently supports the governing
progression.

## 5. Homepage

The proposition **THE BAR IS SOAP.** owns roughly two-thirds of the opening field. The supporting
mission explains that Concerned Women Against Axe Abuse is a national coalition making soap-and-water
hygiene the expected baseline and giving people a practical way to act. The two opening actions are
**Take the Pledge** and **Read the Findings**.

The documentary-editorial hero is a **photograph of the coalition itself**: three members standing in
a plain meeting room, facing the camera, one holding a bar of soap. It is posed, frontal, and
unsmiling-adjacent — the group portrait an organization takes of itself because it believes it is an
organization. That conviction is the hero's entire argument, and it only exists because the women are
looking straight out of the frame.

**Shipped and owner-ratified 2026-09-15** (`src/assets/hero-coalition-{wide,tall}.png`). This
supersedes the earlier hands-tying-a-ribbon-on-a-gym-bag spec, which was rejected by the owner: a
duffle bag with a wash rag on it is not a coalition, and it read as the site being embarrassed to
show its own people. **Do not reopen this.** The prohibition on "posed faces" that governed the
earlier spec is struck — see §7.

The image interrupts the typography rather than forming a 50/50 split. `SOAP` may pass partly behind
the image only if it remains immediately legible. One cloth tail may leave the photograph as a
controlled material interruption; the ribbon never animates around the page.

Homepage sequence:

1. the opening proposition;
2. one continuous **DOCUMENT. ADVOCATE. ORGANIZE.** composition, never three cards;
3. one exhibition-scale finding;
4. one intimate recovery voice;
5. one tactile Tie One On For Suds moment;
6. coalition scale through “Two million concerned women. Chapters in all fifty states. One demand.”
   and a few human chapter traces;
7. one clear pledge action;
8. a controlled Got Soap? relationship seam rendered as an artifact from another author.

Do not repeat pledge calls to action after every section.

## 6. Route choreography

Every route defines what owns the viewport, what interrupts it, its material transition, the default
layout it refuses, the intended emotional change, and the fictional author.

### Findings

Findings are monumental, public, collective, vertical, declarative, high-contrast, and exposed. An
oversized figure, hard rule, short conclusion, supporting note, and disposition own the viewport.
One chapter annotation, methodology note, clipped citation, correction, or human observation may
interrupt the finding. Findings refuse dashboards, equal cards, widgets, and annual-report blocks.

At most one sparse **NEUTRAL CITATION** may reference the Office of Lather Compliance and
Establishment Directive 1961-A. It never glows, repeats, or explains itself.

### Recovery Stories

Recovery Stories are intimate, individual, quiet, reflective, and reading-oriented. A
restrained portrait or environment, personal object, testimony fragment, recovery identifier, and
next action create one participant-owned field.

They are **PARTICIPANT ADVOCACY FILES**, **NOT POLICE EVIDENCE**. They are never intelligence
archives, criminal dossiers, mugshots, classified folders, suspect profiles, evidence boards, or
red-string walls. Findings prove the issue; Recovery Stories show change.

A severe record may carry one **embedded external finding**: the Office's own document quoted inside
the file. It is rendered as a foreign object, not as a CWAAA component — stark white, Courier, black
institutional type, its own reference numbering — visually incompatible with the warm civic system
around it, and small. No Office logo, no link, no caption, no lead-in, and no explanation. The
scrolling reader should think *wait, what is this* and get no answer. CWAAA's record resumes on the
next line as if nothing happened. This is the only Office language permitted on an ordinary CWAAA
route, and it is permitted because CWAAA is not the one speaking.

Records past the archive boundary receive **no secret-area treatment**: no glitch, warning, stamp,
vignette, hacker aesthetic, or change of pace. They render in CWAAA's ordinary record template until
the template itself stops being what renders them. The boundary is a bureaucratic failure to stop
paginating, not an effect. It also sits outside this route's one-fracture budget, because the
records past it are not CWAAA-authored surfaces.

### Tie One On For Suds

Actual red cloth owns the route at human or macro scale: fibers, hem, stitch, fold, wear, tension,
and knot. Program information appears only on plausible sewn labels, hang tags, instruction slips,
packaging bands, or chapter distribution cards. The material transition is index/tab logic → cloth
strip → tied symbol. Use real contexts such as a gym bag, doorknob, mirror, chapter table, or vehicle
handle; never a cursor-following ribbon or simulated craft table.

### Pledge

Form CW-1 is a singular ceremonial civic act. The declaration owns the viewport on one accessible
signing surface with persistent labels, adjacent errors, explicit two-message consent, and artifacts
that have a real document relationship. Success provides one `SWORN` settle, share, copy-link, exact
fulfillment explanation, and ordinary CWAAA continuation. No Office reference, transmission
language, review threat, or surveillance joke appears.

### Chapters

Chapters form a composed field of human dispatches, correspondence, event images, ribbon packets,
envelopes, meeting notices, regional environments, and chapter tables. The route refuses card grids
and animated maps. Human continuity and modest local activity own the experience.

### About

About presents the 2024 book-club origin through a contemporary table, grievance notes, first program
materials, 2024 correspondence, evolving identity materials, and chapter packets. Never fabricate
sepia history. At the deepest seam, one neutral external reference may cite the Office of Lather
Compliance and Establishment Directive 1961-A without ominous framing or explanation.

The restrained creator credit leads through the creator/About seam to real-world authorship and
fiction disclosure. It is not duplicated in CWAAA's public footer voice.

## 7. Photography and artifacts

The target hierarchy is approximately:

- **50% DOCUMENTARY PHOTOGRAPHS OF PEOPLE** — people are *shown*, not implied by traces;
- **30% COHERENT PHYSICAL ARTIFACTS**;
- **20% LIVE CIVIC GRAPHICS** and typography.

**People are shown. Faces, bodies, the actual members and the actual men** — posed or candid, both
are available. Every person in this fiction is synthetic: there is no real likeness, no consent
question, and no subject who can be hurt or embarrassed by appearing here. Arguments from likeness,
dignity, or possible offense have no purchase on this project and must not be used to soften an
image, and this is satire whose job includes being uncomfortable.

**Struck 2026-09-15 by owner direction:** the former rule "show people doing the work, never posed
volunteers offered as proof of legitimacy." It produced a site that hid its own cast. The posed
coalition portrait is now the home hero (§6), and the posed group is a feature, not a departure.

**No still life.** Objects never carry an image alone and never stand in a person's slot. Macro
material detail is a supporting crop inside a scene with a body in it, never the image a section is
built on. An object delivered where a person belongs is a rejected asset.

What remains rejected is the **generic and the enforcement aesthetic**, not the human: stock-photography
testimonial carousels, clipboard enthusiasm, matching-shirt volunteer filler, mugshot grids,
surveillance framing, punishment imagery, and before/after spectacle. These treatments make a recovery
participant look like a suspect or a visual exhibit. They do not bar a story from showing embarrassing
conduct or a witness's candid disgust when those facts make the change meaningful.

Every artifact has one fictional owner, a real function, complete copy, plausible size and
construction, consistent typography, a date or version when appropriate, and a reason to exist
beyond the crop. Critical findings remain live HTML/CSS rather than baked into imagery.

Use restrained natural color: ivory, white, ink navy, restrained black, warm skin, ordinary room
tones, chrome, controlled stamp red, and physical red cloth. The ribbon exists materially, never as a
graphic overlay.

## 8. Material system

Use clean ivory and white digital fields, ink navy, controlled stamp red, real woven red cloth,
restrained black, natural documentary color, monumental live typography, crisp civic rules, and
genuine paper only when an actual form, report, letter, packet, or citation is present.

**Paper is content, not the universe.**

Clips, tape, folds, pins, stamps, registration marks, and paper texture appear only when a real object
requires them. There is no office-supply confetti and no all-manila visual world.

## 9. Typography and identity

Typography is contemporary civic editorial: forceful display scale for propositions and Findings;
plain, highly readable sans serif for navigation, explanation, and form controls; a restrained serif
may support long testimony when it improves reading. Hierarchy comes from scale, measure, weight,
rules, and whitespace rather than simulated paperwork.

Use the CWAAA seal accurately and consistently as the coalition identity, not as a fake-government
badge. The red washcloth ribbon is the program symbol and must not become a universal decoration.

## 10. Motion and interaction

Motion is restrained and material: a `SWORN` mark settles, a cloth fold reveals a program instruction,
a copied link confirms, or navigation responds clearly. Motion never simulates surveillance,
jurisdiction, system failure, or an institution watching the visitor.

No steam, smoke, cinematic parallax, cursor tracking, flicker, ominous audio, countdown, or animated
ribbon belongs to CWAAA. Reduced motion removes nonessential transitions without removing state or
success feedback.

## 11. Wrongness discipline

CWAAA earns trust first and never performs horror. Wrongness may come only from sparse chronology, a
neutral citation, a repeated code, unusually complete continuity, an institution treated as routine,
or an artifact returning with new meaning.

Wrongness never comes from glitches, flicker, warnings, surveillance animation, countdowns, ominous
audio, cursor tracking, hostile validation, threats, or Office language on ordinary pages. The Office
owns the full uncanny encounter.

## 12. Accessibility and responsive behavior

- Meet WCAG 2.2 AA.
- Preserve semantic headings, documents, tables, forms, and navigation.
- Keep persistent labels, adjacent errors, visible focus, generous targets, and plain consent language.
- Recompose tables into labeled records on narrow screens instead of forcing horizontal dashboards.
- Keep critical type and findings live, legible, and zoom-safe.
- Provide text equivalents for seals, ribbons, stamps, and meaningful imagery.
- Never convey information by red alone.
- Preserve the authored hierarchy on small screens without turning every section into a stacked card.
- Honor reduced motion while retaining state, completion, and navigation feedback.

## 13. Anti-default constitution

CWAAA fails if its dominant grammar includes a centered nonprofit hero, headline/paragraph/two-CTA
template, three-card program row, mission/vision/values triptych, bento grid, impact dashboard,
animated map, testimonial carousel, rounded white cards, generic donation CTA, pastel wellness
palette, faux-government masthead, beige paper behind every section, decorative stamps or form
numbers, repeated document components, one layout repeated across routes, stock volunteer
photography, dossier styling, SaaS navigation, or generic nonprofit-theme grammar.

## 14. Acceptance test

CWAAA passes when it looks like a real national coalition with exceptional art direction; the
homepage is public advocacy rather than a document; navigation is clear; Findings are monumental;
Recovery Stories are intimate; Tie One On is tactile; Pledge is safe; Chapters feel human; About
establishes 2024; the Office reference is sparse and deep; paper appears only as an actual artifact;
public pages do not announce satire; and unease grows through continuity rather than horror.

Ask: Does this page look like the natural public expression of CWAAA? If it instead places CWAAA's
content into the nearest familiar nonprofit, archive, or civic-portal template, it is not finished.
