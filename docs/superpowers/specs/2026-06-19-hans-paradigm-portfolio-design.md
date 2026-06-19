# Design Spec — shans15.github.io · The Hans Paradigm v1.0

**Author:** Sarthak Hans
**Date authored:** 2026-06-19
**Status:** v1.0 — production-ready single-page deployable
**Repo target:** `github.com/shans15/shans15.github.io`
**Public URL:** `https://shans15.github.io`

---

## 1. Goal

Build a personal site that positions Sarthak Hans for AI/ML consulting and solutions-engineering engagements, while also serving research and full-time-role audiences. The site must not read as a generic AI-template developer portfolio. It should feel like a *bespoke engineered artifact* — distinctive enough that copying it visibly identifies the copy as derivative.

**Secondary goal:** satisfy the Week 1 AI Dev Tools bootcamp assignment (HTML/CSS/JavaScript site, deployable to GitHub Pages).

## 2. Conceptual frame: "Signal → Rank → Explain"

The site is structured around a three-stage pattern observed across the author's repos:

- **Options Scanner** — universe → setup filter → ranked option contracts → labeled `TRADE / WATCHLIST / NO_TRADE`
- **MedGap** — patient panel → XGBoost discontinuation/crisis models → ranked risk + SHAP per-patient explanations
- **Incident Intelligence Agent** — PagerDuty alert → vector retrieval over past incidents → drafted RCA with cited precedents
- **Bike Data Lakehouse** — bronze (signal) → silver (rank-clean) → gold (explain-ready output)
- **CFPB LLM Fairness Research** — classifier candidates → out-of-domain accuracy → fairness analysis across demographic groups
- **Veil** — detector outputs → Veil authenticity score → plain-language verdict (`Looks authentic / Needs review / High scam risk`)

The pattern is real, observable in the user's code, and named for the first time on this site.

## 3. Design language: "The Hans Paradigm"

The interface treatment expressing the methodology. Three explicit, labeled stages on the page:

| Stage | Section on page | Visual register |
|---|---|---|
| 01 / Signal | Status bar + Hero (asymmetric grid w/ identity + thesis) | bone-white, mono labels, geometric sans display |
| 02 / Rank | Dense scan-output table with embedded Explain panels | bone-white surface, ink rows, mono metrics |
| 03 / Explain | Inverted (dark) methodology section + Research listing | ink-black with signal-green markers; serif for research register |

### Anti-template constraints (explicit)

| Reject | Use instead |
|---|---|
| Dark mode w/ neon purple/cyan glow | Bone-white surface, ink type, one clinical-green signal color |
| Bento grids | Asymmetric hero + dense rank table; no grid-of-cards "featured" layout |
| Rounded corners | `border-radius: 0` everywhere; sharp, mechanical |
| "Hero h1 + tagline + CTA" template | Hero is a *scanner header* — operator, scan ID, build hash, live UTC clock visible |
| Lucide / Heroicons | Zero icons. Typography-only |
| Centered narrow column w/ vast vertical spacing | Asymmetric grid with content density; intentional metadata everywhere |
| Buzzword copy ("building scalable solutions") | Every paragraph references the actual repo, file, AUC, hackathon, or production lineage |
| Framer-Motion fade-in-on-scroll | Mechanical CSS scan-line; deterministic accordion for Explain panels |
| Glassmorphism / gradients | Solid colors, flat. Engineered, not decorated |
| Footer with social icons | Footer as system-status block: `$ git log --oneline -1` + IP notice |

## 4. Visual system

### Color (final)
- `--bg #fafaf7` — bone-white surface
- `--bg-2 #f3f3ee`, `--bg-3 #ededea` — soft surface tiers
- `--ink #0a0a0a` — type and inverted surfaces
- `--ink-soft #2a2a2a` — body register
- `--line #e0e0d8` — separators
- `--muted #5e5e58`, `--muted-2 #9a9a93` — quiet type
- `--signal #00a874`, `--signal-soft #e6f6f0`, `--signal-ink #006b4a` — single accent (clinical green)
- `--watch #9b6f2b`, `--watch-soft #fbf3e3` — muted amber for WATCH verdicts only

### Type stack (intentional register-mapping)
- **`Inter Tight`** (sans, 400–700) — display, UI titles, headlines
- **`IBM Plex Mono`** (mono, 400–600) — labels, badges, scores, metadata, navigation
- **`Source Serif 4`** (serif, 400–500) — long-form prose, research register, methodology lead, paper abstracts

### Type metrics (intentionally non-default ladder)
`10.5 / 11.5 / 13.5 / 15.5 / 19.5 / 28.5 / 46 / clamp(56, 9vw, 122)`

### Spacing
- Page gutter: 40px desktop, 22px mobile
- Max content width: 1280px
- Section padding: 80–96px vertical
- Tight tracking on display type (`-0.045em` on hero)

## 5. Information architecture

```
status-bar                  (sticky top, system metadata)
nav                         (sticky, mono links)
hero                        ┐
  ├─ identity (left col)    │  Stage 01 — Signal
  ├─ thesis (right col)     │
  ├─ scan-line              │
  └─ filter-bar             ┘
rank                        ┐  Stage 02 — Rank
  ├─ header row             │
  ├─ rank-row × 6           │  ← each row: trigger + collapsible Explain panel
  └─ rank-foot summary      ┘
method                      ┐  Stage 03 — Explain
  ├─ headline + lead        │  (dark / inverted register)
  └─ 3 stage cards          ┘
research                    (academic register, publications list)
contact                     (link grid)
footer                      (system-status block + IP notice)
```

## 6. Interaction model

- **Live clock** in status bar (updates every 1s, UTC)
- **Scan ID** computed from current calendar date (day-of-year encoded)
- **Filter bar.** Clicking re-shows rows matching `data-cats`; visible rows are renumbered so #01, #02, ... stays correct; rank-foot summary updates ("3 of 6 projects · filtered by ml")
- **Explain accordion.** Clicking any rank row closes others and opens that row's Explain panel; `aria-expanded` drives styling
- **Keyboard.** `j` / `k` to navigate rows, `Enter` / `Space` to toggle, `Esc` to close all
- **Reduced motion.** Disables scan-line pulse + status-dot pulse for users with `prefers-reduced-motion: reduce`

### v1.0.1 revision (2026-06-19)

- Removed the synthetic "score" column (`9.6/10`, `9.2/10`, …) — arbitrary, not derived from a real metric. Rank order (#01–#06) and the badges (`★ 1st place`, `OTF-derived`, `AUC 0.87`, etc.) carry the ranking semantics on their own.
- Removed the "verdict" column (`▸ TRADE` / `▹ WATCH`) for the same reason — a metaphor flourish borrowed from the Options Scanner's vocabulary, not load-bearing on this page. Grid recalculated 5 → 4 → 3 columns.
- Em-dash usage reduced across body copy and meta tags. Project-row subtitle separator moved from `—` to a typographic register shift (mono + muted, on its own line). Section-banner code comments in the HTML source still use `—` since they never render to users.

### v1.0.2 revision (2026-06-19) — cross-platform responsiveness

Three new breakpoints, plus tablet/ultrawide handling and full mobile reflow that preserves all content rather than hiding it.

- **Mobile nav drawer.** Inline `nav-links-desktop` hides at ≤700px; a 44px-min hamburger button reveals a slide-in drawer from the right (`min(86vw, 360px)`). Drawer has its own typographic register (numbered list `01 · work` etc.), a closing affordance, and a foot block with operator/paradigm metadata so the system aesthetic stays intact in the mobile UI. Body scroll locks while open; `Esc` closes; focus moves to first link on open and back to the toggle on close.
- **Touch targets.** New `--tap: 44px` token threaded through filter buttons, drawer links, contact links, and the drawer close button. `touch-action: manipulation` + `-webkit-tap-highlight-color: transparent` on all interactive elements to remove iOS gray flash and double-tap delay.
- **Rank row reflow at ≤700px.** Instead of *hiding* the signals/badges column (the previous behavior), the row collapses to a stacked block layout — name + subtitle on top, tags + badges wrap below, rank number floats top-right. All information remains visible on the smallest viewport.
- **Filter bar at ≤700px.** Horizontal-scroll on overflow with a hidden scrollbar rather than wrapping, so the chips read like a true filter strip.
- **Status bar at ≤700px.** Keeps the high-signal tokens (`SCAN_ID`, live UTC clock) and hides secondary tokens (`OPERATOR`, `PARADIGM`, `LAST_INDEX`) to prevent overflow.
- **Safe-area-inset support.** `viewport-fit=cover` meta + `env(safe-area-inset-*)` tokens applied to body padding, drawer padding, and footer bottom padding for iPhone notch / home-indicator compliance.
- **Ultrawide cap.** `--max` bumped from 1280px to 1400px; at ≥1600px viewport `--gutter` increases to 56px so the design has more breathing room rather than sprawling.
- **`theme-color` meta** set to `#0a0a0a` so the iOS Safari status bar matches the in-page status bar when the user scrolls.
- **`-webkit-text-size-adjust: 100%`** prevents iOS landscape font-size inflation.

## 7. Tech stack

- **HTML5** — semantic (`<article>` for each rank row, `<aside>` for thesis, `<dl>` for feature pairs, ARIA labels on status bar and filter toolbar)
- **CSS3** — custom properties, grid, sticky positioning, CSS animations (`scan-pulse`, `status-pulse`)
- **Vanilla ES6+** — no dependencies, single IIFE module exposing `window.HansParadigm`
- **No build step.** Three files: `index.html`, `styles.css`, `app.js`
- **No tracking, no analytics, no third-party scripts** (only Google Fonts CSS)

### Why not Next.js / Astro
- Single static artifact is more distinctive than a framework site for this concept
- Deploys to GitHub Pages with zero config (no GitHub Action build needed)
- Avoids the "AI portfolio template" aesthetic which is dominated by Next.js + shadcn/ui
- Lower attack surface, faster, simpler to maintain
- v2 migration to Astro is straightforward when adding case study pages

## 8. Files

```
/
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
├── .gitignore
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-06-19-hans-paradigm-portfolio-design.md   (this file)
```

## 9. Trademark & IP posture

Plain-language statement of what is being claimed and what is not:

- **Code** → MIT-licensed.
- **"The Hans Paradigm"** as a name → service mark of Sarthak Hans, intended for use in connection with AI/ML engineering and consulting services. Not yet USPTO-registered. Registration (Class 042) recommended once the mark is used in commerce ≥ once.
- **"Signal → Rank → Explain"** as a methodology name → can be used as a service mark with the same registration path.
- **Design language** (the specific Hans-Paradigm interface treatment) → original authored work. Code copyright is automatic; the *combination* of design choices is distinctive enough to function as personal brand identification regardless of legal status.
- **What is NOT claimed:** ownership of the general concepts of dark sections, dense tables, accordion patterns, or "filter then rank" as an engineering idea. These are common.

The IP claim's *practical* enforcement is recognition: the site is so distinctively the author's that copies visibly identify themselves as derivative.

## 10. Deployment plan

1. Create public GitHub repo: `shans15/shans15.github.io`
2. `git init` + `git add . && git commit -m "initial: hans paradigm v1.0"` locally
3. `git remote add origin git@github.com:shans15/shans15.github.io.git`
4. `git push -u origin main`
5. GitHub Pages auto-publishes at `https://shans15.github.io` within ~30 seconds (no Action required for a same-named user-site repo)
6. Add `CNAME` file later if mapping a custom domain (e.g., `sarthakhans.dev`)

## 11. v2 roadmap (out of scope for v1)

- Case study pages: `/work/medgap/`, `/work/options-scanner/`, etc. — long-form writeups including "what I'd change" sections
- Research deep-dive: `/research/cfpb-fairness/` — full working-paper page
- Writing section: 1–2 technical essays
- Custom domain
- Astro migration when content count crosses ~10 pages
- USPTO service-mark filing for "The Hans Paradigm" once the mark is in commerce

## 12. Self-review (pre-commit)

- ✅ Placeholders: none (`cv.pdf` link is intentional pending upload)
- ✅ Internal consistency: methodology naming consistent throughout; stage labels (01/02/03) consistent across hero, rank, method
- ✅ Scope: focused on v1 deliverable; v2 explicitly deferred
- ✅ Ambiguity: trademark posture spelled out in §9 — code MIT, name service mark, design language all rights reserved
- ✅ Accessibility: ARIA on status/filter/rows, focus rings, reduced-motion handling, keyboard nav
- ✅ Responsive: collapses to single column under 920px; nav and rank table degrade cleanly under 600px
- ✅ Browser support: vanilla CSS grid + custom properties + ES6 — supports all evergreen browsers (Chrome/Edge/Firefox/Safari last 2 years)
