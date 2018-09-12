var theta;
var omega;
var alpha;

function setup() {
  createCanvas(600,600);
  theta = 0;
  omega = 0;
  alpha = 0.001;

}

function draw() {
  background(255);
  theta += omega;
  omega += alpha;
  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(theta);

for (var i = 0; i < 430; i +=15){
  fill(map(i,0,630,0,255),map(mouseX,0,width,0,255),map(mouseY,0,height,0,255));
  rect(0, 0, 700-i, 700-i);
  alpha = alpha*i;
  rotate(theta);


}
}
