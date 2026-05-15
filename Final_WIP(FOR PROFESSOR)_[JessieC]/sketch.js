/* Jessie Chan
Title: Aliens vs Astronauts: Final Frontier
Click on alien to increase score
Click on astronaut for gameover
Press space to restart
*/

let stars = [];
let space;

let imgArray = [];
let items = [];
let newitems = [];
let planet = [];

let startButton;

let moon;
let moonsize = 1;

let comet;
let ufo;
let cometx = -1280;
let comety;
let ufox = -1280;
let ufoy;
let cometspeed = 7;
let ufospeed = 3;

let showcomet = true;
let showufo = true;

let angle = 0;
let isSpinning = false;

let score = 0;

let state = "titlescreen";

function preload() {
  imgArray[0] = loadImage('images/alien.png');
  imgArray[1] = loadImage('images/astronaut.png');

  moon = loadImage("images/moon.png");

  planet[0] = loadImage("images/earth.png");
  planet[1] = loadImage("images/jupiter.png");
  planet[2] = loadImage("images/neptune.png");

  comet = loadImage("images/comet.png");
  ufo = loadImage("images/ufo.png");

  RickRoll = loadSound("images/RickRoll.mp3")
}

function setup() {
  createCanvas(1280, 720);

  space = color(10, 10, 30);

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

  comety = random(height);
  ufoy = random(height);

  startButton = createButton('Start Game');
  startButton.position(540, 400);
  startButton.mousePressed(hideButton);
}

function draw() {
  if (state == "titlescreen") {
    titlescreen();
  }
  else if (state == "game") {
    game();
  }
  else if (state == "gameOver") {
    gameOver();
  }
  else if (state == "bonus") {
    bonus();
  }
}

function resetGame() {
  state = "titlescreen";

  space = color(10, 10, 30);
  background(space);

  score = 0;
  moonsize = 1;

  showcomet = true;
  showufo = true;

  isSpinning = false;

  startButton = createButton('Start Game');
  startButton.position(540, 400);
  startButton.mousePressed(hideButton);

  RickRoll.stop();
}

function titlescreen() {

  background(space);
  
  for (let star of stars) {
    star.update();
    star.display();
  }

  textSize(32); 
  text("Aliens vs. Astronauts: Final Frontier", 100, 268);
  text("Click an alien to score a point. Click an astronaut to lose a point.", 100, 300);
  text("Click comet or UFO for something to happen.", 100, 332)
  text("Gameover when moon reaches max size.", 100, 364);
  text("Press space to return to title.", 100, 396);
}

function hideButton() {
  startButton.hide();
  state = "game";
}

function game() {
  background(space);

  startButton.hide();

  for (let star of stars) {
    star.update();
    star.display();
  }

  if (isSpinning) {
    angle+=0.5;
  }

  push();
  translate(width / 2, height / 2);
  rotate(angle);
  imageMode(CENTER);
  image(moon, 0, 0, moonsize, moonsize);
  pop();

  if (moonsize < 1600) {
    moonsize+=1;
  }

  for (let item of items) {
    item.fall();
    item.show();
  }

  for (let newitem of newitems) {
    newitem.fall();
    newitem.show();
  }

  if (showcomet) {image(comet, cometx, comety, 100, 100);}
  if (showufo) {image(ufo, ufox, ufoy, 100, 100);}

  cometx+= cometspeed;
  if (cometx > width) {
    cometx = -1280;
    comety = random(height);
  }

  ufox+= ufospeed;
  if (ufox > width) {
    ufox = -1280;
    ufoy = random(height);
  }

  textSize(20);
  text("Score: " + score, 10, 30);

  if (moonsize >= 1600) {
    state = "gameOver"
  }
}

function gameOver() {
  space = color(10, 10, 30);
  background(space);

  textSize(20);
  text("Press the 'S' key for a hidden secret", 500, 340)

  planet1.display();
  planet2.display();
  planet3.display();
  planet1.grow();
  planet2.grow();
  planet3.grow();

  fill(255);
  textSize(32);
  text("GAME OVER", 540, 600);
  text("Score: " + score, 540, 570);
  }

function bonus() {
  startButton.hide();
  RickRoll.play();
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
    this.diameter = 500;
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
    this.diameter = constrain(this.diameter, 50, 900);
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
    if (d < 75) {
      items.splice(i, 1)[0];
      score+=1;
    }
  }

  for (let i = newitems.length - 1; i >= 0; i--) {
    let d = dist(mouseX, mouseY, newitems[i].x, newitems[i].y);
    if (d < 75) { 
      newitems.splice(i, 1)[0];
      score-=1;
    } 
  }

  if (mouseX > cometx && mouseX < cometx+100 && mouseY > comety && mouseY < comety+100) {
    showcomet = false;
    score+=5;
    let r = random(255);
    let g = random(255);
    let b = random(255);
    space = color(r, g, b);
  }

  if (mouseX > ufox && mouseX < ufox+100 && mouseY > ufoy && mouseY < ufoy+100) {
    showufo = false;
    score+=3;
    isSpinning = true;
}
}


function keyPressed() {
  if (key == " ") {
    resetGame();
  }
  if (key == "s") {
    state = "bonus";
  }
}