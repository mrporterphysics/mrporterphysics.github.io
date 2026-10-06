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

# ☀️ How the Sun Works
## Guided Notes — Unit 1: Discovering New Worlds
### Lesson 1 review · what the Sun is made of · how it releases energy · how that energy reaches us

<!--
WHAT THIS DECK IS: the projection companion to the guided-notes packet "Guided Notes: How the Sun Works" (ess-u1-guided-notes.pdf). Slides follow the packet Part for Part. Students fill in their blanks as each slide comes up.
NOT the teaching deck. The 5E instruction lives in U1_Discovering_New_Worlds_L0-L1_Slides. This is end-of-unit consolidation: content knowledge only.
EVERY BLANK ANSWER on these slides is shown in gold. Advance, let students write, then discuss.
STANDARDS: ESS1.A(1) Sun's ~10-billion-year life span · ESS1.A(2) spectra and brightness identify composition · PS3.D(1) fusion in the core releases the energy that reaches Earth as radiation · PS4.B(4) atoms absorb and emit characteristic frequencies.
TIMING: about one class period at a brisk pace, or two if you stop to work the questions.
-->

---

# How to Use This

<div class="columns">
<div class="col">

**You have:** the packet *Guided Notes: How the Sun Works*

**On screen:** the same content, Part for Part

Anything shown like <span class="fill">this</span> goes in a blank on your sheet.

</div>
<div class="col">

<div class="key-idea">

The numbered questions in the packet are **not** answered on these slides. We work those together.

</div>

</div>
</div>

<!--
TEACHER MOVE: Set the expectation that the gold text is what they copy. The constructed-response questions are deliberately not on the slides so students have to reason rather than transcribe.
-->

---

<!-- _class: phase-title -->

# PART A
## Light, Wavelength, and the Visible Spectrum

---

# Wavelength and Color

<div class="pkt">PACKET PART A</div>

<div class="columns">
<div class="col">

A **wavelength** is the distance between one wave peak and the next.

For light, wavelength determines the <span class="fill">color</span> we see.

Wavelengths are measured in **nanometers (nm)** — one billionth of a meter.

</div>
<div class="col">

The **visible spectrum** runs from about <span class="fill">400</span> nm to about <span class="fill">700</span> nm.

- Shortest (≈400 nm) → <span class="fill">violet</span>
- Longest (≈700 nm) → <span class="fill">red</span>

</div>
</div>

<svg viewBox="0 0 1140 276" width="100%" style="max-height:256px">
  <defs>
    <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#ff3b30"/><stop offset="22%" stop-color="#ff9500"/>
      <stop offset="42%"  stop-color="#ffd60a"/><stop offset="60%" stop-color="#34c759"/>
      <stop offset="80%"  stop-color="#0a84ff"/><stop offset="100%" stop-color="#9b5cff"/>
    </linearGradient>
  </defs>
  <line x1="62" y1="150.0" x2="1062" y2="150.0" stroke="#A9B3D2" stroke-width="1.2" stroke-dasharray="7 6" opacity="0.6"/>
  <path d="M 62.0,150.0 L 63.0,148.1 L 64.0,146.2 L 65.0,144.2 L 66.0,142.3 L 67.0,140.4 L 68.0,138.5 L 69.0,136.6 L 70.0,134.7 L 71.0,132.9 L 72.0,131.0 L 73.0,129.2 L 74.0,127.4 L 75.0,125.6 L 76.0,123.8 L 77.0,122.1 L 78.0,120.4 L 79.0,118.7 L 80.0,117.1 L 81.0,115.5 L 82.0,113.9 L 83.0,112.3 L 84.0,110.8 L 85.0,109.4 L 86.0,108.0 L 87.0,106.6 L 88.0,105.2 L 89.0,104.0 L 90.0,102.7 L 91.0,101.5 L 92.0,100.4 L 93.0,99.3 L 94.0,98.3 L 95.0,97.3 L 96.0,96.4 L 97.0,95.5 L 98.0,94.7 L 99.0,94.0 L 100.0,93.3 L 101.0,92.7 L 102.0,92.1 L 103.0,91.7 L 104.0,91.2 L 105.0,90.9 L 106.0,90.6 L 107.0,90.3 L 108.0,90.1 L 109.0,90.0 L 110.0,90.0 L 111.0,90.0 L 112.0,90.1 L 113.0,90.3 L 114.0,90.5 L 115.0,90.8 L 116.0,91.2 L 117.0,91.6 L 118.0,92.1 L 119.0,92.6 L 120.0,93.3 L 121.0,93.9 L 122.0,94.7 L 123.0,95.5 L 124.0,96.4 L 125.0,97.3 L 126.0,98.3 L 127.0,99.4 L 128.0,100.5 L 129.0,101.7 L 130.0,102.9 L 131.0,104.2 L 132.0,105.5 L 133.0,106.9 L 134.0,108.3 L 135.0,109.8 L 136.0,111.4 L 137.0,113.0 L 138.0,114.6 L 139.0,116.2 L 140.0,118.0 L 141.0,119.7 L 142.0,121.5 L 143.0,123.3 L 144.0,125.2 L 145.0,127.0 L 146.0,129.0 L 147.0,130.9 L 148.0,132.9 L 149.0,134.8 L 150.0,136.8 L 151.0,138.9 L 152.0,140.9 L 153.0,142.9 L 154.0,145.0 L 155.0,147.1 L 156.0,149.1 L 157.0,151.2 L 158.0,153.3 L 159.0,155.4 L 160.0,157.4 L 161.0,159.5 L 162.0,161.5 L 163.0,163.6 L 164.0,165.6 L 165.0,167.6 L 166.0,169.6 L 167.0,171.5 L 168.0,173.5 L 169.0,175.4 L 170.0,177.3 L 171.0,179.1 L 172.0,181.0 L 173.0,182.7 L 174.0,184.5 L 175.0,186.2 L 176.0,187.8 L 177.0,189.4 L 178.0,191.0 L 179.0,192.5 L 180.0,194.0 L 181.0,195.4 L 182.0,196.8 L 183.0,198.1 L 184.0,199.3 L 185.0,200.5 L 186.0,201.6 L 187.0,202.6 L 188.0,203.6 L 189.0,204.6 L 190.0,205.4 L 191.0,206.2 L 192.0,206.9 L 193.0,207.5 L 194.0,208.1 L 195.0,208.6 L 196.0,209.0 L 197.0,209.4 L 198.0,209.6 L 199.0,209.8 L 200.0,210.0 L 201.0,210.0 L 202.0,210.0 L 203.0,209.9 L 204.0,209.7 L 205.0,209.4 L 206.0,209.0 L 207.0,208.6 L 208.0,208.1 L 209.0,207.5 L 210.0,206.9 L 211.0,206.2 L 212.0,205.4 L 213.0,204.5 L 214.0,203.6 L 215.0,202.5 L 216.0,201.4 L 217.0,200.3 L 218.0,199.1 L 219.0,197.8 L 220.0,196.4 L 221.0,195.0 L 222.0,193.5 L 223.0,192.0 L 224.0,190.4 L 225.0,188.7 L 226.0,187.0 L 227.0,185.3 L 228.0,183.5 L 229.0,181.6 L 230.0,179.7 L 231.0,177.8 L 232.0,175.8 L 233.0,173.8 L 234.0,171.8 L 235.0,169.7 L 236.0,167.6 L 237.0,165.4 L 238.0,163.3 L 239.0,161.1 L 240.0,158.9 L 241.0,156.7 L 242.0,154.5 L 243.0,152.3 L 244.0,150.0 L 245.0,147.8 L 246.0,145.5 L 247.0,143.3 L 248.0,141.1 L 249.0,138.9 L 250.0,136.7 L 251.0,134.5 L 252.0,132.3 L 253.0,130.2 L 254.0,128.1 L 255.0,126.0 L 256.0,124.0 L 257.0,121.9 L 258.0,120.0 L 259.0,118.0 L 260.0,116.1 L 261.0,114.3 L 262.0,112.5 L 263.0,110.7 L 264.0,109.0 L 265.0,107.4 L 266.0,105.8 L 267.0,104.3 L 268.0,102.9 L 269.0,101.5 L 270.0,100.2 L 271.0,99.0 L 272.0,97.8 L 273.0,96.7 L 274.0,95.7 L 275.0,94.7 L 276.0,93.9 L 277.0,93.1 L 278.0,92.4 L 279.0,91.8 L 280.0,91.3 L 281.0,90.9 L 282.0,90.5 L 283.0,90.3 L 284.0,90.1 L 285.0,90.0 L 286.0,90.0 L 287.0,90.1 L 288.0,90.3 L 289.0,90.6 L 290.0,90.9 L 291.0,91.4 L 292.0,92.0 L 293.0,92.6 L 294.0,93.3 L 295.0,94.1 L 296.0,95.0 L 297.0,96.0 L 298.0,97.1 L 299.0,98.2 L 300.0,99.4 L 301.0,100.7 L 302.0,102.1 L 303.0,103.6 L 304.0,105.1 L 305.0,106.7 L 306.0,108.4 L 307.0,110.1 L 308.0,111.9 L 309.0,113.8 L 310.0,115.7 L 311.0,117.7 L 312.0,119.7 L 313.0,121.8 L 314.0,123.9 L 315.0,126.1 L 316.0,128.3 L 317.0,130.5 L 318.0,132.8 L 319.0,135.1 L 320.0,137.4 L 321.0,139.8 L 322.0,142.2 L 323.0,144.5 L 324.0,146.9 L 325.0,149.3 L 326.0,151.8 L 327.0,154.2 L 328.0,156.6 L 329.0,159.0 L 330.0,161.3 L 331.0,163.7 L 332.0,166.1 L 333.0,168.4 L 334.0,170.7 L 335.0,172.9 L 336.0,175.2 L 337.0,177.4 L 338.0,179.5 L 339.0,181.6 L 340.0,183.7 L 341.0,185.6 L 342.0,187.6 L 343.0,189.5 L 344.0,191.3 L 345.0,193.0 L 346.0,194.7 L 347.0,196.3 L 348.0,197.8 L 349.0,199.3 L 350.0,200.6 L 351.0,201.9 L 352.0,203.1 L 353.0,204.2 L 354.0,205.2 L 355.0,206.2 L 356.0,207.0 L 357.0,207.7 L 358.0,208.3 L 359.0,208.9 L 360.0,209.3 L 361.0,209.6 L 362.0,209.9 L 363.0,210.0 L 364.0,210.0 L 365.0,209.9 L 366.0,209.7 L 367.0,209.4 L 368.0,209.0 L 369.0,208.5 L 370.0,207.9 L 371.0,207.2 L 372.0,206.4 L 373.0,205.5 L 374.0,204.5 L 375.0,203.4 L 376.0,202.2 L 377.0,200.9 L 378.0,199.5 L 379.0,198.0 L 380.0,196.4 L 381.0,194.8 L 382.0,193.0 L 383.0,191.2 L 384.0,189.3 L 385.0,187.4 L 386.0,185.3 L 387.0,183.2 L 388.0,181.1 L 389.0,178.9 L 390.0,176.6 L 391.0,174.3 L 392.0,171.9 L 393.0,169.5 L 394.0,167.0 L 395.0,164.5 L 396.0,162.0 L 397.0,159.5 L 398.0,156.9 L 399.0,154.3 L 400.0,151.7 L 401.0,149.1 L 402.0,146.5 L 403.0,143.9 L 404.0,141.4 L 405.0,138.8 L 406.0,136.2 L 407.0,133.7 L 408.0,131.2 L 409.0,128.7 L 410.0,126.3 L 411.0,123.9 L 412.0,121.6 L 413.0,119.3 L 414.0,117.1 L 415.0,114.9 L 416.0,112.8 L 417.0,110.8 L 418.0,108.8 L 419.0,106.9 L 420.0,105.1 L 421.0,103.4 L 422.0,101.8 L 423.0,100.2 L 424.0,98.8 L 425.0,97.5 L 426.0,96.2 L 427.0,95.1 L 428.0,94.1 L 429.0,93.2 L 430.0,92.4 L 431.0,91.7 L 432.0,91.1 L 433.0,90.7 L 434.0,90.3 L 435.0,90.1 L 436.0,90.0 L 437.0,90.0 L 438.0,90.2 L 439.0,90.4 L 440.0,90.8 L 441.0,91.3 L 442.0,92.0 L 443.0,92.7 L 444.0,93.6 L 445.0,94.6 L 446.0,95.7 L 447.0,96.9 L 448.0,98.2 L 449.0,99.6 L 450.0,101.2 L 451.0,102.8 L 452.0,104.6 L 453.0,106.4 L 454.0,108.3 L 455.0,110.4 L 456.0,112.5 L 457.0,114.7 L 458.0,116.9 L 459.0,119.3 L 460.0,121.7 L 461.0,124.1 L 462.0,126.7 L 463.0,129.2 L 464.0,131.9 L 465.0,134.5 L 466.0,137.2 L 467.0,140.0 L 468.0,142.7 L 469.0,145.5 L 470.0,148.3 L 471.0,151.1 L 472.0,153.9 L 473.0,156.7 L 474.0,159.5 L 475.0,162.2 L 476.0,165.0 L 477.0,167.7 L 478.0,170.4 L 479.0,173.0 L 480.0,175.6 L 481.0,178.1 L 482.0,180.6 L 483.0,183.0 L 484.0,185.3 L 485.0,187.6 L 486.0,189.7 L 487.0,191.8 L 488.0,193.8 L 489.0,195.7 L 490.0,197.5 L 491.0,199.2 L 492.0,200.8 L 493.0,202.3 L 494.0,203.6 L 495.0,204.8 L 496.0,206.0 L 497.0,206.9 L 498.0,207.8 L 499.0,208.5 L 500.0,209.1 L 501.0,209.5 L 502.0,209.8 L 503.0,210.0 L 504.0,210.0 L 505.0,209.9 L 506.0,209.6 L 507.0,209.2 L 508.0,208.7 L 509.0,208.0 L 510.0,207.2 L 511.0,206.2 L 512.0,205.1 L 513.0,203.9 L 514.0,202.6 L 515.0,201.1 L 516.0,199.5 L 517.0,197.7 L 518.0,195.9 L 519.0,193.9 L 520.0,191.9 L 521.0,189.7 L 522.0,187.4 L 523.0,185.0 L 524.0,182.6 L 525.0,180.0 L 526.0,177.4 L 527.0,174.7 L 528.0,172.0 L 529.0,169.2 L 530.0,166.3 L 531.0,163.4 L 532.0,160.5 L 533.0,157.5 L 534.0,154.5 L 535.0,151.5 L 536.0,148.5 L 537.0,145.5 L 538.0,142.5 L 539.0,139.5 L 540.0,136.5 L 541.0,133.6 L 542.0,130.7 L 543.0,127.8 L 544.0,125.0 L 545.0,122.3 L 546.0,119.6 L 547.0,117.0 L 548.0,114.5 L 549.0,112.1 L 550.0,109.7 L 551.0,107.5 L 552.0,105.4 L 553.0,103.4 L 554.0,101.5 L 555.0,99.8 L 556.0,98.1 L 557.0,96.7 L 558.0,95.3 L 559.0,94.1 L 560.0,93.1 L 561.0,92.2 L 562.0,91.4 L 563.0,90.8 L 564.0,90.4 L 565.0,90.1 L 566.0,90.0 L 567.0,90.1 L 568.0,90.3 L 569.0,90.7 L 570.0,91.2 L 571.0,91.9 L 572.0,92.8 L 573.0,93.8 L 574.0,95.0 L 575.0,96.3 L 576.0,97.8 L 577.0,99.5 L 578.0,101.3 L 579.0,103.2 L 580.0,105.2 L 581.0,107.4 L 582.0,109.7 L 583.0,112.1 L 584.0,114.7 L 585.0,117.3 L 586.0,120.1 L 587.0,122.9 L 588.0,125.8 L 589.0,128.8 L 590.0,131.8 L 591.0,134.9 L 592.0,138.1 L 593.0,141.3 L 594.0,144.5 L 595.0,147.7 L 596.0,151.0 L 597.0,154.2 L 598.0,157.5 L 599.0,160.7 L 600.0,163.9 L 601.0,167.1 L 602.0,170.2 L 603.0,173.2 L 604.0,176.2 L 605.0,179.1 L 606.0,182.0 L 607.0,184.7 L 608.0,187.3 L 609.0,189.9 L 610.0,192.3 L 611.0,194.6 L 612.0,196.7 L 613.0,198.7 L 614.0,200.6 L 615.0,202.3 L 616.0,203.9 L 617.0,205.3 L 618.0,206.5 L 619.0,207.5 L 620.0,208.4 L 621.0,209.1 L 622.0,209.6 L 623.0,209.9 L 624.0,210.0 L 625.0,209.9 L 626.0,209.7 L 627.0,209.2 L 628.0,208.6 L 629.0,207.8 L 630.0,206.8 L 631.0,205.6 L 632.0,204.2 L 633.0,202.6 L 634.0,200.9 L 635.0,199.0 L 636.0,197.0 L 637.0,194.7 L 638.0,192.4 L 639.0,189.9 L 640.0,187.2 L 641.0,184.5 L 642.0,181.6 L 643.0,178.6 L 644.0,175.5 L 645.0,172.3 L 646.0,169.1 L 647.0,165.7 L 648.0,162.3 L 649.0,158.9 L 650.0,155.4 L 651.0,151.9 L 652.0,148.4 L 653.0,144.9 L 654.0,141.4 L 655.0,138.0 L 656.0,134.5 L 657.0,131.2 L 658.0,127.8 L 659.0,124.6 L 660.0,121.4 L 661.0,118.4 L 662.0,115.4 L 663.0,112.6 L 664.0,109.8 L 665.0,107.3 L 666.0,104.8 L 667.0,102.6 L 668.0,100.4 L 669.0,98.5 L 670.0,96.8 L 671.0,95.2 L 672.0,93.8 L 673.0,92.7 L 674.0,91.7 L 675.0,91.0 L 676.0,90.4 L 677.0,90.1 L 678.0,90.0 L 679.0,90.1 L 680.0,90.5 L 681.0,91.0 L 682.0,91.8 L 683.0,92.8 L 684.0,94.0 L 685.0,95.5 L 686.0,97.1 L 687.0,98.9 L 688.0,101.0 L 689.0,103.2 L 690.0,105.6 L 691.0,108.2 L 692.0,110.9 L 693.0,113.8 L 694.0,116.8 L 695.0,120.0 L 696.0,123.3 L 697.0,126.7 L 698.0,130.2 L 699.0,133.8 L 700.0,137.4 L 701.0,141.1 L 702.0,144.8 L 703.0,148.6 L 704.0,152.4 L 705.0,156.2 L 706.0,159.9 L 707.0,163.6 L 708.0,167.3 L 709.0,170.9 L 710.0,174.4 L 711.0,177.9 L 712.0,181.2 L 713.0,184.4 L 714.0,187.5 L 715.0,190.4 L 716.0,193.2 L 717.0,195.7 L 718.0,198.1 L 719.0,200.4 L 720.0,202.4 L 721.0,204.1 L 722.0,205.7 L 723.0,207.0 L 724.0,208.1 L 725.0,209.0 L 726.0,209.6 L 727.0,209.9 L 728.0,210.0 L 729.0,209.8 L 730.0,209.4 L 731.0,208.7 L 732.0,207.8 L 733.0,206.6 L 734.0,205.2 L 735.0,203.5 L 736.0,201.6 L 737.0,199.5 L 738.0,197.1 L 739.0,194.5 L 740.0,191.7 L 741.0,188.8 L 742.0,185.6 L 743.0,182.3 L 744.0,178.9 L 745.0,175.3 L 746.0,171.6 L 747.0,167.7 L 748.0,163.8 L 749.0,159.9 L 750.0,155.9 L 751.0,151.8 L 752.0,147.7 L 753.0,143.7 L 754.0,139.6 L 755.0,135.6 L 756.0,131.7 L 757.0,127.8 L 758.0,124.0 L 759.0,120.4 L 760.0,116.9 L 761.0,113.5 L 762.0,110.3 L 763.0,107.3 L 764.0,104.5 L 765.0,101.9 L 766.0,99.5 L 767.0,97.4 L 768.0,95.5 L 769.0,93.9 L 770.0,92.5 L 771.0,91.5 L 772.0,90.7 L 773.0,90.2 L 774.0,90.0 L 775.0,90.1 L 776.0,90.5 L 777.0,91.2 L 778.0,92.2 L 779.0,93.5 L 780.0,95.1 L 781.0,96.9 L 782.0,99.0 L 783.0,101.4 L 784.0,104.1 L 785.0,107.0 L 786.0,110.1 L 787.0,113.4 L 788.0,116.9 L 789.0,120.6 L 790.0,124.5 L 791.0,128.5 L 792.0,132.6 L 793.0,136.8 L 794.0,141.1 L 795.0,145.4 L 796.0,149.8 L 797.0,154.2 L 798.0,158.6 L 799.0,162.9 L 800.0,167.2 L 801.0,171.4 L 802.0,175.5 L 803.0,179.4 L 804.0,183.2 L 805.0,186.8 L 806.0,190.2 L 807.0,193.4 L 808.0,196.4 L 809.0,199.1 L 810.0,201.6 L 811.0,203.7 L 812.0,205.6 L 813.0,207.1 L 814.0,208.3 L 815.0,209.2 L 816.0,209.8 L 817.0,210.0 L 818.0,209.9 L 819.0,209.4 L 820.0,208.6 L 821.0,207.4 L 822.0,205.9 L 823.0,204.0 L 824.0,201.9 L 825.0,199.4 L 826.0,196.6 L 827.0,193.6 L 828.0,190.3 L 829.0,186.7 L 830.0,182.9 L 831.0,178.9 L 832.0,174.7 L 833.0,170.4 L 834.0,165.9 L 835.0,161.3 L 836.0,156.7 L 837.0,152.0 L 838.0,147.2 L 839.0,142.5 L 840.0,137.8 L 841.0,133.2 L 842.0,128.7 L 843.0,124.3 L 844.0,120.1 L 845.0,116.0 L 846.0,112.2 L 847.0,108.6 L 848.0,105.2 L 849.0,102.1 L 850.0,99.4 L 851.0,96.9 L 852.0,94.8 L 853.0,93.1 L 854.0,91.8 L 855.0,90.8 L 856.0,90.2 L 857.0,90.0 L 858.0,90.2 L 859.0,90.8 L 860.0,91.8 L 861.0,93.3 L 862.0,95.1 L 863.0,97.2 L 864.0,99.8 L 865.0,102.7 L 866.0,105.9 L 867.0,109.5 L 868.0,113.3 L 869.0,117.4 L 870.0,121.8 L 871.0,126.3 L 872.0,131.0 L 873.0,135.9 L 874.0,140.9 L 875.0,145.9 L 876.0,151.0 L 877.0,156.1 L 878.0,161.2 L 879.0,166.2 L 880.0,171.0 L 881.0,175.8 L 882.0,180.3 L 883.0,184.7 L 884.0,188.8 L 885.0,192.6 L 886.0,196.1 L 887.0,199.2 L 888.0,202.0 L 889.0,204.4 L 890.0,206.4 L 891.0,208.0 L 892.0,209.1 L 893.0,209.8 L 894.0,210.0 L 895.0,209.7 L 896.0,209.0 L 897.0,207.8 L 898.0,206.2 L 899.0,204.1 L 900.0,201.5 L 901.0,198.6 L 902.0,195.2 L 903.0,191.5 L 904.0,187.4 L 905.0,183.1 L 906.0,178.4 L 907.0,173.5 L 908.0,168.4 L 909.0,163.1 L 910.0,157.7 L 911.0,152.3 L 912.0,146.8 L 913.0,141.3 L 914.0,135.9 L 915.0,130.6 L 916.0,125.4 L 917.0,120.5 L 918.0,115.7 L 919.0,111.3 L 920.0,107.2 L 921.0,103.5 L 922.0,100.1 L 923.0,97.2 L 924.0,94.8 L 925.0,92.8 L 926.0,91.4 L 927.0,90.4 L 928.0,90.0 L 929.0,90.2 L 930.0,90.8 L 931.0,92.1 L 932.0,93.8 L 933.0,96.1 L 934.0,98.9 L 935.0,102.1 L 936.0,105.9 L 937.0,110.0 L 938.0,114.5 L 939.0,119.4 L 940.0,124.6 L 941.0,130.0 L 942.0,135.6 L 943.0,141.4 L 944.0,147.3 L 945.0,153.2 L 946.0,159.1 L 947.0,165.0 L 948.0,170.7 L 949.0,176.2 L 950.0,181.4 L 951.0,186.4 L 952.0,191.0 L 953.0,195.2 L 954.0,198.9 L 955.0,202.2 L 956.0,204.9 L 957.0,207.1 L 958.0,208.7 L 959.0,209.6 L 960.0,210.0 L 961.0,209.7 L 962.0,208.8 L 963.0,207.3 L 964.0,205.1 L 965.0,202.4 L 966.0,199.1 L 967.0,195.2 L 968.0,190.9 L 969.0,186.1 L 970.0,180.8 L 971.0,175.3 L 972.0,169.4 L 973.0,163.3 L 974.0,157.0 L 975.0,150.7 L 976.0,144.3 L 977.0,138.0 L 978.0,131.7 L 979.0,125.7 L 980.0,120.0 L 981.0,114.6 L 982.0,109.5 L 983.0,105.0 L 984.0,100.9 L 985.0,97.5 L 986.0,94.6 L 987.0,92.4 L 988.0,90.9 L 989.0,90.1 L 990.0,90.1 L 991.0,90.7 L 992.0,92.1 L 993.0,94.2 L 994.0,97.1 L 995.0,100.5 L 996.0,104.7 L 997.0,109.4 L 998.0,114.6 L 999.0,120.3 L 1000.0,126.4 L 1001.0,132.8 L 1002.0,139.5 L 1003.0,146.3 L 1004.0,153.1 L 1005.0,160.0 L 1006.0,166.7 L 1007.0,173.3 L 1008.0,179.5 L 1009.0,185.4 L 1010.0,190.8 L 1011.0,195.6 L 1012.0,199.9 L 1013.0,203.4 L 1014.0,206.3 L 1015.0,208.3 L 1016.0,209.6 L 1017.0,210.0 L 1018.0,209.6 L 1019.0,208.3 L 1020.0,206.1 L 1021.0,203.2 L 1022.0,199.5 L 1023.0,195.0 L 1024.0,189.9 L 1025.0,184.1 L 1026.0,177.9 L 1027.0,171.2 L 1028.0,164.1 L 1029.0,156.8 L 1030.0,149.5 L 1031.0,142.0 L 1032.0,134.7 L 1033.0,127.6 L 1034.0,120.9 L 1035.0,114.5 L 1036.0,108.8 L 1037.0,103.6 L 1038.0,99.2 L 1039.0,95.5 L 1040.0,92.8 L 1041.0,91.0 L 1042.0,90.1 L 1043.0,90.2 L 1044.0,91.3 L 1045.0,93.4 L 1046.0,96.4 L 1047.0,100.3 L 1048.0,105.1 L 1049.0,110.7 L 1050.0,117.0 L 1051.0,123.8 L 1052.0,131.2 L 1053.0,138.9 L 1054.0,146.8 L 1055.0,154.8 L 1056.0,162.7 L 1057.0,170.4 L 1058.0,177.8 L 1059.0,184.7 L 1060.0,191.0 L 1061.0,196.6 L 1062.0,201.3" fill="none" stroke="url(#wg)" stroke-width="4.5" stroke-linecap="round"/>
  <line x1="110.1" y1="40.0" x2="285.4" y2="40.0" stroke="#FFD34D" stroke-width="2.5"/>
  <polygon points="110.1,40.0 123.1,34.5 123.1,45.5" fill="#FFD34D"/>
  <polygon points="285.4,40.0 272.4,34.5 272.4,45.5" fill="#FFD34D"/>
  <line x1="110.1" y1="40.0" x2="110.1" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <line x1="285.4" y1="40.0" x2="285.4" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <text x="197.7" y="28.0" fill="#FFD34D" font-size="21" font-weight="700" text-anchor="middle" font-family="sans-serif">long &#955;</text>
  <line x1="774.2" y1="40.0" x2="857.0" y2="40.0" stroke="#FFD34D" stroke-width="2.5"/>
  <polygon points="774.2,40.0 787.2,34.5 787.2,45.5" fill="#FFD34D"/>
  <polygon points="857.0,40.0 844.0,34.5 844.0,45.5" fill="#FFD34D"/>
  <line x1="774.2" y1="40.0" x2="774.2" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <line x1="857.0" y1="40.0" x2="857.0" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <text x="815.6" y="28.0" fill="#FFD34D" font-size="21" font-weight="700" text-anchor="middle" font-family="sans-serif">&#955;</text>
  <line x1="989.6" y1="40.0" x2="1042.4" y2="40.0" stroke="#FFD34D" stroke-width="2.5"/>
  <polygon points="989.6,40.0 1002.6,34.5 1002.6,45.5" fill="#FFD34D"/>
  <polygon points="1042.4,40.0 1029.4,34.5 1029.4,45.5" fill="#FFD34D"/>
  <line x1="989.6" y1="40.0" x2="989.6" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <line x1="1042.4" y1="40.0" x2="1042.4" y2="84.0" stroke="#FFD34D" stroke-width="1.4" stroke-dasharray="4 4" opacity="0.8"/>
  <text x="1016.0" y="28.0" fill="#FFD34D" font-size="21" font-weight="700" text-anchor="middle" font-family="sans-serif">short &#955;</text>
  <text x="110" y="74" fill="#E9ECF7" font-size="19" text-anchor="middle" font-family="sans-serif">crest</text>
  <text x="198" y="234" fill="#E9ECF7" font-size="19" text-anchor="middle" font-family="sans-serif">trough</text>
  <text x="62" y="268" fill="#ff6b5e" font-size="20" font-weight="700" font-family="sans-serif">longer wavelength &#8212; red, ~700 nm</text>
  <text x="1062" y="268" fill="#b98cff" font-size="20" font-weight="700" text-anchor="end" font-family="sans-serif">shorter wavelength &#8212; violet, ~400 nm</text>
</svg>

<!--
PACKET: Part A, first four blanks.
THE DIAGRAM: one wave whose wavelength shrinks left to right. Crest-to-crest is ONE wavelength — the gold arrows mark three of them so students can see the distance getting smaller while the wave itself never stops being a wave.
COLOR IS NOT PAINTED ON. The stroke runs red to violet because that IS what changing wavelength does to visible light. Long (~700 nm) reads red; short (~400 nm) reads violet.
COMMON SLIP: students write "colour" for the first blank but then say wavelength IS colour. Wavelength DETERMINES colour; they are not the same thing.
ASK: "Between which two points do I measure one wavelength?" Accept crest-to-crest or trough-to-trough — any two matching points one cycle apart.
WATCH FOR: students reading the shrinking wave as the wave "slowing down" or "losing energy." In a vacuum every wavelength of light travels at the same speed; shorter wavelength means HIGHER frequency and higher energy per photon. (Beyond the assessment boundary here — offer only if asked.)
-->

---

# The Tools

<div class="pkt">PACKET PART A</div>

<div class="columns">
<div class="col">

A **prism** separates light by wavelength into a band of colors — a **spectrum** (plural: **spectra**).

A **spectroscope** (or **spectrometer**) does this *and* lets us measure exactly which wavelengths are present.

</div>
<div class="col">

<div class="key-idea">

We cannot take a star apart. Everything we know about what a star is made of comes from **analyzing its light**.

</div>

</div>
</div>

<!--
PACKET: Part A, closing Key idea box.
KEY POINT: This is the premise the whole lesson rests on. A telescope fitted with a spectroscope is the only instrument that reaches the Sun.
-->

---

<!-- _class: phase-title -->

# PART B
## Three Kinds of Spectra

---

# Three Kinds of Spectra

<div class="pkt">PACKET PART B</div>

<div class="specrow"><div class="speclabel">1. Continuous</div><div class="spec"></div></div>
<div class="specrow"><div class="speclabel">2. Absorption<br><span class="small">light through a cooler gas</span></div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">3. Emission<br><span class="small">a hot thin gas glowing</span></div><div class="spec dark"><div class="ln" style="left:3.4%;background:#8000ff"></div><div class="ln" style="left:11.3%;background:#4a3aff"></div><div class="ln" style="left:28.7%;background:#00d0ff"></div><div class="ln" style="left:85.4%;background:#ff1a00"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

- **Continuous** — every wavelength, no gaps. From a hot, glowing **solid, liquid or dense gas**
- **Absorption** — dark lines where wavelengths are <span class="fill">missing</span>
- **Emission** — bright lines on a dark background

<!--
PACKET: Part B. One blank ("missing").
THE SOURCE RULE matters and students skip it: continuous comes from a hot glowing SOLID, LIQUID or DENSE GAS — a light bulb filament, or the Sun's interior.
-->

---

# The Rule That Ties Them Together

<div class="pkt">PACKET PART B</div>

<div class="key-idea">

A gas **absorbs** and **emits** light at the **same wavelengths.**

</div>

Look at bars 2 and 3 on the previous slide. The dark lines and the bright lines sit in the **same places** — about **410, 434, 486 and 656 nm**.

<div class="warning">

That is why an emission spectrum measured in a **laboratory on Earth** can be matched against an absorption spectrum measured from a **star**.

</div>

<!--
PACKET: Part B, "The rule that ties them together."
WHY IT MATTERS: without this, the whole lab-reference method is unjustified. Students need to see that the lab and the star are showing the same physics from opposite directions.
-->

---

<!-- _class: phase-title -->

# PART C
## Every Element Has a Fingerprint

---

# Repeatable + Unique = Fingerprint

<div class="pkt">PACKET PART C</div>

Atoms of each element absorb and emit a <span class="fill">characteristic</span> set of wavelengths — belonging to that element and no other.

<div class="columns">
<div class="col">

**1. Repeatable**
Every sample of the same gas gives the <span class="fill">same</span> pattern, every time.

**2. Unique**
Different elements give <span class="fill">different</span> patterns.

</div>
<div class="col">

<div class="key-idea">

Repeatable **+** unique **=** a fingerprint we can use to identify an element — even in tiny amounts, and across enormous distances.

</div>

</div>
</div>

<div class="specrow"><div class="speclabel">Hydrogen</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Helium</div><div class="spec"><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Oxygen</div><div class="spec"><div class="ln" style="left:18.3%"></div><div class="ln" style="left:44.3%"></div><div class="ln" style="left:72.0%"></div><div class="ln" style="left:76.7%"></div></div></div>

<!--
PACKET: Part C, three blanks.
THIS IS PS4.B(4): "Atoms of each element emit and absorb characteristic frequencies of light. These characteristics allow identification of the presence of an element, even in microscopic quantities."
-->

---

# Why This Counts as Evidence

<div class="pkt">PACKET PART C</div>

<div class="vocab">

**Pattern** — a repeated, consistent relationship in data

**Empirical evidence** — evidence from observation or measurement

</div>

<div class="warning">

"The lines look like they match" is **not** evidence.

</div>

<div class="key-idea">

Citing **the wavelengths** is — hydrogen at **410, 434, 486 and 656 nm** in every sample.

</div>

<!--
PACKET: Part C, "Why this counts as evidence."
CCC #1 HS element: empirical evidence is needed to identify patterns. This is the single most-tested habit in the unit — make students say numbers out loud.
-->

---

<!-- _class: phase-title -->

# PART D
## What Is the Sun Made Of?

---

# First: Is the Sun's Spectrum Consistent?

<div class="pkt">PACKET PART D</div>

<div class="specrow"><div class="speclabel">Observation 1</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:85.4%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Observation 2</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:85.4%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Observation 3</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:85.4%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel"></div><div class="axis"><span style="left:0%">400</span><span style="left:16.7%">450</span><span style="left:33.3%">500</span><span style="left:50%">550</span><span style="left:66.7%">600</span><span style="left:83.3%">650</span><span style="left:100%">700 nm</span></div></div>

<div class="key-idea">

All three are **identical** — dark lines above the **same wavelengths** every time. The Sun's gases don't change, so the absorbed wavelengths don't either.

</div>

<!--
PACKET: Part D opening, questions 2 and 3.
WHY THIS STEP: a consistent solar spectrum is what makes the lab comparison meaningful. If the Sun's spectrum changed night to night, matching it against a reference would prove nothing.
PUSH FOR NUMBERS: "They look the same" is an impression. Naming the wavelengths makes it empirical evidence.
-->

---

# Match the Sun Against the Lab

<div class="pkt">PACKET PART D</div>

<div class="specrow"><div class="speclabel">☀️ The Sun</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:85.4%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Hydrogen</div><div class="spec"><div class="ln" style="left:3.4%"></div><div class="ln" style="left:11.3%"></div><div class="ln" style="left:28.7%"></div><div class="ln" style="left:85.4%"></div></div></div>
<div class="specrow"><div class="speclabel">Helium</div><div class="spec"><div class="ln" style="left:0.9%"></div><div class="ln" style="left:15.7%"></div><div class="ln" style="left:23.8%"></div><div class="ln" style="left:30.7%"></div><div class="ln" style="left:33.9%"></div><div class="ln" style="left:62.5%"></div><div class="ln" style="left:89.3%"></div></div></div>
<div class="specrow"><div class="speclabel">Oxygen</div><div class="spec"><div class="ln" style="left:18.3%"></div><div class="ln" style="left:44.3%"></div><div class="ln" style="left:72.0%"></div><div class="ln" style="left:76.7%"></div></div></div>

<div class="key-idea">

Every Sun line matches a **hydrogen** or **helium** line, with nothing left over. Oxygen's pattern is **not** there.

</div>

<!--
PACKET: Part D, the comparison figure.
A MATCH MUST WORK BOTH WAYS. Two failure modes: (1) matching one or two lines and stopping — ask "is there any Sun line you have NOT accounted for?"; (2) seeing one coincidental overlap and declaring a match — ask "does that element have lines the Sun does NOT have?"
-->

---

# Conclusion: The Sun's Composition

<div class="pkt">PACKET PART D</div>

<div class="key-idea">

**The Sun is composed mostly of hydrogen and helium.**

By mass: about <span class="fill">73%</span> hydrogen, about <span class="fill">25%</span> helium, and roughly 2% heavier elements.

</div>

The same method works on **any** star. Studying stars' light **spectra and brightness** tells us their composition, their motion, and their distance from Earth.

<!--
PACKET: Part D, Conclusion box. Two blanks.
ESS1.A(2) verbatim: "The study of stars' light spectra and brightness is used to identify compositional elements of stars, their movements, and their distances from Earth."
BRIDGE TO L2: that last sentence is what the Star Life Cycles lesson is built on.
-->

---

<!-- _class: phase-title -->

# PART E
## How the Sun Releases Energy

---

<!-- _class: lt2 lt3 -->

# Two Candidate Processes

<div class="pkt">PACKET PART E</div>

| | 🔥 Chemical: combustion | ☢️ Nuclear: fusion |
|---|---|---|
| **What changes** | Atoms **rearrange** into new molecules. Nuclei untouched | Nuclei **combine** into a heavier nucleus. A **new element** forms |
| **Conserved** | Atoms are conserved | Atoms are **not** — but protons + neutrons are |
| **Requires** | **Oxygen.** Makes water | No oxygen. Enormous temperature and pressure |
| **In words** | hydrogen + oxygen → water + energy | hydrogen + hydrogen → helium + energy |

<!--
PACKET: Part E, first table.
BOTH ARE REAL PROCESSES that genuinely release energy. The question is never "is combustion real" — it is whether it works at the required SCALE.
-->

---

<!-- _class: lt3 -->

# The Evidence That Decides It

<div class="pkt">PACKET PART E</div>

| Process | Energy from ONE reaction | How long the Sun could last |
|---|---|---|
| **Chemical** (combustion) | 0.000000593 MeV | <span class="fill">50,000 years</span> |
| **Nuclear** (fusion) | 17.6 MeV | <span class="fill">10 billion years</span> |

$$\frac{17.6}{0.000000593} \approx 3\times10^{7}$$

<div class="key-idea">

One fusion reaction releases about **30 million times** more energy than one combustion reaction.

</div>

<!--
PACKET: Part E, data table (two blanks) and question 6.
MAKE THEM DO THE DIVISION. The ratio is the quantitative half of the argument; the time span is the other half.
-->

---

<!-- _class: lt1 -->

# The Scale of Time

<div class="pkt">PACKET PART E</div>

| Time span | Years |
|---|---|
| Combustion could power the Sun | 50,000 |
| Humans have existed | 2,000,000 |
| **Liquid water on Earth (at least)** | **4,000,000,000** |
| Age of the Sun and solar system | 4,600,000,000 |
| **Fusion could power the Sun** | **10,000,000,000** |

Marine sedimentary rock shows oceans for nearly <span class="fill">4 billion</span> years.

<!--
PACKET: Part E, "Now the time evidence."
THE ROCK IS THE POINT. The 4-billion-year figure is physical evidence from Earth, not an assumption about the Sun. Liquid water needs steady energy, so the Sun has run at roughly this rate that whole time.
-->

---

# Conclusion: Scale Is the Reasoning

<div class="pkt">PACKET PART E</div>

<div class="key-idea">

**The Sun releases energy by nuclear fusion, not by burning.**

</div>

<div class="warning">

Combustion fails on **scale** — it would exhaust the Sun in 50,000 years, about **80,000 times** too short for 4 billion years of liquid water.

</div>

> The significance of a process depends on the **scale** at which it occurs.

<!--
PACKET: Part E, Conclusion box.
CCC #3 — Scale, Proportion and Quantity, stated as the curriculum states it.
THE "IT'S SO BIG" OBJECTION (packet question 7): the 50,000-year figure ALREADY assumes the Sun burns all of its hydrogen. Size is inside the calculation.
SPECTRUM EVIDENCE TOO (packet question 8): helium is present — the product of fusion. No oxygen and no water — which combustion requires and produces.
-->

---

<!-- _class: phase-title -->

# A Closer Look
## What nuclear fusion actually is

<!--
PLACEMENT: deliberately AFTER the scale argument. Students first establish THAT fusion powers the Sun from evidence; only then do we open up what fusion is. That order matches how the class built the claim and keeps the evidence doing the work.
ASSESSMENT BOUNDARY — SAY THIS TO STUDENTS: HS-ESS1-1 states "Assessment does not include details of the atomic and sub-atomic processes involved with the sun's nuclear fusion." These three slides are enrichment. They answer the question students always ask, and they make the Part E conclusion feel earned rather than asserted — but nothing here is on a blank in the packet and nothing here is required.
SKIP IF SHORT ON TIME. Nothing later in the deck depends on these three slides.
-->

---

# Inside One Fusion Reaction

<div class="columns">
<div class="col">

Deep in the Sun's core, **four hydrogen nuclei** (four protons) end up as **one helium nucleus.**

$$4\,^{1}\text{H} \;\rightarrow\; ^{4}\text{He} \;+\; \text{energy}$$

<div class="key-idea">

The nuclei themselves **combine**. That is what makes it *nuclear* rather than chemical — a brand new element comes out.

</div>

</div>
<div class="col">

<svg viewBox="0 0 520 330" width="100%" style="max-height:330px">
  <circle cx="60" cy="70"  r="26" fill="#FF7A7A" opacity="0.9"/>
  <circle cx="60" cy="150" r="26" fill="#FF7A7A" opacity="0.9"/>
  <circle cx="60" cy="230" r="26" fill="#FF7A7A" opacity="0.9"/>
  <circle cx="60" cy="300" r="26" fill="#FF7A7A" opacity="0.9"/>
  <text x="60" y="78"  fill="#1a1020" font-size="24" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <text x="60" y="158" fill="#1a1020" font-size="24" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <text x="60" y="238" fill="#1a1020" font-size="24" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <text x="60" y="308" fill="#1a1020" font-size="24" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <text x="112" y="40" fill="#FF7A7A" font-size="19" font-weight="700" font-family="sans-serif">4 protons</text>
  <text x="112" y="62" fill="#A9B3D2" font-size="16" font-family="sans-serif">(hydrogen nuclei)</text>
  <line x1="205" y1="185" x2="290" y2="185" stroke="#F5C542" stroke-width="4"/>
  <polygon points="302,185 286,177 286,193" fill="#F5C542"/>
  <circle cx="400" cy="160" r="54" fill="#6FD3E8" opacity="0.22" stroke="#6FD3E8" stroke-width="2"/>
  <circle cx="380" cy="142" r="19" fill="#FF7A7A"/><text x="380" y="149" fill="#1a1020" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <circle cx="420" cy="142" r="19" fill="#FF7A7A"/><text x="420" y="149" fill="#1a1020" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <circle cx="380" cy="180" r="19" fill="#A9B3D2"/><text x="380" y="187" fill="#1a1020" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">n</text>
  <circle cx="420" cy="180" r="19" fill="#A9B3D2"/><text x="420" y="187" fill="#1a1020" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">n</text>
  <text x="400" y="240" fill="#6FD3E8" font-size="21" font-weight="700" text-anchor="middle" font-family="sans-serif">helium-4 nucleus</text>
  <text x="400" y="285" fill="#F5C542" font-size="23" font-weight="700" text-anchor="middle" font-family="sans-serif">+ ENERGY</text>
</svg>

</div>
</div>

<!--
WHY TWO OF THE PROTONS BECOME NEUTRONS: in the chain, two protons each convert to a neutron, emitting a positron and a neutrino. Students do not need this — but they will notice the n's appear from nowhere, so have the one-sentence answer ready.
CONNECT BACK: this is exactly why helium shows up in the Sun's spectrum. Helium is the PRODUCT. That was one of the spectrum arguments against combustion in Part E.
NOT ASSESSED. Enrichment only.
-->

---

# Where the Energy Comes From

<div class="pkt">GOES BEYOND THE PACKET</div>

Weigh the ingredients against the product and something is missing:

<svg viewBox="0 0 1120 180" width="100%" style="max-height:178px">
  <text x="20" y="42" fill="#E9ECF7" font-size="21" font-family="sans-serif">4 hydrogen nuclei</text>
  <rect x="250" y="22" width="700" height="34" rx="5" fill="#FF7A7A" opacity="0.80"/>
  <text x="968" y="47" fill="#FF7A7A" font-size="20" font-weight="700" font-family="sans-serif">4.0291 u</text>
  <text x="20" y="112" fill="#E9ECF7" font-size="21" font-family="sans-serif">1 helium nucleus</text>
  <rect x="250" y="92" width="695" height="34" rx="5" fill="#6FD3E8" opacity="0.80"/>
  <text x="963" y="117" fill="#6FD3E8" font-size="20" font-weight="700" font-family="sans-serif">4.0015 u</text>
  <rect x="945" y="92" width="5" height="34" fill="#F5C542"/>
  <line x1="947" y1="140" x2="947" y2="156" stroke="#F5C542" stroke-width="2"/>
  <line x1="640" y1="156" x2="947" y2="156" stroke="#F5C542" stroke-width="2"/>
  <polygon points="628,156 644,148 644,164" fill="#F5C542"/>
  <text x="620" y="172" fill="#F5C542" font-size="20" font-weight="700" text-anchor="end" font-family="sans-serif">the missing 0.7% of the mass becomes the energy</text>
</svg>

<div class="columns">
<div class="col">

<div class="key-idea">

$$E = mc^2$$

$c$ is the speed of light, so $c^2$ is about $9\times10^{16}$. A **tiny** amount of mass becomes an **enormous** amount of energy.

</div>

</div>
<div class="col">

<div class="warning">

Every second the Sun fuses about **600 million tonnes** of hydrogen into about **596 million tonnes** of helium.

The missing **~4 million tonnes** leaves as energy.

</div>

</div>
</div>

<!--
THIS IS THE ANSWER to "but where does the energy actually COME from?" — the question the Part E scale argument never answers.
THE NUMBERS CHECK OUT: luminosity 3.83x10^26 W, so m = E/c^2 = 3.83x10^26 / 9x10^16 = 4.3x10^9 kg/s, about 4 million tonnes per second. At 0.7% conversion that needs ~600 million tonnes of hydrogen per second.
MASS UNITS: u = atomic mass unit. If students have not met it, say "a unit for weighing single atoms" and move on — the POINT is that the bars are almost but not quite the same length.
CONNECT TO L2: this 0.7% is why a star's fuel is finite, and why mass controls lifespan.
NOT ASSESSED. Enrichment only.
-->

---

# Why Fusion Needs a Star

<div class="pkt">GOES BEYOND THE PACKET</div>

<div class="columns">
<div class="col">

Protons are **all positively charged** — so they **repel** each other. The closer they get, the harder they push apart.

To fuse, they must be driven close enough for the **strong nuclear force** to take over.

<div class="key-idea">

That takes crushing **pressure** and extreme **temperature** — conditions only a star's **core** can supply.

</div>

</div>
<div class="col">

<svg viewBox="0 0 520 300" width="100%" style="max-height:290px">
  <text x="260" y="24" fill="#A9B3D2" font-size="18" text-anchor="middle" font-family="sans-serif">ordinary conditions &#8212; they bounce apart</text>
  <circle cx="175" cy="70" r="24" fill="#FF7A7A"/><text x="175" y="78" fill="#1a1020" font-size="22" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <circle cx="345" cy="70" r="24" fill="#FF7A7A"/><text x="345" y="78" fill="#1a1020" font-size="22" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <line x1="238" y1="70" x2="208" y2="70" stroke="#FF9245" stroke-width="3"/><polygon points="200,70 214,63 214,77" fill="#FF9245"/>
  <line x1="282" y1="70" x2="312" y2="70" stroke="#FF9245" stroke-width="3"/><polygon points="320,70 306,63 306,77" fill="#FF9245"/>
  <line x1="40" y1="118" x2="480" y2="118" stroke="#2A3358" stroke-width="2"/>
  <text x="260" y="152" fill="#F5C542" font-size="18" font-weight="700" text-anchor="middle" font-family="sans-serif">15 million K and crushing pressure</text>
  <circle cx="222" cy="206" r="24" fill="#FF7A7A"/><text x="222" y="214" fill="#1a1020" font-size="22" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <circle cx="298" cy="206" r="24" fill="#FF7A7A"/><text x="298" y="214" fill="#1a1020" font-size="22" font-weight="700" text-anchor="middle" font-family="sans-serif">+</text>
  <line x1="130" y1="206" x2="186" y2="206" stroke="#F5C542" stroke-width="4"/><polygon points="196,206 180,198 180,214" fill="#F5C542"/>
  <line x1="390" y1="206" x2="334" y2="206" stroke="#F5C542" stroke-width="4"/><polygon points="324,206 340,198 340,214" fill="#F5C542"/>
  <circle cx="260" cy="206" r="46" fill="none" stroke="#6FD3E8" stroke-width="2" stroke-dasharray="6 5" opacity="0.8"/>
  <text x="260" y="278" fill="#6FD3E8" font-size="19" font-weight="700" text-anchor="middle" font-family="sans-serif">close enough to fuse</text>
</svg>

</div>
</div>

<div class="warning">

This is why fusion happens **only in the core** — and why **gravity** is what makes a star work. Gravity supplies the squeeze.

</div>

<!--
THE CAUSAL LOOP WORTH NAMING: gravity creates the conditions for fusion, and fusion pushes back against gravity. That balance is EQUILIBRIUM — the central idea of the whole Star Life Cycles lesson. These slides set it up.
SUN'S CORE: about 15 million K, and roughly 150 g/cm3 — denser than lead, but still a gas because it is fully ionised plasma.
STRONG NUCLEAR FORCE: enormously strong but only over a tiny range. Protons have to be nearly touching before it beats the electrical repulsion. One sentence is plenty.
DO NOT go into quantum tunnelling, the Coulomb barrier by name, or the p-p chain steps. Well past the boundary.
NOT ASSESSED. Enrichment only.
-->

---

<!-- _class: phase-title -->

# PART F
## From the Core to Earth

---

# The Path Energy Takes

<div class="pkt">PACKET PART F</div>

<div class="columns">
<div class="col">

Fusion happens only in the <span class="fill">core</span>.

☢️ **Core** — fusion releases energy
↓
**Radiative zone** — energy travels as light, absorbed and re-emitted
↓
**Convective zone** — hot gas rises, cooler sinks
↓
**Surface** — light escapes, radiating in <span class="fill">all directions</span>
↓
🌍 **Earth** — arrives about <span class="fill">8</span> minutes later

</div>
<div class="col">

<div class="key-idea">

Energy leaves the Sun as **electromagnetic radiation** — light.

</div>

<div class="vocab">

**Radiation** — energy transfer by electromagnetic waves; the only mechanism that crosses the <span class="fill">vacuum</span> of space

</div>

**This is the light you analyzed.** The spectrum that told us hydrogen and helium *is* the Sun's energy arriving.

</div>
</div>

<!--
PACKET: Part F, four blanks.
HS-ESS1-1 emphasis: "the energy transfer mechanisms that allow energy from nuclear fusion in the sun's core to reach Earth." PS3.D(1) says the same.
CLOSE THE LOOP OUT LOUD. Students spent two days on spectra without realising the light IS the energy transfer.
WHY NOT CONDUCTION OR CONVECTION (packet question 9): both need matter. Space is a vacuum.
-->

---

<!-- _class: phase-title -->

# PART G
## The Sun's Life Span

---

# What Happens as the Sun Ages

<div class="pkt">PACKET PART G</div>

$$\text{hydrogen} + \text{hydrogen} \rightarrow \text{helium} + \text{energy}$$

<div class="columns">
<div class="col">

This reaction is **irreversible** — helium does not break back into hydrogen.

- Hydrogen is the **reactant** → amount <span class="fill">decreases</span>
- Helium is the **product** → amount <span class="fill">increases</span>

</div>
<div class="col">

<div class="key-idea">

**ESS1.A:** The Sun is changing and will burn out over a life span of about <span class="fill">10 billion</span> years.

It is currently about <span class="fill">4.6 billion</span> years old — roughly **halfway**.

</div>

</div>
</div>

<div class="warning">

"Burn out" is figurative. **No combustion is involved** — the Sun runs low on *fusion fuel*.

</div>

<!--
PACKET: Part G, four blanks.
THE WORDING NOTE MATTERS. Students have just spent a whole Part ruling out burning; the DCI's own phrase "burn out" undoes that if you leave it unexamined.
PACKET QUESTIONS 10 AND 11 ask why stability over time matters, and what happens if output changes. Work those together — they are the bridge to the anchor phenomenon.
-->

---

<!-- _class: phase-title -->

# PART H
## Vocabulary

---

<!-- _class: lefttable compact -->

# Vocabulary (1 of 2)

| Term | Definition |
|---|---|
| **Wavelength** | Distance between wave peaks; determines color. Measured in nm |
| **Spectrum** (pl. spectra) | The band of wavelengths light separates into |
| **Continuous spectrum** | All wavelengths present, no gaps |
| **Absorption spectrum** | Continuous spectrum with dark lines where a cooler gas absorbed specific wavelengths |
| **Emission spectrum** | Bright lines on a dark background from a hot, thin glowing gas — at the same wavelengths it absorbs |
| **Spectroscope / spectrometer** | Instrument that separates light so wavelengths can be measured |
| **Empirical evidence** | Evidence obtained from observation or measurement |

---

<!-- _class: lefttable -->

# Vocabulary (2 of 2)

| Term | Definition |
|---|---|
| **Pattern** | A repeated, consistent relationship in data. Requires empirical evidence |
| **Nuclear fusion** | Light nuclei combining into a heavier nucleus, releasing energy and forming a new element |
| **Combustion** | A chemical reaction of fuel with oxygen. Atoms rearrange; nuclei unchanged |
| **Radiation** | Energy transfer by electromagnetic waves; the only mechanism that crosses a vacuum |
| **Scale** | The size, amount, or time span at which something occurs |
| **Habitable** | Suitable for life |
| **Exoplanet** | A planet orbiting a star other than our Sun |

---

# The Four Statements to Know Cold

<div class="key-idea">

1. Atoms of each element absorb and emit **characteristic** wavelengths — so we can identify an element in tiny quantities and at great distance.

2. The study of stars' light **spectra and brightness** tells us what stars are made of, how they move, and how far away they are.

3. **Nuclear fusion** in the Sun's core releases the energy that ultimately reaches Earth as **radiation**.

4. The Sun is changing and will burn out over a life span of about **10 billion years**.

</div>

<!--
PACKET: Part H closing box.
THESE FOUR ARE THE DCIs for this lesson, in student language: PS4.B(4), ESS1.A(2), PS3.D(1), ESS1.A(1). If a student remembers nothing else, these four carry the assessable content.
UP NEXT: Star Life Cycles — does the exoplanet have a star like our Sun?
-->
