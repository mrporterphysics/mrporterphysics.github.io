var x;

function setup() {
  createCanvas(400, 400);
  x = 0;
}

function draw() {
  background(220);
  ellipse(x, height/2, 50,50 );

  x = x+1;
  
}
