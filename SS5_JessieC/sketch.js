/* 
Jessie Chan
Title: Reign of Astronauts vs. Aliens
Right click to change from astronauts to aliens
*/

let astronaut;
let alien;
let items = [];
let currentImg;

function preload() {
  astronaut = loadImage('images/astronaut.png');
  alien = loadImage('images/alien.png');
}

function setup() {
  createCanvas(1280, 720);

  for (let i = 0; i < 10; i++) {
    items.push({
      x: random(width),
      y: random(-height, 0),
      speed: random(1, 5)
    });
  }

  currentImg = astronaut;
}

function star(x, y) {
  stroke(230, 230, 163);
  strokeWeight(random(10));
  point(x, y);
}

function draw() {
  background(7, 59, 143);

  for (let i = 0; i < 20; i++) {
  star(random(width), random(height));
  }

  for (let i = 0; i < items.length; i++) {
    let obj = items[i];

    image(currentImg, obj.x, obj.y, 100, 100);

    obj.y += obj.speed;

    if (obj.y > height) {
      obj.y = -40; 
      obj.x = random(width);
    }
  }
}

function mousePressed() {
  if (currentImg === astronaut) {
    currentImg = alien;
  } else {
    currentImg = astronaut;
  }
}