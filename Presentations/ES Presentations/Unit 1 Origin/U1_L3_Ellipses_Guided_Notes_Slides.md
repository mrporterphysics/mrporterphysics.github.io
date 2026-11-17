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
  /* Column alignment utilities. Short label/number columns stay centerd;
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
  /* Diagrams. Marp strips an inline style attribute from <img>, so diagram
     size is set with Marp's own ![h:NNN] syntax and centring is done here. */
  section p > img:only-child { display: block; margin: 10px auto; }
---

<!-- _class: title-slide -->

# 🌑 Ellipses and Eccentricity

## Guided Notes — Unit 1: Discovering New Worlds

### Lesson 3, continued · building an orbit · measuring it · judging your answer

<!--
WHAT THIS DECK IS: the projection companion to the packet "Guided Notes: Ellipses and Eccentricity" (ess-u1-guided-notes-ellipses.pdf). Slides follow the packet Part for Part. Students fill their blanks as each slide comes up.
WHY IT EXISTS: it is the bridge into the NYS investigation "Unearthing Mars" (HS-ESS1-4), Thu 11/19 and Fri 11/20. Every part aims at steps 13-16 of its Student Directions.
WHAT IT DOES NOT REPEAT: the orbits deck already did foci, major axis and e = f/d. This picks up from there. If students have not seen that deck, run its Part E first.
EVERY BLANK ANSWER is shown in gold. Advance, let students write, then discuss.
TIMING: about 35 minutes at pace, leaving the block's second half for the practice packet.
-->

---

<!-- _class: phase-title -->

# PART A

## Building an Ellipse

---

# The Rule Behind the Shape

<div class="pkt">PACKET PART A — 2 blanks</div>

<div class="columns">
<div class="col">

Pick any point on the curve. Measure its distance to each focus. **Add** the two distances.

Move to a different point and do it again. You get the <span class="fill">same</span> total every time.

That is why two pins and one string work. The pins sit at the <span class="fill">foci</span>. The string cannot stretch, so the pencil is forced to keep that sum constant — and the only shape that obeys is an ellipse.

</div>
<div class="col">

![h:300](ellipsedraw.gif)

</div>
</div>

<!--
PACKET: Part A, the opening two blanks.
RUN IT LIVE IF YOU CAN. Two pins, a loop of string, a pencil, one volunteer at the board. Thirty seconds of watching beats any slide.
THE POINT TO LAND: the shape is not drawn freehand and it is not a squashed circle. It is the consequence of one rule.
-->

---

# One String, One Major Axis

<div class="pkt">PACKET PART A — 3 blanks</div>

Stretch the string to one end of the orbit. The two distances lie flat along the same line — so **the string is the major axis**, $d$.

<div class="key-idea">

As long as the string does not change, $d$ **cannot change**.

→ pins **further apart** → $f$ larger → $e = f/d$ gets <span class="fill">larger</span>, orbit more stretched
→ pins **closer together** → $f$ smaller → $e$ gets <span class="fill">smaller</span>, orbit rounder
→ both pins in the **same hole** → $f = 0$, $e = 0$, and you have drawn a <span class="fill">circle</span>

</div>

<!--
PACKET: Part A, the "One string, one major axis" box.
THIS IS THE SLIDE THAT MAKES ECCENTRICITY FEEL PHYSICAL. Eccentricity is not a number someone looked up — it is how far apart you put the pins.
ASK: "If I want a rounder orbit, do I change the string or the pins?" The pins. Every time.
-->

---

# Worked: Tacks and String

<div class="pkt">PACKET PART A — question 1</div>

<div class="steps">

Two tacks **6.0 cm** apart, drawn with a **20.0 cm** string.

The string is the major axis → $d = 20.0$ cm

The tack separation is the distance between the foci → $f = 6.0$ cm

$e = \dfrac{f}{d} = \dfrac{6.0}{20.0} = \mathbf{0.300}$

</div>

Now move the tacks to **2.0 cm** apart, same string: $d$ is still <span class="fill">20.0 cm</span>, $f$ drops to 2.0 cm, and $e = \mathbf{0.100}$ — **rounder**.

<!--
PACKET: questions 1 and 2.
WATCH FOR: students who change d when the pins move. The string did not change, so d did not change. That is the whole trick of the question.
QUESTION 3 (the string shorter than the pin gap) is worth asking aloud: the pencil cannot reach, because the shortest route between the pins is the straight line between them.
-->

---

<!-- _class: phase-title -->

# PART B

## Perihelion, Aphelion, and the Trick You Need Thursday

---

# Two Names on the Major Axis

<div class="pkt">PACKET PART B — 1 blank</div>

<div class="columns">
<div class="col">

A planet's distance from the Sun changes as it goes round, because the Sun sits at a <span class="fill">focus</span> — not at the center.

| Name | Where | Measured from |
|---|---|---|
| **Perihelion** | *closest* to the Sun | the Sun, at its focus |
| **Aphelion** | *farthest* from the Sun | the Sun, at its focus |

Both sit at the **ends of the major axis**.

</div>
<div class="col">

![h:400](l3e-peri-aph.svg)

</div>
</div>

<!--
PACKET: Part B, the table and the diagram.
PERI = NEAR, AP = AWAY. Worth saying once; the Greek does the memorising for them.
BOTH DISTANCES ARE MEASURED FROM THE SUN, never from the center. That is packet question 6 and it is the one students get wrong under time pressure.
-->

---

# Add for $d$, Subtract for $f$

<div class="pkt">PACKET PART B — 1 blank</div>

The Sun cuts the major axis into two pieces, so reading straight off the diagram:

<div class="key-idea">

$$\text{aphelion} + \text{perihelion} = d$$

$$\text{aphelion} - \text{perihelion} = f$$

</div>

<div class="warning">

**On Thursday you never measure focus-to-focus.** The second focus is empty space — there is nothing to put a ruler against. You measure both distances from the Sun and <span class="fill">subtract</span>.

</div>

<!--
PACKET: Part B, the two identities and the "Why this matters on Thursday" box.
THIS IS THE MOST IMPORTANT SLIDE IN THE DECK. Step 14d of the investigation is exactly this subtraction, and it is where marks are lost.
WHY THE SUBTRACTION WORKS: the Sun is off center by half of f on each side, so the long piece exceeds the short piece by exactly f. Draw it on the board if they look unsure.
-->

---

# Worked: One Measured Orbit

<div class="pkt">PACKET PART B — the worked example</div>

<div class="steps">

Measured: aphelion **14.6 cm**, perihelion **11.4 cm**

$d = 14.6 + 11.4 =$ <span class="fill">26.0</span> cm

$f = 14.6 - 11.4 =$ <span class="fill">3.2</span> cm

$e = \dfrac{f}{d} = \dfrac{3.2}{26.0} =$ <span class="fill">0.123</span>

</div>

<!--
PACKET: the Part B worked example, three blanks.
PACE: do this one with them, then set question 4 (aphelion 15.3, perihelion 12.7 → e = 0.093) cold. That answer is almost exactly Mars, and noticing it is the point.
-->

---

# The Check That Costs Ten Seconds

<div class="pkt">PACKET PART B — question 5</div>

A student measures the major axis directly: **24.0 cm**.
Then aphelion **13.1 cm** and perihelion **12.1 cm**.

<div class="warning">

$13.1 + 12.1 = 25.2$ cm, but the major axis measured **24.0 cm**.

The three measurements disagree by **1.2 cm**, so at least one is wrong. **Remeasure all three.**

</div>

Aphelion $+$ perihelion **must** equal the major axis. That is a free check on your own work — and it is free on Thursday too.

<!--
PACKET: question 5.
TEACH THIS AS A HABIT, not a question. Every student who runs this check Thursday catches their own ruler error before it becomes a 40% deviation.
COMMON CAUSES of the disagreement: the ruler did not pass through the Sun, or it stopped short of the curve.
-->

---

<!-- _class: phase-title -->

# PART C

## Eccentricity From a Drawing

---

<!-- _footer: Formula and wording: NYS Earth Science Reference Tables, Equations. -->

# Two Wordings, One Formula

<div class="pkt">PACKET PART C</div>

You already have this. Here it is in both the wording in your notes and the wording on the reference tables — they are the same statement.

<div class="key-idea">

$$e = \frac{f}{d}
\qquad\text{is the ESRT's}\qquad
\text{eccentricity} = \frac{\text{distance between foci}}{\text{length of major axis}}$$

</div>

On the Regents, and on Thursday, it will be the **words**. In your notes it is the letters. Know both.

<!--
PACKET: Part C, the formula box.
MAKE THEM FIND IT IN THE ESRT NOW, not Thursday. Students who have never located the equation on the page lose two minutes hunting for it under lab conditions.
-->

---

# No Units, and Scale Does Not Matter

<div class="pkt">PACKET PART C — 5 blanks</div>

<div class="columns">
<div class="col">

**1. Eccentricity has no units.**

Centimeters divided by centimeters — the units <span class="fill">cancel</span>. "0.094 cm" is wrong even when the number is right.

**2. A scale drawing gives the true eccentricity.**

$f$ and $d$ are both shrunk by the <span class="fill">same</span> factor, and a <span class="fill">ratio</span> does not care about scale.

</div>
<div class="col">

<div class="warning">

**Precision rules for Thursday**

Measure every length to the nearest <span class="fill">tenth</span> of a centimeter.

Report eccentricity to the nearest <span class="fill">thousandth</span> — three decimal places.

Rounding $0.0937$ to $0.09$ throws away the digit that tells Mars apart from Earth.

</div>

</div>
</div>

<!--
PACKET: Part C, five blanks plus the precision rules.
POINT 2 IS THE ONE WORTH DWELLING ON. A pencil drawing on a desk can be compared with a planet 228 million km away, because eccentricity is a ratio. That is not a trick — it is why the model works at all.
PACKET QUESTION 9 makes it concrete: two students draw the same orbit at different sizes, 3.0/30.0 and 4.5/45.0, and both get 0.100.
-->

---

<!-- _class: phase-title -->

# PART D

## Kepler's Second Law

---

# Equal Areas in Equal Times

<div class="pkt">PACKET PART D — 3 blanks</div>

<div class="columns">
<div class="col">

A line from the Sun to the planet sweeps out <span class="fill">equal</span> areas in equal times.

To keep the area the same while the radius is short, the planet must cover more angle — so it moves <span class="fill">fastest</span> at perihelion and <span class="fill">slowest</span> at aphelion.

</div>
<div class="col">

![h:360](l3e-equal-areas.svg)

</div>
</div>

<!--
PACKET: Part D, three blanks.
THE DIAGRAM IS HONEST: the two shaded sweeps really do have equal area, to within 0.1%. Students can check it by eye and it holds up.
NOT NEEDED FOR THE MARS LAB. This is the natural cut if the block is running short — but the practice packet uses it in questions 5 and 15.
-->

---

# Mars Swings, Earth Does Not

<div class="pkt">PACKET PART D — question 10</div>

<div class="columns">
<div class="col">

**Mars**, $e = 0.093$

Sun well off center → perihelion and aphelion differ by a lot → **big** change in speed across the year.

</div>
<div class="col">

**Earth**, $e = 0.017$

Orbit nearly circular → distance barely changes → speed barely changes.

</div>
</div>

<div class="key-idea">

Bigger eccentricity → bigger difference in distance → **bigger difference in speed**.

A comet at $e = 0.97$ whips past the Sun and then crawls for most of its orbit.

</div>

<!--
PACKET: questions 10 and 11.
THIS IS ALSO WHY MARS GAVE KEPLER THE ANSWER. Its orbit is stretched enough for the discrepancy to show in Brahe's data — Earth's or Venus's would have hidden it.
-->

---

<!-- _class: phase-title -->

# PART E

## Judging Your Answer

---

<!-- _footer: Percent deviation formula: NYS Earth Science Reference Tables, Equations. -->

# How Far Off Is It?

<div class="pkt">PACKET PART E — 3 blanks</div>

Measuring a drawing is never perfect. Your pencil has width, your plotted points scatter, the ruler reads to a tenth. So the question is not *is it right?* but **how far off is it?**

<div class="key-idea">

$$\text{percent deviation} = \frac{\text{difference from accepted value}}{\text{accepted value}} \times 100$$

</div>

The **accepted value** for Mars' eccentricity is <span class="fill">0.094</span>. The difference is taken as a <span class="fill">positive</span> number — high or low does not matter. Report to the nearest <span class="fill">tenth</span> of a percent.

<!--
PACKET: Part E, three blanks.
PERCENT DEVIATION AND PERCENT ERROR ARE THE SAME THING. The ESRT says deviation; the investigation says error. Say so once so neither word stops them.
-->

---

# Worked: 0.087 Against 0.094

<div class="pkt">PACKET PART E — the worked example</div>

<div class="steps">

A student's model gives $e = 0.087$. Accepted: $0.094$.

difference $= |0.087 - 0.094| = 0.007$

$\dfrac{0.007}{0.094} \times 100 = \mathbf{7.4\%}$

</div>

<div class="warning">

A big deviation is **never** evidence that Mars is wrong. It points at **the model**: plotted points off, orbit drawn carelessly, the axis not through the Sun, the ruler misread.

</div>

<!--
PACKET: the worked example, then questions 12-14.
QUESTION 13 IS THE REASONING ONE: the partner who says the accepted value must be wrong. Four centuries of observation against one pencil drawing — the deviation measures our procedure, not the planet.
QUESTION 14: we divide by the ACCEPTED value so everyone is measured against the same reference and results can be compared.
-->

---

<!-- _footer: ESRT, Solar System Data · NYSED, ESS Investigation "Unearthing Mars", Student Directions step 2. -->

# 0.093 or 0.094?

<div class="pkt">PRACTICE PACKET — question 27</div>

<div class="columns">
<div class="col">

The **ESRT** gives Mars an eccentricity of **0.093**.

The **investigation** tells you the accepted value is **0.094**.

Both are roundings of the true value, about **0.0934**.

</div>
<div class="col">

<div class="key-idea">

**Use the value the investigation gives you: 0.094.**

When a procedure names the accepted value, that is what you are scored against.

</div>

</div>
</div>

Recalculating the worked example against 0.093 gives **4.3%** instead of 7.4% — about one percentage point apart, and both say the same thing: **the model was good**.

<!--
PUT THIS IN FRONT OF THEM NOW. A student who spots the clash mid-lab on Thursday stops working and asks; a student who has seen this slide shrugs and carries on.
NEITHER SOURCE IS WRONG. Mars' eccentricity is about 0.0934 and the two tables round it differently. That is worth one honest sentence about significant figures.
-->

---

# Thursday, in Four Steps

<div class="pkt">THE INVESTIGATION</div>

<div class="steps">

You will plot Mars' orbit from **Tycho Brahe's own observations**, then:

**1.** measure the **major axis** $d$, to 0.1 cm

**2.** measure **aphelion** and **perihelion** from the Sun — and check they add to $d$

**3.** **subtract** them for $f$, then compute $e = f/d$ to the nearest thousandth

**4.** compute **percent deviation** against the accepted $e = 0.094$

</div>

Nothing on that list is new to you after today. The only new thing Thursday is **where the plotted points come from**.

<!--
THE CLOSER. Say the last line out loud — it is the one that lowers the temperature before a state investigation.
WHAT IS GENUINELY NEW THURSDAY: triangulating Mars' position from paired observations. The measuring and the arithmetic are already theirs.
-->

---

<!-- _class: lt -->

# Vocabulary

| Term | Meaning |
|---|---|
| **Foci** | the two points that define an ellipse; the Sun sits at one, the other is empty |
| **Major axis** ($d$) | the longest line across the orbit, through both foci |
| **Perihelion** | the point in the orbit **closest** to the Sun |
| **Aphelion** | the point in the orbit **farthest** from the Sun |
| **Eccentricity** ($e$) | how stretched an orbit is; $e = f/d$, no units, 0 to 1 |
| **Percent deviation** | how far a measured value falls from the accepted one, as a percentage |
| **Accepted value** | the value established by many careful measurements — here, $e = 0.094$ for Mars |

<div class="small" style="text-align:center">

**aphelion $+$ perihelion $= d$** &nbsp;·&nbsp; **aphelion $-$ perihelion $= f$** &nbsp;·&nbsp; **$e = f/d$**

</div>

<!--
PACKET: the closing terms.
THE THREE RELATIONS ON THE BOTTOM LINE ARE THE WHOLE SHEET. A student who can write those three from memory can do Thursday's investigation.
-->
