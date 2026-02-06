# Energy Bar Charts — Interactive Worksheet Session Notes

## Project Overview

Interactive HTML worksheet for AP Physics 1 energy bar chart problems, based on the Modeling Instruction curriculum. Students click cells to build bar charts and get instant feedback on qualitative correctness and energy conservation.

**Live file:** `energy-bar-charts.html` (single self-contained file, no dependencies)

## Source Material

- `Energy Bar Graph.md` — reference guide on creating energy bar graphs
- AP Physics 2023-24 Modeling Instruction worksheet PDF (9 pages, 7 problems)

## Architecture

Single HTML file with inline CSS and JS. No build tools or frameworks.

- **Color scheme:** Flexoki (light/dark toggle)
- **Font:** Fira Code monospace
- **Energy type colors:** Ug (blue), Us (green), K (red), Wext (purple), Q (orange), Echem (magenta)

### Key Data Structures

- `DIAGRAMS` — object mapping problem IDs to animated SVG strings
- `PROBLEMS` — array of problem objects, each with `parts` containing answer keys
- `state` — object tracking bar values per part: `{ iUg, iUs, iK, iEchem, wext, fUg, fUs, fK, fQ }`
- `DEFAULT_BAR_KEYS` — standard 8-bar layout; parts can override with `initialBars`, `workBars`, `finalBars` arrays

### Answer Checking

Each part defines an `answer` object with qualitative expectations (`"zero"`, `"pos"`, `"neg"`, `"any"`). If `conserve: true`, the system also checks that Initial + Work = Final numerically. Parts can set `allowNeg: true` to show negative cells below the zero line.

## Problems Implemented (18 sub-problems)

| # | Scenario | Parts | Notes |
|---|----------|-------|-------|
| 1 | Spring launches roller coaster into loop | a-d | 1b: spring external; 1c: friction; 1d: lower final position |
| 2 | Car rolls up hill (engine off) | a-b | 2b adds friction |
| 3 | Person pushes car uphill (brake on) | a-b | 3a: person external; **3b: person in system → has Echem column** |
| 4 | Bricks launched by spring | a-d | 4c: negative Ug (reference at B); 4d: Earth excluded (negative Wext) |
| 5 | Crate propelled up hill by spring | a-b | 5b: spring external + friction |
| 6 | Bungee jumper | a-b | 6a: Ug→Ug+Us; 6b: cord external (negative Wext) |

## Features

- **Clickable bar chart grids** (0–8 scale, some allow −3 to 8)
- **Per-part custom bar layouts** — parts can specify `initialBars`, `workBars`, `finalBars` arrays to add columns like Echem
- **Animated SVG diagrams** for each problem — object moves A→B on a 5s loop with ghost outlines at both positions, animated springs/cords, bold A/B labels
- **Progress tracking** (0/18 → 18/18 with progress bar)
- **Sandbox mode** for free exploration
- **Collapsible reference guide**
- **Light/dark theme toggle**
- **Mobile responsive**

## Changes Made This Session

1. **Added Echem support for Problem 3b** — new `iEchem` bar key, CSS color, per-part bar layout system (`initialBars`/`workBars`/`finalBars` overrides), updated answer checking and conservation to use part-specific layouts
2. **Fixed negative cell coloring** (Problems 4c, 4d, 6b) — `.cell.neg-zone` CSS was overriding fill colors; moved it before filled classes in cascade
3. **Replaced all 6 static SVG diagrams with animations** — each shows object moving A→B with spring/cord animations, ghost outlines at endpoints, bold labels

## Known Design Decisions

- Problem 3b uses `conserve: true` now that Echem has its own column (previously was `conserve: false` with a note about missing Echem slot)
- Animated diagrams use pure SVG `<animate>`/`<animateTransform>` — no JS animation loops
- 4c has its own diagram variant (string key `"4c"` in DIAGRAMS) showing the shifted zero line