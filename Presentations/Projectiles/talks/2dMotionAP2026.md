---
title: 2D Motion
marp: true
theme: trajectory
paginate: true
math: mathjax
---

<!--- _class: title-slide --->

# Two Dimensional Motion 

## Physics 

### Maple Hill High School 2025-26

---

<!--- _class: phase-title --->

# Free Fall Motion

---


# Free Fall 

## An object in **free fall** experiences *only* the force of gravity.

* This means that it accelerates at $g$, which is referred to as "_acceleration due to gravity_" or "_gravitational field strength_"
* Units N/kg and m/s/s are the ***same***
* We ignore air resistance unless a problem tells us not to

---


<iframe width="1150" height="715" src="https://www.youtube.com/embed/E43-CfukEgs?si=8DZF93LgcQA3LuZy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

# How Big Is $g$?

## Near the surface of the Earth, $g = 9.8 \text{ m/s/s}$

### In AP Physics we will use $\boxed{g = 10 \text{ m/s/s}}$


---


# How Big Is $g$?

## Near the surface of the Earth, $g = 9.8 \text{ m/s/s}$

### In AP Physics we will use $\boxed{g = 10 \text{ m/s/s}}$

<div class="key-idea">

**$g$ is a magnitude, so it is always positive.** The *sign* of the acceleration comes from the direction **you** chose as positive — not from $g$ itself.

</div>

---

# Pick a Positive Direction First

<div class='columns'>
<div class='col'>

### If **up** is positive

* $a = -g = -10 \text{ m/s/s}$
* Rising $\rightarrow v$ is $+$
* Falling $\rightarrow v$ is $-$
* Landing below the start $\rightarrow \Delta y$ is $-$

</div>
<div class='col'>

### If **down** is positive

* Falling $\rightarrow v$ is $+$
* $a = +g = +10 \text{ m/s/s}$
* Rising $\rightarrow v$ is $-$
* Landing below the start $\rightarrow \Delta y$ is $+$

</div>
</div>

<div class="warning">

**Both choices give the same physics.** Pick one, write it on your paper, and keep it for the whole problem. Most free fall mistakes are sign errors from switching halfway through.

</div>

---

# Free Fall Facts
## If an object is _dropped_, $v_0 = 0$ 

---

# Free Fall Facts
## If an object is projected upwards it will slow down as it rises. The y-velocity will be zero at its highest point, or peak.

### You can treat $v = 0$ at the peak

---

<!--- _class: compact --->

# Free Fall Facts

<div class='columns cols-1-2'>
<div class='col'>

## Up and down are mirror images

An object projected upward returns to its **initial height** with a velocity **equal in magnitude** and **opposite in direction**.

A ball thrown up at $+30$ m/s passes its launch height again at $-30$ m/s.

<div class="small">

Up is positive &nbsp;•&nbsp; $g = 10$ m/s/s

</div>

</div>
<div class='col'>

<svg viewBox="0 0 560 390" width="100%" style="max-height:430px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <polygon points="80,54 284,180 80,180" fill="var(--aurora, #66800B)" opacity="0.20"/>
  <polygon points="284,180 488,306 488,180" fill="var(--coral, #AF3029)" opacity="0.20"/>
  <line x1="80" y1="54"  x2="520" y2="54"  stroke="var(--ink-3, #B7B5AC)" stroke-opacity="0.55" stroke-width="1"/>
  <line x1="80" y1="306" x2="520" y2="306" stroke="var(--ink-3, #B7B5AC)" stroke-opacity="0.55" stroke-width="1"/>
  <line x1="284" y1="44" x2="284" y2="334" stroke="var(--solar, #AD8301)" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="488" y1="44" x2="488" y2="334" stroke="var(--ink-3, #B7B5AC)" stroke-opacity="0.75" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="80" y1="40" x2="80" y2="334" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="56" y1="180" x2="528" y2="180" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="80" y1="54" x2="488" y2="306" stroke="var(--star, #205EA6)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="80"  cy="54"  r="6" fill="var(--star, #205EA6)"/>
  <circle cx="284" cy="180" r="6" fill="var(--solar, #AD8301)"/>
  <circle cx="488" cy="306" r="6" fill="var(--star, #205EA6)"/>
  <text x="66" y="60"  text-anchor="end" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">+30</text>
  <text x="66" y="187" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="19">0</text>
  <text x="66" y="313" text-anchor="end" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">&#8722;30</text>
  <text x="284" y="356" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17">3.0 s</text>
  <text x="488" y="356" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">6.0 s</text>
  <text x="26" y="196" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" transform="rotate(-90 26 196)">velocity (m/s)</text>
  <text x="300" y="382" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">time (s)</text>
  <text x="142" y="132" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="16">area = +45 m</text>
  <text x="142" y="152" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="14" opacity="0.8">rising</text>
  <text x="418" y="228" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="16">area = &#8722;45 m</text>
  <text x="418" y="248" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="14" opacity="0.8">falling</text>
  <text x="302" y="98"  fill="var(--star, #205EA6)" font-size="16">slope = <tspan font-style="italic">a</tspan> = &#8722;10 m/s&#178;</text>
  <text x="302" y="144" fill="var(--solar, #AD8301)" font-size="16"><tspan font-style="italic">v</tspan> = 0 at the peak</text>
</svg>

</div>
</div>

---

<!--- _class: compact --->

# Two Graphs, One Throw

<div class='columns'>
<div class='col'>

<svg viewBox="0 0 420 345" width="100%" style="max-height:290px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="60" y1="65" x2="380" y2="65" stroke="var(--ink-3, #B7B5AC)" stroke-opacity="0.55" stroke-width="1"/>
  <line x1="210" y1="50" x2="210" y2="290" stroke="var(--solar, #AD8301)" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="60" y1="45" x2="60" y2="290" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="40" y1="265" x2="390" y2="265" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <path d="M 60 265 Q 210 -135 360 265" fill="none" stroke="var(--nebula, #5E409D)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="210" cy="65" r="6" fill="var(--solar, #AD8301)"/>
  <text x="50" y="71"  text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">45</text>
  <text x="50" y="272" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">0</text>
  <text x="210" y="288" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="16">3.0</text>
  <text x="360" y="288" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">6.0</text>
  <text x="22" y="165" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" transform="rotate(-90 22 165)">position (m)</text>
  <text x="215" y="320" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">time (s)</text>
  <text x="215" y="340" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="17" font-weight="600">position vs. time</text>
</svg>

</div>
<div class='col'>

<svg viewBox="0 0 420 345" width="100%" style="max-height:290px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <polygon points="60,65 210,165 60,165" fill="var(--aurora, #66800B)" opacity="0.20"/>
  <polygon points="210,165 360,265 360,165" fill="var(--coral, #AF3029)" opacity="0.20"/>
  <line x1="210" y1="50" x2="210" y2="290" stroke="var(--solar, #AD8301)" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="6 5"/>
  <line x1="60" y1="45" x2="60" y2="290" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="40" y1="165" x2="390" y2="165" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="60" y1="65" x2="360" y2="265" stroke="var(--star, #205EA6)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="210" cy="165" r="6" fill="var(--solar, #AD8301)"/>
  <text x="50" y="71"  text-anchor="end" fill="var(--aurora, #66800B)" font-size="17">+30</text>
  <text x="50" y="172" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">0</text>
  <text x="50" y="272" text-anchor="end" fill="var(--coral, #AF3029)" font-size="17">&#8722;30</text>
  <text x="210" y="288" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="16">3.0</text>
  <text x="360" y="288" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">6.0</text>
  <text x="22" y="165" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" transform="rotate(-90 22 165)">velocity (m/s)</text>
  <text x="215" y="320" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">time (s)</text>
  <text x="215" y="340" text-anchor="middle" fill="var(--star, #205EA6)" font-size="17" font-weight="600">velocity vs. time</text>
</svg>

</div>
</div>

<div class="question">

**Discuss** — The position graph is curved but the velocity graph is straight. What does that tell you about the acceleration? Where on the position graph is the velocity zero?

</div>

---
<!--- _class: compact --->

# The Cross Diagram

<div class='columns cols-1-2'>
<div class='col'>

Five variables describe one stage of constant-acceleration motion. The cross puts them where you can see how they relate.

- **Top row** is space, **bottom row** is time
- **Left column** is the start, **right column** is the end
- **Middle column** is what *changes*

<div class="small">

After Sinkovits, *Phys. Teach.* **60**, 744 (2022)

</div>

</div>
<div class='col'>

<svg viewBox="0 0 560 330" width="100%" style="max-height:300px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="280" y1="40" x2="280" y2="300" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="5 6"/>
  <line x1="60" y1="170" x2="500" y2="170" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="5 6"/>
  <text x="280" y="78" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="32" font-weight="600">&#916;y</text>
  <text x="110" y="182" text-anchor="middle" fill="var(--star, #205EA6)" font-size="32" font-weight="600">v<tspan font-size="21" dy="7">0</tspan></text>
  <text x="280" y="182" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="32" font-weight="600">a</text>
  <text x="455" y="182" text-anchor="middle" fill="var(--star, #205EA6)" font-size="32" font-weight="600">v</text>
  <text x="280" y="288" text-anchor="middle" fill="var(--plasma, #BC5215)" font-size="32" font-weight="600">&#916;t</text>
  <text x="280" y="34" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">space</text>
  <text x="280" y="316" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">time</text>
  <text x="110" y="222" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">start</text>
  <text x="455" y="222" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">end</text>
  <text x="280" y="222" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">the change</text>
</svg>

</div>
</div>

---

<!--- _class: compact --->

# Five Boxes, Five Equations

<svg viewBox="0 0 1180 300" width="100%" style="max-height:330px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="21">
  <g fill="var(--ink, #100F0F)" text-anchor="middle">
  <rect x="18" y="26" width="138" height="152" rx="7" fill="none" stroke="var(--star, #205EA6)" stroke-width="3"/>
  <text x="110" y="62" fill="var(--nebula, #5E409D)">&#916;y</text>
  <text x="42"  y="112" fill="var(--star, #205EA6)">v<tspan font-size="14" dy="5">0</tspan></text>
  <text x="110" y="112" fill="var(--coral, #AF3029)">a</text>
  <text x="180" y="112" fill="var(--ink-3, #B7B5AC)">v</text>
  <text x="110" y="162" fill="var(--plasma, #BC5215)">&#916;t</text>
  <text x="110" y="222" font-size="18" fill="var(--muted, #6F6E69)">left</text>
  <text x="110" y="262" font-size="19">&#916;y = v<tspan font-size="13" dy="4">0</tspan><tspan dy="-4">&#916;t + ½a&#916;t²</tspan></text>
  <rect x="268" y="26" width="138" height="152" rx="7" fill="none" stroke="var(--star, #205EA6)" stroke-width="3"/>
  <text x="337" y="62" fill="var(--nebula, #5E409D)">&#916;y</text>
  <text x="268" y="112" fill="var(--ink-3, #B7B5AC)">v<tspan font-size="14" dy="5">0</tspan></text>
  <text x="337" y="112" fill="var(--coral, #AF3029)">a</text>
  <text x="406" y="112" fill="var(--star, #205EA6)">v</text>
  <text x="337" y="162" fill="var(--plasma, #BC5215)">&#916;t</text>
  <text x="337" y="222" font-size="18" fill="var(--muted, #6F6E69)">right</text>
  <text x="337" y="262" font-size="19">&#916;y = v&#916;t &#8722; ½a&#916;t²</text>
  <rect x="472" y="36" width="178" height="92" rx="7" fill="none" stroke="var(--star, #205EA6)" stroke-width="3"/>
  <text x="561" y="62" fill="var(--nebula, #5E409D)">&#916;y</text>
  <text x="492" y="112" fill="var(--star, #205EA6)">v<tspan font-size="14" dy="5">0</tspan></text>
  <text x="561" y="112" fill="var(--coral, #AF3029)">a</text>
  <text x="630" y="112" fill="var(--star, #205EA6)">v</text>
  <text x="561" y="162" fill="var(--ink-3, #B7B5AC)">&#916;t</text>
  <text x="561" y="222" font-size="18" fill="var(--muted, #6F6E69)">top</text>
  <text x="561" y="262" font-size="19">v² &#8722; v<tspan font-size="13" dy="4">0</tspan><tspan dy="-4">² = 2a&#916;y</tspan></text>
  <rect x="696" y="86" width="178" height="92" rx="7" fill="none" stroke="var(--star, #205EA6)" stroke-width="3"/>
  <text x="785" y="62" fill="var(--ink-3, #B7B5AC)">&#916;y</text>
  <text x="716" y="112" fill="var(--star, #205EA6)">v<tspan font-size="14" dy="5">0</tspan></text>
  <text x="785" y="112" fill="var(--coral, #AF3029)">a</text>
  <text x="854" y="112" fill="var(--star, #205EA6)">v</text>
  <text x="785" y="162" fill="var(--plasma, #BC5215)">&#916;t</text>
  <text x="785" y="222" font-size="18" fill="var(--muted, #6F6E69)">bottom</text>
  <text x="785" y="262" font-size="19">v &#8722; v<tspan font-size="13" dy="4">0</tspan><tspan dy="-4"> = a&#916;t</tspan></text>
  <rect x="920" y="26" width="222" height="152" rx="70" fill="none" stroke="var(--star, #205EA6)" stroke-width="3"/>
  <text x="1031" y="62" fill="var(--nebula, #5E409D)">&#916;y</text>
  <text x="950" y="112" fill="var(--star, #205EA6)">v<tspan font-size="14" dy="5">0</tspan></text>
  <text x="1031" y="112" fill="var(--ink-3, #B7B5AC)">a</text>
  <text x="1112" y="112" fill="var(--star, #205EA6)">v</text>
  <text x="1031" y="162" fill="var(--plasma, #BC5215)">&#916;t</text>
  <line x1="1012" y1="98" x2="1050" y2="124" stroke="var(--ink-3, #B7B5AC)" stroke-width="2.5"/>
  <text x="1031" y="222" font-size="18" fill="var(--muted, #6F6E69)">outside (no a)</text>
  <text x="1031" y="262" font-size="19">&#916;y = ½(v<tspan font-size="13" dy="4">0</tspan><tspan dy="-4"> + v)&#916;t</tspan></text>
  </g>
</svg>

<div class="key-idea">

**How to use it.** Underline every known. Star the unknown you want. Then find the box that holds **all your knowns plus exactly one unknown** — that box *is* the equation to use.

</div>

---

# Problem-Solving Process

1) Draw a diagram/picture of physical situation
2) Sketch Physics motion graphs (XT & VT)
3) Fill out cross diagram with givens and unknowns 
    - (choose a positive direction, then set $a = \pm 10 \text{ m/s/s}$ to match)
4) Identify equation with cross diagram
5) Substitute and solve

---

# Worked Examples
## Free Fall with $g = 10 \text{ m/s/s}$

<div class="steps">

**Our toolkit:**  $\ \Delta y = v_0 t + \tfrac12 a t^2 \qquad v = v_0 + a t \qquad v^2 = v_0^2 + 2 a \Delta y$

</div>

---

### A ball is dropped from rest from $h = 20.0\ \mathrm{m}$. Up is positive. Find:
- time to impact
- impact velocity (with sign)

<br><br><br><br><br><br><br><br><br><br>

<!--
Reveal:
- $v_0 = 0$, $a = -10$, $\Delta y = -20$
- $-20 = \tfrac12(-10)t^2 \Rightarrow t^2 = 4 \Rightarrow t = 2.0\ \mathrm{s}$
- $v = at = (-10)(2.0) = -20\ \mathrm{m/s}$ (20 m/s downward)
-->

---

### A rock is thrown straight up at $v_0 = 12.0\ \mathrm{m/s}$ from ground level.

- Time to the top. Hint: $v = 0$ at peak.
- Height at the top.

<br><br><br><br><br><br><br><br><br><br>

<!--
Reveal:
- $t_{\text{top}} = \dfrac{0 - v_0}{-g} = \dfrac{12.0}{10} = 1.2\ \mathrm{s}$
- $y_{\max} = v_0 t + \tfrac12 a t^2 = 12(1.2) - 5(1.2)^2 = 7.2\ \mathrm{m}$
- Check with $y_{\max} = \dfrac{v_0^2}{2g} = \dfrac{144}{20} = 7.2\ \mathrm{m}$
-->

---

### A ball is thrown _downward_ at $5 \text{ m/s}$ from a height of $10 \text{ m}$.

- How long does it take to reach the ground?


<br><br><br><br><br><br><br><br><br><br>

---

### Drop from $\Delta y = 45.0\ \mathrm{m}$. Down is positive. _What is the impact velocity?_

Template:
- $v^2 = v_0^2 + 2 a \Delta y$

<br><br><br><br><br><br><br><br><br><br>

<!--
Reveal:
- $v_0 = 0$, $a = +10$, $\Delta y = +45.0$
- $v^2 = 2(10)(45.0) = 900 \Rightarrow v = +30\ \mathrm{m/s}$ (downward)
- Notice: no time needed. This equation skips $t$ entirely.
-->

---

### Compare: does a head start change the fall?

### Case A (drop): $v_0 = 0$ from $h = 10.0\ \mathrm{m}$
### Case B (throw down): $v_0 = 5.0\ \mathrm{m/s}$ from $h = 10.0\ \mathrm{m}$

<br><br><br><br><br><br><br><br>

<!--
Down is positive, $a = +10$, $\Delta y = +10.0$ for both.
- A: $10 = \tfrac12 (10) t^2 \Rightarrow t^2 = 2 \Rightarrow t \approx 1.41\ \mathrm{s}$
- B: $10 = 5t + 5t^2 \Rightarrow t^2 + t - 2 = 0 \Rightarrow (t+2)(t-1) = 0 \Rightarrow t = 1.0\ \mathrm{s}$

Prompt: What stayed the same? What changed? (Same $a$, same $\Delta y$ — only $v_0$ differs.)
-->

---

# Error Analysis — Sign Convention

<div class="warning">

**A student writes:** up is positive, $a = +10$, for a ball thrown upward at $v_0 = 8.0\ \mathrm{m/s}$ — and concludes the ball speeds up on the way up.

</div>

**Diagnose:** with up positive, $a = -g = -10$. Velocity and acceleration point in *opposite* directions, so the ball must slow down as it rises.

**Correct the peak time:**
- $v = v_0 + a t = 0 \Rightarrow t = \dfrac{-v_0}{a} = \dfrac{-8.0}{-10} = 0.80\ \mathrm{s}$

---

# Quick Checks Before You Commit

- Which equation matches your knowns and unknowns?
- Are all signs consistent with the positive direction you chose?
- Does the magnitude make physical sense? Is the unit right?
- If the object went up and came back, is your time about double the time to the peak?

---



# Heads Up: CalcPad Uses $g = 9.8$

<div class="warning">

**Physics Classroom auto-grades with $g = 9.8\ \mathrm{m/s/s}$.** Use **9.8** on the CalcPad sets so your answers are accepted. Use **10** on AP-style problems, quizzes and the exam.

</div>

<div class="small">

This is the one place in the unit where the two numbers matter. Everywhere else, 10 is close enough and much faster without a calculator.

</div>

---

---

<!--- _class: phase-title --->

# Vectors  <!--fit--->

### :arrow_upper_left: ↗️ ↘️ ⬆️ ⬇️ <!--fit--->



---

# Vector Quantities:

### A *<u>vector</u>* is a quantity with both **magnitude** (size) and **direction**.

#### Examples:

  - The child was displaced 9 meters North.
  - The car has a velocity of 10 meters per second East
  - $\vec{F}$, $\vec{p}$, $\vec{a}$, $\vec{v}$, $\Delta \vec{x}$, etc

---

# Scalar Quantities

### A *<u>scalar</u>* is a quantity with just **magnitude**.


#### Examples

  - The child traveled a distance of 12 meters
  - The car is moving 20 miles per hour
  - The frog has mass of 0.5 kg.
  - $m$, $t$, $r$, etc


---

# Representing Vectors 

<svg viewBox="0 0 760 440" width="100%" style="max-height:430px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="103" y1="34" x2="103" y2="406"/>
    <line x1="156.2" y1="34" x2="156.2" y2="406"/>
    <line x1="209.3" y1="34" x2="209.3" y2="406"/>
    <line x1="262.5" y1="34" x2="262.5" y2="406"/>
    <line x1="315.6" y1="34" x2="315.6" y2="406"/>
    <line x1="368.7" y1="34" x2="368.7" y2="406"/>
    <line x1="421.9" y1="34" x2="421.9" y2="406"/>
    <line x1="475" y1="34" x2="475" y2="406"/>
    <line x1="528.2" y1="34" x2="528.2" y2="406"/>
    <line x1="581.3" y1="34" x2="581.3" y2="406"/>
    <line x1="634.5" y1="34" x2="634.5" y2="406"/>
    <line x1="103" y1="406" x2="677" y2="406"/>
    <line x1="103" y1="352.9" x2="677" y2="352.9"/>
    <line x1="103" y1="299.7" x2="677" y2="299.7"/>
    <line x1="103" y1="246.6" x2="677" y2="246.6"/>
    <line x1="103" y1="193.4" x2="677" y2="193.4"/>
    <line x1="103" y1="140.3" x2="677" y2="140.3"/>
    <line x1="103" y1="87.1" x2="677" y2="87.1"/>
    <line x1="103" y1="34" x2="677" y2="34"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="145.5" y1="34" x2="145.5" y2="406"/>
    <line x1="251.8" y1="34" x2="251.8" y2="406"/>
    <line x1="358.1" y1="34" x2="358.1" y2="406"/>
    <line x1="464.4" y1="34" x2="464.4" y2="406"/>
    <line x1="570.7" y1="34" x2="570.7" y2="406"/>
    <line x1="677" y1="34" x2="677" y2="406"/>
    <line x1="103" y1="352.9" x2="677" y2="352.9"/>
    <line x1="103" y1="246.6" x2="677" y2="246.6"/>
    <line x1="103" y1="140.3" x2="677" y2="140.3"/>
    <line x1="103" y1="34" x2="677" y2="34"/>
  </g>
  <line x1="103" y1="352.9" x2="681.6" y2="352.9" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="691,352.9 680,357.9 680,347.8" fill="var(--muted, #6F6E69)"/>
  <line x1="145.5" y1="406" x2="145.5" y2="29.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="145.5,20 150.6,31 140.5,31" fill="var(--muted, #6F6E69)"/>
  <line x1="145.5" y1="352.9" x2="100.4" y2="352.9" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="91,352.9 102,347.8 102,357.9" fill="var(--muted, #6F6E69)"/>
  <line x1="145.5" y1="352.9" x2="145.5" y2="408.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="145.5,418 140.5,407 150.6,407" fill="var(--muted, #6F6E69)"/>
  <line x1="251.8" y1="346.9" x2="251.8" y2="358.9" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="251.8" y="377.9" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="358.1" y1="346.9" x2="358.1" y2="358.9" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="358.1" y="377.9" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="464.4" y1="346.9" x2="464.4" y2="358.9" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="464.4" y="377.9" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">30</text>
  <line x1="570.7" y1="346.9" x2="570.7" y2="358.9" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="570.7" y="377.9" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">40</text>
  <line x1="139.5" y1="246.6" x2="151.5" y2="246.6" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="133.5" y="252.6" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="139.5" y1="140.3" x2="151.5" y2="140.3" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="133.5" y="146.3" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <text x="703" y="358.9" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="147.5" y="10" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="145.5" y1="352.9" x2="612.2" y2="93.6" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="623.8,87.1 613.7,101 606.7,88.4" fill="var(--star, #205EA6)"/>
  <circle cx="145.5" cy="352.9" r="7" fill="var(--muted, #6F6E69)"/>
  <rect x="324.3" y="152.2" width="141.2" height="34.6" rx="17.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="394.9" y="177.8" text-anchor="middle" fill="var(--star, #205EA6)" font-size="22" font-weight="600">|<tspan font-style="italic">a</tspan>| = 51.5</text>
</svg>

---

# Representing Vectors

<div class='columns'>
<div class='col'>

- a scale is clearly listed
- a vector arrow (with arrowhead) is drawn in a specified direction. The vector arrow has a head and a tail.
- the magnitude and direction of the vector is clearly labeled. 
    - The magnitude is **20 m** and the direction is (**30 degrees _West of North_**).

</div>
 
<div class='col'>

<svg viewBox="0 0 520 430" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="70" y1="300" x2="460" y2="300" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.8"/>
  <line x1="300" y1="60" x2="300" y2="390" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.8"/>
  <path d="M 300 214 A 86 86 0 0 0 257 225.5" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="266" y="196" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="22" font-weight="600">30&#176;</text>
  <line x1="300" y1="300" x2="200.6" y2="127.8" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="192.5,113.8 209.6,125.9 194.4,134.6" fill="var(--star, #205EA6)"/>
  <text x="116" y="182" text-anchor="middle" fill="var(--star, #205EA6)" font-size="23" font-weight="600">d = 20 m</text>
  <text x="360" y="86" text-anchor="start" fill="var(--muted, #6F6E69)" font-size="17">north</text>
  <text x="450" y="326" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">east</text>
  <rect x="75.2" y="19.1" width="229.7" height="33.6" rx="16.8" fill="var(--muted, #6F6E69)" opacity="0.12"/>
  <text x="190" y="44" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="21" font-weight="600">SCALE:  1 cm = 4 m</text>
  <text x="260" y="414" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="18">20 m, 30&#176; west of north</text>
</svg>

</div>
</div>

---

# Vector Direction Conventions

1) expressed as an angle of rotation about its "tail"
    * **40 degrees North of West** (meaning a vector pointing West has been rotated 40 degrees towards the northerly direction) 
    * **65 degrees East of South** (meaning a vector pointing South has been rotated 65 degrees towards the easterly direction).
2) expressed as a counterclockwise angle of rotation about its "tail"
    * 30 degrees is a vector that has been rotated 30 degrees in a counterclockwise direction relative to due east
    *  160 degrees is a vector that has been rotated 160 degrees in a counterclockwise direction relative to due east

---

# Vector Direction Conventions

<div class='columns cols-2-1'>
<div class='col'>

<svg viewBox="0 0 960 400" width="100%" style="max-height:300px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="114" y1="210" x2="366" y2="210"/>
    <line x1="240" y1="84" x2="240" y2="336"/>
  </g>
  <path d="M 294 210 A 54 54 0 0 0 281.4 175.3" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="320.8" y="187.6" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="21" font-weight="600">40&#176;</text>
  <line x1="240" y1="210" x2="342.5" y2="124" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="354.9,113.6 346,132.5 334.7,119.1" fill="var(--star, #205EA6)"/>
  <circle cx="240" cy="210" r="5" fill="var(--muted, #6F6E69)"/>
  <text x="240" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="19" font-weight="600">40&#176; counterclockwise from east</text>
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="594" y1="210" x2="846" y2="210"/>
    <line x1="720" y1="84" x2="720" y2="336"/>
  </g>
  <path d="M 774 210 A 54 54 0 1 0 693 256.8" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="677" y="142.5" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="21" font-weight="600">240&#176;</text>
  <line x1="720" y1="210" x2="653.1" y2="325.9" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="645,339.9 646.9,319.1 662.1,327.8" fill="var(--star, #205EA6)"/>
  <circle cx="720" cy="210" r="5" fill="var(--muted, #6F6E69)"/>
  <text x="720" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="19" font-weight="600">240&#176; counterclockwise from east</text>
  <text x="480" y="42" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="19">0&#176; is due east; angles open counterclockwise</text>
  <line x1="480" y1="60" x2="480" y2="360" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="6 6"/>
</svg>

</div>
<div class='col'>

<svg viewBox="0 0 400 352" width="100%" style="max-height:320px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.8">
    <line x1="55" y1="200" x2="345" y2="200"/>
    <line x1="200" y1="60" x2="200" y2="325"/>
  </g>
  <text x="200" y="36" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="22" font-weight="600">Direction =</text>
  <g opacity="1">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="1;0" keyTimes="0;0.076923"/>
  <line x1="200" y1="200" x2="293.9" y2="200" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="310,200 291,208.7 291,191.3" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">0&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.076923;0.153846"/>
  <path d="M 240 200 A 40 40 0 0 0 234.6 180" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="281.3" y2="153.1" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="295.3,145 283.2,162.1 274.4,146.9" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">30&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.153846;0.230769"/>
  <path d="M 240 200 A 40 40 0 0 0 220 165.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="246.9" y2="118.7" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="255,104.7 253.1,125.6 237.9,116.8" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">60&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.230769;0.307692"/>
  <path d="M 240 200 A 40 40 0 0 0 200 160" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="200" y2="106.2" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="200,90 208.7,109 191.3,109" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">90&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.307692;0.384615"/>
  <path d="M 240 200 A 40 40 0 0 0 180 165.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="153.1" y2="118.7" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="145,104.7 162.1,116.8 146.9,125.6" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">120&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.384615;0.461538"/>
  <path d="M 240 200 A 40 40 0 0 0 165.4 180" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="118.7" y2="153.1" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="104.7,145 125.6,146.9 116.8,162.1" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">150&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.461538;0.538462"/>
  <path d="M 240 200 A 40 40 0 0 0 160 200" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="106.2" y2="200" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="90,200 109,191.3 109,208.7" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">180&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.538462;0.615385"/>
  <path d="M 240 200 A 40 40 0 1 0 165.4 220" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="118.7" y2="246.9" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="104.7,255 116.8,237.9 125.6,253.1" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">210&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.615385;0.692308"/>
  <path d="M 240 200 A 40 40 0 1 0 180 234.6" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="153.1" y2="281.3" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="145,295.3 146.9,274.4 162.1,283.2" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">240&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.692308;0.769231"/>
  <path d="M 240 200 A 40 40 0 1 0 200 240" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="200" y2="293.9" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="200,310 191.3,291 208.7,291" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">270&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.769231;0.846154"/>
  <path d="M 240 200 A 40 40 0 1 0 220 234.6" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="246.9" y2="281.3" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="255,295.3 237.9,283.2 253.1,274.4" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">300&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.846154;0.923077"/>
  <path d="M 240 200 A 40 40 0 1 0 234.6 220" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="281.3" y2="246.9" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="295.3,255 274.4,253.1 283.2,237.9" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">330&#176;</text>
  </g>
  <g opacity="0">
    <animate attributeName="opacity" dur="6.5s" repeatCount="indefinite"
             calcMode="discrete" values="0;1;0" keyTimes="0;0.923077;1.000000"/>
  <path d="M 240 200 A 40 40 0 1 0 240 200" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <line x1="200" y1="200" x2="293.9" y2="200" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
    <polygon points="310,200 291,208.7 291,191.3" fill="var(--star, #205EA6)"/>
  <text x="200" y="70" text-anchor="middle" fill="var(--star, #205EA6)" font-size="30" font-weight="600">360&#176;</text>
  </g>
  <circle cx="200" cy="200" r="5" fill="var(--muted, #6F6E69)"/>
  <text x="200" y="342" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">counterclockwise from east</text>
</svg>

</div>
</div>

---

# The Magnitude of a Vector

<svg viewBox="0 118 960 282" width="100%" style="max-height:360px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <rect x="43.8" y="139.9" width="264.4" height="32.6" rx="16.3" fill="var(--muted, #6F6E69)" opacity="0.12"/>
  <text x="176" y="164" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="20" font-weight="600">SCALE:  1 cm = 5 miles</text>
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="126" y1="320" x2="214" y2="320"/>
    <line x1="170" y1="276" x2="170" y2="364"/>
  </g>
  <path d="M 216 320 A 46 46 0 0 0 193 280.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="242" y="276" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="20" font-weight="600">60&#176;</text>
  <line x1="170" y1="320" x2="217.8" y2="237.1" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="225.5,223.9 223.7,243.6 209.3,235.3" fill="var(--star, #205EA6)"/>
  <text x="116" y="294" text-anchor="end" fill="var(--star, #205EA6)" font-size="21" font-weight="600">d = 15 mi</text>
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="436" y1="320" x2="524" y2="320"/>
    <line x1="480" y1="276" x2="480" y2="364"/>
  </g>
  <path d="M 526 320 A 46 46 0 0 0 503 280.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="552" y="276" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="20" font-weight="600">60&#176;</text>
  <line x1="480" y1="320" x2="564.9" y2="173" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="572.5,159.8 570.7,179.5 556.3,171.2" fill="var(--star, #205EA6)"/>
  <text x="426" y="294" text-anchor="end" fill="var(--star, #205EA6)" font-size="21" font-weight="600">d = 25 mi</text>
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="746" y1="320" x2="834" y2="320"/>
    <line x1="790" y1="276" x2="790" y2="364"/>
  </g>
  <path d="M 836 320 A 46 46 0 0 0 813 280.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="862" y="276" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="20" font-weight="600">60&#176;</text>
  <line x1="790" y1="320" x2="849" y2="217.9" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="856.6,204.6 854.8,224.4 840.4,216.1" fill="var(--star, #205EA6)"/>
  <text x="736" y="294" text-anchor="end" fill="var(--star, #205EA6)" font-size="21" font-weight="600">d = 18 mi</text>
  <text x="480" y="388" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="18">same direction &#8212; the arrow's length carries the magnitude</text>
</svg>

- Magnitude of a vector is scaled in the vector diagram by the **length** of the arrow
- This can be scaled (i.e. 1 cm = 5 miles)


---

# Adding Vectors

<div class='columns'>
<div class='col'>

- When vectors are in the same, or opposite directions we can add them with regular algebra
- Line them up on one axis, keep the signs, and the arithmetic *is* the vector sum

</div>
<div class='col'>

<svg viewBox="0 0 520 630" width="100%" style="max-height:520px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="30" y1="54" x2="52.2" y2="54" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="65,54 50,60.9 50,47.1" fill="var(--star, #205EA6)"/>
  <text x="47.5" y="38" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="152" y="62" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="190" y1="54" x2="212.2" y2="54" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="225,54 210,60.9 210,47.1" fill="var(--star, #205EA6)"/>
  <text x="207.5" y="38" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="332" y="62" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <line x1="372" y1="54" x2="429.2" y2="54" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="442,54 427,60.9 427,47.1" fill="var(--aurora, #66800B)"/>
  <text x="407" y="38" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">10</text>
  <line x1="30" y1="142" x2="52.2" y2="142" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="65,142 50,148.9 50,135.1" fill="var(--star, #205EA6)"/>
  <text x="47.5" y="126" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="152" y="150" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="225" y1="142" x2="202.8" y2="142" stroke="var(--coral, #AF3029)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="190,142 205,135.1 205,148.9" fill="var(--coral, #AF3029)"/>
  <text x="207.5" y="126" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">&#8722;5</text>
  <text x="332" y="150" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <text x="372" y="150" text-anchor="start" fill="var(--aurora, #66800B)" font-size="22" font-weight="600">0</text>
  <line x1="30" y1="230" x2="52.2" y2="230" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="65,230 50,236.9 50,223.1" fill="var(--star, #205EA6)"/>
  <text x="47.5" y="214" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="152" y="238" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="190" y1="230" x2="247.2" y2="230" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="260,230 245,236.9 245,223.1" fill="var(--star, #205EA6)"/>
  <text x="225" y="214" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">10</text>
  <text x="332" y="238" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <line x1="372" y1="230" x2="464.2" y2="230" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="477,230 462,236.9 462,223.1" fill="var(--aurora, #66800B)"/>
  <text x="424.5" y="214" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">15</text>
  <line x1="30" y1="318" x2="52.2" y2="318" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="65,318 50,324.9 50,311.1" fill="var(--star, #205EA6)"/>
  <text x="47.5" y="302" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="152" y="326" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="260" y1="318" x2="202.8" y2="318" stroke="var(--coral, #AF3029)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="190,318 205,311.1 205,324.9" fill="var(--coral, #AF3029)"/>
  <text x="225" y="302" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">&#8722;10</text>
  <text x="332" y="326" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <line x1="407" y1="318" x2="384.8" y2="318" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="372,318 387,311.1 387,324.9" fill="var(--aurora, #66800B)"/>
  <text x="389.5" y="302" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">&#8722;5</text>
  <line x1="30" y1="406" x2="52.2" y2="406" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="65,406 50,412.9 50,399.1" fill="var(--star, #205EA6)"/>
  <text x="47.5" y="390" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5</text>
  <text x="152" y="414" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="295" y1="406" x2="202.8" y2="406" stroke="var(--coral, #AF3029)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="190,406 205,399.1 205,412.9" fill="var(--coral, #AF3029)"/>
  <text x="242.5" y="390" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">&#8722;15</text>
  <text x="332" y="414" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <line x1="442" y1="406" x2="384.8" y2="406" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="372,406 387,399.1 387,412.9" fill="var(--aurora, #66800B)"/>
  <text x="407" y="390" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">&#8722;10</text>
  <line x1="60" y1="600" x2="60" y2="520.8" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="60,508 66.9,523 53.1,523" fill="var(--star, #205EA6)"/>
  <text x="38" y="562" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">10</text>
  <text x="152" y="562" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">+</text>
  <line x1="214" y1="530" x2="214" y2="565.2" stroke="var(--coral, #AF3029)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="214,578 207.1,563 220.9,563" fill="var(--coral, #AF3029)"/>
  <text x="240" y="562" text-anchor="start" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">&#8722;5</text>
  <text x="332" y="562" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="26" font-weight="600">=</text>
  <line x1="400" y1="578" x2="400" y2="542.8" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="400,530 406.9,545 393.1,545" fill="var(--aurora, #66800B)"/>
  <text x="426" y="562" text-anchor="start" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">5</text>
</svg>

</div>
</div>

---



# Try It...

![bg fit right:45%](../figures/troy.png)

Mr. Porter and his wife walk from Nighthawks to Troy Savings Bank Music Hall. They walk 6 blocks East and then 2 Blocks South. [1 Block = 100 Meters]

1. Determine the **distance** that they traveled.
2. Determine their  **displacement**.


---

---

# Adding Angled Vectors

<svg viewBox="0 0 820 450" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="90" y1="128" x2="156.8" y2="61.2" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="166.4,51.6 160.3,68.2 149.8,57.7" fill="var(--star, #205EA6)"/>
  <text x="66" y="110" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">10 N</text>
  <text x="220" y="134" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">+</text>
  <line x1="300" y1="74" x2="366.8" y2="140.8" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="376.4,150.4 359.8,144.3 370.3,133.8" fill="var(--nebula, #5E409D)"/>
  <text x="330" y="62" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="20" font-weight="600">10 N</text>
  <text x="560" y="134" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">=</text>
  <text x="670" y="140" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="28" font-weight="600">? ? ?</text>
  <line x1="90" y1="254" x2="156.8" y2="187.2" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="166.4,177.6 160.3,194.2 149.8,183.7" fill="var(--star, #205EA6)"/>
  <text x="66" y="236" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">10 N</text>
  <text x="220" y="260" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">+</text>
  <line x1="408" y1="254" x2="313.6" y2="254" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="300,254 316,246.6 316,261.4" fill="var(--nebula, #5E409D)"/>
  <text x="354" y="230" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="20" font-weight="600">10 N</text>
  <text x="560" y="260" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">=</text>
  <text x="670" y="266" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="28" font-weight="600">? ? ?</text>
  <line x1="90" y1="380" x2="156.8" y2="313.2" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="166.4,303.6 160.3,320.2 149.8,309.7" fill="var(--star, #205EA6)"/>
  <text x="66" y="362" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">10 N</text>
  <text x="220" y="386" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">+</text>
  <line x1="300" y1="380" x2="340.4" y2="380" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="354,380 338,387.4 338,372.6" fill="var(--nebula, #5E409D)"/>
  <text x="327" y="356" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="20" font-weight="600">5 N</text>
  <text x="560" y="386" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="28" font-weight="600">=</text>
  <text x="670" y="392" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="28" font-weight="600">? ? ?</text>
  <text x="410" y="436" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="18">not collinear &#8212; algebra alone will not do it</text>
</svg>

---


<!--- _footer: <br>--->

## Adding Vectors 

Vectors are added ___"tip to tail"___, that is redraw the vectors so that the tip of one vector is attached to the tail of the second vector. 

$$\vec{C} = \vec{a} + \vec{b}$$

>_The **resultant** vector S is equal to the addition of vectors a and b_

![bg fit right](../figures/tip-to-tail.gif.gif)


---

# Right Angled Vectors

Eric leaves the base camp and hikes 11 km, north and then hikes 11 km east. Determine Eric's resulting displacement.

<svg viewBox="0 0 820 370" width="100%" style="max-height:360px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="80" y1="300" x2="80" y2="211" stroke="var(--star, #205EA6)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="80,196.6 87.8,213.6 72.2,213.6" fill="var(--star, #205EA6)"/>
  <text x="64" y="250" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">11 km, N</text>
  <text x="170" y="258" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="30" font-weight="600">+</text>
  <line x1="230" y1="250" x2="318.9" y2="250" stroke="var(--aurora, #66800B)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="333.4,250 316.4,257.8 316.4,242.2" fill="var(--aurora, #66800B)"/>
  <text x="282" y="228" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">11 km, E</text>
  <text x="390" y="258" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="30" font-weight="600">=</text>
  <path d="M 560 300 L 560 196.6 L 663.4 196.6 Z" fill="var(--coral, #AF3029)" opacity="0.06"/>
  <line x1="560" y1="300" x2="560" y2="211" stroke="var(--star, #205EA6)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="560,196.6 567.8,213.6 552.2,213.6" fill="var(--star, #205EA6)"/>
  <text x="546" y="250" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">11 km, N</text>
  <line x1="560" y1="196.6" x2="648.9" y2="196.6" stroke="var(--aurora, #66800B)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="663.4,196.6 646.4,204.4 646.4,188.8" fill="var(--aurora, #66800B)"/>
  <text x="612" y="180.6" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">11 km, E</text>
  <line x1="560" y1="300" x2="652" y2="208" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="663.4,196.6 656.1,216.2 643.8,203.9" fill="var(--coral, #AF3029)"/>
  <text x="652" y="266" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="26" font-weight="600" font-style="italic">R</text>
  <circle cx="560" cy="300" r="6" fill="var(--ink, #100F0F)"/>
  <text x="410" y="352" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="18">the legs meet at a right angle, so R closes the triangle</text>
</svg>

$$11^2 + 11^2 = R^2 \quad\Rightarrow\quad R = \sqrt{242} = 15.6 \text{ km}$$

---

# Determining the Angle

<div class='columns'>
<div class='col'>

<svg viewBox="0 0 420 330" width="100%" style="max-height:270px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <path d="M 110 270 L 110 90 L 330 90 Z" fill="var(--star, #205EA6)" opacity="0.07"/>
  <line x1="110" y1="270" x2="110" y2="90" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <line x1="110" y1="90" x2="330" y2="90" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <line x1="110" y1="270" x2="330" y2="90" stroke="var(--coral, #AF3029)" stroke-width="5" stroke-linecap="round"/>
  <rect x="110" y="90" width="20" height="20" fill="none" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="84" y="185" text-anchor="end" fill="var(--star, #205EA6)" font-size="26" font-weight="600" font-style="italic">a</text>
  <text x="220" y="72" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="26" font-weight="600" font-style="italic">b</text>
  <text x="254" y="214" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="26" font-weight="600" font-style="italic">c</text>
  <path d="M 110 218 A 52 52 0 0 1 150.2 237.1" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="158" y="248" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="24" font-weight="600">&#952;</text>
  <text x="210" y="318" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">a adjacent &#183; b opposite &#183; c hypotenuse</text>
</svg>

$$\sin\theta = \tfrac{b}{c} \quad \cos\theta = \tfrac{a}{c} \quad \tan\theta = \tfrac{b}{a}$$

</div>
<div class='col'>

<svg viewBox="0 0 420 330" width="100%" style="max-height:270px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <path d="M 150 288 L 150 145 L 293 145 Z" fill="var(--coral, #AF3029)" opacity="0.06"/>
  <line x1="150" y1="288" x2="150" y2="159.4" stroke="var(--star, #205EA6)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="150,145 157.8,162 142.2,162" fill="var(--star, #205EA6)"/>
  <text x="134" y="218" text-anchor="end" fill="var(--star, #205EA6)" font-size="19" font-weight="600">11 km, N</text>
  <line x1="150" y1="145" x2="278.6" y2="145" stroke="var(--aurora, #66800B)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="293,145 276,152.8 276,137.2" fill="var(--aurora, #66800B)"/>
  <text x="216" y="129" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">11 km, E</text>
  <line x1="150" y1="288" x2="282.2" y2="155.8" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="293,145 286.1,163.6 274.4,151.9" fill="var(--coral, #AF3029)"/>
  <text x="292" y="230" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">R = 15.6 km</text>
  <path d="M 150 224 A 64 64 0 0 1 195.3 242.7" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="206" y="256" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="24" font-weight="600">&#952;</text>
  <circle cx="150" cy="288" r="6" fill="var(--ink, #100F0F)"/>
  <text x="210" y="322" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">&#952; is measured from the north leg</text>
</svg>

$$\sin\theta = \tfrac{11}{15.6} = 0.7051$$

$$\theta = \sin^{-1}(0.7051) = 45^\circ$$

</div>
</div>

---

# The Calculated Angle isn't always the answer...

## 10 km, West &nbsp;+&nbsp; 5 km, South

<svg viewBox="0 0 900 420" width="100%" style="max-height:330px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <path d="M 420 150 L 270 150 L 270 225 Z" fill="var(--coral, #AF3029)" opacity="0.07"/>
  <line x1="420" y1="150" x2="284.4" y2="150" stroke="var(--aurora, #66800B)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="270,150 287,142.2 287,157.8" fill="var(--aurora, #66800B)"/>
  <text x="345" y="132" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">10 km, W</text>
  <line x1="270" y1="150" x2="270" y2="210.6" stroke="var(--star, #205EA6)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="270,225 262.2,208 277.8,208" fill="var(--star, #205EA6)"/>
  <text x="254" y="193.5" text-anchor="end" fill="var(--star, #205EA6)" font-size="20" font-weight="600">5 km, S</text>
  <line x1="420" y1="150" x2="284.4" y2="217.8" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="270,225 283.1,208.7 290.9,224.3" fill="var(--coral, #AF3029)"/>
  <text x="366" y="222" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="26" font-weight="600" font-style="italic">R</text>
  <path d="M 364 150 A 56 56 0 0 0 369.9 175.1" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="308" y="190" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="19" font-weight="600">26.6&#176;</text>
  <circle cx="420" cy="150" r="6" fill="var(--ink, #100F0F)"/>
  <g stroke="var(--ink-3, #B7B5AC)" stroke-width="1.6" opacity="0.9">
    <line x1="584" y1="256" x2="816" y2="256"/>
    <line x1="700" y1="140" x2="700" y2="372"/>
  </g>
  <path d="M 764 256 A 64 64 0 0 0 636 256" fill="none" stroke="var(--ink-3, #B7B5AC)" stroke-width="2"/>
  <text x="690" y="176" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="18" font-weight="600">180&#176;</text>
  <path d="M 660 256 A 40 40 0 0 0 664.2 273.9" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.4"/>
  <text x="682" y="308" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">26.6&#176;</text>
  <line x1="700" y1="256" x2="593.9" y2="309.1" stroke="var(--coral, #AF3029)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="580.2,316 592.6,300.5 600,315.3" fill="var(--coral, #AF3029)"/>
  <text x="550" y="326" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="23" font-weight="600" font-style="italic">R</text>
  <text x="700" y="404" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">direction of R = 180&#176; + 26.6&#176; = 206.6&#176;</text>
  <text x="250" y="404" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="18">26.6&#176; is measured off the west leg</text>
</svg>

$$\tan\theta = \tfrac{5 \text{ km}}{10 \text{ km}} = 0.5 \quad\Rightarrow\quad \theta = \tan^{-1}(0.5) = 26.6^\circ$$

---

# Using Scaled Vectors


<svg viewBox="0 0 1060 340" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <rect x="22" y="34" width="330" height="238" rx="12" fill="var(--panel, rgba(16,15,15,0.025))" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5"/>
  <text x="187" y="72" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="21" font-weight="600" letter-spacing="2">SCALE</text>
  <text x="96" y="125" text-anchor="end" fill="var(--ink, #100F0F)" font-size="21">3 cm</text>
  <line x1="120" y1="118" x2="174.1" y2="118" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="186,118 172,124.4 172,111.6" fill="var(--star, #205EA6)"/>
  <text x="96" y="177" text-anchor="end" fill="var(--ink, #100F0F)" font-size="21">5 cm</text>
  <line x1="120" y1="170" x2="218.1" y2="170" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="230,170 216,176.4 216,163.6" fill="var(--star, #205EA6)"/>
  <text x="96" y="229" text-anchor="end" fill="var(--ink, #100F0F)" font-size="21">8 cm</text>
  <line x1="120" y1="222" x2="284.1" y2="222" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round"/>
  <polygon points="296,222 282,228.4 282,215.6" fill="var(--star, #205EA6)"/>
  <text x="187" y="254" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="15">a longer arrow means a larger magnitude</text>
  <line x1="420" y1="64" x2="519" y2="64" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="530,64 517,70 517,58" fill="var(--star, #205EA6)"/>
  <line x1="530" y1="64" x2="530" y2="101" stroke="var(--nebula, #5E409D)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="530,112 524,99 536,99" fill="var(--nebula, #5E409D)"/>
  <line x1="530" y1="112" x2="589" y2="112" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="600,112 587,118 587,106" fill="var(--star, #205EA6)"/>
  <line x1="600" y1="112" x2="600" y2="144.9" stroke="var(--nebula, #5E409D)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="600,156 594,143 606,143" fill="var(--nebula, #5E409D)"/>
  <line x1="600" y1="156" x2="525" y2="156" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="514,156 527,150 527,162" fill="var(--star, #205EA6)"/>
  <line x1="514" y1="156" x2="514" y2="190.9" stroke="var(--nebula, #5E409D)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="514,202 508,189 520,189" fill="var(--nebula, #5E409D)"/>
  <line x1="514" y1="202" x2="643" y2="202" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="654,202 641,208 641,196" fill="var(--star, #205EA6)"/>
  <line x1="654" y1="202" x2="654" y2="230.9" stroke="var(--nebula, #5E409D)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="654,242 648,229 660,229" fill="var(--nebula, #5E409D)"/>
  <line x1="654" y1="242" x2="719" y2="242" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="730,242 717,248 717,236" fill="var(--star, #205EA6)"/>
  <line x1="730" y1="242" x2="730" y2="274.9" stroke="var(--nebula, #5E409D)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="730,286 724,273 736,273" fill="var(--nebula, #5E409D)"/>
  <line x1="730" y1="286" x2="809" y2="286" stroke="var(--star, #205EA6)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="820,286 807,292 807,280" fill="var(--star, #205EA6)"/>
  <circle cx="420" cy="64" r="9" fill="var(--ink, #100F0F)"/>
  <text x="404" y="50" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">Home</text>
  <text x="404" y="70" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">Base</text>
  <circle cx="858" cy="286" r="5" fill="var(--ink-3, #B7B5AC)"/>
  <circle cx="884" cy="286" r="5" fill="var(--ink-3, #B7B5AC)"/>
  <circle cx="910" cy="286" r="5" fill="var(--ink-3, #B7B5AC)"/>
  <text x="700" y="324" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">every leg drawn to the same scale, tip to tail</text>
</svg>

---

# Scaled Vectors

<svg viewBox="0 56 940 282" width="100%" style="max-height:420px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="74" y1="250" x2="176" y2="250" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="120" y1="200" x2="120" y2="300" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 154 250 A 34 34 0 0 0 144 226" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="175.4" y="233" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="19" font-weight="600">45&#176;</text>
  <line x1="120" y1="250" x2="195.2" y2="174.8" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="204.9,165.1 198.7,181.7 188.3,171.3" fill="var(--star, #205EA6)"/>
  <circle cx="120" cy="250" r="5" fill="var(--muted, #6F6E69)"/>
  <line x1="384" y1="118" x2="486" y2="118" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="430" y1="68" x2="430" y2="168" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 464 118 A 34 34 0 1 0 447 147.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="378" y="94" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="19" font-weight="600">300&#176;</text>
  <line x1="430" y1="118" x2="498.2" y2="236.1" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="505,247.9 490.6,237.7 503.4,230.4" fill="var(--nebula, #5E409D)"/>
  <circle cx="430" cy="118" r="5" fill="var(--muted, #6F6E69)"/>
  <line x1="766" y1="158" x2="868" y2="158" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="812" y1="108" x2="812" y2="208" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 846 158 A 34 34 0 1 0 782.6 175" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="796.5" y="106" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="19" font-weight="600">210&#176;</text>
  <line x1="812" y1="158" x2="745.8" y2="196.2" stroke="var(--plasma, #BC5215)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="734.1,203 744.2,188.6 751.6,201.4" fill="var(--plasma, #BC5215)"/>
  <circle cx="812" cy="158" r="5" fill="var(--muted, #6F6E69)"/>
  <text x="318" y="200" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="40" font-weight="600">+</text>
  <text x="648" y="200" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="40" font-weight="600">+</text>
  <text x="470" y="316" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">angles measured counterclockwise from east &nbsp;&#183;&nbsp; arrows drawn to scale</text>
</svg>



---

# Scaled Vectors

<div class='columns'>
<div class='col'>

<svg viewBox="0 0 420 410" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="32" y1="170" x2="114" y2="170" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="70" y1="130" x2="70" y2="210" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 98 170 A 28 28 0 0 0 89.8 150.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2"/>
  <text x="118" y="156.1" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="18" font-weight="600">45&#176;</text>
  <line x1="70" y1="170" x2="133.9" y2="106.1" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="143.5,96.5 137.4,113 127,102.6" fill="var(--star, #205EA6)"/>
  <circle cx="70" cy="170" r="5" fill="var(--muted, #6F6E69)"/>
  <line x1="242" y1="70" x2="324" y2="70" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="280" y1="30" x2="280" y2="110" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 308 70 A 28 28 0 1 0 294 94.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2"/>
  <text x="235" y="50" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="18" font-weight="600">300&#176;</text>
  <line x1="280" y1="70" x2="338.2" y2="170.8" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="345,182.6 330.6,172.4 343.4,165" fill="var(--nebula, #5E409D)"/>
  <circle cx="280" cy="70" r="5" fill="var(--muted, #6F6E69)"/>
  <line x1="262" y1="290" x2="344" y2="290" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <line x1="300" y1="250" x2="300" y2="330" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.4" stroke-dasharray="5 5"/>
  <path d="M 328 290 A 28 28 0 1 0 275.8 304" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2"/>
  <text x="286.5" y="245.8" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="18" font-weight="600">210&#176;</text>
  <line x1="300" y1="290" x2="244.2" y2="322.2" stroke="var(--plasma, #BC5215)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="232.5,329 242.6,314.6 250,327.4" fill="var(--plasma, #BC5215)"/>
  <circle cx="300" cy="290" r="5" fill="var(--muted, #6F6E69)"/>
  <text x="205" y="150" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="36" font-weight="600">+</text>
  <text x="120" y="302" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="36" font-weight="600">+</text>
  <text x="210" y="396" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">angles counterclockwise from east</text>
</svg>

</div>
<div class='col'>

<svg viewBox="80 8 400 318" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="210" y1="150" x2="288.1" y2="71.9" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="297.7,62.3 291.6,78.8 281.2,68.4" fill="var(--star, #205EA6)"/>
  <rect x="175.6" y="84.8" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="205.8" y="108.2" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">20 m</text>
  <path d="M 232 150 A 22 22 0 0 0 225.6 134.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="1.8"/>
  <text x="250" y="160" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="15" font-weight="600">45&#176;</text>
  <line x1="297.7" y1="62.3" x2="368.4" y2="184.8" stroke="var(--nebula, #5E409D)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="375.2,196.6 360.8,186.4 373.6,179" fill="var(--nebula, #5E409D)"/>
  <rect x="358.2" y="118.1" width="60.6" height="31.6" rx="15.8" fill="var(--nebula, #5E409D)" opacity="0.12"/>
  <text x="388.4" y="141.4" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="19" font-weight="600">25 m</text>
  <path d="M 319.7 62.3 A 22 22 0 1 0 308.7 81.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="1.8"/>
  <text x="291.7" y="32.3" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="15" font-weight="600">300&#176;</text>
  <line x1="375.2" y1="196.6" x2="306.4" y2="236.3" stroke="var(--plasma, #BC5215)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="294.6,243.1 304.8,228.7 312.2,241.4" fill="var(--plasma, #BC5215)"/>
  <rect x="310.6" y="236.4" width="60.6" height="31.6" rx="15.8" fill="var(--plasma, #BC5215)" opacity="0.12"/>
  <text x="340.9" y="259.8" text-anchor="middle" fill="var(--plasma, #BC5215)" font-size="19" font-weight="600">15 m</text>
  <path d="M 397.2 196.6 A 22 22 0 1 0 356.1 207.6" fill="none" stroke="var(--solar, #AD8301)" stroke-width="1.8"/>
  <text x="425.2" y="180.6" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="15" font-weight="600">210&#176;</text>
  <line x1="210" y1="150" x2="283.8" y2="231.1" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="294.6,243.1 275.4,234.9 288.3,223.1" fill="var(--coral, #AF3029)"/>
  <circle cx="210" cy="150" r="6" fill="var(--muted, #6F6E69)"/>
  <rect x="107.4" y="205.9" width="85.2" height="32.6" rx="16.3" fill="var(--coral, #AF3029)" opacity="0.12"/>
  <text x="150" y="230" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">20.3 m</text>
  <rect x="101.8" y="233.9" width="96.4" height="32.6" rx="16.3" fill="var(--coral, #AF3029)" opacity="0.12"/>
  <text x="150" y="258" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">at 312&#176;</text>
  <text x="280" y="314" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">resultant: tail of the first to the tip of the last</text>
</svg>

</div>
</div>

**Resultant**: the vector sum of two or more vectors. It is the _result_ of adding two or more vectors
- _Resultant Displacement_ or _Resultant Force_ or _Resultant Velocity_

---

# Order Does Not Matter


![center w:700](https://www.physicsclassroom.com/mmedia/vectors/ao.gif)

---

# Stop 🛑 <!--fit--->

---

# Representing Vector Components



<svg viewBox="0 0 840 450" width="100%" style="max-height:440px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="115.8" y1="34" x2="115.8" y2="388"/>
    <line x1="166.4" y1="34" x2="166.4" y2="388"/>
    <line x1="216.9" y1="34" x2="216.9" y2="388"/>
    <line x1="267.5" y1="34" x2="267.5" y2="388"/>
    <line x1="318.1" y1="34" x2="318.1" y2="388"/>
    <line x1="368.7" y1="34" x2="368.7" y2="388"/>
    <line x1="419.2" y1="34" x2="419.2" y2="388"/>
    <line x1="469.8" y1="34" x2="469.8" y2="388"/>
    <line x1="520.4" y1="34" x2="520.4" y2="388"/>
    <line x1="570.9" y1="34" x2="570.9" y2="388"/>
    <line x1="621.5" y1="34" x2="621.5" y2="388"/>
    <line x1="672.1" y1="34" x2="672.1" y2="388"/>
    <line x1="115.8" y1="388" x2="682.2" y2="388"/>
    <line x1="115.8" y1="337.4" x2="682.2" y2="337.4"/>
    <line x1="115.8" y1="286.9" x2="682.2" y2="286.9"/>
    <line x1="115.8" y1="236.3" x2="682.2" y2="236.3"/>
    <line x1="115.8" y1="185.7" x2="682.2" y2="185.7"/>
    <line x1="115.8" y1="135.1" x2="682.2" y2="135.1"/>
    <line x1="115.8" y1="84.6" x2="682.2" y2="84.6"/>
    <line x1="115.8" y1="34" x2="682.2" y2="34"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="156.3" y1="34" x2="156.3" y2="388"/>
    <line x1="257.4" y1="34" x2="257.4" y2="388"/>
    <line x1="358.5" y1="34" x2="358.5" y2="388"/>
    <line x1="459.7" y1="34" x2="459.7" y2="388"/>
    <line x1="560.8" y1="34" x2="560.8" y2="388"/>
    <line x1="662" y1="34" x2="662" y2="388"/>
    <line x1="115.8" y1="337.4" x2="682.2" y2="337.4"/>
    <line x1="115.8" y1="236.3" x2="682.2" y2="236.3"/>
    <line x1="115.8" y1="135.1" x2="682.2" y2="135.1"/>
    <line x1="115.8" y1="34" x2="682.2" y2="34"/>
  </g>
  <line x1="115.8" y1="337.4" x2="686.9" y2="337.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="696.2,337.4 685.2,342.5 685.2,332.4" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="388" x2="156.3" y2="29.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.3,20 161.3,31 151.2,31" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="337.4" x2="113.2" y2="337.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="103.8,337.4 114.8,332.4 114.8,342.5" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="337.4" x2="156.3" y2="390.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.3,400 151.2,389 161.3,389" fill="var(--muted, #6F6E69)"/>
  <line x1="257.4" y1="331.4" x2="257.4" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="257.4" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="358.5" y1="331.4" x2="358.5" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="358.5" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="459.7" y1="331.4" x2="459.7" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="459.7" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">30</text>
  <line x1="560.8" y1="331.4" x2="560.8" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="560.8" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">40</text>
  <line x1="150.3" y1="236.3" x2="162.3" y2="236.3" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="144.3" y="242.3" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="150.3" y1="135.1" x2="162.3" y2="135.1" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="144.3" y="141.1" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <text x="708.2" y="343.4" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="158.3" y="10" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="156.3" y1="337.4" x2="602" y2="337.4" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="611.4,337.4 600.4,342.5 600.4,332.4" fill="var(--star, #205EA6)" opacity="0.85"/>
  <line x1="611.4" y1="337.4" x2="611.4" y2="93.9" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="611.4,84.6 616.5,95.6 606.3,95.6" fill="var(--star, #205EA6)" opacity="0.85"/>
  <rect x="353.5" y="376" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="383.8" y="399.4" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">45.0</text>
  <rect x="635.1" y="193.6" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="665.4" y="217" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">25.0</text>
  <line x1="156.3" y1="337.4" x2="599.8" y2="91" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="611.4,84.6 601.2,98.4 594.3,85.9" fill="var(--star, #205EA6)"/>
  <circle cx="156.3" cy="337.4" r="7" fill="var(--muted, #6F6E69)"/>
  <rect x="321.1" y="142.3" width="141.2" height="34.6" rx="17.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="391.7" y="167.9" text-anchor="middle" fill="var(--star, #205EA6)" font-size="22" font-weight="600">|<tspan font-style="italic">a</tspan>| = 51.5</text>
</svg>



---
<!--- _footer: <br> --->

# Vector Components

* Parts of a two-dimensional vector
* The *component* of a vector is the influence of that vector in a given direction.
    * i.e. How far _East_ of a North East displacement did you walk?
* We look at the ***perpendicular components***
    * How much of the vector is in the *x-direction*
    * How much of the vector is in the *y-direction*
* Vector $\vec{A}$ is made up of components $\vec{A}_x$ and $\vec{A}_y$
    * $\vec{A} = \vec{A}_x + \vec{A}_y$

---

# Vector Components Math


<div class = "columns">

<div>

- Notice this is a right triangle
    * $\vec{A}^2 = \vec{A}_x^2 + \vec{A}_y^2$
    * Depending on the angle...
        * $A_x = \pm A \cos \theta$
        * $A_y = \pm A \sin \theta$

</div>


<div class='col'>

<svg viewBox="0 0 840 450" width="100%" style="max-height:370px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="115.8" y1="34" x2="115.8" y2="388"/>
    <line x1="166.4" y1="34" x2="166.4" y2="388"/>
    <line x1="216.9" y1="34" x2="216.9" y2="388"/>
    <line x1="267.5" y1="34" x2="267.5" y2="388"/>
    <line x1="318.1" y1="34" x2="318.1" y2="388"/>
    <line x1="368.7" y1="34" x2="368.7" y2="388"/>
    <line x1="419.2" y1="34" x2="419.2" y2="388"/>
    <line x1="469.8" y1="34" x2="469.8" y2="388"/>
    <line x1="520.4" y1="34" x2="520.4" y2="388"/>
    <line x1="570.9" y1="34" x2="570.9" y2="388"/>
    <line x1="621.5" y1="34" x2="621.5" y2="388"/>
    <line x1="672.1" y1="34" x2="672.1" y2="388"/>
    <line x1="115.8" y1="388" x2="682.2" y2="388"/>
    <line x1="115.8" y1="337.4" x2="682.2" y2="337.4"/>
    <line x1="115.8" y1="286.9" x2="682.2" y2="286.9"/>
    <line x1="115.8" y1="236.3" x2="682.2" y2="236.3"/>
    <line x1="115.8" y1="185.7" x2="682.2" y2="185.7"/>
    <line x1="115.8" y1="135.1" x2="682.2" y2="135.1"/>
    <line x1="115.8" y1="84.6" x2="682.2" y2="84.6"/>
    <line x1="115.8" y1="34" x2="682.2" y2="34"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="156.3" y1="34" x2="156.3" y2="388"/>
    <line x1="257.4" y1="34" x2="257.4" y2="388"/>
    <line x1="358.5" y1="34" x2="358.5" y2="388"/>
    <line x1="459.7" y1="34" x2="459.7" y2="388"/>
    <line x1="560.8" y1="34" x2="560.8" y2="388"/>
    <line x1="662" y1="34" x2="662" y2="388"/>
    <line x1="115.8" y1="337.4" x2="682.2" y2="337.4"/>
    <line x1="115.8" y1="236.3" x2="682.2" y2="236.3"/>
    <line x1="115.8" y1="135.1" x2="682.2" y2="135.1"/>
    <line x1="115.8" y1="34" x2="682.2" y2="34"/>
  </g>
  <line x1="115.8" y1="337.4" x2="686.9" y2="337.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="696.2,337.4 685.2,342.5 685.2,332.4" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="388" x2="156.3" y2="29.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.3,20 161.3,31 151.2,31" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="337.4" x2="113.2" y2="337.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="103.8,337.4 114.8,332.4 114.8,342.5" fill="var(--muted, #6F6E69)"/>
  <line x1="156.3" y1="337.4" x2="156.3" y2="390.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.3,400 151.2,389 161.3,389" fill="var(--muted, #6F6E69)"/>
  <line x1="257.4" y1="331.4" x2="257.4" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="257.4" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="358.5" y1="331.4" x2="358.5" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="358.5" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="459.7" y1="331.4" x2="459.7" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="459.7" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">30</text>
  <line x1="560.8" y1="331.4" x2="560.8" y2="343.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="560.8" y="362.4" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">40</text>
  <line x1="150.3" y1="236.3" x2="162.3" y2="236.3" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="144.3" y="242.3" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="150.3" y1="135.1" x2="162.3" y2="135.1" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="144.3" y="141.1" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <text x="708.2" y="343.4" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="158.3" y="10" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="156.3" y1="337.4" x2="602" y2="337.4" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="611.4,337.4 600.4,342.5 600.4,332.4" fill="var(--star, #205EA6)" opacity="0.85"/>
  <line x1="611.4" y1="337.4" x2="611.4" y2="93.9" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="611.4,84.6 616.5,95.6 606.3,95.6" fill="var(--star, #205EA6)" opacity="0.85"/>
  <rect x="353.5" y="376" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="383.8" y="399.4" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">45.0</text>
  <rect x="635.1" y="193.6" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="665.4" y="217" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">25.0</text>
  <line x1="156.3" y1="337.4" x2="599.8" y2="91" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="611.4,84.6 601.2,98.4 594.3,85.9" fill="var(--star, #205EA6)"/>
  <circle cx="156.3" cy="337.4" r="7" fill="var(--muted, #6F6E69)"/>
  <rect x="321.1" y="142.3" width="141.2" height="34.6" rx="17.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="391.7" y="167.9" text-anchor="middle" fill="var(--star, #205EA6)" font-size="22" font-weight="600">|<tspan font-style="italic">a</tspan>| = 51.5</text>
</svg>

</div>

</div>

---

## What are the components of Vector $\vec{A}$?

<svg viewBox="0 0 760 400" width="100%" style="max-height:430px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="91.6" y1="34" x2="91.6" y2="360"/>
    <line x1="156.8" y1="34" x2="156.8" y2="360"/>
    <line x1="222" y1="34" x2="222" y2="360"/>
    <line x1="287.2" y1="34" x2="287.2" y2="360"/>
    <line x1="352.4" y1="34" x2="352.4" y2="360"/>
    <line x1="417.6" y1="34" x2="417.6" y2="360"/>
    <line x1="482.8" y1="34" x2="482.8" y2="360"/>
    <line x1="548" y1="34" x2="548" y2="360"/>
    <line x1="613.2" y1="34" x2="613.2" y2="360"/>
    <line x1="678.4" y1="34" x2="678.4" y2="360"/>
    <line x1="91.6" y1="360" x2="678.4" y2="360"/>
    <line x1="91.6" y1="294.8" x2="678.4" y2="294.8"/>
    <line x1="91.6" y1="229.6" x2="678.4" y2="229.6"/>
    <line x1="91.6" y1="164.4" x2="678.4" y2="164.4"/>
    <line x1="91.6" y1="99.2" x2="678.4" y2="99.2"/>
    <line x1="91.6" y1="34" x2="678.4" y2="34"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="156.8" y1="34" x2="156.8" y2="360"/>
    <line x1="287.2" y1="34" x2="287.2" y2="360"/>
    <line x1="417.6" y1="34" x2="417.6" y2="360"/>
    <line x1="548" y1="34" x2="548" y2="360"/>
    <line x1="678.4" y1="34" x2="678.4" y2="360"/>
    <line x1="91.6" y1="294.8" x2="678.4" y2="294.8"/>
    <line x1="91.6" y1="164.4" x2="678.4" y2="164.4"/>
    <line x1="91.6" y1="34" x2="678.4" y2="34"/>
  </g>
  <line x1="91.6" y1="294.8" x2="683" y2="294.8" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="692.4,294.8 681.4,299.9 681.4,289.7" fill="var(--muted, #6F6E69)"/>
  <line x1="156.8" y1="360" x2="156.8" y2="29.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.8,20 161.9,31 151.7,31" fill="var(--muted, #6F6E69)"/>
  <line x1="156.8" y1="294.8" x2="89" y2="294.8" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="79.6,294.8 90.6,289.7 90.6,299.9" fill="var(--muted, #6F6E69)"/>
  <line x1="156.8" y1="294.8" x2="156.8" y2="362.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="156.8,372 151.7,361 161.9,361" fill="var(--muted, #6F6E69)"/>
  <line x1="287.2" y1="288.8" x2="287.2" y2="300.8" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="287.2" y="319.8" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="417.6" y1="288.8" x2="417.6" y2="300.8" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="417.6" y="319.8" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="548" y1="288.8" x2="548" y2="300.8" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="548" y="319.8" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">30</text>
  <line x1="150.8" y1="164.4" x2="162.8" y2="164.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="144.8" y="170.4" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <text x="704.4" y="300.8" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="158.8" y="10" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="156.8" y1="294.8" x2="601" y2="104.4" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="613.2,99.2 601.7,111.9 596,98.7" fill="var(--star, #205EA6)"/>
  <circle cx="156.8" cy="294.8" r="7" fill="var(--muted, #6F6E69)"/>
  <path d="M 218.8 294.8 A 62 62 0 0 0 213.8 270.4" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="246.9" y="282.3" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">23.2&#176;</text>
  <rect x="327.6" y="133.6" width="141.2" height="34.6" rx="17.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="398.2" y="159.2" text-anchor="middle" fill="var(--star, #205EA6)" font-size="22" font-weight="600">|<tspan font-style="italic">a</tspan>| = 38.1</text>
</svg>

---

## What are the components of Vector $\vec{A}$ and $\vec{B}$?

<svg viewBox="0 0 720 460" width="100%" style="max-height:450px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="75.8" y1="36" x2="75.8" y2="420"/>
    <line x1="106.6" y1="36" x2="106.6" y2="420"/>
    <line x1="137.3" y1="36" x2="137.3" y2="420"/>
    <line x1="168" y1="36" x2="168" y2="420"/>
    <line x1="198.7" y1="36" x2="198.7" y2="420"/>
    <line x1="229.4" y1="36" x2="229.4" y2="420"/>
    <line x1="260.2" y1="36" x2="260.2" y2="420"/>
    <line x1="290.9" y1="36" x2="290.9" y2="420"/>
    <line x1="321.6" y1="36" x2="321.6" y2="420"/>
    <line x1="352.3" y1="36" x2="352.3" y2="420"/>
    <line x1="383" y1="36" x2="383" y2="420"/>
    <line x1="413.8" y1="36" x2="413.8" y2="420"/>
    <line x1="444.5" y1="36" x2="444.5" y2="420"/>
    <line x1="475.2" y1="36" x2="475.2" y2="420"/>
    <line x1="505.9" y1="36" x2="505.9" y2="420"/>
    <line x1="536.6" y1="36" x2="536.6" y2="420"/>
    <line x1="567.4" y1="36" x2="567.4" y2="420"/>
    <line x1="598.1" y1="36" x2="598.1" y2="420"/>
    <line x1="628.8" y1="36" x2="628.8" y2="420"/>
    <line x1="75.8" y1="420" x2="644.2" y2="420"/>
    <line x1="75.8" y1="389.3" x2="644.2" y2="389.3"/>
    <line x1="75.8" y1="358.6" x2="644.2" y2="358.6"/>
    <line x1="75.8" y1="327.8" x2="644.2" y2="327.8"/>
    <line x1="75.8" y1="297.1" x2="644.2" y2="297.1"/>
    <line x1="75.8" y1="266.4" x2="644.2" y2="266.4"/>
    <line x1="75.8" y1="235.7" x2="644.2" y2="235.7"/>
    <line x1="75.8" y1="205" x2="644.2" y2="205"/>
    <line x1="75.8" y1="174.2" x2="644.2" y2="174.2"/>
    <line x1="75.8" y1="143.5" x2="644.2" y2="143.5"/>
    <line x1="75.8" y1="112.8" x2="644.2" y2="112.8"/>
    <line x1="75.8" y1="82.1" x2="644.2" y2="82.1"/>
    <line x1="75.8" y1="51.4" x2="644.2" y2="51.4"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="121.9" y1="36" x2="121.9" y2="420"/>
    <line x1="275.5" y1="36" x2="275.5" y2="420"/>
    <line x1="429.1" y1="36" x2="429.1" y2="420"/>
    <line x1="582.7" y1="36" x2="582.7" y2="420"/>
    <line x1="75.8" y1="358.6" x2="644.2" y2="358.6"/>
    <line x1="75.8" y1="205" x2="644.2" y2="205"/>
    <line x1="75.8" y1="51.4" x2="644.2" y2="51.4"/>
  </g>
  <line x1="75.8" y1="358.6" x2="648.8" y2="358.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="658.2,358.6 647.2,363.6 647.2,353.5" fill="var(--muted, #6F6E69)"/>
  <line x1="275.5" y1="420" x2="275.5" y2="31.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="275.5,22 280.6,33 270.5,33" fill="var(--muted, #6F6E69)"/>
  <line x1="275.5" y1="358.6" x2="73.2" y2="358.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="63.8,358.6 74.8,353.5 74.8,363.6" fill="var(--muted, #6F6E69)"/>
  <line x1="275.5" y1="358.6" x2="275.5" y2="422.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="275.5,432 270.5,421 280.6,421" fill="var(--muted, #6F6E69)"/>
  <line x1="429.1" y1="352.6" x2="429.1" y2="364.6" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="429.1" y="383.6" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="582.7" y1="352.6" x2="582.7" y2="364.6" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="582.7" y="383.6" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="269.5" y1="205" x2="281.5" y2="205" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="263.5" y="211" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <text x="670.2" y="364.6" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="277.5" y="12" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="275.5" y1="358.6" x2="572.1" y2="136.1" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="582.7,128.2 574.5,143.3 565.9,131.8" fill="var(--star, #205EA6)"/>
  <line x1="275.5" y1="358.6" x2="202.9" y2="140.7" stroke="var(--nebula, #5E409D)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="198.7,128.2 210.5,140.7 196.8,145.2" fill="var(--nebula, #5E409D)"/>
  <circle cx="275.5" cy="358.6" r="7" fill="var(--muted, #6F6E69)"/>
  <path d="M 331.5 358.6 A 56 56 0 0 0 320.3 324.9" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="362.8" y="335.4" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">36.9&#176;</text>
  <path d="M 379.5 358.6 A 104 104 0 0 0 242.7 259.9" fill="none" stroke="var(--nebula, #5E409D)" stroke-width="2.2"/>
  <text x="357.4" y="251" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="17" font-weight="600">108.4&#176;</text>
  <rect x="390.1" y="161.4" width="135.6" height="33.6" rx="16.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="457.9" y="186.3" text-anchor="middle" fill="var(--star, #205EA6)" font-size="21" font-weight="600">|<tspan font-style="italic">a</tspan>| = 25.0</text>
  <rect x="211.2" y="155.2" width="135.6" height="33.6" rx="16.8" fill="var(--nebula, #5E409D)" opacity="0.12"/>
  <text x="279" y="180.1" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="21" font-weight="600">|<tspan font-style="italic">b</tspan>| = 15.8</text>
</svg>


---

## Use Trig to Find $\vec{A}_x$ and $\vec{A}_y$


<svg viewBox="0 0 740 400" width="100%" style="max-height:430px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="112.8" y1="34" x2="112.8" y2="360"/>
    <line x1="183.7" y1="34" x2="183.7" y2="360"/>
    <line x1="254.5" y1="34" x2="254.5" y2="360"/>
    <line x1="325.4" y1="34" x2="325.4" y2="360"/>
    <line x1="396.3" y1="34" x2="396.3" y2="360"/>
    <line x1="467.1" y1="34" x2="467.1" y2="360"/>
    <line x1="538" y1="34" x2="538" y2="360"/>
    <line x1="608.9" y1="34" x2="608.9" y2="360"/>
    <line x1="112.8" y1="360" x2="637.2" y2="360"/>
    <line x1="112.8" y1="289.1" x2="637.2" y2="289.1"/>
    <line x1="112.8" y1="218.3" x2="637.2" y2="218.3"/>
    <line x1="112.8" y1="147.4" x2="637.2" y2="147.4"/>
    <line x1="112.8" y1="76.5" x2="637.2" y2="76.5"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="183.7" y1="34" x2="183.7" y2="360"/>
    <line x1="325.4" y1="34" x2="325.4" y2="360"/>
    <line x1="467.1" y1="34" x2="467.1" y2="360"/>
    <line x1="608.9" y1="34" x2="608.9" y2="360"/>
    <line x1="112.8" y1="289.1" x2="637.2" y2="289.1"/>
    <line x1="112.8" y1="147.4" x2="637.2" y2="147.4"/>
  </g>
  <line x1="112.8" y1="289.1" x2="641.9" y2="289.1" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="651.2,289.1 640.2,294.2 640.2,284.1" fill="var(--muted, #6F6E69)"/>
  <line x1="183.7" y1="360" x2="183.7" y2="29.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="183.7,20 188.7,31 178.6,31" fill="var(--muted, #6F6E69)"/>
  <line x1="183.7" y1="289.1" x2="110.1" y2="289.1" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="100.8,289.1 111.8,284.1 111.8,294.2" fill="var(--muted, #6F6E69)"/>
  <line x1="183.7" y1="289.1" x2="183.7" y2="362.6" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="183.7,372 178.6,361 188.7,361" fill="var(--muted, #6F6E69)"/>
  <line x1="325.4" y1="283.1" x2="325.4" y2="295.1" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="325.4" y="314.1" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <line x1="467.1" y1="283.1" x2="467.1" y2="295.1" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="467.1" y="314.1" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">20</text>
  <line x1="608.9" y1="283.1" x2="608.9" y2="295.1" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="608.9" y="314.1" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="16">30</text>
  <line x1="177.7" y1="147.4" x2="189.7" y2="147.4" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="171.7" y="153.4" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="16">10</text>
  <text x="663.2" y="295.1" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">x</text>
  <text x="185.7" y="10" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17" font-style="italic">y</text>
  <line x1="183.7" y1="289.1" x2="554.4" y2="110.6" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="566.3,104.9 555.4,118.1 549.2,105.2" fill="var(--star, #205EA6)"/>
  <circle cx="183.7" cy="289.1" r="7" fill="var(--muted, #6F6E69)"/>
  <path d="M 245.7 289.1 A 62 62 0 0 0 239.5 262.2" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="275.3" y="274.2" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">25.7&#176;</text>
  <rect x="311.7" y="134.9" width="141.2" height="34.6" rx="17.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="382.3" y="160.5" text-anchor="middle" fill="var(--star, #205EA6)" font-size="22" font-weight="600">|<tspan font-style="italic">a</tspan>| = 30.0</text>
</svg>


---


---


## Adding Vectors 


#### Using Components


You can sum the components of the two vectors to find the components of the **resultant** vector 

If $\vec{C} = \vec{A} + \vec{B}$...

* $C_x = A_x + B_x$
* $C_y = A_y + B_y$
* $|C| = \sqrt{C_x^2 + C_y^2 }$

![bg fit right](../figures/Adding-Vectors-Using-Components.gif)


---

### Adding Perpendicular Vectors

Mac and Tosh are doing the Vector Walk Lab. Starting at the door of their physics classroom, they walk 2.0 meters, south. They make a right hand turn and walk 16.0 meters, west. They turn right again and walk 24.0 meters, north. They then turn left and walk 36.0 meters, west. What is the magnitude of their overall displacement?

_A graphical representation of the given problem will help visualize what is happening. The diagram below depicts such a representation._

<svg viewBox="0 0 1020 348" width="100%" style="max-height:300px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="100" y1="193" x2="100" y2="195.9" stroke="var(--coral, #AF3029)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="100,207 94,194 106,194" fill="var(--coral, #AF3029)"/>
  <text x="100" y="236" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">2.0 m, S</text>
  <line x1="360" y1="200" x2="261.6" y2="200" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="248,200 264,192.6 264,207.4" fill="var(--aurora, #66800B)"/>
  <text x="304" y="176" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">16.0 m, W</text>
  <line x1="500" y1="284" x2="500" y2="129.6" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="500,116 507.4,132 492.6,132" fill="var(--star, #205EA6)"/>
  <text x="516" y="206" text-anchor="start" fill="var(--star, #205EA6)" font-size="19" font-weight="600">24.0 m, N</text>
  <line x1="960" y1="200" x2="721.6" y2="200" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="708,200 724,192.6 724,207.4" fill="var(--aurora, #66800B)"/>
  <text x="834" y="176" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">36.0 m, W</text>
  <text x="178" y="210" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="34" font-weight="600">+</text>
  <text x="424" y="210" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="34" font-weight="600">+</text>
  <text x="664" y="210" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="34" font-weight="600">+</text>
  <text x="510" y="332" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">the four legs, each drawn to the same scale</text>
</svg>

---

## Step 1: Tip-to-tail


<svg viewBox="300 46 520 312" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="700" y1="250" x2="700" y2="250.4" stroke="var(--coral, #AF3029)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="700,264 692.6,248 707.4,248" fill="var(--coral, #AF3029)"/>
  <text x="716" y="265" text-anchor="start" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">2.0 m, S</text>
  <line x1="700" y1="264" x2="601.6" y2="264" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="588,264 604,256.6 604,271.4" fill="var(--aurora, #66800B)"/>
  <text x="644" y="294" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">16.0 m, W</text>
  <line x1="588" y1="264" x2="588" y2="109.6" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="588,96 595.4,112 580.6,112" fill="var(--star, #205EA6)"/>
  <text x="604" y="186" text-anchor="start" fill="var(--star, #205EA6)" font-size="19" font-weight="600">24.0 m, N</text>
  <line x1="588" y1="96" x2="349.6" y2="96" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="336,96 352,88.6 352,103.4" fill="var(--aurora, #66800B)"/>
  <text x="462" y="78" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">36.0 m, W</text>
  <line x1="700" y1="250" x2="350.1" y2="102" stroke="var(--ink, #100F0F)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="336,96 355.8,95.4 349.4,110.6" fill="var(--ink, #100F0F)"/>
  <circle cx="700" cy="250" r="6" fill="var(--ink, #100F0F)"/>
  <text x="548" y="163" text-anchor="middle" fill="var(--ink, #100F0F)" font-size="25" font-weight="600" font-style="italic">R</text>
  <text x="560" y="346" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">walk the legs tip to tail &#8212; R joins start to finish</text>
</svg>

---

## Step 2: Sum $X$ and $Y$ directions

<svg viewBox="300 48 680 412" width="100%" style="max-height:410px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="700" y1="300" x2="700" y2="300.4" stroke="var(--coral, #AF3029)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="700,314 692.6,298 707.4,298" fill="var(--coral, #AF3029)"/>
  <text x="686" y="329" text-anchor="end" fill="var(--coral, #AF3029)" font-size="19" font-weight="600">2.0 m, S</text>
  <line x1="700" y1="314" x2="700" y2="159.6" stroke="var(--star, #205EA6)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="700,146 707.4,162 692.6,162" fill="var(--star, #205EA6)"/>
  <text x="686" y="236" text-anchor="end" fill="var(--star, #205EA6)" font-size="19" font-weight="600">24.0 m, N</text>
  <line x1="700" y1="146" x2="601.6" y2="146" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="588,146 604,138.6 604,153.4" fill="var(--aurora, #66800B)"/>
  <text x="644" y="128" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">16.0 m, W</text>
  <line x1="588" y1="146" x2="349.6" y2="146" stroke="var(--aurora, #66800B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="336,146 352,138.6 352,153.4" fill="var(--aurora, #66800B)"/>
  <text x="462" y="128" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">36.0 m, W</text>
  <line x1="700" y1="300" x2="350.1" y2="152" stroke="var(--ink, #100F0F)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="336,146 355.8,145.4 349.4,160.6" fill="var(--ink, #100F0F)"/>
  <circle cx="700" cy="300" r="6" fill="var(--ink, #100F0F)"/>
  <text x="520" y="259" text-anchor="middle" fill="var(--ink, #100F0F)" font-size="25" font-weight="600" font-style="italic">R</text>
  <line x1="336" y1="96" x2="700" y2="96" stroke="var(--aurora, #66800B)" stroke-width="2" stroke-dasharray="6 5" opacity="0.75"/>
  <line x1="336" y1="96" x2="336" y2="112" stroke="var(--aurora, #66800B)" stroke-width="2" opacity="0.75"/>
  <line x1="700" y1="96" x2="700" y2="112" stroke="var(--aurora, #66800B)" stroke-width="2" opacity="0.75"/>
  <rect x="429.2" y="60.6" width="177.6" height="31.6" rx="15.8" fill="var(--aurora, #66800B)" opacity="0.12"/>
  <text x="518" y="84" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="19" font-weight="600">52.0 m, W total</text>
  <line x1="792" y1="314" x2="792" y2="146" stroke="var(--star, #205EA6)" stroke-width="2" stroke-dasharray="6 5" opacity="0.75"/>
  <line x1="776" y1="314" x2="792" y2="314" stroke="var(--star, #205EA6)" stroke-width="2" opacity="0.75"/>
  <line x1="776" y1="146" x2="792" y2="146" stroke="var(--star, #205EA6)" stroke-width="2" opacity="0.75"/>
  <rect x="793" y="212.6" width="177.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="802" y="236" text-anchor="start" fill="var(--star, #205EA6)" font-size="19" font-weight="600">22.0 m, N total</text>
  <text x="640" y="446" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">group the north&#8211;south legs, then the east&#8211;west legs</text>
</svg>

---



# Practice 🎯 <!--fit--->

## [Adding 2 Perpendicular Vectors](https://www.physicsclassroom.com/calcpad/launch/CPVP5)

## [Adding 3 or More Perpendicular Vectors](https://www.physicsclassroom.com/calcpad/launch/CPVP6)


---

# Vector Treasure Hunt 🪙

1. Create a Vector Map (draw this on the map of the school) -> start at one of the entrances of the school.
2. Record all vectors in component form and Magnitude-direction from (use the convention degrees clockwise from North...this is the setting your iPhone compass uses)
3. Exchange vector directions with another group and draw their vector map on your grid in another color or symbol (i.e. dotted line)
4. Calculate the displacement of the the vector map
5. Go walk the map and record the landmarks at the end of each vector.

---

# Vector Descriptions

<div class='columns'>
<div class='col'>

- Component Form:
    - $\vec{a} = \langle a_x, a_y\rangle$
    - $\vec{a} = \langle 20,10 \rangle$
- Magnitude-direction form:
    - $|\vec{a}|=22.4$ units at $\theta = 26.6$ degrees

</div>
<div class='col'>

<svg viewBox="0 0 560 420" width="100%" style="max-height:350px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <g stroke="var(--grid-minor, #E6E4D9)" stroke-width="1" opacity="0.85">
    <line x1="44" y1="63.2" x2="44" y2="324.8"/>
    <line x1="73.1" y1="63.2" x2="73.1" y2="324.8"/>
    <line x1="102.1" y1="63.2" x2="102.1" y2="324.8"/>
    <line x1="131.2" y1="63.2" x2="131.2" y2="324.8"/>
    <line x1="160.3" y1="63.2" x2="160.3" y2="324.8"/>
    <line x1="189.3" y1="63.2" x2="189.3" y2="324.8"/>
    <line x1="218.4" y1="63.2" x2="218.4" y2="324.8"/>
    <line x1="247.5" y1="63.2" x2="247.5" y2="324.8"/>
    <line x1="276.5" y1="63.2" x2="276.5" y2="324.8"/>
    <line x1="305.6" y1="63.2" x2="305.6" y2="324.8"/>
    <line x1="334.7" y1="63.2" x2="334.7" y2="324.8"/>
    <line x1="363.7" y1="63.2" x2="363.7" y2="324.8"/>
    <line x1="392.8" y1="63.2" x2="392.8" y2="324.8"/>
    <line x1="421.9" y1="63.2" x2="421.9" y2="324.8"/>
    <line x1="450.9" y1="63.2" x2="450.9" y2="324.8"/>
    <line x1="480" y1="63.2" x2="480" y2="324.8"/>
    <line x1="44" y1="324.8" x2="480" y2="324.8"/>
    <line x1="44" y1="295.7" x2="480" y2="295.7"/>
    <line x1="44" y1="266.7" x2="480" y2="266.7"/>
    <line x1="44" y1="237.6" x2="480" y2="237.6"/>
    <line x1="44" y1="208.5" x2="480" y2="208.5"/>
    <line x1="44" y1="179.5" x2="480" y2="179.5"/>
    <line x1="44" y1="150.4" x2="480" y2="150.4"/>
    <line x1="44" y1="121.3" x2="480" y2="121.3"/>
    <line x1="44" y1="92.3" x2="480" y2="92.3"/>
    <line x1="44" y1="63.2" x2="480" y2="63.2"/>
  </g>
  <g stroke="var(--grid-major, #DAD8CE)" stroke-width="1.4">
    <line x1="102.1" y1="63.2" x2="102.1" y2="324.8"/>
    <line x1="247.5" y1="63.2" x2="247.5" y2="324.8"/>
    <line x1="392.8" y1="63.2" x2="392.8" y2="324.8"/>
    <line x1="44" y1="266.7" x2="480" y2="266.7"/>
    <line x1="44" y1="121.3" x2="480" y2="121.3"/>
  </g>
  <line x1="44" y1="266.7" x2="484.6" y2="266.7" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="494,266.7 483,271.7 483,261.6" fill="var(--muted, #6F6E69)"/>
  <line x1="102.1" y1="324.8" x2="102.1" y2="58.5" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="102.1,49.2 107.2,60.2 97.1,60.2" fill="var(--muted, #6F6E69)"/>
  <line x1="102.1" y1="266.7" x2="41.4" y2="266.7" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="32,266.7 43,261.6 43,271.7" fill="var(--muted, #6F6E69)"/>
  <line x1="102.1" y1="266.7" x2="102.1" y2="327.4" stroke="var(--muted, #6F6E69)" stroke-width="2" stroke-linecap="round"/>
  <polygon points="102.1,336.8 97.1,325.8 107.2,325.8" fill="var(--muted, #6F6E69)"/>
  <line x1="247.5" y1="260.7" x2="247.5" y2="272.7" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="247.5" y="291.7" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="15">10</text>
  <line x1="392.8" y1="260.7" x2="392.8" y2="272.7" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="392.8" y="291.7" text-anchor="middle" fill="var(--ink-3, #B7B5AC)" font-size="15">20</text>
  <line x1="96.1" y1="121.3" x2="108.1" y2="121.3" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="90.1" y="127.3" text-anchor="end" fill="var(--ink-3, #B7B5AC)" font-size="15">10</text>
  <text x="506" y="272.7" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" font-style="italic">x</text>
  <text x="104.1" y="39.2" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" font-style="italic">y</text>
  <line x1="102.1" y1="266.7" x2="383.4" y2="266.7" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="392.8,266.7 381.8,271.7 381.8,261.6" fill="var(--star, #205EA6)" opacity="0.85"/>
  <line x1="392.8" y1="266.7" x2="392.8" y2="130.7" stroke="var(--star, #205EA6)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.85"/>
  <polygon points="392.8,121.3 397.9,132.3 387.7,132.3" fill="var(--star, #205EA6)" opacity="0.85"/>
  <rect x="217.2" y="305.3" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="247.5" y="328.7" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">20.0</text>
  <rect x="410.5" y="176.6" width="60.6" height="31.6" rx="15.8" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="440.8" y="200" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">10.0</text>
  <line x1="102.1" y1="266.7" x2="380.9" y2="127.3" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="392.8,121.3 382.1,134.7 375.6,121.9" fill="var(--star, #205EA6)"/>
  <circle cx="102.1" cy="266.7" r="7" fill="var(--muted, #6F6E69)"/>
  <path d="M 152.1 266.7 A 50 50 0 0 0 146.8 244.3" fill="none" stroke="var(--solar, #AD8301)" stroke-width="2.2"/>
  <text x="183.9" y="253.3" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">26.6&#176;</text>
  <rect x="184.7" y="137.7" width="130" height="32.6" rx="16.3" fill="var(--star, #205EA6)" opacity="0.12"/>
  <text x="249.7" y="161.9" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">|<tspan font-style="italic">a</tspan>| = 22.4</text>
</svg>

</div>
</div>

---

# Relative Motion <!--fit--->

---

<iframe width="1100" height="700" src="https://www.youtube.com/embed/bJMYoj4hHqU?si=CIP2ANhEbkR27lj-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

# Relative Velocity and Vector Addition

- **Goal:** Understand how velocities add as vectors and why motion is relative to the observer.

---

# 📝 Complete AP Workbook **1.E** <!--fit--->

---

# 1D Relative Motion: Vector Sums

<div class='columns'>
<div class='col'>

<svg viewBox="0 0 700 390" width="100%" style="max-height:320px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <text x="120" y="40" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">plane velocity</text>
  <text x="330" y="40" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">wind velocity</text>
  <text x="565" y="40" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">resultant</text>
  <g fill="var(--star, #205EA6)">
    <ellipse cx="120" cy="88" rx="9.8" ry="20.1"/>
    <rect x="82.5" y="84.1" width="75" height="7.9" rx="3.5"/>
    <rect x="104.2" y="101.1" width="31.5" height="6.1" rx="2.6"/>
  </g>
  <line x1="120" y1="112" x2="120" y2="250.8" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="120,267 111.3,248 128.7,248" fill="var(--star, #205EA6)"/>
  <text x="120" y="297" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">100 km/hr</text>
  <text x="228" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">+</text>
  <text x="455" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">=</text>
  <line x1="330" y1="170" x2="330" y2="192.6" stroke="var(--aurora, #66800B)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="330,208.8 321.3,189.8 338.7,189.8" fill="var(--aurora, #66800B)"/>
  <text x="330" y="236.8" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">25 km/hr</text>
  <line x1="565" y1="112" x2="565" y2="289.6" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="565,305.8 556.3,286.8 573.7,286.8" fill="var(--coral, #AF3029)"/>
  <text x="565" y="335.8" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">125 km/hr</text>
  <text x="350" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">tailwind &#8212; the two add</text>
</svg>

</div>
<div class='col'>

<svg viewBox="0 0 700 390" width="100%" style="max-height:320px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <text x="120" y="40" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">plane velocity</text>
  <text x="330" y="40" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">wind velocity</text>
  <text x="565" y="40" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">resultant</text>
  <g fill="var(--star, #205EA6)">
    <ellipse cx="120" cy="88" rx="9.8" ry="20.1"/>
    <rect x="82.5" y="84.1" width="75" height="7.9" rx="3.5"/>
    <rect x="104.2" y="101.1" width="31.5" height="6.1" rx="2.6"/>
  </g>
  <line x1="120" y1="112" x2="120" y2="250.8" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="120,267 111.3,248 128.7,248" fill="var(--star, #205EA6)"/>
  <text x="120" y="297" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">100 km/hr</text>
  <text x="228" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">+</text>
  <text x="455" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">=</text>
  <line x1="330" y1="212" x2="330" y2="189.4" stroke="var(--aurora, #66800B)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="330,173.2 338.7,192.2 321.3,192.2" fill="var(--aurora, #66800B)"/>
  <text x="330" y="240" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">25 km/hr</text>
  <line x1="565" y1="112" x2="565" y2="212.1" stroke="var(--coral, #AF3029)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="565,228.2 556.3,209.2 573.7,209.2" fill="var(--coral, #AF3029)"/>
  <text x="565" y="258.2" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">75 km/hr</text>
  <text x="350" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">headwind &#8212; they subtract</text>
</svg>

</div>
</div>

---

# Pivot: One-Dimensional Relative Motion Using a Drone

---

# Boat Crossing a River: Resultant Velocity

When a boat heads straight across, the river current carries it downstream. The boat’s velocity relative to water adds vectorially to the current’s velocity relative to ground.

![center w:400](https://openstax.org/apps/image-cdn/v1/f=webp/apps/archive/20250916.165151/resources/4a95f3dc74d754bf791cdafa69c8521b930b1c14)


---

<iframe id="interactiveIframe" style="width:100%; height:100%;" scrolling="no" allowfullscreen="allowfullscreen" src="https://www.physicsclassroom.com/html-module/river-boat/1/index.html"></iframe>


---

<svg viewBox="0 0 700 390" width="100%" style="max-height:420px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <text x="120" y="40" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">plane velocity</text>
  <text x="330" y="40" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">wind velocity</text>
  <text x="565" y="40" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">resultant</text>
  <g fill="var(--star, #205EA6)">
    <ellipse cx="120" cy="88" rx="9.8" ry="20.1"/>
    <rect x="82.5" y="84.1" width="75" height="7.9" rx="3.5"/>
    <rect x="104.2" y="101.1" width="31.5" height="6.1" rx="2.6"/>
  </g>
  <line x1="120" y1="112" x2="120" y2="250.8" stroke="var(--star, #205EA6)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="120,267 111.3,248 128.7,248" fill="var(--star, #205EA6)"/>
  <text x="120" y="297" text-anchor="middle" fill="var(--star, #205EA6)" font-size="20" font-weight="600">100 km/hr</text>
  <text x="228" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">+</text>
  <text x="455" y="206" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="32" font-weight="600">=</text>
  <line x1="349.4" y1="190" x2="326.8" y2="190" stroke="var(--aurora, #66800B)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="310.6,190 329.6,181.3 329.6,198.7" fill="var(--aurora, #66800B)"/>
  <text x="330" y="226" text-anchor="middle" fill="var(--aurora, #66800B)" font-size="20" font-weight="600">25 km/hr</text>
  <path d="M 600 112 L 600 267 L 561.2 267 Z" fill="var(--coral, #AF3029)" opacity="0.07"/>
  <line x1="600" y1="112" x2="600" y2="255.1" stroke="var(--star, #205EA6)" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.55"/>
  <polygon points="600,267 593.6,253 606.4,253" fill="var(--star, #205EA6)" opacity="0.55"/>
  <line x1="600" y1="267" x2="573.1" y2="267" stroke="var(--aurora, #66800B)" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="7 6" opacity="0.65"/>
  <polygon points="561.2,267 575.2,260.6 575.2,273.4" fill="var(--aurora, #66800B)" opacity="0.65"/>
  <line x1="600" y1="112" x2="565.4" y2="250.5" stroke="var(--coral, #AF3029)" stroke-width="6.5" stroke-linecap="round"/>
  <polygon points="561.2,267 557.2,245.4 575,249.8" fill="var(--coral, #AF3029)"/>
  <text x="556" y="197.5" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="26" font-weight="600" font-style="italic">R</text>
  <text x="578" y="297" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="20" font-weight="600">R = 103.1 km/hr</text>
  <text x="350" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">crosswind &#8212; perpendicular, so use Pythagoras</text>
</svg>

---

# [Riverboat Problems](https://www.physicsclassroom.com/PhysicsClassroom/media/interactive/RiverBoatSim/index.html)

<div class='columns'>
<div class='col'>

- River current is 4 m/s North
- Boat velocity is 4 m/s East
- What does a drone see?
- How can we predict this **resultant velocity**?

</div>
<div class='col'>

<svg viewBox="0 0 780 390" width="100%" style="max-height:320px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <rect x="96" y="40" width="588" height="276" fill="var(--cyan, #24837B)" opacity="0.10"/>
  <rect x="14" y="40" width="82" height="276" rx="6" fill="var(--aurora, #66800B)" opacity="0.14"/>
  <circle cx="68.1" cy="74" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="41.9" cy="136" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="68.1" cy="198" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="41.9" cy="260" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <rect x="684" y="40" width="82" height="276" rx="6" fill="var(--aurora, #66800B)" opacity="0.14"/>
  <circle cx="738.1" cy="74" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="711.9" cy="136" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="738.1" cy="198" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="711.9" cy="260" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <path d="M 108.7 262 Q 115 274 157.2 274 L 171.3 262 Z" fill="var(--star, #205EA6)" opacity="0.28"/>
  <rect x="132.2" y="251.2" width="15.6" height="10.8" rx="3" fill="var(--star, #205EA6)" opacity="0.28"/>
  <path d="M 223.7 224.5 Q 230 236.5 272.2 236.5 L 286.3 224.5 Z" fill="var(--star, #205EA6)" opacity="0.46"/>
  <rect x="247.2" y="213.7" width="15.6" height="10.8" rx="3" fill="var(--star, #205EA6)" opacity="0.46"/>
  <path d="M 338.7 187 Q 345 199 387.2 199 L 401.3 187 Z" fill="var(--star, #205EA6)" opacity="0.64"/>
  <rect x="362.2" y="176.2" width="15.6" height="10.8" rx="3" fill="var(--star, #205EA6)" opacity="0.64"/>
  <path d="M 453.7 149.5 Q 460 161.5 502.2 161.5 L 516.3 149.5 Z" fill="var(--star, #205EA6)" opacity="0.8200000000000001"/>
  <rect x="477.2" y="138.7" width="15.6" height="10.8" rx="3" fill="var(--star, #205EA6)" opacity="0.8200000000000001"/>
  <path d="M 568.7 112 Q 575 124 617.2 124 L 631.3 112 Z" fill="var(--star, #205EA6)" opacity="1.0"/>
  <rect x="592.2" y="101.2" width="15.6" height="10.8" rx="3" fill="var(--star, #205EA6)" opacity="1.0"/>
  <line x1="140" y1="300" x2="287.2" y2="300" stroke="var(--plasma, #BC5215)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="300,300 285,306.9 285,293.1" fill="var(--plasma, #BC5215)"/>
  <text x="222" y="326" text-anchor="middle" fill="var(--plasma, #BC5215)" font-size="19" font-weight="600">boat velocity</text>
  <line x1="430" y1="236" x2="430" y2="128.8" stroke="var(--cyan, #24837B)" stroke-width="5" stroke-linecap="round"/>
  <polygon points="430,116 436.9,131 423.1,131" fill="var(--cyan, #24837B)"/>
  <text x="446" y="182" text-anchor="start" fill="var(--cyan, #24837B)" font-size="19" font-weight="600">river current</text>
  <line x1="140" y1="262" x2="586.3" y2="116.5" stroke="var(--nebula, #5E409D)" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="9 7"/>
  <polygon points="600,112 586.3,124.7 581.4,109.8" fill="var(--nebula, #5E409D)"/>
  <text x="392" y="76" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="19" font-weight="600">path over the ground = boat + current</text>
  <text x="390" y="376" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">heading straight across, the boat still lands downstream</text>
</svg>

</div>
</div>

---

# Example Riverboat

A motorboat traveling 4 m/s, East encounters a current traveling 3.0 m/s, North.

<div class='columns'>
<div class='col'>

1. What is the resultant velocity of the motorboat?
2. If the width of the river is 80 meters wide, then how much time does it take the boat to travel shore to shore?
3. What distance downstream does the boat reach the opposite shore?

</div>
<div class='col'>

<svg viewBox="0 0 820 400" width="100%" style="max-height:320px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <rect x="96" y="30" width="628" height="296" fill="var(--cyan, #24837B)" opacity="0.10"/>
  <rect x="14" y="30" width="82" height="296" rx="6" fill="var(--aurora, #66800B)" opacity="0.14"/>
  <circle cx="68.1" cy="64" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="41.9" cy="126" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="68.1" cy="188" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="41.9" cy="250" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="68.1" cy="312" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <rect x="724" y="30" width="82" height="296" rx="6" fill="var(--aurora, #66800B)" opacity="0.14"/>
  <circle cx="778.1" cy="64" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="751.9" cy="126" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="778.1" cy="188" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="751.9" cy="250" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <circle cx="778.1" cy="312" r="11" fill="var(--aurora, #66800B)" opacity="0.4"/>
  <line x1="140" y1="268" x2="605.5" y2="268" stroke="var(--plasma, #BC5215)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="620,268 603,275.8 603,260.2" fill="var(--plasma, #BC5215)"/>
  <text x="380" y="300" text-anchor="middle" fill="var(--plasma, #BC5215)" font-size="19" font-weight="600">distance A &#8212; boat speed</text>
  <line x1="620" y1="268" x2="620" y2="132.4" stroke="var(--cyan, #24837B)" stroke-width="5.5" stroke-linecap="round"/>
  <polygon points="620,118 627.8,135 612.2,135" fill="var(--cyan, #24837B)"/>
  <text x="636" y="199" text-anchor="start" fill="var(--cyan, #24837B)" font-size="19" font-weight="600">distance B</text>
  <text x="636" y="221" text-anchor="start" fill="var(--cyan, #24837B)" font-size="19" font-weight="600">river speed</text>
  <line x1="140" y1="268" x2="604.6" y2="122.8" stroke="var(--nebula, #5E409D)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="620,118 604.5,132 599.3,115.3" fill="var(--nebula, #5E409D)"/>
  <text x="360" y="162" text-anchor="middle" fill="var(--nebula, #5E409D)" font-size="19" font-weight="600">distance C &#8212; resultant</text>
  <circle cx="140" cy="268" r="7" fill="var(--ink, #100F0F)"/>
  <text x="126" y="275" text-anchor="end" fill="var(--ink, #100F0F)" font-size="19" font-weight="600">start</text>
  <circle cx="620" cy="118" r="7" fill="var(--ink, #100F0F)"/>
  <text x="622" y="102" text-anchor="middle" fill="var(--ink, #100F0F)" font-size="19" font-weight="600">finish</text>
  <text x="410" y="386" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="17">the same trip, read three ways: across, downstream, and the resultant</text>
</svg>

</div>
</div>

---

# [Riverboat Practice](https://www.physicsclassroom.com/calcpad/launch/CPVP10) <!--fit--->

---

# Pivot: 2D Motion with a Drone



---
<!--- _class: phase-title --->

# Horizontal Projectiles

---

Two toy trucks roll off the ends of identical tables. The speeds and masses of the trucks are given.

![center](../figures/horzprojec1.png)

**Will Truck A be in the air for (i) _a longer time_, (ii) a _shorter time_, or (iii) the _same time_ as Truck B before it reaches the floor?**

Explain your reasoning.


---


Two toy trucks roll off the ends of identical tables. The speeds and masses of the trucks are given.

![center w:500](../figures/horizprojec2.png)

**Will Truck A be in the air for (i) _a longer time_, (ii) a _shorter time_, or (iii) the _same time_ as Truck B before it reaches the floor?**

Explain your reasoning.

---


# **Launcher** Demo <!--fit--->

---

# What are the three possible outcomes?

1) Right ball ($v_x > 0$) hits first 
2) Left ball ($v_x =0$) hits first 
3) Balls hit at the same time 

---

# What does each result imply about the **horizontal velocity's** effect on **flight time**?


1. Right ball ($v_x > 0$) hits first 
2. Left ball ($v_x =0$) hits first 
3. Balls hit at the same time 


---

<!--- _class: compact --->

# What the Demo Showed

<div class='columns cols-1-2'>
<div class='col'>

## The two motions are independent

Both balls are released at the same instant. Every dashed line joins them at the **same moment in time**.

They are always at the **same height** — the horizontal velocity does nothing to the fall.

<div class="small">

Positions drawn at equal time steps

</div>

</div>
<div class='col'>

<svg viewBox="0 0 640 400" width="100%" style="max-height:330px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <line x1="40" y1="368" x2="615" y2="368" stroke="var(--muted, #6F6E69)" stroke-width="2.5"/>
  <line x1="95" y1="50" x2="95" y2="368" stroke="var(--coral, #AF3029)" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.55"/>
  <path d="M 95 50 Q 335 50 575 368" fill="none" stroke="var(--star, #205EA6)" stroke-width="2.5" stroke-dasharray="5 5" opacity="0.6"/>
  <line x1="95" y1="70"  x2="215" y2="70"  stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="95" y1="130" x2="335" y2="130" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="95" y1="229" x2="455" y2="229" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <line x1="95" y1="368" x2="575" y2="368" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="4 4"/>
  <circle cx="95" cy="70"  r="9" fill="var(--coral, #AF3029)"/>
  <circle cx="95" cy="130" r="9" fill="var(--coral, #AF3029)"/>
  <circle cx="95" cy="229" r="9" fill="var(--coral, #AF3029)"/>
  <circle cx="95" cy="368" r="9" fill="var(--coral, #AF3029)"/>
  <circle cx="215" cy="70"  r="9" fill="var(--star, #205EA6)"/>
  <circle cx="335" cy="130" r="9" fill="var(--star, #205EA6)"/>
  <circle cx="455" cy="229" r="9" fill="var(--star, #205EA6)"/>
  <circle cx="575" cy="368" r="9" fill="var(--star, #205EA6)"/>
  <circle cx="95" cy="50" r="10" fill="var(--solar, #AD8301)"/>
  <text x="112" y="44" fill="var(--solar, #AD8301)" font-size="17" font-weight="600">released together</text>
  <text x="80" y="392" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="17" font-weight="600">dropped</text>
  <text x="520" y="392" text-anchor="middle" fill="var(--star, #205EA6)" font-size="17" font-weight="600">launched</text>
</svg>

</div>
</div>

---

# Horizontal Projectiles 

* A ***projectile*** is an object that *only* experiences a gravitational force
* For _**horizontal projectiles**_ the $v_{0y} = 0$
* We can separate motion in the $x$ and $y$ planes and solve separately

---

# Path of a Projectile 

<div class='columns'>
<div class='col'>

![center w:650](image-17.png)

</div>
 
<div class='col'>

![center w:650](image-18.png)

</div>
</div>

---

# Path of a Projectile

<div class='columns'>
<div class='col'>

<br>

![center w:650](image-19.png)

</div>
 
<div class='col'>

![center w:550](image-20.png)

</div>
</div>

---


|                                                                                 | Horizontal Motion | Vertical Motion     |
| ------------------------------------------------------------------------------- | -------------------------------------- | --------------------------------------------- |
| **Forces**<br>(Present? - Yes or No)<br>(If present, what dir'n?)       | No                                     | Yes<br>The force of gravity acts downward |
| **Acceleration**<br>(Present? - Yes or No)<br>(If present, what dir'n?) | No                                     | Yes<br>$g$ is downward at 10 m/s/s       |
| **Velocity**<br>(Constant or Changing?)                                     | Constant                               | Changing<br>(by 10 m/s each second)      |

---

## Horizontal and Vertical Velocity 

![center w:750](image-21.png)


---


## Horizontal and Vertical Displacement 

![center w:740](image-22.png)

---

<!--- _class: compact --->

# The Two Graphs That Matter

<div class='columns'>
<div class='col'>

<svg viewBox="0 0 420 330" width="100%" style="max-height:275px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <polygon points="60,100 340,100 340,250 60,250" fill="var(--star, #205EA6)" opacity="0.13"/>
  <line x1="60" y1="100" x2="380" y2="100" stroke="var(--ink-3, #B7B5AC)" stroke-width="1" stroke-opacity="0.7"/>
  <line x1="60" y1="45" x2="60" y2="275" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="40" y1="250" x2="380" y2="250" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="60" y1="100" x2="340" y2="100" stroke="var(--star, #205EA6)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="60" cy="100" r="6" fill="var(--star, #205EA6)"/>
  <circle cx="340" cy="100" r="6" fill="var(--star, #205EA6)"/>
  <text x="50" y="106" text-anchor="end" fill="var(--star, #205EA6)" font-size="17" font-weight="600">10</text>
  <text x="50" y="256" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">0</text>
  <text x="200" y="180" text-anchor="middle" fill="var(--star, #205EA6)" font-size="15">area = horizontal distance</text>
  <text x="22" y="150" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" transform="rotate(-90 22 150)">v (m/s)</text>
  <text x="210" y="276" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">time (s)</text>
  <text x="210" y="302" text-anchor="middle" fill="var(--star, #205EA6)" font-size="18" font-weight="600">horizontal</text>
  <text x="210" y="322" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="15">slope = 0, so no acceleration</text>
</svg>

</div>
<div class='col'>

<svg viewBox="0 0 420 330" width="100%" style="max-height:275px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <polygon points="60,100 340,250 60,250" fill="var(--coral, #AF3029)" opacity="0.13"/>
  <line x1="60" y1="250" x2="380" y2="250" stroke="var(--ink-3, #B7B5AC)" stroke-width="1" stroke-opacity="0.7"/>
  <line x1="60" y1="45" x2="60" y2="275" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="40" y1="100" x2="380" y2="100" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <line x1="60" y1="100" x2="340" y2="250" stroke="var(--coral, #AF3029)" stroke-width="4" stroke-linecap="round"/>
  <circle cx="60" cy="100" r="6" fill="var(--coral, #AF3029)"/>
  <circle cx="340" cy="250" r="6" fill="var(--coral, #AF3029)"/>
  <text x="50" y="106" text-anchor="end" fill="var(--muted, #6F6E69)" font-size="17">0</text>
  <text x="50" y="256" text-anchor="end" fill="var(--coral, #AF3029)" font-size="17" font-weight="600">&#8722;30</text>
  <text x="235" y="200" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="15">area = drop height</text>
  <text x="22" y="150" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16" transform="rotate(-90 22 150)">v (m/s)</text>
  <text x="210" y="92" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">time (s)</text>
  <text x="210" y="302" text-anchor="middle" fill="var(--coral, #AF3029)" font-size="18" font-weight="600">vertical</text>
  <text x="210" y="322" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="15">slope = &#8722;10 m/s&#178;</text>
</svg>

</div>
</div>

<div class="key-idea">

**Same clock, two independent stories.** The horizontal graph is flat because nothing pushes sideways. The vertical graph is identical to a dropped object's.

</div>

---


# Horizontally Launched Projectiles


* Projectile launched with an initial horizontal velocity from an elevated position. 
* Predictable unknowns include the initial speed of the projectile, the initial height of the projectile, the time of flight, and the horizontal distance of the projectile.

![bg fit right:30%](image-23.png)

---

# Horizontal Projectiles 

<div class='columns'>

<div class='col'>

## X-Plane Motion

- $v_x$ is ***constant***

$$d = v_x t$$

</div>

<div class='col'>

## Y-Plane Motion 

- constant acceleration $a_y = g$

$$d = v_{0y}t + \frac{1}{2}gt^2$$

$$v_y = v_{0y} + at$$

$$v_y^2 = v_{0y}^2 + 2ad$$

</div></div>


---

<!--- _class: compact --->

# The Double Cross Diagram

<div class='columns cols-1-2'>
<div class='col'>

Two motions, **one clock**. Stack a horizontal cross on a vertical cross and let them share $\Delta t$.

- The $x$ cross has $a_x = 0$, so it collapses to $\Delta x = v_x \Delta t$
- The $y$ cross is ordinary free fall
- $\Delta t$ is the **only** quantity they share

<div class="warning">

**That shared $\Delta t$ is the whole trick.** Find the time in one cross, then carry it into the other.

</div>

</div>
<div class='col'>

<svg viewBox="0 0 560 440" width="100%" style="max-height:400px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" text-anchor="middle">
  <rect x="24" y="20" width="512" height="180" rx="10" fill="var(--star, #205EA6)" opacity="0.07"/>
  <rect x="24" y="238" width="512" height="180" rx="10" fill="var(--coral, #AF3029)" opacity="0.07"/>
  <text x="280" y="62" fill="var(--nebula, #5E409D)" font-size="29" font-weight="600">&#916;x</text>
  <text x="110" y="140" fill="var(--star, #205EA6)" font-size="29" font-weight="600">v<tspan font-size="19" dy="6">0x</tspan></text>
  <text x="280" y="140" fill="var(--coral, #AF3029)" font-size="29" font-weight="600">a<tspan font-size="19" dy="6">x</tspan></text>
  <text x="450" y="140" fill="var(--star, #205EA6)" font-size="29" font-weight="600">v<tspan font-size="19" dy="6">x</tspan></text>
  <text x="280" y="228" fill="var(--plasma, #BC5215)" font-size="31" font-weight="700">&#916;t</text>
  <text x="110" y="310" fill="var(--star, #205EA6)" font-size="29" font-weight="600">v<tspan font-size="19" dy="6">0y</tspan></text>
  <text x="280" y="310" fill="var(--coral, #AF3029)" font-size="29" font-weight="600">a<tspan font-size="19" dy="6">y</tspan></text>
  <text x="450" y="310" fill="var(--star, #205EA6)" font-size="29" font-weight="600">v<tspan font-size="19" dy="6">y</tspan></text>
  <text x="280" y="398" fill="var(--nebula, #5E409D)" font-size="29" font-weight="600">&#916;y</text>
  <text x="474" y="60" fill="var(--star, #205EA6)" font-size="16" text-anchor="end">horizontal</text>
  <text x="474" y="396" fill="var(--coral, #AF3029)" font-size="16" text-anchor="end">vertical</text>
  <text x="408" y="233" fill="var(--plasma, #BC5215)" font-size="16" text-anchor="start">shared by both</text>
</svg>

</div>
</div>

---

# Problem-solving Process

1) Read & sketch problem
2) Identify given information & fill out double cross diagram 
3) Identify the quantity you are solving for
4) **Using either horizontal or vertical information, find the flight time of the projectile**
5) With the time find the quantity you are solving for. 


![bg fit right:40%](image-24.png)


---


# Example 

A pool ball leaves a 0.60-meter high table with an initial horizontal velocity of 2.4 m/s. Predict the time required for the pool ball to fall to the ground and the horizontal distance between the table's edge and the ball's landing location.

![bg fit right:40%](image-24.png)

---

# Practice 

A soccer ball is kicked horizontally off a 22.0-meter high hill and lands a distance of 35.0 meters from the edge of the hill. Determine the initial horizontal velocity of the soccer ball.


---


# Practice 

In many locations, old abandoned stone quarries have become filled with water once excavating has been completed. While standing on a quarry wall, a boy tosses a piece of granite into the water below. If he throws the rock horizontally with a velocity of 3.0 m/s, and it strikes the water 4.5 meters away, how high above the water is the wall?

---

# Practice w/ Table 

Suppose that an airplane flying 60 m/s, at a height of 300 meters, dropped a sack of flour. How far from the point of release would the sack have traveled when it struck the ground? Where will the plane be in relation to the sack when it hits the ground?

---

# Practice 

A stone is thrown horizontally to the right at a speed of 17.2 m/s from the top of a cliff that is 91.4 m high. Consider up and to the right positive directions.

1. How long does it take the stone to reach the bottom of the cliff?
2. How far from the base of the cliff does the stone hit the ground?
3. What is the horizontal component of the stone's velocity just before it hits the ground?
4. What is the vertical component of the stone's velocity just before it hits the ground?

---

### 🔑 **Key Ideas**:

### A projectile is an object with the following characteristics:

* The only force acting on it is the gravitational force; it is a free-falling object
* The acceleration is directed downwards and has a magnitude of $10 \text{ m/s}^2$ (we use $9.8$ on CalcPad)
* Once projected, it continues its horizontal motion without any need of a force
* As it travels through the air, its horizontal velocity remains constant
* As it rises, its vertical velocity ($v_y$) decreases; as it falls, its $v_y$ increases


---

# <!--fit---> Marble Mini-Experiment

1. Determine the launch velocity of your marble.

Equipment:

- Ruler track
- Marble
- Carbon paper
- Meterstick

2. Use to predict landing spot from new height (like off top of cabinets)


---

<!--- _class: phase-title --->

# Angled Projectiles

---

<!--- _class: compact --->

# Splitting the Launch Velocity

<div class='columns cols-1-2'>
<div class='col'>

A projectile launched at an angle has **one** velocity, but it is easier to work with its two **perpendicular components**.

$$v_{0x} = v_0 \cos \theta$$

$$v_{0y} = v_0 \sin \theta$$

<div class="warning">

**Do this first, always.** Every angled projectile problem starts by splitting $v_0$ into $v_{0x}$ and $v_{0y}$.

</div>

</div>
<div class='col'>

<svg viewBox="0 0 420 310" width="100%" style="max-height:290px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <defs><marker id="phv0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--nebula, #5E409D)"/></marker><marker id="phvx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--star, #205EA6)"/></marker><marker id="phvy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--plasma, #BC5215)"/></marker></defs>
  <line x1="55" y1="250" x2="390" y2="250" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5"/>
  <line x1="55" y1="250" x2="55" y2="40" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5"/>
  <line x1="300" y1="250" x2="300" y2="95" stroke="var(--ink-3, #B7B5AC)" stroke-width="1.5" stroke-dasharray="5 4"/>
  <line x1="55" y1="250" x2="294" y2="250" stroke="var(--star, #205EA6)" stroke-width="5" marker-end="url(#phvx)"/>
  <line x1="300" y1="250" x2="300" y2="101" stroke="var(--plasma, #BC5215)" stroke-width="5" marker-end="url(#phvy)"/>
  <line x1="55" y1="250" x2="296" y2="97" stroke="var(--nebula, #5E409D)" stroke-width="5" marker-end="url(#phv0)"/>
  <path d="M 110 250 A 55 55 0 0 0 96 215" fill="none" stroke="var(--muted, #6F6E69)" stroke-width="2"/>
  <text x="122" y="233" fill="var(--muted, #6F6E69)" font-size="20" font-style="italic">&#952;</text>
  <text x="150" y="150" fill="var(--nebula, #5E409D)" font-size="19" font-weight="600">v</text>
  <text x="161" y="157" fill="var(--nebula, #5E409D)" font-size="14" font-weight="600">0</text>
  <text x="175" y="278" text-anchor="middle" fill="var(--star, #205EA6)" font-size="19" font-weight="600">v</text>
  <text x="186" y="285" fill="var(--star, #205EA6)" font-size="14" font-weight="600">0x</text>
  <text x="318" y="178" fill="var(--plasma, #BC5215)" font-size="19" font-weight="600">v</text>
  <text x="329" y="185" fill="var(--plasma, #BC5215)" font-size="14" font-weight="600">0y</text>
</svg>

</div>
</div>

---

# Components 

- The X-axis velocity component ($v_x$) is constant and will not accelerate, so it stays the same for the entire flight
- The initial Y-axis velocity component changes, because it is accelerated by gravity at 10 m/s² down. This is why we write ($v_{0y}$) and not just $v_y$ — it will change throughout the problem.

![bg fit right](../figures/cannon-v-to-viy-and-vx.gif)

---

### Finding x & y components of initial velocity 

$$v_{0x} = v \cos \theta $$

$$v_{0y} = v \sin \theta$$


![bg fit right:25%](image-25.png)

---

<!--- _class: compact --->

# Velocity Through the Flight

<svg viewBox="0 0 640 420" width="100%" style="max-height:395px" xmlns="http://www.w3.org/2000/svg" font-family="Inter, 'Helvetica Neue', Arial, sans-serif">
  <defs><marker id="trvx" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--star, #205EA6)"/></marker><marker id="trvy" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--plasma, #BC5215)"/></marker></defs>
  <line x1="30" y1="345" x2="615" y2="345" stroke="var(--muted, #6F6E69)" stroke-width="2.5"/>
  <path d="M 60 330 Q 320 -150 580 330" fill="none" stroke="var(--ink-3, #B7B5AC)" stroke-width="3" stroke-dasharray="7 6"/>
  <line x1="60" y1="330" x2="116" y2="330" stroke="var(--star, #205EA6)" stroke-width="4" marker-end="url(#trvx)"/>
  <line x1="190" y1="150" x2="246" y2="150" stroke="var(--star, #205EA6)" stroke-width="4" marker-end="url(#trvx)"/>
  <line x1="320" y1="90" x2="376" y2="90" stroke="var(--star, #205EA6)" stroke-width="4" marker-end="url(#trvx)"/>
  <line x1="450" y1="150" x2="506" y2="150" stroke="var(--star, #205EA6)" stroke-width="4" marker-end="url(#trvx)"/>
  <line x1="580" y1="330" x2="614" y2="330" stroke="var(--star, #205EA6)" stroke-width="4" marker-end="url(#trvx)"/>
  <line x1="60" y1="330" x2="60" y2="260" stroke="var(--plasma, #BC5215)" stroke-width="4" marker-end="url(#trvy)"/>
  <line x1="190" y1="150" x2="190" y2="116" stroke="var(--plasma, #BC5215)" stroke-width="4" marker-end="url(#trvy)"/>
  <line x1="450" y1="150" x2="450" y2="184" stroke="var(--plasma, #BC5215)" stroke-width="4" marker-end="url(#trvy)"/>
  <line x1="580" y1="330" x2="580" y2="400" stroke="var(--plasma, #BC5215)" stroke-width="4" marker-end="url(#trvy)"/>
  <circle cx="60" cy="330" r="7" fill="var(--ink, #100F0F)"/>
  <circle cx="190" cy="150" r="7" fill="var(--ink, #100F0F)"/>
  <circle cx="320" cy="90" r="7" fill="var(--solar, #AD8301)"/>
  <circle cx="450" cy="150" r="7" fill="var(--ink, #100F0F)"/>
  <circle cx="580" cy="330" r="7" fill="var(--ink, #100F0F)"/>
  <text x="320" y="68" text-anchor="middle" fill="var(--solar, #AD8301)" font-size="18" font-weight="600">peak: v<tspan font-size="13" dy="5">y</tspan><tspan dy="-5"> = 0</tspan></text>
  <text x="120" y="252" fill="var(--plasma, #BC5215)" font-size="16">v<tspan font-size="12" dy="4">y</tspan><tspan dy="-4"> shrinks</tspan></text>
  <text x="470" y="212" fill="var(--plasma, #BC5215)" font-size="16">v<tspan font-size="12" dy="4">y</tspan><tspan dy="-4"> grows, now downward</tspan></text>
  <text x="300" y="118" fill="var(--star, #205EA6)" font-size="16">v<tspan font-size="12" dy="4">x</tspan><tspan dy="-4"> never changes</tspan></text>
  <text x="320" y="412" text-anchor="middle" fill="var(--muted, #6F6E69)" font-size="16">positions drawn at equal time steps</text>
</svg>

---

Cannonballs of different masses are shot from cannons at various angles above the horizontal. The velocity of each cannonball as it leaves the cannon is given, along with the horizontal component of that velocity, which is the same.

![center w:500](image-26.png)

**Rank the horizontal distance traveled by the cannonballs.**

---

Cannonballs with different masses are shot from cannons at various angles above the horizontal. The velocity of each cannonball as it leaves the cannon is given, along with the same vertical component of that velocity.

![center w:500](image-27.png)

**Rank the time the cannonballs are in the air.**

---

# Projectile Fact Reminders

<div class='columns'>
<div class='col'>

![center](../figures/Highest-Point.gif)

</div>
 
<div class='col'>

![center](../figures/Lands-at-Same-Height.gif)

</div>
</div>

---

# Carried Over From Free Fall 

- Up positive $\Rightarrow a_y = -g = -10 \text{ m/s/s}$ &nbsp;•&nbsp; down positive $\Rightarrow a_y = +10 \text{ m/s/s}$
- At the peak, $v_y = 0$ — but $a_y$ is still $10 \text{ m/s/s}$ downward
- Launch and landing speeds match at the same height: up at $+30 \text{ m/s}$ means down at $-30 \text{ m/s}$

<div class="key-idea">

**Nothing new vertically.** An angled projectile's $y$-motion *is* the free fall you already solved — the only addition is a constant $v_x$ running alongside it.

</div>

---


# Problem-solving Process

1) Read & sketch problem
2) _**Calculate x & y components of initial velocity**_
3) Identify given information & fill out double cross diagram
4) Identify the quantity you are solving for
5) Using either horizontal or vertical information, find the flight time of the projectile
6) With the time find the quantity you are solving for. 


![bg fit right:30%](image-24.png)

---

<iframe src="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="700px" width="1000px" allowfullscreen></iframe>

---


# Where should 🎯 go?

<iframe src="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="650px" width="1000px" allowfullscreen></iframe>
