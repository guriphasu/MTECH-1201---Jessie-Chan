/*
Jessie C.
Title: The Moon Grow and Shrinks
The concept this time is the growing and shrinking of the moon. Click to stop 
animation and click again to start animation.
*/

let x = 0;
let y = 0;
let xMove = 1;
let yMove = 1;
let size = 300;
let grow = true;

let starArray = []

let pause = false;

function setup() {
  createCanvas(1280, 720);

 //number of stars
  for (let n = 0; n < 400;n ++)
  {
     starArray.push(new Star()); 
  }

  noStroke();
  ellipseMode(CENTER);

  x = width / 2;
  y = height / 2;

}

function draw() {
	let bg_color = color(7, 59, 143);
  background(bg_color);

  fill(230, 230, 163);
  ellipse(x, y, size, size);

  if (size>width){
    grow = false
  }
  if (size<0){
    grow = true
  }
  if (grow==true){
    size+=1
  }else{
    size-=1
  }

  for(let i = 0;i < starArray.length;i++)
  {
     starArray[i].show(); 
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