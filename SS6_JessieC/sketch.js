/* right click to change planet */

let planet = [];
let whichPlanet = 0;

let stars = [];

function setup() {
  createCanvas(1280, 720);

  imageMode(CENTER);

  for (let i = 0; i < 400; i++) {
    stars.push(new Star());
  }

  planet[0] = loadImage("images/earth.png");
  planet[1] = loadImage("images/moon.png");
  planet[2] = loadImage("images/jupiter.png");
  planet[3] = loadImage("images/neptune.png");
}

function draw() {
  background(10, 10, 30);
  for (let star of stars) {
    star.update();
    star.display();
  }

  image(planet[whichPlanet], width/2, height/2, 300, 300);
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

function mousePressed() 
{
  whichPlanet = int(random(planet.length)); 
	print(whichPlanet);                     
  print(fish[whichPlanet]);   
}