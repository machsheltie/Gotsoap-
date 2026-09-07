# Got Soap?: task 2 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-23-transmedia-canon-authority-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

### Task 2: Make Got Soap? behavior and routes explicit

**Files:**

- Create: `gotsoap/docs/world-bible.md`
- Modify: `gotsoap/docs/design.md:11-79`
- Modify: `gotsoap/docs/design.md:188-265`
- Modify: `gotsoap/docs/prd/PRD-gotsoap-web-v1.md:28-74`
- Modify: `gotsoap/docs/prd/PRD-gotsoap-web-v1.md:74-218`
- Modify: `site/scripts/authority-check-lib.mjs:55-70`

**Interfaces:**

- Consumes: Shared emotional laws and protected unknowns from Task 1.
- Produces: Campaign behavioral authority plus canonical Shop, film, and phone ownership.

- [ ] **Step 1: Extend the campaign authority gate**

Require `gotsoap/docs/world-bible.md` and these markers:

```js
const gotSoapBible = requireFile(repoRoot, 'gotsoap/docs/world-bible.md', errors);
errors.push(...missingRequiredMarkers(gotSoapBible, [
  'EROTIC ASPIRATION',
  'POTENTIAL CONVERT',
  'WITNESS AND RECRUITER',
  'WHAT GOT SOAP? FINDS FUNNY',
  'WHAT BREAKS THE ILLUSION',
  'UTILITY VOICE',
], 'gotsoap/docs/world-bible.md'));
```

Expand the campaign PRD markers to include:

```js
'SHOP',
'/BROADCAST',
'1-800-GOT-SOAP',
'UNAVAILABLE CHECKOUT',
```

- [ ] **Step 2: Run the authority gate and confirm campaign failures**

Run:

```powershell
npm --prefix site run authority
```

Expected: FAIL for the missing Got Soap? bible and missing Shop, `/broadcast`, phone, and unavailable
checkout markers.

- [ ] **Step 3: Create `gotsoap/docs/world-bible.md`**

Use these exact sections:

```markdown
# Got Soap? behavioral world bible

## Core belief
## How behavior changes
## The man
## The woman
## What Got Soap? finds funny
## What it never jokes about
## Desire and cleanliness vocabulary
## Utility voice
## What Got Soap? knows
## What breaks the illusion
## Page feelings
## Interaction boundaries
```

Include these binding statements:

```markdown
Got Soap? changes behavior through erotic aspiration, not health education, humiliation, or shame.
The man is a potential convert, not an enemy. The woman is a witness and recruiter, not the operator
of a grievance forum. Cleanliness is the price of admission to the man he already imagines himself
becoming.
```

Define utility voice for loading, validation, error, confirmation, Shop, download, share, and film
framing. Prohibit startup jargon, public-health lectures, generic empowerment copy, and premature
Hope2 Studio explanation.

- [ ] **Step 4: Correct the campaign route authority**

Add these PRD route rows:

```markdown
| `/broadcast` | canonical campaign-film premiere | Got Soap? |
| `/shop` | canonical faux storefront | Got Soap? |
| `/shop/[slug]` | campaign product performance with unavailable checkout | Got Soap? |
```

Add requirements that:

- Shop remains canonical even while checkout says “Coming Soon!”.
- The homepage contains a full-bleed premiere seam to `/broadcast`.
- Film is staged as a campaign event, never a generic video card.
- `1-800-GOT-SOAP` appears as campaign material on Got Soap?.
- Neither CWAAA nor the Office advertises the number as a normal contact channel.

- [ ] **Step 5: Strengthen `gotsoap/docs/design.md`**

Add the campaign behavioral thesis and require every major route to name:

```markdown
1. dominant event;
2. off-axis counterweight;
3. material transition;
4. refused default layout;
5. emotional change; and
6. authorship boundary.
```

Add explicit route direction for Shop and `/broadcast`. Preserve the current anti-template
constitution, poster immutability, Sniff Test ownership, pledge edition, and late `/about` reveal.

- [ ] **Step 6: Run focused validation**

Run:

```powershell
npm --prefix site run authority
rg -n "Shop|/broadcast|1-800-GOT-SOAP|erotic aspiration" gotsoap/docs/world-bible.md gotsoap/docs/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md
git diff --check
```

Expected: authority passes; all four concepts appear in the intended campaign authorities; diff
check has no output.

- [ ] **Step 7: Commit the campaign authority**

```powershell
git add -- gotsoap/docs/world-bible.md gotsoap/docs/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md site/scripts/authority-check-lib.mjs
git commit -m "docs: complete Got Soap behavioral authority"
```

---
