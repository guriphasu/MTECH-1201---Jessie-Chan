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
let planet = [];

let score = 0;

let state = "game";

function preload() {
  imgArray[0] = loadImage('images/alien.png');
  imgArray[1] = loadImage('images/astronaut.png');

  planet[0] = loadImage("images/earth.png");
  planet[1] = loadImage("images/jupiter.png");
  planet[2] = loadImage("images/neptune.png");
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

  planet1 = new Planet(planet[0], 640, 320);
  planet2 = new Planet(planet[1], 320, 320);
  planet3 = new Planet(planet[2], 960, 320);
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

  planet1.display();
  planet2.display();
  planet3.display();
  planet1.grow();
  planet2.grow();
  planet3.grow();

  fill(255);
  textSize(32);
  text("GAME OVER", 540, 360);
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

class Planet {
  constructor(planet, x, y) {
    this.planet = planet;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.diameter = 300;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.planet, 0, 0, this.diameter, this.diameter);
    pop();
    
    this.angle += 0.05;
  }

  grow() {
    this.diameter = constrain(this.diameter, 100, 700);
    if (keyIsPressed) 
		{
      if (key == '1') 
			{
        this.diameter++;
      } 
			else if (key == '2') 
			{
        this.diameter--;
      }
  }
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