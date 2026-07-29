# Got Soap? typography specification

**Status:** active working authority; font cast and responsive scale locked, weight/leading/tracking details pending owner interview  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `ui-system.md`, `../design.md`, `../prd/PRD-gotsoap-web-v1.md`, `world-bible.md`, and `../HANDOFF.md`  
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file defines the exact responsive typography behavior for the curated Got Soap? type system. It is subordinate to the approved font roles in `ui-system.md` and exists so an implementation agent cannot flatten the selected typefaces into a generic web hierarchy.

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

Behind The Nineties uses three distinct reading temperatures:

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

# 5. Pending typography decisions

The following remain **UNLOCKED** and may not be inferred by Claude:

- exact weight allocation for every token;
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

# 6. Decision log

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
