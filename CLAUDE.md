# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based GitHub Pages website for Mr. Porter's Physics Classes, serving as a central hub for physics education resources, daily agendas, presentations, and interactive tools. The site is hosted at mrporterphysics.github.io and includes content for AP Physics, Regents Physics, Earth Science, Physical Science, and coding/game development courses.

## Site Architecture

### Jekyll Configuration
- **Framework**: Jekyll with minima theme and Kramdown markdown
- **Hosting**: GitHub Pages (automatically builds from master branch)  
- **Custom Styling**: Uses Fira Code and Inconsolata fonts with custom CSS themes
- **No Jekyll build step** - GitHub Pages builds automatically from `master`
- **Marp decks DO need an export step** - see below. There is no local Jekyll in this repo
  (no `Gemfile`, system Ruby has no gems), so `scripts/check-site.py` is the only pre-push check.

### Directory Structure

- **`Daily Plan/`** - Organized by academic year (20262027/ is current; 20252026/, 20242025/, ... are archives)
  - Years 20232024–20252026 keep agendas in a `Daily Slides/` subfolder.
  - **20262027 is flat** - agenda `.md` + exported `.html` sit at the year-folder root.
    Follow the flat layout for new years.
  - `images/` - Course-specific images and graphics
- **`Presentations/`** - Subject-organized presentations (AP Review/, AP SHM/, Forces/, etc.)
- **`ap-physics-quiz/`** - Standalone interactive quiz application (see existing CLAUDE.md)
- **`Coding/`** - Student game projects and coding resources
- **`PorterThemes/`** - Custom CSS themes for different courses
- **`AP Resource Pages/`** - Additional practice and review materials

### Content Types

1. **Marp Presentations**: Markdown files converted to HTML slides using Marp theme system
2. **Jekyll Pages**: Standard markdown files processed by Jekyll (.md)
3. **Interactive Tools**: Standalone web applications (quiz tools, games)
4. **Static Assets**: Images, videos, CSS themes, and PDFs

## Development Workflow

### Adding New Content

1. **Daily Agendas**: Add entries to the appropriate `.md` file in `Daily Plan/20262027/`, then re-export it to `.html` (see Marp export below)
2. **New Presentations**: Create in subject-specific folder under `Presentations/`
3. **Quiz Questions**: Edit CSV files in `ap-physics-quiz/data/`
4. **Images/Assets**: Add to appropriate `images/` subdirectory

### Marp Presentation Format
Daily slides use YAML frontmatter:
```yaml
---
title: Course Name YYYY-YYYY
marp: true
theme: physics2024 
paginate: true
footer: Custom footer text
math: mathjax
---
```

### Theme System
- **Main Theme**: Flexoki-based modern theme (`css/flexoki-theme.css`)
- **Theme Toggle**: JavaScript-powered light/dark mode switching (`js/theme-toggle.js`)
- **Legacy Themes**: Custom course themes in `PorterThemes/Schodack/` for Marp presentations
- **User Preference**: Theme selection persisted in localStorage, defaults to light mode
- **Accessibility**: High contrast ratios and keyboard navigation support

### File Naming Conventions
- Academic year folder format: start+end, e.g. `20262027`
- Deck filenames carry the **end** year of the school year: a deck taught in autumn 2026 is `<Name>2027`
- Course abbreviations: AP (AP Physics), RP (Regents Physics), EarthSci, etc.
- Date format in slides: YYYY.MM.DD

## Key Features

- **Multi-Course Support**: AP Physics, Regents Physics, Earth Science, Physical Science, Coding
- **Interactive Elements**: Quiz applications, embedded videos, mathematical notation (MathJax)
- **Responsive Design**: Mobile-friendly layouts with custom CSS
- **Resource Organization**: Hierarchical structure by year, course, and topic
- **GitHub Pages Integration**: Automatic deployment from master branch

## Common Tasks

### Adding a New Daily Agenda Entry
Edit the appropriate `.md` file in `Daily Plan/20262027/` (`APAgendas202627.md`, `RPAgendas202627.md`,
`EarthSci202627.md`, `physicalScience2027.md`) using the established format with date headers
(`# YYYY.MM.DD **Course Name**`) and agenda items. Entries are newest-first.

**Then re-export to HTML** - the `.md` source is not published (see below).

### Creating New Presentations
1. Create new folder under `Presentations/` if needed
2. Add markdown source and any required assets
3. Follow existing presentation structure and theming

### Updating Quiz Content
Edit CSV files in `ap-physics-quiz/data/` - the application loads questions dynamically.

### Theme Customization
- **CSS Variables**: All colors defined as CSS custom properties in `:root` and `[data-theme="dark"]`
- **Theme Toggle**: Use `window.themeManager.setTheme('light'|'dark')` or `window.themeManager.toggleTheme()`
- **Custom Colors**: Modify Flexoki color variables in `css/flexoki-theme.css`
- **Responsive Breakpoints**: 768px (tablet) and 480px (mobile) breakpoints defined

## Navigation and URLs
- Main site navigation defined in `_config.yml` header_pages
- Presentation links use relative paths from site root
- Quiz tools and games are standalone applications with their own navigation

## Publishing rules (important)

`_config.yml` sets `published: false` for everything under `Presentations/` and `Daily Plan/`.
Marp sources carry YAML front matter, so without this Jekyll renders them as flat, unstyled
pages - slide separators become `<hr>` - at the same URL as the real deck.

**Consequence: a Marp `.md` that is never exported does not appear on the site at all.**
Exported `.html` files have no front matter, so Jekyll serves them as static files, unaffected.

Do **not** use `exclude:` for this - `exclude:` drops static files too and would remove every
exported deck from the site.

### Marp export

```bash
npx --yes @marp-team/marp-cli@4.5.1 "<path>.md" \
  --theme-set PorterThemes/Schodack/ --html -o "<path>.html"
```

Pin the version: decks exported by different Marp versions over the years disagree on `lang`
(some shipped `lang="C"`, which breaks screen-reader pronunciation) and on MathJax vs KaTeX.
The VS Code Marp extension also works and is the usual authoring path; its themes are
registered in `.vscode/settings.json`.

## Verifying the site

```bash
python3 scripts/check-site.py
```

- **LINK** - dead internal links. **Fails CI** (`--strict` in the workflow), so a dead link
  blocks deployment.
- **COMMENTED** - links inside `<!-- -->` that would break if revealed. `presindex.md` uses a
  deliberate progressive reveal (units stay commented until taught); this keeps those lines honest.
- **STALE** - a linked deck has a newer year-suffixed sibling on disk.
- **UNBUILT** - a Marp source with no exported `.html`.

## Adding new content

Use the **`add-site-content`** skill (`.claude/skills/add-site-content/SKILL.md`). It covers
placement, front matter, export, which index pages to update, and the accessibility
requirements for Regents-facing material.

## Accessibility

There is a **blind student in Regents Physics**. Regents-facing material must pair visual math
and diagrams (`aria-hidden="true"`) with hand-written spoken text - never rely on MathJax's own
accessibility, which double-reads. See `regentsTestPrep/regents-physics-study-guide.html` for
the working pattern.

## Known non-issues (verified against the live site — do not "fix" these)

- **Markdown links containing literal spaces** (`[Rotation](/Presentations/AP SHM/talks/SHM2025.html)`)
  are fine. Kramdown is not CommonMark: it reads to the balanced closing paren, so the space
  survives into the `href` and browsers encode it. Verified `200`. Do not mass-rewrite these to `%20`.
- **The `/mrporterphysics.github.io/` URL prefix** in some older links resolves. GitHub Pages
  strips a leading `/<repo>/` on user sites. Verified `200`. Worth cleaning up for tidiness,
  but it is not a broken link.
- **Pages with no YAML front matter** (`SimulationResources.md`, `earthscienceref.md`,
  `AP Resource Pages/*.md`, `Coding/*.md`) still render, because GitHub
  Pages enables `jekyll-optional-front-matter`. They work, but they bypass `_layouts/default.html`
  so they get no nav or breadcrumbs. Add front matter to new pages.

The real recurring failure mode on this site is **staleness** — a newer deck exists but the
course page still links last year's. `scripts/check-site.py` exists to catch exactly that.

## AP landing pages

There is **one** AP resources page: `courses/ap-physics-resources.md`. The old
`/apphysics.html` ("AP Physics Warehouse") and the orphaned `AP Resource Pages/apresources.md`
were retired — they duplicated it and advertised decks two years out of date. Put new AP
resources on `courses/ap-physics-resources.md`, not a new landing page.

The AP pages and what each is for:

| Page | Role |
|---|---|
| `courses/ap-physics.md` | Course hub — agenda, unit deck links, top-level navigation |
| `courses/ap-physics-resources.md` | Tools, practice, models, study strategies |
| `courses/ap-physics-labs.md` | Lab guidelines and analysis tools |
| `courses/ap-physics-presentations.md` | Card grid of unit decks with hand-written descriptions |
