# Three project workspaces

Open the folder for the entity you want Claude Code to work on:

| Folder | Project | Start here | Design |
|---|---|---|---|
| `gotsoap/` | Got Soap? campaign | [Claude instructions](gotsoap/CLAUDE.md) | [design.md](gotsoap/design.md) |
| `cwaaa/` | CWAAA advocacy coalition | [Claude instructions](cwaaa/CLAUDE.md) | [design.md](cwaaa/design.md) |
| `office-of-lather-compliance/` | Office error-state site | [Claude instructions](office-of-lather-compliance/CLAUDE.md) | [design.md](office-of-lather-compliance/design.md) |

Each folder has its own launch PRD (`PRD-TO-LAUNCH.md`), owner graphics checklist (`GRAPHICS-TO-MAKE.md`), world bible, design authority, and agent instructions. The launch handoffs include thorough owner interviews for unresolved sections and later-work registers. Use one folder as the working directory for a focused session.

[Shared documentation](docs/README.md) holds owner decisions, cross-system canon, shared contracts, coordinated plans, and locked verification evidence. [File ownership](docs/FILE-OWNERSHIP.md) explains the remaining shared and source files; [the relocation manifest](docs/organization-manifest.json) maps old paths to new paths.

The working Astro application remains in `site/`, with its current combined behavior documented in [specs.md](specs.md). Run its npm commands from `site/`. The separate CWAAA and Office sites still require implementation. Deployment configuration remains at the repository root.

Large design sources and licensed resource packs remain at the root. Preserve poster originals, Photoshop sources, brush exclusions, licenses, and attribution rules.
