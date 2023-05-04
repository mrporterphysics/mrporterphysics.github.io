---
title: AP - Rotation 2023
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

# Rotational Motion

## _Spinning objects_

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



# What is **Moment of Inertia**? <!---fit--->

## Demo:

- Twisting Rod (where is it easiest to hold the rod to twist it?)

---
<!---class: invert--->

# Moment of Inertia 

![bg](../figures/Spin_nocredit4.gif)

## Why does the skater spin faster when she brings in their arms?

---

<!---class: --->

# Moment of Inertia

* the rotational analog of mass for linear motion
* it is related to the mass and the location of the mass
  * closer the mass is to the rotational axis, the lower the moment of inertia (easier to spin)
* for a point like object $I=mr^2$
* this relationship is used to build the equations for other moments of inertia


---

![bg fit](../figures/momentofI.png)

---

# Angular Displacement:

- $\Delta \theta$: change in angle, measured in radians
- Is equal to the arc length divided by the radius

$$\Delta \theta = \frac{\Delta s}{r}$$

![bg right:40% fit](https://openstax.org/apps/archive/20230220.155442/resources/fe64292de40cb167becd9db917e61329c5522eaa)

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


$v = \frac{\Delta s}{\Delta t}$ and $\Delta \theta = \frac{\Delta s}{t}$

so $\Delta s = r \Delta \theta$

sub in: $v = \frac{r\Delta \theta}{\Delta t} = r \omega$


---

# Can spinning things <br> accelerate? <!---fit--->


---

# Angular Acceleration

$$\alpha = \frac{\Delta \omega}{\Delta t}$$


- measured in rad/s/s or rad/s<sup>2</sup>

---

## What about a bug on the end of an accelerating wheel?


- There is linear (or tangential) acceleration
- Derivation aside...

$$a_t = r\alpha$$

$$\alpha = \frac{a_t}{r}$$
---

<iframe src="https://phet.colorado.edu/sims/cheerpj/rotation/latest/rotation.html?simulation=rotation"
        width="1100"
        height="600"
        allowfullscreen>
</iframe>

---

## Translating Between Linear and Angular


How to translate the two (not on the reference table!)

| Linear | Angular |
|---|---|
| $x = \theta r$ | $\theta = \frac{x}{r}$ |
| $v = \omega r$ | $\omega = \frac{v}{r}$ |
| $a = \alpha r$ | $\alpha = \frac{a}{r}$ |


---

# Rotational Kinematics:

The same as linear, but with their rotational twin!

| Linear | Angular | 
|---|---|
|$v_x = v_{0x} + a_xt$ | $\omega = \omega_0 + \alpha t$ |
| $x = x_0 + v_{0x}t + \frac{1}{2}a_xt^2$ |  $\theta = \theta _0 + \omega_0 t + \frac{1}{2}\alpha t^2$|
|  $v_x^2 = v_{0x}^2 = 2a_x(x-x_0)$| $\omega^2 = \omega_0^2 + 2\alpha(\theta - \theta_0)$ | 


---

<img style="width:100%"  src="../figures/anggraphs.png">

---

# Class Work:

### On your own: 
1. 7.D


### Together: 

1. 7.E
2. 7.G