const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = 0;
var particle;
var PLAY = 1;
var END = 0;
var gameState = 1;
var count = 0;

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);


  for (var k = 0; k <= width; k = k + 80) {

    divisions.push(new Divisions(k, height - divisionHeight/2, 10, divisionHeight));

  }


  for (var j = 75; j <= width; j = j + 50) {
    
    plinkos.push(new Plinko(j, 75));

  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    
    plinkos.push(new Plinko(j, 175));

  }

  for (var j = 75; j <= width; j = j + 50) {
    
    plinkos.push(new Plinko(j, 275)); 

  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    
    plinkos.push(new Plinko(j, 375));

  }
    
}

function draw() {
  background("black");
  
  textSize(20);
  text("Score : " + score, 20, 30);

  for(var i = 25; i < 325; i = i + 80){

    text("500", i, 550);

  }

  for(var i = 345; i < 565; i = i + 80){

    text("100", i, 550);

  }

  for(var i = 585; i < 750; i = i + 80){

    text("200", i, 550);

  }

  Engine.update(engine);
 
  
  for (var i = 0; i < plinkos.length; i++) {
     
    plinkos[i].display();
     
  }

  //if (frameCount % 60 === 0) {

    //particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    //score++;

  //}
 
  //for (var j = 0; j < particles.length; j++) {
   
    //particles[j].display();

  //}

  for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();

  }

  ground.display();

  if(gameState === PLAY){

    if(particle != null){

      particle.display();

      if(particle.body.position.y > 760){

        if(particle.body.position.x < 300){

          count = count + 1;

          score = score + 500;
          particle = null;

        }else if(particle.body.position.x > 300 && particle.body.position.x < 550){

          count = count + 1;

          score = score + 100;
          particle = null;

        }else if(particle.body.position.x > 550 && particle.body.position.x < 770){

          count = count + 1;

          score = score + 200;
          particle = null;
        
        }

      }

    }

    if(count >= 5){

      gameState = END;

    }

  }else if(gameState === END){

    textSize(75);
    text("Game Over", 200, 250);

  }


  console.log(count)
  //console.log(particle)
}

function mousePressed(){

  particle = new Particle(mouseX, 10, 10, 10);

}