---
version: 1
slug: "cwaaa-src-pages-recovery-stories-astro"
primary_target: "src/pages/recovery-stories.astro"
related_targets: ["src/pages/recovery-stories/[id].astro", "src/content/copy.ts", "cwaaa/src/pages/recovery-stories.astro", "cwaaa/src/pages/recovery-stories/[id].astro"]
---

# Surface brief — /recovery-stories and /recovery-stories/[id]

**Confirmed 2026-09-15. Mode: Read.** Findings is a monument; this is the opposite surface and must
feel it. Authority: `../../design.md` §Recovery Stories, `../../docs/world-bible.md` §Recovery
records, `../../../docs/world/WORLD-BIBLE.md` §Record classes, `../../../docs/HANDOFF.md`
(owner decision 2026-09-15, jurisdictional split).

## 1 · Job and audience

A woman arriving from the Findings referral or the home recovery voice, wanting proof that a man
actually changed. Secondarily the referred man, checking what he is walking into. Success: she reads
more than one, and passes one along.

## 2 · Outcome and proof

Six records. Five lift from `../../../site/src/content/copy.ts` `crisis.caseFiles.files` —
RC-022 Brayden 27, RC-031 Chad 29, RC-039 Marcus 34, RC-047 Gary 46, RC-058 "Kaelthas" 22. The
sixth, Billy Bob (Appalachian coal miner, bathing-is-pointless-if-I-go-back-down), is authored for
this build and is the route's only severe case. Brayden's home quote stays byte-identical to
`src/content/copy.ts` `home.voice.quote`; the index must not contradict the homepage.

## 3 · Selected direction

**Index — a reading column, not a roster.** Six entries stacked full width, alternating ivory and
white, separated by full-bleed hairlines. The participant's own sentence, set in Modest, is the
largest element on the page: on Findings the number was biggest, here the voice is. Photographs are
modest-scale and deliberately un-uniform in crop and offset, because they were submitted, not
commissioned. Never a card grid, rank, or carousel. No fracture.

**Detail — two states of one man, in his order.** Masthead carries `RECOVERY RECORD · RC-NNN` in
Catesque; this is the identifier's first and only legal appearance. Then the referral as received.
Then his photograph, retained as received. Then testimony in Modest — the widest, quietest field on
the site. Then a sparse dated chronology, then the outcome and next action. Foot: previous/next
record. No related-stories row. Single fracture: the referral's field labels intrude into the reading
column's left margin.

**The archive boundary (canon 2026-09-15,
`../../docs/canon-billy-bob-and-the-archive-boundary.md`).** Billy Bob is **not on the index**, not
in search, not in the sitemap, and not linked from any ordinary surface. Every opened record carries
`← PREVIOUS RECORD · ALL RECOVERY STORIES · NEXT RECORD →` with no count — a count tells the visitor
where the boundary is. The fifth public record's Next is never disabled; following it loads Billy
Bob. His `ALL RECOVERY STORIES` returns to the index where he is absent, and he keeps a live Next of
his own. No secret-area treatment of any kind: the site's mistake is bureaucratic, not theatrical.

**Billy Bob's record extends the format the other five taught.** It begins identically, then keeps
going — partner referral, prior conversations, materials provided, participant declines, follow-up,
continued non-cleansing, second referral, environmental transfer, shared-surface impact — and carries
one embedded external finding rendered per `design.md`: stark white, Courier, black institutional
type, its own reference number, small, unlinked, uncaptioned, unexplained. CWAAA's record resumes on
the next line with a follow-up and no account of the interval. His revised position on bathing is
stated plainly and his reason for it is unremarkable. No horror.

## 4 · Record vocabulary (canon-bound)

The referral and the case are CWAAA's: reported concern, relationship to reporting party, supporting
materials, participant acknowledgment, intervention provided, follow-up interval, current status,
case status, outcome. Audit, finding, compliance status, and disposition are the Office's and appear
only inside the embedded fragment. Brayden's owner-supplied audit block converts to a Level-1
referral; his profile statement, the fish, and the 10/10 demand carry verbatim. `Disposition: Lather
required` leaves his file and is reserved for Billy Bob's fragment. Exact field names are Vivian's.

## 5 · Scope and boundaries

New: `src/pages/recovery-stories.astro`, `src/pages/recovery-stories/[id].astro`, a
`recoveryStories` export in `src/content/copy.ts`, redirects `/case-files` and `/case-files/[id]`.
The content module carries one ordered sequence with a `public: true|false` flag per record;
`getStaticPaths` emits every record, the index maps only the public ones, and the sitemap
integration excludes the rest. Pagination walks the full sequence — that divergence between index
and sequence is the entire mechanic and must not be refactored away by a future tidy-up.
Untouched: tokens, `BaseLayout`, `Nav`, `Footer`, `Seal`, `ImageSlot`, home, findings. Modest
activates here and nowhere else. MORVI and Mirk Slab stay out — no monumental figure on this route.
No second form; self-report stays with Got Soap?. Anti-goals: card grid, mugshot rank, dossier or
manila styling, evidence board, carousel, stock testimonial, still life.

## 6 · States and ranges

Six now; must hold at 3 and at 20. Brayden has `src/assets/brayden.png`; the other five render
`ImageSlot` placeholders carrying the CW-G04 spec and safe zone, ready for owner drop-in. Quote
length runs 1 to 6 sentences and the index truncates nothing. Verified: no-JS reading path,
images-off comprehension, bad `[id]` to 404, reduced motion.

## 7 · Interaction and layout

Whole entry is the link target, 44px minimum. `data-reveal` staggering as on Findings; photographs
on `--dur-photo`. Phone: single column, referral fields become labeled stacked pairs, never
horizontal scroll.

## 8 · Open decisions a builder must not invent

- All dispositions and chronologies are Vivian's, then blind readers. First-person quotes from the
  five approved men are untouched.
- Exactly one embedded external finding at launch, on Billy Bob. Publicly indexed records carry
  none. Records past the boundary beyond Billy Bob are staged, not built in this pass.
- Billy Bob's identifier, age, town, mine, wife's name, dates, and duration are production decisions
  and are deliberately unfixed in canon. Choose the minimum the copy needs and nothing more.
- The pager's middle link reads `ALL RECOVERY STORIES`. `Case Files` is a retired label and stays
  retired in navigation.
- No Office citation anywhere else on this route. `/findings` still carries none; About keeps the
  deep referral.
- CW-D04 (Recovery roster) moves to resolved in `../../PRD-TO-LAUNCH.md`; five portrait specs are
  added to `../../GRAPHICS-TO-MAKE.md` under CW-G04.
