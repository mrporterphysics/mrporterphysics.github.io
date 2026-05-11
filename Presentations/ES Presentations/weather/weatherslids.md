---
marp: true
theme: claymorphism
paginate: true
math: mathjax
style: |
  /* Deck-specific extensions on top of the claymorphism theme.
     Only defines the custom classes used in this deck body
     (title-slide, phase-title, key-idea, warning, vocab, esrt,
     columns/col) — base typography, slide background, h1-h6, code,
     tables, blockquote, and lists all come from claymorphism.css. */

  /* Two-column layout */
  .columns { display: flex; gap: var(--clay-sp-5); align-items: stretch; }
  .col { flex: 1; min-width: 0; }

  /* Title slide: reuse the lead variant's pastel-blob canvas */
  section.title-slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-image:
      radial-gradient(circle at 18% 22%, var(--clay-pink) 0%, transparent 22%),
      radial-gradient(circle at 80% 28%, var(--clay-sky) 0%, transparent 20%),
      radial-gradient(circle at 78% 80%, var(--clay-peach) 0%, transparent 22%),
      radial-gradient(circle at 22% 78%, var(--clay-mint) 0%, transparent 22%);
  }
  section.title-slide h1 {
    font-size: clamp(40px, 5.2vw, 60px);
    padding: var(--clay-sp-4) var(--clay-sp-6);
  }
  section.title-slide h2 {
    background: var(--clay-paper);
    color: var(--clay-muted);
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: var(--clay-fs-4);
    padding: var(--clay-sp-2) var(--clay-sp-5);
    border-radius: var(--clay-radius-pill);
    box-shadow: var(--clay-shadow-sm);
    margin-top: var(--clay-sp-4);
  }
  section.title-slide h2::after { display: none; }
  section.title-slide h3 {
    color: var(--clay-primary);
    font-style: italic;
    font-size: var(--clay-fs-4);
    max-width: 22em;
    margin-top: var(--clay-sp-3);
  }

  /* Phase-title slide: full-bleed primary clay */
  section.phase-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--clay-primary);
    background-image:
      radial-gradient(ellipse 60% 50% at 12% 10%, rgba(255,255,255,0.20), transparent 60%),
      radial-gradient(ellipse 50% 50% at 88% 90%, rgba(255,255,255,0.18), transparent 65%);
    color: var(--clay-secondary);
  }
  section.phase-title h1 {
    background: var(--clay-secondary);
    color: var(--clay-primary);
    font-size: clamp(40px, 5.5vw, 64px);
    padding: var(--clay-sp-4) var(--clay-sp-6);
  }
  section.phase-title h2 {
    color: var(--clay-secondary);
    background: rgba(255,255,255,0.18);
    backdrop-filter: blur(2px);
    padding: var(--clay-sp-2) var(--clay-sp-5);
    border-radius: var(--clay-radius-pill);
    margin-top: var(--clay-sp-4);
    font-size: var(--clay-fs-4);
  }
  section.phase-title h2::after { display: none; }
  section.phase-title strong { color: var(--clay-secondary); }

  /* Callouts — clay cards with a vertical accent pill */
  .key-idea, .warning, .vocab, .esrt {
    background: var(--clay-paper);
    border-radius: var(--clay-radius);
    box-shadow: var(--clay-shadow-sm);
    padding: var(--clay-sp-4) var(--clay-sp-5);
    padding-left: var(--clay-sp-6);
    margin: var(--clay-sp-3) 0;
    position: relative;
    color: var(--clay-text);
  }
  .key-idea::before,
  .warning::before,
  .vocab::before,
  .esrt::before {
    content: "";
    position: absolute;
    left: var(--clay-sp-3);
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 70%;
    border-radius: var(--clay-radius-pill);
  }
  .key-idea::before { background: var(--clay-success); }
  .warning::before  { background: var(--clay-warning); }
  .vocab::before    { background: var(--clay-lilac);   }
  .esrt::before     { background: var(--clay-primary); }

  .key-idea strong { color: var(--clay-success); }
  .warning  strong { color: var(--clay-warning); }
  .vocab    strong { color: var(--clay-text);    }
  .esrt     strong { color: var(--clay-primary); }

  .esrt { font-size: 0.95em; }
footer: 'Weather  •  Regents Earth Science  •  Mr. Porter'
---

<!-- _class: title-slide -->
<!-- _paginate: false -->

# Weather

## Regents Earth Science — Two-Week Unit

### Will there be more frequent and more intense severe storms in the future?

<!--
Welcome to the unit. The driving question intentionally previews where we'll land on Day 10.
Connect to the previous unit on Climate Change — this unit is the consequence of that one.
Total time: 10 class periods. 9 labs. 4 ESRT pages.
-->

---

# Unit Roadmap

| Topic | Days | Lab |
|-------|------|-----|
| **Earth's Atmosphere** | 1–2 | Atmospheric Layers |
| **Energy & Phase Change** | 2–3 | Phase Change of Water |
| **Atmospheric Moisture** | 3–4 | Sling Psychrometer |
| **Cloud Formation** | 5–6 | Cloud Base Altitude |
| **Weather Instruments** | 6 | Station Models |
| **Mapping Weather** | 7–8 | Isotherms / Isobars; Fronts |
| **Severe Storms** | 9–10 | Hurricane Katrina; Killer Typhoon |

<!--
Show the full path. Tell students: "Each topic builds on the last. By Day 10 we'll answer the driving question with evidence we've gathered ourselves."
NYS standards: HS-ESS2-5, HS-ESS2-8, HS-ESS3-5.
-->

---

<!-- _class: phase-title -->

# Day 1 — 2

## Earth's Atmosphere

<!--
PHASE GOAL: Students can describe the structure of Earth's atmosphere — composition, layers, and the temperature/pressure profile from ESRT page 14.
GROUPING: Whole class for instruction; pairs for ESRT exercises.
TIMING: ~30 min lecture, then 30 min lab.
MATERIALS: ESRT, guided notes, Lab #1 packet.
-->

---

# What is the atmosphere?

The **atmosphere** is the layer of gases held to Earth by gravity.

It's *very* thin compared to Earth itself — if Earth were a basketball, the atmosphere would be about as thick as a sheet of paper.

<div class="key-idea">

**Composition of dry air (by volume):**
- Nitrogen (N₂) — 78%
- Oxygen (O₂) — 21%
- Argon, CO₂, others — 1%

Plus a *highly variable* amount of **water vapor** (0–4%).

</div>

<!--
TEACHER MOVE: Stress the variability of water vapor — that variability is what drives most weather.
EXPECTED RESPONSES: Students may guess "mostly oxygen" — push back: nitrogen dominates.
COMMON MISCONCEPTION: "We breathe oxygen." We breathe AIR; our bodies use the oxygen.
TRANSITION: "If gravity is pulling air molecules toward Earth, where would you expect most of the air to be?" → leads to layers.
-->

---

# Five Layers — Bottom to Top

<div class="columns">
<div class="col">

1. **Troposphere** (0–12 km)
   *Where weather happens.* ~80% of air mass.
2. **Stratosphere** (12–50 km)
   *Ozone layer.* T rises with altitude.
3. **Mesosphere** (50–80 km)
   *Coldest layer.* Meteors burn up here.
4. **Thermosphere** (80–600 km)
   *Auroras.* Few molecules but very hot.
5. **Exosphere** (600+ km)
   *Fades to space.*

</div>
<div class="col">

The boundaries are called **pauses**:
- tropo**pause**
- strato**pause**
- meso**pause**

</div>
</div>

> **Mnemonic:** *The Soup Mom Threw out Expired* — Tropo, Strato, Meso, Thermo, Exo.

<!--
TEACHER MOVE: Walk through the temperature direction in each layer. Pause at the stratosphere — temperature INCREASES with altitude there because ozone absorbs UV. This is the only layer where this happens (besides the thermosphere).
EXPECTED RESPONSES: "Why does the stratosphere get warmer going up?" — because ozone absorbs UV.
COMMON MISCONCEPTION: "It gets colder forever as you go up." Actually it zigzags — the stratosphere and thermosphere both warm with altitude.
DIFFERENTIATION: The mnemonic lands well for students who struggle to memorize order.
-->

---

# Reading ESRT Page 14

<div class="esrt">

**ESRT pg 14 — Selected Properties of Earth's Atmosphere**

Shows altitude (km), temperature (°C), and pressure (atm) from sea level up.

</div>

<div class="warning">

**Quick reads to memorize:**
- Sea level: T ≈ 15 °C, P = 1 atm
- Tropopause: T ≈ −55 °C, P ≈ 0.2 atm
- Stratopause: T ≈ 0 °C (warms up because of ozone)
- Mesopause: T ≈ −90 °C (coldest point in atmosphere)

</div>

<!--
TEACHER MOVE: Open the ESRT to page 14 with students. Cold-call: "What's the temperature at 30 km?" "What's the pressure at the tropopause?"
ROUTINE: ESRT-fluency cold call. Use this on every ESRT-anchored slide in the unit.
KEY POINT: This is the most-tested ESRT page in the weather unit. Build fluency now.
TRANSITION: "We just looked up pressure decreasing with altitude. What about temperature changes — what does it cost to change temperature versus change phase?" → next slide.
-->

---

<!-- _class: phase-title -->

# Day 2 — 3

## Energy & Phase Changes

<!--
PHASE GOAL: Students can identify endothermic vs exothermic phase changes and apply Q = mL.
This sets up the rest of the unit — every weather process involves water changing phase, releasing or absorbing latent heat.
-->

---

# Phase Changes of Water

Water exists in three phases on Earth — and weather is driven by the energy moved during phase changes.

<div class="key-idea">

**Endothermic** (absorbs heat — surroundings cool):
- Melting (solid → liquid)
- Vaporization (liquid → gas)
- Sublimation (solid → gas)

**Exothermic** (releases heat — surroundings warm):
- Freezing (liquid → solid)
- Condensation (gas → liquid)
- Deposition (gas → solid)

</div>

<!--
TEACHER MOVE: Demo if possible — wet a paper towel, fan it, students put their hand on it. Why cold? Evaporation absorbs heat from your skin.
COMMON MISCONCEPTION: "Heat and temperature are the same thing." They aren't. During a phase change, energy goes into BREAKING bonds, not into raising temperature.
KEY POINT TO SURFACE: The energy released when water vapor CONDENSES (forms clouds) is the engine of every storm we'll study.
-->

---

# Latent Heat — ESRT Page 1

<div class="esrt">

**Heat of fusion** (water): $H_f = 334$ J/g
*Energy to melt 1 g of ice at 0 °C.*

**Heat of vaporization** (water): $H_v = 2260$ J/g
*Energy to vaporize 1 g of water at 100 °C.*

</div>

The total heat for a phase change:

$$Q = m \cdot H_f \quad \text{or} \quad Q = m \cdot H_v$$

The total heat for a temperature change:

$$Q = m \cdot c \cdot \Delta T$$

(For liquid water, $c = 4.18$ J/g°C.)

<!--
TEACHER MOVE: Walk through one combined problem on the board. Example: How much heat to take 50 g of ice at -10°C to water at 25°C? Three steps: warm ice (using c_ice = 2.1), melt ice (using H_f), warm water (using c_water).
EXPECTED RESPONSES: Students often forget the c values are different for ice/water/steam.
DIFFERENTIATION: Provide a worked example template for struggling students.
TRANSITION: "If condensing water releases 2260 J/g, why does that matter for clouds and storms?" → preview hurricane discussion.
-->

---

# Worked Example — Latent Heat

> **Q:** How much energy is released when 200 g of water vapor condenses at 100 °C?

**Step 1.** Identify what's happening: condensation = phase change → use $Q = mH_v$.

**Step 2.** Plug in:

$$Q = (200 \text{ g})(2260 \text{ J/g}) = 452{,}000 \text{ J}$$

**Step 3.** Sign: condensation is *exothermic*, so this energy is **released** to the surroundings.

<div class="warning">

This is exactly what happens inside a thunderstorm or hurricane — water vapor condensing in updrafts dumps massive amounts of heat back into the air, fueling the storm.

</div>

<!--
TEACHER MOVE: After working it, ask students to convert 452,000 J to kilojoules (452 kJ) and to relate it to a familiar quantity (about enough energy to warm 1 kg of water by 100°C).
DISCUSSION: Land the conceptual punchline — phase change is the energy currency of the atmosphere.
-->

---

<!-- _class: phase-title -->

# Day 3 — 4

## Atmospheric Moisture

<!--
PHASE GOAL: Students can use the sling psychrometer + ESRT pg 12 to determine dew point and relative humidity.
This is the most procedurally demanding section — anchor in repetition.
-->

---

# Humidity Vocabulary

<div class="vocab">

**Humidity** — the amount of water vapor in the air.

**Saturation** — the air is holding the maximum amount of water vapor possible at that temperature.

**Relative humidity (RH)** — the actual amount of water vapor *as a percentage* of the maximum the air could hold at that temperature.

**Dew point** — the temperature to which air must be cooled (at constant pressure) to reach saturation.

</div>

<div class="key-idea">

**Warmer air can hold more water vapor.** That single fact drives most of weather.

</div>

<!--
TEACHER MOVE: Demonstrate "saturation" with a sponge analogy. A bigger sponge (warm air) holds more water (water vapor) before dripping (precipitation).
EXPECTED RESPONSE: Some students confuse RH with absolute humidity. RH = ratio. Absolute humidity = mass per volume.
KEY POINT: Air at 100% RH is *saturated*; cooling it further forces condensation.
-->

---

# The Sling Psychrometer

Two thermometers side-by-side:
- **Dry bulb** — measures actual air temperature.
- **Wet bulb** — wrapped in a wet wick; cools as water evaporates from the wick.

Spinning the device forces evaporation. The drier the air, the more evaporation, the lower the wet bulb reading.

<div class="key-idea">

**Wet-bulb depression** = $T_{dry} - T_{wet}$

A *large* depression → *dry* air (low RH).
A *small* depression → *humid* air (high RH).
A *zero* depression → *saturated* air (100% RH, dew point reached).

</div>

<!--
TEACHER MOVE: Demonstrate spinning the psychrometer. Show what happens when you breathe on the wet bulb (wet-bulb temperature rises — humid).
SAFETY: Students must check their swing space before whirling these around.
TRANSITION: "Now we use the readings to look up dew point and RH on ESRT page 12."
-->

---

# ESRT Page 12 — Dew Point and RH Tables

<div class="esrt">

Two charts on the same page:
- **Top chart:** Dew Point (°C). Rows = dry-bulb T. Columns = wet-bulb depression.
- **Bottom chart:** Relative Humidity (%). Same row/column structure.

</div>

> **Q:** Dry bulb = 20 °C, wet bulb = 17 °C. Find dew point and RH.

**Step 1.** Wet-bulb depression = 20 − 17 = **3 °C**.
**Step 2.** Top table, row 20, column 3 → Dew point ≈ **14 °C**.
**Step 3.** Bottom table, row 20, column 3 → RH ≈ **74 %**.

<!--
TEACHER MOVE: Project ESRT page 12. Walk through each step with the cursor on the actual page. Don't paraphrase the tables — students must SEE them.
COMMON MISCONCEPTION: Students try to look up the wet-bulb temperature directly. Always compute the DEPRESSION first.
ROUTINE: Have students do the next two on whiteboards and hold up.
-->

---

# Quick Practice — Try These

| # | Dry-Bulb (°C) | Wet-Bulb (°C) | Depression | Dew Point | RH (%) |
|---|---------------|---------------|------------|-----------|--------|
| 1 | 22            | 18            | ?          | ?         | ?      |
| 2 | 16            | 11            | ?          | ?         | ?      |
| 3 | 24            | 24            | ?          | ?         | ?      |

<div class="warning">

For #3: depression = 0 → air is saturated → dew point = dry-bulb temperature → RH = 100%.

</div>

<!--
TEACHER MOVE: Give students 3 minutes. Then take volunteers at the board.
ANSWERS:
1. Depression 4 → Dew ~15°C → RH ~67%
2. Depression 5 → Dew ~6°C → RH ~52%
3. Depression 0 → Dew = 24°C → RH = 100%
DIFFERENTIATION: For struggling students, pair with strong students for the first one only.
-->

---

<!-- _class: phase-title -->

# Day 5 — 6

## Cloud Formation

<!--
PHASE GOAL: Students explain why clouds form (rising air cools adiabatically until reaching dew point) and use the lapse-rate graph to find cloud base altitude.
-->

---

# Three Ingredients for Cloud Formation

<div class="key-idea">

1. **Water vapor** — there must be moisture in the air.
2. **Condensation nuclei** — tiny particles (dust, pollen, salt, soot) for water to condense onto.
3. **Cooling** — usually because air is rising.

</div>

When all three are present, water vapor condenses into tiny droplets — a cloud.

<!--
TEACHER MOVE: Some students think clouds form spontaneously when humidity reaches 100%. They actually need a SURFACE — that's the role of condensation nuclei.
INTERESTING NOTE: That's why cloud seeding (silver iodide) works — adding nuclei.
-->

---

# Why Does Rising Air Cool?

When an air parcel rises, the surrounding pressure drops. The parcel **expands**.

Expansion does work on the surrounding air → the parcel **loses internal energy** → its temperature **drops**.

This is called **adiabatic cooling** (no heat is exchanged with the surroundings; energy converts internally).

<div class="key-idea">

**Adiabatic Lapse Rates:**
- **Dry adiabatic rate:** ~10 °C per km (dry-bulb T drops as air rises)
- **Dew-point lapse rate:** ~2 °C per km (dew point drops more slowly)

</div>

<!--
TEACHER MOVE: This is the critical concept. Use a bicycle pump analogy — when you compress air the pump gets hot; when you let it expand it cools.
KEY POINT: The dew point falls more slowly than the dry-bulb temperature, so they CONVERGE as the parcel rises. Where they meet → cloud base.
COMMON MISCONCEPTION: "The atmosphere gets cooler, so the air rising into it cools by mixing." Wrong — adiabatic = no heat exchange.
-->

---

# Finding Cloud Base — ESRT Page 12

<div class="esrt">

The **Generalized Graph for Determining Cloud Base Altitude** uses the two lapse rates.

**Procedure:**
1. From the surface dry-bulb T, follow the dry adiabat (steeper line) upward.
2. From the surface dew point, follow the dew-point line (shallower) upward.
3. They meet at the **cloud base altitude**.

</div>

<div class="warning">

**Faster way (algebra, when both rates are linear):**

$$h_{\text{cloud base}} \approx \frac{T_{\text{surface}} - T_{\text{dewpoint, surface}}}{8 \text{ °C/km}}$$

(8 °C/km = 10 − 2; the rate at which the gap closes per km.)

</div>

<!--
TEACHER MOVE: Walk through one example on the projected ESRT graph. T = 25°C, dewpoint = 15°C → gap = 10°C → cloud base ~1.25 km.
TRANSITION: Tomorrow's lab will give students three cases to do on their own.
-->

---

# Worked Example — Cloud Base

> **Q:** Surface dry-bulb T = 30 °C, dew point = 14 °C. At what altitude do clouds form?

**Method 1 (graph):** Plot both points at altitude 0 on ESRT pg 12. The lines converge near **2 km**.

**Method 2 (algebra):**

$$h \approx \frac{30 - 14}{8} = \frac{16}{8} = 2 \text{ km}$$

<div class="key-idea">

**Both methods agree** — about 2 km, or roughly 6,500 feet.

</div>

<!--
TEACHER MOVE: Note that the algebra method is *not* on the Regents — only the graph method counts for credit. But the algebra is a useful sanity check.
EXPECTED CHALLENGE: Students may try to use just one lapse rate. Both are needed because BOTH temperatures fall as the parcel rises.
-->

---

<!-- _class: phase-title -->

# Day 6 — 7

## Weather Instruments &
## Station Models

<!--
PHASE GOAL: Students identify weather instruments and decode the standard station model (ESRT pg 13).
-->

---

# Weather Instruments

| Instrument | Measures | Units |
|------------|----------|-------|
| **Thermometer** | Air temperature | °C or °F |
| **Barometer** | Air pressure | mb or in Hg |
| **Anemometer** | Wind speed | knots or mph |
| **Wind vane** | Wind direction | compass direction |
| **Hygrometer / Psychrometer** | Humidity | % RH |
| **Rain gauge** | Precipitation | mm or in |

<div class="warning">

**Wind direction is named for where the wind is COMING FROM.**
A "north wind" blows *from* the north, *toward* the south.

</div>

<!--
TEACHER MOVE: This is a high-yield Regents memorization point. Use the mnemonic: "name the wind by where it came from."
COMMON MISCONCEPTION: Students often reverse this. Drill it.
EXPECTED STUDENT RESPONSE: "Why is it named that way?" — historically, sailors needed to know what was coming at them.
-->

---

# Decoding a Station Model — ESRT Pg 13

<div class="esrt">

A station model is a compact way to plot many weather variables at one location.

</div>

<div class="columns">
<div class="col">

**Standard layout:**
- **Center circle** — sky cover (% filled)
- **Upper-left** — temperature (°F)
- **Lower-left** — dew point (°F)
- **Upper-right** — pressure (mb, coded — see next slide)
- **Lower-right** — present weather symbol
- **Wind barb** from circle — direction wind is coming from; flags show speed

</div>
<div class="col">

**Wind barb decoding:**
- Half flag = 5 knots
- Full flag = 10 knots
- Triangle ("pennant") = 50 knots

A barb pointing *north* with two flags = north wind at 20 knots.

</div>
</div>

<!--
TEACHER MOVE: Project a station model and decode all variables on the spot. Then have students try.
CONFERRING QUESTION: "Where is the wind coming from? Where is it going?"
-->

---

# The Pressure Code — Read It Right

<div class="warning">

**The pressure on a station model is given as 3 digits with no decimal.**

To decode:
1. If it starts with **5–9** → put **"9"** in front, decimal before last digit. So `978` → **997.8 mb**.
2. If it starts with **0–4** → put **"10"** in front, decimal before last digit. So `089` → **1008.9 mb**.

</div>

> **Why?** Atmospheric pressure varies between roughly 950 and 1050 mb. The leading "9" or "10" is implied to save space.

<!--
TEACHER MOVE: This is the trickiest single rule on ESRT pg 13. Drill it. Have students decode 5 in a row on whiteboards: 234, 891, 002, 045, 762.
ANSWERS: 1023.4, 989.1, 1000.2, 1004.5, 976.2
COMMON MISTAKE: Students forget the decimal before the last digit. Always 3 digits → 4-digit number with decimal.
-->

---

<!-- _class: phase-title -->

# Day 7 — 8

## Air Masses &
## Weather Fronts

<!--
PHASE GOAL: Students identify the major air masses affecting NYS and predict weather changes associated with each front type.
-->

---

# Air Masses

An **air mass** is a large body of air with relatively uniform temperature and humidity, taking on the properties of its **source region**.

<div class="key-idea">

**Naming convention:** *moisture letter* + *temperature letter*

| Code | Name | Origin | Properties |
|------|------|--------|-----------|
| **mT** | maritime Tropical | Gulf of Mexico, tropical Atlantic | warm, humid |
| **cT** | continental Tropical | desert SW US, Mexico | hot, dry |
| **mP** | maritime Polar | N Pacific, N Atlantic | cool, humid |
| **cP** | continental Polar | Canada | cold, dry |
| **cA** | continental Arctic | Arctic | very cold, dry |

</div>

<!--
TEACHER MOVE: For NYS specifically, mT brings hot humid summers; cP brings cold winters; mP brings nor'easters.
EXPECTED RESPONSE: "What about hurricanes?" — they're tropical cyclones, not air masses. We'll get there.
-->

---

# Weather Fronts — The Boundaries

A **front** is the boundary between two air masses of different properties.

<div class="vocab">

Four major front types:

**Cold front** — Cold air pushes into warm air. Steep boundary. Brief, intense storms. Cooler weather follows.

**Warm front** — Warm air slides over cold air. Gentle slope. Long period of light precipitation. Warmer weather follows.

**Stationary front** — Boundary not moving. Persistent overcast and drizzle.

**Occluded front** — A faster cold front catches a warm front, lifting the warm air completely off the ground.

</div>

<!--
TEACHER MOVE: Use ESRT pg 13 to show the symbols. Cold front = blue triangles pointing in direction of motion. Warm front = red half-circles. Stationary = both, on opposite sides. Occluded = purple, alternating.
KEY POINT: At every front, the warm air is FORCED UP. Lifting → adiabatic cooling → cloud formation. Fronts make weather.
-->

---

# Front Symbols (ESRT pg 13)

<div class="columns">
<div class="col">

**Cold front**
Blue line + filled triangles
Triangles point in direction of front's motion.

**Warm front**
Red line + filled semicircles
Semicircles point in direction of motion.

</div>
<div class="col">

**Stationary front**
Alternating triangles (blue) and semicircles (red), pointing OPPOSITE directions.

**Occluded front**
Purple line, alternating triangles & semicircles pointing the SAME direction.

</div>
</div>

<div class="warning">

On the Regents, you'll be asked to identify front type from the symbols, predict what air mass is on each side, and describe the weather change as the front passes.

</div>

<!--
TEACHER MOVE: Drawing practice — give students 4 unlabeled lines and have them add the correct symbols.
DIFFERENTIATION: Color-coding the symbols by front type helps visual learners.
-->

---

# What Happens When a Cold Front Passes?

| Variable | Before | During | After |
|----------|--------|--------|-------|
| Temperature | warm | drops sharply | cool |
| Pressure | falling | minimum | rising |
| Wind direction | from S/SW | shifts | from NW |
| Clouds | cumulus → cumulonimbus | thunderstorms | clearing |
| Precipitation | none, then heavy | heavy, brief | ends |

<div class="key-idea">

**Always:** the *cold* air ends up on the ground; the *warm* air is forced up.
The warm air rising is what produces the weather.

</div>

<!--
TEACHER MOVE: Explicitly walk through the relationship between PRESSURE and front passage — pressure reaches a minimum AT the front, then rises sharply.
CONFERRING QUESTION: "Why does the wind shift direction as the front passes?" — air flows in toward the low-pressure center, then around.
-->

---

# High and Low Pressure Systems

<div class="columns">
<div class="col">

**Low pressure (L):**
- Air converges at surface, rises in the center
- Rising air cools → clouds → precipitation
- **Stormy, cloudy weather**
- In Northern Hemisphere: counterclockwise inflow

</div>
<div class="col">

**High pressure (H):**
- Air sinks in center, diverges at surface
- Sinking air warms → no clouds
- **Fair, clear weather**
- In Northern Hemisphere: clockwise outflow

</div>
</div>

<div class="key-idea">

**Mnemonic:** *Lows = lousy weather. Highs = happy weather.*

</div>

<!--
TEACHER MOVE: Coriolis effect (rotation of Earth) deflects winds. Highs and lows BOTH have inflow/outflow; the spiral patterns are due to Coriolis.
COMMON MISCONCEPTION: "Air goes UP into a low because it's lighter." No — air rises in a low because it's CONVERGING from all sides and has nowhere else to go.
-->

---

# Mapping Weather — Isolines

<div class="vocab">

**Isotherm** — line of equal temperature.
**Isobar** — line of equal pressure (in mb).

</div>

<div class="warning">

**Rules for drawing isolines:**
1. Same value → same line. Lines never cross.
2. Lines must close (form loops) or run off the map edge.
3. Adjacent lines differ by the contour interval.
4. Values BETWEEN lines fall between the line values.
5. Spacing matters: **closer lines = steeper gradient**.

</div>

<!--
TEACHER MOVE: Draw a small example on the board with 5 station readings. Show how to interpolate.
COMMON ERRORS: Students bend isolines through stations rather than between them; students cross isolines.
DIFFERENTIATION: Provide a partially-completed map with two contours already drawn for struggling students.
-->

---

# Calculating Gradient

<div class="esrt">

**ESRT pg 1 — Equations:**

$$\text{Gradient} = \frac{\text{change in field value}}{\text{distance}}$$

</div>

> **Q:** Two cities are 200 km apart. Temperatures are 10 °C and 22 °C. Find the temperature gradient.

**Step 1.** $\Delta T = 22 - 10 = 12$ °C
**Step 2.** $\text{Gradient} = \dfrac{12 \text{ °C}}{200 \text{ km}} = 0.06$ °C/km

<div class="key-idea">

**Always include units in the answer.** °C/km for temperature gradient; mb/km for pressure gradient.

</div>

<!--
TEACHER MOVE: Pressure gradient is a common Regents question. Same formula — just plug in pressures.
KEY POINT: A *steep* gradient (closer lines) means winds will be stronger. This connects to severe weather.
-->

---

<!-- _class: phase-title -->

# Day 9 — 10

## Severe Storms &
## Climate Connection

<!--
PHASE GOAL: Students apply unit content to severe storms and construct an evidence-based argument about climate change impacts.
This is where everything we've learned converges.
-->

---

# Tropical Cyclones — Same Storm, Different Names

<div class="columns">
<div class="col">

**Hurricane** — Atlantic, eastern Pacific
**Typhoon** — western Pacific
**Cyclone** — Indian Ocean, S Pacific

All three are the **same kind of storm**.

</div>
<div class="col">

**Required conditions:**
- Sea surface T ≥ 26.5 °C (about 80 °F)
- Warm water to a depth of ~50 m
- Low vertical wind shear
- Sufficient distance from the equator (~5°+) for Coriolis

</div>
</div>

<div class="key-idea">

The energy source: **latent heat released when water vapor condenses** in the storm's eyewall.
This is the same Q = m·H_v we calculated on Day 3.

</div>

<!--
TEACHER MOVE: Make the explicit connection back to Day 2/3 — phase change drives the storm. Each gram of water vapor condensing releases 2260 J. Multiply by trillions of grams happening simultaneously.
KEY POINT: Hurricanes weaken over land because they lose their energy source — warm ocean water.
-->

---

# Anatomy of a Hurricane

<div class="key-idea">

**Three main parts:**

- **Eye** — calm center, ~30–60 km across, nearly clear sky, low pressure.
- **Eyewall** — ring of strongest winds and heaviest rain, surrounding the eye.
- **Rain bands** — spiraling arms of precipitation extending hundreds of km outward.

</div>

> **Storm surge:** wind-driven rise in seawater level. Often the deadliest aspect of a hurricane — it can flood coastal areas tens of kilometers inland.

<!--
TEACHER MOVE: Show a satellite image and identify each part. Watch the Killer Typhoon clip if time permits.
EXPECTED RESPONSE: "Why is the eye calm?" — air is sinking in the eye (clearing), while it's rising in the eyewall.
-->

---

# Saffir-Simpson Hurricane Scale

| Category | Wind Speed (mph) | Damage |
|----------|------------------|--------|
| **Tropical Depression** | < 39 | Forming |
| **Tropical Storm** | 39–73 | Named storm |
| **Cat 1** | 74–95 | Some damage |
| **Cat 2** | 96–110 | Extensive |
| **Cat 3** | 111–129 | Devastating |
| **Cat 4** | 130–156 | Catastrophic |
| **Cat 5** | 157+ | Total destruction |

<div class="warning">

The scale is based **only on wind speed** — it does not account for storm surge, rainfall, or storm size. A Cat 1 with massive surge can be deadlier than a Cat 4 that misses populated areas.

</div>

<!--
TEACHER MOVE: This is a Regents-friendly table. Drill it briefly.
KEY POINT: When categorizing in the lab, students will use ONLY wind speed — even if the storm has dropped pressure or had storm surge.
-->

---

# Other NYS Severe Weather

<div class="columns">
<div class="col">

**Nor'easter** — extratropical cyclone forming off the East Coast.
- mP and cP air collide
- Heavy snow, strong winds
- Common in winter

**Blizzard** — winter storm with:
- Sustained winds ≥ 35 mph
- Visibility < ¼ mile (snow)
- Lasting ≥ 3 hours

</div>
<div class="col">

**Tornado** — violently rotating column of air.
- Forms in supercell thunderstorms
- Strong wind shear required
- Rated on EF scale (0–5)
- Most common in spring/summer

</div>
</div>

<!--
TEACHER MOVE: Connect nor'easters to mP air — they bring NYS its biggest snowstorms (e.g., Blizzard of '96, '78).
EXPECTED QUESTION: "Are tornadoes worse than hurricanes?" — different scales. A tornado is more locally intense; a hurricane is much larger.
-->

---

# Climate Change & Severe Storms

<div class="key-idea">

**Three connections from this unit:**

1. **Warmer oceans** → more available latent heat → potentially stronger storms.
2. **Warmer atmosphere** → holds more water vapor (recall: warm air holds more moisture) → heavier rainfall.
3. **Higher sea level** → smaller storms produce larger surges.

</div>

<div class="warning">

What's *less certain*: whether the **frequency** of storms will change. The strongest evidence is for increased **intensity** of the storms that do form.

</div>

<!--
TEACHER MOVE: Reinforce that the science here is nuanced. The IPCC says high confidence in increased intensity, lower confidence in increased frequency.
This frames the unit-end CER prompt: argue for intensity OR frequency OR both, using evidence from the unit.
KEY POINT: We have THREE independent lines of evidence from this unit alone: latent heat (Day 2-3), atmospheric moisture (Day 3-4), and the unit on climate change before this one.
-->

---

# Connecting It All — Day 10 Synthesis

> **Driving question:** *Will there be more frequent and more intense severe storms in the future?*

Use evidence from this unit:

1. **Sea surface temperatures are rising.** (From Climate Change unit.)
2. **Warmer water releases more latent heat when it evaporates.** (Day 2.)
3. **Warmer air holds more water vapor.** (Day 3.)
4. **Hurricanes are powered by latent heat from warm seawater.** (Day 9.)

<div class="key-idea">

**Claim:** Storms are likely to become more *intense* (stronger winds, heavier rain, higher surge) — even if the *number* of storms doesn't change much.

**Evidence-Reasoning chain:** ↑ SST → ↑ latent heat available → ↑ energy in eyewall convection → ↑ wind speeds. ↑ atmospheric moisture → ↑ precipitation per storm.

</div>

<!--
TEACHER MOVE: This is THE central conceptual move of the unit. Have students write their own CER paragraph using this scaffolding.
ASSESSMENT: This claim, with this evidence chain, is the unit summative.
TRANSITION TO NEXT UNIT: "If we're confident storms will get more intense, what should engineers and planners do about it?" — sets up the next unit.
-->

---

# Vocabulary Master List (1 of 2)

<div class="vocab">

atmosphere · troposphere · stratosphere · mesosphere · thermosphere · exosphere
tropopause · stratopause · mesopause
phase change · endothermic · exothermic · heat of fusion · heat of vaporization · latent heat
humidity · relative humidity · dew point · saturation
wet-bulb depression · sling psychrometer
condensation nuclei · adiabatic · lapse rate · cloud base

</div>

<!--
Display this slide for student reference. Keep up during exit ticket / quick reviews.
-->

---

# Vocabulary Master List (2 of 2)

<div class="vocab">

station model · isotherm · isobar · gradient
air mass · cP · mP · cT · mT
front · cold front · warm front · stationary front · occluded front
high-pressure system · low-pressure system
convergence · divergence
tropical cyclone · hurricane · typhoon
eye · eyewall · rain band · storm surge
Saffir-Simpson scale
nor'easter · blizzard · tornado · supercell
climate · climate change · sea surface temperature

</div>

<!--
End of vocabulary. Total: ~50 terms. Students should master all of these for the unit assessment.
-->

---

<!-- _class: title-slide -->
<!-- _paginate: false -->

# Unit Wrap-Up

## Weather

### *"The atmosphere is a heat engine. We've spent two weeks learning how it runs — and what happens when we turn up the dial."*

<!--
Final slide. Brief reflection. Preview of the unit assessment.
-->