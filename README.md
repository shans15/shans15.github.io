# shans15.github.io

Personal site for Sarthak Hans. Built as a single static artifact — no build step, no framework, no tracking.

Design language: **The Hans Paradigm** — a Signal → Rank → Explain interface.

## Run locally

```bash
# any static server works; python is preinstalled on macOS
python3 -m http.server 8000

# then visit
open http://localhost:8000
```

## Deploy (GitHub Pages)

This repo is named `shans15.github.io`, so GitHub Pages auto-publishes it at https://shans15.github.io once pushed to `main`.

```bash
git init
git add .
git commit -m "initial: hans paradigm v1.0"
git branch -M main
git remote add origin git@github.com:shans15/shans15.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages** — confirm Source is `Deploy from a branch: main / root`. Site is live in ~30 seconds.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure — status bar, hero, rank table, method, research, contact, footer |
| `styles.css` | Design system: tokens, layout, animations, responsive breakpoints |
| `app.js` | Client logic: live clock, filter, accordion Explain panels, keyboard nav (j/k) |
| `docs/superpowers/specs/2026-06-19-hans-paradigm-portfolio-design.md` | Design rationale and decisions |

## Keyboard

- `j` / `k` — next / previous project
- `Enter` / `Space` — open Explain panel for focused project
- `Esc` — close all open panels

## License

- **Code:** MIT (see `LICENSE` when added)
- **Design language ("The Hans Paradigm") and methodology naming ("Signal → Rank → Explain" as a service mark):** all rights reserved
- **Content (case studies, abstracts, photographs):** © 2026 Sarthak Hans

"The Hans Paradigm" is a service mark of Sarthak Hans intended for use in connection with AI/ML engineering and solutions-consulting services.
