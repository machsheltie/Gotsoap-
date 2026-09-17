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
