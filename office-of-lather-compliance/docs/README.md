# Office of Lather Compliance portable site package

The Office of Lather Compliance is a separate fictional government agency. Its jurisdiction is
deliberately unspecified.

**PUBLIC SURFACE MODEL: ERROR STATES ONLY.**

The Office site has no ordinary homepage, navigation, about page, policy library, service catalog,
staff directory, or explanation of the agency. Every public URL resolves to the custom denial-state
experience specified here.

The browser-local progression is fixed:

Session 1: First Access; same-session reload: Refresh Denied.
Session 2: Repeat Access; same-session reload never advances the narrative.
Session 3 and later: Continued Interest stasis.

State-dependent copy is resolved before reveal. No cookies, IP addresses, fingerprinting, backend
identity record, or cross-device recognition supports the effect.

Private production canon identifies CWAAA and the Office as legally separate fictional entities.
CWAAA may link to the Office, but neither ordinary public site explains whether either acts through
the other. Package boundaries protect rendered authorship; they do not prove operational separation
to the audience. The IVR remains a controlled, intentionally unresolved exception.

Package:

- `world-bible.md` — canonical behavior, knowledge boundaries, and protected unknowns.
- `../design.md` — visual, verbal, and emotional system.
- `PRD-office-v1.md` — implementation requirements and state machine.
- `contracts/visit-state.v1.json` — browser-local recognition contract.

## Shared-canon synchronization contract

- **Contract identity:** `gotsoap-world-canon.v1`
- **Version:** 1 (contract version 1)
- **Upstream repository:** `https://github.com/machsheltie/Gotsoap-.git`
- **Upstream path:** `docs/world/`
- **Source commit:** record the full upstream commit at extraction time; this field is intentionally
  not assigned permanently in source content.

The extracted `docs/world/` copy is a subordinate snapshot, not duplicate authority. Before release,
compare its recorded source commit and version with upstream. If shared canon changed, resync the
entire dependency closure from one upstream commit, rerun authority and IVR hash verification, and
update the recorded source commit.

The exact Office dependency closure is:

- `docs/world/README.md`;
- `docs/world/WORLD-BIBLE.md`;
- `docs/world/artifact-continuity.md`;
- the relevant artifact authority and source:
  `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md` and the canonical PDF beside it; and
- any shared contract consumed. None is currently consumed by the Office package; its
  `contracts/visit-state.v1.json` remains package-local.
