---
title: Regents - Circuits Slides 
marp: true
theme: gaia
math: katex
paginate: true
class: 
---


# Rotation 💿 <!---fit--->

# A Model for Spinning :ferris_wheel: <!---fit--->


#### 👨‍🏫 Mr. Porter 
#### 📆 2023 - Physics

---

# Translational Motion 

## _When an object moves as a whole from one location to another, without turning._

<!--- 
Car example:
- neglect wheels, engine, axles, etc 
- Car made a turn the radius was the same for everything...
- During turn certain parts move differently
- Modeled as a point 
--->

---

# Extended Bodies 

* Rigid (parts of object do not move with respect to each other)
* nonzero size 

---

# Balance your <br> pencil ✏️ <br> on your finger <!---fit--->

---

# The balance point <br> is the pencil's <br> **center of mass**. <!---fit--->

---

# Center of Mass

## The point on an object where a force exerted on the object pointing directly toward or away from that point, will not cause the object to turn. The location of this point depends on the mass distribution of the object. 

---

# Center of Mass

## The average location of all of the mass of an object. 

- $F_g$ is effectively exerted on the center of mass

---

# Torque 

## When a *force* has the ability to rotate an object 

* i.e. Pushing the edge a door so it rotates around its axis of rotation (the hinges)

---

# Torque

## Depends on:

* where the force is exerted
* how large the force is 
* what angle the force is at 

---

# Torque 

$$ \boxed{\tau = r_\perp F = r F \sin \theta}$$

* $\tau$ ➡️ torque (Newton $\cdot$ meter)
* $r$ :arrow_right: distance between point force is exerted and axis of rotation
* $F \sin \theta$ ➡️: Force perpendicular to axis of rotation

---

# Static Equilibrium 

* Object remains at rest 
* Sum of forces = zero (balanced forces)
    * $\Sigma F = F_1 + F_2 + F_3 + \ldots = 0$
    * $\Sigma \tau = \tau_1 + \tau_2 + \tau_3 + \ldots = 0$
* Sum of torques = zero (balanced torques)

---

# AP Workbook

A long rod of length L and negligible mass supports a box of mass M. The left end of each rod is held in place by a frictionless pin about which it can freely rotate. In each case, a vertical force is holding the rods and the weights at rest. The rods are marked at half-meter intervals. 

![bg fit right:51%](apworkbook7b.png)

---

# 7.B


**A.** Rank the magnitude of the vertical force $F$ applied to the rods to keep the rod horizontal (from greatest to least)

**B.** Sketch the forces acting on the rod-box system

![bg fit right:60%](apworkbook7b.png)

---

# 7.B


**C.** In which cases is the force from the pin up? Down? Zero? Justify your answers. 

![bg fit right:60%](apworkbook7b.png)

---

# Unbalanced Torque 



---


# Newton's Second Law Rotation

$$ \alpha = \frac{\Sigma \tau}{I} $$

- $\alpha$ ➡️ angular acceleration 
- $\Sigma \tau$ ➡️ Net Torque 
- $I$ ➡️ Moment of Inertia (rotational mass equivalent)


---



# Angular Displacement:

- $\Delta \theta$: change in angle, measured in radians
- Is equal to the arc length divided by the radius

$$\Delta \theta = \frac{\Delta s}{r}$$

![](https://cnx.org/resources/4bf1c18602c765189348b8e90ab8f780d6d2f128/Figure_07_01_01aa.jpg)

- One revolution is equal to $2\pi$

---

# Angular Velocity

- Measure of how fast an object is rotating.
- Symbol: $\omega$
- Is equal to the change in angular displacement in a time.


$$\omega = \frac{\Delta \theta}{\Delta t}$$

- measured in rad/s
---

# Angular and Linear Velocity

Angular velocity is analogous to linear velocity, and we can determine their relationship.


$$v = \frac{\Delta s}{\Delta t}$$

and
$$\Delta \theta = \frac{\Delta s}{t}$$

so
$$\Delta s = r \Delta \theta$$

sub in:
$$v = \frac{r\Delta \theta}{\Delta t} = r \omega$$

---

$$v = r \omega$$

#$$\omega = \frac{v}{r}$$

---

# Can Spinning things accelerate?
--

#YES!

---

#Angular Acceleration

$$\alpha = \frac{\Delta \omega}{\Delta t}$$
--

- measured in rad/s/s or rad/s<sup>2</sup>

---

##What about a bug on the end of an accelerating wheel?
--

- There is linear (or tangential) acceleration
--
(ugh Mr. Porter)
--

- Derivation aside...

$$a_t = r\alpha$$

$$\alpha = \frac{a_t}{r}$$
---

#Rotational Kinematics:

The same as linear, but with their rotational twin!


.center[
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:20px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:20px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
</style>
<table class="tg">
  <tr>
    <th class="tg-031e">Linear</th>
    <th class="tg-031e">Angular</th>
  </tr>
  <tr>
    <td class="tg-031e">\(v_x = v_{0x} + a_xt\)</td>
    <td class="tg-031e">\(\omega = \omega_0 + \alpha t\)</td>
  </tr>
  <tr>
    <td class="tg-031e">\(x = x_0 + v_{0x}t + \frac{1}{2}a_xt^2\)</td>
    <td class="tg-031e">\(\theta = \theta _0 + \omega_0 t + \frac{1}{2}\alpha t^2\)</td>
  </tr>
  <tr>
    <td class="tg-031e">\(v_x^2 = v_{0x}^2 = 2a_x(x-x_0)\)</td>
    <td class="tg-031e">\(\omega^2 = \omega_0^2 + 2\alpha(\theta - \theta_0)\)</td>
  </tr>
</table>
]
--

How to translate the two (not on the reference table!)

.center[
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:20px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:20px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
</style>
<table class="tg">
  <tr>
    <th class="tg-031e">Linear</th>
    <th class="tg-031e">Angular</th>
  </tr>
  <tr>
    <td class="tg-031e">\(x = \theta r\)</td>
    <td class="tg-031e">\(\theta = \frac{x}{r}\)</td>
  </tr>
  <tr>
    <td class="tg-031e">\(v = \omega r\)</td>
    <td class="tg-031e">\(\omega = \frac{v}{r}\)</td>
  </tr>
  <tr>
    <td class="tg-031e">\(a = \alpha r\)</td>
    <td class="tg-031e">\(\alpha = \frac{a}{r}\)</td>
  </tr>
</table>

]

---

class:center, middle

<img style="width:100%"  src="../figures/anggraphs.png">

---

class:center, middle

<iframe src="https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html" width="800" height="600" scrolling="no" allowfullscreen></iframe>

[Link](https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_en.html)
