# Order — faux shop + legal pages (the /about satire-conceal move)

**Origin.** Phase-6 re-read: Maya + Priya both cooled at `/about`-as-pitch-deck (2/2 convergence). Owner
fix (better than rewriting the section): **take the earnest pitch out of the main path.** The nav
"About" becomes a **faux Shop**; the real `/about` stays but is reached only via the footer credit line,
which already links to it. Onion model — no "this is satire" sign at the front door; the legal cover
lives in the footer.

## Architecture (decided)
- **Nav:** `About` → **`Shop`**, pointing at a new **`/shop`** route. `/about` is **not deleted and not
  moved** — it stays at `/about`, removed from the nav, still reachable via the footer credit
  **"Produced by Hope2 Studio · Directed by Stacey Breckel"** (which already links there — verify the
  link still resolves after the nav change).
- **Footer legal row, below the credit line:** `Terms of Service` · `DMCA` · `Privacy Policy`.
- **No new footer "About" link** — the credit line already is one.

## The governing principle: the footer is the airlock
**The site is 100% real above the footer. The fourth wall breaks ONLY in the footer** — the credit line
→ `/about` (the human reveal) and TOS/DMCA/Privacy (the legal reality). Everywhere else — home, psas,
crisis, pledge, sniff-test, **and the Shop** — never winks, never spoils, holds the line. The Shop is a
real Got Soap? store, played completely straight. The joke is that a real store exists for a "fake"
campaign; the copy never says so.

## Decisions (resolved by owner)
1. **Register: campaign — Got Soap?-specific merch.** Not CWAAA. (CWAAA gets its own site later — see
   `docs/strategy/cwaaa-divergence-roadmap.md`.) Campaign visual system, campaign voice, never blended.
2. **Cart dead-end: prices + descriptions listed, "Coming Soon!" beside each grayed-out "Add to Cart."**
   For now. Reads as a real store about to open — takes no money, promises no fulfillment, doesn't spoil.

## Part 1 — Shop design + nav (Fable, build lane)
- New `/shop` route; relabel + repoint the nav item; `/about` delinked from nav, credit-link verified.
- Visual system consistent with home + `/psas` (same tokens, type roles, register-switching rule).
- Believable-store layout: product grid, product cards, price, cart affordance, a product-detail
  pattern. The joke is in the copy and the products, not in the chrome.
- Implement the "add to cart" dead-end chosen above.
- Route the nav label + all shop chrome through `copy.ts` (single source), same as every other surface.

## Part 2 — Product copy (Vivian) — IMAGES ARE IN (`site/src/assets/shop/`)
Five mockups delivered (owner will swap higher-quality Photoshop assets later; these ship now):

| Asset | Product | Printed hook |
|---|---|---|
| `gotsoapsoap.png` | cream "got soap?" embossed soap bar | the wordmark, as literal soap |
| `gotsoaphat.png` | black dad hat, embroidered | "got soap?" |
| `gotsoaptshirt1.png` | black tee, distressed print | "got soap?" |
| `gotsoaptshirt2.png` | black tee | **"CLEAN IS THE NEW SEXY."** |
| `gotsoapwaterbottle.png` | black matte bottle | **"SMELL LIKE EFFORT."** |

- Vivian writes descriptions **from the mockups**, campaign register, invoking `vivian-vane`.
- **Sell around the printed line.** Two products carry a campaign line already (the hook); the plain
  three carry the wordmark. The description is the retail pitch, not a re-print of the line. "SMELL LIKE
  EFFORT" quietly echoes `/about`'s "made effort the thirst trap" — lean into the universe, never
  explain it.
- **Build hygiene (Fable):** the mockups carry a corner generation-artifact (✨) — crop it out of the
  web derivatives. They're ~1.2–1.4 MB PNGs → generate optimized WebP/AVIF responsive sizes per the
  CLAUDE.md asset rule; do not ship the originals.
- **Bar for each product:** believable, funny, clever, and **something a bro would actually want to
  buy.** It reads as real retail copy that happens to be sharp — never a wink, never a spoiler.
- Sol reviews adversarially (challenge-by-default, per the law): AI-tells, voice consistency, does each
  product hold the store's realness AND make the sale. Round cap 3, deadlocks → Stacey. Real shipping
  copy → it gets the dialectic; it does not skip to green.

## Part 3 — Legal pages (TOS · DMCA · Privacy) — **functional, not satirical set pieces**
These are the cover-your-ass documents. Get them accurate; a joke that misdescribes reality is the
*opposite* of protection. **Do not run these through the satirical dialectic** — they are straight (a
dry wink at most, Onion-style, but truthful).
- **Privacy Policy — must be TRUE and is the load-bearing one.** The site collects real data: email via
  **Netlify Forms → Buttondown** (the Lather Pledge / newsletter) and **GoatCounter** analytics (per
  CLAUDE.md). The policy must accurately state what's collected, by whom, and why. A satirical/inaccurate
  privacy policy over real email collection is a genuine liability. Truth first.
- **Terms of Service** — carries the **parody / non-affiliation disclaimer** (spec/parody work, not
  affiliated with any real brand or health org — Got Milk?, Axe, etc.; © Stacey Breckel 2025). This is
  where the satire is legally declared, matching the existing `/about` disclaimer language.
- **DMCA** — takedown/contact mechanism + a designated contact (hope2studio@yahoo.com). Note the real
  attribution surface: Freepik/macrovector assets require attribution and the model images are
  AI-generated (openart.ai) — the notice should reflect that honestly.
- **Owner check:** these are real liability documents. Recommend Stacey give them a human read (or a
  lawyer's, if she wants) before ship — I can draft, but I can't give legal advice, and these are the
  one place "trust me it's fine" isn't good enough.

## Part 4 — /about, once delinked (Vivian, small pass)
The earnest `/about` is now the *footer-discovered* page. Two things land here:
- The **Priya #1 note**: the narrator is "too immaculate." Give Stacey's voice on `/about` a light pass
  that puts her **slightly in the frame** — her own funk, her own stakes — per Priya's prescription.
- This is also where the case-study cool-off lived. With `/about` no longer on the main path the
  *urgency* of that fix drops, but if Vivian is in the file anyway, the labeled tri-fold /
  "dirty fun" closer are fair game to fix at the same time.

## Part 5 — verification + blind read (Fable builds → Opus reads)
- Build green: `gates`, `copy-gates` (CG7 still walks the killed lines), `fidelity` (update the plan if
  shop/legal copy adds rows — mind the row-count contract), clean 16→N-page build.
- **Then I run a blind read** (orchestrator-side, firewall intact) on the built site. Panel (owner-set):
  - **3 new BRO personas** (Dylan-lineage target buyers, distinct — the gym bro, the WFH low-effort guy,
    the ironic-merch guy) — the "would he actually buy this" test. I build these when the shop is a go.
  - **Maya + Priya** also contribute (she'd judge whether she'd let him wear it / whether it spoils;
    Priya judges craft + realness).
  - **Priya** additionally answers the footer/hire question.
  It answers, as evidence not opinion:
  1. Does a cold visitor hitting **Shop** read it as a real store — satire **not** spoiled early?
  2. Do the products read believable, funny, clever — and **would a bro actually buy them?**
  3. Does a hiring reader (Priya) still find Stacey via the footer credit and still reach out?
  No reader is told anything changed or that the store is a bit.

## Standing rules
- Harness exclusivity on `copy.ts` / `copy-gates.mjs` — one session at a time; coordinate with the
  fidelity session before touching copy-lane files.
- Green machine checks ≠ good copy; the shop's believability is proven by the blind read, not the build.
- Verification artifacts (any new fidelity rows / gates) are untrusted until an adversary tried to make
  them lie.
