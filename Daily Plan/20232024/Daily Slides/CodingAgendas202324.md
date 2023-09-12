---
title: Coding 2023
marp: true
theme: schodack
paginate: true
footer: Be brave, not perfect
---

# Coding 💻 <!---fit--->

# **2023-2024** Agendas

## 👨‍🏫 Mr. Porter

---

# 2023.09.12 **Coding**

##### **❓of the 📅**: What smells bring you back to a different time? 👃 🌲

1. Finish Robot Drawing and Turn in on Canvas 
2. Background:
    - What is a function
    - Common drawing functions
3. Drawing Practice:
    - 0.1.2 Drawing in p5.js
    - 0.1.3 Drawing in p5.js - Part II

---

# Functions 

While `setup()` and `draw()` are defined by the developer in each sketch, most of the p5 functions we'll use today are defined by the p5 library, and **invoked** or **“called”** in our code.

When a function is invoked, or called, the programmer is asking the program to run the code within the function.  The **parenthesis operator** is used to invoke the function.

```
rect(50, 50, 100, 100);
```

The values inside of the parentheses are known as **arguments**.  These are used to change the outcome of a function.

---

# Functions **SYNTAX ALERT**

```
function(argument1, argument2);
```

In Javascript, you can **call** a function by writing the name of the function followed by parentheses and a semicolon. 

Any arguments are written in the parentheses with commas in between them.

---

![bg](../images/coding/ICM%20Unit%200%20Reference%20Slides.png)

---

# Create Canvas 

```
createCanvas(600, 240);
```

This function creates an HTML canvas element that is 600 pixels wide and 240 pixels high. 

The canvas is an HTML element that draws graphics and animations using scripting. 


![bg right fit](../images/coding/canvas.png)

---

# Functions 

<div class="columns">
<div>

```
p5.Renderer2D.prototype.line = function(x1, y1, x2, y2) {
var ctx = this.drawingContext;
  if (!this._doStroke) {
    return this;
  } else if (this._getStroke() === styleEmpty) {
    return this;
  }
  // Translate the line by (0.5, 0.5) to draw it crisp
  if (ctx.lineWidth % 2 === 1) {
    ctx.translate(0.5, 0.5);
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  if (ctx.lineWidth % 2 === 1) {
    ctx.translate(-0.5, -0.5);
  }
  return this;
};

```

</div>


<div>

## **Calling** this function 

```line(x1,y1,x2,y2);```

</div>

---

# Background Color 

```
background(0);
```

This function gives our canvas a background color between 0 (black) and 255 (white).

![bg right fit](../images/coding/background.png)

---

# p5.js Coordinate System 

p5.js makes drawing on the canvas easy by providing functions for us to draw shapes, but we need to be able to tell the program where to draw those shapes. 

To do that,  we need to understand the coordinate system that we’ll be drawing in.



![bg right fit](../images/coding/coord.png)

---

# Comments 

Lines of code preceded by two slashes // will be read as comments in p5.js and will be ignored by the interpreter. The interpreter is the program that executes the instructions written in a programming language.


```
// move the following rectangle on the x axis
rect(200, 50, 50, 50);
```

---

# Basic Shapes 

## Draw a Point 

The function to draw a point is `point()`. The arguments are `(x,y)` which are the x and y coordinates. 

```
point(x,y);
```

---

# Basic Shapes 

## Draw a line 

The `line()` function requires four parameters: **x1**, **y1**, **x2**, and **y2**. For this function to work, it needs to know:

The **x** and **y** coordinates of the first point

The **x** and **y** coordinates of the second point

![bg right 90%](../images/coding/line.png)

---

## Basic Shapes Draw a Rectangle 

The `rect()` function requires four parameters: **x**, **y**, **width**, and **height**. For this function to work, it needs to know:

1. Where to put the rectangle  → x and y locations
2. What size the rectangle should be → width and height 

All these parameters are measured in 
pixels. 

![bg right 90%](../images/coding/rect.png)

---


## Basic Shapes Draw an ellipse 

The `ellipse()` function requires four parameters: **x**, **y**, **width**, and **height**. For this function to work, it needs to know:

1. Where to put the ellipse  → x and y locations
2. What size the ellipse should be → width and height 

All these parameters are measured in 
pixels. 

![bg right 90%](../images/coding/ellipse.png)

---

# Drawing Order 

In p5, shape and color functions are rendered to the canvas in the order they're written in the program from top to bottom.

[Example](https://editor.p5js.org/cs4all/sketches/-qyS-eDP7) - Remove the comments to see how the rectangles layer on one another.

![bg right](../images/coding/drawingorder.png)

---

# Canvas Assignments 

1. 0.1.2 Drawing in p5.js (Drawing points and lines)
2. 0.1.3 Drawing in p5.js - Part II (Drawing Order & Shapes)

---

# 2023.09.08 **Coding**

##### **❓of the 📅**: What is your most used emoji?

1. Welcomes & Question of the Day
2. What will we be coding? What is p5.js?
3. Robots...🤖



---

![bg fit](../images/Gaussian%20Random%20Circles.png)

---



# [🎬What is p5.js?](http://hello.p5js.org/)

- JavaScript Library for creating visual and interactive art (and more!)
- Works with *three* languages: JavaScript, HTML, and CSS
- This programming language will be used in this course to introduce basic programming concepts and apply them to create computational media by building expressive and interactive computer applications and media.


---


# [Processing](https://processing.org/)

"Processing is a flexible software sketchbook and a language for learning how to code within the context of the visual arts. Since 2001, Processing has promoted software literacy within the visual arts and visual literacy within technology. There are tens of thousands of students, artists, designers, researchers, and hobbyists who use Processing for learning and prototyping."

  - Free to download and open source
  - Interactive programs with 2D, 3D, PDF, or SVG output
  - OpenGL integration for accelerated 2D and 3D
  - For GNU/Linux, Mac OS X, Windows, Android, and ARM
  - Over 100 libraries extend the core software
  - Well documented, with many books available

---

# [p5.js](https://p5js.org/)

- Processing, but adapted for javascript
- means you can run it in your internet browser
- Also has an online editor and you can run it with your Chromebooks

---

# Draw a Robot 🤖 <!--fit--->

- Find a partner
- Get a whiteboard 
- Split your side in half 
- Draw a robot with **5 Shapes** on your side on one half


---

In p5 we use code to draw graphics on a canvas:

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/visualoutcome.png" width = "700px"/>


---

The coordinate system is different...

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/coordinategrid.png" width = "700px"/>

---

Adjust your robot's coordinates:

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/robot.png" width = "500px"/>



---

##Rectangles:

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/heightwidthsquare.png" width = "400px"/>

##Ellipses:

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/heightwidth.png" width = "400px"/>

---


## 🔌 Unplugged...Draw a robot...

Draw a robot using:

- Using only rectangles, circles, and ellipses
- Using at *least* 5 total shapes

## Why?

We need to practice giving instructions. Coding is all about giving a computer instructions that it will understand.

---

# Write the info for your robot....

List the shapes and write down their information

<img src="https://nycdoe-cs4all.github.io/images/lessons/unit_1/1.1/shapeinstructions.png" width = "700px"/>

---


# The Code

### Set up the window
```javascript

function setup() {
  createCanvas(400, 400);
}
```

### A continuous loop
```javascript
function draw() {
  background(220);
}
```

---

# Draw your robot assignment

Draw a robot using:

- Using only rectangles, circles, and ellipses
- Using at *least* 5 total shapes
 

