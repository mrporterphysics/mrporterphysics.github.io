---
marp: true
theme: default
paginate: true
math: mathjax
style: |
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
  :root {
    --deep:    #070A14;
    --deep-2:  #0E1326;
    --panel:   rgba(255,255,255,0.045);
    --panel-2: rgba(255,255,255,0.075);
    --edge:    rgba(255,255,255,0.14);
    --fg:      #E9ECF7;
    --muted:   #A9B3D2;
    --star:    #6FD3E8;
    --nebula:  #B794F6;
    --solar:   #F5C542;
    --plasma:  #FF9245;
    --coral:   #FF7A7A;
    --aurora:  #7FD1A4;
  }
  section {
    background-color: var(--deep);
    background-image:
      radial-gradient(1300px 760px at 80% -14%, rgba(183,148,246,0.20), transparent 62%),
      radial-gradient(1000px 640px at 4% 110%, rgba(111,211,232,0.14), transparent 62%),
      radial-gradient(760px 520px at 50% 50%, rgba(255,146,69,0.05), transparent 70%),
      radial-gradient(1.3px 1.3px at 24px 36px,   rgba(255,255,255,0.55), transparent 100%),
      radial-gradient(1px 1px     at 148px 96px,  rgba(255,255,255,0.32), transparent 100%),
      radial-gradient(1.5px 1.5px at 266px 198px, rgba(255,255,255,0.48), transparent 100%),
      radial-gradient(1px 1px     at 74px 254px,  rgba(255,255,255,0.28), transparent 100%),
      radial-gradient(1.2px 1.2px at 338px 62px,  rgba(255,255,255,0.40), transparent 100%),
      radial-gradient(1px 1px     at 200px 300px, rgba(255,255,255,0.26), transparent 100%);
    background-size:
      100% 100%, 100% 100%, 100% 100%,
      420px 340px, 420px 340px, 420px 340px, 420px 340px, 420px 340px, 420px 340px;
    background-repeat:
      no-repeat, no-repeat, no-repeat,
      repeat, repeat, repeat, repeat, repeat, repeat;
    color: var(--fg);
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-size: 26px;
    padding: 40px 60px;
  }
  section::after {
    color: var(--muted);
    font-size: 0.55em;
    letter-spacing: 0.08em;
  }
  h1 {
    color: var(--star);
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 700;
    font-size: 1.75em;
    letter-spacing: -0.015em;
    border-bottom: none;
    padding-bottom: 10px;
    margin-bottom: 18px;
    position: relative;
  }
  h1::after {
    content: '';
    position: absolute; left: 0; bottom: 0; height: 3px; width: 100%;
    background: linear-gradient(90deg, var(--star) 0%, var(--nebula) 42%, var(--solar) 72%, rgba(245,197,66,0) 100%);
    border-radius: 3px;
  }
  h2 {
    color: var(--solar);
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 600;
    font-size: 1.35em;
  }
  h3 {
    color: var(--nebula);
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 600;
    font-size: 1.15em;
  }
  strong { color: #FFD971; }
  em { color: var(--muted); }
  a { color: var(--star); }
  mjx-container, .MathJax { color: var(--fg) !important; }
  blockquote {
    border-left: 4px solid var(--plasma);
    background: var(--panel);
    color: var(--fg);
    padding: 12px 20px;
    margin: 12px 0;
    font-size: 0.95em;
    border-radius: 0 8px 8px 0;
  }
  blockquote strong { color: var(--plasma); }
  /* Tables: high-specificity so they beat Marp's default zebra striping. */
  section table {
    font-size: 0.86em;
    border-collapse: collapse;
    display: table;
    width: auto;
    max-width: 100%;
    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: auto !important;
    margin-right: auto !important;
    background-color: transparent;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 8px;
    overflow: hidden;
  }
  /* Marp's default theme sets tr:nth-child(2n) to a light gray (specificity 0,1,2).
     These rules use a pseudo-class too, so they outrank it. */
  section table tr:nth-child(2n),
  section table tr:nth-child(2n+1),
  section table thead tr:nth-child(n),
  section table tbody tr:nth-child(n) { background-color: transparent; }
  section table th {
    background-color: #1B2447;
    background-image: linear-gradient(90deg, rgba(111,211,232,0.26), rgba(183,148,246,0.26));
    color: #FFFFFF;
    font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
    font-weight: 600;
    padding: 9px 13px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-bottom: 2px solid rgba(111,211,232,0.60);
  }
  section table td {
    padding: 8px 13px;
    color: #EFF2FB;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.10);
  }
  /* Column alignment utilities. Short label/number columns stay centered;
     add lt1..lt4 to a slide's _class to left-align that column (head + cells),
     or "lefttable" to left-align every column. */
  section.lefttable table th,
  section.lefttable table td { text-align: left; }
  section.lt1 table th:nth-child(1), section.lt1 table td:nth-child(1),
  section.lt2 table th:nth-child(2), section.lt2 table td:nth-child(2),
  section.lt3 table th:nth-child(3), section.lt3 table td:nth-child(3),
  section.lt4 table th:nth-child(4), section.lt4 table td:nth-child(4) { text-align: left; }
  /* Opaque row colors so nothing underneath can show through. */
  section table tbody tr:nth-child(odd)  td { background-color: #10162C; }
  section table tbody tr:nth-child(even) td { background-color: #19203D; }
  section table tbody tr:last-child td { border-bottom: none; }
  section table th strong,
  section table th em { color: #FFFFFF; }
  section table td em { color: #B9C2DE; }
  section iframe {
    display: block;
    width: 912px;
    height: 513px;              /* exact 16:9 */
    margin: 6px auto 0 auto;
    border: 1px solid var(--edge);
    border-radius: 10px;
    background: #000;
    box-shadow: 0 12px 44px rgba(0,0,0,0.55);
  }
  section.compact { font-size: 22px; }
  .columns { display: flex; gap: 40px; }
  .col { flex: 1; }
  section.title-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-image:
      radial-gradient(1100px 720px at 50% 18%, rgba(183,148,246,0.30), transparent 62%),
      radial-gradient(900px 620px at 18% 96%, rgba(111,211,232,0.20), transparent 64%),
      radial-gradient(700px 480px at 88% 88%, rgba(255,146,69,0.16), transparent 66%),
      radial-gradient(1.3px 1.3px at 24px 36px,   rgba(255,255,255,0.70), transparent 100%),
      radial-gradient(1px 1px     at 148px 96px,  rgba(255,255,255,0.45), transparent 100%),
      radial-gradient(1.6px 1.6px at 266px 198px, rgba(255,255,255,0.62), transparent 100%),
      radial-gradient(1px 1px     at 74px 254px,  rgba(255,255,255,0.38), transparent 100%),
      radial-gradient(1.2px 1.2px at 338px 62px,  rgba(255,255,255,0.52), transparent 100%),
      radial-gradient(1px 1px     at 200px 300px, rgba(255,255,255,0.34), transparent 100%);
  }
  section.title-slide h1 {
    border-bottom: none;
    font-size: 2.3em;
    background: linear-gradient(100deg, #FFFFFF 0%, var(--star) 38%, var(--nebula) 74%, var(--solar) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--star);
  }
  section.title-slide h1::after { display: none; }
  section.title-slide h2 {
    color: var(--fg);
    font-weight: 500;
    opacity: 0.88;
  }
  section.title-slide h3 { color: var(--muted); font-weight: 500; }
  section.phase-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #04060F;
    background-image:
      radial-gradient(780px 520px at 20% 14%, rgba(111,211,232,0.30), transparent 66%),
      radial-gradient(720px 500px at 84% 88%, rgba(183,148,246,0.34), transparent 66%),
      radial-gradient(520px 380px at 62% 46%, rgba(255,146,69,0.14), transparent 70%),
      radial-gradient(1.6px 1.6px at 24px 36px,   rgba(255,255,255,0.95), transparent 100%),
      radial-gradient(1.2px 1.2px at 148px 96px,  rgba(255,255,255,0.70), transparent 100%),
      radial-gradient(1.8px 1.8px at 266px 198px, rgba(255,255,255,0.88), transparent 100%),
      radial-gradient(1.1px 1.1px at 74px 254px,  rgba(255,255,255,0.62), transparent 100%),
      radial-gradient(1.4px 1.4px at 338px 62px,  rgba(255,255,255,0.78), transparent 100%),
      radial-gradient(1.2px 1.2px at 200px 300px, rgba(255,255,255,0.58), transparent 100%);
  }
  section.phase-title, section.title-slide {
    background-size:
      100% 100%, 100% 100%, 100% 100%,
      300px 240px, 300px 240px, 300px 240px, 300px 240px, 300px 240px, 300px 240px;
  }
  section.phase-title h1 {
    color: #FFFFFF;
    font-size: 2.5em;
    letter-spacing: 0.06em;
    border-bottom: none;
  }
  section.phase-title h1::after {
    height: 3px;
    background: linear-gradient(90deg, transparent, #FFFFFF 22%, #FFFFFF 78%, transparent);
  }
  section.phase-title h2 { color: rgba(255,255,255,0.82); font-size: 1.3em; font-weight: 500; }
  section.phase-title strong { color: #FFFFFF; }
  .key-idea {
    background: rgba(127,209,164,0.12);
    border-left: 4px solid var(--aurora);
    padding: 12px 20px;
    margin: 12px 0;
    border-radius: 0 8px 8px 0;
  }
  .key-idea strong { color: var(--aurora); }
  .warning {
    background: rgba(255,122,122,0.12);
    border-left: 4px solid var(--coral);
    padding: 12px 20px;
    margin: 12px 0;
    border-radius: 0 8px 8px 0;
  }
  .warning strong { color: var(--coral); }
  .vocab {
    background: rgba(183,148,246,0.14);
    border-left: 4px solid var(--nebula);
    padding: 12px 20px;
    margin: 12px 0;
    border-radius: 0 8px 8px 0;
  }
  .vocab strong { color: var(--nebula); }
  footer { font-size: 0.6em; color: var(--muted); }
  .small { font-size: 0.7em; color: var(--muted); }
  .panel {
    background: var(--panel);
    border: 1px solid var(--edge);
    border-radius: 10px;
    padding: 12px 18px;
    margin: 10px 0;
  }
  .steps { background: rgba(111,211,232,0.10); border-left: 4px solid var(--star);
           padding: 12px 20px; margin: 12px 0; border-radius: 0 8px 8px 0; }
  .steps strong { color: var(--star); }
  /* ---- spectrum bars (400–700 nm; left% = (λ − 400) / 3) ---- */
  .specrow { display: flex; align-items: center; gap: 16px; margin: 6px 0; }
  .speclabel { width: 170px; text-align: right; font-size: 0.8em; font-weight: bold; color: var(--fg); }
  .spec {
    position: relative; flex: 1; height: 44px;
    border: 1px solid rgba(255,255,255,0.45);
    border-radius: 3px;
    box-shadow: 0 0 18px rgba(111,211,232,0.18);
    background: linear-gradient(to right, #7f00ff 0%, #3b3bff 13%, #00b4ff 27%, #00e08a 37%, #7fff00 50%, #ffff00 60%, #ff9900 70%, #ff3300 82%, #b00000 100%);
  }
  .spec.dark { background: #04060D; box-shadow: none; }
  .spec .ln { position: absolute; top: 0; bottom: 0; width: 3px; background: #000; transform: translateX(-1px); }
  .spec.dark .ln { width: 4px; }
  .axis { position: relative; flex: 1; height: 22px; font-size: 0.6em; color: var(--muted); }
  .axis span { position: absolute; transform: translateX(-50%); }
  /* Guided-notes review decks: what students write in each blank. */
  .fill {
    color: #FFD34D;
    font-weight: 700;
    border-bottom: 2px solid rgba(255,211,77,0.55);
    padding: 0 3px;
  }
  .pkt {
    display: inline-block;
    font-size: 0.62em;
    letter-spacing: 0.06em;
    color: var(--muted);
    border: 1px solid var(--edge);
    border-radius: 20px;
    padding: 2px 12px;
    margin-bottom: 6px;
  }
---

<!-- _class: title-slide -->

# ☄️ Stability of the Solar System
## Unit 2: Probability of Life Elsewhere — Investigation 1
### why the Moon is covered in craters · and Earth is not

<!--
WHAT THIS DECK IS: the 5E teaching deck for Investigation 1 of Unit 2. It runs across FIVE meetings and the phase-title slides mark where each one starts. Student packet: "Stability of the Solar System" (ess-u2-l1-stability.pdf). Organizer: "Performance Task Organizer" (ess-u2-pto.pdf), Part D.

THE FIVE MEETINGS
  M1 Mon 11/23 (A, 40 min) — ENGAGE
  M2 Tue 11/24 (B, 80 min) — EXPLORE 1, the dating lab
  M3 Mon 11/30 (C, 40 min) — EXPLAIN 1, the Late Heavy Bombardment
  M4 Tue 12/01 (D, 80 min) — EXPLORE 2, the water lab
  M5 Wed 12/02 (A, 40 min) — EXPLAIN 2 + EVALUATE. Elaborate (rock cycle) goes home.

STANDARDS: HS-ESS1-6 (evidence from ancient Earth materials, meteorites and other planetary surfaces for Earth's formation and early history) · HS-ESS2-5 (properties of water and its effects on Earth materials and surface processes). SEP: Analyzing and Interpreting Data; Planning and Carrying Out Investigations. CCC: Stability and Change; Patterns.

THE ONE THING: students arrive believing Earth was hit by fewer asteroids. They must leave knowing Earth was hit just as hard and DOES NOT SHOW IT. Everything in this investigation serves that single reversal. Do not give it away on day one.
-->

---

# Where we are

<div class="key-idea">

**The unit question:** what set of conditions allowed humans to evolve on Earth — and why did it take so long?

</div>

This investigation answers **one piece** of it:

### Was early Earth even a safe place for life to start?

<div class="columns">
<div class="col">

**You already know**
- Earth is ~4.5 billion years old
- Life appeared ~3.5 billion years ago
- Five mass extinctions happened before us

</div>
<div class="col">

**You are about to find out**
- What the solar system was like back then
- Why that delayed the start of life
- Why Earth has almost no craters

</div>
</div>

<!--
LAUNCH: hold up the Performance Task Organizer. "This is the one document you keep for the whole unit. Four investigations, four times you come back to it. Today starts the first one."

Point at the map table in PTO Part B. Students who cannot say which piece they are working on read all four Evaluate sections as four unrelated essays.

Do not preview the answer. The reversal in Explain 1 only lands if they walk in with the wrong model.
-->

---

<!-- _class: phase-title -->

# ENGAGE
## Craters in the Solar System
### Meeting 1 · Monday 11/23 · 40 minutes

<!--
PACKET PART A. See-Think-Wonder.

RUN: numbers on the board first, THEN the surfaces. Google Mars, Google Moon, Google Earth at Barringer Crater. 12-15 minutes exploring in pairs.

ROUTINE: Domino Discover on the See column — every student puts one observation up before anyone interprets. It stops the three fastest talkers from setting the class model.

DO NOT RESOLVE ANYTHING TODAY. The Wonder column is the agenda for the next four meetings. Send every question to the Driving Question Board.
-->

---

# The numbers

<div class="columns">
<div class="col">

## 🌍 Earth
# ~128
impact craters discovered

</div>
<div class="col">

## 🔴 Mars
# 300,000+
impact craters

</div>
</div>

## 🌕 The Moon — more than **one million**

<div class="warning">

These three worlds are neighbors. They sit in the same part of the solar system. **So why is Earth's number so much smaller?**

</div>

<!--
Write the three numbers on the board and leave them there for the whole investigation.

Ask for first reactions before any exploring. You will hear "Earth gets hit less" and "our atmosphere burns them up." WRITE BOTH ON THE BOARD, in the students' own words, attributed. Those two sentences are what Explore 1 and Explore 2 exist to test.

The atmosphere claim is partly true and completely insufficient — it stops small meteoroids, not anything that leaves a kilometer-wide crater. Do not say that yet. Ask it in Explain 1: "does that explain Barringer Crater, which did land?"

LOOK AND LISTEN FOR: students who notice Earth is mostly water and heavily vegetated. That is the beginning of the right answer and it is worth naming as a noticing without confirming it.
-->

---

# What to look for

<div class="columns">
<div class="col">

**🌕 Moon**
Craters on top of craters. Every size. Everywhere. No gaps.

**🔴 Mars**
Heavily cratered — but also large smooth areas, channels, canyons.

</div>
<div class="col">

**🌍 Earth — Barringer Crater**
Small. Isolated. Rim already worn down. Hard to find others.

</div>
</div>

<div class="key-idea">

Record what you **see**, what it makes you **think**, and what you **wonder**.

</div>

<!--
CONFERRING PROMPTS while they explore:
 • "Which surface looks oldest to you? What makes you say that?"
 • "Mars has smooth regions. What could smooth a surface out?"
 • "You found one crater on Earth. How hard was it?"

The Mars question is a deliberate plant — Mars has ancient water channels, and students noticing the smooth areas are seeing erosion without a name for it yet. Let it sit.

STEER THE WONDER COLUMN toward: Were they destroyed? When did this happen? Are these worlds made of different stuff? Are they the same age?

The last two open Explore 1. If nobody asks them, ask them yourself and credit the class.
-->

---

<!-- _class: phase-title -->

# EXPLORE 1
## Dating the Early Solar System
### Meeting 2 · Tuesday 11/24 · 80 minutes · **lab**

<!--
PACKET PART B AND C. PhET "Radioactive Dating Game".

TIMING for the 80-minute block:
  0:00  Do Now — yesterday's crater numbers, one sentence: why the difference?
  0:10  Decay Rates tab, Part 1a (packet q1-7) — whole class on the projector for q1-3, then pairs
  0:30  Dating Game tab, Part 1b — pairs
  0:45  Part 2: Tables 1 and 2, then Tables 3 and 4 off the decay curve
  1:05  Part D — Making Sense See-Think-Wonder
  1:15  Class Consensus Discussion on rows 3 and 4 only

LAB MINUTES: 80. Log it.

THE TWO FINDINGS they must leave with — do not state either one, make them read it off their own tables:
  1. Earth, Moon, Mars and meteorites are ALL the same age (~4.4–4.6 By)
  2. Lunar impact melt rocks are ALL younger and tightly clustered (3.8–4.0 By)
-->

---

# Radioactive decay

An unstable **parent** isotope changes into a stable **daughter** isotope.

<div class="columns">
<div class="col">

**Carbon-14 → Nitrogen-14**
half-life **5,730 years**

**Uranium-238 → Lead-206**
half-life **4.5 billion years**

</div>
<div class="col">

<div class="key-idea">

Nothing is lost. Every daughter atom **used to be** a parent atom.

</div>

</div>
</div>

<div class="warning">

The rate **never changes.** Not with heat, not with pressure, not with chemistry. That is what makes it a clock.

</div>

<!--
PACKET q1-3. Red dots = undecayed parent. Blue dots = daughter. CONFIRM THE PALETTE ON THE PROJECTOR BEFORE CLASS — PhET has shipped more than one color scheme for this tab.

The "rate never changes" line is the single most important sentence in the Explore. It is why a rock can be dated at all, and it is the Stability and Change crosscutting concept in one sentence: the decay rate is the stable thing, which is how we measure everything that isn't.

MISCONCEPTION: students think the atoms "disappear" or "burn up." Point at the pie chart — the whole pie is always there, only the proportions move.
-->

---

# Half-life

The time for **half of what is left** to decay. Then half of that. Then half of that.

| Half-lives | Parent remaining |
|:--|:--|
| 0 | 100% |
| 1 | **50%** |
| 2 | **25%** |
| 3 | **12.5%** |

<div class="warning">

**Not** half the total lifetime. After two half-lives you have **25%** left — not zero.

</div>

<!--
PACKET q4-6, and Tables 1 and 2.

THE ERROR TO WATCH FOR, and it is extremely common: students add halves. 50% + 50% = 100%, so they answer "0% left after two half-lives."

CONFERRING PROMPT that fixes it every time: "half of the 50% that is left is how much?"

NOTE ON TABLE 1 — it contradicts itself. New Visions prints 4.5 billion years for ONE half-life of U-238 and 13.4 billion for THREE. 3 × 4.5 = 13.5. Their 13.4 comes from the true half-life, 4.468 By, which rounds to 4.5. Use 4.5 throughout; a student answering 13.5 is correct, and a student who notices the contradiction has done better than the arithmetic. Credit both.

ALSO: the worked example row in the Dating Game table reads "Carbon-14 / 98.2% / 134 years." 98.2% is actually 150 years. It is the simulation's own readout and it is wrong. Do not mark a correct 150 as an error.
-->

---

# The decay curve

![h:400](l1-decay-curve.svg)

<!--
This is Figure 1 in the packet — and the three marked points are what students will produce themselves over the next 20 minutes. DO NOT SHOW THIS SLIDE UNTIL THEY HAVE FILLED IN TABLES 3 AND 4. It gives the whole thing away.

Use it as the consolidation at the end of the Explore: "here is what you just found, all on one graph."

READING AN AGE: find the % on the vertical axis, go across to the curve, drop to the horizontal axis. Students must use FIGURE 2 in the packet (the zoomed version) — at the scale of this graph every sample in Tables 3 and 4 sits on the same pixel. Expect several groups to try the full curve and get 4.5 for everything.
-->

---

# Which isotope do you use?

<div class="columns">
<div class="col">

**Carbon-14** · 5,730 yr
Things that were **once alive** and are **young** — bone, wood, charcoal, shell.

Useful to about **50,000 years**.

</div>
<div class="col">

**Uranium-238** · 4.5 By
**Rocks** — minerals, meteorites, planetary surfaces.

Useful across **billions** of years.

</div>
</div>

<div class="key-idea">

Pick the isotope whose half-life is **comparable to the age you are measuring**. Too short and it is all gone. Too long and nothing has happened yet.

</div>

<!--
PACKET q8-9.

WHY C-14 FAILS ON OLD THINGS: after ~10 half-lives an isotope is undetectable. For C-14 that is about 57,000 years. On a rock it reads 0% and tells you nothing except "older than 50,000 years."

WHY U-238 FAILS ON YOUNG THINGS: over a few thousand years it has decayed so little the reading is indistinguishable from 100%. You cannot measure a change that has not happened.

This is a real scientific-practice idea, not a fact to memorise: instruments have ranges, and choosing the right one is part of the work. Worth saying out loud.
-->

---

<!-- _class: phase-title -->

# EXPLAIN 1
## The Late Heavy Bombardment
### Meeting 3 · Monday 11/30 · 40 minutes

<!--
PACKET PARTS E, F, G.

TIMING for 40 minutes:
  0:00  Do Now — Part E q10-12 on their own, 5 min
  0:08  Share out. The two patterns go on the board.
  0:15  Part E q13-15 — the reversal
  0:22  LHB reading + Think-Talk-Open Exchange (Part F)
  0:34  Part G summary task — start it, finish at home

ROUTINE: Think-Talk-Open Exchange on the LHB reading. Individual writing FIRST, in silence, before any talking. The routine fails if you let them start in groups.

PTO PART D is assigned at the end of this meeting? NO — wait. Part D needs Explore 2's water evidence too. Tell them that explicitly or they will write half an answer.
-->

---

# What the rocks said

<div class="columns">
<div class="col">

**Oldest minerals**

| From | Age |
|:--|:--|
| Earth | 4.4 By |
| Mars | 4.5 By |
| Moon | 4.4 By |
| Meteorites | 4.6 By |

</div>
<div class="col">

**Lunar impact melt rock**

| Sample | Age |
|:--|:--|
| 1 | 3.8 By |
| 2 | 3.8 By |
| 3 | 4.0 By |
| 4 | 3.9 By |

</div>
</div>

<div class="key-idea">

Four different worlds. **The same age.** → They formed **together**, from the same disk of dust.

</div>

<!--
PACKET PART E q10-12. Let students read these off their own Tables 3 and 4 before this slide goes up.

THE FIRST FINDING — HS-ESS1-6 in one line. Earth, the Moon, Mars and meteorites are the same age because they condensed from one disk at one time. This is the standard, and it is the premise of everything that follows.

WHY THE METEORITE IS OLDEST: it has never been melted or reworked by a planet's interior, so it preserves the original formation age most faithfully. Earth's surviving rocks are a little younger than Earth is, for exactly that reason. Good extension for a group that finishes early.

IMPACT MELT ROCK: formed by the heat of an impact. So the rock's age IS the impact's age. Make sure that sentence is said; without it the second table is just numbers.
-->

---

# Why the clustering is the evidence

<div class="columns">
<div class="col">

**If impacts were steady** through history, melt rock ages would be **spread out** — 4.4, 3.1, 2.0, 0.8...

</div>
<div class="col">

**What we actually see:** 3.8, 3.8, 4.0, 3.9

All inside a **200-million-year window.**

</div>
</div>

<div class="key-idea">

A burst, not a drizzle. Around **4 billion years ago**, everything in the inner solar system was being hit at once.

</div>

![h:230](l1-timeline.svg)

<!--
THIS IS THE REASONING SLIDE and it is the one students skip. A student who says "the rocks are 3.8 billion years old, which matches the hypothesis" has not yet said why it matters. The clustering is the evidence; the age alone is not.

CONFERRING PROMPT: "if asteroids had been hitting the Moon steadily the whole time, what ages would these four rocks have?"

THE LHB READING (Part F) gives the mechanism: Jupiter and Saturn fell into a 2:1 orbital resonance, which destabilised Neptune and Uranus, which scattered the Kuiper Belt. Students do not need the orbital mechanics. They need to know there is a physical cause and that it is a COMPUTER MODEL, not a direct observation — that is a limitation they must write in PTO Part D.

NOW THE REVERSAL (Part E q13-15). If the Moon was being hit, so was Earth — same neighborhood, same time, and Earth is bigger with more gravity. Say the sentence out loud and put it on the board:

  "Earth was hit just as much and does not show it."

That sentence is the whole investigation. Explore 2 explains the second half.
-->

---

<!-- _class: phase-title -->

# EXPLORE 2
## The Role of Water
### Meeting 4 · Tuesday 12/01 · 80 minutes · **lab**

<!--
PACKET PARTS H AND I. Two experiments.

TIMING for the 80-minute block:
  0:00  Do Now — where did Earth's craters go? one sentence
  0:05  Part 1 chemical weathering: chalk in water vs vinegar. IV/DV/prediction first.
  0:20  5-minute run + observations, second weighing, analysis q24-25
  0:35  Part 2 — groups DESIGN the erosion/deposition experiment. Check every plan before they pour.
  0:55  Run it, collect data
  1:10  Making Sense See-Think-Wonder + q28

LAB MINUTES: 80. Log it.

MATERIALS: chalk (two pieces per group), white vinegar, water, clear cups, balance reading to 0.01 g, masking tape, stopwatch, forceps, GOGGLES. Stream tables, cut 2L bottles or cups with holes, wet fine sand / coarse sand / gravel, ring stands and clamps, spray bottles, dividers, rulers, a ball for making craters.

IF THE VINEGAR RESULT IS WEAK: the chalk is gypsum-based, not calcium carbonate. Real blackboard chalk or a limestone chip works; some art chalk does not react.

BIGGEST SOURCE OF NOISE: one group blots their chalk dry before the second weighing and another does not. Say so before they start.
-->

---

# Water dissolves things

A water molecule is **polar** — the oxygen end slightly negative, the hydrogen ends slightly positive.

<div class="columns">
<div class="col">

**CO₂ dissolves in water**

↓

**carbonic acid** (H₂CO₃)

↓

**chemically weathers rock**

</div>
<div class="col">

<div class="key-idea">

Rain is naturally **slightly acidic** — because the atmosphere's carbon dioxide dissolves into it on the way down.

</div>

</div>
</div>

<!--
PACKET PART J reading, but introduce the idea here so the vinegar experiment has a mechanism behind it rather than being a trick.

THE LINK STUDENTS MUST MAKE: vinegar in a cup for 5 minutes is a SPEEDED-UP MODEL of acidic rain falling on rock for 4 billion years. The experiment is not about vinegar.

CONFERRING PROMPT after the result: "our experiment ran five minutes. How long has rain been falling on Earth?"

Chalk is calcium carbonate — the same mineral as limestone. That is why this works and why it maps onto real rock.
-->

---

# Two processes, working together

<div class="columns">
<div class="col">

### Chemical weathering
Acidic water **dissolves** the material binding rock together. What is left is pitted, crumbly, broken into pieces.

</div>
<div class="col">

### Erosion & deposition
Moving water **carries those pieces away** and **drops them** somewhere lower — often into the hole.

</div>
</div>

<div class="key-idea">

Weathered rock is **far easier to erode** than solid rock. Together they erase a crater from **two directions at once** — the rim is worn down **and** the basin is filled in.

</div>

<!--
PACKET q28 — "how could erosion and deposition affect rocks that had ALREADY experienced chemical weathering?"

THE WORD TO LISTEN FOR IS "FASTER" OR "EASIER." Students who say weathering and erosion are two separate things that both happen have only half the idea. They COMPOUND.

DEPOSITION IS THE HALF STUDENTS FORGET. They report the rim eroding and never ask where the sediment went. Ask it. A crater disappears because it is filled in as much as because it is worn down.

DESIGN CHECK before any group pours water — three things:
  1. Is there actually a crater pressed into the sediment to start with? (Groups forget.)
  2. Is exactly ONE variable changing?
  3. Is there a "before" measurement? Change needs two numbers.

ACCESS FOR ALL LEARNERS: a group that stalls on design gets the slope comparison handed to them (low vs high slope, same water, same sediment, measure crater depth before and after 2 minutes) and still does the full analysis.
-->

---

<!-- _class: phase-title -->

# EXPLAIN 2 & EVALUATE
## Why Earth has 128 craters
### Meeting 5 · Wednesday 12/02 · 40 minutes

<!--
PACKET PARTS J, K AND M. Part L (the rock cycle Elaborate) GOES HOME — it is a diagram-analysis task that works as homework, and the rock cycle is revisited in Unit 3.

TIMING for 40 minutes:
  0:00  Water inventory table, Part J q29 — 6 min
  0:08  Class Consensus Discussion: the five pieces of evidence go on the board IN ORDER
  0:18  Part K — write the scientific explanation from the shared list
  0:32  Part M — the stromatolite, as an exit task
  0:38  Assign PTO Part D and Part L

ROUTINE: Class Consensus Discussion before they write. Building the evidence list as a class is what makes the writing possible in 14 minutes.
-->

---

# Water in the inner solar system

| | Water |
|:--|:--|
| **🌍 Earth** | **71% of the surface.** Oceans, lakes, glaciers, ice caps — and it **cycles** |
| **☿ Mercury** | Traces of vapor in the atmosphere |
| **🔴 Mars** | Ice at the poles. A little vapor. Some transient liquid |
| **🌕 Moon** | Limited ice |

<div class="warning">

Weathering, erosion and deposition need water that is **liquid**, **moving**, and **in quantity**. Only one world here has that.

</div>

<!--
PACKET PART J q29.

MISCONCEPTION TO PRESS ON: "Mars has water so it should have erosion." Press on STATE AND MOTION — ice sitting at a pole is water that is not doing anything. It does not dissolve rock and it does not carry sediment.

Mars DOES have ancient channels and valleys, which is why it has those smooth regions students noticed in the Engage. Water worked there once, and then stopped. That is a good payoff for the noticing from day one — go back and credit whoever said it.

PLATE TECTONICS goes with this: Earth is the only one of the four with ACTIVE plate tectonics. Mercury, Mars and the Moon all show signs of ancient activity that ceased. Subduction destroys crust outright — which is why almost no ocean floor is older than about 200 million years.
-->

---

# The answer

<div class="steps">

1. Earth, Moon, Mars, meteorites — **all the same age.** They formed together, in the same place.
2. Lunar impact melt rock — **3.8 to 4.0 By.** A clustered bombardment that hit everything.
3. **So Earth was hit just as often.** "Fewer impacts" is ruled out.
4. Chalk dissolved in acid. The stream table erased a crater. **This is how a surface feature is destroyed.**
5. Only Earth has liquid water and active tectonics. **Only Earth has the agents.**

</div>

<div class="key-idea">

The difference is in **preservation**, not in **bombardment**.

</div>

<!--
PACKET PART K — the scientific explanation. Build this list on the board as a class before anyone writes.

GRADE ON THE LINK, NOT THE LENGTH. A student who writes a page about erosion without ever establishing that Earth was hit equally has not answered the question — they have assumed the thing that needed proving. Ask: "how do you know Earth was hit as much as the Moon?"

Steps 1-3 are the half that gets skipped and the half that carries the standard.

THE IRONY IS WORTH SAYING OUT LOUD: the very activity that made Earth suitable for life is what destroyed the evidence that Earth was bombarded. We had to go to the Moon to find out what happened here.
-->

---

# The oldest evidence of life

A **stromatolite** — a rock built by colonies of microscopic organisms, from an ancient ocean.

**59% of its Uranium-238 remains** → about **3.4 billion years old.**

<div class="columns">
<div class="col">

**Bombardment ends** ~3.8 By

**Oldest life** ~3.4 By

In that order.

</div>
<div class="col">

<div class="warning">

But can one rock prove life did not exist **earlier**?

</div>

</div>
</div>

<!--
PACKET PART M — the Evaluate, and the exit task.

ANSWER: no. And the reasoning matters far more than the verdict.

STRENGTHS: direct physical evidence (not an inference), quantitatively dated, reproducible, gives a firm MINIMUM age, and lands after the LHB ended — consistent with the delay.

LIMITATIONS: absence of evidence is not evidence of absence. One sample is not a data set — four impact melt rocks agreeing is an argument, one stromatolite is a point. And THE ROCK CYCLE ARGUES AGAINST US: the same weathering, erosion and tectonics that destroyed Earth's craters destroyed most rock older than this. Early single-celled life with no hard parts rarely leaves anything behind anyway.

THE STRONGEST RESPONSES TURN PART L AGAINST THE SAMPLE — they use the rock cycle to argue that the absence of older evidence is exactly what you would expect whether or not older life existed. If a student writes that, read it out.

WATCH FOR: "yes, because that's the oldest one we found." Ask: "how many craters did Earth have 4 billion years ago, and how many can we find now?"

THIS ANSWER GOES STRAIGHT INTO PTO PART D, COMPONENT 4. Tell them before they write.
-->

---

# Before Investigation 2

<div class="key-idea">

Go to your **Performance Task Organizer, Part D.** Everything you need is in your packet.

</div>

| What you need | Where it is |
|:--|:--|
| When the bombardment happened | Part C, Table 4 |
| Why Earth has few craters | Parts H, I, J, K |
| That life appeared after it | Part M |
| The limitations of that evidence | Part M, question 2 |

**Also due:** Part L — the rock cycle.

<!--
The claim in PTO Part D is GIVEN to students: "Life did not appear until 3.5 billion years ago because the Earth was undergoing a period of heavy asteroid bombardment 4 billion years ago." Their job is the evidence and the reasoning, not the claim.

FOUR REQUIRED COMPONENTS and the fourth is the one they skip: strengths AND limitations. Press with "could life have existed and left nothing behind?"

NEXT INVESTIGATION: Coevolution of Earth and Life. The transition question from the Driving Question Board is about the atmosphere — has Earth always had one, how has it changed, and what did that do to life? If that question is not on the board yet, put it there at the end of this meeting.
-->

---

<!-- _class: compact -->

# Vocabulary

<div class="vocab">

**radioactive decay** — an unstable parent isotope changing into a stable daughter isotope at a fixed rate

**half-life** — the time for half of the remaining parent isotope to decay

**absolute dating** — using radioactive decay to assign an age in years

**impact melt rock** — rock melted by the heat of an asteroid impact; its age is the impact's age

**Late Heavy Bombardment** — a period ~4.0–3.8 billion years ago when the inner solar system was struck repeatedly

**chemical weathering** — the breakdown of rock by chemical reaction, especially with acidic water

**erosion** — the removal and transport of weathered material

**deposition** — the dropping of transported sediment in a new place

**carbonic acid** — H₂CO₃, formed when carbon dioxide dissolves in water; weathers rock

</div>

<!--
Reference slide, part 1 of 2. Leave it up during the Part K writing and during PTO Part D.

The three students reach for most: half-life, impact melt rock, chemical weathering.
-->

---

<!-- _class: compact -->

# Vocabulary, continued

<div class="vocab">

**superposition** — in undisturbed layers, deeper means older

**plate tectonics** — the motion of Earth's crustal plates, which builds, buries and destroys rock

**stromatolite** — a layered rock built by colonies of microorganisms; the oldest evidence of life

**parent isotope** — the unstable isotope that decays

**daughter isotope** — the stable isotope it becomes

**polar molecule** — a molecule with slightly positive and slightly negative ends, like water

</div>

<!--
Reference slide, part 2 of 2.

The three students reach for most: half-life, impact melt rock, chemical weathering.

ESRT NOTE: the 2024 Earth Science Reference Tables carry radioactive decay data. SKL-1 is exercised every time a student looks up a half-life rather than being told it.
-->
