/* 
Jessie C.
Title: The Real Moon Grows and Shrinks
The concept this time is that a picture of the moon is growing and shrinking. Click
to stop animation and click again to start animation. After 5 seconds, the text: "To
the Moon" shows up in random and flashing colors.
*/

let moon;

let grow = true;

let starArray = [];

let pause = false;

let currentTime = 0;
let timer = 5000;

let r = 0;
let g = 255;
let b = 0;

function preload() {
  moon = loadImage("images/moon.png");
}

function setup() {
  createCanvas(1280, 720);

 //number of stars
  for (let n = 0; n < 400;n ++)
  {
     starArray.push(new Star()); 
  }

  noStroke();
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(88);

}

function draw() {
	let bg_color = color(7, 59, 143);
  background(bg_color);

  image(moon, width/2, height/2, moon.width/2, moon.height/2);

  if (moon.width>width){
    grow = false
  }
  if (moon.width<0){
    grow = true 
  }
  if (grow==true){
    moon.width+=1
    moon.height+=1
  } else {
    moon.width-=1
    moon.height-=1
  }

  for(let i = 0;i < starArray.length;i++)
  {
     starArray[i].show(); 
  }
  
  currentTime = millis();

  if (currentTime>timer) {
    fill(r, g, b);
    text("To the Moon!", width/2, height/2);
    r = random(255);
    g = random(255);
    b = random(255);
  } 
}

// drawing out the stars
class Star {
    constructor()
    {
      this.x = random(width);
      this.y = random(height);
    }
  show()
  {
    fill(230, 230 , 163)
    ellipse(this.x,this.y,3,3);
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