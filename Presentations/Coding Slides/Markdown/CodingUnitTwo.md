---
title: Coding Unit 2
marp: true
theme: schodack
paginate: true
footer: Be brave, not perfect
---

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>

# Coding 💻 <!--fit--->

# Unit 1: Response and Draw <!--fit--->



---

# Conditional Logic <!--fit--->

# **`if()` and `else()` Statments**

---

# Abstraction 🕴🏽

## Decomposition

Ideas, problems, or projects are broken down into component parts to set the stage for deeper analysis.

## Pattern Recognition 

Decomposed component parts are examined to find patterns like similarities, repetition, conditional relationships, or nested relationships.

---

# Algorithms 💃🏽

## Control Flow 

The order in which steps of an algorithm are executed; determined by logical constructs such as IF statements, loops and calls to other procedures.

## Inputs, Variabless & Outputs

How data is passed into (inputs,) manipulated by, used within (variables,) and returned from the algorithm (outputs).

---

# Getting started with conditionals 

## Think about properties people in this room have. Then, write a series of statements in this format “If (property), then (do thing).” Try for at least 3.

### Ex: If you have **painted nails**, then **snap your fingers**.


--- 

<!--- _class: lead --->


# If ________, 

# then________.

# ⬇️

# Conditionals


----

# This is how it works: 

1. Programmers give a computer all the possibilities
2. Computer will check a condition to determine if this condition happened
3. Then, it will deliver the correct result


**This is how a computer makes a decision on which output to perform**

---

# Conditional Statements 

The interactions that we will build in this lesson are going to be based on conditional statements;

# `if this`

# `then that`

If/Then statements make a computer test if something is true, and tell it what to do if it is. It can also tell a program what to do if something is not true.

---

# Boolean Expressions 

Booleans are tests that return a value of true/false. They look look like this;

```javascript

if (boolean expression is true){
    // execute this code
}

```

The boolean expression inside the parentheses is the expression being evaluated. 

If the expression is ***true***, **then** the computer will execute the code inside the curly brackets. If it evaluates to ***false***, the code is not run and the program will continue with the code following the expression.

---

# `if` statement 

![center](../images/conditionalflow.png)

---

# Boolean Expressions 

These > (greater than) or < (less than) signs are relational operators. They compare two numbers, which is what we’re going to do in our first conditional statement.


![center](../images/conditionaltable.png)


---

# `console.log()` and conditionals

Using the `console.log()` function we can debug and test our different conditionals. To do so, you would add a console.log to print the words “true” when your condition is met.

```javascript
if (mouseX>300){
//do something
console.log(‘true’)
}
```

This is a way for your students to keep track of their conditionals, and to make sure that they’re getting the expected results.


---

### Variables and conditional statements

We can use conditionals to change color, size, and many other values in our sketches. 

In this [example](https://editor.p5js.org/cs4all/sketches/r1C8u6c7-) the fill of a square changes based on the mouse position. 

If the `x` position of the mouse passes the center of the canvas, the fill of the rectangle will turn blue. 


![bg fit left](../images/conditionalexample1.png)

---


# Variables and conditional statements

We can also change custom variables inside conditional statements. In this [example](https://editor.p5js.org/cs4all/sketches/ryn71NT4W), the width and height of the rectangle are determined by a variable called x. That variable is changed inside the conditional statement. 

![center](../images/conditionalexample2.png)

---

# `else`

If you think about how we speak, we use conditionals all the time.

**“If it’s cold outside, wear a coat.”**
**“If you’re hungry, have a snack.”**

These statements are often followed by **“else”** statements, or **“otherwise**.” 

**“If it’s nice out, play outside, otherwise play inside.”**

---

# `else`

We can do the same in code. The code on the right:  

1. Tells the program to draw a black background if the x position of the mouse is greater than 300
2. Also tells the program what to do if the x position of the mouse is NOT greater than 300

![bg fit right](../images/else.png)

---

# `else`

If the boolean is true, the program will run task 1. 

If the boolean is false, the program will run task 2.

![bg fit right](../images/else2.png)

---

# else

In this [example](https://editor.p5js.org/cs4all/sketches/vws_D0Dqn), if the mouse is on the right side of the screen it will draw a red rectangle on the left and if the mouse is on the left side of the screen it will draw a red rectangle on the right.


<iframe src="https://editor.p5js.org/cs4all/sketches/vws_D0Dqn" height ="400 px"></iframe>

---

# `else if`

Since there are often more than two possible conditions that we want to work with, we can instruct the program to perform different tasks based on a range of conditions. 

I might want to tell someone that if it’s cold they should wear a coat, but I also may want to say:

“**If it’s freezing**, wear a coat, 
**else if it’s cold**, wear a jacket, 
**otherwise** just wear a sweater.” 


---

# `else if`

We can do this by adding “else if” to our conditionals between “if” and “else.” 

![center](../images/elseif.png)

---

# `else if` statement 


![center](../images/elseifflow.png)

---

# Logical Operators <!--fit--->

---

# And 

In the following [example](https://editor.p5js.org/cs4all/sketches/B1MNwN6E-), the ellipse becomes a square when mouseX is between 200 and 400. While we can’t use “between” in our conditionals, we can tell the program to draw an ellipse when mouseX is greater than 200 AND less than 400.

![center](../images/and.png)

---

# And 

The syntax to write "**and**" in p5 is two ampersands (`&&`). In this sketch, we draw an ellipse when mouseX is greater than 200, and when mouseX is less than 400. Otherwise (else) we draw a rectangle.


`&&` is used whenever you want the bracketed code to be executed only if both conditions evaluate to true.

![center](../images/andand.png)

---

# Or

When we would like that code to be executed as long as **one of the conditions** evaluates to true, we use "or." The syntax for "or" in p5 is two pipes "`||`". 

In this [example](https://editor.p5js.org/cs4all/sketches/HJFv_E6NW), we have used "or" to set two ranges. if the mouse is hovering within either of them, we’ll draw an ellipse. 

![center](../images/or.png)

---

# What is Interactivity?


Interactive applications are designed to respond to user input via the keyboard, mouse or other peripherals. Games, websites, and software are examples of interactive applications.

In p5.js we can allow the user to make things happen when they move the mouse, press a key, or click the mouse.

To do so, the use of conditional logic is very important. This is where control flow is crucial. As a programmer and designer you have to make decisions on what your application will do based on conditions and inputs.

---

# Traffic Light Challenge 

### Draw a traffic light that changes based on the mouse position using `else if`. 

You’ll be planning as group, in the next slides we’ll cover how this process is going to play out.


![center](../images/trafficlight.png)

---

# Draw a traffic light


Start by writing **pseudocode** for this program → 

It’s really important to make a plan for your code. Thinking through the design before programming saves time and helps solve complex problems.

![bg left:59% fit](../images/trafficpseudo.png)


---

# Planning with pseudocode

* **Step 1**: Write a basic plan on paper with instructions “Turn on the red light”
* **Step 2**: Translate the basic plan into sentences that more accurately fit the code “Add a red fill then draw an ellipse”
* **Step 3**: Place those sentences as comments into your code
* **Step 4**: Only then write the actual code step by step.

---


# Traffic Light Challenge 

### Draw a traffic light that changes based on the mouse position using `else if`. 

You’ll be planning as group, in the next slides we’ll cover how this process is going to play out.


![center](../images/trafficlight.png)

---

# Draw with Mouse 🖱️ <!--fit--->

---