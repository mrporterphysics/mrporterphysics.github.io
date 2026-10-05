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
---

<!-- _class: title-slide -->

# ✨ Star Life Cycles
## Unit 1: Discovering New Worlds — Lesson 2 — 5E Instructional Sequence
### Does the exoplanet have a star like our Sun? What is our Sun like, compared to other stars?

<!--
LESSON OVERVIEW (7 days): Students shift from studying stars at the scale of our solar system to the scale of a galaxy. They use Star in a Box to find patterns linking a star's MASS to its lifespan and stability, build an H-R diagram to connect observable properties to lifespan, explain those patterns using the balance of gravity and fusion force, and model nucleosynthesis with the Fe-26 game. They close by arguing which star in the performance task data set could support an Earth-like planet.

PE: HS-ESS1-1, HS-ESS1-3.
DCIs: ESS1.A(1) Sun's ~10-billion-year life span • ESS1.A(2) spectra AND BRIGHTNESS identify composition, movement, distance • ESS1.A(4) fusion makes nuclei up to iron; heavier elements come from supernovae • PS3.D(1) fusion in the core releases the energy that reaches Earth as radiation.
SEP: #2 Developing & Using Models (incl. computational and mathematical models), #6 Constructing Explanations.
CCC: #1 Patterns — DIFFERENT patterns appear at each SCALE at which a system is studied • #5 Energy and Matter — in nuclear processes atoms are not conserved but protons + neutrons are • #7 Stability and Change.

PACING: Day 1 Engage • Days 2–3 Explore 1 • Days 3–4 Explore 2 • Days 5–6 Explain • Day 6 Elaborate • Day 7 Evaluate.

DECK NOTE: Companion to the L0–L1 deck; same theme. Enable HTML in Marp (VS Code: markdown.marp.enableHtml; CLI: --html).

NUMBER NOTE: The L2 student packet opens "The Sun has been providing the Earth with energy for 5 billion years." L1, the PTO and the guided notes all use 4.6 billion. This deck uses 4.6 billion throughout for consistency — mention the rounding if a student catches it.
-->

---

<!-- _class: phase-title -->

# ENGAGE
## What happens to stars over time?

<!--
PHASE GOAL: Students observe a visualization of a supernova, share initial ideas about what made the star change and explode, and generate questions about the stability of a star that could support an Earth-like planet.
GROUPING: Pairs. ROUTINE: Domino Discover.
TIMING: ~1 class period.
MATERIALS: What Was Supernova 1054? handout, Supernova 1054 video, chart paper.
LAUNCH: Remind students of the L1 conclusion — our Sun has supplied the right energy for liquid water for over 4 billion years. After L1, questions surfaced about OTHER stars: "Will other stars burn out soon after we get to a planet orbiting them?" "Will they produce the right energy for long enough for life to evolve?"
-->

---

# What Was Supernova 1054?

<div class="columns">
<div class="col">

**July 4, 1054.** Observers in China, the Arab world, and among Native American peoples all recorded the same thing: a **new star** appeared in the sky.

- Bright enough to be seen in **daylight**
- Visible for about **654 days**
- Then it faded from view

</div>
<div class="col">

<div class="key-idea">

Today a cloud of glowing gas sits in that exact spot: the **Crab Nebula** — the remnant of the star that exploded.

</div>

> **Tell the story:** In the beginning… Then… Now…

</div>
</div>

<!--
TEACHER MOVE: Students review the text (July 4, 1054), the Crab Nebula image, and the video, then answer questions 1–4 individually before telling the story in groups.
DOMINO DISCOVER: Groups share the story. There won't be much variation between groups — the point is that everyone understands the phenomenon. If these don't come up, raise them: (1) the event was visible ~654 days per historical accounts; (2) scientists used those accounts plus other supernova observations to build the data visualization; (3) it became the Crab Nebula, still visible today.
ACCESS FOR ALL: Text + video + image together support below-level readers. Some students struggle with the idea that the explosion was long ago but the remnant is still visible — telling the story in sequence helps.
WHY THIS PHENOMENON: Students cannot observe a star change within a human lifetime. A supernova is the one stellar change humans HAVE witnessed and recorded.
TIMING: ~20 min.
-->

---

# Supernova 1054 — Crab Nebula Remnant

<iframe width="912" height="513" src="https://www.youtube.com/embed/aysiMbgml5g" title="Supernova 1054 - Crab Nebula remnant" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!--
TEACHER MOVE: Show after students have read the text. Students record observations for question 4.
PROMPT: What do you observe about how the star changes?
EXPECTED: It gets much brighter very suddenly • it throws material outward • what's left spreads into a cloud • there's something small and bright at the center.
-->

---

# What Caused the Star to Change?

<div class="columns">
<div class="col">

**Jot your initial ideas:**

What do you think caused the changes in the star you just watched?

*No wrong answers — we're recording where our thinking starts.*

</div>
<div class="col">

**Turn and talk:** What other phenomena do you know that are similar to this?

<div class="small">💥 Nuclear explosions &nbsp;·&nbsp; 🌌 The solar system forming from a collapsing cloud of dust and gas</div>

</div>
</div>

<!--
TEACHER MOVE: Students jot initial ideas about why a star explodes (question 5 on the handout). Then the relevant-phenomena turn and talk.
LOOK & LISTEN FOR (middle-school ideas students bring): nuclear explosions • the solar system forming from a disk of dust and gas pulled together by gravity (MS.ESS1.B). Both are useful — gravity and nuclear processes are exactly the two mechanisms this 5E builds on.
DO NOT RESOLVE: Keep these on the poster. The Explain and Elaborate phases test them.
REMINDER TO STUDENTS: We are looking for a star that lives long enough and stays steady enough for liquid water — and life — to persist on a planet orbiting it.
ACCESS FOR ALL: Most students have never considered how stars change, since we can't watch it happen. Connecting to a familiar phenomenon gives everyone an entry point.
-->

---

# What Do We Need to Know About Stars?

> **We know from Supernova 1054 that stars do not last forever. What do we need to know about the life and death of stars — keeping in mind we're looking for a star that could support an Earth-like planet?**

<div class="columns">
<div class="col">

- Will our Sun change and explode? When?
- What causes a star to change and explode?
- Do stars change in **patterns**?
- Are changes in stars fast or slow?

</div>
<div class="col">

- Does **gravity** have anything to do with it?
- Are **nuclear reactions** the cause?
- Would an exploding star destroy its planets?
- Will other stars change and explode?

</div>
</div>

<!--
TEACHER MOVE: Pairs generate questions; Domino Discover to surface and document the range across the class. Then pairs pick the THREE most relevant to finding a star that could support an Earth-like planet.
NOTE: Reveal these examples only after students generate their own.
CLASSROOM SUPPORT: Start a poster titled "What do we need to know about other stars?" Keep it up for the whole 5E.
CCC #7: Most of these questions are about STABILITY AND CHANGE — name that lens when it fits, but let students' wording lead.
ACCESS FOR MULTILINGUAL LEARNERS: Repetition across groups in the Domino Discover is intentional — emerging language learners get several rounds of comprehensible input from different speakers.
TIMING: ~20 min.
-->

---

<!-- _class: phase-title -->

# EXPLORE 1
## What kinds of stars have long, stable lives?

<!--
PHASE GOAL: Students use a computational model (Star in a Box) to find patterns relating a star's MASS to its lifespan and to how fast its properties change.
GROUPING: Pairs. ROUTINE: Domino Discover.
TIMING: ~1.5 class periods.
MATERIALS: What Properties of Stars Give Us Clues About Their Life Spans? • What Kinds of Stars Have Long and Stable Life Spans? • Star in a Box simulation • laptops.
LAUNCH: Ask what data from other stars would help answer the Engage questions. If students stall, point them back to the Sun data from L1.
LOOK & LISTEN FOR: light from other stars • spectra • brightness • how long stars live • temperature • how much temperature changes • how much energy they release and for how long.
-->

---

# What Can We See From Earth?

<div class="columns">
<div class="col">

From a dark place, the night sky is full of stars — but to our eyes each one is a **tiny white dot**.

> What would we see with a **more powerful** telescope?
>
> What would we see with a telescope **in space**?

</div>
<div class="col">

<div class="key-idea">

In **1990** NASA launched **Hubble** into space. Above the atmosphere, it records detail we simply cannot get from the ground.

</div>

</div>
</div>

<!--
TEACHER MOVE: Students answer individually, then discuss with a partner. The purpose is to notice that from Earth we mostly see stars as little white dots — very different from the Hubble view they're about to see.
IMPLEMENTATION TIP: The night sky image can just be projected if getting a good copy for every student is a hassle.
TRANSITION: Share a few pairs' predictions before revealing the Hubble image.
-->

---

# Omega Centauri

<div class="columns">
<div class="col">

Hubble's image of the heart of **Omega Centauri** — nearly **10 million stars**, the largest of about **150 star clusters** in the Milky Way.

> **What do you observe about the stars?**
> **What do you observe in their spectra?**

</div>
<div class="col">

<div class="key-idea">

**Different colors. Different sizes. Different brightness.**

But the **spectra** show the same thing our Sun showed: these stars are made of **hydrogen and helium** too.

</div>

</div>
</div>

<!--
TEACHER MOVE: Students examine the image and the sample spectra, then answer the three questions. Document ideas as they share.
LOOK & LISTEN FOR: stars are different colors • different sizes • vary in brightness • more detail and shape • the spectra show H and He just like our Sun • color difference is caused by temperature • size/brightness differences have to do with distance.
NOTE: "It's just distance" is a reasonable hypothesis and will be tested in Explore 2 — the H-R diagram uses luminosity, which already accounts for distance. Don't shut it down here.
CONNECTION: This is ESS1.A(2) — spectra AND brightness identify composition, movement, and distance.
-->

---

# Bigger Star, More Fuel, More Mass

<div class="columns">
<div class="col">

If stars are made of the **same stuff** (hydrogen and helium), then a **bigger** star has…

→ **more** of that stuff
→ therefore **more mass**
→ therefore **more fuel**

</div>
<div class="col">

<div class="key-idea">

From L1: the Sun's hydrogen lasts about **10 billion years.**

So if we want to know how long a star will last — **what should we be looking at?**

</div>

</div>
</div>

<!--
TAKE TIME FOR THESE KEY POINTS: (1) Larger stars made of the same stuff have MORE of that stuff. (2) Larger stars therefore have more MASS.
TEACHER MOVE: Display the hydrogen/helium ratio data for one-solar-mass stars — the same data students analyzed in L1 Elaborate. Highlight that it showed the Sun running out of hydrogen after ~10 billion years. Then ask what we should consider if we want to know how long a star's life span is. Students should land on amount of hydrogen, or mass.
SET UP THE SURPRISE: Students will almost certainly predict MORE mass = LONGER life. Let them commit to that prediction out loud. The simulation overturns it, and that contradiction drives the rest of the 5E.
TRANSITION: Into the Star in a Box investigation.
-->

---

# Star in a Box

<div class="columns">
<div class="col">

<div class="panel">

🔗 **Star in a Box**

`starinabox.lco.global`

Pairs, one laptop. **Play with it first** before collecting any data.

</div>

The graph plots **luminosity** against **temperature**. The panel gives you five things: size and color, temperature, luminosity, time per stage, and mass.

</div>
<div class="col">

> **Which data should we focus on?**

<div class="key-idea">

**Time, size, temperature, and luminosity.**

</div>

<div class="vocab">

**Luminosity** — the **rate** at which a star releases energy (energy per second), compared to our Sun

</div>

</div>
</div>

<!--
TEACHER MOVE: Students read the text about why and how Star in a Box was built, plus the user guide. Give them time to play before using it for data — otherwise this becomes step-following, not sensemaking.
SEP #2: Students may not realize computational models are built FROM REAL DATA. Paragraph one of the handout says so — unpack it, because they'll be making evidence-based claims from model output.
VOCABULARY PAYOFF: Luminosity is the term L1 deliberately deferred ("students don't need this yet, but it's very important in the next 5E"). Here it finally gets defined, and it becomes the y-axis of the H-R diagram. Say that out loud — it rewards students who asked about it in L1.
SIM RANGE: Masses from 0.2 to 40 solar masses. The default star is 1 solar mass — our Sun.
NOTE: Reveal the answer box only after students decide.
-->

---

<!-- _class: lt1 lt3 -->

# Grouping the Stars by Life Cycle

| Group | Masses (M☉) | Stages |
|---|---|---|
| **Group 1** — our Sun and stars like it | 0.2, 0.65, **1**, 2, 4, 6 | Main Sequence → Red Giant → **White Dwarf** |
| **Group 2** | 10, 20 | Main Sequence → Red Giant → **Neutron Star** |
| **Group 3** | 30, 40 | Main Sequence → Red Giant → Blue Giant → **Black Hole** |

<div class="warning">

Groups 2 and 3 don't get to a neutron star or black hole quietly — they get there through a **supernova**. That's the explosion we started with.

</div>

<!--
TEACHER MOVE: Run the sim on "fast" for every mass, then agree as a class on groupings. Students can group differently, but a shared set makes the whole-class discussion far easier. Use this table as the guide.
ACCURACY NOTE — IMPORTANT: The stage names in rows 2 and 3 are Star in a Box's own labels, taken straight from the Explore 1 exemplar. They do NOT name the supernova step, even though this entire 5E is anchored on Supernova 1054 and the Elaborate phase depends on supernovae producing the heavy elements. Add it explicitly — the warning box does. (Astronomically: high-mass stars go Main Sequence → Red Supergiant → Supernova → neutron star or black hole.)
TEACHER MOVE: Students fill in the top of each group's page with their plan. The Group 1 page is already completed as an example.
-->

---

<!-- _class: lt2 lt3 lt4 -->

# Group 1: Our Sun

| | Main Sequence | Red Giant | White Dwarf |
|---|---|---|---|
| **Time in stage** | ~**9 billion yr** | ~1.3 billion yr | a very long time |
| **Size** | stays about the same for ~9 billion yr | grows much larger, fast — then shrinks sharply | small, and stays small |
| **Temperature** | changes **very little** | dips slowly, then climbs past 60,000 K | lower than today, steady |
| **Luminosity** | ~1 solar luminosity for ~7.5 billion yr | changes fast and by a lot | drops far below today's, then steady |
| **Mass** | no real change for ~9 billion yr | falls faster and faster as it expands | about half the original, then steady |

<!--
TEACHER MOVE: Pairs set the sim to 1 solar mass and fill this in. Show the completed table only after they've collected their own.
KEY POINT: Look down the Main Sequence column — every row says "changes very little, for about 9 billion years." THAT is what stability means, and it's why Earth had time for life to evolve. Then look at the Red Giant column — everything changes at once.
CONFERRING: "During which stage(s) do stars change the least? The most?" • "What's the relationship between mass and lifespan?" • "Which stars' properties change fastest — low mass or high mass?"
DIFFERENTIATION: Students who struggle to articulate observations can be given some of these sample responses to work from.
CONNECTION: ~9 billion years in the main sequence, and the Sun is ~4.6 billion years old. It is roughly halfway through — the same conclusion as L1, now from a second, independent model.
-->

---

<!-- _class: lefttable -->

# See – Think – Wonder

| SEE — the pattern | THINK — what it means | WONDER |
|---|---|---|
| Stars change **least** during the main sequence, and at the very end | To keep liquid water for a long time, we need a star **in its main sequence** | Why do more massive stars die faster? |
| Stars change **very fast** from the end of the main sequence onward | Once a star leaves the main sequence, any planet is in trouble | Why do they *change* faster? |
| **More mass → shorter** lifespan | We should look for **low-mass** stars — more stable, longer-lived | How do we tell which stars are low-mass, from Earth? |
| **More mass → faster** change in luminosity and temperature | | |

<!--
TEACHER MOVE: Pairs complete See-Think-Wonder as a synthesis: "What are your overall takeaways? Given what you know about the conditions life needs and how long it takes to evolve, which group of stars is most likely to support a planet that sustains life? Cite evidence from the simulator and your reasoning."
DOMINO DISCOVER: Record ideas on chart paper. Push for evidence, not just claims.
DIFFERENTIATION: Sentence starters in the SEE column for students who struggle to name patterns.
IF IDEAS DON'T SURFACE: Re-run the sim and use the conferring questions.
NOTE: Reveal rows progressively as pairs share.
-->

---

# The Result That Doesn't Make Sense — Yet

<div class="columns">
<div class="col">

A **40 M☉** star starts with **40 times** as much hydrogen fuel as our Sun.

It burns out in a few **million** years.

Our Sun will last about **10 billion**.

</div>
<div class="col">

<div class="warning">

**More fuel. Shorter life.**

That is backwards from how fuel normally works. A bigger gas tank should last longer.

</div>

> **So what are we missing?**

</div>
</div>

<!--
TEACHER MOVE: If students don't point out that it's counterintuitive that higher-mass stars with more hydrogen die FASTER, raise it yourself and ask a few students for their thoughts.
WHY THIS SLIDE MATTERS: This contradiction is the engine for the rest of the 5E. The Explain phase supplies gravity as the missing piece; the Elaborate phase (Fe-26) lets students see the rate difference directly. Do not resolve it here.
DATA FOR REFERENCE: time in main sequence — 1 M☉ ≈ 8,992.81 million yr • 4 M☉ ≈ 178.91 million yr • 40 M☉ ≈ 4.87 million yr. All stars spend roughly 90% of their lives in the main sequence.
TRANSITION: "Before we can explain WHY, we need a way to tell a star's mass from Earth. We can't weigh a star."
-->

---

# The Life Cycles of Stars Model

<div style="text-align:center">
<img src="esrt-life-cycles.png" style="max-height:500px; max-width:100%; background:#fff; padding:6px; border-radius:6px">
</div>

<div class="small" style="text-align:center">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

<!--
TEACHER MOVE: This is the diagram the Explore 1 extension refers to, and it is in the reference tables students are given on the exam. Project it alongside Star in a Box.
READING IT: Both paths start in the SAME star-forming nebula. What separates them is MASS. Sun-like stars (left loop) take BILLIONS of years and end as a planetary nebula then a white dwarf. Massive stars (right, more than 8–10 solar masses) take MILLIONS of years and end in a supernova, leaving a neutron star or a black hole.
NOTE THE TIME LABELS: "Billions of Years" on the left, "Millions of Years" on the right, "100s Billions Years" for red dwarfs. That contrast IS the lesson.
CONNECT TO THE TABLE: This diagram and the Grouping the Stars table say the same thing. The ESRT version names the supernova step that Star in a Box's stage labels leave out.
-->

---

# Extension: Reading the Life Cycles Model

<div class="columns">
<div class="col">

**Step 1 — Reading the Lines**
- What types of stars does the model include?
- Mark the **three paths** a star can take; number them 1–3
- Rank the paths **fastest → slowest**

**Step 2 — Reading Between the Lines**
- Annotate where the **main sequence** is on each path
- Annotate the **masses** from Star in a Box that take each path

</div>
<div class="col">

**Step 3 — Reading Beyond the Lines**
- How are the **digital** model and the **diagram** similar? Different?
- When is each one **more useful**?

<div class="key-idea">

Predict for **0.75×**, **3×**, and **15×** the Sun: which phases, and roughly how long in each?

</div>

</div>
</div>

<!--
TEACHER MOVE: Optional extension — a three-level guide pairing the static Life Cycles of Stars diagram with the Star in a Box simulation. Good for early finishers, and good for any student who needs a second representation.
WHY IT'S WORTH DOING: Step 3 is a genuine SEP #2 question — comparing what different models are good for. A computational model shows change over time; a static diagram shows all the paths at once. Neither is "better."
ANSWERS: 0.75 M☉ → Group 1 path (MS → Red Giant → White Dwarf), tens of billions of years in the main sequence. 3 M☉ → Group 1 path, ~300 million yr main sequence. 15 M☉ → Group 2 path (MS → Red Giant → supernova → Neutron Star), ~10–20 million yr.
-->

---

<!-- _class: phase-title -->

# EXPLORE 2
## How can we tell a star's mass from Earth?

<!--
PHASE GOAL: Students build and analyze a mathematical model — the Hertzsprung-Russell diagram — to find patterns linking OBSERVABLE star properties to mass, stability, and lifespan.
GROUPING: Small groups. ROUTINE: Domino Discover.
TIMING: ~1.5 class periods.
MATERIALS: How Do We Use Observable Properties to Identify Stars with Long and Stable Lifespans? • HR Diagram Star Circles • HR Diagram Graph Template (poster size) • scissors.
LAUNCH: We can't weigh a star. Are there OBSERVABLE properties that tell us about its mass? Ask how students have looked for relationships between variables in past math or science classes — they'll say graph it. That's the move.
KEY FRAMING: What they build is a STATIC version of the computational model from Explore 1 — every star plotted at one moment in time, which makes connections between properties visible all at once.
STAR SET: 60 circles. 22 are real stars with real data; the rest were chosen so the mix of star types and colors reflects their real relative abundance in the universe.
-->

---

# Building the Diagram

<div class="columns">
<div class="col">

**Each star circle gives you:**
- **Name**
- **Temperature** — of the star's surface
- **Luminosity** — rate of energy release, compared to our Sun (a fraction means dimmer than the Sun)
- **Expected life span**

</div>
<div class="col">

**Before you plot — check the axes:**

1. What's on the **x-axis**? What units? What range?
2. **What is unusual about the x-axis?**
3. What's on the **y-axis**? What units? What range?

</div>
</div>

<!--
TEACHER MOVE: Groups answer the variables questions BEFORE plotting. Question 2 is the one that matters.
THE ANSWER TO Q2: Temperature runs BACKWARDS — hottest on the left, coolest on the right. This is a historical convention (the diagram was originally organized by spectral class). Students will plot points in the wrong place if they don't catch it, so make sure every group has it before the circles come out.
TEACHER MOVE: Hand out the circles — each group member plots 4–5 and writes three observations, then they finish the set together.
IMPLEMENTATION TIP: Poster-size graph per group. Having them physically place circles is worth the time; the clustering emerges under their hands.
-->

---

# The Hertzsprung-Russell Diagram

<div style="display:flex; gap:28px; align-items:flex-start">
<div style="flex:0 0 auto">
<img src="esrt-hr-diagram.png" style="height:528px; background:#fff; padding:5px; border-radius:6px">
</div>
<div style="flex:1; font-size:0.88em">

**It gives you five things:**

1. **Luminosity** — $10^{-5}$ to $10^{6}$ solar units
2. **Temperature** — as **spectral class** O B A F G K M. The table below converts each to kelvin
3. **Color** — blue hot, red cool
4. The diagonal **Lifetime** lines — read a star's life span straight off
5. The diagonal **Solar Radii** lines — read a star's **size**, which is never plotted

<div class="warning">

The temperature axis runs **backwards.**

</div>

<div class="small">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

</div>
</div>

<!--
TEACHER MOVE: Show this only AFTER groups have plotted their own posters and shared patterns. It is the consolidated version of what they built, not a substitute for building it.
READING IT: ~90% of stars fall on the main sequence band running upper-left (hot, bright, blue, massive) to lower-right (cool, dim, red, low mass). The Sun sits in the middle. Giants and supergiants are bright but COOL — they sit above the band. White dwarfs are hot but DIM — below it.
ANNOTATE LIVE: The plan says to annotate terms on a shared H-R diagram so it can serve as a class reference. Project this and mark it up as terms come out of the discussion.
NOTE: Both axes are logarithmic, and temperature runs backwards. Luminosity spans ten powers of ten — worth naming as a scale moment (CCC #3).
-->

---

# Where the Star Types Live

<div style="display:flex; gap:26px; align-items:center">
<div style="position:relative; flex:0 0 auto">
  <img src="esrt-hr-diagram.png" style="height:520px; background:#fff; padding:5px; border-radius:6px">
  <div style="position:absolute; left:37%; top:6%;  width:51%; height:12%; border:3px solid #FF7A7A; border-radius:50%"></div>
  <div style="position:absolute; left:64%; top:24%; width:17%; height:10%; border:3px solid #FF9245; border-radius:50%"></div>
  <div style="position:absolute; left:22%; top:42%; width:36%; height:17%; border:3px dashed #B794F6; border-radius:45%"></div>
  <div style="position:absolute; left:16%; top:30%; transform:rotate(-27deg); color:#1a6a7a; font-weight:700; font-size:15px">MAIN SEQUENCE</div>
</div>
<div style="flex:1; font-size:0.9em">

<div class="warning">

🔴 **Supergiants** — cool to hot, but *enormously* luminous

</div>

<div class="panel" style="border-left:4px solid #FF9245">

🟠 **Giants** — cool and luminous

</div>

<div class="vocab">

🟣 **White dwarfs** — hot but very **dim**

</div>

<div class="steps">

**Main sequence** — the diagonal band. ~90% of stars, including our Sun.

</div>

</div>
</div>

<!--
WHY THIS SLIDE: The ESRT diagram distinguishes star types by how each circle is SHADED (see its Key), not by labelled zones. Students reading it for the first time often miss that the types occupy distinct REGIONS. This slide makes the regions visible once; then go back to the clean version.
TEACHER MOVE: Show the clean diagram first, let students try to describe where each type sits, THEN reveal this.
KEY POINT: Position on the diagram is not decoration — it tells you the star's stage. Off the main sequence means no longer in equilibrium.
WATCH FOR: Students treating the white dwarf region as "cool" because it is low. It is LOW IN LUMINOSITY, not low in temperature — Sirius B is hotter than the Sun. Low and left = hot and dim = small.
CAUTION: The highlight rings are approximate guides, not exact boundaries. The Key on the diagram is the authority.
-->

---

# Patterns in the Diagram

<div class="columns">
<div class="col">

**What the data shows:**
- Most stars fall along **one band** — the main sequence
- **Hotter stars are more luminous** (on the band)
- **Color tracks temperature:** blue = hot, red = cool
- **More massive → shorter** expected life span
- **Red** stars have the **longest** expected lives; **blue-white** the shortest

</div>
<div class="col">

<div class="key-idea">

Stars about the **size of our Sun or smaller** have expected life spans of **over 10 billion years.**

</div>

> **And some stars don't fall on the band at all. Why not?**

</div>
</div>

<!--
TEACHER MOVE: Groups complete See-Think-Wonder, then Domino Discover.
LOOK & LISTEN FOR (critical for the Explain phase): connections between temperature and luminosity • similar stars cluster in similar places • hotter stars are more luminous • more massive stars have shorter expected lifespans • red stars live longest, light blue shortest • stars about the size of our Sun or smaller last over 10 billion years.
CONFERRING: "Where is a trend developing?" • "What's your evidence for that pattern?" • "What other property seems to go with color?" • "Are there stars that DON'T fit the trend line? Why do you think that is?" • "Which stars are most likely to explode as a supernova?"
THE PAYOFF: Color and brightness are OBSERVABLE from Earth. Mass is not. This diagram is how we get from what we can see to what we need to know.
DIFFERENTIATION: Sentence starters in the SEE column.
-->

---

# What Makes a Star a Good Candidate?

<div class="key-idea">

1. A star's **mass** lets us predict its life cycle.
2. **Color, temperature, and luminosity** are observable — and they give us clues about **mass**, and therefore about **stability** and **life span**.
3. Stars up to **1 solar mass** stay stable in the main sequence **longer than it took life to appear and evolve on Earth.**
4. Stars past the main sequence change enormously. Temperature and luminosity swing so far that they would **destroy life** on any planet orbiting them.

</div>

<!--
TEACHER MOVE: Invite students to answer two questions, then chart the class list: (1) What properties let us predict a star's life span and stability? (2) What kind of stars live the longest, most stable lives?
CLASSROOM SUPPORT: This class consensus list is what students will use when they analyze the performance task star data — keep it posted.
IF IDEAS DON'T SURFACE: Send the class back to their See-Think-Wonder charts.
NOTE: Point 3 is the one that ties back to the anchor phenomenon — the timeline from L0 showed life needed billions of years. Now students have a star-side criterion that matches it.
-->

---

# Extension: Reading a Scientist's H-R Diagram

<div class="columns">
<div class="col">

**Step 1 — Reading the Lines**
- Find and circle the **Sun**. What's its lifetime?
- What do the **left** and **right** y-axes show?
- Rewrite the **scientific notation** in standard form
- What's on this diagram that wasn't on yours?

**Step 2 — Reading Between the Lines**
- Find a star with a lifespan ≈ **10,000,000 years**
- Find a **white dwarf**; find a **supergiant**
- For each: temperature, luminosity, size in solar radii, color

</div>
<div class="col">

**Step 3 — Reading Beyond the Lines**
- When is **your** version more useful? When is **this** one?
- Name a star likely to be **Earth-like**
- Name one that is **not**
- Name one likely to **explode as a supernova**

</div>
</div>

<!--
TEACHER MOVE: Optional extension. Scientists read many versions of this diagram; becoming fluent means comparing a new one to one you already know. That's the actual skill here.
WHY THIS ONE IS WORTH IT: Reading an unfamiliar H-R diagram — reversed axis, log scales, solar radii on a second axis — is the single most transferable thing in this 5E and the most likely to show up on an exam.
SCIENTIFIC NOTATION: The handout spells it out — 10⁶ means 1 followed by 6 zeros (1,000,000); 10⁻⁵ means move the decimal 5 places left (0.00001). Worth doing together; many students stall here.
STEP 3 ANSWERS: Earth-like candidate = a main-sequence star at or below 1 solar mass. Not Earth-like = a supergiant or a white dwarf. Supernova candidate = a high-mass, high-luminosity star at the top of the main sequence.
-->

---

<!-- _class: phase-title -->

# EXPLAIN
## Why are some stars stable and others not?

<!--
PHASE GOAL: Students use gravity and fusion force to build an explanatory model for the stability-and-change patterns they found in both Explore phases.
GROUPING: Pairs. ROUTINE: Class Consensus Discussion. LITERACY: Text Annotation.
TIMING: ~1.5 class periods.
MATERIALS: How and Why do Stars Change handout • Summary Task • Why do some stars not fall in the main trend line? (extension) • Star Formation video • Natural Reader text-to-speech.
FRAMING SCRIPT: "In Explore 2 you surfaced many patterns in how stars change, and we started talking about what they mean for our search. But we still have questions about HOW and WHY. That's a great example of how finding patterns generates new questions. Now let's figure out what forces inside stars cause different groups of stars to change."
-->

---

# Three Questions Before We Read

<div class="columns">
<div class="col">

1. What do you think causes stars to **increase in energy**?

2. What do you think causes stars to **increase in size**?

</div>
<div class="col">

3. If the energy inside a star is so enormous, **why doesn't all that hydrogen and helium gas just blow off into space?** What force could be holding a star together?

</div>
</div>

<!--
TEACHER MOVE: Ask these before handing out the text. They are the bridge from pattern to mechanism.
LOOK & LISTEN FOR: nuclear fusion causes the energy and size to increase • GRAVITY is the force holding it together.
IMPLEMENTATION TIP: The teacher's job here is facilitation — moving the class from "here are the patterns" to "we need to know what causes them." Tie the questions directly to things specific students said in Explore 2. This is CCC Patterns working hand in hand with SEP Models.
TRANSITION: Into the text on page 1 of How and Why do Stars Change.
-->

---

# Forces Within a Star

<div class="columns">
<div class="col">

**Gravity — pulling in**
- Everything with mass generates gravity
- **More mass → more gravity**
- Inside a star, gravity pulls inward, trying to collapse it
- *Like your hands squeezing a stress ball*

</div>
<div class="col">

**Fusion — pushing out**
- Gravity packs hydrogen particles together, so they collide **more often and harder**
- That triggers **nuclear fusion**
- A little mass is converted into **enormous energy**
- That energy pushes **outward**

</div>
</div>

<div class="vocab">

**Annotate as you read:** ⭕ circle what explains why a star **grows** · underline what explains why a star **shrinks** · ▢ box anything you don't understand, and write the question in the margin

</div>

<!--
TEACHER MOVE: Students read independently using the three-part annotation strategy, then explain their annotations to a partner and label the Forces Acting on a Star diagram.
LOOK & LISTEN FOR —
GRAVITY: direct relationship between mass and gravitational pull • gravity affects a star's size by pulling gases toward the center of mass.
FUSION: gravity pulling hydrogen together makes collisions more frequent and forceful, which leads to fusion • a small percentage of mass is lost and converted to energy • that energy is much more than was needed to start the fusion • the net gain pushes outward.
DIFFERENTIATION: Natural Reader text-to-speech (Chrome extension) for English Language Learners and below-level readers — it highlights words as it reads, so students can spend their effort on comprehension instead of decoding.
CONNECTION TO L1: "A small percentage of mass is converted into energy" is why fusion releases ~30 million times more than combustion. Same idea, new use.
-->

---

# Equilibrium

<div class="columns">
<div class="col">

<div class="key-idea">

**Equilibrium** — the inward force of gravity and the outward force of fusion are **equal** and cancel out.

A star in equilibrium **barely changes size.**

</div>

As long as there is enough hydrogen in the core to keep fusion going, the star stays in equilibrium — and stays a **main sequence** star.

</div>
<div class="col">

<div class="warning">

So when a star **shrinks or expands**, it is because gravity and fusion force are **no longer equal.**

</div>

> Is the star in your diagram at equilibrium? **How do you know?**

</div>
</div>

<!--
TEACHER MOVE: Students predict whether the diagram's star is at equilibrium and justify it.
THIS IS THE CENTRAL IDEA OF THE 5E. Main sequence = equilibrium = stability = the ~9 billion steady years that let life evolve on Earth. Everything in Explore 1 and 2 now has a mechanism.
IMPLEMENTATION TIP: If students met force diagrams in middle school, that may surface. They do NOT need vectors or magnitude — just a shared way to show the relative size of the two forces with arrow length.
BACK TO L1: The L1 model rubric asked for "energy radiating in all directions." The L2 rubric asks for arrows showing fusion force out and gravity in, at roughly equal magnitude. Students are adding a force layer to the same model.
-->

---

# Star Formation by Collapse of Molecular Clouds

<iframe width="912" height="513" src="https://www.youtube.com/embed/YbdwTwB8jtc" title="Star Formation by Collapse of Molecular Clouds" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!--
TEACHER MOVE: Show to support the first stage of the force model. Ask students to note observations, then ask which force is driving what they see.
THE ANSWER: The net movement of matter is INWARD, so gravity dominates. There is no fusion yet — nothing to push back.
TEACHER MOVE: Use student responses to decide how to draw the arrows. Gravity arrow long, fusion arrow short or absent. Then model putting the explanation into words, so the class has one worked example before doing the rest.
-->

---

<!-- _class: lt1 lt3 -->

# Forces Across the Life Cycle

| Stage | Gravity vs. fusion | What happens to size |
|---|---|---|
| **Dust cloud → new star** | gravity **wins** — no fusion yet | collapses inward |
| **Main sequence** | **equal** — equilibrium | stays about the same, for billions of years |
| **Red giant** | fusion force **wins** | expands enormously |
| **White dwarf / neutron star / black hole** | gravity **wins** — fuel is gone | collapses to extreme density |

<div class="key-idea">

Draw the arrows so their **length** shows the relative size of each force at that stage.

</div>

<!--
TEACHER MOVE: Students complete the force diagrams and written explanations for each stage. Each explanation must discuss gravity and/or fusion force AND cite evidence.
LOOK & LISTEN FOR: stars are most stable in the main sequence — that's where temperature, luminosity and size changed slowest • stars spend MOST of their life cycle in the main sequence (~90%) • the most massive stars spend the LEAST time there: 1 M☉ ≈ 8,992.81 million yr, 4 M☉ ≈ 178.91 million yr, 40 M☉ ≈ 4.87 million yr • hydrogen converts to helium faster in more massive stars: 19.5 million yr for 10 M☉, 300 million yr for 3 M☉, 10 billion yr for 1 M☉ • higher-mass stars have higher luminosities because they fuse faster.
WHY THE LAST ROW IS COUNTERINTUITIVE: Students may expect "fuel runs out" to mean the star just goes dark. Gravity doesn't stop when fusion does — with nothing pushing back, it wins completely. That's what makes white dwarfs, neutron stars and black holes the densest objects in the universe.
ACCESS FOR MULTILINGUAL LEARNERS: Explaining through a force diagram lets emerging English language learners demonstrate understanding visually.
-->

---

# Why Mass Drives Everything

<div class="columns">
<div class="col">

**More mass**
↓
**more gravity**
↓
particles pushed together **harder and more often**
↓
**faster rate of fusion**
↓
burns through hydrogen **faster**

</div>
<div class="col">

<div class="key-idea">

That resolves the puzzle from Explore 1.

A 40 M☉ star **does** start with far more fuel — but its gravity makes it burn that fuel so much faster that it runs out **first**.

</div>

<div class="small">More fuel, but a far bigger fire.</div>

</div>
</div>

<!--
TAKE TIME FOR THESE KEY POINTS: Higher-mass stars fuse hydrogen into helium faster • they seem to burn up faster • there are MORE low-mass stars because they use fuel so slowly and live so long • gravity pulls matter inward while fusion energy pushes outward, and a star's stability depends on whether those forces are equal and for how long • we had to study stars at the scale of ONE star (the Sun, L1) AND MANY stars (the supercluster, L2) to have everything we needed. Studying only the Sun would have given us the spectra pattern and fusion, but not the mass-lifespan relationship.
STILL NOT FIGURED OUT (the Elaborate phase handles these): Why do higher- and lower-mass stars fuse at different RATES? How exactly does gravity relate to lifespan?
TEACHER MOVE: Revisit the Engage poster — which ideas can be eliminated, changed, or added based on what we now know?
CLASS CONSENSUS DISCUSSION: Select 2–3 groups deliberately. Have them display their explanatory models while sharing — a discussion with no visual leaves students out.
-->

---

# Off the Main Trend Line

<div class="columns">
<div class="col">

**The hot plate analogy**

To cook a big pot of spaghetti fast, a hot plate can either be **hotter** or **bigger**.

If one hot plate cooks faster, you **cannot tell** whether it was hotter or larger — unless you know one of the two.

</div>
<div class="col">

<div class="key-idea">

Same for stars. Luminosity depends on **temperature** *and* **size**.

So a star can be very luminous by being **very hot** — or by being **enormous**.

</div>

</div>
</div>

<!--
TEACHER MOVE: Extension handout "Why do some stars not fall in the main trend line?" — for students who finish the Explain work early and show mastery. Many students will have noticed the off-band stars and asked about them.
THE REASONING CHAIN: Two stars at the same temperature, one far more luminous → the luminous one must be BIGGER. Two stars at the same luminosity, one cooler → the cooler one must be BIGGER. That's how size gets read off a diagram that never plots size.
WHERE SIZE INCREASES ON THE DIAGRAM: toward the upper right — cool but luminous means enormous. The final handout question asks students to mark this on their own H-R diagram; it's worth doing with the whole class even if you skip the rest.
-->

---

# Betelgeuse and LP 033276

| Star | Temperature | Luminosity | So it must be… |
|---|---|---|---|
| **Betelgeuse** | 3,000 K — **cool** | 9,000 Suns — **very bright** | **enormous** — a supergiant |
| **LP 033276** | 11,100 K — **hot** | 0.0001 Suns — **very dim** | **tiny** — a white dwarf |

<div class="key-idea">

Neither star is breaking the pattern. Both are **off the main sequence** because they are no longer fusing hydrogen in the ordinary way — one has swollen up, the other has collapsed.

</div>

<!--
TEACHER MOVE: These are the two worked examples on the extension handout. Even if you don't assign the whole extension, these two make the point in five minutes.
BETELGEUSE: A red supergiant in Orion — students can find it in the winter sky. It is a strong supernova candidate, which connects straight back to the Engage phenomenon.
WHITE DWARFS: Hot but dim means small. A white dwarf is roughly Earth-sized with a star's worth of mass packed into it — the leftover core after the outer layers are gone. Our Sun ends this way.
CONNECTION: This is also the answer to the Explore 1 hypothesis that brightness differences were "just distance." Luminosity already accounts for distance; the differences are real.
-->

---

# Summary Task

<div class="columns">
<div class="col">

**Patterns**
1. Why was studying our **Sun alone** not enough to identify patterns about which stars are stable and which change fastest?
2. How was studying **many stars** helpful for identifying those patterns?

</div>
<div class="col">

**Stability and change**
3. Why was it important to figure out **why** some stars are more stable than others?
4. Why might figuring out why things **change** and why they **stay the same** matter when investigating any phenomenon?

</div>
</div>

<div class="vocab">

**Plus:** one thing that went well in our discussion · one thing to improve next time · one person who helped me learn, and what you learned from them · one idea I contributed

</div>

<!--
TEACHER MOVE: Individually, as exit ticket or homework.
IMPLEMENTATION TIP: "This summary is really important!" It checks three things student by student: (1) how they're using the three dimensions to make sense of star life cycles; (2) how they and their peers are building knowledge together; (3) how they think the Class Consensus Discussion went.
ASSESSMENT MATRIX: Prompts 1 & 2 are the Patterns evidence for this 5E; prompts 3 & 4 are the Stability and Change evidence.
EXPECTED (1): The Sun is one star at one moment in its life. One data point can't show a relationship between mass and lifespan.
EXPECTED (2): Many stars at different masses and different stages let us see the pattern — and the H-R diagram shows all of them at once.
COLLECT FROM EVERY STUDENT. Use it to decide who needs to circle back before the Elaborate phase.
-->

---

# Updating: What Counts as an Evidence-Based Claim?

- You found information from a book or a reliable source
- The evidence comes from an experiment or investigation you did
- The claim is not just someone's opinion
- Many scientists can agree on that interpretation
- Patterns in data can count as evidence — but you need evidence for the pattern too
- Claims can be revised based on new evidence from a different source
- **Evidence for a claim can come from other scientists' data**
- **Evidence can come from patterns observed in models that are based on data**
- **A model based on evidence — like a diagram showing how something works — can be evidence**

<!--
TEACHER MOVE: Prompt students back to the class consensus list. Say: "Think about the ideas you surfaced about what makes a star more likely to support an Earth-like planet. Those are evidence-based claims. What made them evidence-based?" Surface new ideas and add them to the poster.
THE THREE NEW CRITERIA (bold) matter because of what students just did: they used Hubble data they didn't collect, patterns from a computational model, and their own explanatory models. None of that fit the earlier version of the list.
CONTINUITY: This poster started in L1 Explain with five criteria and gained two in L1 Elaborate. It now has nine. Keep developing it through L3.
-->

---

<!-- _class: phase-title -->

# ELABORATE
## Why does more mass mean faster fusion?

<!--
PHASE GOAL: Students collect data from a computational model of nucleosynthesis (the Fe-26 game) to find patterns relating a star's mass to the elements it can produce — and to explain why higher-mass stars change and die faster.
GROUPING: Pairs, then triads. ROUTINES: Think-Talk-Open Exchange (first use in the unit), Domino Discover.
TIMING: ~1 class period.
MATERIALS: Why do more massive stars change and die faster? • How are elements heavier than iron produced? • Iron [26] game • Hawking video • timers.
LAUNCH: Remind students that they have a CLAIM (massive stars change and die faster because fusion is faster) and EVIDENCE (rate of hydrogen fusion in stars of different masses) — but not yet the scientific REASONING that completes the explanation.
-->

---

# The Fe-26 Game

<div class="columns">
<div class="col">

<div class="panel">

🔗 **Iron [26]**

`dimit.me/Fe26/`

Arrow keys slide the tiles. Combining two element tiles raises your score.

</div>

- Tiles **fuse** into heavier elements
- Score = **energy points** — the mass that got converted to energy
- **Game Over** = your star has died
- The goal is one tile of **⁵⁶Fe**

</div>
<div class="col">

> **How could we investigate why fusion is faster in massive stars?**

<div class="key-idea">

We need a **model** — the same move we made with Star in a Box when we couldn't watch a star change.

</div>

</div>
</div>

<!--
TEACHER MOVE: Ask how we should investigate the rate question. Listen for "a model of fusion would help." If no one gets there, prompt them to recall how they made unobservable processes observable earlier in this investigation — Star in a Box.
TEACHER MOVE: Pairs read the intro text, play for 5 minutes, and brainstorm how to use the game to model fusion in a high- vs. low-mass star.
SEP #2: Third computational/mathematical model of the unit — Star in a Box (computational), H-R diagram (mathematical), Fe-26 (computational). Worth naming.
-->

---

# Modeling Gravity With Tap Speed

<div class="columns">
<div class="col">

**The class needs to agree on how to model this.**

1. What role does **gravity** play in fusion?
2. How is that different in a **low-mass** vs. **high-mass** star?
3. How can we show that difference **in the game**?

</div>
<div class="col">

<div class="key-idea">

Gravity pulls elements together. **More gravity → faster fusion.**

So in the game: **tap the keys faster** to model a high-mass star.

And because gravity pulls **randomly**, not strategically — tap **without looking**.

</div>

</div>
</div>

<!--
TEACHER MOVE: Facilitate agreement before anyone collects data. The protocol has to be the same across pairs or the results aren't comparable.
LOOK & LISTEN FOR: gravity pulls hydrogen together, which leads to fusion • gravity is stronger in high-mass stars because gravity depends on mass • since tapping keys pulls tiles together and gravity is stronger in a high-mass star, we should tap faster.
THE RANDOMNESS STEP: Ask whether gravity pulls hydrogen atoms together strategically or randomly. Students say randomly. Then ask how to represent that — pressing keys randomly, without looking. This matters: playing the game WELL would model something gravity doesn't do.
PROTOCOL: 90-second rounds. One partner is timekeeper and recorder, the other plays. Switch roles between the low-mass and high-mass runs.
-->

---

# What the Model Shows

<div class="columns">
<div class="col">

**Low-mass star** *(slow, random taps)*
- Fewer energy points
- Lighter elements only
- Lasts longer

</div>
<div class="col">

**High-mass star** *(fast, random taps)*
- Many more energy points
- **Heavier** elements formed
- Game over **sooner**

</div>
</div>

<div class="key-idea">

More gravity → faster fusion → **more energy released per second** (higher luminosity) **and** fuel gone sooner. The heaviest element a star can build goes **up** with its mass — all the way to **iron**.

</div>

<!--
TEACHER MOVE: Confer as pairs work through the data pages.
CONFERRING: "Which stars produce the heaviest elements?" • "Why do you think high-mass stars can produce heavier ones?" • "Which produces more energy points, and why?" • "Which had shorter lifespans?" • "What role is gravity playing?"
A COMPLETE MECHANISTIC EXPLANATION needs: how gravity leads to fusion • how the RATE in a high-mass star compares to a low-mass star • why a high-mass star has a far shorter lifespan despite starting with much more fuel.
HS-ESS1-3 / ESS1.A(4): Nuclear fusion in stars produces all nuclei lighter than and including IRON. That's the ceiling, and the game is built around it.
ASSESSMENT BOUNDARY: Details of the many nucleosynthesis pathways are NOT assessed. The mass → heavier elements relationship is what matters.
-->

---

# Atoms Are Not Conserved. Nucleons Are.

| Fusion reaction | Before | p + n before | After | p + n after |
|---|---|---|---|---|
| Hydrogen | hydrogen-1 + hydrogen-2 | **3** | helium-3 | **3** |
| Helium | helium-3 + helium-4 | **7** | beryllium-7 | **7** |
| Beryllium + helium | beryllium-8 + helium-4 | **12** | carbon-12 | **12** |
| Carbon + helium | carbon-12 + helium-4 | **16** | oxygen-16 | **16** |

<div class="key-idea">

The **types of atoms change** — hydrogen becomes helium, carbon becomes oxygen. But the **total protons + neutrons** is the same on both sides, every time.

</div>

<!--
TEACHER MOVE: Students examine the table and answer: were the types of atoms conserved? Was mass (protons + neutrons) conserved? Both need evidence cited from the table.
CCC #5 — Energy and Matter: "In nuclear processes, atoms are not conserved, but the total number of protons plus neutrons is conserved." This table IS that element.
CONTINUITY WITH L1: The L1 "Two Kinds of Reactions" slide already said this — chemical reactions conserve atoms, nuclear reactions conserve nucleons. Here students verify it against data instead of being told.
WORTH SAYING: Every carbon and oxygen atom in a student's body was assembled inside a star this way. The elements in the fourth row are the ones they're made of.
-->

---

# Nucleosynthesis in a Massive Star

<div style="text-align:center">
<img src="esrt-nucleosynthesis.png" style="max-height:470px; max-width:100%; background:#fff; padding:6px; border-radius:6px">
</div>

<div class="small" style="text-align:center">NYS Earth &amp; Space Sciences Reference Tables, 2026 Rev. Edition</div>

<!--
TEACHER MOVE: Show after the Fe-26 game. This is what students were modelling, drawn properly — and it is in their reference tables.
READING IT: A massive star fuses in SHELLS, heaviest at the centre. Hydrogen fusing to helium in the outer shell, down through He→C, C→O, O→Si, and Si→Fe, with an iron core that cannot fuse further.
THE DURATION COLUMN IS THE POINT: 7×10⁶ years for H→He, 7×10⁵ for He→C, 600 years for C→O, 6 MONTHS for O→Si, ONE DAY for Si→Fe, and a QUARTER SECOND for core collapse. Each stage is dramatically shorter than the one before.
ASK: "What is happening to the time as you read down the column?" Then: "What do you think happens right after that quarter second?" — the supernova.
WHY IT ACCELERATES: Fusing heavier elements releases less energy per reaction, so the star must burn through them faster and faster to hold itself up against gravity. (Beyond the assessment boundary — offer only if asked.)
CONNECTION: Fe at the centre is the iron ceiling. The next slide is where everything heavier comes from.
-->

---

# Beyond Iron

<div class="columns">
<div class="col">

The Fe-26 game stops at **iron**. No star's core can fuse past it — making anything heavier takes **more energy than gravity can supply.**

> So where do copper, silver, and gold come from?

</div>
<div class="col">

<div class="key-idea">

A **supernova** releases more energy in seconds than a star produces in its entire life. That is enough to fuse the elements **heavier than iron.**

</div>

<div class="small">The gold in a ring was made in an exploding star.</div>

</div>
</div>

<!--
TEACHER MOVE: Pairs complete "How are elements heavier than iron produced?" Then Domino Discover to surface thinking across the room. The class should arrive at: a supernova explosion generates more energy than any star can, allowing fusion of the heaviest elements.
ESS1.A(4) — this is the second half of the DCI: "Other than the hydrogen and helium formed at the time of the big bang, nuclear fusion within stars produces all atomic nuclei lighter than and including iron, and the process releases electromagnetic energy. Heavier elements are produced when certain massive stars achieve a supernova stage and explode."
THE PHENOMENON CLOSES HERE: Students opened this 5E watching Supernova 1054 and asking what caused it. They now have the answer AND a reason it matters — that explosion is where most of the periodic table came from.
STUDENTS CITE: evidence from the Supernova 1054 video and text.
-->

---

# Stephen Hawking — Supernovas

<iframe width="912" height="513" src="https://www.youtube.com/embed/tXV9mtY1AoI" title="Stephen Hawking - Supernovas" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!--
TEACHER MOVE: Show to bring closure to the investigative phenomenon for this 5E.
TIMING NOTE: Show this AFTER the heavier-than-iron conclusion, not before — students should reach it themselves first.
-->

---

<!-- _class: lt3 -->

# Patterns at Three Scales

| Scale | What we studied | What the pattern told us |
|---|---|---|
| **One star** (solar system) | the Sun's spectra — L1 | what stars are made of; that fusion is the energy source |
| **Many stars** (supercluster) | Star in a Box, H-R diagram | mass controls lifespan and stability |
| **Atomic** | Fe-26 nucleosynthesis | *why* mass controls the rate — and what elements a star can build |

> **Could we have explained how and why stars change — and why the most massive change fastest — without studying all three scales?**

<!--
TEACHER MOVE: Assess CCC #1 independently. Every student responds in writing to: (1) Why was it important to study stars at the scale of the supercluster, of one star, AND at the atomic level in order to explain star stability and change? (2) Could we have explained it without all three?
CCC1(1) — "Different patterns may be observed at each of the scales at which a system is studied and can provide evidence for causality in explanations of phenomena." This slide IS that element, and this prompt is how it gets assessed.
EXPECTED: No. One star gave composition and mechanism but no comparison. Many stars gave the mass-lifespan relationship but not the cause. The atomic scale gave the cause. Each scale answered something the others could not.
THIS IS THE INTELLECTUAL PAYOFF of the whole unit so far — worth taking the time.
-->

---

<!-- _class: phase-title -->

# EVALUATE
## Which star could support an Earth-like planet?

<!--
PHASE GOAL: Students critique and revise their habitability models using evidence about star stability, then argue which star in the performance task data set is most likely to support an Earth-like planet.
GROUPING: Small groups of 3–4 (same groups as the Unit Launch). ROUTINE: Idea Carousel.
TIMING: ~1 class period.
MATERIALS: Groups' revised model posters, chart paper, sticky notes, PTO Star Life Cycles section, Star Life Cycles Model Rubric, Star Life Cycles Argument Rubric, DQB.
LAUNCH QUESTIONS (independently): What do we need to know about other stars to determine if they are as stable as our Sun? What factors contribute to a planet's stability for supporting life?
-->

---

<!-- _class: lt2 -->

# Revise Your Model: Idea Carousel

**Update your model to show why *our Sun* has been able to support a planet where life could evolve.**

| Symbol | Meaning |
|---|---|
| ✔ | An idea that **resonates** |
| **+** | An idea that should be **added** |
| **?** | An idea you don't think is **relevant** |
| **Δ** | A suggestion to **clarify** or represent an idea more clearly |

<!--
TEACHER MOVE: Groups update their models on new chart paper, then annotate each other's with sticky notes using the four symbols. Then they revise using the feedback.
LOOK & LISTEN FOR: our Sun has provided the right energy for liquid water for billions of years • life has been sustained over that time • stable energy made Earth survivable • FUSION FORCE AND GRAVITY IN THE SUN ARE IN EQUILIBRIUM, SO IT IS STABLE • the Sun has been stable so long BECAUSE IT IS A RELATIVELY SMALL STAR, so it changes more slowly than more massive stars.
WHAT'S NEW SINCE L1: The last two bullets. Students are adding the force balance and the mass argument to a model that previously only had fusion and radiation.
ROUTINE: Third use of Idea Carousel in the unit — students should be getting efficient with it. If not, revisit the symbols.
-->

---

# What a Strong Star Life Cycles Model Includes

<div class="columns">
<div class="col">

☀️ **Forces**
- Arrows for **fusion force** pushing outward from the core
- Arrows for **gravity** pulling inward
- The two arrows at **roughly equal length** — equilibrium

📊 **Evidence cited**
- The Sun's **luminosity and temperature** → it's a stable main sequence star
- The Sun's **relatively low mass** → slower fusion rate → stable for a long time

</div>
<div class="col">

🌍 **Connection to Earth**
- Stable properties → liquid water persisted **long enough for life to evolve**

🔍 **Patterns**
- Why we needed **three scales** — solar system, supercluster, atomic

**Labels, keys, or captions** so the model speaks for itself

</div>
</div>

<!--
TEACHER MOVE: Students refine their models independently in the PTO Star Life Cycles section. Show this as a checklist after a first draft.
RUBRIC (Proficient): arrows for fusion force outward from the core where fusion happens • arrows for gravity inward • arrows at close to the same magnitude • components speak for themselves OR there are legends/keys/captions • luminosity and temperature cited as evidence of stable main-sequence status • low mass cited as the reason for the slower fusion rate • connection made to liquid water lasting long enough for life • three-scales explanation for Patterns.
RUBRIC USES: self-assessment, then partner review of the self-assessment's accuracy; class critique of a fictional composite; teacher scoring against self-scores. Then revise.
NOTE: There are TWO rubrics in this 5E — a Model rubric and an Argument rubric. The argument one is used on the next slide.
-->

---

<!-- _class: lefttable -->

# The Performance Task Star Data Set

| Star | Type | Verdict |
|---|---|---|
| **Eta Carinae** | Blue giant — extremely hot, very high mass | ❌ short lifespan; extremely unlikely |
| **Gliese 440** | White dwarf | ❌ extremely low luminosity |
| **Kepler-432** | Red giant | ❌ temperature changing fast; will engulf its planets |
| **Trappist-1, Kepler-442, Kepler-18, Kepler-79, TOI-2257, Kepler-186, HD 20782** | **Main sequence**, mass ≤ our Sun | ✅ life spans of 10 billion yr or more; stable for 9 billion+ |

<!--
TEACHER MOVE: Students argue which star is most likely to host an Earth-like planet, using the Star Life Cycles Argument Rubric.
ARGUMENT RUBRIC (Proficient): a claim naming a star • evidence including temperature, luminosity, and placement on the H-R diagram • reasoning connecting that evidence to mass, stability and life span, and connecting stability to the capacity to host an Earth-like planet • patterns from all three scales cited.
REVEAL PROGRESSIVELY: Do not show the verdict column until students have argued it themselves. The whole point is that they can now rule out Eta Carinae, Gliese 440 and Kepler-432 from observable properties alone.
NOTE: This narrows the field but does not finish the performance task — L3 adds orbit and distance, which decide whether any planet is actually in the habitable zone.
-->

---

# Back to the Driving Question Board

**What have we figured out?**
- ✅ Star **mass** controls life span and stability — more mass, shorter and less stable life
- ✅ **Gravity vs. fusion force** is the mechanism; equilibrium = the main sequence
- ✅ **Color, temperature, and luminosity** are observable and reveal mass
- ✅ Fusion builds elements up to **iron**; **supernovae** make everything heavier

**New questions:**
- How **far** do the planets orbit from these stars?
- What is the **temperature** on those planets? Do they have **liquid water**?
- Do they have an **atmosphere**? Are they **terrestrial** or **jovian**?

<!--
TEACHER MOVE: Pairs identify what they've figured out and what still needs investigating, then generate at least one new question about finding an Earth-like planet. Domino Discover to hear different pairs.
TRANSITION SCRIPT: "I'm noticing a lot of questions related to planet characteristics and whether they have liquid water, so tomorrow I will have some resources available for the class to investigate these questions." (Next 5E: Planets and Orbits, HS-ESS1-4.)
SOURCE NOTE: The L2 bundle's Evaluate launch carries an implementation tip copied from L1 — it says these questions "create a need to know around what's going to happen to our Sun in the future." That was L1's transition. L2 hands off to planets and orbits, which is what the anticipated questions above actually point at. The bundle also repeats its "Return to the Performance Task" section twice, near-identically.
-->

---

<!-- _class: lefttable compact -->

# Vocabulary Reference (1 of 2)

| Term | Definition |
|---|---|
| **Luminosity** | The rate at which a star releases energy (energy per second), compared to the Sun |
| **Main sequence** | The long, stable stage where a star fuses hydrogen in its core and gravity balances fusion force |
| **Equilibrium** | A state where the inward force of gravity and the outward fusion force are equal |
| **H-R diagram** | A graph of luminosity vs. surface temperature; temperature runs **backwards** (hot on the left) |
| **Red giant** | A late stage where fusion force exceeds gravity and the star expands enormously |
| **White dwarf** | The small, dense, dim remnant left when a low-mass star's fuel is gone |
| **Neutron star** | The extremely dense remnant left after a high-mass star's supernova |
| **Supernova** | The explosion of a massive star — briefly releasing more energy than the star made in its whole life |

<!--
TEACHER MOVE: Reference slide. Per the plan's Access for All note, vocabulary is learned in context — use this for review, not as a list to memorize up front.
-->

---

<!-- _class: lefttable -->

# Vocabulary Reference (2 of 2)

| Term | Definition |
|---|---|
| **Solar mass (M☉)** | The mass of our Sun, used as the unit for measuring other stars |
| **Nucleosynthesis** | The formation of new atomic nuclei by fusion inside stars |
| **Fusion force** | The outward push produced by energy released from fusion in the core |
| **Stability** | Properties (size, temperature, luminosity) changing very little over a long time |
| **Supergiant** | A very large, very luminous star — bright despite a low surface temperature |
| **Computational model** | A model built from real data that simulates a process we cannot observe directly |
| **Scale** | The size, amount, or time span at which something is studied — different scales reveal different patterns |

<div class="key-idea">

**The four statements to know:** mass controls life span · equilibrium between gravity and fusion is what stability *is* · observable properties reveal mass · fusion makes elements up to iron, supernovae make the rest

</div>

<!--
TEACHER MOVE: Reference slide.
UP NEXT (L3 Planets and Orbits, HS-ESS1-4): gravity keeps objects in orbit; the relationship between orbital distance and period; eccentricity; why Earth's near-circular orbit keeps temperature stable; the habitable zone.
-->
