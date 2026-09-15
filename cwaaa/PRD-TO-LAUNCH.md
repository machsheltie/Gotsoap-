# CWAAA — from the combined runtime to launch

**Prepared:** 2026-09-07 · **Audience:** Claude Code and Stacey · **Status:** implementation handoff; owner interviews required for unfinished decisions.

Build the standalone public expression of Concerned Women Against Axe Abuse: **A Coalition Making Its Case in Public**. Finish the advocacy experience, both-site pledge fulfillment, final graphics, and verified deployment. Existing CWAAA fragments and font assets are reusable inputs, not an already completed standalone site.

## Start here, Claude

> Take CWAAA from its current source material to a launch-ready standalone site. Read the authority and verify the runtime before proposing work. Grill me thoroughly on every genuinely unfinished design, content, and graphics section, one dependent branch at a time. Show concrete options and their consequences; ask follow-ups until my answer can guide implementation. Preserve the recorded typography choices and the protected institutional mystery. Record my decisions before building dependent work. Continue independent preparation while answers or graphics are pending. Keep later work visible.

Read [owner decisions](../docs/HANDOFF.md), [shared canon](../docs/world/WORLD-BIBLE.md), [CWAAA world](docs/world-bible.md), [design](design.md), [target PRD](docs/PRD-cwaaa-web-v1.md), [UI decisions](docs/ui-system.md), [migration manifest](docs/migration-manifest.md), and [graphics brief](GRAPHICS-TO-MAKE.md). This is an execution bridge under those authorities, not a replacement design system. Load Got Soap? only where shared submission or extraction requires it; never import its visual treatment.

## 1. Verified current state

| Area | Source evidence | What completion requires |
|---|---|---|
| Standalone application | This folder has docs and `public/fonts/`; no standalone application implementation was identified | Independent build, routes, content/config, deployment, and QA |
| Existing nonprofit experience | `../site/src/pages/crisis.astro`, `components/cwaaa/`, home seams, and `content/copy.ts` hold CWAAA content | Inventory exact approved records/assets, copy first, and adapt into the target route set |
| Pledge | One shared combined-site route and an ornate decree treatment; hard-coded Office language appears in `PledgeForm.astro` | Safe, accessible civic declaration with no Office presence; preserve field meaning while replacing stale authorship and presentation |
| Subscription behavior | `BUTTONDOWN_USERNAME` empty; `pledge.ts` skips submission but still allows success; configured requests use an opaque response | Verifiable acceptance, truthful success/failure, and exactly two messages with withdrawal/suppression |
| Fonts | August 13/14 choices recorded in UI decisions and runtime manifests/styles; prepared binaries exist | Preserve chosen roles; reconcile stale root/summary references and finish unresolved typography metrics |
| Artwork | Coalition PNGs and seal/ribbon components exist in the combined app; chapter/recovery/hero production sets are not established | Review existing identity assets and produce only the missing approved route art |
| Cross-site links | No standalone deployed origin identified from local config | Owner-assigned origins; sparse conditional seams and approved redirects |

File presence is not visual approval. Neither local source nor a green build proves live Buttondown behavior. Inventory and test these independently during implementation.

## 2. Decisions already made

- The public proposition is **THE BAR IS SOAP.** The experience is credible, humane advocacy with exceptional art direction. It earns trust before a sparse unexplained Office referral.
- Navigation uses **Findings**, **Recovery Stories**, **Tie One On**, **Chapters**, **About**, and **Take the Pledge**. An individual opened story may use **Recovery Record** and `RC-NNN`; the navigation must not revert to Case Files.
- The visual hierarchy is roughly 50% documentary **photographs of people**, 30% coherent physical artifacts, 20% live civic graphics. People are shown — faces and bodies; no still life, and artifacts never annex the 50%. Paper appears only as a real form, report, letter, packet, or citation. No all-manila world, dossier styling, decorative stamps, dashboard, or generic nonprofit card grid.
- The home image is the coalition's own group portrait — three members in a plain meeting room, facing the camera, one holding a bar of soap — shipped and closed 2026-09-15; the earlier gym-bag spec is struck. CWAAA photography **shows people** — faces and bodies, posed or candid — with activity, material, and continuity. No still life anywhere; an object never stands in a person's slot. What stays rejected is generic stock and institutional framing, never the human.
- CWAAA was established in 2024 from a book club. The Office's 1961 continuity may be referenced sparsely without resolving its relationship or jurisdiction. No ordinary CWAAA page uses Office denial or surveillance language.
- The pledge belongs to CWAAA; its campaign edition remains on Got Soap?. Both delivered messages are CWAAA-authored. There is no automatic ongoing newsletter or marketing enrollment.

### Typography: preserve the actual recorded decisions

| Role | Recorded family / allowed weights | Binding use |
|---|---|---|
| Proposition | MORVI 400 | Route propositions; never synthesize bold |
| Monumental figure | Mirk Slab 900 | One isolated oversized figure; not aligned columns |
| Reading text | Proda Sans 400, 400i, 700 | Explanatory body copy |
| Interface and notation | Catesque 400, 500, 700 | Controls, labels, metadata, IDs, dates and aligned figures; required figure/notation features |
| Testimony | Modest 400, 400i, 700 | Recovery Stories long-form |
| Identity serif | PT Serif 400, 400i, 700, 700i | Seal and existing certificate artifacts |

The [UI decision log](docs/ui-system.md) and [runtime font manifest](../site/config/cwaaa-font-manifest.json) record these selections, including the Mirk Slab rights confirmation. Its delivery restriction does not authorize more weights. The [font brief](docs/font-brief.md) remains selection provenance, not a reason to restart the selection interview.

**Authority reconciliation required:** root instructions still summarize “CWAAA web font: PT Serif,” while local decisions explicitly limit PT Serif to identity artifacts. Present that conflict to Stacey and record the clarified scope in the shared handoff/root guidance before enforcing a new interpretation. Do not silently replace the six-role cast or treat all fonts as still unchosen. Type scale, leading, tracking, measures, case discipline, and responsive rules remain open in the local UI authority.

## 3. Thorough owner interview

Claude must first distinguish a stale pending label from a real open decision. Use the grill-with-docs rhythm: a focused question cluster, concrete examples/options and a recommendation, wait, drill into implications, then record the answer. Do not produce a wall of questions or assume “looks good” resolves unshown mobile/error states.

| Decision ID | Branch to resolve | Required result |
|---|---|---|
| CW-D01 | Resolve the PT Serif summary conflict without reopening the chosen cast; then decide type sizes, line lengths, leading, tracking, optical matching, case, and responsive behavior | Dated UI/type decisions and synchronized authority wording |
| CW-D02 | Choose exact palette/state tokens, column relationships, spacing, surfaces, focus/error states, motion, and mobile behavior within the locked material law | Token and state specifications with normal/error/reduced-motion examples |
| CW-D03 | For every route, what owns the page, what is the interruption, what transition follows, and what does the visitor do next? | Approved desktop/mobile route compositions and image slots |
| CW-D04 | Which existing Findings and Recovery Records are approved? How many stories, chapter examples, and artifacts are needed for launch? What copy exists versus must be written? | Explicit launch content roster, IDs, authors, source status, and copy-review queue; no automatic fifty-page chapter expansion |
| CW-D05 | Which identity files are final? Which portraits/environments and complete physical artifacts will Stacey make? What exactly is printed on them? | CW-G01–08 approvals, canvas sizes, shot counts, artifact copy, and crop-safe areas |
| CW-D06 | Decide the two-message content, current-issue content/date convention, delay, sender/contact details, and accountable provider configuration | Approved consent/receipt/issue text and documented integration/configuration plan |
| CW-D07 | Confirm standalone application/build locations before scaffolding, origins, creator/legal destinations, `/crisis` migration destination, and old story redirects | Deployment/redirect map and release sequence; keep credentials out of documents |

Record each resolution as **decision, rationale, source authority, affected route/graphics IDs, acceptance example, and remaining open questions**. Write visual choices into the applicable design/UI authority, not just this checklist. Existing implementation is not permission to adopt a framework default. Continue content inventory, contracts, and tests while dependent art/layout decisions are open.

## 4. Route and content requirements

| Route | Authored composition and behavior | Graphics / acceptance |
|---|---|---|
| `/` | Proposition owns most of opening; documentary hero interrupts type; continuous DOCUMENT. ADVOCATE. ORGANIZE.; one finding, recovery voice, ribbon moment, coalition scale, pledge action, and campaign seam | CW-G01/02/03/04/05. Clear navigation, no equal three-card program row or repetitive pledge CTA after every section |
| `/findings` | Monumental live figure, hard rule, conclusion, support, disposition; one human annotation or methodology interruption | CW-G08 only if a real source artifact is approved. Figures/tables stay HTML; aligned values use Catesque; at most one sparse neutral Office citation |
| `/recovery-stories` | Intimate reading-oriented index of approved participant accounts | CW-G04. Participants are shown. No mugshots, surveillance framing, carousel, police evidence, or stock testimonial cards |
| `/recovery-stories/[id]` | Individual testimony, object/environment, recovery identifier, humane change and next action | CW-G04. Approved source roster and stable IDs; distinguish first-person testimony from institutional captions |
| `/tie-one-on` | Actual cloth in human/macro scale; instructions on plausible complete artifacts or accessible live content | CW-G03. Real weave, hem, knot and tension; no cursor ribbon or simulated craft table |
| `/pledge` | One ceremonial civic signing surface; explicit consent and clear validation; confirmed `SWORN`, share/copy, fulfillment explanation and ordinary CWAAA continuation | CW-G06. No Office text, threat, regulatory seal theater, or campaign-smolder styling |
| `/chapters` | Composed field of approved local dispatches, environments, notices and packets | CW-G05. Human continuity; no animated map, fifty invented contact details, or nonfunctional participation controls |
| `/about` | Contemporary 2024 book-club origin, table/notes/early program traces; deepest neutral Office referral | CW-G05. No sepia invented history; public copy never explains the relationship; creator disclosure is a deliberate deeper seam |
| `/404` and legal access | CWAAA-authored not-found with useful return route; globally accessible Privacy, Terms, DMCA and truthful real-world contact/data details | Live HTML/CSS. Legal labels do not announce fiction; no Office denial styling |
| `/case-files` and `/case-files/[id]` | Permanent migration to Recovery Stories and the corresponding approved IDs | Redirect tests prove deep-link continuity; obsolete labels are not canonical navigation |

Each route must have an approved content roster and an explicit empty/error treatment before release. A route shell with invented placeholders is not launch content. Use the [copy protocol](../gotsoap/docs/copy/COPY-PROTOCOL.md), local world bible, and approved per-route voice when preparing new copy. Do not treat historical case-file decks as target policy or rewrite testimony outside its review lane.

## 5. Shared pledge fulfillment: CWAAA owns this workstream

This section serves both implementations. The [shared pledge JSON](../docs/contracts/pledge.v1.json) and [portable copy](docs/contracts/pledge.v1.json) remain byte-identical. No new contract fields, extra provider, or marketing consent are authorized by this handoff.

### Visitor and delivery behavior

1. Both forms require first name, email, affirmative two-message consent, and the contract's honeypot behavior. Labels persist; adjacent errors identify the problem and preserve correctable input.
2. The integration accepts the submission with verifiable evidence before production `SWORN`. Empty configuration, an opaque `no-cors` response, or a caught exception cannot stand in for provider acceptance. Show a truthful retry/error state; provide a verified non-JavaScript path.
3. One immediate CWAAA receipt is delivered, with a way to withdraw consent before the issue is sent.
4. After a configured short delay, check consent/suppression again, then deliver exactly one current issue. Derive its displayed month/year from the approved signup-or-send convention; no monthly editorial maintenance is implied.
5. Withdrawal/unsubscribe before delivery suppresses the issue. The issue also has a functioning unsubscribe/suppression mechanism.
6. Buttondown confirmation/welcome settings must fulfill the receipt or remain disabled. They must not add a third message. Repeat submission, retry, or registration through the other site must not accidentally duplicate the finite sequence.

### Engineering boundary

Before implementing, verify current Buttondown account features and official integration documentation. Record the selected submission-confirmation, scheduling, suppression, and resend-prevention approach. If the available account cannot satisfy the contract, report that concrete gap and request the required provider/configuration decision; do not replace verification with client animation or claim unsupported capability. Keep server secrets outside static output; do not add an application identity database or another email provider by default.

Retain only the minimum Buttondown data required to fulfill two messages, prevent accidental resend, and honor suppression. Remove unneeded fulfillment metadata after completion. Neither pledge field values nor email addresses may enter GoatCounter, other analytics, console logs, shared screenshots, or public test reports. Test fixtures and authorized controlled addresses must be used for delivery verification; do not send real subscriber campaigns as a test.

The two form shells and on-page success voices remain distinct. Got Soap? adds its conditional final CWAAA seam; CWAAA continues into its own advocacy site. Delivered copy stays CWAAA-authored in either case.

## 6. Architecture, migration, and release order

Use a separate static-output app with central content and external-link modules, self-hosted fonts, modern responsive images, Netlify-compatible deployment, canonical metadata, and privacy-conscious analytics. Astro is the existing preferred baseline; confirm the app/build location in CW-D07 rather than silently creating a new repository or moving the campaign app. Prepared `public/fonts/` must be inventoried against assigned roles, not bulk-deployed.

Central configuration must support the site's origin, `GOT_SOAP_SITE_URL`, `OFFICE_SITE_URL`, shared `BUTTONDOWN_USERNAME`, and approved contact/creator details. Empty cross-site values omit controls; final connected release requires actual configured destinations. Deep Office referrals must remain neutral and sparse, with no description of its behavior or operational relationship.

| Milestone | Responsible party | Exit criterion |
|---|---|---|
| CW-M1 | Claude + Stacey | Fresh exact migration inventory; authority conflicts and owner interview roster established |
| CW-M2 | Claude + Stacey | Build location and route compositions approved; reusable content/assets classified; launch content roster locked |
| CW-M3 | Claude, with Stacey's art | Standalone routes, correct roles/fonts, final copy/art, accessible navigation/forms and metadata implemented |
| CW-M4 | Claude + account owner | Both pledge presentations and the two-message program verified with controlled submissions; full suppression/retry tests pass |
| CW-M5 | Claude | Shared-canon transfer record, pledge parity, asset provenance, standalone QA and redirects verified |
| CW-M6 | Stacey + implementer | Actual domains assigned, previews reviewed, deployment authorized, cross-site links/redirects smoke-tested; campaign copy removed only after replacement works |

Follow the migration manifest's exact shared dependency closure and source-commit/version record for any extracted repository or snapshot. While working in this one repository, reference the single shared authority; do not create competing world bibles. Never move `.abr`, PSDs, unrelated campaign art, or licensed packs into the app. Record origin and rights for every copied asset.

The Got Soap? release depends on verified CWAAA replacement and shared pledge fulfillment. CWAAA's final deep referral depends on a verified Office deployment. Build previews independently, then connect actual approved domains; no temporary invented domain belongs in baked graphics.

## 7. Acceptance and evidence

- All required routes contain approved final content, distinct compositions, working actions, canonical metadata and valid previews; no production placeholders or unapproved stock remain.
- Visual review confirms monumental Findings, intimate Recovery Stories, tactile Tie One On, safe Pledge, human Chapters, and 2024 About. Compare mobile as well as desktop; neither campaign nor Office styling leaks into ordinary nonprofit pages.
- Test keyboard navigation, focus return, labels/error announcement, correctable failure, 200% zoom, narrow screens, high contrast, reduced motion, image-disabled comprehension, and responsive table reflow against WCAG 2.2 AA. Lock remaining performance thresholds in CW-D02 before signoff.
- Test both-site submission success, empty credentials, provider rejection, timeout, repeated clicks, cross-site duplicate submission, missing consent, honeypot, no JavaScript, receipt delivery, date rendering, cancellation before send, unsubscribe, retries after delivery, and absence of a third message. Retain redacted evidence of actual provider behavior.
- Verify `/case-files` redirects preserve valid record identities, retired campaign links reach the approved destination, missing configuration renders no dead control, and the Office referral reaches its custom error experience without resolving fiction.
- Verify no pledge/identity data in analytics; licenses/attribution, legal disclosures and contact destinations match actual deployment behavior.
- Run standalone build, link, route, accessibility, content, contract and authority checks. From `../site/`, run the repository's build, font audit, gates, copy-gates, fidelity, distinguish and authority commands while validating migration effects; run authority regression tests if its tooling changes.
- Approve new copy evidence before replacing the combined-runtime fidelity baseline. Preserve its history; do not disable its checks to make extraction green.

**Launch blockers:** unresolved necessary design/content decisions, unfinished graphics, unverified email/consent behavior, absent deployment configuration, dead legal/contact/participation paths, wrong authorship, failed checks, or removal of campaign-hosted material before the replacement is verified. Final connected launch is not proven by isolated local builds.

## 8. Later work — not forgotten, not implied by launch

| ID | Deferred work | Re-entry condition |
|---|---|---|
| CW-L01 | Expanded story/chapter roster and recurring social series | New approved content, participant-fiction review, and additional CW-G04/05 artwork |
| CW-L02 | Printable chapter kits, distribution packets, correspondence sets and event material beyond the launch photo props | Complete artifact copy, practical sizes/materials, approved production quantity and distribution scope |
| CW-L03 | Citation-path or participant-generated mechanics | Explicit approval of ownership, input handling, consent/moderation and copy; existing proposal is not authority to move Sniff Test |
| CW-L04 | Ongoing newsletter, donations, real chapter operations, accounts or CMS | Separate product and operational approval; new contract/consent where required; never silently extend Form CW-1 |
| CW-L05 | Future identity/certificate recuts | Owner-approved identity change; current PT Serif artifact role stays until replaced deliberately |

Close the launch handoff with a checklist of deferred IDs, next actions, and responsible owner. Do not present fictional chapter participation as a staffed real-world service without an explicit operating decision.

## Decision record — 2026-09-14

| ID | Status | Decision | Recorded in |
|---|---|---|---|
| CW-D07 (build location only) | resolved | New Astro static app at `cwaaa/`, sibling to `../site/` | `docs/ui-system.md` §13 |
| CW-D03 (home only) | resolved | Comp D "The Field Report" approved; other routes open | `docs/ui-system.md` §13, `.impeccable/mocks/cwaaa-home-d.json` |
| CW-D02 (ground only) | partly resolved | White/ivory fields; manila retired to artifacts; other tokens proposed, not law | `docs/ui-system.md` §13 |
| CW-G02 (frame) | shipped, closed | Coalition group portrait; 16:9 wide, subject upper-right, lower-left quiet, 3200×1800 + true 4:5. Posed faces approved; do not respec | `docs/ui-system.md` §13 |
| CW-G03 (home) | resolved | Doorknob ribbon scene, 3200×1800 desktop + 2400×3000 mobile; lower-left reserved for the inset panel | `GRAPHICS-TO-MAKE.md`, `docs/ui-system.md` §13 |
| CW-G04 (home) | shipped | Brayden participant photograph, 4:3, wired 2026-09-15; broader story roster remains open | `GRAPHICS-TO-MAKE.md`, `docs/ui-system.md` §13 |
| CW-G05 / CW-G08 (home) | resolved | No Home assets required; both remain conditional on their dedicated route layouts | `GRAPHICS-TO-MAKE.md` |
| CW-G06 / CW-G07 | partly resolved | Share-master and default-preview visual formats locked; final pledge wording and final-size identity review remain | `GRAPHICS-TO-MAKE.md`, `docs/ui-system.md` §13 |
| CW-D04 (Findings register) | resolved | Four entries, year 26: 26-01 = figure 73% with conclusion "Fragrance is not a cleansing event." (home statement merged with runtime 26-04); 26-02/03/04 carry runtime 26-01/02/05; runtime 26-03 dropped (unsupported 1983 date). Home Finding takes label 26-01. No Office citation on `/findings`. Recovery Stories roster still open | `docs/ui-system.md` §13, `.impeccable/surfaces/cwaaa-src-pages-findings-astro.md` |

## Handoff verification — 2026-09-07

The six launch/graphics documents were checked for valid local links and defined graphics IDs. The existing combined application passed fresh `build` (22 pages), `gates`, `copy-gates`, authoritative `fidelity` (55/55), `distinguish`, and `authority` checks. `audit:fonts` passed with 0 errors and reported 7 restricted fonts and 19 unassigned files. Those warnings do not approve additional font delivery.

Runtime source, shared/portable contracts, canonical IVR PDF and frozen copy evidence retained their pre-handoff content hashes. These results validate the documentation delivery against the unchanged combined runtime; they do not certify a standalone site, final graphics, live email service, or production deployment. Re-run the release tests in this PRD after implementation. No deployment was performed by this documentation handoff.
