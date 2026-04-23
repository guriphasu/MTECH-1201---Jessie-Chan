/* Jessie Chan
Title: Earth, Jupiter, and Neptune Spiral
Press 1 to make planets grown, press 2 to make planets shrink */

let stars = [];
let planet = [];

function setup() {
  createCanvas(1280, 720);

  angleMode(DEGREES);

  for (let i = 0; i < 400; i++) {
    stars.push(new Star());
  }

  planet[0] = loadImage("images/earth.png");
  planet[1] = loadImage("images/jupiter.png");
  planet[2] = loadImage("images/neptune.png");

  planet1 = new Planet(planet[0], 640, 320);
  planet2 = new Planet(planet[1], 320, 320);
  planet3 = new Planet(planet[2], 960, 320);
}

function draw() {
  background(10, 10, 30);
  for (let star of stars) {
    star.update();
    star.display();

  planet1.display();
  planet2.display();
  planet3.display();
  planet1.grow();
  planet2.grow();
  planet3.grow();
}
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
    noStroke();
    fill(255, 255, 200, 200);
    ellipse(this.x, this.y, this.size, this.size);
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