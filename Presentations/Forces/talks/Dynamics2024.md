---
marp: true
title: Dynamics 2024-25
theme: gaia
class: invert
paginate: true
transition: reveal
math: mathjax
---

<style>
img[alt~="center"] {
  display: block;
  margin: 0 auto;
}

strong{
    color:#FFE32C;
}

.columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
    gap: 1rem;
  }
</style>


# Dynamics 🔨 <!--fit--->

## A causual model for motion <!--fit--->

### Mr. Porter - AP Physics 2024


---

# 📖 Contents:



<div class='columns'>

<div>

1. [Vectors](#vector-quantities)
2. [Mallet Ball](#mallet-ball)
3. [Dueling Fan Carts](#dueling-fan-carts)
4. [Interactions & Force Names](#force-names)
5. [Force Diagrams](#force-diagrams)
5. [Force Interactions](#force-interactions)
5. [Unbalanced Force Lab](#unbalanced-force-lab)
6. [Tension Force Problems](#solving-force-problems)



</div>

<div>

10. [Inclined Planes](#inclined-planes)
11. [Friction](#Friction)


</div>

</div>

---


# Try It...

![bg fit right:45%](../figures/troy.png)

Mr. Porter and his wife walk from Nighthawks to Troy Savings Bank Music Hall. They walk 6 blocks East and then 2 Blocks South. [1 Block = 100 Meters]

1. Determine the **distance** that they traveled.
2. Determine their  **displacement**.


---

# Vctor Quantities:

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

![center w:700](../figures/vector1.png)

---

# Representing Vector Components

![center w:700](../figures/vectorComponents.png)

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


<div>

![w:600 center](../figures/vectorComponents.png)

</div>

</div>

---

## What are the components of Vector $\vec{A}$?

![center w:950](../figures/vect2.png)

---

## What are the components of Vector $\vec{A}$ and $\vec{B}$?

![center w:700](../figures/vect3.png)


---

## Use Trig to Find $\vec{A}_x$ and $\vec{A}_y$


![center](../figures/vect4.png)


---

<!--- _footer: <br>--->

## Adding Vectors 

Vectors are added ___"tip to tail"___, that is redraw the vectors so that the tip of one vector is attached to the tail of the second vector. 

$$\vec{s} = \vec{a} + \vec{b}$$

>_The **resultant** vector S is equal to the addition of vectors a and b_

![bg fit right](../figures/vecadd1.png)

---

# Adding Vectors 

Mr. Porter's brother is on a hike. He walks:

- 2 KM North
- 3 KM East 
- 5 KM Exactly South East 


**Draw a the vector addition diagram** to represent this motion



---

## Adding Vectors 


#### Using Components


You can sum the components of the two vectors to find the components of the **resultant** vector 

* $s_x = a_x + b_x$
* $s_y = a_y + b_y$
* $s = \sqrt{s_x^2 + s_y^2 }$

![bg fit right](../figures/vectaddcomponents.png)

---

# Practice and Review <!--fit--->

## In Pivot Interactives, using the PHET Simulation


---

# Which objects move with constant speed?

### What do you notice about the conditions where the objects move at a constant speed?

---

![bg](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bouncing_ball_strobe_edit.jpg/1024px-Bouncing_ball_strobe_edit.jpg)

---


![bg](https://static01.nyt.com/newsgraphics/2016/08/18/rio-olympics-composites/e2258112936f6bbf3de9dd7ab69280cb24096c5f/triple-jump-1200.jpg)

---

![bg](https://live.staticflickr.com/3601/3443461883_a680026cb7_c.jpg)


---

![bg fit](https://static.life.com/wp-content/uploads/migrated/2012/03/150303-gjon-mili-stroboscopic-02-830x1024.jpg)

---

![bg fit](https://static01.nyt.com/images/2020/12/01/obituaries/23KAMSLER/merlin_180397809_98a11644-afc3-4ac0-8d74-dcadf132f3e9-superJumbo.jpg?quality=75&auto=webp)

---


# Mallet Ball <!--fit--->

# 🔨 🎳 🔨 🎳 <!--fit--->

---

# Mallet Ball

### We are going to try and recreate uniform motion (constant acceleration) where $a=0$ and $a\ne 0$ with objects moving over smooth, hard, level surfaces.

* First with a bowling ball,
* then  by looking at a simulation

---

<!--- _footer: <br>--->
<style scoped>section { font-size: 31px; }</style>

### Bowling Ball Situations - Using a mallet and a bowling ball:

Each time we use the mallet, let it bounce. (Don’t use the mallet like a bulldozer.)

* Start with a stationary bowling ball. Then, speed up the bowling ball from rest.
* Have someone roll a bowling ball. Then, bring it to a stop.
* Have someone roll a bowling ball. Then, keep it moving at a CV.
* Have someone roll a bowling ball. With one tap, have the bowling ball make a 90 degree turn.
* Keep a bowling ball moving in a circle at constant speed.

**Your goal: summarize the relation between taps and motion in as few statments as possible**

---

# Lab Safety: 

1. No High Mallets 
2. Be aware of your surroundings 
3. No excessive rolls 
4. No smashing into walls, mats, classmates, etc. 

---

# Lab Instructions:

1. Everyone in your group should _play mallet ball_ at least once. 
2. As a group think about how you will accomplish the mallet ball task. 
3. Attempt to accomplish task. 
4. Record how you successfully accomplished the task
    - Written description
    - Drawing that models the motion and your mallet taps
5. Finally, write a general descriptive model that explains how mallet taps relate to the motion of the bowling ball

---

<!--- _footer: <br>--->

# How do **taps** relate to <!--fit--->
# the **motion** of <!--fit--->
# the bowling ball? <!--fit--->

---



# Does our rule relating motion and taps work for the bowling ball tapping the mallet? Or in other words does the bowling ball tap the mallet? 

---


# What would happen as we make the taps more "constant"?

---

# Describe the "taps" that affect the motion of the fan cart

---

# [Phet Tug of War](https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html)

## CER

On the next slide there is a list of statements. Decide if they the statement is ***true*** or ***false*** and then support that claim with evidence from the simulation and reasoning based on our models of motion and forces. 

![bg fit right](https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-900.png)

---

<style scoped>
{
  font-size: 27px;
}
</style>

# [Phet Tug of War](https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html):

1. A person's location on the rope matters.
2. Different combinations of people can produce the same sum of forces.
3. The sum of the forces on the cart is always equal to the addition of the individual forces.
4. It is impossible for the cart to accelerate to the left if there are people pulling it to the right.
5. The side with the bigger person will always win.
6. The side with more people will always win.
7. It is impossible to make the cart decrease in speed.
8. It is impossible to make the cart move at a steady speed.
9. The cart will always move in the direction of the sum of the forces.
10. If the sum of the forces is zero, the cart must be at rest.

---

# ✏️ Write a Summary <!--fit--->

# How do forces affect the motion of an object?

You can do this in ***2 sentences***

---


# Newton's First Law


## When the forces acting on a system are **unbalanced** the system will **accelerate**. 

## When forces acting on a system are **balanced** the system will maintain its **constant velocity**. 

---

# A **force** is <!--fit--->

# an *interaction* between two objects.  <!--fit--->


### Forcse can be a result of **contact** or due to forces **at a distance** <!--fit--->

---


# Newton's Third Law 

## A **force** is an interaction between two objects. The two objects mutually apply this **force** on each other. The force is **always *equal in magntiude and opposite in direction***.

---

# Force Pairs 

* Newton's Third Law describes force pairs 
  * You can identify these pairs with an interaction diagram
  * The line that connects each bubble or object is the force pair. 

---

### Contact Interactions 

1. ***Compression***: when two objects' surfaces are pushed together and the surfaces *deform*
2. ***Stretch***: when two objects pull on each other and are elongated
3. ***Shear***: When surfaces pull on each other as they slide or attempt to slide


![bg fit right](https://image1.slideserve.com/2164865/slide14-l.jpg)

---

# Force Names <!--fit--->

---

# Make a Table 

| Force Name          | Symbol | Type       | Description | Equation |
| ------------------- | ------ | ---------- | ----------- | -------- |
| Gravitational Force | $F_g$  | Long Range | ...         | ...         |
| 9 total Forces  | | | 


---

# Gravitational Force $\vec{F}_g$ or $mg$

### **Type:** Long Range force


### **Description** 

Attractive force between all objects with mass. 

### **Equation** 

TBD

---

# Normal Force $\vec{F}_N$ or $N$

### **Type**: Contact, compression


### **Description** 
"Perpendicular Force" occurs because atoms are compressed and want to return to their original position. ***Always perpendicular to the surfaces in contact***

### **Equation** 
None 

---


# Spring Force $\vec{F}_s$

### **Type**: Contact, stretch or compression


### **Description** 
Spring is stretched or compressed and wants to return to "natural" length

### **Equation** 
TBD

---

# Tension Force $\vec{F}_T$ or $T$

### **Type**: Contact, stretch


### **Description** 
Atomic Structure is stretched and wants to return to natural length

### **Equation** 
None

---


# Friction Force $\vec{F}_f$ or $f$

### **Type**: Contact, shear


### **Description** 
Irregular surfaces interlock to slow or prevent sliding of two surfaces relative to eachother **Always parallel to the surfaces in contact**

### *Equation* 
None

---

# Drag Force $\vec{F}_d$

### **Type**: Contact


### **Description** 
Fluid/gas Friction, resists objects motion through a fluid/gas

### **Equation** 
None

---


# Bouyant Force $\vec{F}_B$

### **Type**: Contact


### **Description** 
Fluid/Gas Normal Force

### **Equation** 
None

---


# Electrostatic Force $\vec{F}_e$

### **Type**: Long Rance


### **Description** 
Attractice or resistive force because objects have charge

### **Equation** 
None 

---

# Magnetic Force $\vec{F}_M$

### **Type**: Long Range


### **Description** 
Attractive or repulsive force because of moving charge

### **Equation** 
None 


---

# Force Diagrams <!--fit--->

# 💭 ↙️ ➡️ ⬇️ ⬆️ 🗯️ <!--fit--->


---

# Free Body Diagrams

![center](../figures/FBDs.png)


---

# Vector Addition Diagrams 


![center w:1100](../figures/VADExample.png)

---


# Unbalanced Force Lab <!--fit--->

# What variables affect the **acceleration** of the fan cart?  <!--fit--->

---

# Unbalanced Forces

Design an experiment(s) to find a mathematical relationship between those variables and acceleration 

Consider:

- What will you measure? 
- How will you measure it? 
- What tools can you use to limit uncertainty?
- How can you design your experiment to limit uncertainty?


---

# Before you begin... <!--fit--->

## 🤔 How will you measure the fan force for each settings?

---

## Unbalanced Force Lab

_Create a mathematical model relating mass, force, and acceleration._

#### Essential Questions:

1. How is **mass** related to the **acceleration** for a *constant net force*?
2. How is **net force** related to the **acceleration** for a *constant mass*?

#### Notes:

- Be sure to take at least 8 data points
- Design **two** experiments to answer the above questions
- Linearize data in analysis

---

### 🎯 Board Meeting Goal: Develop a mathematical model relating **net force**,  **mass**, and **acceleration**

<div class='columns'>
<div>

Structure:

1. How did you run your experiment? 
2. What are your results for each experiment?
    - What is your slope/intercept? What does it represent? How does it compare to controls?

</div>
 
<div>

Questions to ask peers

- How do you know that? 
- What is your evidence for...
- Why do you think...
- How does your data support...
- Thats interesting our data shows the opposite...

</div>
</div>



---

# Gravity $F_g$ 

## Notes:

* Weight == $F_g$ == Force of Gravity...so $F_g = mg$
* Weight is a **FORCE**, mass is scalar quantity
* $g$ is the gravitational field strength
    * Measured in N/kg 
    * changes based on planet and location on that planet
    * _near the surface of the Earth_ $g = 9.8 \textrm{ N/kg}$


---

# Solving Force Problems <!--fit--->

# Quantitatively 🧮 <!--fit--->


---

# Try it - Mild 🫑

Two giant holiday ornaments are hanging on Mr. Porter's front porch as show in the diagram to the right. 

1. Draw the FBD for each ornament. 
2. Determine the value of **all** of the forces. 

![bg fit right](../figures/tensionmild.png)

---

# Medium 🌶️

In another episode of Don't Do This At Home, Jason secures a strong cable to two dead trees in the woods behind his home and attempts to jump-start his tight-rope walking career. His first attempt ends in the rather precarious position shown in the diagram. The rope makes an angle of 10° with the horizontal. Jason has a mass of 70 kg. Determine the tension in the cable.

![bg fit right:35%](../figures/tensionmedium.png)

---

<!--- footer: <br>--->

## Spicy 🌶️🌶️🌶️

Tarzan, much to his dismay, gets his loincloth stuck on a branch. He’s left hanging with the vine pulling upward at a $40^\circ$ angle and his loincloth pulling him horizontally to the right.

1. Draw FBD for Tarzan
2. Write the equation for the vertical forces on Tarzan ($\Sigma F_y =$) and horizontal forces ($\Sigma F_x =$)
3. Tarzan is 75 kg what is his weight?
4. Determine the tension in the vine and his loincloth. 


![bg fit right:22%](../figures/tarzan.png)




---

# $F_s$ Lab 

## Notes:

* $F_s$ is proportional to stretch or compression ($|x|$)
* The proportionality constant, $k$, is called "the spring constant" (creative)

$$\boxed{|\vec{F}_s| = k |\vec{x}|}$$

* A spring is _Hookean_ if it follows the equation above


---

# AP Practice <!--fit--->

# 🤔 🏋️ 📖 ✍️ 🔨 <!--fit--->

---


---

# Fan Cart Lab

Draw a FBD and vector addition diagram for the fan cart for the following three situations:

1. Fan off, cart at rest 
2. Fan on, held in place by Mr. Porter
3. Fan on, moving on level track 


---

# Newton's Second Law <!--fit--->

$$\boxed{\vec{a} = \frac{\Sigma \vec{F}}{m}}$$

---

# Applying Newton's Second Law 

1. Draw Free Body Diagram
1. Split Forces into x & y components 
2. Sum forces in x & y direction ($\Sigma F_x = ... = ma_x$ and $\Sigma F_y = ... = ma_y$)
3. Solve

---

# Elevator Problems <!--fit--->

## Solve on **whiteboard** with your group first & then make notes for your future forgetful self **in your notebook**.

---



# Elevator Scale Reading 

<div class='columns'>

<div>

<style scoped>
{
  font-size: 30px;
}
</style>

A person who weighs **500 N** is standing on a scale in an elevator. The elevator is identical in all cases. The velocity and acceleration of the elevators at the instant shown are given.

1. List the cases where the scale reading is **greater** than 500 N.
2. List the cases where the scale reading is **less** than 500 N.
List the cases where the scale reading is **equal to** than 500 N.

</div>

<div>

![center w:600](../figures/elevatorscale.png)

</div></div>

---

# Assuming Friction...

#### Rank the boxes from easiest to acceleration to most difficult to accelerate. Explain your reasoning...

![center](../figures/normalfrictionranking.png)

---

#### Boxes are held at rest against rough, vertical walls by forces pushing horizontally on the boxes as shown. 

![center](../figures/wallboxes.png)

##### Rank the **magnitude of the normal force** exerted on the walls by the boxes. 

---

#### Boxes are held at rest against rough, vertical walls by forces pushing horizontally on the boxes as shown. 

![center](../figures/wallboxes.png)

##### Rank the **magnitude of the normal force** on each box from greatest to least. 

---

#### Ignoring the normal force...which box(es) do you think is the **most** difficult to hold up? Why?

![center](../figures/wallboxes.png)


---

#### In both cases below, Grace pulls the same large crate across a floor at a constant speed of $1.48 \textrm{ m/s}$.

![center](../figures/grace.png)


##### Is the magnitude of the force exerted by Grace on the rope (i) _greater_ in Case A, (ii) _greater_ in Case B, or (iii) _the same_ in both cases?

##### Explain your reasoning.

---

![bg fit](image-3.png)

---

![bg fit](image-4.png)

---

![bg fit](../figures/Kinetic-vs-Static-Friction.gif)

---


![bg fit](../figures/StaticFriction.gif)

![bg fit](../figures/KineticFrictionConstantMotion.gif)

---

# Friction

$$ \boxed{F_f \le \mu F_N} $$

### Notes: 

* $\le$ is only for **static friction**
  * Why? Only need friction to **balance** so you don't need the _maximum_ amount of static friction 
* $\mu$ (greek letter mu, pronouced "_mew_") - **coefficient of friction**
  * how likely surface pairs are to interlock
  * _always_ less than 1 



---

![bg fit](../figures/Testing-Friction-1.gif)
![bg fit](../figures/Testing-Friction-08%20(1).gif)

---


<br><br><br><br>

# [Static Friction Lab Example](https://thephysicsaviary.com/Physics/Programs/Labs/ForceFriction/) <!--fit--->

---

# Common $\mu$ Values

** From NYS Regents Physics Reference Tables

**How do Kinetic $\mu$ compare to Static $\mu$ values?**

![bg fit right](../figures/mus.png)

---

# Friction Lab 

#### **Objective**

Determine the coefficient of static friction between your block and a two flat surfaces in the classroom.

<div class='columns'>
<div>

#### **Materials** 

- Wooden block
- Electronic Force Sensor

</div>
 
<div>

#### **Hypothesis**

Which surface will have a greater coefficient of friction?

</div>
</div>

---

#### Friction Practice 

Consider the free-body diagram for an object accelerating across a surface. The object has a mass of 2.12-kg. There is a forward thrust force of 50.0 N. The coefficient of friction between the object and the surface is 0.365. Determine the …

<div class='columns'>
<div>

1. $F_N$ experienced by the object
2. $F_f$ experiened by the object 
3. $F_{net}$ experienced by the object
4. Acceleration experienced by the object

</div>
<div>

![center width:300](https://www.physicsclassroom.com/PhysicsClassroom/media/CalcPad/NewtonsLaws/NL11Q1.png)

</div>
</div>


---

## Dexter Eius is running through the cafeteria when he slips on some mashed potatoes and falls to the floor. (Let that be a lesson for Dexter.) Dexter lands in a puddle of milk and skids to a stop with an acceleration of $-4.23 \textrm{ m/s/s}$. Dexter weighs $723.0 \textrm{ N}$. 

## **Determine the coefficient of friction between Dexter and the milky floor**.

---

## Amaya is driving his $1300 \textrm{-kg}$ car home after soccer practice. He is traveling down Lake Avenue with a speed of $15.8 \textrm{ m/s}$. A deer runs onto the road and Amaya skids to a stop in $3.41 \textrm{ s}$. 

## **Determine the coefficient of friction between the car tires and the roadway.**

---

#### Consider the free-body diagram shown at the right. If the applied force is 97.7 N at an angle of 27.4 degrees, the force of gravity is 110 N and the coefficient of friction is 0.369, then **what is the acceleration (in m/s/s) of the object?** 

![bg fit right](image.png)


---

# Inclined Planes 

![center](../figures/increasing-incline-and-force.gif)



---

# Inclined Planes


![bg fit right:37%](image-1.png)

Component of gravity ***perpendicular to incline***

$$F_{g\perp} = mg\cos\theta$$



Component of gravity ***parallel to incline***

$$F_{g\parallel} = mg\sin\theta$$


**if you can't find these with _ease_ using trig, you ***MUST*** memorize those equations


---

Lab partners Anna Litical and Noah Formula placed a 0.25-kg glider on their air track and inclined the track at 10.4° above the horizontal. Use the structure provided at the right to determine the …

![bg fit right:35%](https://www.physicsclassroom.com/PhysicsClassroom/media/CalcPad/ForcesIn2D/F2D10Q1.png)

1. Force of gravity 
2. Parallel component of gravity
3. Perpendicular component of gravity
4. Normal Force 
5. Net Force
5. Acceleration

---

The image shows our Einstein action figure sitting on a slab of wood coated with plastic tape. The angle at which Einstein slip's is $\theta$. Determine the maximum coefficient of static friction, $\mu_E$ for Einstein in terms of $\theta$, $m$, and physical constants. 

![center](image-6.png)

---

---

### Accelerating Systems 

![center w:385](image-2.png)

Three blocks are connected by strings and pulled to the right by a force with magnitude $F_0$, as shown in the figure above. All frictional forces are  negligible. The tension in the right and left strings have magnitudes $T_1$ and $T_2$, respectively. Taking the positive direction to be toward the right, which of the following is a correct equation of motion for the block of mass?

***If the acceleration is $a_{sys}$ derive an expression for $F_0$, $T_1$, and $T_2$ in terms of $a_{sys}$, $m_1$, $m_2$, $m_3$ and any universal constants.***


---

### Acceleration Systems 

![center w:700](../figures/blocksysrank.png)

Boxes are pulled by ropes along frictionless surfaces, accelerating toward the left. All of the boxes are identical, and the accelerations of all three systems are the same.

**Rank the tensions in the ropes.** Explain your reasoning


---


#### Accelerating Systems 

In both cases a spaceship is pulling two cargo pods, one empty and one full. At the instant shown, the speed of the pods and spaceships is 300 m/s, but they have different accelerations as shown. All masses are given in terms of M, the mass of an empty pod.

**Will the tension at point *S* in the tow rod be (i) *greater in Case A*, (ii) *greater in Case B*, or (iii) *the same in both cases?*** Find the tension in each rope to help.

![bg fit right:35%](../figures/spacerank.png)

---

# With your table <!--fit--->

# AP Workbook **2.K** <!--fit--->

---

In each case shown below, a box is sliding along a horizontal surface. There is friction between the box and the horizontal surface. The box is tied to a hanging stone by a massless rope running over a massless, frictionless pulley. All these cases are identical except for the different initial velocities of the boxes.

![center w:850](../figures/atwoodrank.png)

**Rank the magnitudes of the accelerations of the boxes at the instant shown.** Explain your ranking

---


![center w:850](../figures/atwoodrank.png)

![center](../figures/fbdrankatwood.png)


----
