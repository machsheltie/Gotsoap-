# Decision note — 2026-09-15 — records that are not open yet

**Status: implemented, awaiting owner ratification.** This changes route behaviour, not canon, and it
is flagged here because it adds a second divergence to a mechanic the surface brief protects.

## What three blind readers hit

`/recovery-stories` listed five men. One record (RC-022 Brayden) was written. Four — RC-031 Chad,
RC-039 Marcus, RC-047 Gary, RC-058 "Kaelthas" — had an approved first-person quote and nothing else,
because their referral block, chronology and outcome are Vivian rounds that a builder must not invent
(surface brief §8). Their pages rendered a masthead, a photograph placeholder and a footer.

Every reader clicked more than one and stopped clicking.

- Maya: "the index page is the best page on the site and clicking anything on it is a 60% chance of
  nothing." And: "the four empty records did more damage to my trust than any line on the site."
- Dylan: "I clicked Kaelthas first because he was most me, got nothing, clicked Chad, got nothing,
  and stopped clicking record links. That's where a real visit ends: two dead clicks and out."
- Priya: "Four clicks, four empty rooms. This is where I would have closed the tab in real life…
  worse than a bad page — it retroactively makes the good pages feel like a demo."

## What changed

Each record carries `open: true | false` alongside `public`.

- `open: false` — **no page is emitted.** The entry stays on the index, at full length, as a reading
  block rather than a link, with no "Read the record" action. His testimony is already complete
  there: these index quotes run to six sentences and the index truncates nothing, so a reader loses
  nothing that was ever written. Brayden and Billy Bob are `open: true`.
- Pagination walks the emitted sequence, so Brayden's Next loads Billy Bob and is never disabled.

## Why this and not the alternative

The alternative was to keep the four pages and give them a holding state. Rejected: a masthead over
an empty field is not a record, an in-fiction apology for an unwritten file is a worse lie than
silence, and a holding state is exactly the "labeled slot" failure the same three readers named in
the photographs.

## What it does to the archive boundary

Nothing. The boundary mechanic is that Billy Bob is absent from the index and reachable only by
following the last public record's Next, with no count anywhere (canon
`docs/canon-billy-bob-and-the-archive-boundary.md`). All of that holds: the index still omits him,
his Next is still live, his ALL RECOVERY STORIES still returns to an index he is not on. The brief's
warning — that the divergence between index and sequence must not be refactored away — is honoured;
this adds a second, different divergence in front of it, which is the part that needs the owner's
signature.

**It reverses as each record is written.** Set `open: true` when Vivian's referral, chronology and
outcome for that man are ratified, and his page and his link return with no other change.
