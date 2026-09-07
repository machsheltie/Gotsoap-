# Got Soap?: task 3 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-28-creative-direction-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

### Task 3: Turn Shop into an editorial campaign catalogue

**Files:**

- Modify: `gotsoap/design.md:228-256`
- Modify: `gotsoap/docs/prd/PRD-gotsoap-web-v1.md:111-128`
- Modify: `site/scripts/authority-check-lib.mjs:1160-1209`
- Modify: `site/scripts/authority-check.test.mjs:1036-1060`

**Interfaces:**

- Consumes: canonical Shop route ownership and existing five approved product concepts.
- Produces: product-specific spatial direction and unavailable-checkout behavior that refuses generic ecommerce.

- [ ] **Step 1: Add failing Shop authority markers and stale-grid tests**

Expand the `gotsoap/design.md` markers:

```js
'OFFICIAL CAMPAIGN SUPPLY',
'FASHION CATALOGUE PRETENDING TO BE A STORE',
'THE EMBOSSED BAR',
'THE WORDMARK TEE',
'THE STATEMENT TEE',
'THE DAD HAT',
'THE EFFORT BOTTLE',
'SUPPLY INDEX',
'NO PRODUCT GRID',
```

Expand the campaign PRD markers:

```js
'OVERSIZED EDITORIAL PERFORMANCE',
'COMING SOON!',
'NO RATINGS',
'NO RECOMMENDATIONS',
```

Add adversarial mutations for:

```js
[
  ['gotsoap/design.md', 'Arrange products in an equal responsive product grid.', /obsolete Shop grid guidance/i],
  ['gotsoap/design.md', 'Use standard ecommerce product cards.', /obsolete Shop card guidance/i],
  ['gotsoap/docs/prd/PRD-gotsoap-web-v1.md', 'Include ratings and customers-also-bought recommendations.', /obsolete Shop ecommerce guidance/i],
]
```

- [ ] **Step 2: Run the authority suite and confirm Shop requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL for missing editorial-catalogue markers while the new mutation cases reject ordinary ecommerce guidance.

- [ ] **Step 3: Expand the Shop section in `gotsoap/design.md`**

Use:

```markdown
### Shop
#### Platform
#### Index choreography
#### Product performances
#### Supply Index
#### Unavailable checkout
#### Product detail
#### Refused ecommerce defaults
```

Define:

```markdown
Official Campaign Supply: a fashion catalogue pretending to be a store.
```

Give each product the exact material and narrative treatment in governing specification Section 3.2. Require image-owned viewports, oversized names, short sell lines, secondary prices, restrained unavailable controls, and a narrow Supply Index. Prohibit an equal grid, Shopify shell, card inventory, recommendations, ratings, accordions, tabs, and thumbnail carousels.

- [ ] **Step 4: Expand Shop requirements in the campaign PRD**

Require:

```markdown
- The index gives all five products distinct oversized editorial performances.
- A narrow Supply Index may provide direct access without becoming a card grid.
- `Coming Soon!` appears only at the normal purchase point.
- Detail pages use one full-bleed hero, one severe crop, one materials/specification block, one price,
  one unavailable purchase control, and previous/next supply navigation.
- No ratings, recommendations, product tabs, accordions, thumbnail carousel, or ordinary ecommerce
  shell is permitted.
```

Keep checkout unavailable and ecommerce transactions out of scope.

- [ ] **Step 5: Run focused Shop verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n "Embossed Bar|Wordmark Tee|Statement Tee|Dad Hat|Effort Bottle|Supply Index|Coming Soon" gotsoap/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md
git diff --check
```

Expected: authority tests and gate pass; every product and interaction marker appears; diff check has no output.

- [ ] **Step 6: Commit the Shop revision**

```powershell
git add -- gotsoap/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: direct Shop as campaign catalogue"
```

---
