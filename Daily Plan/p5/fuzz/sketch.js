function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
  background(220);
  noStroke()
  for (i = 0; i < width; i += 20){
  	for (j = 0; j < height; j += 20){
    	fill(random(255));
      rect(i,j,20,20);
    }
  }
}
