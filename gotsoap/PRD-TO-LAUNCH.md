# Got Soap? — from the current build to launch

**Prepared:** 2026-09-07 · **Audience:** Claude Code and Stacey · **Status:** implementation handoff; open owner decisions remain open.

Finish the campaign as a standalone, production-ready site while preserving its authored heat, immutable posters, working interactions, and late Hope2 Studio reveal. The repository currently deploys one combined campaign/CWAAA application. This handoff defines the remaining work; it does not claim that extraction, final art, or live email fulfillment is complete.

## Start here, Claude

> Use this PRD to take Got Soap? to launch. First verify the current source and read the governing documents below. Show me what is already locked, then grill me thoroughly about the first unresolved design or production decision. Ask focused follow-ups, explain the consequences, and record my answers before building the affected section. Do not ask me to choose again where a documented decision already exists. Continue independent work while an answer or graphic is pending. Keep the later-work list visible. Do not turn this into a generic campaign template or build the other institutions inside this site.

Read [owner decisions](../docs/HANDOFF.md), [shared canon](../docs/world/WORLD-BIBLE.md), [campaign world](docs/world-bible.md), [design](docs/design.md), [target PRD](docs/prd/PRD-gotsoap-web-v1.md), and [graphics brief](GRAPHICS-TO-MAKE.md). The [current runtime specification](../specs.md) describes what exists, not permission to retain obsolete combined-site ownership. This handoff is subordinate to those authorities; it adds execution order and completion criteria.

## 1. Verified starting point

| Area | Evidence at handoff | Remaining work |
|---|---|---|
| Application | Astro static build in `../site/`; root Netlify config uses that directory | Keep the working app there during completion; do not relocate it as a cosmetic cleanup |
| Home and PSA index | Hero and installation images imported from `src/assets/placeholder/` | Replace with approved art; update installation hotspot coordinates and test both arrangements |
| Five poster routes | Five environment components, canonical image sources, downloads, share/lightbox behavior | Preserve and audit against target composition and final graphics |
| Running order | `src/config/site.ts`: confident-man → unholy → soap-smoldering → redemption → thirst-announcement | Preserve this July 30 decision; Unholy remains the home flagship |
| Sniff Test | Seven-question runtime, four verdicts, static share routes | Remove stale CWAAA-assessor authorship through the copy lane; retain campaign ownership and no numeric score |
| Pledge | One CWAAA-styled combined form; Buttondown username is empty; client code permits `SWORN` without a submission and uses an opaque `no-cors` response when configured | Build the campaign edition and verified success/error behavior; integrate the shared fulfillment work owned by CWAAA |
| Shop | Five existing product images and routes; current index uses product-card markup | Recompose into five oversized editorial performances; review existing images before commissioning replacements |
| CWAAA content | `/crisis`, home Case/Movement material, shared copy exports, institutional components and assets | Copy and verify in CWAAA first, then retire long-form campaign-hosted material with approved redirects |
| Legal and metadata | SEO/robots/share machinery exists; Footer lacks globally accessible Privacy/Terms/DMCA controls | Complete truthful legal access and metadata for the final route set |
| Film, phone, domains | No `/broadcast`; current origin is `https://gotsoap.netlify.app`; no separate CWAAA URL configuration | Reserve film/phone work for later activation; owner supplies deployed cross-site origins |

These are source findings, not a fresh visual approval or proof of provider configuration. Recheck source drift before implementation. Existing images count as **present, approval unverified** until visually reviewed.

## 2. Locked direction and conflicts to reconcile

- The website is the campaign. Desire drives behavior change; shame, health education, and an early portfolio explanation do not.
- Preserve all five canonical posters and their baked typography. Distinct steam/tile, smoke/chrome, and amber/marble performances must survive mobile recomposition.
- Keep the five campaign voices: Oswald commands, Behind The Nineties persuades, Moxie Twist seduces, Marlin Sans SQ operates, Moanslight records/releases. No easier-to-load replacements or Fontsource dependencies.
- Read [typography](docs/typography-spec.md), [responsive typography](docs/responsive-typography-spec.md), [tracking](docs/letter-spacing-spec.md), [color](docs/color-spec.md), and [font delivery](docs/font-delivery-spec.md) before treating any item in the older [UI scaffold](docs/ui-system.md) as undecided. Specific locked supplements supersede corresponding pending entries.
- Shop remains a fashion catalogue pretending to be a store. Checkout is intentionally unavailable, with “Coming Soon!” only at purchase points.
- Sniff Test stays Got Soap?. Both pledge presentations remain available and implement the [shared contract](../docs/contracts/pledge.v1.json). CWAAA authors delivered messages; the Office has no role in pledge handling.
- Old art briefs prescribe CWAAA stamps, universal manila treatments, and hard-coded campaign URLs. Reconcile those with current campaign authorship and final domains before approving baked artwork. Do not transfer those instructions blindly into new verdict or pledge graphics.
- The target PSA index language and existing installation specification must be reconciled explicitly before replacing a working installation concept. Default to preserving the implemented five-poster installation, its complete posters, and its interaction contract; interview Stacey about any proposed target redesign.
- [Citation-path proposals](../cwaaa/docs/copy/vector2-citation-path-spec.md) cross the campaign Sniff Test door with CWAAA authorship. They are not a launch requirement and do not override current ownership.

## 3. Owner interview: resolve dependencies before design production

Use the grill-with-docs method: one branch or small related cluster per exchange, concrete alternatives and a recommendation, then wait and probe the answer. A vague answer such as “more editorial” is not a locked implementation decision. Explain what it changes on desktop, mobile, and the graphics canvas. Do not reopen the protected institutional mystery.

| Decision ID | Ask and drill into | Record before dependent work |
|---|---|---|
| GS-D01 | Which remaining color states, overlays, focus/error treatments, spacing, surfaces, and motion are actually unresolved after the supplemental specs? What should each feel like in each register? | Exact additions in the relevant local design spec, with date and rationale |
| GS-D02 | For each unfinished route, what owns the viewport, what interrupts it, where is the material cut, and how does that change on a narrow screen? Confirm installation treatment and five Shop scenes. | Approved route composition, mobile counterpart, transitions, and refused defaults |
| GS-D03 | Which existing Shop/identity/share images are acceptable, which need reworking, and which must be new? What copy and crops are approved? | Graphics IDs, source selection, dimensions/safe areas, and approved text |
| GS-D04 | What remaining campaign copy needs approval, including assessor credit removal, campaign oath shell, success sequence, and error messages? | Copy-lane decisions linked to affected slots; no changes to poster text |
| GS-D05 | What are the final domain, cross-site seam destinations, legal/contact details, and treatment of former `/crisis` links? | Configuration values and redirect map; sensitive credentials stay outside documentation |
| GS-D06 | Confirm launch without an unproduced film or unverified live number; what event will activate each? | Explicit deferred-release record and activation checklist |

For every answer, record **decision, rationale, authority file, affected routes/assets, and what remains open**. Update this checklist and the graphics brief in the same pass. Do not demand approval again for previously settled choices. Unanswered production decisions block only dependent work; they must never silently acquire generic defaults.

## 4. Route completion contract

For every row, retain semantic live text, keyboard access, visible focus, responsive recomposition, and the correct author. The six-part composition requirement in the design authority is binding.

| Route/surface | Required finished behavior and composition | Graphics / acceptance |
|---|---|---|
| `/` | Text-free Clean Man hero with live command and roughly two-second self-clearing steam; Unholy emphasis; campaign mechanic invitations; compact configured CWAAA seam; late creator exit | GS-G01–03. No home quiz/form duplication; returning visits do not flash fog; reduced motion reveals immediately |
| `/psas` | Five intact posters in the approved broadcast/installation composition, independently reachable and identifiable on mobile | GS-G02, GS-G00. Re-measure wide/portrait hotspots; 44×44 CSS-pixel minimum targets in the existing contract; no equal poster grid |
| `/psas/[slug]` | Five distinct environments, complete poster view, live case note, share/download, lightbox and sequence navigation | GS-G00. Preserve running order, no canonical crop, keyboard/Escape/focus return work; neutralized renders remain distinguishable |
| `/sniff-test` | Campaign-authored one-question steps; announced progress; keyboard answers and usable fallback; no personal profile | GS-G04 on outcomes. All answer paths terminate correctly; ownership correction passes copy review |
| `/sniff-test/[verdict]` | Four identity verdicts with no visible numeric score; correct sharing/download target and campaign tone | GS-G04. Each static URL renders the correct verdict and preview; clipboard fallback gives usable feedback |
| `/pledge` | Campaign declaration and campaign visual voice; accessible shared fields; truthful submission state; `SWORN`, share/copy, then conditional “Want to Learn More?” | GS-G05. Shared fulfillment tests below pass; no Office filing voice or nonprofit paperwork skin |
| `/shop` | Five image-owned editorial scenes; oversized names, short sells, secondary prices; narrow text Supply Index | GS-G07. Each product has a distinct register/crop/rhythm; no product grid or cart simulation |
| `/shop/[slug]` | Full-bleed hero, severe material crop, specification block, one price, restrained unavailable purchase control, previous/next | GS-G07. No ratings, recommendations, accordions, tabs, or thumbnail carousel; unavailable behavior is deliberate and accessible |
| `/about` | Campaign frame opens into late Stacey/Hope2 Studio authorship and the real Behance destination | GS-G06 if needed. Disclosure remains behind this seam, not in public campaign navigation |
| `/404` and legal access | Campaign missing-broadcast response; globally reachable Privacy, Terms, DMCA with truthful data/rights/contact information | Live HTML/CSS. No Office-style denial; deep links and return navigation work |
| `/broadcast` | Reserved canonical future film premiere; build/activate only with approved film and launch decision | GS-L01. Until then omit film-promoting controls; do not invent footage or imply a live premiere |

## 5. Integration and extraction requirements

Retain Astro static output, vanilla TypeScript, self-hosted fonts, Netlify compatibility, centralized content/config, canonical URLs, sitemap, robots, and route-specific previews. Do not add a CMS, client framework, checkout, accounts, or another profile/email provider to finish this scope.

The launch implementation must add conditional `CWAAA_SITE_URL` handling in the central configuration module. Empty values render no dead links. Keep the Office out of campaign navigation. Audit hard-coded `/crisis` links, home component content, footer seams, metadata, and share URLs; a path change alone does not remove inherited nonprofit authorship.

Use [CWAAA's fulfillment requirements](../cwaaa/PRD-TO-LAUNCH.md) as the shared delivery workstream. Confirm receipt of the submission before displaying production `SWORN`; a skipped request, opaque response, or swallowed exception is not confirmation. Unconfigured preview behavior must be explicit and cannot pass the production release gate. Implement visible retry/error states and a verified non-JavaScript submission path. No secret belongs in client code.

Keep the two pledge JSON files byte-identical. Test both public presentations against one audience, exactly two messages, withdrawal before the delayed issue, unsubscribe, no duplicate resend, no provider-added third message, and no field values in analytics. Do not infer provider capabilities from the old embed; verify the chosen Buttondown integration during implementation and document it before shipping.

Follow [the migration manifest](../cwaaa/docs/migration-manifest.md): copy and verify first; remove combined CWAAA material only after the standalone replacement, both pledge paths, actual destination URL, and approved redirects work. Do not delete shared functionality or optimized seam assets still needed by Got Soap?.

## 6. Milestones and release evidence

| Order | Responsible party | Output / exit criterion |
|---|---|---|
| GS-M1 | Claude + Stacey | Fresh gap inventory and interview decisions; classify all graphics as reuse, rework, new, or deferred |
| GS-M2 | Claude | Approved campaign route compositions implemented with dimensionally correct development placeholders; preserve working interactions |
| GS-M3 | Stacey, then Claude | Final GS-G01–07 art approved, optimized, integrated, and tested in actual layouts; existing GS-G00 preserved |
| GS-M4 | CWAAA implementer + campaign implementer | Shared verified pledge/email integration and both presentations pass end-to-end tests |
| GS-M5 | Claude + Stacey | CWAAA extraction verified; domains and redirects approved; obsolete local routes/content retired; legal and metadata audit complete |
| GS-M6 | Claude, then Stacey | Production build, all checks, browser evidence, and final design/art review pass; deploy and smoke-test configured origins under the implementation task's authorization |

Run from `../site/`: `npm run build`, `npm run audit:fonts`, `npm run gates`, `npm run copy-gates`, `npm run fidelity`, `npm run distinguish`, and `npm run authority`. Use `npm run gates:prod` for production readiness, not merely the development gate. If authority tooling changes, also run `npm run authority:test`.

Keep fresh desktop and 390×844 mobile evidence; test narrow screens, keyboard-only use, 200% zoom, reduced motion, high contrast, slow/erroring network, share fallback, form retry, and absent cross-site configuration. Meet the existing WCAG 2.2 AA, initial JS under 100 KB compressed, LCP under 2.5 seconds, CLS under 0.1, and documented Lighthouse targets under their stated test profiles. These are release targets, not claims about the current build.

The frozen combined-copy fidelity artifacts currently encode content that must change for extraction. Prepare a traceable approved replacement proof baseline through the copy protocol; keep legacy evidence until the new route/content proof is accepted. Never weaken tests or leave a red fidelity check merely because the old proof describes the combined site.

**Launch is blocked by:** missing final launch art, unresolved route-critical design/copy, unverified pledge fulfillment, incomplete CWAAA replacement, wrong/dead domains or redirects, missing legal access, failed production checks, or unapproved final art direction. A green development build alone is insufficient.

## 7. Later work — keep visible after launch

| ID | Deferred item | Activation requirement |
|---|---|---|
| GS-L01 | Film production, `/broadcast`, homepage premiere seam, film stills/captions/poster | Approved film, accessible media assets, playback/performance plan, and owner activation decision |
| GS-L02 | Live campaign phone/IVR and printed call-in material | Owner-controlled callable deployment, two approved voices, canonical script/hash continuity, no audible transfer or invented operational explanation |
| GS-L03 | Poster 5 minimalist social variant, extra social campaigns, business cards and event collateral | Separate artwork/copy approval; canonical posters remain unchanged; no new web launch dependency |
| GS-L04 | Citation-path mechanic or future generators | Resolve authorship and safety/consent scope through an approved product/copy decision before implementation |
| GS-L05 | Real transactions or ongoing marketing | Separate product approval and contracts; neither is implied by faux Shop or Form CW-1 |

Carry these IDs into the completion report with status, next action, and owner; do not silently delete deferred items when closing the launch task.

## Handoff verification — 2026-09-07

The six launch/graphics documents were checked for valid local links and defined graphics IDs. The existing combined application passed fresh `build` (22 pages), `gates`, `copy-gates`, authoritative `fidelity` (55/55), `distinguish`, and `authority` checks. `audit:fonts` passed with 0 errors and reported 7 restricted fonts and 19 unassigned files. Those warnings do not approve additional font delivery.

Runtime source, shared/portable contracts, canonical IVR PDF and frozen copy evidence retained their pre-handoff content hashes. These results validate the documentation delivery against the unchanged combined runtime; they do not certify a standalone site, final graphics, live email service, or production deployment. Re-run the release tests in this PRD after implementation. No deployment was performed by this documentation handoff.
