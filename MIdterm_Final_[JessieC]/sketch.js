// press mouse to restart animation

let laserX = 0;
let laserY = 0;
let laserSpeed = 0;

let x = 0;
let y = 0;
let size = 300;
let imagesize = 1;

let r = 0;
let g = 255;
let b = 0;

let state = "preGame";

function preload() {
  earth = loadImage("images/earth.png");

  explosion = loadImage("images/explosion.gif");

  moon = loadImage("images/moon.png");

  flag = loadImage("images/flag.png");
}

function setup() {
  createCanvas(1280, 720);

  ellipseMode(CENTER);
  imageMode(CENTER);

  textAlign(CENTER);
  textSize(88);

  x = width/2;
  y = height/2;
}

function resetGame() {
  laserX = 0;
  laserY = 0;
  laserSpeed = 0;

  x = 0;
  y = 0;
  size = 300;
  imagesize = 1;

  r = 0;
  g = 255;
  b = 0;

  x = width/2;
  y = height/2;

  state = "preGame"
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

function mousePressed() {
    resetGame();
}

function star(x, y) {
  stroke(230, 230, 163);
  strokeWeight(random(10));
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

  for (let i = 0; i < 20; i++) {
  star(random(width), random(height));
  }

  image(earth, x, y, size, size);

  laser(4);

  if(laserX > 640 || laserY > 360){
    state = "game";
}
}

function game() {
  background(7, 59, 143);
  
  for (let i = 0; i < 20; i++) {
  star(random(width), random(height));
  }

  image(earth, x, y, size, size);

  size-=1;

  image(explosion, 640, 360);

  if(size < 1) {
    state = "gameOver"
  }
}

function gameOver() {
  background(7, 59, 143);

  for (let i = 0; i < 20; i++) {
  star(random(width), random(height));
  }

  image(moon, x, y, imagesize, imagesize);

  fill(r, g, b);
  noStroke();
  text("To the Moon!", x, y);
  r = random(255);
  g = random(255);
  b = random(255);

  image(flag, mouseX, mouseY, flag.width/10, flag.height/10);

  imagesize+=1
}