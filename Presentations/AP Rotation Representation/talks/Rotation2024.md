---
title: AP - Rotation 2024
marp: true
theme: chalk
math: katex
paginate: true
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

# Some Reminders  <!--fit--->

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


* $v = \frac{\Delta s}{\Delta t}$ and $\Delta \theta = \frac{\Delta s}{t}$

* so $\Delta s = r \Delta \theta$

* sub in: $v = \frac{r\Delta \theta}{\Delta t} = r \omega$


---

# Angular Acceleration

$$\alpha = \frac{\Delta \omega}{\Delta t}$$


- measured in rad/s/s or rad/s$^2$

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

# Balacing Act:

### Task 1

Add masses to each side of the rod so that the rod does not rotate, but is balanced (parallel to the table). In particular, add two masses to one side and one mass to the other side. Is there more than one arrangement that will balance the rod? Explain.

### Task 2

Draw a Free Body Diagram for your setup in task 1. Are the forces balanced?

---

# Balacing Act:

### Task 3

Would the diagram that Mr. Porter drew on the board rotate? (Draw a FBD for the situation...does the net force explain the situation?)

### Task 4

Where could we place a mass in the previous question so that the ruler would not rotate?

---

# Balacing Act:

### Task 5

Develop a method to determine the mass of your meterstick using the balance.

---

# Notes ✏️📓 <!--fit--->

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

* $\tau$ is  torque (Newton $\cdot$ meter)
* $r$ is distance between point force is exerted and axis of rotation
* $F \sin \theta$ is Force perpendicular to axis of rotation

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

# Unbalanced Torque  <!---fit--->

# Causes rotational (angular) acceleration!


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

# Moment of Inertia 

![bg](../figures/Spin_nocredit4.gif)

## Why does the skater spin faster when she brings in their arms?

---

# Moment of Inertia

* the rotational analog of mass for linear motion
* it is related to the mass and the location of the mass
  * closer the mass is to the rotational axis, the lower the moment of inertia (easier to spin)
* for a point like object $I=mr^2$
* this relationship is used to build the equations for other moments of inertia


---

<!--- _class: inverse --->

![bg fit](../figures/momentofI.png)

---

---

# Class Work:

### On your own: 
1. 7.D


### Together: 

1. 7.E
2. 7.G


---

<!---class: invert--->

# Angular Momentum <!---fit--->

![bg](../figures/Spin_nocredit4.gif)

---

<!---class: --->

# Angular Momentum 

* Before calculating angular momentum, it is necessary to define a rotational axis.
* The angular momentum $L$ of an object is given by:
  * $L = I\omega$ for an extended object
  * $L = mvr$ for a point object, where $r$ is the “distance of closest approach”

---

# Conservation of Momentum 

* Angular Momentum is conserved ***if there is no net torque*** on the system
  * $\Sigma L_i = \Sigma L_f$ or $\Sigma I_i\omega_i = \Sigma I_f \omega_f$
* Unlike energy, angular momentum is conserved *separately* from linear momentum. (Do not combine them in a single equation)
* Angular momentum is a vector – angular momentums in the same sense add, angular momentums in opposite senses subtract.

---

# Conservation of angular momentum:

* Conservation of Angular Momentum is used when a translating object interacts with a rotating one.
  * Examples: Throwing a ball from a merry-go-round, bat hitting a baseball.
* Conservation of Angular Momentum is also used for a single rotating object changing shape.
  * Example: A figure skater pulls in her arms. Moment of inertia decreases so angular velocity must increase to keep angular momentum constant.

---

# Impulse

* The impulse-momentum theorem can be written for angular momentum, too.
  * $\tau \Delta t = \Delta L$
* A change in angular momentum equals the net torque multiplied by the time the torque is applied.

---

<br>
<br>
<br>
<br>

# Series of Angular Momentum Gifs <!---fit--->

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0304-com-stool-and-masses-1_4.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0304-com-stool-and-masses-2_3.gif)


---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0305-wheel-angular-moemtum-1_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0310-animated-gif-1_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0310-animated-gif-2_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0310-animated-gif-3_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0310-animated-gif-4_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0310-animated-gif-5_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0311-animated-gif_3.gif)

---
<br>
<br>
<br>
<br>

# Animation for Moment of Inertia <!---fit--->

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0283-animated-gif-1_3.gif)

---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0283-animated-gif-3_3.gif)

---

### Kinetic Energy 

The kinetic energy for a moving particle: 
$$ K = \frac{1}{2}mv^2 $$

relating its linear speed and angular velocity:
$$v =r \omega$$

Thus, 
$$K_{rotational} = \frac{1}{2}mv^2 = \frac{1}{2}m(r\omega)^2 = \frac{1}{2}(mr^2)\omega^2 = \frac{1}{2}I\omega^2$$



---

![bg](https://www.flippingphysics.com/uploads/2/1/1/0/21103672/0301-rolling-incline-first_3.gif)

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


# Explain Using Energy

---

# Rolling Race 


$$U_gi = K_f $$

$$U_g = K_T + K_R$$ 

$$mgh = \frac{1}{2}mv^2 + \frac{1}{2}I \omega^2$$

$$mgh = \frac{1}{2}mv^2 + \frac{1}{2}I\Big(\frac{v}{r}\Big)^2$$