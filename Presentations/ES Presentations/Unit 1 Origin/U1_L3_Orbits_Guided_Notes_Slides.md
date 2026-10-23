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
  /* Marp's default theme sets tr:nth-child(2n) to a light grey (specificity 0,1,2).
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
  /* Column alignment utilities. Short label/number columns stay centred;
     add lt1..lt4 to a slide's _class to left-align that column (head + cells),
     or "lefttable" to left-align every column. */
  section.lefttable table th,
  section.lefttable table td { text-align: left; }
  section.lt1 table th:nth-child(1), section.lt1 table td:nth-child(1),
  section.lt2 table th:nth-child(2), section.lt2 table td:nth-child(2),
  section.lt3 table th:nth-child(3), section.lt3 table td:nth-child(3),
  section.lt4 table th:nth-child(4), section.lt4 table td:nth-child(4) { text-align: left; }
  /* Opaque row colours so nothing underneath can show through. */
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
  /* Diagrams. Marp strips an inline style attribute from <img>, so diagram
     size is set with Marp's own ![h:NNN] syntax and centring is done here. */
  section p > img:only-child { display: block; margin: 10px auto; }
---

<!-- _class: title-slide -->

# 🪐 Planets and Orbits
## Guided Notes — Unit 1: Discovering New Worlds
### Lesson 3 review · what decides the phase of water · the transit method · Kepler's two laws

<!--
WHAT THIS DECK IS: the projection companion to the guided-notes packet "Guided Notes: Planets and Orbits" (ess-u1-guided-notes-orbits.pdf). Slides follow the packet Part for Part. Students fill in their blanks as each slide comes up.
NOT the teaching deck. The 5E instruction lives in U1_Discovering_New_Worlds_L3_Slides. This is end-of-unit consolidation: content knowledge only.
EVERY BLANK ANSWER is shown in gold. Advance, let students write, then discuss.
STANDARDS: HS-ESS1-4 use mathematical or computational representations to predict the motion of orbiting objects · ESS1.B(1) Kepler's laws describe common features of the motions of orbiting objects · CCC1(4) mathematical representations are needed to identify some patterns · CCC3(5) algebraic thinking predicts the effect of a change in one variable on another.
ASSESSMENT BOUNDARY: never more than two bodies, never calculus. Gravity as the CAUSE belongs to Unit 2 — if students ask why the relationship holds, that is the honest answer.
TIMING: about one class period at pace, two if you work the calculation questions.
-->

---

<!-- _class: phase-title -->

# PART A
## Distance Decides the Phase

---

# Same Water, Different Energy

<div class="pkt">PACKET PART A</div>

<div class="columns">
<div class="col">

Water is the **same substance** everywhere in the solar system. What changes is how much **energy** it receives from the Sun — and that depends on how far away it orbits.

| Where it orbits | Phase | Example |
|---|---|---|
| Closer than Earth | vapour | Mercury, Venus |
| About Earth's distance | **liquid** | Earth |
| Further than Mars | ice | Europa, Neptune, Pluto |

</div>
<div class="col">

<div class="vocab">

**Habitable zone** — the band of distances from a star where a planet can hold **liquid water** on its surface.

Closer in, water is vapour. Further out, it is ice.

</div>

</div>
</div>

<!--
PACKET: Part A, the table and the key term.
THE COMMON MISCONCEPTION: that different planets have different KINDS of water. They do not. Same molecule, different energy.
-->

---

# Our Solar System's Habitable Zone

<div class="pkt">PACKET PART A — 5 blanks</div>

Our solar system's habitable zone runs from about <span class="fill">142</span> to <span class="fill">172</span> million km.

Earth orbits at an average of about <span class="fill">150</span> million km — **inside the zone**.

<div class="warning">

**The habitable zone is not a fixed distance.** It depends on the <span class="fill">star</span>.

A dim, low-mass star has a habitable zone much <span class="fill">closer</span> in. A bright, massive star's zone is much further out.

</div>

<!--
PACKET: Part A, five blanks.
PACKET QUESTION 1 — "a planet orbits at 1.35 AU, is it in the habitable zone?" The answer is YOU CANNOT TELL. In our system 1.35 AU is comfortable; HD-20782 b orbits at 1.352 AU and is far too close, because its star's zone starts at 2.613 AU.
MAKE STUDENTS SAY IT: "habitable" is never a distance on its own. It is a distance relative to THAT star. This is the single most common error on this content.
-->

---

<!-- _class: phase-title -->

# PART B
## Why an Average Is Not Enough

---

# A Planet Travels an Orbit

<div class="pkt">PACKET PART B — 3 blanks</div>

| Object | Average (AU) | Minimum (AU) | Maximum (AU) |
|---|---|---|---|
| Earth | 1.000 | 0.983 | 1.017 |
| Mars | 1.523 | 1.381 | 1.666 |
| Neptune | 30.061 | 29.709 | 30.386 |
| **Comet Borrelly** | **3.590** | **1.350** | **5.830** |

Earth, Mars and Neptune barely change distance at all. Comet Borrelly changes by a factor of more than <span class="fill">four</span>.

That is why its water is frozen for most of its <span class="fill">6.8-year</span> orbit, then <span class="fill">vaporises</span> when it swings in close to the Sun.

<!--
PACKET: Part B, the table and three blanks.
THIS TABLE IS THE WHOLE ARGUMENT IN FOUR ROWS. Have students compare the min and max columns before you reveal anything — the contrast between the first three rows and Borrelly does the teaching.
WATCH FOR students who read Borrelly's 3.590 AU average and conclude it is "between Mars and Europa, so it should be ice." That is exactly the trap the average sets.
-->

---

# The Rule to Carry Forward

<div class="pkt">PACKET PART B</div>

<div class="columns">
<div class="col">

<div class="key-idea">

**Nearly circular orbit**

→ roughly one distance
→ roughly constant energy
→ **stable temperature**
→ water stays in one phase

</div>

</div>
<div class="col">

<div class="warning">

**Stretched orbit**

→ close, then far
→ energy swings
→ **temperature swings**
→ water changes phase

</div>

</div>
</div>

<!--
PACKET: Part B, the infobox and question 2.
PACKET QUESTION 2 — two planets, same average distance from the same star, one circular and one stretched. The circular one is the better candidate: same average, completely different experience.
THIS IS THE SENTENCE TO MAKE THEM WRITE: an average hides variation. They will need it again in Part F.
-->

---

<!-- _class: phase-title -->

# PART C
## Finding a Planet We Cannot See

---

# The Transit Method

<div class="pkt">PACKET PART C — 3 blanks</div>

<div class="vocab">

**Transit method** — detecting a planet from the small **dip** in its star's brightness as the planet passes in front of it.

</div>

<div class="columns">
<div class="col">

**What it tells us**

1. **How often** the planet passes in front — its <span class="fill">orbital period</span>
2. The planet's **relative size** — a bigger planet makes the light drop <span class="fill">further</span>
3. **How many** planets — dips of <span class="fill">different depths</span>

</div>
<div class="col">

<div class="warning">

**What it does *not* tell us**

Nothing at all about **how far** the planet orbits from its star.

That is the gap Kepler's Third Law fills.

</div>

</div>
</div>

<!--
PACKET: Part C, three blanks.
WE NEVER SEE THE PLANET. We see the star get slightly dimmer. Students find this genuinely surprising and it is worth a beat.
THE DIP IS TINY — about 0.35% for Kepler-5b. Hold up a hand in front of a lamp across the room to make the scale real.
-->

---

# Reading a Light Curve

<div class="pkt">PACKET PART C</div>

![h:380](l3-light-curve.svg)

<div class="key-idea">

The dips repeat every **3.5 days** — so Kepler-5b's **orbital period** is 3.5 days.

</div>

<!--
PACKET: Part C figure.
HOW TO READ IT: find any two consecutive dips and measure the gap between them. That gap IS the orbital period.
THE DEPTH IS THE SAME EVERY TIME because the same planet blocks the same fraction of light. If a second planet were present you would see dips of a DIFFERENT depth interleaved.
SOURCE: NASA JPL, "Exploring Exoplanets with Kepler."
-->

---

<!-- _class: phase-title -->

# PART D
## Kepler's Third Law — Period Into Distance

---

# A Curve, Not a Straight Line

<div class="pkt">PACKET PART D — 1 blank</div>

![h:380](l3-period-vs-distance.svg)

<div class="key-idea">

Neptune orbits **30×** further out than Earth but takes <span class="fill">165</span> years, not 30.

</div>

<!--
PACKET: Part D, first blank.
THE CURVE BENDS UPWARD. That is what "increases faster than the distance does" looks like, and it is why a straight-line intuition fails here.
EVERY POINT SITS ON THE CURVE — including Comet Borrelly, at its AVERAGE distance. Kepler's Third Law does not care about orbit shape; it only ever gives you the average. That limitation is Part E's reason to exist.
-->

---

# Why the Graph Was Not Enough

<div class="pkt">PACKET PART D — 1 blank</div>

<div class="columns">
<div class="col">

A graph shows you **that** two variables are related.

It is not precise enough to make a **claim** with.

Read a 50-year period off the curve and different people get anything from **12.5** to **14 AU**.

</div>
<div class="col">

<div class="key-idea">

For precision you need an <span class="fill">equation</span>.

**CCC 1 — Patterns:** mathematical representations are needed to identify some patterns.

</div>

</div>
</div>

<!--
PACKET: Part D, second blank.
THE HONEST POINT: the graph is not WRONG. It is not PRECISE. The equation gives 13.57 AU, which sits inside the class's range — but a range that wide cannot support a confident claim.
-->

---

# Kepler's Third Law

<div class="pkt">PACKET PART D — 4 blanks</div>

<div class="vocab" style="text-align:center; font-size:1.3em">

$$a^{3} = M\,T^{2} \qquad\Longleftrightarrow\qquad a = \sqrt[3]{M\,T^{2}}$$

</div>

| Symbol | Meaning | Units |
|---|---|---|
| $a$ | average distance from the star — the **semi-major axis** | AU |
| $T$ | period of revolution | Earth years |
| $M$ | mass of the host star | solar masses |

**In words:** the <span class="fill">cube</span> of a planet's average distance from its star equals the <span class="fill">mass</span> of that star multiplied by the <span class="fill">square</span> of its orbital period.

For anything orbiting our Sun, $M =$ <span class="fill">1</span> solar mass, so the law simplifies to $a=\sqrt[3]{T^{2}}$.

<!--
PACKET: Part D, four blanks.
THE SIMPLIFICATION MATTERS: the equation students derived themselves in Explore 2 WAS Kepler's Third Law — it just had M = 1 hidden inside it, because every object in that data set orbited the same Sun. Their equation was right. It was a special case.
UNITS ARE NOT OPTIONAL HERE. The law only takes this clean form in AU, Earth years and solar masses. In SI units it carries a gravitational constant. Students do not need that, but they do need to use the right units.
-->

---

# Working a Calculation

<div class="pkt">PACKET PART D — question 3</div>

<div class="steps">

**Kepler-186 f:** period $T = 0.356$ yr, star mass $M = 0.544$ solar masses, habitable zone 0.242 – 0.464 AU

$T^{2} = (0.356)^{2} = 0.1267$

$M\,T^{2} = (0.544)(0.1267) = 0.0689$

$a = \sqrt[3]{0.0689} = \mathbf{0.410}$ AU

</div>

<div class="key-idea">

**0.410 AU falls between 0.242 and 0.464 AU — so yes,** Kepler-186 f is inside its star's habitable zone at its average distance.

</div>

<!--
PACKET: Part D, question 3 worked in full.
THE TWO ERRORS TO HUNT FOR: forgetting M entirely, and taking the cube root before multiplying.
ON A CALCULATOR: cube root is x^(1/3). Many students will try to use the square-root key. Show it once.
PACKET QUESTION 4: two planets, same period, one star nine times heavier — the heavier star's planet orbits further out, by the cube root of 9 = 2.08 times. Counterintuitive until you read the equation, which is the point.
-->

---

<!-- _class: phase-title -->

# PART E
## Kepler's First Law — The Shape of the Orbit

---

# Term 1: Major and Semi-Major Axis

<div class="pkt">PACKET PART E — 1 blank</div>

![h:310](l3-major-axis.svg)

<div class="key-idea">

The **major axis** ($d$) is the distance between the two points on an orbit that are **furthest apart**. The **semi-major axis** ($a$) is half of it — and it equals the planet's <span class="fill">average distance</span> from its star. **The same $a$ as in Kepler's Third Law.**

</div>

<!--
PACKET: Part E, Term 1.
A IS NOT A NEW QUANTITY. It is the number they already calculated for every exoplanet. Say so explicitly — students treat the two laws as unrelated unless you connect them here.
ECCENTRICITY IS EXAGGERATED in this drawing. A real planetary orbit is far rounder. Say it, or they will leave thinking orbits look like this.
-->

---

# Term 2: The Foci

<div class="pkt">PACKET PART E — 2 blanks</div>

![h:310](l3-foci.svg)

<div class="key-idea">

An ellipse is defined by two points called **foci**. The star sits at <span class="fill">one</span> of them; the other is the system's **centre of mass**. Because the Sun holds <span class="fill">99.9%</span> of the solar system's mass, that centre of mass sits almost exactly at the Sun.

</div>

<!--
PACKET: Part E, Term 2, two blanks.
THE SUN IS NOT QUITE AT THE CENTRE — it is at a FOCUS. The two are the same point only for a perfect circle. This is a classic exam distinction.
FOR THE CONSTRUCTION: habitable zone distances are always measured from the focus holding the STAR, never from the centre of the ellipse.
-->

---

# Kepler's First Law

<div class="pkt">PACKET PART E — 3 blanks</div>

<div class="vocab" style="text-align:center; font-size:1.3em">

$$e = \frac{f}{d} \qquad\Longleftrightarrow\qquad f = e\,d$$

</div>

<div class="columns">
<div class="col">

| Symbol | Meaning |
|---|---|
| $e$ | **eccentricity** — how circular or stretched |
| $f$ | distance between the **foci** |
| $d$ | length of the **major axis** |

</div>
<div class="col">

Eccentricity of <span class="fill">0</span> → a perfect circle.
Closer to <span class="fill">1</span> → more stretched.

Earth: $e =$ <span class="fill">0.0167</span>

</div>
</div>

<!--
PACKET: Part E, three blanks.
ECCENTRICITY HAS NO UNITS — it is a distance divided by a distance. Students lose marks writing "0.0167 AU".
PACKET QUESTION 5: TOI-2257 b, e = 0.496 on a 25 cm major axis, so f = 12.4 cm — half the width of the whole orbit. Compare Earth: f = 1.0 cm on a 60 cm orbit, which is visually nothing.
PACKET QUESTION 6, THE CHAIN TO MEMORISE: low e → small f → foci almost on top of each other → nearly circular → same distance all the way round → constant energy → stable temperature.
-->

---

<!-- _class: phase-title -->

# PART F
## Putting the Two Laws Together

---

# Each Law Does One Job

<div class="pkt">PACKET PART F</div>

| Law | What it turns into what |
|---|---|
| **Third Law** $a^{3}=MT^{2}$ | Turns the **period** we measure from transit data into the **average distance** we cannot measure — so we can compare it against the habitable zone |
| **First Law** $e = f/d$ | Turns **eccentricity** and **major axis** into the **shape** of the orbit — so we can tell whether the planet *stays* in the zone or only passes through it |

<div class="key-idea">

Neither law alone answers the question. **Together they do.**

</div>

<!--
PACKET: Part F, the summary table.
IF STUDENTS REMEMBER ONE SLIDE FROM THIS LESSON, make it this one. The laws are tools with jobs, not formulas to memorise.
-->

---

<!-- _class: lt1 -->

# The Verdict on Eight Exoplanets

<div class="pkt">PACKET PART F</div>

| Exoplanet | Avg. dist. (AU) | Eccentricity | In the zone on average? | ***Stays*** in the zone? |
|---|---|---|---|---|
| Kepler-79 b | 0.117 | — | no | no |
| Kepler-18 b | 0.045 | — | no | no |
| **Kepler-186 f** | 0.410 | 0.040 | yes | **yes** |
| **Kepler-442 b** | 0.387 | 0.040 | yes | **yes** |
| **TOI-2257 b** | **0.145** | **0.496** | **yes** | **no** |
| HD-20782 b | 1.352 | — | no | no |
| **Trappist-1 f** | 0.038 | 0.010 | yes | **yes** |
| **Trappist-1 g** | 0.047 | 0.002 | yes | **yes** |

<!--
PACKET: Part F table.
TWO ROWS DO ALL THE TEACHING:
  HD-20782 b orbits FURTHEST of all eight (1.352 AU) and is still too close — because its star's zone starts at 2.613 AU. Habitable is relative to the star.
  TOI-2257 b is in the zone on average and still fails, because e = 0.496 stretches its orbit right out of the zone for a large part of every revolution. It is Comet Borrelly again.
TRAPPIST-1 g ONLY JUST MAKES IT: 0.047 against an outer limit of 0.048. Good place to ask how confident we should be in a claim that close to the boundary.
-->

---

# Why the Average Was Not Enough

<div class="pkt">PACKET PART F — questions 7 and 8</div>

<div class="columns">
<div class="col">

<div class="warning">

**An average hides variation.**

Two planets can share the same average distance and have completely different experiences.

Only the orbit's **shape** tells you which you have.

Borrelly: average **3.59 AU**, ranging **1.35 – 5.83**.

</div>

</div>
<div class="col">

<div class="key-idea">

**Why we need equations, not just graphs**

A graph shows *that* two variables are related. An equation describes it **exactly**, because it carries the exponents and the star-mass coefficient.

That precision lets us **generate data we could not measure** — and generated data can serve as **evidence**.

</div>

</div>
</div>

<!--
PACKET: Part F, questions 7 and 8.
THESE TWO ANSWERS ARE THE MOST LIKELY SHORT-RESPONSE ITEMS on an assessment of this lesson. Make students write them in full sentences, not fragments.
CCC 3 — SCALE, PROPORTION AND QUANTITY: algebraic thinking used to examine scientific data and predict the effect of a change in one variable on another.
-->

---

<!-- _class: phase-title -->

# PART G
## Why Earth Works

---

# The Argument in Four Steps

<div class="pkt">PACKET PART G — 4 blanks</div>

<div class="steps">

**1. Distance.** Earth orbits at an average of about <span class="fill">150</span> million km, inside the Sun's habitable zone of 142–172 million km.

**2. Shape.** Earth's orbital eccentricity is <span class="fill">0.0167</span>, so its distance from the Sun barely changes across a whole orbit.

**3. Consequence.** A steady distance means a steady amount of energy received, which means a <span class="fill">stable temperature</span>.

**4. Result.** A stable temperature in that band means water stays <span class="fill">liquid</span> — and liquid water is what life as we know it needs.

</div>

<!--
PACKET: Part G, four blanks.
THIS IS THE PERFORMANCE TASK ARGUMENT. Every student's revised model should contain these four links in this order. If a model has distance but not shape, it is incomplete — that is the single most common gap.
PACKET QUESTION 9 — the journalist who writes that a planet "has liquid water": TWO things are wrong. (1) Without eccentricity we do not know whether it STAYS in the zone. (2) The habitable zone is about POSSIBILITY, not fact — our technology can only detect water inside our own solar system.
-->

---

<!-- _class: lt1 -->

# Vocabulary

| Term | Meaning |
|---|---|
| **Orbital period** | the time a planet takes to go once around its star |
| **Semi-major axis** ($a$) | half the major axis; the planet's **average distance** from its star |
| **Major axis** ($d$) | the distance between the two furthest-apart points on an orbit |
| **Foci** | the two points that define an ellipse; the star sits at one |
| **Eccentricity** ($e$) | how circular ($0$) or stretched (nearer $1$) an orbit is; $e = f/d$ |
| **Habitable zone** | the band of distances from a star where liquid water can exist on a planet's surface |
| **Transit method** | detecting a planet from the dip in its star's brightness as it passes in front |
| **AU** | astronomical unit — Earth's average distance from the Sun |

<div class="small" style="text-align:center">

**Kepler's First Law** — orbits are ellipses with the star at one focus; $e = f/d$ &nbsp;·&nbsp; **Kepler's Third Law** — $a^{3} = M\,T^{2}$

</div>

<!--
PACKET: the closing vocabulary box.
THE TWO LAWS ARE WORTH MEMORISING IN BOTH FORMS — the equation and the sentence. Students who only memorise the symbols cannot tell you what they are for.
GRAVITY IS NOT ON THIS SHEET. If students ask WHY these relationships hold, the honest answer is that it is gravity, and that it is Unit 2. The assessment boundary for HS-ESS1-4 explicitly keeps gravitational attraction and calculus out of this lesson.
-->
