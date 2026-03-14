let laserX = 0;
let laserY = 0;
let laserSpeed = 0;

let x = 0;
let y = 0;
let size = 300;
let imagesize = 1;

let state = "preGame"

function preload() {
  moon = loadImage("images/moon.png");

  flag = loadImage("images/flag.png");
}

function setup() {
  createCanvas(1280, 720);

  ellipseMode(CENTER);
  imageMode(CENTER);

  x = width/2;
  y = height/2;

}

function draw() {

  if (state == "preGame") {
    preGame();
  } 
	else if (state == "game") {
    game();
  } 
	else if (state == "gameOver") {
    gameOver();
  }
}

function star(x, y) {
  stroke(230, 230, 163);
  strokeWeight(10);
  point(x, y);
}

function laser(laserSpeed) {
  stroke(0, 255, 255);
  strokeWeight(6);
  line(0, 0, laserX, laserY);

  laserX = laserX + laserSpeed * 1.78;
  laserY = laserY + laserSpeed;
}

function preGame() {
  background(7, 59, 143);

  fill(230, 230, 163);
  noStroke();
  ellipse(x, y, size, size);

  laser(4);

  star(random(width), random(height));

  if(laserX > 640 || laserY > 360){
    state = "game";
}
}

function game() {
  background(7, 59, 143);

  fill(230, 230, 163);
  noStroke();
  ellipse(x, y, size, size);

  star(random(width), random(height));

  size-=1;

  if(size < 0) {
    state = "gameOver"
  }
}

function gameOver() {
  background(7, 59, 143);

  star(random(width), random(height));

  image(moon, x, y, imagesize, imagesize);

  image(flag, mouseX, mouseY, flag.width/10, flag.height/10);

  imagesize+=1

}