# Canon — Billy Bob and the archive boundary

**Owner canon, 2026-09-15.** Authority: this file governs the unindexed records and the pagination
mechanic. Shared jurisdiction is in `../../docs/world/WORLD-BIBLE.md` §Record classes; CWAAA's voice
law is in `world-bible.md`; rendering law for an embedded external finding is in `../design.md`.

## 1 · The mechanic

Pagination is the world-building. Nobody clicks a door marked SECRET. They click **Next**, the most
ordinary thing a website offers, and the archive fails to stop them where it should.

- The Recovery Stories index lists only the public records. The unindexed records are absent from the index, search and filter, the sitemap, and all ordinary navigation or promotional surfaces. The sole route from the public archive into the unindexed sequence is the active Next control on the final public record.
- Each opened record carries `← PREVIOUS RECORD · ALL RECOVERY STORIES · NEXT RECORD →`. There is no
  count and no "4 of 10" — a count tells the visitor exactly where the boundary is.
- **The last public record retains an active Next.** It is never disabled. Following it loads Billy
  Bob.
- Billy Bob's `ALL RECOVERY STORIES` returns to the ordinary index, where he is conspicuously
  absent. The site denies that the page you are standing on belongs to the collection.
- In the completed sequence, Billy Bob retains an active Next. Beyond him, the records become progressively less CWAAA and more Office, until the CWAAA template is no longer the thing rendering the page.

**The site's mistake is bureaucratic, not theatrical.** No glitch, no red warning, no classified
stamp, no hacker aesthetic, no spooky effect, no wink. Someone failed to terminate public pagination
at the correct record. That is the entire event.

### Owner ruling, 2026-09-22 — three records, and pure subtraction

**The sequence past Billy Bob is records 7, 8 and 9.** At record 9 the CWAAA document has failed to
continue and an Office state remains. Record 9 is not a page that has become mostly a giant Office
document.

**The gradient is subtraction from CWAAA's side against fixed Office authority.** CWAAA material
progressively disappears. The Office does not become louder, more theatrical, or more verbose; it
holds exactly the register it holds inside Billy Bob's record. It simply begins answering the
questions CWAAA no longer answers. The most unsettling available reading is that the Office has not
changed at all, and that these are records where CWAAA has less permission — or less ability — to
speak.

The Office may issue additional distinct findings where a record requires them. An individual
fragment never grows into exposition.

**Three resolutions are rejected by name, because each is the obvious clever move and each will be
proposed again:**

1. *The fragment grows* until CWAAA is a masthead and a closing line. Too visibly designed; it makes
   the Office perform the takeover.
2. *Diction contamination* — CWAAA's own fields filled in with the Office's vocabulary. It violates
   the authorship boundary in `../../docs/world/WORLD-BIBLE.md` §Record classes. **CWAAA never
   begins speaking like the Office.**
3. *Subtraction plus diction.* Stronger as horror, weaker as world logic; it muddies who authored
   what.

### Owner ruling, 2026-09-23 — record 7 is the record that loses its ending

**Record 7 stops answering "did he come back?"** CWAAA is sincere, complete and unremarkable through
`External review requested`, and then the record stops. The return is not withheld, not redacted and
not marked pending: the row is simply not in the document, the way a row is not in a document when
the thing did not happen.

**The gap stands at record 7.** The Office's fragment here is exactly what it is inside Billy Bob's
record — one finding, its disposition a bar — and it answers nothing new. The Office begins
supplying the answers CWAAA has stopped giving further down the sequence, never at the first step. A
new Office line arriving at the same moment the CWAAA form ends would give the reader something to
look at instead of the hole.

Derived shape (Vivian, pending draft approval; the two rulings above are owner decisions):

- **Survives, in CWAAA's ordinary format:** masthead and identifier, participant name and age,
  referral block, reporting-party statement, participant testimony, the full chronology through
  final voluntary contact, the caseworker field note, and `External review requested`.
- **Absent:** `returned`, `followUp`, `partnerFollowUp`, `followUpImage`, `closeNote`, and every
  recovery row in the close block.
- **The subtraction lands on a string the reader has already read.** Billy Bob's close ends
  `External review — Requested. Case returned.` Record 7's reads `External review — Requested.`
  Two words, ninety seconds later.
- **The summary block renders two rows, not three.** What he believed, what it cost him. There is no
  third beat, because the third beat is the return. The top of the record rhymes with the bottom
  before the reader knows what is missing.
- **Name and age survive.** Personhood is not what record 7 loses; spending it here would blur which
  question went missing.
- **Photograph:** `Photograph on file · not reproduced`, unaltered. That wording is protected and is
  not to be softened here either.

**Record 7 is data-only.** Verified against `src/pages/recovery-stories/[id].astro` on 2026-09-23:
`arc`, `fragment`, `returned`, `followUp`, `partnerFollowUp`, `followUpImage` and `closeNote` are
already conditional, and the pager derives Next from the sequence. Appending record 7 with
`open: true` and `public: false` restores Billy Bob's Next with no code change.

**Record 7 will ship with a pending Next of its own until record 8 exists.** Carry `nextPending`
down to it. The rule does not change one level deeper: not a stub, not a placeholder, and never a
Next pointing at a 404.

**Staged, not decided.** Record 8 and record 9 have a length and a law (subtraction against fixed
Office authority) but no ratified content. Do not infer them from record 7.

### Owner architecture, 2026-09-25 — record 7 is Derek; three corrections to the 09-23 entry

Record 7 is **Derek**, a nightclub DJ referred independently by multiple prospective romantic
partners. Record 8 is **Carlos Eduardo**. Source: `../derek.md` (owner, 2026-09-25), which governs
Derek's field architecture.

Three items in the 09-23 entry above are superseded:

1. **No summary block.** Derek carries no `arc`. The three-beat summary ends on what he does now, and
   Derek has no documented now. He uses the ordinary Brayden opening instead. The 09-23 proposal of a
   two-row arc is struck.
2. **Derek has a real participant photograph** — himself in the DJ booth, submitted by the
   participant, outwardly groomed and plausibly a man who gets dates. The 09-23 proposal of
   `Photograph on file · not reproduced` is struck. No odor haze, no disgusted crowd, no bathroom
   substituted for the man.
3. **The copy is data-only; the photograph was not.** `close`, `arc`, `fragment`, `returned`,
   `followUp`, `partnerFollowUp` and `closeNote` are all conditional, so the subtraction needs no
   code. `photos` in `src/pages/recovery-stories/[id].astro` is a hardcoded slug map; the owner
   supplied Derek's portrait 2026-09-28 (`src/assets/derek.png`) and it is wired in and shipped — he
   no longer renders the placeholder.

Also fixed by that architecture: there is no empty block where the removed fields belong. The page
proceeds from the Office fragment to the ordinary lower controls — pledge row, then the pager.

### Build status, 2026-09-15 — an unfinished edge, not a finished one

`/recovery-stories` ships with the crossing live: the last written public record's Next loads Billy
Bob, who is absent from the index he returns to. **Billy Bob currently has no Next of his own, and
that is record 7 not being written — it is not a decision that the archive ends at him.**

Owner decision, 2026-09-15: ship it this way rather than point Next at a record that does not exist.
A 404 there reads as a broken site, and a broken site is an innocent explanation for the boundary
the visitor has just crossed. It hands them a way to dismiss the hole instead of falling through it.
A fake door is worse than no door.

**Two ways a future pass could wrongly "resolve" this, both of which destroy the mechanic:**

1. Concluding that Billy Bob is simply the last record, and collapsing the `public` /
   sequence divergence in `src/content/copy.ts` into one list. That divergence is the mechanic
   (section 1) and must survive every tidy-up.
2. Restoring his Next by linking to a stub, a placeholder, or a record invented to fill the slot.
   Record 7 is authored work — Vivian plus the Office package — and it is the piece that turns Billy
   Bob from a bonus record into a floor giving way. It is the highest-leverage remaining work on
   this route.

When record 7 exists, append it to the sequence with `open: true` and `public: false`; the pager
restores his Next with no code change. The marker in the data is `nextPending` on his record.

**Update, 2026-09-28:** record 7 (Derek, `RC-073`) is appended from `../derek.md`. Billy Bob's Next
is restored and `nextPending` now sits on Derek: record 8 (Carlos Eduardo) is the unwritten edge, and
the same two wrong resolutions above apply one floor down. His photograph (`src/assets/derek.png`) is
owner-supplied and shipped.

**`derek.md` is the sole canon on Derek (owner directive, 2026-09-28).** Nothing else — not this
file's own wording, not a proposal draft, not any other session's paraphrase — is authoritative
where it differs from that file. (An earlier r1 proposal draft with unapproved values — age 31,
`RC-071`, invented dialogue and dates — has been deleted for exactly this reason: it was a duplicate
that could be mistaken for canon. If a future session finds another one, delete it rather than
reconcile it.) The owner substantially
rewrote `derek.md` the same day this update was first written: new referral fields
(date-preparation substitute, cleansing frequency, post-performance cleansing, cleansing before
dates, close-contact impact, awareness of concern), a rewritten case chronology, a rewritten
caseworker field note, and a second redacted value in the Office fragment (`PARTICIPANT PRESENT`,
not only `DISPOSITION` — Billy Bob's finding withholds one value, Derek's withholds two). The
`[id].astro` fragment renderer was generalized from a single `dispositionLabel` to a `redactions`
array to support this; Billy Bob's data was migrated to the new shape with no content change.
**Owner-ratified 2026-09-28 (same day, after this entry was first written):** derek.md's two `TBD`
markers are filled — `External review requested — May 19, 2026` and `REFERENCE: 26-1407` — and both
values are shipped in `src/content/copy.ts`, matching Billy Bob's `March 11, 2026` / `26-1183`
precedent.

**Owner architecture, 2026-09-28 (third revision same day) — "IMPLEMENTATION NOTES" appended to
derek.md, status raised from DRAFT to OWNER-APPROVED CONTENT.** The rewrite added a section
explicitly marked "not page copy" — build guidance, not record content — narrating the intended
purpose plainly: *Billy Bob establishes that the Office intervenes. Derek establishes that the
Office can keep the ending.* This is the first record where the reader is meant to notice the Office
is not merely cited but in control of what the archive is allowed to say. Implemented same day:

- The Office fragment is the same shared component Billy Bob's uses (border, paper, monospace,
  padding, heading) with no Derek-specific styling, stamps, glitches, animation, sound, or hover
  behavior — already true; verified, not changed.
- Redaction bars carry `aria-label="Redacted"` (was `"redacted"`) on both records, remain solid in
  print (`print-color-adjust: exact` added — browsers otherwise silently drop background color when
  printing), and expose no hidden or hoverable text.
- **A new `.fragment--terminal` modifier** gives a record a deliberately larger pause (96–128px
  desktop, 64–80px mobile) between the Office fragment and the ordinary pledge/pager row, applied
  only when nothing recovers after the fragment (`fragmentIsTerminal` in `[id].astro`: true when
  `returned`, `followUp`, `partnerFollowUp`, `followUpImage` and `close` are all absent). Derek gets
  it; Billy Bob, whose fragment is followed by his return, does not. No placeholder, empty card or
  message renders in the gap — it is whitespace only.
- Confirmed: nothing renders after Derek's fragment but the pledge row and pager, and his Next
  control is genuinely absent (not disabled, not empty-but-present, not linked to a placeholder)
  until record 8 exists — this was already the shipped behavior, re-verified against the new note.

## 2 · Billy Bob — character

Billy Bob, 37. Appalachian coal country, underground coal miner, married, shares a home and a bed with his wife.

His region and occupation are context, not the satirical target. The target is his theory, his
continued refusal despite obvious consequences, and the disproportionate institutional machinery that
ordinary soap use eventually summons. No trait of his requires defending; nothing in this file
certifies his character. (Owner correction, 2026-09-15: an earlier paragraph here listing
protective adjectives was writer-fabricated, not owner canon, and is struck.)

**He does not wash.** (Owner canon, 2026-09-15, stated after multiple drafts reintroduced the
opposite.) Not on Saturdays, not on Sundays, not on days he does not go underground. Before the
Office there is no cleansing routine of any kind and no mitigating hygiene anywhere in his
before-state. Do not invent mitigating hygiene, compensating virtues, or unrelated admirable traits to soften his refusal. Conversely, do not invent unrelated cruelty or vice to justify condemning him. This file makes no claim about his character outside the documented behavior. The refusal itself is sufficient. **Any
line giving him partial credit — a days-off wash, a weekend wash, "I'm not a dirty man" — is struck
on sight and is not to be reintroduced in any variant.** His total refusal is precisely why ordinary
CWAAA intervention fails and the Office is brought in: a man who washes on his days off is an
efficiency eccentric, not a refusal case, and the escalation stops making sense.

Billy Bob’s stated rationale is simple and fixed: because another shift will make him dirty again, he treats every opportunity to wash as pointless. This is not an efficiency principle, and the narration must never validate it as one. It is a self-serving rationalization that ignores the hours he spends at home, his non-working days, the residue he transfers to shared furniture and bedding, and his wife’s repeated objections. He understands those consequences and refuses anyway. The next shift does not prevent him from washing; he uses it to justify never washing at all.

Write his position in his own matter-of-fact voice, close to: “I’m going right back underground in the morning. What am I washing for tonight when I’ll be covered again tomorrow? Never saw much point in washing just to get dirty again.” Billy Bob delivers this as though it settles the matter. This quote records his refusal; it must never be interpreted as evidence that he showers tonight, between shifts, on non-working days, or at any other time before Office intervention. He does not wash.

He believes his excuse; the record does not endorse it. Do not describe his position as sympathetic, reasonable, persuasive, practical, honorable, optimized, or an understandable adaptation to mining. Never write “soap’s for sissies” or turn him into a macho caricature. His refusal is not about masculinity, incapacity, misunderstanding, or Appalachian mining culture. It is stubborn, self-serving disregard: he has decided that temporary cleanliness does not count, even when his wife must live and sleep with today’s coal dust.
## 3 · Why he escalates

His non-washing creates the case. What carries it beyond ordinary CWAAA intervention is informed, sustained refusal—not dirtiness alone and not the severity of the residue.. **The threshold is refusal, not severity.** Billy Bob understands the
recommendation, is physically able to follow it, understands why his wife wants it, and rejects the
premise. He has moved from a hygiene problem to ideological noncompliance — internal language, never
CWAAA's public wording.

The documented progression: partner referral after multiple household conversations → CWAAA outreach
→ baseline materials → participant acknowledges materials, disputes necessity → follow-up, behavior
unchanged → second intervention, household consequences discussed → continued transfer of mine
residue to shared bedding → **EXTERNAL REVIEW REQUESTED**, unexplained.

`SHARED-SURFACE IMPACT` is canonical and stays: hilariously clinical for a man turning the marital
bed black.

## 4 · The interval

An unexplained gap sits between referral and return. Dates are production decisions; the gap is
canon. CWAAA documents both ends and nothing between. The absence is the joke, and the audience
writes something funnier than we could. (Owner correction, 2026-09-15: a writer-fabricated sentence
closing off what the interval could contain is struck. The interval is unknown, and stays unknown.)

## 5 · The return

Billy Bob is not traumatized, robotic, frightened, or a different man. Billy Bob returns behaving as though the value of washing has become self-evident. He offers no account of how or why his position changed.The follow-up records post-shift showering, cessation of
residue transfer, bedding returned to baseline, no difficulty maintaining the routine. Asked what
changed his position, he says:

> "Makes sense to wash up."

**Do not make the quote bigger.** No "I learned a lot at the Office," no vow, no thousand-yard
stare. The closing CWAAA line is “Partner reports that shared bedding has remained within baseline since the participant’s return.” The word return is the record’s only acknowledgment of the interval. CWAAA records no destination, event, or explanation between the external-review request and the case’s return.

## 6 · Fixed and deliberatel unfixed

Billy Bob, age 37, and the identifier RC-064 are owner-locked. Physical appearance, town, mine, wife’s name, exact dates, and the precise duration of the interval remain production decisions and must not be invented into permanence here.

## 7 · Brayden and Billy Bob, canonically paired

Brayden demonstrates what CWAAA does. Billy Bob demonstrates what happens when CWAAA is not enough.
Brayden's file must read as mundane for Billy Bob's to land; this is why Brayden's record is
deliberately the least strange document on the route.
