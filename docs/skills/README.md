# Vendored skills — making Claude skills usable by Codex / Sol

**The problem.** Our Claude skills (copywriting, prose-critique, humanizer, …) live in
`~/.claude/plugins/cache/.../skills/<name>/` — a Claude-Code-only install location,
**outside this repo**. Sol (GPT-5.6, Codex app) can't *invoke* a Claude skill, and can't
even *read* one there because it's outside the shared worktree. A skill named in a prompt
that Sol can't reach is a dead reference.

**The fix.** A Claude skill is just a folder of markdown (a `SKILL.md` of instructions plus
`resources/` files). So to give Sol a skill, **vendor the folder into this repo**, where the
shared worktree makes it readable, then point Sol at the path in its brief.

## The recipe (repeatable for any skill)

1. **Find it** in the plugin cache:
   ```bash
   find ~/.claude/plugins -type d -iname "*<skill-name>*"
   ```
2. **Copy the folder into the repo** under `docs/skills/<name>/`:
   ```bash
   cp -r <that path> docs/skills/<name>
   ```
3. **Strip what Codex can't run.** Skills sometimes reference Claude-only tools or bundled
   scripts (e.g. a `uv run analyze.py`). Leave the file but tell Sol to ignore it, or delete it.
4. **Bridge the domain if needed.** If the skill was written for a different domain (prose-critique
   is written for fiction), add a short `USING-FOR-<domain>.md` that maps its concepts onto ours,
   rather than rewriting the skill. Keep the original faithful; add the bridge alongside.
5. **Reference it in the brief.** In `PROMPT-SOL.md` / `PROMPT-COPY.md`, replace the un-invokable
   `plugin:skill` name with: *"read `docs/skills/<name>/SKILL.md` and apply it."*

## Notes
- **Codex also reads `AGENTS.md`.** You can list vendored skills there so any Codex session
  picks them up, not just the copy session.
- **Sol reads, doesn't invoke.** There's no Skill tool in Codex — the value is the methodology
  as reference text, applied by hand. That's enough for critique/writing skills (they're guidance,
  not executable tools).
- **Claude sessions don't need this.** Fable (Claude) invokes the real skills natively via the
  Skill tool. Vendoring is only to reach Sol. Keep the vendored copy and the real skill in sync if
  the skill updates (re-run the recipe).

## Currently vendored
- **`prose-critique/`** — adversarial critique methodology (for Sol, in the copy session). See
  `prose-critique/USING-FOR-CAMPAIGN-COPY.md` for the fiction→ad-copy mapping.
