---
marp: true
theme: cosmos
paginate: true
math: mathjax
footer: Cosmos theme — component reference
---

<!-- _class: title-slide -->

# 🌌 Cosmos
## A deep-space theme for Marp
### Every component, on one deck

---

<!-- _class: phase-title -->

# PHASE DIVIDER
## `<!-- _class: phase-title -->`

---

# Headings, Text & Callouts

## H2 is gold
### H3 is purple

**Bold is warm gold.** *Italic is muted.* Links are [cyan](https://mrporterphysics.github.io). Inline `code` too.

<div class="key-idea">

**Key idea** — the takeaway students should leave with.

</div>

<div class="warning">

**Watch out** — the common misconception.

</div>

---

# More Callouts

<div class="vocab">

**Habitable** — a place that is suitable for life.

</div>

<div class="steps">

**Procedure** — numbered moves, lab steps, a worked method.

</div>

<div class="question">

**Discuss** — a prompt to put in front of the room.

</div>

> **Blockquote** — orange rule. Good for a read-aloud or a quoted claim.

---

<!-- _class: lt2 -->

# Tables

| Symbol | Quantity | Unit |
|---|---|---|
| $v$ | velocity | m/s |
| $a$ | acceleration | m/s² |
| $F$ | **net force** | N |
| $E$ | energy | J |

<div class="small">

Columns are centred by default. `_class: lt2` left-aligns column 2; `lefttable` left-aligns all of them.

</div>

---

# Columns & Cards

<div class="columns cols-2-1">
<div class="col">

**Wide column (`cols-2-1`)**

- Plain `.columns` splits evenly
- `.cols-2-1` / `.cols-1-2` go lopsided
- `li` markers pick up the cyan accent

$$ E = mc^2 $$

</div>
<div class="col">

<div class="panel">

A neutral `.panel` box.

</div>

</div>
</div>

<div class="cards">
<div class="card">

**Card** — auto-fitting grid

</div>
<div class="card">

**Card** — wraps on its own

</div>
<div class="card">

**Card** — min width 240px

</div>
</div>

---

# Spectrum Bars

<div class="specrow">
<div class="speclabel">Continuous</div>
<div class="spec"></div>
</div>

<div class="specrow">
<div class="speclabel">Absorption</div>
<div class="spec"><div class="ln" style="left:30%"></div><div class="ln" style="left:52%"></div><div class="ln" style="left:71%"></div></div>
</div>

<div class="specrow">
<div class="speclabel">Emission</div>
<div class="spec dark"><div class="ln" style="left:30%; background:#00e08a"></div><div class="ln" style="left:52%; background:#ffff00"></div><div class="ln" style="left:71%; background:#ff3300"></div></div>
</div>

<div class="specrow">
<div class="speclabel"></div>
<div class="axis"><span style="left:0%">400</span><span style="left:33%">500</span><span style="left:67%">600</span><span style="left:100%">700 nm</span></div>
</div>

<div class="small">

Position a line at wavelength λ with `left: (λ − 400) / 3 %`.

</div>

---

<!-- _class: compact -->

# Code & Density

`_class: compact` drops the body to 22px; `_class: tiny` drops it to 19px.

```python
def kinetic_energy(m, v):
    """Joules, given kg and m/s."""
    return 0.5 * m * v**2
```

Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to re-render. <span class="badge">new</span>

---

<!-- _class: phase-title -->

# THAT'S THE KIT
## `theme: cosmos`
