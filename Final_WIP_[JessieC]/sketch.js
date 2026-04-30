/* Jessie Chan
Title: Aliens vs Astronauts: Frontier 1
Click on alien to increase score
Click on astronaut for gameover
Press space to restart
*/

let stars = [];

let imgArray = [];
let items = [];
let newitems = [];

let score = 0;

let state = "game";

function preload() {
  imgArray[0] = loadImage('images/alien.png');
  imgArray[1] = loadImage('images/astronaut.png');
}

function setup() {
  createCanvas(1280, 720);

  for (let i = 0; i < 400; i++) {
    stars.push(new Star());
  }

  for (let i = 0; i < 20; i++) {
    items.push(new Alien());
  }

  for (let i = 0; i < 20; i++) {
    newitems.push(new Astronaut());
  }
}

function draw() {
  if (state == "game") {
    game();
  }
  else if (state == "gameOver") {
    gameOver();
  }
}

function game() {
  background(10, 10, 30);
  for (let star of stars) {
    star.update();
    star.display();
  }

  for (let item of items) {
    item.fall();
    item.show();
  }

  for (let newitem of newitems) {
    newitem.fall();
    newitem.show();
  }

  textSize(20);
  text("Score: " + score, 10, 30);
}

function gameOver() {
    background(10, 10, 30);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2);
  }

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 4);
    this.t = random(TAU);
  }

  update() {
    this.t += 0.05;
  }

  display() {
    let flicker = this.size + sin(this.t) * 2;
    noStroke();
    fill(255, 255, 200, 200);
    ellipse(this.x, this.y, flicker, flicker);
  }
}

class Alien {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(2, 5);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    image(imgArray[0], this.x, this.y, 100, 100);
  }
}

class Astronaut {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(2, 5);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.reset();
    }
  }

  show() {
    image(imgArray[1], this.x, this.y, 100, 100);
  }
}

function mousePressed() {
  for (let i = items.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, items[i].x, items[i].y);
    if (d < 100) {
      items.splice(i, 1);
      score++;
    }
  }

  for (let i = newitems.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, newitems[i].x, newitems[i].y);
    if (d < 100) { state = "gameOver" } }
  }

function keyPressed() {
  if (key == " ") {
    state = "game"
    score = 0
  }
}