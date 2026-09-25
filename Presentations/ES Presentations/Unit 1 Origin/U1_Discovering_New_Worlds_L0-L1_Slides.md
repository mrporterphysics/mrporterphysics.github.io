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

# 🌍 Unit 1: Discovering New Worlds
## Earth & Space Science — Lesson 0: Unit Opening & Lesson 1: How the Sun Works
### What has made Earth able to sustain life? Is there an exoplanet Earth-like enough to sustain life?

<!--
UNIT OVERVIEW: Students investigate what has made Earth the only planet in our solar system that can sustain life, revising a model after every lesson in the Performance Task Organizer (PTO). The unit ends with an evidence-based argument about which exoplanet is most likely habitable.

PERFORMANCE EXPECTATIONS: HS-ESS1-1 (Sun's life span, fusion in the core → radiation), HS-ESS1-3 (stars produce elements over their life cycle), HS-ESS1-4 (orbital motion). L1 focuses on HS-ESS1-1.

CCC FOCUS: #1 Patterns (empirical evidence is needed to identify patterns); #3 Scale, Proportion, and Quantity.
SEP FOCUS: #1 Asking Questions (Opening), #2 Developing & Using Models, #6 Constructing Explanations.

TIMING: Unit Opening = 2 days. How the Sun Works 5E = 6 days.

DECK NOTE: This deck uses inline HTML (spectrum bars, callouts). Enable HTML in Marp (VS Code: markdown.marp.enableHtml; CLI: --html).
-->

---

<!-- _class: lt3 -->

# 🗺️ Unit Roadmap

| | Lesson | What we figure out | PE |
|---|---|---|---|
| **L0** | Unit Opening | What makes Earth the only planet here that has sustained life? | — |
| **L1** | ☀️ How the Sun Works | How has the Sun given Earth the *right* energy for so long? | HS-ESS1-1 |
| **L2** | ✨ Star Life Cycles | Does the exoplanet have a star like our Sun? | HS-ESS1-1, -3 |
| **L3** | 🪐 Planets and Orbits | Is the exoplanet the right distance from its star? | HS-ESS1-4 |
| **L4** | 🏁 Unit Closing | **Which exoplanet is most Earth-like?** | all three |

<div class="key-idea">

Every lesson ends the same way: **revise your model in the PTO.** Those models become the **criteria** you use to choose an exoplanet in L4.

</div>

<!--
TEACHER MOVE: Show once at the launch and return to it at each lesson transition. Students should be able to say where they are in the storyline at any point.
WHY THIS SLIDE: Unit coherence is the central design claim of the unit plan — "there should be a clear and explicit unit storyline that guides the sequence of activities" from the students' perspective. This deck covers L0 and L1 only.
TIMING: Whole unit = 23–29 days. L0 = 2 days, L1 = 6, L2 = 7, L3 = 7–9, L4 = 1–5.
NOTE: The abstracted science question for the unit is "How do stars affect the planets that orbit them?" — do NOT lead with it. The student-facing anchor question is the one that drives engagement.
-->

---

<!-- _class: phase-title -->

# UNIT OPENING
## What is it about Earth that makes it the only planet in our solar system that has sustained life?

<!--
PHASE GOAL: Surface student ideas about life in the solar system, build an initial model of what makes Earth habitable, tell the story of what is happening to Earth now, brainstorm solutions, launch the performance task, and build the Driving Question Board.
GROUPING: Pairs, then groups of four (keep these groups — they return in L1 Evaluate).
ROUTINE: Domino Discover.
TIMING: 2 days. Suggested Day 1: Surfacing ideas → timeline → initial model. Day 2: Tell the Story → solutions → performance task → DQB.
MATERIALS: PTO (Life in the Solar System Timeline, Initial Model, Tell the Story, Introducing the Performance Task), Planet Earth II trailer, The Hidden Impacts of Climate Change video, How Many Planets are in the Milky Way? video, poster paper, sticky notes, chart paper, DQB Cards (scaffold).
-->

---

# Life on Earth

> **Watch:** As you watch the trailer, identify or describe **2–3 species** and the **environment** each one lives in.

<div class="columns">
<div class="col">

**Example**
- A spotted cat → cold, rocky mountains
- Lizards and snakes → rocky island shore
- Pink wading birds → shallow salty lake

</div>
<div class="col">

<div class="key-idea">

Earth is full of life — in almost every environment, from ice to desert to deep ocean.

**Is there life anywhere else in our solar system?**

</div>

</div>
</div>

<!--
TEACHER MOVE: Show the Planet Earth II trailer. Students note species + environments.
ACCESS FOR ALL: Emphasize that students only need to DESCRIBE a species — names are not required.
DISCUSSION: Have several students share. Highlight the abundance and variety of species, then pose: "Is there life elsewhere in the solar system?"
TIMING: ~10 min.
TRANSITION: Distribute the Life in the Solar System Timeline (PTO p. 2) — pairs.
-->

---


# Life on Earth

<iframe width="912" height="513" src="https://www.youtube.com/embed/c8aFcHFu8QM?si=_LyU0aJnbYcyQ1e0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


---

<!-- _class: lt2 -->

# Life in the Solar System Timeline

| mya (millions of years ago) | Event | Evidence |
|---|---|---|
| **4,600** | Sun and all planets form | strong |
| **4,200** | Global liquid ocean under the ice of **Europa** (Jupiter's moon) | ⚠️ weak (dotted box) |
| **3,900** | Outgassing of H₂O, CO₂, N₂ — trapped by gravity → atmosphere | strong |
| **3,800** | **Earth's** first oceans form from precipitation | strong |
| **3,500** | First bacteria / single-celled life on **Earth** | strong |
| **3,000** | Water in a streambed on **Mars**; some chemical building blocks of life | strong |
| **1,000** | First multicellular life on **Earth** | strong |
| **2** | Earliest humans on **Earth** | strong |

<!--
TEACHER MOVE: Pairs respond to PTO questions 1–5; a few pairs share out for each.
EXPECTED STUDENT RESPONSES:
Q1: mya = millions of years ago (4,600 mya = 4.6 billion years ago).
Q2: Dotted box = weak evidence (Europa ocean); solid = strong evidence.
Q3: 4,600 − 3,500 = 1,100 million years ≈ 1.1 billion years.
Q4: water, atmosphere, gravity, precipitation, chemical building blocks, the Sun.
Q5: Several places had water, but only Earth has evidence of life; life took a long time.
COMMON MISCONCEPTION: Reading "4,600 mya" as 4,600 years. Have students convert one value to billions.
CONNECTION: The dotted/solid distinction is an early seed for "What counts as an evidence-based claim?" in L1 Explain.
TIMING: ~15 min.
-->

---

# What Does the Timeline Tell Us?

<div class="columns">
<div class="col">

- Life appeared on Earth about **1.1 billion years** after Earth formed
- Life appeared **~300 million years** after the oceans
- Complex (multicellular) life took **~3.6 billion years**
- Humans: only the last **2 million years**

</div>
<div class="col">

<div class="key-idea">

Earth, Mars, and (maybe) Europa have all had liquid water — but **only Earth has evidence of life.**

Water alone isn't enough. Earth has had the right conditions for a **very long time.**

</div>

</div>
</div>

<!--
TEACHER MOVE: Summarize the share-out on this slide.
LOOK & LISTEN FOR (from plan): "It took over a billion years for the first life to appear on Earth and even longer for more complex life" • "The first life did not appear until several hundred million years after the formation of oceans and an atmosphere" • "There is no evidence for life anywhere else in the solar system, only evidence of water."
KEY POINT: Time scale matters — this will return in L1 Evaluate (Sun's stable energy for billions of years).
TRANSITION SCRIPT: "Out of all the planets in the solar system, Earth has life! Earth didn't have life for a long time and now it does. So what is it about Earth that makes it the only planet in our solar system that has sustained life?"
-->

---

# ⚓ Anchor Phenomenon

> **Out of all the planets in the solar system, Earth has life! Earth didn't have life for a long time, and now it does.**

## What is it about Earth that makes it the only planet in our solar system that has sustained life?

<div class="vocab">

**Habitable** — a place that is suitable for life

</div>

<!--
TEACHER MOVE: Read the anchor phenomenon aloud and introduce "habitable."
EXPECTED STUDENT RESPONSES: water, right temperature, distance from the Sun, atmosphere/oxygen, gravity, the Sun's light for plants.
TRANSITION: Hand out the Initial Model page (PTO p. 5).
-->

---

# Initial Model: What Makes Earth Habitable?

<div class="columns">
<div class="col">

**Your model (Earth–Sun System template):**
- Draw the **components** (Sun, Earth, …)
- Use **arrows** to show processes and energy
- **Label** everything
- Show **cause → effect**

Then describe your model in words.

</div>
<div class="col">

**Components you might consider**
- ☀️ The Sun — light and heat
- 📏 Earth's distance from the Sun
- 💧 Liquid water
- 🌫️ Atmosphere
- 🧲 Gravity
- ⏳ Time

</div>
</div>

<!--
TEACHER MOVE: Students complete individually or in pairs, then groups of four build a shared model on poster paper. SAVE THE POSTERS — revised in L1 Evaluate (Idea Carousel).
CONFERRING QUESTIONS: "Are there arrows or labels you want to add?" • "What process do you think this shows?" • "Are there parts that need terms or descriptions?" • "Are there important cause-and-effect relationships you want to make clear?" • "Why did you include this component?" • "Are there other components that might be important?"
IMPLEMENTATION TIP: The Earth-Sun template steers students to the solar-system scale used all unit. Don't provide it again unless a group is stuck.
FORMATIVE ASSESSMENT: Note whether students treat the Sun as a passive light bulb — most won't explain HOW the Sun makes energy. That gap drives L1.
NOTE: The component list on the right is optional — reveal only if groups stall; initial models should reflect student thinking.
TIMING: ~25 min.
-->

---

# Earth Under Stress

<div class="columns">
<div class="col">

Earth has been an ideal place for humans and other living things for about **12,000 years.**

**Now:**
- Rising global temperatures
- Sea levels rising; more floods and droughts
- Groups of people forced to leave their homes
- A rapid worldwide decline in species

</div>
<div class="col">

<div class="warning">

Many scientists call the current decline in species the **Sixth Mass Extinction.**

</div>

Earth is becoming less and less welcoming because of human impact — and our population keeps growing.

</div>
</div>

> **As you watch and read:** What details tell the story of what is *starting* to happen to planet Earth?

<!--
TRANSITION SCRIPT (from the plan): "While Earth has been habitable for a long time now, scientists are concerned about the stresses Earth has been experiencing in recent decades and what it means in terms of its capacity to sustain life as we know it in the future."
TEACHER MOVE: Frame the video and the three texts as one task — the class is collaboratively telling the story of what is happening to Earth.
WATCH FOR: Students jumping to causes or solutions. Redirect to the phenomenon: what is happening, not why or what to do.
TIMING: ~3 min, then straight into the video.
-->

---

# Hidden Impacts of Climate Change

<iframe width="912" height="513" src="https://www.youtube.com/embed/u6GRYrv2e3M?si=LRaUEON4VCd8ms8k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

<!-- _class: compact -->

# Telling the Story: What Is Happening to Earth?

<div class="columns">
<div class="col">

**Text #1 — Temperature & CO₂**
- Global temperature ≈ **1 °C above** the 1951–1980 average
- CO₂ never rose above ~**300 ppm** for hundreds of thousands of years — now **over 400 ppm**

**Text #2 — Extinction risk**

| Group | Threatened |
|---|---|
| Amphibians | 41% |
| Sharks & rays | 37% |
| Reef corals | 33% |
| Mammals | 26% |
| Birds | 14% |

</div>
<div class="col">

**Text #3 — New York's future**
- Up to **10 °F warmer** by the 2080s
- Up to **15% more precipitation**
- Up to **6 ft of sea-level rise** by 2100
- More mosquitoes & ticks → West Nile, Lyme disease
- More pollen & ozone → asthma, allergies

</div>
</div>

<!--
TEACHER MOVE: Show The Hidden Impacts of Climate Change (prompt: What details tell the story of what is starting to happen to planet Earth?). Students silently read Texts #1–3 once, then reread and circle three important details. Remind students to focus on the phenomenon, not their hypotheses.
CONFERRING QUESTIONS: "What is happening to planet Earth?" • "Why is this detail important?" • "Did your group circle the same details?" • "How did your group agree on the overall story?"
DIFFERENTIATION: Break it into steps — read with no writing, then reread and annotate on sticky notes.
TIMING: ~25 min.
-->



---

# The Overall Story

<div class="key-idea">

**Earth is becoming less habitable.** Rising CO₂ is warming the planet → sea level rises, precipitation changes, disease-carrying insects spread, and a large share of species are at risk of extinction.

</div>

> **The question:** What can humans do to survive as a species if we are **not** successful in stopping the negative changes to planet Earth?

<!--
TEACHER MOVE: Groups agree on their five most important details and one overall story; take a few shares.
EXPECTED RESPONSE (sample student work): "Earth is basically becoming a place that is less habitable… carbon dioxide increase is causing global warming, which is causing sea level to rise, species to go extinct, and insects and disease carriers… might be more common in New York."
WATCH FOR: Details not in the texts (e.g., population) — accept, but ask for the source.
TRANSITION: Independent brainstorm of solutions (two guiding prompts on the slide).
-->

---

# Brainstorm: Possible Solutions

<div class="columns">
<div class="col">

1. **Individually:** What can we do to ensure the survival of humans and other species?
2. **Group of 4:** Share, then choose **two** ideas to share with the class
3. **Domino Discover:** each group shares; we chart ideas

</div>
<div class="col">

**Ideas scientists are exploring**
- Cut fossil-fuel use; renewable energy
- Protect habitats; capture carbon
- Adapt: sea walls, new crops
- 🚀 **Find another Earth-like planet** — just in case

</div>
</div>

<!--
TEACHER MOVE: Guiding prompts: (1) What are your initial ideas for what we can do to ensure the survival of humans and other species? (2) What if humans and many species can no longer live on Earth — what can humans do to survive as a species?
ROUTINE — Domino Discover: groups share in turn; chart ideas; listen to gauge readiness to move on.
KEY POINT: If "find another planet" doesn't come up, introduce it as a solution scientists are exploring. It becomes the performance task.
NOTE: Reveal the right column only after the class share. Worth saying: exoplanet research doesn't replace protecting Earth.
TIMING: ~15 min.
-->

---

# Routine: Domino Discover

<div class="columns">
<div class="col">

<div class="steps">

1. Each group decides which **two ideas** to share
2. One group shares — the teacher **charts** it
3. The next group **adds on** without repeating what's already up
4. Keep going around the room, **domino style**
5. Anyone may add a question or a connection

</div>

</div>
<div class="col">

<div class="key-idea">

**Why we do this:** everyone's thinking becomes visible to the whole class — and it tells us as a class whether we're ready to move on.

</div>

*You'll see this routine again in the Sun investigation and at the Driving Question Board.*

</div>
</div>

<!--
ROUTINE — Domino Discover: first use in the unit (unless you used it at the Anchor Phenomenon launch). It surfaces students' thinking to the whole class AND to the teacher, lets students learn from each other, and lets you assess readiness to move to the next phase. See the Unit 1 Teacher Guide.
WHY A SLIDE: Domino Discover is used three times across L0–L1 (Brainstorm Solutions, Explore summary, DQB revisit), but unlike Rumors, Class Consensus Discussion, and Idea Carousel it previously had no student-facing steps. Post it.
TEACHER MOVE: Chart as they go. Resist summarizing for them.
-->

---

# Performance Task

<div class="warning">

**A rise in global average temperatures is making Earth less and less habitable!**

</div>

- Investigate **what has made Earth the only planet in our solar system that can sustain life**
- After each investigation, **revise your model** (PTO)
- Use your model to analyze data from **stars and planets in other solar systems**
- Write an **argument from evidence**: which **exoplanet** is most likely to be habitable?

<div class="vocab">

**Exoplanet** — a planet that orbits a star other than our Sun

</div>

<!--
TEACHER MOVE: Students read "Introducing the Performance Task" and ask clarifying questions. Show the first 2:50 of "How Many Planets are in the Milky Way?"
KEY POINT: There are a tremendous number of planets to investigate, so we need CRITERIA for what makes a planet Earth-like. Our initial models are the start of those criteria.
CONNECTION: Stars (L1 How the Sun Works, L2 Star Life Cycles) and planets/orbits (L3) feed the final argument.
TIMING: ~15 min.
-->

---

# How Many Planets:

<iframe width="912" height="513" src="https://www.youtube.com/embed/d9x9RRc0RoU?si=SgzljJFWrj385sxr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

# Driving Question Board

> **What do we need to investigate about other stars (suns) and planets to find an Earth-like planet where humans and other species might be able to live?**

1. Think about your initial model
2. Write **one question per sticky note**
3. In groups: **sort** questions into categories
4. Write an **umbrella question** for each category

<!--
TEACHER MOVE: Students independently write questions; small groups categorize onto chart paper (can be whole-class).
CONFERRING POINTS: "Why do these questions belong together?" • "What category connects these?" • "Can you write an umbrella question?" • "Now that you see them grouped, do new questions come up?"
DIFFERENTIATION: Provide DQB Cards (scaffolded question set) to groups that struggle — but still ask for some of their own questions.
SEP #1: Ask questions that arise from careful observation of phenomena.
TIMING: ~25 min.
-->

---

<!-- _class: lt2 -->

# Example DQB Categories

| Category | Example questions |
|---|---|
| ☀️ **The star** | Does the planet have a sun like ours? How far is it from its star? How long will the star last? |
| 💧 **Water & temperature** | Is there liquid water? What is the temperature like? |
| 🌫️ **Atmosphere & weather** | Is there an atmosphere? What is the weather like? Seasons? |
| 🪨 **Planet features** | What is gravity like? Is it rocky or gas? Does it have a moon? |
| 🪐 **Motion & orbit** | How fast does it move? Does it have day and night? |
| ⏳ **Time & stability** | How long has it existed? Are conditions stable? |

<!--
TEACHER MOVE: Use to support categorizing only if needed — student-generated categories come first.
CONNECTION: The "star" category launches L1 (How the Sun Works). Planet features/orbits → L3. Keep the DQB posted; it is revisited at the end of L1 Evaluate.
-->

---

<!-- _class: title-slide -->

# ☀️ How the Sun Works
## Lesson 1 — 5E Instructional Sequence
### How has the Sun provided Earth with the "right" amount of energy for such a long time?

<!--
LESSON OVERVIEW (6 days): Students investigate their DQB Sun questions ("Does the exoplanet have a Sun like ours?"). They use light spectra to determine the Sun's composition (H and He), then use the scale of energy and time to argue that nuclear fusion — not chemical combustion — releases the Sun's energy. They revise their habitability models and predict the Sun's future.
PE: HS-ESS1-1. DCIs: ESS1.A, PS3.D, PS4.B. CCC #1 Patterns, CCC #3 Scale. SEP #2, SEP #6.
SUGGESTED PACING: Day 1 Engage • Days 2–3 Explore • Days 3–4 Explain • Day 5 Elaborate • Day 6 Evaluate.
-->

---

<!-- _class: phase-title -->

# ENGAGE
## How does the Sun provide energy?

<!--
PHASE GOAL: Students connect DQB Sun questions to how the Sun provides light and heat, share initial claims about how the Sun releases energy on a huge scale, and recognize a need to investigate the Sun's composition.
GROUPING: Individual → turn-and-talk → whole class.
ROUTINE: Rumors (first use in the unit).
TIMING: ~1 class period.
MATERIALS: How Does the Sun Provide Energy handout, sticky notes, chart paper, NASA footage of the Sun.
-->

---

# What Do We Know About the Sun?

<div class="columns">
<div class="col">

**Jot it down:** Imagine the Sun. What comes to mind?

- Very bright
- Yellow / white
- Huge compared to Earth
- Very hot

</div>
<div class="col">

**Now watch NASA footage of the Sun.** What else do you observe?

<div class="small">The telescope enhances the images, so the colors are not the Sun's actual color.</div>

</div>
</div>

<!--
TEACHER MOVE (launch): Remind students of DQB Sun questions ("Does the exoplanet have a sun like ours?"). Ask why they asked them. Listen for: the Sun gives heat (not too hot/cold) and light for plants (food). Say: "To figure out whether the exoplanet has a sun like ours, we need to understand what our Sun is like."
EXPECTED RESPONSES after video: looks like lava, flames shooting out, explosions, some parts darker, seems to be gas.
NOTE: Reveal the left-column bullets only after students jot their own ideas.
TIMING: ~10 min.
-->

---

# NASA Footage of the Sun

<iframe width="912" height="513" src="https://www.youtube.com/embed/UJTo1Hc8fAk" title="NASA Footage of the Sun" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<div class="small">These images are enhanced by the telescope — the colors are not the Sun's actual color.</div>

<!--
TEACHER MOVE: Show after students jot their own ideas about the Sun. Tell them the telescope enhances the images so we can see more detail of the Sun's appearance and behavior, and that the enhancement makes it appear colors other than its actual color.
EXPECTED RESPONSES: looks like lava • flames shooting out • there are explosions in it • some parts are darker • it seems to have gas in it.
DO NOT CORRECT: "flames" and "explosions" are exactly the ideas the Elaborate phase is designed to test. Record them.
TIMING: ~5 min.
-->

---

# Investigative Phenomenon

> **Our Sun releases about 2.4 × 10³⁹ MeV of energy every second** — far more energy than the entire world uses in a whole day!

| Quantity | Value |
|---|---|
| Sun's energy output | $3.8 \times 10^{26}$ joules **per second** |
| Whole world's energy use | about $1.6 \times 10^{18}$ joules **per day** |

<div class="key-idea">

One second of the Sun's output ≈ **hundreds of thousands of years** of human energy use.

</div>

<div class="small">Your packet shows 2.41 × 10³⁰ MeV/s — the exponent should be 39. (MeV = mega electron volt, a tiny unit of energy.)</div>

<!--
TEACHER MOVE: Students read the phenomenon at the top of "How Does the Sun Provide Energy?"
ACCURACY NOTE: The packet's 2.41 × 10^30 MeV/s is an exponent typo. Sun's luminosity = 3.83 × 10^26 W = 2.39 × 10^39 MeV/s. At the packet value the Sun would release ~4 × 10^17 J/s — LESS than one day of world energy use — so the packet's comparison only works with the corrected number. Decide whether to have students correct their packets now.
MATH (if students ask): 3.8×10^26 J ÷ 1.6×10^18 J/day ≈ 2.4×10^8 days ≈ 650,000 years.
KEY POINT: The Sun has done this every second for billions of years.
CONNECTION: This quantity is the Sun's luminosity — don't name it yet; it's central in the next 5E.
-->

---

# Turn and Talk

> **What other phenomena are you familiar with that are associated with a lot of energy? How is that energy being produced?**

<div class="columns">
<div class="col">

🔥 Fire / campfire
💥 Explosions, fireworks
⚡ Lightning

</div>
<div class="col">

🌋 Volcanoes
☢️ Nuclear power plants
🚀 Rocket engines

</div>
</div>

<!--
TEACHER MOVE: Partners discuss before the individual brainstorm.
ACCESS FOR ALL: Connecting to a familiar high-energy phenomenon helps every student generate an initial idea about the Sun.
NOTE: Reveal examples only after pairs share.
TIMING: ~5 min.
-->

---

<!-- _class: lt1 lt2 -->

# How Does the Sun Provide So Much Energy?

| My idea for how the Sun provides energy | What I observed that made me think this |
|---|---|
| *e.g.,* It's a giant ball of burning gas | *e.g.,* The video looked like flames |
| | |
| | |

**Then:** choose the ONE idea you're most confident about → write it on a sticky note.

> **How does the Sun work?**

<!--
TEACHER MOVE: Individual brainstorm (2–5 ideas) with the observation behind each.
EXPECTED STUDENT RESPONSES: burning ball of gas; explosions inside; chemicals (H, He) reacting; nuclear reactions; it's so big it has lots of fuel.
COMMON MISCONCEPTION: "The Sun is on fire / burning." Record it — do NOT correct it. The Elaborate phase tests combustion vs. fusion.
TRANSITION: Rumors.
-->

---

# Rumors: How Does the Sun Work?

1. Take your sticky note
2. Share your idea with a classmate — listen to theirs
3. Repeat with **several** classmates
4. Listen for **trends** — what ideas keep coming up?
5. Report trends to the class

<div class="key-idea">

We'll sort ideas into categories on our **"How does the Sun work?"** poster — and test them as we investigate.

</div>

<!--
ROUTINE — Rumors (first use in unit): low-stakes surfacing of all students' initial ideas. After independent brainstorming, students share their most-confident idea with several classmates, listen for trends, and report trends to the class. See the Unit 1 Guide.
TEACHER MOVE: Categorize ideas on the poster (e.g., burning/fire; explosions; chemical reactions; nuclear; size/fuel; other).
LOOK & LISTEN FOR: "burning ball of gas," "explosions," "made of chemicals (H or He) reacting," "energy stored in atoms and molecules" (MS.PS1.B, CCC #5 MS).
ACCESS FOR ALL: Honor ideas from diverse cultural backgrounds; documenting them lets everyone track how ideas change.
CLASSROOM SUPPORT: Keep the poster up for the whole 5E.
-->

---

# How Can We Investigate the Sun?

<div class="columns">
<div class="col">

**How do you usually figure out how something works?**
- Take it apart
- Find out what it's made of
- See how the parts work together

</div>
<div class="col">

**But we can't take the Sun apart!**
What CAN we observe from Earth?

→ Its **light** ☀️
→ Using **telescopes**, **prisms**, and a **spectrometer**

</div>
</div>

<!--
TEACHER MOVE: Ask "How do you normally figure out how something works?" then "How can we investigate further — what can we observe about the Sun from Earth?"
LISTEN FOR: study the Sun's light waves (MS.PS4.B), use a space telescope, look for patterns in data (CCC #1 MS), use a prism.
KEY POINT: Introduce that scientists use a spectrometer to get more information about light, and special telescopes to observe light from objects in space.
IMPLEMENTATION TIP: Students know we can look at the Sun with a telescope, but not that light tells us about the inside of the Sun. "Take it apart" doesn't work for very distant objects.
TRANSITION: "Next we'll investigate sunlight to figure out what the Sun is made of and how it works."
-->

---

<!-- _class: phase-title -->

# EXPLORE
## What can light tell us about the Sun?

<!--
PHASE GOAL: Students learn how a spectroscopy telescope works (simulator), then analyze spectra from the Sun and lab gases for empirical evidence of patterns.
GROUPING: 2–3 students per laptop.
ROUTINE: Domino Discover (whole-class investigation summary).
TIMING: ~1.5 class periods.
MATERIALS: Light from the Sun Investigation, Making Sense (See-Think-Wonder), Investigation Rubric, Three Views Spectrum Demonstrator simulation; optional handheld spectroscopes.
LAUNCH: "We can't take the Sun apart. First we'll learn about a tool for observing it from far away, then we'll look at data gathered with that tool." Ask what makes this an investigation — revisit at the end.
-->

---

# What Makes This an Investigation?

<div class="columns">
<div class="col">

> **We can't take the Sun apart. We have to observe it from far away.**

**The plan:**
1. First, learn about a **tool** for observing the Sun from far away
2. Then, look at **data** gathered with that tool
3. Then, use that data as **evidence** for a claim

</div>
<div class="col">

<div class="panel">

🔗 **Three Views Spectrum Demonstrator**

`astro.unl.edu/classaction/`
`animations/light/threeviewsspectra.html`

Groups of **2–3**, one laptop per group.

</div>

</div>
</div>

> **Hold onto this question:** what makes this process an *investigation*? We'll come back to it at the end.

<!--
TEACHER MOVE (launch, from the plan): Remind students that at the end of Engage they surfaced that we cannot investigate the Sun by taking it apart. Preview the flow, then ask them to consider what makes this process an investigation — and tell them you will return to it.
WHY A SLIDE: The plan poses this question at launch and says to discuss it at the end; it needs to be visible both times. See the "Wrapping Up the Investigation" slide at the end of Explore.
MATERIALS: Investigating Light from the Sun handout (packet Part B), Investigation Rubric.
ACCESS FOR ALL: If handheld spectroscopes are available, let students look at a bulb first and share out. This evens the playing field before the simulator.
-->

---

# White Light Is a Mix of Colors

<div class="specrow"><div class="speclabel">White light →<br>through a prism</div><div class="spec"></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400 nm</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

- A **prism** spreads light out by **wavelength**
- Violet ≈ 400 nm (short) → red ≈ 700 nm (long)
- A lightbulb gives a **continuous spectrum** — every color, no gaps

<div class="vocab">

**Spectrum** (pl. **spectra**) — the band of colors light separates into
**Wavelength** — the distance between wave peaks; different colors = different wavelengths (nm = nanometer)

</div>

<!--
TEACHER MOVE: Brief refresher — students know "rainbow" but may not recall "spectrum." It's fine to remind them; this isn't the term being sense-made in this 5E.
ACCESS FOR ALL: If you have handheld spectroscopes, let students look at a bulb and share what they see.
EXPECTED RESPONSES (Part 1 Q1–2): "A full rainbow, violet to red, no gaps." "The prism spread the white light into all its colors."
NOTE: Consider showing this slide AFTER students complete Q1–2 in the simulator so they discover it themselves.
-->

---

# Part 1: The Spectrum Demonstrator

<div class="columns">
<div class="col">

**View 1 — Telescope aimed straight at the bulb**
<div class="spec" style="flex:none;height:36px"></div>

**View 2 — Light passes through a gas cloud first**
<div class="spec" style="flex:none;height:36px"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div>

</div>
<div class="col">

> **Q4:** What happened to the light as it passed through the gas cloud?

<div class="key-idea">

The gas **absorbed** specific wavelengths. Those colors are missing → **dark lines**.

</div>

</div>
</div>

<!--
TEACHER MOVE: Students work Part 1 Q1–4 with the simulator. Let them make sense of it independently.
EXPECTED STUDENT RESPONSES (Q4): "Something in the cloud blocked some of the light — that's why you see black lines." "Some light got trapped in the cloud." "No matter where the light comes from, the colors are in the same order."
CONFERRING QUESTIONS: "What happened to the white light in the spectroscopy telescope?" • "Does the spectrum look the same when it passes through the hydrogen gas?" • "Was all light able to pass through?" • "What happened to the missing light?"
MISCONCEPTION: The sample student work says "dust cloud" — it's a GAS cloud. Push from "blocked" to "absorbed at specific wavelengths" (a wall blocks all colors; a gas removes only particular ones).
NOTE: The lines drawn here are hydrogen's (~410, 434, 486, 656 nm) — the simulator's default cloud. Show the key-idea box after students answer.
-->

---

# Three Kinds of Spectra

<div class="specrow"><div class="speclabel">Continuous</div><div class="spec"></div></div>
<div class="specrow"><div class="speclabel">Absorption<br><span class="small">light through a gas</span></div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Emission<br><span class="small">glowing gas alone</span></div><div class="spec dark"><div class="ln" style="left:3.4%;background:#8000ff"></div><div class="ln" style="left:11.3%;background:#4a3aff"></div><div class="ln" style="left:28.7%;background:#00d0ff"></div><div class="ln" style="left:85.4%;background:#ff1a00"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

<div class="key-idea">

A gas **absorbs** and **emits** light at the **same wavelengths** — they're the gas's signature.

</div>

<!--
TEACHER MOVE: Optional extension slide. In the simulator's third view (telescope looking at the cloud from the side, not in line with the bulb), students see bright colored lines on black at the SAME wavelengths as the dark lines.
KEY POINT: This matters later: the Part 3 comparison chart is titled "Emission Spectra of Some Elements from Stars" — it works because emission and absorption lines are at the same wavelengths.
ALL THREE use hydrogen's lines: ~410, 434, 486, 656 nm.
DIFFERENTIATION: Extension for students who finish Part 1 early.
-->

---

# Part 2: Spectra from the Sun

<div class="specrow"><div class="speclabel">Observation 1</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Observation 2</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Observation 3</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

> **Q1:** What pattern do you notice across the 3 observations? What is the **evidence** for the pattern?
> **Q2:** What do you think **caused** the pattern?

<!--
TEACHER MOVE: Launch Part 2. Students answer Q1–2.
EXPECTED STUDENT RESPONSES:
Q1: "All three are identical. The dark lines are above the same wavelength numbers (~410, 434, 486, 656 nm) every time."
Q2: "Light from inside the Sun passes through the Sun's gases, which absorb certain colors — just like the simulation. The gases don't change, so the pattern doesn't change."
KEY POINT: It seems obvious the Sun's light is the same each time — the point is that we have EVIDENCE for the consistency. Push for numbers: "How do you know the lines are in the same place?" CCC #1 HS element: empirical evidence is needed to identify patterns.
ACCURACY NOTE: These packet spectra show only hydrogen's four lines. Helium evidence comes from the Part 3 comparison chart.
-->

---

<!-- _class: lt3 -->

# Part 3: Spectra of Gases in a Lab

| Gas | Samples 1, 2, 3 | Where are the lines? |
|---|---|---|
| **Hydrogen** | identical | 4 lines: ~410, 434, 486, 656 nm |
| **Helium** | identical | ~447, 471, 492, 502, **588**, 668 nm (+ others) |
| **Nitrogen** | identical | many lines; clusters in the orange-red |
| **Oxygen** | identical | many lines; cluster ~600–650 nm |

<div class="specrow"><div class="speclabel">Hydrogen</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Helium</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:4.0%"></div><div class="ln" style="left:12.9%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:89.3%"></div></div></div>

> **Q1:** How do the repeated samples — and the differences between gases — help you identify what makes each element unique?

<!--
TEACHER MOVE: Students examine the lab table (PTO/packet p. 7) and answer Q1.
EXPECTED RESPONSE: "Within each gas, all three samples have lines at exactly the same wavelengths — a repeatable signature. Different gases have lines in different places. Repeatable + unique = a fingerprint we can use to identify the element."
CONFERRING: "Was all light able to pass through each gas?" "What happened to the missing light?" Remind students each sample is a GAS.
DIFFERENTIATION: Don't cut the struggle short. Offer a ruler or index-card edge to line up lines, or cut out strips.
NOTE: Line positions on this slide use real wavelengths (H Balmer: 410.2, 434.0, 486.1, 656.3; He: 402.6, 412.1, 438.8, 447.1, 471.3, 492.2, 501.6, 587.6, 667.8).
-->

---

# Compare: The Sun vs. the Elements

<div class="specrow"><div class="speclabel">☀️ Sun</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:3.4%"></div><div class="ln" style="left:4.0%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:12.9%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:85.4%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Hydrogen</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Helium</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:4.0%"></div><div class="ln" style="left:12.9%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

> **Q2:** What connections can you make? What does this make you think about which elements are in the Sun?

<!--
TEACHER MOVE: Students use the "Spectra of Sun and Elements from the Lab" chart (packet p. 8) — that chart also includes carbon, nitrogen, oxygen, and silicon.
EXPECTED RESPONSE: "Every Sun line lines up with a hydrogen line (656, 486…) or a helium line (588, 447…). The Sun's spectrum = hydrogen + helium combined. Carbon, nitrogen, oxygen, and silicon patterns are not there (e.g., oxygen's 600–650 nm cluster is missing). The Sun is probably made of hydrogen and helium."
PLAN INCONSISTENCY: The plan's Look & Listen For mentions lithium/sodium — listen for "not nitrogen or oxygen" instead.
SUBJECT CONTEXT: The real Sun is ~73% H, ~25% He by mass, ~2% heavier elements; the real solar spectrum has thousands of lines (iron, sodium, …) — these data are simplified. Helium was discovered IN THE SUN (1868, a yellow line at 587.6 nm) before it was found on Earth — named for Helios.
NOTE: Hide the Sun-strip annotation until after students answer.
-->

---

<!-- _class: lefttable -->

# See – Think – Wonder

| SEE — pattern in the data | THINK — what could it mean? | WONDER — questions |
|---|---|---|
| Each gas's lines are at the **same wavelengths** in every sample | Each element absorbs its **own specific wavelengths** — a fingerprint | Why only certain colors? |
| Different gases → **different** line patterns | We can identify a gas **from its light alone** | Are there small amounts of other elements in the Sun? |
| The Sun's lines match **hydrogen + helium**, not N or O | The Sun is made **mostly of hydrogen and helium** | Do other stars have the same composition? How do H and He make energy? |

<!--
TEACHER MOVE: Individual See-Think-Wonder, then group discussion, then Domino Discover — one key understanding per group. Push for empirical evidence ("which wavelengths?").
READY FOR EXPLAIN WHEN THESE SURFACE: lines for each gas appear above the same wavelength • each gas absorbs differently • Sun's lines match H and He • Sun is probably H and He, not N or O. If not, re-display the simulator/spectra and use conferring questions.
INTEGRATING 3D: First explicit touch of CCC #1 Patterns; connects to SEP #6 (claims based on empirical evidence).
ACCESS FOR MULTILINGUAL LEARNERS: Domino Discover provides comprehensible input from peers.
IF ASKED WHY (beyond assessment boundary): Electrons in atoms can only have certain energies, so an atom absorbs only photons that match a jump between levels. Different elements → different levels → different lines (PS4.B).
WRAP-UP: Investigation Rubric (self + partner). Revisit "What made this an investigation?"
NOTE: Reveal table cells progressively after students share.
-->

---

# Wrapping Up the Investigation

<div class="columns">
<div class="col">

**Back to our launch question:**

> What made this process an **investigation**?

- We had a **question** we couldn't answer just by looking
- We used a **tool** to gather data we couldn't get by eye
- We took **repeated** observations
- We looked for **patterns** — and cited evidence for them
- We used those patterns to support a **claim**

</div>
<div class="col">

**Investigation Rubric**

1. Score **yourself**
2. Score your **partner**
3. Compare — where do you disagree, and why?

<div class="key-idea">

A pattern isn't a pattern until you can point to the **numbers** that show it.

</div>

</div>
</div>

<!--
TEACHER MOVE: Close the Explore phase by returning to the launch question and completing the Investigation Rubric (self + partner).
WHY A SLIDE: The plan says to "come back and discuss this at the end of the activity" — previously this lived only in presenter notes.
FORMATIVE: Disagreements between self- and partner-scores are the useful part. Ask a pair to explain one.
CCC #1 HS element: empirical evidence is needed to identify patterns — the key-idea box is the student-facing version of that element.
TRANSITION: "We have a pattern. Now let's use it to make a claim."
-->

---

<!-- _class: phase-title -->

# EXPLAIN
## What is the Sun made of — and how do we know?

<!--
PHASE GOAL: Students use patterns from empirical evidence in spectra to support a claim about the Sun's composition, then reach class consensus.
GROUPING: Pairs.
ROUTINE: Class Consensus Discussion (first time — focus on the process).
LITERACY: Sequence Chart; Claim-Evidence-Reasoning (CER).
TIMING: ~1–1.5 class periods.
MATERIALS: Spectra Sequence Chart cards, Determining the Composition of the Sun, Summary Task, "What Counts as an Evidence-Based Claim?" poster, "How does the Sun work?" poster.
LAUNCH: "What are we trying to figure out?" (Does the exoplanet have a Sun like ours?) Point to the "How does the Sun work?" poster.
-->

---

# What Counts as an Evidence-Based Claim?

- You found information from a **book or reliable source**
- The evidence comes from an **experiment or investigation** you did
- The claim is **not just someone's opinion**
- **Many scientists** can agree on that interpretation
- **Patterns in data** can serve as evidence

<div class="small">(We'll add to this list as the unit goes on.)</div>

<!--
TEACHER MOVE: Facilitate a class discussion using shared experiences from Engage and Explore. Build the list from student ideas — this slide shows the likely result; reveal only after the discussion.
LOOK & LISTEN FOR: Ideas influenced by how evidence works in history/humanities classes. Record everything; some ideas are refined later.
KEY POINT: It's fine if understanding is incomplete — two more criteria get added in Elaborate.
CONNECTION: SEP #2 (models) and SEP #6 (explanations) — the unit's main practices — both depend on evidence.
CLASSROOM SUPPORT: Keep this as a posted chart.
-->

---

<!-- _class: lt2 lt3 lt4 -->

# How We Figure Out What the Sun Is Made Of

| Step | White light | Hydrogen (lab) | The Sun |
|---|---|---|---|
| 1. Source | Bulb emits **all** wavelengths | Bulb emits all wavelengths | Sun's interior emits all wavelengths |
| 2. Passes through… | nothing | **hydrogen gas** | **the Sun's own gases** |
| 3. Prism | separates wavelengths | separates wavelengths | separates wavelengths (telescope on Earth) |
| 4. Spectrum | nothing missing | some wavelengths **missing** | some wavelengths **missing** |
| 5. Conclusion | signature of white light | repeated → **signature of H** | matches **H + He** signatures |

*Repeat step 2 for helium, nitrogen, oxygen… → a library of signatures.*

<!--
TEACHER MOVE: Spectra Sequence Chart — pairs sequence cards so someone else could understand how to determine the Sun's composition. Show this slide only AFTER groups finish, as a summary.
IMPLEMENTATION TIP: This may feel redundant, but it's where students literally assemble their Explore understanding; without it, the teacher ends up explaining.
DIFFERENTIATION: Give only the blue (white light) cards first, then green (hydrogen), pink (other gases), yellow (Sun) — same pattern each row.
LOOK & LISTEN FOR: white light contains many wavelengths we can't see separately without a prism • a spectroscopy telescope contains a prism • a gas absorbs wavelengths that depend on its composition • repeated lab trials always give the same pattern • sunlight passes through the Sun's gases • match the Sun's spectrum to lab references.
ACCESS FOR ALL: Images and repeated structure support emerging and transitioning ELLs.
-->

---

<!-- _class: lt2 -->

# Claim – Evidence – Reasoning

> **What is the composition of the Sun? How do you know?**

| Part | Response |
|---|---|
| **Claim** | Our Sun is composed of **hydrogen and helium**. |
| **Evidence** | The Sun's spectrum has dark lines at the **same wavelengths** as hydrogen (~410, 434, 486, 656 nm) and helium (e.g., ~447, 588 nm) — in **all three** observations. No N or O patterns. |
| **Reasoning** | A gas absorbs **specific wavelengths unique to each element** (lab samples show the same pattern every time). Sunlight passes through the Sun's outer gases, so matching lines mean the light passed through H and He. |

<!--
TEACHER MOVE: Pairs write the explanation (sentence starters in packet). Show this exemplar only after the consensus discussion, or for students who need a model.
CONFERRING QUESTIONS: "Why does this finding tell us the Sun is composed of H and He?" • "I see you cited a pattern as evidence — how do you know there's a pattern? How can you make that clear?" • "Underline the sequence-chart points that best link evidence to your claim."
COMMON MISCONCEPTION: Reasoning that just restates evidence ("because the lines match"). Reasoning must say WHY matching matters.
DIFFERENTIATION: Scaffold = CER chart → paragraph. Extension = real spectrometer + unknown gas tubes; students cite wavelengths.
CCC #1: Using patterns as evidence (MS) → needing empirical evidence for the pattern (HS).
-->

---

# Class Consensus Discussion

<div class="columns">
<div class="col">

1. We select a few groups' ideas
2. First group shares
3. One person **restates** what they shared
4. Class asks **clarifying questions**
5. Repeat 2–4 for each group
6. Table groups **confer**
7. Whole class works toward **agreement**

</div>
<div class="col">

> **Patterns lens**
> - How are patterns in the data used to craft this claim?
> - How does the pattern in spectra help you understand the Sun as a whole?
> - How can you convince others that the patterns you cite are **truly** patterns?

</div>
</div>

<!--
ROUTINE — Class Consensus Discussion (first time in unit): focus on the steps. Post them in the room.
TEACHER MOVE: Say: "We have a lot of different evidence-based claims circulating. It's important to agree on how we represent what we know about how the Sun works, so we have a shared understanding to build on."
SELECTION: Choose 2–3 groups deliberately (NOT randomly) whose work will surface the key points.
IMPLEMENTATION TIP: Project the work (doc camera, copies, or photos) — don't just read claims aloud.
CONNECTION: Patterns prompts adapted from STEM Teaching Tools #41.
-->

---

# What We Agree On

<div class="key-idea">

1. The Sun is made **mostly of hydrogen and helium** — we know this from **spectra data**.
2. We used **patterns in data** to figure this out — a useful lens for other things in space science.
3. We know it's a pattern because the absorption lines **always appear above the same wavelength numbers**.

</div>

**Back to our poster:** Which "How does the Sun work?" ideas can we **eliminate**, **change**, or **add**?

> **New questions:** Are hydrogen and helium *on fire* in the Sun? Can gases burn? When people say the Sun is "burning up," is it really burning?

<!--
TEACHER MOVE: "Take Time for These Key Points" — pause and ask for clarification on each. (Fusion has not come up yet — that's next.)
TEACHER MOVE: Display the Engage categories; modify the list based on the investigation.
TRANSITION: The "burning" questions set up the Elaborate phase directly.
SUMMARY TASK: Individually, as exit ticket or homework (next slide).
-->

---

# Summary Task: Which Statement Shows a Pattern?

<div class="columns">
<div class="col">

**Statement 1**
"A pattern I have noticed is that female students perform better than male students in science classes at my school."

</div>
<div class="col">

**Statement 2**
"Female students at my school have an average grade of **86.7%** in science, while male students average **82.5%**. There seems to be a pattern…"

</div>
</div>

<div class="key-idea">

**Statement 2** — it gives **empirical evidence** (data) for the pattern. Statement 1 only asserts it.

</div>

<!--
TEACHER MOVE: Students complete the Summary Task individually (exit ticket or homework). Show the answer box after collecting.
OTHER SUMMARY ITEMS — expected responses:
• How did you identify patterns? Compared wavelengths of dark lines across repeated samples/observations; lined up the Sun with each element.
• Convince a skeptic: Point to numbers — H lines at ~410, 434, 486, 656 nm in all three lab samples AND all three Sun observations; repeats every time → pattern.
DISCUSSION EXTENSION: Is a 4-point difference enough? How many students? Does the pattern tell us WHY? (No — a pattern is not a cause.)
CCC #1 HS element: empirical evidence is needed to identify patterns.
FORMATIVE: Collect from every student; use it to decide who needs to circle back before Elaborate.
-->

---

# Summary Task: How Did We Learn Together?

<div class="columns">
<div class="col">

Answer these individually. They're about **us**, not about the Sun.

1. One thing that **went well** in our discussion
2. One thing we can **improve** the next time we have a discussion
3. One **person who helped me learn** today — and what you learned from them
4. One idea **I contributed** to my group or my class

</div>
<div class="col">

<div class="key-idea">

Science is something people build **together.** Figuring out how our class does that is part of the work.

</div>

</div>
</div>

<!--
TEACHER MOVE: Second half of the Summary Task (packet Part D). Exit ticket or homework, alongside the patterns items on the previous slide.
IMPLEMENTATION TIP (from the plan): "This summary is really important!" It checks three things student by student: (1) how they are using the three dimensions to make sense of the Sun's release of energy; (2) how they and their peers are building knowledge together; (3) how they think the Class Consensus Discussion went.
WHY A SLIDE: These four group-process items were previously missing from the deck entirely.
COLLECT FROM EVERY STUDENT. Item 3 is also a quick read on who is — and isn't — being heard in group work.
-->

---

<!-- _class: phase-title -->

# ELABORATE
## Our Sun: chemical or nuclear energy?

<!--
PHASE GOAL: Students use evidence about the SCALE of energy (amount per reaction) and TIME (duration) to argue which process releases the Sun's energy.
GROUPING: Pairs.
TIMING: ~1 class period (argument can be finished at home).
MATERIALS: Our Sun: Chemical or Nuclear Energy?, Claim and Data Cards (cut out), Constructing an Evidence-Based Argument.
LAUNCH: "We know the Sun is made of hydrogen and helium, but we still don't know how they release energy." Connect to Engage ideas: burning ball of gas, explosions, chemicals.
-->

---

# The Puzzle

<div class="columns">
<div class="col">

☀️ The Sun releases **~2.4 × 10³⁹ MeV every second**

🪨 Sedimentary rocks of marine origin show **oceans existed nearly 4 billion years ago**

➡️ The Sun has provided the right energy for liquid water for **at least 4 billion years**

</div>
<div class="col">

> **How can the Sun release such a HUGE amount of energy for such a LONG time?**

**Two possible processes involving hydrogen:**
1. Chemical **combustion** (burning)
2. Nuclear **fusion**

</div>
</div>

<!--
TEACHER MOVE: Frame the two candidate processes — both involve hydrogen and connect to students' Engage ideas.
ACCURACY NOTE: The packet repeats the 2.41 × 10^30 MeV/s typo here and on the Claim & Data cards.
IMPLEMENTATION TIP: This value is the Sun's luminosity — don't name it yet; it's central in the next 5E.
-->

---

# Two Kinds of Reactions

<div class="columns">
<div class="col">

### 🔥 Chemical: Combustion of Hydrogen

$$2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O} + \text{energy}$$

- Atoms **rearrange** into new molecules
- Atoms are **conserved** (same atoms before and after)
- Requires **oxygen**; produces **water**

</div>
<div class="col">

### ☢️ Nuclear: Fusion of Hydrogen

$$^{2}\text{H} + {}^{3}\text{H} \rightarrow {}^{4}\text{He} + \text{n} + \text{energy}$$

- Nuclei **combine** into a new element
- Atoms are **not** conserved — but total protons + neutrons **are**
- Hydrogen → **helium**

</div>
</div>

<div class="vocab">

**Combustion** — a chemical reaction of a fuel with oxygen that releases energy
**Nuclear fusion** — light nuclei combining to form a heavier nucleus, releasing energy

</div>

<!--
TEACHER MOVE: Walk through the two equations from the data table.
KEY POINT: Chemical reactions change how atoms are bonded; nuclear reactions change the nuclei — making new elements.
ACCURACY / CONTEXT: The packet's fusion equation (deuterium + tritium → helium-4 + neutron, 17.6 MeV) is the reaction fusion reactors use. The Sun's net process (proton–proton chain) turns 4 ¹H → ⁴He and releases ~26.7 MeV. HS-ESS1-1's assessment boundary excludes these details — the scale argument is what matters.
MISCONCEPTION: "The Sun is on fire." Fire = combustion, which needs oxygen.
-->

---

# The Data: Scale of Energy and Time

| Reaction | Energy released by ONE reaction | How long the Sun could last at its current rate |
|---|---|---|
| **Chemical** (combustion) | 0.0000005930 MeV | **50,000 years** |
| **Nuclear** (fusion) | 17.6 MeV | **10 billion years** |

<div class="key-idea">

$$\frac{17.6 \text{ MeV}}{0.000000593 \text{ MeV}} \approx 30{,}000{,}000$$

One fusion reaction releases about **30 million times** more energy than one combustion reaction.

</div>

<!--
TEACHER MOVE: Students analyze the table to find evidence for a claim about which process powers the Sun.
EXPECTED RESPONSES: "Chemical would run out in 50,000 years, but Earth has had water for 4 billion years." "Fusion releases way more energy per reaction."
CCC #3 — Scale, Proportion, and Quantity: the significance of a phenomenon depends on its scale. Both reactions release energy, but only fusion releases it on the scale the Sun requires.
MATH NOTE: The time ratio (10 billion ÷ 50,000 = 200,000) differs from the energy ratio because the packet's values are simplified. The packet's combustion value is also lower than the textbook value (~2.5–3 eV per water molecule); either way the gap is ~10^7.
-->

---

<!-- _class: lt1 -->

# The Scale of Time

| Time span | Years |
|---|---|
| Chemical combustion could power the Sun | 50,000 |
| Humans have existed | 2,000,000 |
| Liquid water on Earth (at least) | **4,000,000,000** |
| Age of the Sun & solar system | 4,600,000,000 |
| Fusion could power the Sun | **10,000,000,000** |

<div class="warning">

"The Sun is so big — maybe it could burn for billions of years." ❌ The 50,000-year estimate **already uses all of the Sun's hydrogen.**

</div>

<!--
TEACHER MOVE: Use this to make the time scale concrete — 50,000 years is shorter than modern humans have existed.
MISCONCEPTION: Size could make combustion last. The calculation already includes the Sun's entire hydrogen mass. This is exactly the flaw in the provided sample student argument — consider projecting it for critique.
CARD NOTE: The "mass of hydrogen in the Sun is 1.813968 × 10^30" card has no units (kg). Real value ≈ 1.45 × 10^30 kg (~73% of the Sun's 1.99 × 10^30 kg). Quick "what's missing?" moment.
-->

---

# What's the Evidence? — Claim and Data Cards

<div class="columns">
<div class="col">

**Claim 1:** The energy released by our Sun is due to **chemical combustion** of hydrogen.

**Claim 2:** The energy released by our Sun is due to **nuclear fusion** of hydrogen.

</div>
<div class="col">

**Your task (pairs):**
1. Read each card
2. Place it under the claim it supports — or set it aside
3. Use the reasoning provided; **write your own** on blank cards

</div>
</div>

> Is there evidence that supports **both** claims? **Neither** claim?

<!--
TEACHER MOVE: Pairs sort the cards.
CONFERRING QUESTIONS: "What made you decide this card supports that claim?" • "What makes it relevant?" • "Is there evidence for both claims?" • "Which claim has more evidence?" • "What reasoning did you add?" • "How did the amounts of energy (Sun, chemical, fusion) help you decide?"
EXPECT: Some students notice cards that support neither claim.
-->

---

<!-- _class: lt1 lt3 -->

# Sorting the Evidence

| Evidence | Supports | Why |
|---|---|---|
| Combustion → Sun lasts only **50,000 yr** | ❌ against Claim 1 | Far shorter than 4 billion years of water |
| Fusion → Sun lasts **10 billion yr** | ✅ Claim 2 | Long enough |
| Water in **4-billion-year-old rocks** | ✅ Claim 2 | Needs ≥ 4 billion years of stable energy |
| Sun's spectrum shows **helium** | ✅ Claim 2 | Helium is the **product** of fusion |
| **No oxygen** lines; **no water** lines | ❌ against Claim 1 | Combustion needs O₂ and makes H₂O |
| Sun's spectrum shows **hydrogen** | Both | H is the fuel for both |
| Fusion: atoms not conserved, p + n conserved | ✅ Claim 2 | Only fusion can turn H into He |
| Earth's atmosphere: 78% N₂, 21% O₂… | Neither | That's Earth, not the Sun |

<!--
TEACHER MOVE: Debrief the sort. Reveal rows progressively as pairs share.
ALSO: "We have observed energy released by fusion" → Claim 2 is possible; "…by combustion" → Claim 1 is possible. Both are real processes — the question is which fits the AMOUNT and DURATION.
KEY POINT (CCC #3): Scale links the evidence (energy of the Sun vs. each reaction) to the claim that fusion occurs in the Sun.
-->

---

<!-- _class: lt2 lt3 -->

# Constructing an Evidence-Based Argument

> **Investigation Question:** Is our Sun releasing energy due to chemical or nuclear reactions?

| | Claim #1: Chemical | Claim #2: Nuclear |
|---|---|---|
| **Evidence** | Sun has lots of hydrogen; combustion releases energy | ~30 million× more energy per reaction; lasts 10 billion yr; helium present |
| **Critique** | Only 50,000 yr; no O₂ or H₂O in the spectrum → **weak** | Multiple independent sources → **strong** (but we can't see the core directly) |

**Your argument:** investigation question → best-supported claim → summary of evidence → critique compared to the other claim

<!--
TEACHER MOVE: Students individually write the argument (in class or at home). Lined paper for students who no longer need the organizer.
EXEMPLAR (in answer key): Claim = fusion; evidence = energy scale, time scale, 4-billion-year water, helium in spectrum; critique = combustion lasts 50,000 years and needs oxygen/produces water, neither seen; limitation = we rely on calculations since we can't observe the core.
SAMPLE STUDENT WORK CRITIQUE: Its Claim 1 evidence ("different reactants and products") applies to both reactions; its Claim 2 critique ("the Sun is so large") is already answered by the 50,000-year calculation.
ACCESS FOR ALL: The card sort gave ELLs time with the language before writing; emerging ELLs may need verbal or home-language support.
-->

---

# Updating: What Counts as an Evidence-Based Claim?

- You found information from a book or reliable source
- The evidence comes from an experiment or investigation you did
- The claim is not just someone's opinion
- Many scientists can agree on that interpretation
- ~~Patterns in data can serve as evidence~~ → **Patterns in data can count as evidence for a claim — but you have to have evidence for the pattern too.**
- **Claims can be revised based on new evidence from a different source.**

<!--
TEACHER MOVE: After arguments are complete, ask: "Would you add anything to our criteria?" Update the poster.
KEY POINT: We revised the "burning ball of gas" idea based on new evidence (energy scale) — exactly the new criterion.
SEP #6: new evidence from different sources allows us to revise an explanation.
-->

---

<!-- _class: phase-title -->

# EVALUATE
## How has the Sun made Earth habitable — and will it last forever?

<!--
PHASE GOAL: Students revise and critique their habitability models using spectra evidence and scale of energy/time, then use the model to predict how H and He change as the Sun ages.
GROUPING: Small groups of 3–4 (same as Unit Opening).
ROUTINE: Idea Carousel (first use in unit); Domino Discover for DQB.
TIMING: ~1 class period.
MATERIALS: Groups' initial-model posters, new chart paper, sticky notes, PTO How the Sun Works, How the Sun Works Model Rubric, What will happen to our Sun in the future?, DQB.
-->

---

# Energy Over Time

| Event | When |
|---|---|
| Sun & planets form | 4,600 mya |
| Earth's first oceans | ~3,800–4,000 mya |
| First life on Earth | 3,500 mya |
| First multicellular life | 1,000 mya |
| First humans | 2 mya |

> 1. How does the time the Sun has provided the right energy for liquid water compare to the time it took life to exist and evolve? **Why does this matter?**
> 2. What would happen to Earth's water if the Sun's energy **significantly increased or decreased**? What would that mean for life?

<!--
TEACHER MOVE: Students revisit the Life in the Solar System timeline and answer independently.
EXPECTED RESPONSES:
Q1: The Sun has provided the right energy for liquid water for at least 4 billion years — longer than it took life to appear (~300 My after oceans), become multicellular (~3.6 By), and evolve into humans. Life needed billions of years of stable conditions.
Q2: More energy → water evaporates, oceans could boil away (like Venus). Less → water freezes. Either way: no liquid water → ecosystems collapse, extinction, humans can't survive.
IMPLEMENTATION TIP: These two questions create the "need to know" about the Sun's future and bridge to the next 5E.
-->

---

# From the Core to Earth

<div class="columns">
<div class="col">

☢️ **Core** — fusion releases energy
↓
**Radiative zone** — energy travels as light, absorbed and re-emitted over and over
↓
**Convective zone** — hot gas rises, cooler gas sinks
↓
**Surface** — light finally escapes into space
↓
🌍 **Earth** — arrives about **8 minutes** later

</div>
<div class="col">

<div class="key-idea">

Energy leaves the Sun as **electromagnetic radiation** — light. It crosses empty space with **no matter in between.**

</div>

<div class="vocab">

**Radiation** — energy transfer by electromagnetic waves; the only way energy can cross the vacuum of space

</div>

**This is the light you analyzed.** The spectrum you matched to hydrogen and helium *is* the Sun's energy arriving at Earth.

</div>
</div>

<!--
WHY THIS SLIDE: HS-ESS1-1's clarification statement puts the emphasis on "the energy transfer mechanisms that allow energy from nuclear fusion in the sun's core to reach Earth," and PS3.D(1) reads "Nuclear fusion processes in the center of the Sun release the energy that ultimately reaches Earth as radiation." The unit plan lists as a target student idea: "The energy produced by the Sun reaches Earth in the form of electromagnetic waves which cause Earth to heat up." Students need this before they revise their models — the rubric asks for energy radiating in all directions.
KEY POINT: Close the loop with Explore. Students spent two days analyzing sunlight without naming it as the energy transfer itself. Say it out loud: the light IS the energy arriving.
ASSESSMENT BOUNDARY: Don't go into photon random-walk physics or sub-atomic detail. Zones are context, not content to assess.
SCALE HOOK (CCC #3): Energy takes ~8 minutes to cross from the Sun's surface to Earth — but tens of thousands of years to work its way out from the core. Good contrast if students ask.
TEACHER MOVE: Have students point to where each step belongs on their poster before they start revising.
-->

---

<!-- _class: lt2 -->

# Revise Your Model: Idea Carousel

**Your group:** Update your Unit Opening model on new chart paper — show why the Sun has supported a planet where life could exist and evolve.

**Visit other groups' models. Leave sticky notes:**

| Symbol | Meaning |
|---|---|
| ✔ | An idea that **resonates** |
| **+** | An idea that should be **added** |
| **?** | An idea you don't think is **relevant** |
| **Δ** | A suggestion to **clarify** or represent an idea more clearly |

<!--
ROUTINE — Idea Carousel (first use): warm feedback + suggestions on content and clarity; groups pose and respond to questions. See Unit 1 Teacher Guide.
LOOK & LISTEN FOR: Our Sun is a star that has provided the right energy for liquid water for billions of years • life has been sustained over that time • stable energy made Earth a place where species can survive • we can establish Earth's history using evidence from various devices.
FACILITATION: If some ideas surfaced in only some groups, have those groups share; not every group needs to share.
ACCESS FOR ALL: Ideal for emerging ELLs — students with receptive language can engage by listening and annotating.
Then groups revise using the feedback.
-->

---

# What a Strong Sun Model Includes

<div class="columns">
<div class="col">

☀️ **Inside the Sun**
- **Hydrogen and helium** as particles
- **Nuclear fusion in the core:** H + H → He + energy
- Energy **radiating in all directions**

🌍 **Connection to Earth**
- Some energy travels through space **to Earth**
- **Liquid water and life** on Earth
- **Time scale:** stable energy for **billions of years**

</div>
<div class="col">

**Evidence to cite**
- Spectra: absorption lines at the **same wavelengths** as H and He
- Scale of energy: fusion ≈ **30 million ×** combustion
- Scale of time: **10 billion yr** vs. **50,000 yr**; water ≥ **4 billion yr**

**Labels, keys, or captions** so the model "speaks for itself"

</div>
</div>

<!--
TEACHER MOVE: Students independently refine their model in the PTO (How the Sun Works: reflection prompts, Change/Evidence/Reasoning table, drawing). Show this slide as a checklist after a first draft.
RUBRIC (Proficient): H & He as particles • fusion in the core • energy radiating in all directions incl. toward Earth • components speak for themselves or are captioned • empirical evidence cited for patterns • scale of energy AND scale of time addressed.
RUBRIC NOTE: Rubric "reflection prompt 1" = PTO prompt 1; rubric "reflection prompt 2" = PTO prompt 4.
RUBRIC USES: self-assessment; class critique of a fictional composite model; teacher scoring vs. self-scores; partner review — then revise.
RELEVANCE PROMPTS: Consider a whole-class share and displaying responses.
-->

---

# Connect to the Performance Task

**In your PTO, answer these before you revise your model:**

1. What is the **evidence for the patterns** you identified?
2. How will those **patterns** change your model?
3. How did you use the **scale of energy and time** to figure out how the Sun works?
4. How do you think considering **scale** might be useful in thinking about **other phenomena**?

<div class="key-idea">

Prompts 1–2 are **Patterns** (CCC #1). Prompts 3–4 are **Scale, Proportion, and Quantity** (CCC #3) — the two lenses this whole 5E was built around.

</div>

<!--
TEACHER MOVE: These are the PTO reflection prompts for How the Sun Works. Students respond BEFORE revising the drawing, then cite evidence and reasoning for any change they make.
EXPECTED RESPONSES:
1. Dark absorption lines in sunlight line up with hydrogen and helium lines; the same pattern repeats across every observation and every lab sample.
2. The model should now show a MECHANISM instead of an arrow labeled "heat": H nuclei fusing into He in the core, releasing energy that travels outward and reaches Earth as radiation.
3. The Sun has released energy at a nearly steady rate for ~4.6 billion years with enough hydrogen for billions more. No chemical process could do that for that long. Comparing the scale of the energy to the scale of the time is what rules out burning.
4. Open response. Look for: a process can look completely different depending on the size or time span you examine it over — plate motion, erosion, climate change, population growth.
FORMATIVE: Prompt 2 is the one that shows whether a student has moved from description to mechanism.
-->

---

# Predicting the Future of Our Sun

$$\text{hydrogen} + \text{hydrogen} \rightarrow \text{helium} + \text{energy}$$

<div class="columns">
<div class="col">

1. What will happen to the amount of **hydrogen** over time?
2. What will happen to the amount of **helium** over time?
3. Will the Sun provide the right amount of energy **forever**?

</div>
<div class="col">

<div class="warning">

Fusion in the Sun is **irreversible** — helium does not break apart to re-form hydrogen.

</div>

</div>
</div>

<!--
TEACHER MOVE: Pairs make predictions. Let students struggle before giving the conferring prompts (examine the equation; fusion is irreversible).
EXPECTED RESPONSES:
1. Hydrogen DECREASES — it's the reactant, used up in every reaction.
2. Helium INCREASES — it's the product and accumulates.
3. NO — hydrogen fuel is limited; the Sun will eventually run low and change.
LOOK & LISTEN FOR: "The Sun will run out of hydrogen and stop releasing energy." • "The Sun will explode." • "Maybe helium will fuse into heavier elements."
MISCONCEPTION: "The Sun will explode" — the Sun isn't massive enough to go supernova; it will become a red giant, then a white dwarf. Don't resolve now — it motivates Star Life Cycles (HS-ESS1-3).
SUBJECT CONTEXT: The Sun slowly brightens (~10% per billion years) — Earth may lose its oceans in ~1 billion years, long before the Sun "runs out."
SEP #2 HS element: using a model to make predictions.
-->

---

# The Sun's Life Span

<div class="key-idea">

- The Sun is about **4.6 billion years** old
- Hydrogen fusion can power it for about **10 billion years** total
- As **hydrogen ↓** and **helium ↑**, the Sun **will change** — it won't provide the "right" energy forever

</div>

> **ESS1.A:** The star called the Sun is changing and will burn out over a life span of approximately **10 billion years**.

<!--
TEACHER MOVE: Summarize predictions from the pair share.
KEY POINT: "Burn out" in the DCI is figurative — no combustion is involved. Worth saying explicitly after the Elaborate phase.
TRANSITION: Revisit the Driving Question Board.
-->

---

# Back to the Driving Question Board

**What have we figured out?**
- ✅ The Sun is made mostly of **hydrogen and helium** (spectra)
- ✅ The Sun releases energy by **nuclear fusion** (scale of energy & time)
- ✅ The Sun's stable energy lasted long enough for **life to evolve**

**New questions:**
- When will **other stars** run out of fuel?
- Will other stars provide the right energy for **liquid water** on their planets?
- …for **long enough** for life to exist and evolve?

<!--
TEACHER MOVE: Domino Discover — pairs share what they've figured out and what they still need to investigate. Prompt new questions about finding another star that could support an Earth-like planet.
TRANSITION SCRIPT: "I'm noticing a lot of questions about how long other stars last and whether they provide the right energy for liquid water, so next we will investigate these questions." (Next 5E: Star Life Cycles.)
-->

---

<!-- _class: lefttable compact -->

# Vocabulary Reference (1 of 2)

| Term | Definition |
|---|---|
| **Habitable** | Suitable for life |
| **Exoplanet** | A planet orbiting a star other than our Sun |
| **mya** | Millions of years ago |
| **Spectrum** (pl. spectra) | The band of colors (wavelengths) that light separates into |
| **Wavelength** | Distance between wave peaks; determines color (measured in nm) |
| **Spectroscope / spectrometer** | Instrument that separates light into its spectrum (uses a prism or grating) |
| **Continuous spectrum** | All wavelengths present — no gaps |
| **Absorption spectrum** | Continuous spectrum with dark lines where a gas absorbed specific wavelengths |
| **Emission spectrum** | Bright lines on dark background from a glowing gas — at the same wavelengths it absorbs |

<!--
TEACHER MOVE: Reference slide for study/review. Per the plan's Access for All note, vocabulary is learned in context — use these as a reference, not a list to memorize up front.
-->

---

<!-- _class: lefttable -->

# Vocabulary Reference (2 of 2)

| Term | Definition |
|---|---|
| **Composition** | What something is made of |
| **Pattern** | A repeated, consistent relationship in data — needs **empirical evidence** |
| **Empirical evidence** | Evidence from observation or measurement |
| **Claim / Evidence / Reasoning** | Answer / data that supports it / science idea that links them |
| **Chemical reaction (combustion)** | Atoms rearrange into new molecules; atoms conserved; burning needs oxygen |
| **Nuclear fusion** | Light nuclei combine into a heavier element, releasing huge energy |
| **MeV** | Mega electron volt — a small unit of energy used for atomic reactions |
| **Scale** | The size, amount, or time span at which something happens |

<!--
TEACHER MOVE: Reference slide. CCC #3 — "scale" is the lens that ruled out combustion.
UP NEXT: Luminosity (the Sun's energy output per second) becomes central in the Star Life Cycles 5E.
-->
