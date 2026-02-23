/*
Jessie C.
*/

let laserX = 0;
let laserY = 0;
let laserSize = 6;
let laserSpeed = 0;

let dia = 300;
let growAmount = 1;
let grow = true;

function setup() {
  createCanvas(1280, 720);

  background(7, 59, 143);
}

function draw() {

  fill(230, 230, 63);
  strokeWeight(0.5);
  circle(640, 360, dia);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 50, 50);
  
  fill(0, 10);
  rect(0, 0, width, height);
  
   if (dia > 300) {
    grow = false
  }
  if (dia < 0) {
    grow = true
  }
  
  if (grow == true) {
    dia += growAmount
  } else {
    dia -= growAmount
  }
  
  console.log("diameter", dia)
  console.log("grow", grow)

  laser(4);
   }

function laser(laserSpeed) {
  fill(0, 255, 255);
  noStroke();
  ellipse(laserX, laserY, laserSize);
  laserX = laserX + laserSpeed * 1.78;
  laserY = laserY + laserSpeed;
  laserSize = laserSize + 0.1;

  if(laserX > 640 || laserY > 360){
    laserX = 0;
    laserY = 0;
    laserSize = 1;
  }
}

function mousePressed() {
  noLoop();
}

function keyPressed() {
  redraw();
}