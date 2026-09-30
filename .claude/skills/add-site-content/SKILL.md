---
name: add-site-content
description: Add a new presentation/slide deck, interactive simulation, or page to the mrporterphysics.github.io site and wire it into navigation correctly. Use whenever Nathan says he has made (or wants to make) a new deck, unit slides, simulation, interactive, practice page, resource page, or course page — or asks to "put this on the site", "add this to the website", or "publish this".
---

# Adding content to mrporterphysics.github.io

Repo root: `/Users/nathanporter/Documents/mrporterphysics.github.io` (Jekyll → GitHub Pages,
deploys from `master`, live at `https://www.mrporterphysics.com`).

**Nothing is published until it is (a) in the right place, (b) exported if it is a deck, and
(c) linked from a page students can reach.** Most content rot on this site comes from skipping (c).

Always finish with the verification step at the bottom. It is a hard CI gate.

---

## Decide which of the three this is

| If it is… | It goes in… | Type |
|---|---|---|
| Marp slides for a unit/lesson | `Presentations/<Subject>/talks/` | **A. Deck** |
| A self-contained HTML/JS interactive, animation, or simulation | `AP Resource Pages/Simulations/` (or `AP Resource Pages/` for a classroom presenter) | **B. Interactive** |
| A normal content page (resources, practice, reference, course hub) | repo root, `courses/`, or `AP Resource Pages/` | **C. Page** |

---

## A. New slide deck (Marp)

### 1. Place and name it

`Presentations/<Subject>/talks/<Name><EndYear>.md`

`<EndYear>` is the **end** of the school year — a deck taught in autumn 2026 is `…2027`.
Reuse the existing subject folder if one fits (`APCVPM`, `APETM`, `Momentum`, `Forces`,
`Waves`, `RP Static Electricity`, `AP Rotation Representation`, `Circular Motion`, `Fluids`,
`AP SHM`, `RP Modern`, `Magnetism`, `Projectiles`, `ES Presentations/<Unit>`, …).
A few older folders keep decks at the folder root rather than in `talks/` — follow the folder
you are in.

Rolling last year's deck forward: copy it, bump the year in the filename, then update
`title:` and any on-slide "AP Physics 2025-26"-style text. **Grep the new file for the old
year before exporting** — that is the single most common miss.

### 2. Front matter is mandatory

```yaml
---
marp: true
title: Circular Motion 2027
theme: brutalism          # a file in PorterThemes/Schodack/*.css
paginate: true
math: mathjax
footer: AP Physics 1 | Unit 3   # optional
---
```

`_config.yml` sets `published: false` for everything under `Presentations/` and `Daily Plan/`.
That is deliberate: without it Jekyll renders the `.md` source as an unstyled wall of text at
the same URL as the real deck. **Consequence: a `.md` that is never exported is invisible on the
site.** Export is not optional.

A source with *no* front matter at all will also never be exported by the VS Code extension —
if a deck seems missing, check for front matter first.

### 3. Export to HTML

```bash
npx --yes @marp-team/marp-cli@4.5.1 "Presentations/<Subject>/talks/<Name><Year>.md" \
  --theme-set PorterThemes/Schodack/ --html \
  -o "Presentations/<Subject>/talks/<Name><Year>.html"
```

Pin the version. Decks exported by different Marp versions over the years disagree on
`lang` (some shipped `lang="C"`, which breaks screen-reader pronunciation) and on whether math
renders as MathJax or KaTeX. 4.5.1 emits `lang="en-US"`.

The VS Code Marp extension ("Export Slide Deck…") also works and is what Nathan normally uses;
its themes are registered in `.vscode/settings.json`. The CLI above is the reproducible path.

Commit **both** the `.md` and the `.html`.

### 4. Link it (the step that gets skipped)

Update **both** of these:

1. **The course hub** — `courses/ap-physics.md`, `courses/regents-physics.md`,
   `courses/earth-science.md`, or `courses/physical-science.md`, under "Content by Unit".
   For AP also update `courses/ap-physics-presentations.md`, which is a card grid with
   hand-written unit descriptions — **preserve the description, only swap the href**.
2. **`presindex.md`** — this uses a deliberate *progressive reveal*: units not yet taught stay
   inside `<!-- -->` and get uncommented as the unit comes up. When adding a deck for a unit
   not yet taught, add it **commented out** with the correct final URL, so revealing it later
   is a one-line uncomment and never ships a stale link.

URL form: site-absolute, e.g. `/Presentations/APETM/talks/APEnergy2027.html`.
Literal spaces in the path are fine — kramdown preserves them and browsers encode them. Do
**not** add a `/mrporterphysics.github.io/` prefix; it redirects but is wrong.

---

## B. New interactive / simulation

Standalone HTML with inline or `/js/` scripts. No Jekyll front matter needed (it is served as a
static file), but **add `layout: default` front matter if you want the site nav and theme on it**.

- Physics sims and workbook interactives → `AP Resource Pages/Simulations/`
- Classroom presenters (projected, teacher-driven) → `AP Resource Pages/` root,
  named `<topic>Present.html`
- Earth Science → `AP Resource Pages/Earth Science Pages/`

Shared helpers already exist — reuse rather than re-implement:
- `js/linearization-engine.js` — graphing/linearization plumbing
- `css/flexoki-theme.css` — the site's design tokens, light + dark

Then link it from the relevant course hub *and* from `SimulationResources.md` if it is a
simulation students should find on their own.

---

## C. New regular page

Markdown at the repo root, in `courses/`, or in `AP Resource Pages/`.

```yaml
---
layout: default          # or: course-subpage (needs course_name + course_url)
title: Page Title
---
```

Several older pages have **no front matter** and only render because GitHub Pages silently
enables `jekyll-optional-front-matter`. Do not add new ones that way — always include front matter.

Add it to the nav in `_includes/header.html` if students need to reach it directly. Note
`_config.yml`'s `header_pages:` is **dead config** — the nav is hard-coded in that include and
never reads it. Editing `header_pages` does nothing.

---

## Accessibility — required, not optional

There is a **blind student in Regents Physics**. For anything a Regents student will use:

- **Equations**: render visual math inside an `aria-hidden="true"` wrapper and provide a
  hand-written spoken reading as real text (`.sr-only` or a visible caption) — e.g. "net force
  equals mass times acceleration". Do **not** rely on MathJax's own accessibility; it
  double-reads. This is the pattern proven in `regentsTestPrep/regents-physics-study-guide.html`.
- **Diagrams**: mark the image `aria-hidden="true"` with empty `alt=""`, and pair it with a
  `<figure>`/`<figcaption>` carrying a full text description.
- **Tables**: real `<table>` with `<caption>` and `scope` on every `<th>`.
- **Headings**: no skipped levels. Keep emoji out of heading text, or wrap them in
  `<span aria-hidden="true">` — otherwise a screen reader announces "calendar Current Year".
- Marp decks are **not** accessible for this student (math is silent, every slide is an `h1`).
  For a Regents unit, build an accessible companion page rather than relying on the deck.

---

## Verify before committing — always

```bash
python3 scripts/check-site.py
```

Reports four things:
- **LINK** — dead internal links. **This fails the CI build** (`--strict` in
  `.github/workflows/jekyll-gh-pages.yml`), so a dead link blocks deployment. Fix before pushing.
- **COMMENTED** — links inside `<!-- -->` that would break if revealed. Keeps the
  `presindex.md` progressive-reveal lines honest.
- **STALE** — a linked deck has a newer year-suffixed sibling on disk. This is the check that
  catches "I made `APEnergy2027.html` but the course page still points at 2026."
- **UNBUILT** — a Marp source with no exported `.html`.

Run it again after linking, not just after creating the file.

There is **no local Jekyll** in this repo (no `Gemfile`, system Ruby has no gems), so the
checker's source-tree mode is the only pre-push verification available. Deploy takes ~2 min
after pushing to `master`.

## Quick checklist

- [ ] File in the right folder, named `<Name><EndYear>`
- [ ] Front matter present (`marp: true` + `theme:` for decks; `layout: default` for pages)
- [ ] Old year scrubbed from title and slide text
- [ ] Deck exported to `.html`; both files committed
- [ ] Linked from the course hub **and** `presindex.md` (commented if not yet taught)
- [ ] Accessibility pass if Regents-facing
- [ ] `python3 scripts/check-site.py` clean
