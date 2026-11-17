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
  /* Diagrams. Marp strips an inline style attribute from <img>, so diagram
     size is set with Marp's own ![h:NNN] syntax and centring is done here. */
  section p > img:only-child { display: block; margin: 10px auto; }
---

<!-- _class: title-slide -->

# ☄️ Stability of the Solar System
## Notes 1–4 — Unit 2: Probability of Life Elsewhere
### how the solar system formed · reading rock ages · why Earth hides its craters · relative dating

<!--
WHAT THIS DECK IS: the projection companion to the four one-page notes blocks in ess-u2-notes-l1.pdf. One block per sitting, 15-30 minutes each, NOT one long session. Stop at each NOTES divider.
  Notes 1 - meeting 3 (Mon 11/30), 20 min.  Notes 2 - meetings 4-5 (Tue 12/1 and Wed 12/2), 15 + 15 min.
  Notes 3 - meeting 7 (Fri 12/4), 20 min.   Notes 4 - meeting 8 (Mon 12/7), 25 min.
NOT the teaching deck. The 5E instruction lives in U2_Probability_of_Life_L1_Slides. These blocks replace the New Visions Explain phases: each one comes right after its Explore.
EVERY BLANK ANSWER is shown in gold. Advance, let students write, then discuss.
STANDARDS: HS-ESS1-6 (HE-3) evidence from ancient Earth materials, meteorites and other planetary surfaces for Earth's formation and early history · HS-ESS2-5 (ES-2) water's effects on Earth materials, Notes 3 only. Notes 4 (relative dating, geologic time) is added content New Visions does not teach.
-->

---

<!-- _class: phase-title -->

# NOTES 1
## How the Solar System Formed

---

# From a Cloud to a Solar System

<div class="pkt">NOTES 1 — 7 blanks</div>

About <span class="fill">4.6</span> billion years ago, a cloud of gas and dust (a **nebula**) collapsed under its own <span class="fill">gravity</span>.

1. Most material fell to the center and became the <span class="fill">Sun</span>.
2. The rest flattened into a spinning <span class="fill">disk</span>.
3. Dust grains collided and stuck together into larger bodies: <span class="fill">accretion</span>.
4. Inner planets are small and <span class="fill">rocky</span>; outer planets are mostly <span class="fill">gas</span>.

<div class="key-idea">

Same disk, same time — so Earth, the Moon, Mars and the meteorites should all be about the same <span class="fill">age</span>.

</div>

<!--
NOTES 1, top half. 8 minutes.
MISCONCEPTION: that the planets formed at different times, or that the Sun "captured" them. One disk, one event.
LINK BACK to Unit 1: this nebula is the leftover material from earlier stars - that is where the iron and the rock came from.
-->

---

# Early Earth Sorted Itself by Density

<div class="pkt">NOTES 1 — 6 blanks</div>

<div class="columns">
<div class="col">

Early Earth was hot enough to be mostly <span class="fill">molten</span> — heated by constant impacts and radioactive decay.

While molten, its materials sorted by <span class="fill">density</span>.

Dense iron and nickel **sank**. Lighter rock **rose**.

</div>
<div class="col">

![h:300](l1-earth-layers.svg)

</div>
</div>

<!--
NOTES 1, diagram: students label crust, mantle, outer core, inner core.
TRY IT 1 - why is the core iron and nickel? Two parts required: Earth was molten, AND materials sorted by density. A response with only "iron is heavy" is incomplete.
TRY IT 2 - accretion: grains collide and stick, growing bodies pull in more.
WORKED EXAMPLE on the page: inner planets rocky because it was too hot near the young Sun for ices and gas to collect.
-->

---

<!-- _class: phase-title -->

# NOTES 2
## Reading Rock Ages

---

# Half-Life Is the Clock

<div class="pkt">NOTES 2 — 7 blanks</div>

<div class="columns">
<div class="col">

A radioactive **parent** isotope decays into a stable <span class="fill">daughter</span> product.

<div class="vocab">

**Half-life** — the time for <span class="fill">half</span> of the parent atoms to decay. It is <span class="fill">constant</span>.

</div>

After 1, 2, 3 half-lives: <span class="fill">50</span>%, <span class="fill">25</span>%, <span class="fill">12.5</span>% parent left.

**Age** = number of half-lives × one <span class="fill">half-life</span>

</div>
<div class="col">

![h:300](l1-halflife-curve.svg)

</div>
</div>

<!--
NOTES 2, first sitting (meeting 4, after the dating lab). 15 minutes, to the end of this slide and the next.
MISCONCEPTION: that after two half-lives the parent is all gone. It halves each time: 100, 50, 25, 12.5.
MISCONCEPTION: that heat or pressure changes the rate. Nothing does - that is why it works as a clock.
-->

---

# Choosing the Isotope

<div class="pkt">NOTES 2 — 4 blanks · ESSRT</div>

| Parent → daughter | Half-life (years) | Useful dating range (years) | Used on |
|---|---|---|---|
| Uranium-238 → Lead-206 | <span class="fill">4.5 billion</span> | 10 million – 4.6 billion | zircon, other minerals |
| Potassium-40 → Argon-40 | <span class="fill">1.3 billion</span> | 100,000 – 4.6 billion | igneous, volcanic rock |
| Carbon-14 → Nitrogen-14 | <span class="fill">5730</span> | 100 – <span class="fill">70,000</span> | organic material |

<div class="key-idea">

Pick the isotope whose **useful dating range** includes the sample's age. The shortest half-life is *not* automatically right.

</div>

<!--
NOTES 2. Have the ESSRT open to "Geologically Important Radioactive Elements Used for Radiometric Dating" - students copy the three half-lives from it.
THE TRAP (Try It 4): a 200,000-year-old bone. Nearly everyone says carbon-14. Its range ends at 70,000 years. Potassium-40 is the one whose range includes 200,000.
-->

---

# What the Ages Show

<div class="pkt">NOTES 2 — 4 blanks</div>

Earth's oldest minerals, Moon rocks and meteorites all date to about <span class="fill">4.4</span>–<span class="fill">4.6</span> billion years. They formed <span class="fill">together</span>.

Many impact craters date to about 3.8–4.0 billion years ago — the **Late Heavy** <span class="fill">Bombardment</span>.

<div class="vocab">

**Worked example.** A volcanic rock has 25% of its original potassium-40.
100 → 50 → 25 is **2 half-lives**. 2 × 1.3 billion = **2.6 billion years**.

</div>

**Try it 3:** 50% uranium-238 left → 1 half-life → <span class="fill">4.5 billion years</span>

<!--
NOTES 2, second sitting (meeting 5). 15 minutes.
THE REVERSAL to land: three different kinds of sample, from three different places, give the same age. That is the evidence for one formation event.
TRY IT 4 answer: 200,000 years is outside carbon-14's useful dating range (100-70,000).
-->

---

<!-- _class: phase-title -->

# NOTES 3
## Why Earth Hides Its Craters

---

# Hit Just as Hard

<div class="pkt">NOTES 3 — 11 blanks</div>

Earth and the Moon were hit at about the same <span class="fill">rate</span>. Earth just does not <span class="fill">show</span> it.

| Body | Known craters | Atmosphere | Liquid water | Moving plates |
|---|---|---|---|---|
| Moon | over 1,000,000 | <span class="fill">none</span> | <span class="fill">none</span> | <span class="fill">no</span> |
| Mars | over 300,000 | <span class="fill">thin</span> | <span class="fill">not today</span> | <span class="fill">no</span> |
| Earth | about 128 | <span class="fill">thick</span> | <span class="fill">yes</span> | <span class="fill">yes</span> |

<!--
NOTES 3, 20 minutes, the day after the Role of Water lab.
THE MISCONCEPTION THIS WHOLE LESSON TURNS ON: "Earth was hit less." It was not - if anything more, with its stronger gravity. Ask the room before revealing the table.
-->

---

# What Erases a Crater

<div class="pkt">NOTES 3 — 8 blanks</div>

<div class="columns">
<div class="col">

**At the surface, mostly water**

**Weathering** — rock is broken <span class="fill">down</span> where it sits
- *physical*: ice <span class="fill">expands</span> in cracks
- *chemical*: minerals <span class="fill">dissolved</span>

**Erosion** — pieces <span class="fill">carried away</span>

**Deposition** — pieces <span class="fill">dropped</span>

</div>
<div class="col">

**From inside Earth**

**Plate tectonics** — old crust is <span class="fill">recycled</span>

**Volcanism** — lava <span class="fill">covers</span> the surface

<div class="key-idea">

Earth's surface is constantly **erased and rebuilt**. The Moon's is not.

</div>

</div>
</div>

<!--
NOTES 3. Tie each word to yesterday's lab: chalk in vinegar = chemical weathering; the stream table = erosion and deposition.
TRY IT 5: one process AND how it removes a crater - both required.
TRY IT 6: Mars has channels and 300,000 craters - water flowed in the past, but not for long or not recently.
WORKED EXAMPLE on the page: the Moon has no atmosphere, water or moving plates, so nothing wears its craters away.
-->

---

<!-- _class: phase-title -->

# NOTES 4
## Relative Dating and Geologic Time

---

# Four Rules for Putting Rock in Order

<div class="pkt">NOTES 4 — 8 blanks</div>

**Relative age** is only the <span class="fill">order</span> in which things happened.

| Rule | What it says |
|---|---|
| **Superposition** | The <span class="fill">oldest</span> layer is at the bottom |
| **Original horizontality** | Sediment is laid down <span class="fill">flat</span>; tilting came <span class="fill">later</span> |
| **Cross-cutting** | A fault or intrusion is <span class="fill">younger</span> than what it cuts |
| **Unconformity** | A buried <span class="fill">erosion</span> surface: a <span class="fill">gap</span> in the record |

<!--
NOTES 4, 25 minutes, opening meeting 8. This is ADDED content: New Visions teaches radiometric dating only, and the ESSRT geologic history chart is unusable without it.
It leads straight into the L2 timeline card sort that follows in the same block.
-->

---

# Reading an Outcrop

<div class="pkt">NOTES 4 — worked example</div>

![h:230](l1-outcrop.svg)

Oldest to youngest: **Layers 1, 2, 3** deposited → **X** intrudes (it cuts 1–3) → **erosion** makes the unconformity → **Layer 4** deposited (X does not cut it).

<!--
NOTES 4. Ask for the order BEFORE revealing the line under the diagram.
TRY IT 7: oldest rock is Layer 1, by superposition. Both the layer and the principle are required.
COMMON ERROR: placing X last because it "goes through everything". It stops at the unconformity.
-->

---

# Index Fossils and Geologic Time

<div class="pkt">NOTES 4 — 9 blanks · ESSRT</div>

An **index fossil** comes from a species that lived a <span class="fill">short</span> time over a <span class="fill">wide</span> area. Layers with the same index fossil are about the same <span class="fill">age</span>.

Time is divided into eons, then <span class="fill">eras</span>, then periods — set by major changes in the <span class="fill">fossil</span> record.

The **Precambrian** covers almost <span class="fill">90</span>% of Earth's history.

The three eras since: <span class="fill">Paleozoic</span> → <span class="fill">Mesozoic</span> → <span class="fill">Cenozoic</span>

<!--
NOTES 4. Have the ESSRT open to the Geologic History of New York State chart and find the three eras on it.
TRY IT 8: short-lived AND widespread - both required.
-->
