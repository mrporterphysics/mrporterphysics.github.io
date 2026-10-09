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
---

<!-- _class: title-slide -->

# ✨ Star Life Cycles
## Guided Notes — Unit 1: Discovering New Worlds
### Lesson 2 review · what controls a star's life · reading the H–R diagram · where the elements came from

<!--
WHAT THIS DECK IS: the projection companion to the guided-notes packet "Guided Notes: Star Life Cycles" (ess-u1-guided-notes-stars.pdf). Slides follow the packet Part for Part. Students fill in their blanks as each slide comes up.
NOT the teaching deck. The 5E instruction lives in U1_Discovering_New_Worlds_L2_Slides. This is end-of-unit consolidation: content knowledge only.
EVERY BLANK ANSWER is shown in gold. Advance, let students write, then discuss.
STANDARDS: ESS1.A(1) ~10-billion-year life span · ESS1.A(2) spectra AND brightness · ESS1.A(4) fusion makes nuclei up to iron, supernovae make the rest · PS3.D(1) fusion releases the energy reaching Earth · CCC5(5) atoms not conserved, protons+neutrons are.
REFERENCE TABLES: three figures here come straight from the NYS ESRT (2026 Rev. Edition) — the same booklet students get on the exam. Say that every time one appears.
TIMING: about one class period at pace, two if you work the questions.
-->

---

# How to Use This

<div class="columns">
<div class="col">

**You have:** the packet *Guided Notes: Star Life Cycles*

**On screen:** the same content, Part for Part

Anything shown like <span class="fill">this</span> goes in a blank on your sheet.

</div>
<div class="col">

<div class="key-idea">

Three diagrams in this deck are from your **Reference Tables**. You will have them on the exam — learn where things sit on them.

</div>

</div>
</div>

---

<!-- _class: phase-title -->

# PART A
## What We Can Observe From Earth

---

# What We Can Measure

<div class="pkt">PACKET PART A</div>

<div class="columns">
<div class="col">

To the naked eye every star is a tiny white dot. With a telescope above the atmosphere — **Hubble**, launched <span class="fill">1990</span> — we measure far more:

1. Its **spectrum** → what it is <span class="fill">made of</span>
2. Its **color** → its <span class="fill">temperature</span>
3. Its **luminosity** → how much energy it gives off

</div>
<div class="col">

<div class="vocab">

**Luminosity** — the **rate** at which a star releases energy (energy per **second**), as a multiple of the Sun.

100 = a hundred times the Sun's output per second. 0.01 = one hundredth.

</div>

</div>
</div>

<div class="key-idea">

Hubble's image of **Omega Centauri** showed stars of different colors, sizes and brightnesses — but their spectra showed <span class="fill">hydrogen</span> and <span class="fill">helium</span>, just like our Sun.

</div>

<!--
PACKET: Part A, five blanks.
LUMINOSITY IS THE TERM L1 DEFERRED. The L1 bundle says students don't need it yet but it is central here. If anyone asks for the Sun's energy output from L1 — that quantity was its luminosity.
PACKET QUESTION 1: same elements, so a bigger star has MORE of them — more mass, more fuel. That sets up Part B.
-->

---

# Spectra from the Omega Centauri Cluster

<div class="pkt">PACKET PART A</div>

<div class="specrow"><div class="speclabel">Cluster star A</div><div class="spec"><div class="ln" style="left:3.33%"></div><div class="ln" style="left:11.33%"></div><div class="ln" style="left:15.67%"></div><div class="ln" style="left:23.67%"></div><div class="ln" style="left:28.67%"></div><div class="ln" style="left:30.67%"></div><div class="ln" style="left:34.00%"></div><div class="ln" style="left:62.67%"></div><div class="ln" style="left:85.33%"></div><div class="ln" style="left:89.33%"></div></div></div>
<div class="specrow"><div class="speclabel">Cluster star B</div><div class="spec"><div class="ln" style="left:3.33%"></div><div class="ln" style="left:11.33%"></div><div class="ln" style="left:15.67%"></div><div class="ln" style="left:23.67%"></div><div class="ln" style="left:28.67%"></div><div class="ln" style="left:30.67%"></div><div class="ln" style="left:34.00%"></div><div class="ln" style="left:62.67%"></div><div class="ln" style="left:85.33%"></div><div class="ln" style="left:89.33%"></div></div></div>
<div class="specrow"><div class="speclabel">Cluster star C</div><div class="spec"><div class="ln" style="left:3.33%"></div><div class="ln" style="left:11.33%"></div><div class="ln" style="left:15.67%"></div><div class="ln" style="left:23.67%"></div><div class="ln" style="left:28.67%"></div><div class="ln" style="left:30.67%"></div><div class="ln" style="left:34.00%"></div><div class="ln" style="left:62.67%"></div><div class="ln" style="left:85.33%"></div><div class="ln" style="left:89.33%"></div></div></div>
<div class="specrow"><div class="speclabel">&#9728;&#65039; our Sun</div><div class="spec"><div class="ln" style="left:3.33%"></div><div class="ln" style="left:11.33%"></div><div class="ln" style="left:15.67%"></div><div class="ln" style="left:23.67%"></div><div class="ln" style="left:28.67%"></div><div class="ln" style="left:30.67%"></div><div class="ln" style="left:34.00%"></div><div class="ln" style="left:62.67%"></div><div class="ln" style="left:85.33%"></div><div class="ln" style="left:89.33%"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

<div class="key-idea">

Three stars from the cluster, plus our Sun. They differ in color, size and brightness — but every one shows dark lines at the **same wavelengths**: <span class="fill">hydrogen</span> and <span class="fill">helium</span>.

</div>

<!--
PACKET: Part A, the Omega Centauri spectra.
THE POINT STUDENTS MUST LEAVE WITH: stars across the cluster are made of the SAME two elements. Composition is not the variable. Something else must explain why stars differ — and Part B reveals it is MASS.
LINES SHOWN: hydrogen 410, 434, 486, 656 nm; helium 447, 471, 492, 502, 588, 668 nm. The same set matched against the Sun in Lesson 1.
ESS1.A(2): spectra AND brightness identify composition, movement and distance.
-->

---

<!-- _class: phase-title -->

# PART B
## Mass Controls the Life Span

---

# The Life Cycles of Stars Model

<div class="pkt">PACKET PART B</div>

<div style="text-align:center">
<img src="esrt-life-cycles.png" style="max-height:445px; max-width:100%; background:#fff; padding:6px; border-radius:6px">
</div>

<div class="small" style="text-align:center">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

<!--
PACKET: Part B figure.
BOTH PATHS START IN THE SAME NEBULA. What separates them is MASS — more than 8 to 10 solar masses takes the right-hand path.
READ THE TIME LABELS ALOUD: "Billions of Years" on the Sun-like path, "Millions of Years" on the massive path, "100s Billions Years" for red dwarfs. That contrast is the whole lesson in one figure.
-->

---

<!-- _class: lt3 -->

# Stage Sequences and Timing

<div class="pkt">PACKET PART B</div>

| Group | Mass (M☉) | Stages |
|---|---|---|
| **Low mass** (our Sun) | 0.2 – 6 | Main Sequence → Red Giant → **White Dwarf** |
| **High mass** | 10, 20 | Main Sequence → Red Giant → **supernova** → Neutron Star |
| **Highest mass** | 30, 40 | Main Sequence → Red Giant → Blue Giant → **supernova** → Black Hole |

| Mass (M☉) | Time on the main sequence |
|---|---|
| 1 (our Sun) | about 9 billion years |
| 4 | about 179 million years |
| 10 | about 19.5 million years |
| 40 | about 4.9 million years |

<!--
PACKET: Part B, both tables.
~90% OF A STAR'S LIFE is on the main sequence — the stage where size, temperature and luminosity change very little. That is what "stable" means here.
THE PATTERN: as mass goes UP, life span goes DOWN and properties change FASTER.
PACKET QUESTIONS 2 AND 3: why 40x the fuel yet a shorter life (surprising — Part F answers it), and the Sun at 4.6 of ~9 billion main-sequence years, so roughly halfway.
-->

---

<!-- _class: phase-title -->

# PART C
## The Hertzsprung–Russell Diagram

---

# The H–R Diagram

<div class="pkt">PACKET PART C</div>

<div style="display:flex; gap:28px; align-items:flex-start">
<div style="flex:0 0 auto">
<img src="esrt-hr-diagram.png" style="height:505px; background:#fff; padding:5px; border-radius:6px">
</div>
<div style="flex:1; font-size:0.86em">

**Five things it gives you:**

1. **Luminosity** — $10^{-5}$ to $10^{6}$ solar units
2. **Temperature** — as **spectral class** O B A F G K M. It runs <span class="fill">backwards</span>
3. **Color** — blue hot, red cool
4. The **Lifetime** lines — read life span straight off
5. The **Solar Radii** lines — read a star's **size**, which is never plotted. The right-hand arrow shows **increasing mass**

<div class="small">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

</div>
</div>

<!--
PACKET: Part C, "Five things this diagram gives you."
THE KEY, lower right, is how the four star types are told apart — by circle SHADING, not by labelled zones. Students must check it before classifying anything.
THE REVERSED AXIS costs marks every year. Say it twice.
-->

---

<!-- _class: lt4 -->

# Reading the Main Sequence

<div class="pkt">PACKET PART C</div>

About <span class="fill">90</span>% of all stars fall along one diagonal band — the **main sequence**.

<div class="columns">
<div class="col">

- Hotter stars are **more** luminous
- **Blue** stars — hottest, most massive, <span class="fill">shortest</span> lives
- **Red** stars — coolest, least massive, <span class="fill">longest</span> lives

</div>
<div class="col">

<div class="key-idea">

Stars the size of our Sun **or smaller** have life spans of over <span class="fill">10 billion</span> years.

</div>

</div>
</div>

| Star | Spectral class | Color | Type |
|---|---|---|---|
| **the Sun** | <span class="fill">G</span> | <span class="fill">yellow</span> | <span class="fill">main sequence</span> |
| **Betelgeuse** | <span class="fill">M</span> | <span class="fill">red</span> | <span class="fill">supergiant</span> |
| **Aldebaran** | <span class="fill">K</span> | <span class="fill">orange</span> | <span class="fill">giant</span> |
| **Sirius B** | <span class="fill">A/B</span> | <span class="fill">white</span> | <span class="fill">white dwarf</span> |

<!--
PACKET: Part C blanks plus question 5's table.
PACKET QUESTIONS 6 AND 7 use the isolines: Sirius vs Sirius B on the Solar Radii lines (1 vs 10^-2 solar radius, hence the thousandfold luminosity gap), and the Sun vs Rigel on the Lifetime lines (10^10 vs 10^7 years).
-->

---

<!-- _class: phase-title -->

# PART D
## Why Stars Are Stable

---

<!-- _class: lt2 lt3 -->

# Gravity vs. Fusion

<div class="pkt">PACKET PART D</div>

| | Gravity | Fusion force |
|---|---|---|
| **Direction** | Pulls **inward**, toward the center | Pushes **outward**, from the core |
| **Source** | Every object with mass. **More mass → more gravity** | Energy released when hydrogen nuclei fuse into helium |
| **Alone it would** | Collapse the star in on itself | Blast the star's matter into space |

<div class="key-idea">

**Equilibrium** — the two forces are <span class="fill">equal</span> and balance. The star barely changes size, temperature or luminosity. **That is the main sequence.**

So when a star shrinks or expands, the forces are **no longer equal**.

</div>

<!--
PACKET: Part D, one blank.
THE CHAIN STUDENTS MISS: gravity pulls hydrogen together → particles collide more often and harder → that causes FUSION. Gravity causes the very thing that opposes it.
-->

---

<!-- _class: phase-title -->

# PART E
## The Forces at Each Stage

---

<!-- _class: lt1 lt3 -->

# Which Force Wins, and When

<div class="pkt">PACKET PART E</div>

| Stage | Which force wins? | What happens to the star |
|---|---|---|
| **Dust cloud → new star** | **Gravity** — no fusion yet | Collapses inward; heats up until fusion starts |
| **Main sequence** | **Neither** — equilibrium | Stays about the same, for billions of years |
| **Red giant** | **Fusion force** | Expands enormously; temperature and luminosity swing |
| **White dwarf, neutron star, black hole** | **Gravity** — the fuel is gone | Collapses to extreme density |

<div class="warning">

When the fuel runs out, fusion stops — but **gravity does not**. With nothing pushing out, gravity wins completely. That is why these remnants are the **densest objects in the universe**.

</div>

<!--
PACKET: Part E.
THE ENDING IS A COLLAPSE, NOT A FADE. Students expect "runs out of fuel" to mean the star just goes dark. Make the asymmetry explicit: fusion can stop, gravity cannot.
PACKET QUESTIONS 9 AND 10: why constant size (equilibrium), and why Earth needed a MAIN SEQUENCE star for billions of years, not just a bright one.
-->

---

<!-- _class: phase-title -->

# PART F
## Why Mass Sets the Rate

---

# Resolving the Puzzle

<div class="pkt">PACKET PART F</div>

<div style="text-align:center; font-size:1.05em; margin: 18px 0">

more mass &nbsp;→&nbsp; more <span class="fill">gravity</span> &nbsp;→&nbsp; particles collide harder and more often &nbsp;→&nbsp; **faster rate of fusion**

</div>

<div class="key-idea">

A 40 M☉ star *does* start with far more hydrogen. But its enormous gravity makes it fuse that hydrogen so much faster that it runs out **first**.

*More fuel — but a far bigger fire.*

</div>

<div class="columns">
<div class="col">

This also explains **luminosity**: faster fusion = more energy per second. The most massive stars sit at the <span class="fill">top</span> of the main sequence.

</div>
<div class="col">

And the population: there are **more** low-mass stars because they use fuel so slowly that they <span class="fill">last much longer</span>.

</div>
</div>

<!--
PACKET: Part F, three blanks.
THIS IS THE PAYOFF of the puzzle set in Part B. Make sure students connect it back explicitly — the surprise and its resolution are two halves of one idea.
-->

---

<!-- _class: phase-title -->

# PART G
## Where the Elements Came From

---

# Nucleosynthesis in a Massive Star

<div class="pkt">PACKET PART G</div>

<div style="text-align:center">
<img src="esrt-nucleosynthesis.png" style="max-height:425px; max-width:100%; background:#fff; padding:6px; border-radius:6px">
</div>

<div class="small" style="text-align:center">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

<!--
PACKET: Part G figure.
READ THE DURATION COLUMN DOWNWARD: 7x10^6 years for H→He, 7x10^5 for He→C, 600 years for C→O, 6 MONTHS for O→Si, ONE DAY for Si→Fe, a QUARTER SECOND for core collapse.
ASK: "What is happening to the time as you go down?" then "What comes right after that quarter second?" — the supernova.
WHY IT ACCELERATES: heavier elements release less energy per reaction, so the star must burn them faster to hold itself up. (Beyond the assessment boundary — offer only if asked.)
-->

---

# The Iron Ceiling — and Beyond

<div class="pkt">PACKET PART G</div>

<div class="columns">
<div class="col">

During the main sequence a star fuses hydrogen into helium. Then helium, then heavier elements — until it reaches <span class="fill">iron</span>.

<div class="warning">

Fusing anything heavier than iron **absorbs** more energy than it releases. A star's core cannot do it, no matter how much gravity it has.

</div>

</div>
<div class="col">

<div class="key-idea">

A **supernova** releases more energy in seconds than the star made in its entire life — enough to fuse the elements **heavier than iron**, and scatter them into space.

</div>

Every atom in your body heavier than helium was made inside a star. The gold in a ring was made in an **exploding** one.

</div>
</div>

<!--
PACKET: Part G, "The iron ceiling" and "Beyond iron."
ESS1.A(4) verbatim: "nuclear fusion within stars produces all atomic nuclei lighter than and including iron... Heavier elements are produced when certain massive stars achieve a supernova stage and explode."
THE MORE MASSIVE THE STAR, the heavier the elements it can reach.
-->

---

# What Is Conserved

<div class="pkt">PACKET PART G</div>

| Reaction | Before | p + n before | After | p + n after |
|---|---|---|---|---|
| Fusion of hydrogen | hydrogen-1 + hydrogen-2 | **3** | helium-3 | **3** |
| Fusion of helium | helium-3 + helium-4 | **7** | beryllium-7 | **7** |
| Beryllium + helium | beryllium-8 + helium-4 | **12** | carbon-12 | **12** |
| Carbon + helium | carbon-12 + helium-4 | **16** | oxygen-16 | **16** |

<div class="key-idea">

Types of atoms: <span class="fill">not</span> conserved — new elements are created.

Total **protons + neutrons**: **conserved** — every row matches.

</div>

<!--
PACKET: Part G, conservation box. One blank.
CCC5(5) verbatim: "In nuclear processes, atoms are not conserved, but the total number of protons plus neutrons is conserved."
CONTRAST WITH L1 (packet question 12): a chemical reaction only rearranges atoms — same atoms before and after, no new elements.
-->

---

<!-- _class: phase-title -->

# PART H
## Stars Not on the Main Sequence

---

# Luminosity Depends on Two Things

<div class="pkt">PACKET PART H</div>

A star's luminosity depends on its <span class="fill">temperature</span> **and** its <span class="fill">size</span>.

So a star can be very luminous by being very **hot** — or by being very **large**.

| Star | Temperature | Luminosity | Therefore it must be… |
|---|---|---|---|
| **Betelgeuse** | 3,000 K (*cool*) | 9,000 Suns (*very bright*) | **enormous** — a supergiant |
| **LP 033276** | 11,100 K (*hot*) | 0.0001 Suns (*very dim*) | **tiny** — a white dwarf |

<div class="key-idea">

On an H–R diagram, star size increases toward the <span class="fill">upper right</span>. Size is never plotted — but it can always be deduced.

</div>

<!--
PACKET: Part H, three blanks.
THE REASONING BOTH WAYS: same temperature + more luminous = bigger. Same luminosity + cooler = bigger.
WATCH FOR: students reading white dwarfs as "cool" because they sit low. Low means low LUMINOSITY. Sirius B is hotter than the Sun — low and left means hot and dim, therefore small.
PACKET QUESTION 15: Betelgeuse is a poor habitability candidate on two counts — off the main sequence, and far too short-lived.
-->

---

<!-- _class: phase-title -->

# PART I
## Vocabulary

---

<!-- _class: lefttable compact -->

# Vocabulary (1 of 2)

| Term | Definition |
|---|---|
| **Luminosity** | The rate at which a star releases energy (per second), compared to the Sun |
| **Solar mass (M☉)** | The mass of our Sun, used as the unit for other stars |
| **Main sequence** | The long, stable stage where a star fuses hydrogen and gravity balances fusion force |
| **Equilibrium** | Inward gravity and outward fusion force are equal |
| **H–R diagram** | Luminosity against surface temperature. Temperature runs backwards; both axes are powers of ten |
| **Red giant** | A late stage where fusion force exceeds gravity and the star expands enormously |

---

<!-- _class: lefttable compact -->

# Vocabulary (2 of 2)

| Term | Definition |
|---|---|
| **Supergiant** | A very large, very luminous star — bright despite a low surface temperature |
| **White dwarf** | The small, dense, dim remnant left when a low-mass star's fuel is gone |
| **Neutron star** | The extremely dense remnant left after a high-mass star's supernova |
| **Supernova** | The explosion of a massive star, briefly releasing more energy than it made in its whole life |
| **Nucleosynthesis** | The formation of new atomic nuclei by fusion inside stars |
| **Stability** | Properties changing very little over a long time |

---

# The Four Statements to Know Cold

<div class="key-idea">

1. A star's **mass** controls its life span and its stability — more mass means a *shorter*, less stable life.

2. A star is stable when gravity and fusion force are in **equilibrium**. That is what the main sequence is.

3. The study of stars' light **spectra and brightness** tells us what stars are made of, how they move, and how far away they are.

4. Fusion in stars makes every element up to and including **iron**; elements heavier than iron are made in **supernovae**.

</div>

<!--
PACKET: Part I closing box.
THESE FOUR ARE THE DCIs in student language: ESS1.A(1), PS3.D(1)/equilibrium, ESS1.A(2), ESS1.A(4).
UP NEXT: Planets and Orbits — is the exoplanet the right distance from its star?
-->
