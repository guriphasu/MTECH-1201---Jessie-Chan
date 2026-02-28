/*
Jessie C.
Title: Phases of the Moon
The concept this time is the waxing and waning of the moon. Click to stop animation
and click again to start animation.
*/

let x = 0;
let y = 0;

let a = 0;
let h1 = 1;
var c;

let pause = false;

var stars = [];

function setup() {
  createCanvas(1280, 720);
  angleMode(RADIANS);
  frameRate(20);

  for (var i = 0; i < 1000; i++) {
		stars[i] = new Star();
	}
}

function draw() {
	let bg_color = color(7, 59, 143);
  let light_color = color(230, 230, 163);
  background(bg_color);

  let d2 = 300;

  noStroke();
  ellipseMode(CENTER);

  let earthx = width/2 - width/6;
  let earthy = height/2;

  a -= 0.01;      
  a %= -Math.PI*2;

  noStroke();
  let phasex = width/2
  let phasey = height / 2;

  line(phasex, 0, phasex, height);

  let color1 = color(360, 100, 100, 0);
  let color2 = color(0,25,25,0);
  let color3 = color(0,25,25,0);
  let color4 = color(0,25,25,0);

  if (-Math.PI/2 < a && a < 0) {
    color3 = light_color;
    color4 = light_color;
    color1 = light_color;
    color2 = bg_color;
  } else if (-Math.PI < a && a < -Math.PI/2) {
    color1 = light_color;
    color3 = bg_color;
    color4 = bg_color;
    color2 = bg_color;
  } else if (-3*Math.PI/2 < a && a < -Math.PI) {
    color4 = bg_color;
    color2 = light_color;
    color1 = bg_color;
    color3 = bg_color;
  } else if (-2*Math.PI < a && a < -3*Math.PI/2) {
    color4 = color(0,255,0,0);
    color3 = light_color;
    color1 = bg_color;
    color2 = light_color;
  }

  fill(color1);
  arc(phasex, phasey, d2, d2, PI/2, 3 * PI/2);
  fill(color2);
  arc(phasex, phasey, d2, d2, 3 * PI/2, PI/2);

  let heightPhase = d2;
  let widthPhase = map(Math.cos(a), 0, 1, 0, d2);

  fill(color3);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, PI/2, 3 * PI/2);
  fill(color4);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, 3 * PI/2, PI/2);

  h1+=1;
  if (h1 >= 360){
    h1 = 1;
  }

  for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}

class Star {
	constructor() {
		this.x = random(width);
		this.y = random(height);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}
	
	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
		ellipse(this.x, this.y, scale, scale);
	}
}

function mousePressed(){
  if(pause==false){
    noLoop();
    pause=true;
  }else{
    loop();
    pause = false;
  }
}