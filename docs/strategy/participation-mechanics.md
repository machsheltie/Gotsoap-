# Got Soap? participation mechanics

**Status:** target-state ownership and phasing authority
**Product split:** Got Soap? campaigns · CWAAA advocates and files · Office regulates

The campaign uses participation to turn spectators into witnesses, declarants, and sharers. A
mechanic belongs where its fictional author can honestly own the action.

## Ownership map

| Mechanic | Got Soap? | CWAAA | Office |
|---|---|---|---|
| Sniff Test | **canonical home** | may link to it | never |
| Lather Pledge / Form CW-1 | campaign edition | **program owner + nonprofit edition** | never |
| Poster downloads | **yes** | may cite campaign | never |
| Scratch-and-sniff gag | **yes** | no | no |
| Findings | compact campaign teaser only | **full record** | no |
| Recovery case files | link/teaser | **yes** | no |
| Washcloth ribbon | seam or pledge badge | **yes** | no |
| Repeat-access recognition | no | no | **yes, error states only** |

## 1. Sniff Test

**Purpose:** primary viral loop.
**Owner:** Got Soap?
**Format:** one-question-at-a-time quiz leading to a shareable named verdict.

Requirements:

- no numeric score;
- keyboard-complete and reduced-motion safe;
- static verdict URLs;
- no personal profile or answer history;
- share/copy actions use honest labels;
- CWAAA may sponsor or refer to the test, but the interface stays campaign-authored.

## 2. Lather Pledge

**Purpose:** conversion and continuing relationship.
**Owner:** CWAAA program distributed on both Got Soap? and CWAAA.
**Contract:** `../contracts/pledge.v1.json` and the identical CWAAA package copy.

Both forms:

- submit first name and email to one Buttondown audience;
- require affirmative consent;
- use the same `SWORN` success semantic;
- offer share and copy-link actions;
- never send field values to analytics.

The visual shells differ. Got Soap? treats the pledge as a seductive campaign declaration and ends
with a conditional **“Want to Learn More?”** seam to CWAAA. CWAAA presents Form CW-1 as its canonical
nonprofit declaration. The Office never receives or files the pledge.

## 3. Poster downloads

**Purpose:** distribution.
**Owner:** Got Soap?

Offer optimized social/download editions without modifying canonical poster typography. Provide
clear dimensions/formats and preserve required credits. Do not turn the download surface into a
shop unless ecommerce is separately approved.

## 4. Scratch-and-sniff gag

**Purpose:** one tactile joke inside the screen.
**Owner:** Got Soap?

The interaction gives a committed response and returns control. It must work by keyboard, provide a
non-pointer alternative, and avoid indefinite cursor-following animation.

## 5. Findings and case files

**Purpose:** deepen the movement fiction.
**Owner:** CWAAA.

Got Soap? may show one compact finding or case-file seam. Full findings, case generation, recovery
stories, chapter context, and program exits belong on the CWAAA site after extraction.

## 6. Office repeat-access experience

**Purpose:** make the fiction persist in memory.
**Owner:** Office of Lather Compliance.

This is not a campaign quiz or CWAAA personalization feature. It is the Office's entire
error-state-only public experience. Recognition is browser-local (`sessionStorage` and
`localStorage`) and follows the Office visit-state contract. No IP address, fingerprint, backend
record, or cross-device recognition.

## Phasing

| Phase | Mechanics |
|---|---|
| Campaign release | Sniff Test, campaign pledge, poster downloads, scratch gag, one CWAAA seam |
| CWAAA extraction | nonprofit pledge, full findings, case files, ribbon program, cross-site links |
| Office release | first-access, same-session refresh, later-return, continued-interest states |
| Later experiments | phone/IVR, physical evidence files, event activations—each requires its own brief |

## Measurement

Track mechanic start, completion, share, copy, download, successful pledge submission, and
cross-site navigation. Do not track pledge values, Sniff Test answers as profiles, or Office
browser-local state through third-party analytics.

## Acceptance

- Every mechanic has one clear fictional owner.
- Sniff Test remains Got Soap?.
- Both pledge forms pass contract parity and use one Buttondown audience.
- CWAAA content is preserved during extraction.
- The Office recognition mechanism exists only on the Office and every Office route remains an
  error state.
