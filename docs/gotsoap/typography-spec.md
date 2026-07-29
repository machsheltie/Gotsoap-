# Got Soap? typography specification

**Status:** active working authority; font cast, responsive scale, and weight allocation locked; leading, tracking, and detailed responsive behavior pending owner interview  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `ui-system.md`, `../design.md`, `../prd/PRD-gotsoap-web-v1.md`, `world-bible.md`, and `../HANDOFF.md`  
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file defines the exact responsive typography behavior for the curated Got Soap? type system. It is subordinate to the approved font roles in `ui-system.md` and exists so an implementation agent cannot flatten the selected typefaces into a generic web hierarchy.

Where this specification assigns an exact weight, it supersedes earlier provisional weight candidates in `ui-system.md`.

The canonical cast remains:

- **Oswald commands.**
- **Behind The Nineties persuades.**
- **Moxie Twist seduces.**
- **Marlin Sans SQ operates.**
- **Moanslight records and releases the campaign.**

---

# 1. Scale philosophy

Got Soap? uses extreme hierarchy, not indiscriminate gigantism.

Rare hero and route-opening typography may become architectural. Internal sections must fall away sharply enough to restore pacing, intimacy, and utility. The system must never collapse into the ordinary marketing ladder of `64px / 48px / 32px / 16px` repeated across every route.

Binding principles:

- One rare hero command may own the viewport.
- Selected route-opening commands may approach poster scale.
- Internal headings must not impersonate route openings.
- Moxie Twist must never compete with Oswald at equal scale in the same viewport.
- Body and utility copy remain genuinely readable.
- Mobile preserves drama through recomposition and selective cropping, not through timid display scaling.
- Essential text is never reduced to imitate fashion-magazine fine print.
- The rare hero-command maximum is **220px on desktop and 116px on mobile**.
- No approved token may exceed that cap without a new owner decision.

---

# 2. Canonical responsive type tokens

| Token | Family | Desktop range | Mobile range | Purpose |
|---|---|---:|---:|---|
| `type-command-hero` | Oswald | `128–220px` | `72–116px` | Homepage and rare viewport-owning campaign commands |
| `type-command-route` | Oswald | `80–150px` | `54–88px` | Major route openings |
| `type-command-section` | Oswald | `48–82px` | `38–58px` | Major internal campaign statements |
| `type-identity` | Oswald | `60–116px` | `44–76px` | Verdict names and selected Shop product names |
| `type-whisper` | Moxie Twist | `38–72px` | `30–52px` | Rare invitation, confession, or seductive interruption |
| `type-editorial-major` | Behind The Nineties | `30–46px` | `24–34px` | Large persuasion and supporting propositions |
| `type-confession` | Behind The Nineties | `22–30px` | `20–26px` | Narrow intimate passages |
| `type-body-large` | Behind The Nineties | `21–25px` | `19–22px` | Direct-address lead copy |
| `type-body` | Behind The Nineties | `17–20px` | `16–18px` | Standard campaign prose |
| `type-control` | Marlin Sans SQ | `14–17px` | `15–17px` | Navigation, buttons, and primary controls |
| `type-utility` | Marlin Sans SQ | `13–16px` | `14–16px` | Forms, feedback, consent, and instructions |
| `type-production` | Moanslight | `12–13px` | `12–13px` | Authored production notation |
| `type-micro` | Marlin Sans SQ | `11–13px` | `11–13px` | Essential metadata, legal text, and accessible microcopy |
| `type-production-atmosphere` | Moanslight | `10–11px` | omitted by default | Nonessential production atmosphere after proof only |

---

# 3. Token usage laws

## 3.1 `type-command-hero`

Use only for rare hero moments where the command is the primary visual event.

Approved contexts may include:

- homepage opening;
- a singular flagship campaign moment;
- an owner-approved premiere or culmination.

Rules:

- Maximum `220px` desktop.
- Maximum `116px` mobile.
- Do not use more than once on a route.
- Do not use as a generic page title.
- May crop or cross photography only under the display-crop rules still pending in this specification.

## 3.2 `type-command-route`

Use for primary route openings such as:

- PSA broadcast index;
- PSA detail opening;
- Broadcast opening;
- Shop opening;
- Sniff Test opening;
- selected About opening.

Rules:

- One primary route-opening command per route.
- Must visibly step down from the rare hero maximum.
- Functional content beneath it must recover readable scale quickly.

## 3.3 `type-command-section`

Use for major internal campaign statements.

Rules:

- Must not crop by default.
- Must not repeat at every section.
- Must not turn a page into a sequence of equally loud headlines.
- Internal hierarchy must remain clearly subordinate to route openings.

## 3.4 `type-identity`

Use where the visitor receives or encounters a named campaign identity:

- Sniff Test verdict names;
- selected Shop product names;
- approved campaign object names.

It is not the default size for every product heading or label.

## 3.5 `type-whisper`

Use only for the single permitted Moxie Twist interruption on a route.

Rules:

- Must remain subordinate to an Oswald hero if both appear in the same viewport.
- Usually two to twelve words.
- Ordinarily no more than two lines.
- Must not be reduced below `30px` on mobile.
- May not become a decorative intermediate heading token.

## 3.6 Editorial scale tokens

Behind The Nineties uses four distinct reading temperatures:

- `type-editorial-major` for large persuasive propositions;
- `type-confession` for narrow intimate passages;
- `type-body-large` for direct-address lead copy;
- `type-body` for standard campaign prose.

Rules:

- `type-editorial-major` is not a universal section heading.
- `type-confession` may appear once per route at most.
- `type-body-large` should lead or interrupt; it should not become the entire page body.
- `type-body` remains at least `16px` on mobile.

## 3.7 Functional scale tokens

Marlin Sans SQ carries:

- `type-control`;
- `type-utility`;
- `type-micro`.

Rules:

- Navigation and controls must never shrink below `15px` on mobile.
- Essential utility copy must not shrink below `14px` on mobile.
- Essential legal and microcopy must remain readable at `11–13px` and may increase when density, contrast, or device conditions require it.
- Functional states do not borrow display-scale typography for drama.

## 3.8 Production scale tokens

Moanslight carries:

- `type-production`;
- `type-production-atmosphere`.

Rules:

- `12–13px` is the preferred production size.
- `11px` is the practical lower bound for approved notation.
- `10px` is permitted only for nonessential atmosphere after actual proof.
- `type-production-atmosphere` is omitted by default on mobile.
- Essential production information moves to `type-production` or Marlin Sans SQ rather than remaining tiny.

---

# 4. Responsive scaling law

Implementation should use controlled `clamp()` expressions rather than abrupt breakpoint jumps, but the approved minimums and maximums above are binding.

Claude may not:

- replace the scale with a framework default;
- normalize the display range because it appears unusually large;
- exceed the maximums for visual excitement;
- reduce mobile commands into conventional `40–48px` headings when the approved token calls for more drama;
- shrink body or utility text to preserve a desktop composition;
- apply the same fluid formula to every token;
- infer interpolation rates without regard to each token’s role.

Each token requires its own interpolation behavior. Display tokens may scale more aggressively than body, utility, and production tokens.

---

# 5. Canonical weight allocation

Weight contrast must express changes in voice, function, and hierarchy. It must not become a blanket luxury-light treatment or a blanket masculine-heavy treatment.

Binding laws:

- Display authority comes primarily from scale, crop, composition, and placement.
- The heaviest available style is never the default simply because Got Soap? is forceful.
- Thin and Light styles are not used to manufacture luxury.
- Synthetic bold and synthetic italic are prohibited.
- CSS strokes, shadows, and filters may not be used to fake missing weights.
- An implementation must load only the approved weights and styles.

## 5.1 Weight map

| Token or use | Family | Locked weight/style |
|---|---|---|
| `type-command-hero` | Oswald | `600` |
| `type-command-route` | Oswald | `600` |
| `type-command-section` | Oswald | `500` |
| `type-identity` | Oswald | `600` |
| rare flagship emphasis | Oswald | `700`, one word or one short line only |
| `type-whisper` | Moxie Twist | native supplied style only |
| `type-editorial-major` | Behind The Nineties | Semibold |
| `type-confession` | Behind The Nineties | Regular or true Italic according to voice |
| `type-body-large` | Behind The Nineties | Medium |
| `type-body` | Behind The Nineties | Medium |
| editorial pull quotation | Behind The Nineties | Regular Italic |
| rare Behind The Nineties display event | Behind The Nineties | Black, owner-approved only |
| `type-control` | Marlin Sans SQ | Medium |
| `type-utility` | Marlin Sans SQ | Book |
| `type-micro` at `12–13px` in strong conditions | Marlin Sans SQ | Book |
| `type-micro` at `11px` or in difficult conditions | Marlin Sans SQ | Medium |
| selected active functional emphasis | Marlin Sans SQ | Bold |
| `type-production` | Moanslight | Medium |
| production label or folio | Moanslight | Semibold |
| `type-production-atmosphere` | Moanslight | Medium |

## 5.2 Oswald weight law

### Core command weight: `600`

Use `600` for hero commands, route openings, verdict identities, and selected product identities.

This provides density against photography without pushing the campaign into sports branding, supplement packaging, action-film typography, or generic heavy-handed masculinity.

### Internal command weight: `500`

Use `500` for major internal statements. The scale already supplies authority. The lighter internal weight creates a genuine step down from route-opening commands.

### Rare override: `700`

Use `700` only for:

- one flagship word;
- one very short Unholy command;
- one campaign culmination;
- one owner-approved verdict or product moment.

Do not use `700` for an entire route system, paragraph, repeated module, or default heading level.

> Oswald gains authority primarily through scale, crop, and placement—not by selecting the heaviest available weight.

## 5.3 Behind The Nineties weight law

### Standard body and direct address: Medium

Medium is locked for both `type-body` and `type-body-large`.

The owner tested Regular and Medium at `17px` and `18px`. Regular lost important letterform detail at those practical browser sizes. Medium retained the family’s character and readability without becoming blunt.

Regular is therefore prohibited for standard body copy.

### Editorial-major: Semibold

Semibold supports Oswald without competing with it. Bold and Black are too assertive for ordinary persuasive propositions and risk turning the family into retro display advertising.

### Confession: Regular or true Italic

Use Regular for a direct private admission. Use true Italic where the voice becomes more internal, sensual, or quoted.

The lighter texture is meaningful only because it marks a genuine shift in voice.

### Pull quotations: Regular Italic

Pull quotations use Regular Italic rather than enlarged body Medium. This creates an editorial tonal distinction rather than a generic size increase.

### Black: rare display exception

Behind The Nineties Black may appear only in a rare, large-scale, owner-approved moment where the family itself owns the composition.

It is prohibited for:

- standard headings;
- product descriptions;
- button labels;
- ordinary emphasis;
- every Shop product title.

> Behind The Nineties changes weight when the voice changes—not merely when the hierarchy changes.

## 5.4 Moxie Twist weight law

Use only the native supplied style.

Prohibited:

- synthetic bold;
- synthetic italic;
- CSS stroke;
- text shadow used to fake weight;
- variable-font simulation;
- repeated reduction into body-copy scale.

The native face is the face.

## 5.5 Marlin Sans SQ weight law

### Medium

Use Medium for:

- navigation;
- buttons;
- form labels;
- quiz answers;
- share controls;
- copy and download controls;
- ordinary primary interface language.

### Book

Use Book for:

- consent;
- form explanations;
- validation detail;
- longer status copy;
- functional instructions;
- legal and accessibility text where size and contrast support it.

### Microcopy context rule

Use Book when:

- the size is `12–13px`;
- contrast is strong;
- the text is not over photography;
- line length is controlled.

Use Medium when:

- the size is `11px`;
- the background is less forgiving;
- the metadata is critical;
- the string contains dense punctuation or numerals.

### Bold

Use Bold only for:

- selected active states;
- confirmed prices;
- short error headings;
- primary functional emphasis;
- a current navigation state when position, underline, or another quieter treatment is insufficient.

Do not make all buttons Bold.

## 5.6 Moanslight weight law

### Medium

Medium is the standard production weight at `12–13px` and the required weight for any approved `10–11px` nonessential production atmosphere.

### Semibold

Use Semibold for concise labels and folios such as:

```text
CAMPAIGN SPOT 03
BROADCAST 01
SUPPLY NO. GS-04
```

### Prohibited weights

Thin, Extra Light, and Light are prohibited in the production system. Regular is not approved for standard production notation. Bold is not a default production heading.

> Moanslight may look refined, but it must never require the visitor to lean toward the screen.

---

# 6. Pending typography decisions

The following remain **UNLOCKED** and may not be inferred by Claude:

- line-height for every token;
- letter-spacing for every token;
- final `clamp()` formulas;
- viewport interpolation ranges;
- text-measure tokens beyond the existing prose guidance;
- display crop percentages and safe zones;
- optical corrections by material register;
- exact breakpoint-specific recomposition;
- OpenType feature settings;
- fallback stacks;
- font-display behavior;
- browser-proof and acceptance thresholds.

---

# 7. Decision log

## 2026-07-29 — responsive scale lock

Approved:

- the complete token list in Section 2;
- extreme hierarchy rather than indiscriminate gigantism;
- a **220px desktop / 116px mobile** maximum for rare hero commands;
- lower route-opening and internal-command tiers;
- a distinct Moxie Twist interruption scale;
- separate Behind The Nineties editorial, confession, lead, and body tiers;
- Marlin Sans SQ control, utility, and essential-microcopy tiers;
- Moanslight production and nonessential-atmosphere tiers;
- `16px` minimum standard body size on mobile;
- `15px` minimum navigation/control size on mobile;
- no 10px Moanslight atmosphere on mobile by default;
- responsive drama through recomposition rather than indiscriminate shrinking.

## 2026-07-29 — weight allocation lock

Approved:

- Oswald `600` for hero, route, and identity commands;
- Oswald `500` for internal campaign statements;
- Oswald `700` as a rare one-word or short-line override only;
- Behind The Nineties Medium for standard body and direct-address lead copy;
- Behind The Nineties Semibold for editorial-major propositions;
- Behind The Nineties Regular or true Italic for confession voice;
- Behind The Nineties Regular Italic for pull quotations;
- Behind The Nineties Black only as a rare owner-approved display event;
- Moxie Twist native style only;
- Marlin Sans SQ Medium for controls, Book for utility, and Bold only for selected functional emphasis;
- Marlin Sans SQ Medium at the smallest or most difficult microcopy conditions;
- Moanslight Medium for standard production notation and production atmosphere;
- Moanslight Semibold for labels and folios;
- prohibition of Thin and Light production weights;
- owner browser proof showing that Behind The Nineties Regular loses detail at `17–18px`, establishing Medium as the body standard.
