# AI Log

## Tools Used

- **Claude** — used as a coding assistant to generate boilerplate and
  component scaffolding once I'd decided the structure, and as a debugging
  sounding board. I directed the architecture and the key decisions; the AI
  handled repetitive code generation under that direction.
- **TVmaze API docs** — read directly to choose which endpoints to use.

## Best Prompts

1. **"Build this in commit-sized batches — give me the file-creation commands
   plus full contents, in order."**
   I set up the workflow this way deliberately so I could review and commit
   each piece as I went, rather than accept one large dump. It kept me in
   control of what actually went into the repo.

2. **"TMDB won't load on my network — I need a *keyless* free API alternative."**
   When the planned data source failed, I made the call to switch APIs and
   specified keyless on purpose, so I wouldn't hit another signup/access
   blocker. This is the decision that unblocked the whole project.

3. **"Give it a cinematic, screening-room identity, not a generic dark grid."**
   I drove the visual direction here and rejected the first generic result,
   pushing toward the tungsten-amber-on-black film theme that the app ended
   up with.

## What I Fixed Manually

After wiring everything up, `npm run dev` crashed with "The default export is
not a React Component in page /". The assistant's first guess was that
`app/page.jsx` was broken. I didn't take that at face value — I checked the
file directly with `Get-Content`, saw it was fine, and instead ran a scan for
empty files across the project
(`Get-ChildItem ... | Where Length -eq 0`). That surfaced the real cause:
`layout.jsx` and `globals.css` had saved as empty because my editor dropped
the pasted content. I re-added them and verified each file's size before
re-running. The lesson I took: trust the actual file state over the tool's
first hypothesis.