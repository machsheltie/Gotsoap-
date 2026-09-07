# Got Soap? Transmedia Canon and Authority Revision

**Status:** Owner-approved design
**Date:** 2026-07-23
**Scope:** Documentation authority, shared canon, organization psychology, transmedia continuity, Office return-state behavior, and correction of omissions in the Got Soap? and CWAAA PRDs
**Implementation scope:** Documentation and machine-readable contracts only. This design does not authorize website implementation, email delivery, telephone deployment, or new campaign copy.

## 1. Purpose

The current authority split correctly identifies three systems:

1. **Got Soap? campaigns.**
2. **Concerned Women Against Axe Abuse advocates and files.**
3. **The Office of Lather Compliance regulates.**

The next revision must protect more than three websites. It must protect the shared fictional world across websites, telephone audio, email, print, film, event displays, and swag without flattening the three systems into one aesthetic or explaining the mystery that connects them.

The completed authority system must give future coding and writing agents no reasonable basis to:

- average the three authors into one design system;
- turn CWAAA into a government agency;
- turn the Office into a conventional horror website;
- reduce Got Soap? to a poster gallery or portfolio template;
- remove intentional contradictions from the IVR;
- invent answers to the Office/CWAAA relationship;
- omit canonical campaign routes because a feature is phased;
- promote inherited copy to canon without an owner decision; or
- use safe, generic copy inside otherwise accurate layouts.

## 2. Governing thesis

The world has three fictional authors with different powers and emotional methods:

| System | Public action | Emotional method | Power boundary |
| --- | --- | --- | --- |
| Got Soap? | Campaigns and recruits | Seduction, recognition, aspiration, comic confrontation | It does not file findings or regulate |
| CWAAA | Advocates, validates, organizes, and files | Earnest competence, collective certainty, procedural care | It does not openly threaten, contain, surveil, or regulate |
| Office of Lather Compliance | Regulates | Patient certainty, unexplained recognition, administrative finality | It does not campaign, recruit, explain, or provide normal public content |

The audience should understand each system immediately and assemble their relationship only through repeated details. The world never supplies a complete explanation.

## 3. Documentation architecture

Use a layered canon system.

### 3.1 Shared authority

Create:

```text
docs/world/
├── README.md
├── WORLD-BIBLE.md
└── artifact-continuity.md
```

`docs/world/WORLD-BIBLE.md` is the highest authority for facts that cross two or more systems. It owns:

- the shared timeline;
- objective institutional relationships;
- public-facing ambiguity;
- knowledge boundaries;
- terminology shared across media;
- mystery discipline;
- emotional laws; and
- intentional contradictions.

`docs/world/artifact-continuity.md` owns:

- artifact authorship;
- first and later meanings;
- recurrence limits;
- cross-media recontextualization;
- placement rules; and
- explanations that are forbidden.

`docs/world/README.md` is a short authority index and extraction guide. It must not become a second world bible.

### 3.2 Per-system authority

Create or expand:

```text
gotsoap/docs/world-bible.md
cwaaa/docs/world-bible.md
office-of-lather-compliance/docs/world-bible.md
```

Each per-system bible owns only that institution's psychology, behavior, language, knowledge, and experience rules.

Existing authorities remain in their current portable locations:

- Got Soap?: `gotsoap/docs/design.md` and `gotsoap/docs/prd/PRD-gotsoap-web-v1.md`
- CWAAA: `cwaaa/docs/design.md` and `cwaaa/docs/PRD-cwaaa-web-v1.md`
- Office: `office-of-lather-compliance/docs/design.md` and `office-of-lather-compliance/docs/PRD-office-v1.md`

CWAAA-specific material must remain under `cwaaa/docs/` so that folder can later be transferred into its own site repository. Office-specific material must remain under `office-of-lather-compliance/docs/`. Cross-system material belongs under `docs/world/`; it must not be duplicated into both portable packages.

### 3.3 Authority order

The handoff must establish this order:

1. Owner decisions recorded in `docs/HANDOFF.md`
2. `docs/world/WORLD-BIBLE.md` for cross-system canon
3. The relevant per-system world bible
4. The relevant current design authority and PRD
5. Shared and per-system machine-readable contracts
6. Artifact briefs and copy decks
7. Historical documents, which are context rather than law

A lower authority may add execution detail but may not contradict a higher authority.

## 4. Canon-status vocabulary

Every consequential claim in the master bible must use one of four statuses:

- **Objective canon:** True within the fictional world.
- **Public claim:** Asserted by a fictional author but not independently confirmed.
- **Intentionally unresolved:** A question the project protects from resolution.
- **Historical/inherited copy:** Material preserved for provenance but not binding until approved.

This status system is required because future agents must distinguish deliberate uncertainty from missing documentation.

## 5. Shared reality

### 5.1 Objective canon

- Got Soap?, CWAAA, and the Office are distinct fictional entities.
- The Office is a government agency whose jurisdiction is deliberately unspecified.
- The Office has existed since 1961.
- CWAAA was established in 2024.
- CWAAA began with a book club.
- CWAAA has two million concerned women.
- CWAAA has chapters in all fifty states.
- CWAAA and the Office have a real institutional relationship.
- CWAAA links to the Office but does not publicly define the relationship.
- The Office pen is a real artifact within the world and carries the unsettling 1961 continuity.

### 5.2 Intentionally unresolved

The project never explains:

- what happened in 1961;
- why the Office existed long before CWAAA;
- why the public has not heard of the Office;
- how CWAAA first encountered the Office;
- how their current relationship began;
- whether the Office acts through CWAAA;
- whether CWAAA provides a friendly public face for the Office;
- whether a caller is transferred from CWAAA to the Office;
- how much CWAAA leadership knows;
- what legal jurisdiction the Office claims; or
- what lies behind the unavailable Office resource.

Private documentation may identify CWAAA and the Office as legally separate. Audience-facing artifacts must never prove that the separation is operationally meaningful.

### 5.3 Emotional laws

- Got Soap? **seduces**.
- CWAAA **validates and organizes**.
- The Office **assumes jurisdiction**.
- Got Soap? changes behavior through erotic aspiration, not shame.
- CWAAA never deliberately manufactures fear.
- CWAAA's excessive certainty may accidentally expose the larger system behind it.
- The Office never performs horror. It behaves as though its actions are ordinary and complete.
- No system explains the whole world.
- Repeated details reward attention without becoming a puzzle game.

## 6. Audience and institutional knowledge

The master bible must include a knowledge matrix distinguishing:

- what a first-time visitor can understand;
- what an attentive repeat visitor can infer;
- what Got Soap? publicly acknowledges;
- what CWAAA publicly acknowledges;
- what the Office appears to know;
- what production documentation knows; and
- what no document is allowed to answer.

The Office/CWAAA ambiguity is not a continuity error. It is a controlled audience experience.

Audience-facing CWAAA references to the Office must be:

- sparse;
- neutral;
- procedurally ordinary;
- unexplained; and
- linked only when a link serves the artifact.

Prohibited relationship labels include:

- partner;
- parent agency;
- overseen by;
- operated by;
- a division of;
- in coordination with; and
- on behalf of.

## 7. Got Soap? behavioral bible

Create a behavioral authority that prevents generic "bold campaign" copy from replacing the campaign's actual psychology.

It must define:

### 7.1 Beliefs

- Cleanliness is the price of admission to the attractive, confident man the audience already imagines.
- Effort is sexually aspirational.
- Soap is materially simple but symbolically decisive.
- The campaign's target is low effort, not masculinity.
- The man is a potential convert rather than an enemy.
- The woman is a witness, recruiter, and likely distributor rather than a grievance collector.

### 7.2 Humor

Got Soap? finds humor in:

- fragrance-ad seriousness applied to soap;
- grand language applied to a low behavioral baseline;
- recognition between women;
- male self-awareness;
- sacred or seductive cadence colliding with practical hygiene; and
- the disproportion between visual luxury and the request to shower.

It never treats humiliation, harassment, bodies, race, sexuality, disability, poverty, or genuine illness as the joke.

### 7.3 Voice boundaries

The bible must govern:

- campaign headlines;
- "Because..." subheads;
- calls to action;
- quiz questions and verdicts;
- form instructions;
- confirmations;
- downloads;
- empty and error states;
- share copy;
- Shop utility messages; and
- film titles and framing.

It must identify language that breaks the illusion, including generic empowerment copy, public-health lectures, scolding, startup jargon, nonprofit procedure, and premature portfolio explanation.

### 7.4 Route corrections

The Got Soap? PRD and design authority must restore or add:

- **Shop** as a canonical campaign route;
- the existing faux-store behavior;
- deliberately unavailable checkout rather than removal of the route;
- **`/broadcast`** as the canonical campaign-film route;
- a full-bleed homepage premiere seam for the campaign film;
- the telephone number as a Got Soap? campaign artifact;
- Sniff Test ownership by Got Soap?;
- the Got Soap? edition of the pledge; and
- the late `/about` Hope2 Studio reveal.

The film must be treated as a campaign medium with its own staging and rhythm, not a generic embedded player or video card. This revision reserves its canonical place without inventing unapproved film content.

### 7.5 Anti-template route contract

Every major Got Soap? route specification must name:

1. its dominant event;
2. its counterweight;
3. the material transition into and out of it;
4. the default web layout it refuses;
5. the emotional change it creates; and
6. the authorship boundary it must not cross.

This contract supplements, rather than replaces, the existing prohibitions against centered SaaS heroes, equal card grids, static poster galleries, decorative scroll effects, and tasteful-but-bloodless editorial minimalism.

## 8. CWAAA behavioral bible

Expand `cwaaa/docs/world-bible.md` into a complete institutional psychology.

### 8.1 Required subjects

It must define:

- what CWAAA believes;
- what it never says;
- what it finds funny;
- what it would never do;
- how it portrays authority;
- how it describes people, products, programs, and artifacts;
- what each route should make a visitor feel;
- interactions that belong;
- interactions that break the illusion;
- things CWAAA never explains;
- how repeated details acquire meaning;
- what visitors know versus what CWAAA appears to know;
- how CWAAA behaves in physical space;
- how it behaves in email, telephone audio, print, and events; and
- how unintended unease can occur without turning CWAAA into a horror or enforcement institution.

### 8.2 Emotional boundary

Replace the absolute rule "CWAAA does not frighten" with:

> CWAAA never manufactures fear. Its overdeveloped certainty, institutional continuity, and unexplained references may accidentally reveal that something larger exists behind it.

CWAAA remains a credible, competent advocacy nonprofit. It must not openly:

- threaten;
- surveil;
- contain;
- prosecute;
- claim jurisdiction;
- dispatch enforcement;
- imitate police procedure; or
- behave as an incompetent parody charity.

The IVR is a specific transmedia exception governed by Section 11. Its unresolved authorship must not be generalized into ordinary CWAAA website copy.

### 8.3 Records

CWAAA records resemble:

- participant advocacy files;
- recovery histories;
- chapter correspondence;
- reform documentation;
- program findings;
- pledge receipts; and
- physically maintained nonprofit records.

They must not resemble:

- police evidence;
- intelligence files;
- criminal dossiers;
- mugshots;
- redacted classified folders;
- evidence bags;
- suspect boards; or
- crime-scene indexing.

"Records room" may describe organization and care, but never enforcement aesthetics.

### 8.4 Office references

The CWAAA site may contain only a few Office references. They may use:

- neutral citations;
- unexplained document references;
- an ordinary outbound link; or
- an artifact whose meaning changes later.

They may not explain, dramatize, or advertise the relationship.

## 9. CWAAA email relationship

The pledge creates a finite two-message relationship:

1. **Immediate pledge receipt**
2. **One current-issue newsletter sent separately after a short delay**

The delay is a configurable implementation default, not permanent canon.

The newsletter:

- is sent exactly once per pledge signup;
- derives its displayed month and year at signup or send time;
- always appears to be the current issue for that recipient;
- uses evergreen issue content;
- does not begin a monthly subscription;
- does not create a drip campaign;
- does not imply that the recipient will receive future issues; and
- remains CWAAA-authored.

The PRD must define content roles and unsubscribe/privacy behavior even though the sequence is finite. Implementation must not silently convert this mechanic into a conventional newsletter form.

## 10. Office world bible and website

### 10.1 Institutional psychology

The Office is:

- polite;
- patient;
- certain;
- administratively complete;
- jurisdictionally vague; and
- unaware that it is frightening.

It is not:

- glitchy;
- distressed;
- theatrical;
- militarized;
- occult;
- monster-driven;
- hacker-coded; or
- overtly threatening.

The visitor supplies the fear.

### 10.2 Website boundary

The Office website is the custom error experience. It contains:

- no conventional homepage;
- no About page;
- no navigation;
- no content index;
- no explainer;
- no public forms;
- no reciprocal route into Got Soap? or CWAAA; and
- no jurisdiction statement.

The CWAAA link may lead into the error experience. The error experience does not explain why.

### 10.3 Reference logic

`8804-X` is the standing containment reference attached to the unavailable resource, proceeding, or classification. It is not a unique visitor log.

The terminal ID is persistent and browser-specific. It must not be described as cross-device, personally identifying, or backed by a government identity record.

## 11. IVR authority

The attached **1-800-GOT-SOAP IVR / Phone Script** is a canonical transmedia artifact.

### 11.1 Public placement

- The number lives on the Got Soap? website.
- Printed promotion of the number belongs to the Got Soap? campaign.
- Neither CWAAA nor the Office advertises the number as its normal public contact channel.

### 11.2 Presented voices

The call has two presented voices:

- **Voice A - "The Campaign"**: Got Soap?
- **Voice B - "Compliance"**: apparently CWAAA

There is no third Office voice and no audible transfer that resolves the handoff.

Voice B eventually:

- says "We have your number";
- identifies the Office by name;
- accepts reports;
- assigns Field Assessors;
- says someone is already on the way;
- notes continued patience;
- handles the hidden branch; and
- delivers Office after-hours voicemail.

The listener is allowed to wonder whether:

- CWAAA transferred the call;
- the Office was present all along;
- the Office uses CWAAA as a friendly public layer;
- CWAAA fronts for the Office; or
- the two are effectively one apparatus with different manners.

No artifact answers the question.

### 11.3 Preservation rule

The substantive script is preserved, including its threatening or overreaching lines. Future agents must not:

- remove Office language;
- create a third voice;
- add a clear transfer cue;
- rewrite Field Assessors as nonprofit coordinators;
- remove "someone is already on their way";
- soften "binding";
- remove the hidden branch;
- explain the relationship in production notes; or
- normalize the script to match ordinary CWAAA website behavior.

Mechanical deployment details, such as a production URL, may change only through the owner-approved copy lane. The wrongness, branch logic, and unresolved authorship may not.

The transmedia authority must explicitly record that the IVR is a deliberate exception. It is evidence of the mystery, not permission to turn all CWAAA surfaces into compliance theater.

## 12. Office return-state contract

Replace the single visit counter with three separate concepts:

- `sessionRefreshCount`: reloads within the active browser session;
- `returnSessionCount`: distinct browser sessions after the first session; and
- `lifetimeAccessCount`: total local accesses, retained for state bookkeeping but never used alone to escalate the narrative.

Required progression:

| Browser behavior | Visible state |
| --- | --- |
| First access in session 1 | First Access |
| Reload during session 1 | Refresh Denied |
| Additional reloads during session 1 | Refresh Denied |
| First access in session 2 | Repeat Access |
| Reloads during session 2 | Refresh Denied or the session-specific refresh variant; never Continued Interest |
| First access in session 3 | Continued Interest |
| Session 3 and every later session | Continued Interest stasis |

Only a distinct browser session advances the return narrative. Reloading must never unlock Continued Interest.

Implementation may use `sessionStorage` to identify the active session and `localStorage` to preserve browser continuity. It must not use:

- cookies;
- fingerprinting;
- backend visitor profiles;
- IP display;
- cross-device recognition; or
- personally identifying records.

State-dependent copy must resolve before it is revealed. A returning browser must never visibly flash First Access and then switch to a later state.

The no-JavaScript and storage-failure experience must remain legible and accessible without falsely displaying personalized recognition.

## 13. Pledge ownership

The pledge is a shared mechanic with controlled presentations:

- CWAAA owns the canonical declaration, filing, and receipt.
- Got Soap? owns the campaign invitation and campaign edition.
- The Office never receives, files, records, or enforces the pledge.

The shared pledge contract remains the source for common fields and canonical commitment. Per-system rendering, surrounding copy, and visual authorship must remain separate.

Extraction must leave:

- a usable campaign pledge presentation with Got Soap?;
- the canonical nonprofit pledge workflow with CWAAA; and
- no pledge implementation or data ownership under the Office.

## 14. Artifact-continuity model

`docs/world/artifact-continuity.md` must include a registry with these fields:

| Field | Purpose |
| --- | --- |
| Artifact | Canonical name |
| Physical/digital form | Website, audio, email, print, film, object, or event display |
| Public author | Who appears to have made it |
| Actual owner | Which system governs it |
| First meaning | What it communicates immediately |
| Later meaning | How another encounter recontextualizes it |
| Recurrence rule | How often and where it may appear |
| Forbidden explanation | What future work must never clarify |
| Portability | Which package needs it during extraction |

The initial registry must cover:

- Got Soap? website;
- Got Soap? posters;
- Got Soap? campaign film and `/broadcast`;
- 1-800-GOT-SOAP;
- printed IVR card;
- Sniff Test;
- both pledge presentations;
- CWAAA website;
- CWAAA pledge receipt;
- CWAAA current-issue newsletter;
- CWAAA forms and chapter packets;
- Office error domain;
- Office pen;
- business cards;
- event swag table; and
- future packaging or film only when separately approved.

### 14.1 Office pen

The Office pen:

- is branded as ordinary institutional swag;
- carries the 1961 continuity;
- appears on the owner's event swag table;
- is not introduced with a lore explanation;
- may seem insignificant at first; and
- becomes unsettling only when another artifact gives its identity or date new meaning.

It must not behave like a collectible puzzle key or announce that it is a clue.

## 15. Handoff and migration changes

Update the handoff and migration authorities so that:

- the root handoff begins with the master world bible;
- historical design documents remain clearly retired;
- Shop cannot disappear through phased-scope wording;
- campaign film is reserved as canonical even before production;
- the IVR is identified as intentional ambiguity;
- CWAAA extraction copies and verifies before any combined-site deletion;
- Office content remains outside the Got Soap? and CWAAA site packages except for approved references and artifacts;
- the pledge contract is copied or consumed deliberately in both destinations; and
- the Office link remains a controlled CWAAA seam.

No migration instruction may use broad deletion or imply that government-flavored material is disposable.

## 16. Documentation acceptance gates

The revision is complete only when:

1. One master world bible governs shared canon.
2. One artifact registry covers all currently approved media.
3. Each system has a psychologically complete world bible.
4. The authority order is unambiguous from `docs/HANDOFF.md`.
5. Shop appears as canonical in the Got Soap? PRD.
6. `/broadcast` and the homepage film seam appear as canonical campaign surfaces.
7. Got Soap? behavior change is explicitly grounded in erotic aspiration rather than shame.
8. CWAAA's book-club origin, two-million scale, and fifty-state chapters are labeled objective canon.
9. The Office alone dates to 1961.
10. The Office/CWAAA relationship is labeled intentionally unresolved.
11. CWAAA records are distinguished from police, intelligence, and criminal dossiers.
12. The two-message CWAAA email sequence and dynamic current-issue date are specified.
13. The Office state contract cannot escalate through reloads.
14. Session 3 is the fixed Continued Interest threshold.
15. Returning browsers cannot visibly flash First Access.
16. `8804-X` is defined as a standing containment reference.
17. The IVR retains two presented voices, all substantive lines, and no resolved transfer.
18. The number is placed under Got Soap? while the call's authorship becomes ambiguous.
19. The Office website remains error-states-only.
20. The Office pen and 1961 continuity are preserved.
21. The shared pledge remains available in both Got Soap? and CWAAA presentations.
22. Authority validation rejects new cross-system blending and obsolete history.

## 17. Non-goals

This revision does not:

- build or redesign any website;
- deploy the telephone number;
- choose a telephone provider;
- record voices;
- implement the email sequence;
- write the evergreen newsletter issue;
- create the campaign film;
- create new Office pages;
- answer intentional mysteries;
- rewrite the attached IVR;
- move Photoshop sources or large design binaries; or
- remove current combined-site material before the migration manifest authorizes copy-and-verify extraction.

## 18. Resolved owner decisions

The following decisions are closed:

1. The Office is an unspecified-jurisdiction government agency.
2. The Office has existed since 1961; CWAAA was established in 2024.
3. The relationship between CWAAA and the Office is never explained.
4. Sparse CWAAA references use neutral citations and unexplained links.
5. `8804-X` is a standing containment reference.
6. The terminal ID is browser-specific.
7. CWAAA's book-club origin, two-million scale, and fifty-state chapters are objective canon.
8. Shop remains canonical; unavailable checkout does not remove it.
9. The campaign film owns `/broadcast` and a full-bleed homepage premiere seam.
10. Continued Interest begins on the third distinct browser session.
11. CWAAA sends an immediate pledge receipt and exactly one separately delivered current-issue newsletter.
12. The newsletter derives its month and year at signup or send time and does not create an ongoing monthly program.
13. The telephone number lives on Got Soap?
14. The IVR uses only Voice A and Voice B.
15. The IVR's Office language and threatening lines remain intact.
16. The absent handoff between CWAAA and the Office is deliberate wrongness.
17. The Office pen appears as event swag and carries the 1961 continuity.

## 19. Review traceability

| Review concern | Design response |
| --- | --- |
| No Got Soap? world bible | Section 7 creates a behavioral bible |
| Shop disappeared | Section 7.4 restores canonical Shop ownership |
| Campaign video absent | Section 7.4 reserves `/broadcast` and the homepage premiere seam |
| CWAAA bible too thin | Section 8 defines a complete institutional psychology |
| "CWAAA does not frighten" too absolute | Section 8.2 replaces it with accidental unease |
| 1961/2024 conflict | Section 5 assigns 1961 to the Office and 2024 to CWAAA |
| Inherited facts promoted without approval | Sections 4, 5, and 18 record explicit owner approval |
| Records-room cliché | Section 8.3 prohibits enforcement and dossier language |
| Email relationship undefined | Section 9 specifies the finite two-message sequence |
| Office refresh-count bug | Section 12 separates refreshes from return sessions |
| Continued Interest threshold vague | Section 12 fixes it at session 3 |
| Returning-state flash | Section 12 requires pre-reveal resolution |
| `8804-X` lacks meaning | Section 10.3 defines it |
| IVR conflicts with clean separation | Section 11 defines the conflict as intentional audience ambiguity |
| Missing transmedia bible | Sections 3, 5, 6, and 14 create layered shared authority |
