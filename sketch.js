var trex,trexran,trexdead,g,ig,gimg,cgrp,cimg,obgrp,oi1,oi2,oi3,oi4,oi5,oi6,cloud,rand,obstacle,sc,GO,r,GOimg,rimg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trexran=loadAnimation("trex1.png","trex3.png", "trex4.png");
trexdead=loadImage("trex_collided.png");
  gimg=loadImage("ground2.png");
  cimg=loadImage("cloud.png");
   oi1=loadImage("obstacle1.png");
   oi2=loadImage("obstacle2.png");
   oi3=loadImage("obstacle3.png");
   oi4=loadImage("obstacle4.png");
   oi5=loadImage("obstacle5.png");
   oi6=loadImage("obstacle6.png");
  GOimg=loadImage("gameOver.png");
  rimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 250);
trex=createSprite(100,200,30,30);
  trex.addAnimation("run",trexran);
  trex.addImage("dead",trexdead);
  trex.scale=0.5;
  g=createSprite(250,230,500,5);
  g.addImage("ground",gimg);
  ig=createSprite(250,240,500,5);
  ig.visible=false
  g.x=g.width/2;
  g.velocityX=-8
  cgrp=new Group();
  obgrp=new Group();
  sc=0;
  GO=createSprite(300,100);
  GO.addImage(GOimg);
  r=createSprite(300,125)
  r.addImage(rimg);
  GO.visible=false;
  r.visible=false;
}

function draw() {
  background(100);
  //sc=sc+Math.round(getFrameRate()/60)
  text("score = "+sc,500,30);
    if(gameState === PLAY){
    //move the ground
    g.velocityX = -(6 + 3*sc/100);
    //scoring
    sc = sc + Math.round(getFrameRate()/60);
    

    if (g.x < 0){
      g.x = g.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y > 200){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obgrp.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    GO.visible = true;
    r.visible = true;
    
    //set velcity of each game object to 0
    g.velocityX = 0;
    trex.velocityY = 0;
    obgrp.setVelocityXEach(0);
    cgrp.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeImage("dead",trexdead);
    
    //set lifetime of the game objects so that they are never destroyed
    obgrp.setLifetimeEach(-1);
    cgrp.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(r)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(ig);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  GO.visible = false;
  r.visible = false;
  
  obgrp.destroyEach();
  cgrp.destroyEach();
  
  trex.changeAnimation("run",trexran);
  
  sc = 0;
  
}
  //if(keyDown("space"))
  //trex.velocityY=-10; 

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,220,40,10);
    cloud.y = Math.round(random(10,150));
    cloud.addImage(cimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 201;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cgrp.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,215,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(oi1);
      break;
       case 2:obstacle.addImage(oi2);
      break;
     case 3:obstacle.addImage(oi3);
      break;
      case 4:obstacle.addImage(oi4);
      break;
    case 5:obstacle.addImage(oi5);
      break;
    case 6:obstacle.addImage(oi6);
      break;
      default:break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 201;
    obgrp.add(obstacle);
    }
}




