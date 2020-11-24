var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score , survivalTime ,  ground2 ;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(190,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1

  
  ground = createSprite(600,350,2000,10); 
  ground.velocityX = -4;
  ground.shapeColor = rgb(50,205,50);
  ground.x = ground.width/2;

  
  ground2 = createSprite(400,360,600,20);
  ground2.velocityx = -4;
  ground2.x = ground2.width/2;
  ground2.visible = false
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false ;
  
  survivalTime = 0;
  score = 0;

}


function draw() {
background(rgb(173,216,230));  monkey.collide(ground2);
 ground.velocityX = -4;
  
  stroke("white");
  fill("white");
  textSize(20);
  text("score : " +score,500,50);
  
  stroke("black");
  textSize(17);
  fill("maroon")
  //score = Math.ceil(frameCount/frameRate())
  text("Survival Time : "+ survivalTime,100,50);
  
  if(ground.x < 0){
        ground.x = ground.width/2;
       }
  
  if(gameState===PLAY)
    {      
     survivalTime = survivalTime + Math.round(getFrameRate()/60);
      
      if(keyDown("space") ){
        monkey.velocityY = -12;       
      }
       
      //gravity
     monkey.velocityY = monkey.velocityY + 0.8; 
      
      spawnBananas();
      spawnObstacles();
      
      if(monkey.isTouching(obstaclesGroup))
        {
          gameState = END;
       
        }    
    }
  else if(gameState === END)
    {                   
      ground.velocityX  =0;
      
      foodGroup.setLifetimeEach(0);
      obstaclesGroup.setLifetimeEach(0);
      
      foodGroup.setVelocityEach(0);
      obstaclesGroup.setVelocityEach(0);
      
      
      monkey.collide(ground2);
      
       if(keyDown("R"))
        {
          reset();
        }
      
    }
  
    drawSprites();
}

function spawnBananas(){
  if(frameCount%80===0){
 var banana = createSprite(390,0,20,20);
    banana.y = Math.round(random(100,200))
    banana.addImage(bananaImage);
    banana.scale = 0.1;    
    banana.velocityX = -5;
    banana.Lifetime = 100;   
    foodGroup.add(banana)
}
}

function spawnObstacles()
{
  if(frameCount%200===0){
  var obstacle = createSprite(300,320,40,20);
  obstacle.velocityX = -4;
  obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
  
    obstaclesGroup.add(obstacle)
  }
}

function reset()
{
  gameState = PLAY
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  survivalTime = 0;
  score = 0;
}
