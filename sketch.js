var PLAY=1;
var END=0;
var gamestate=PLAY;

var blueman;
var blue1,bee11;
var ground2,ground1;
var score;
var gameover,restart,restart1;
var beeGroup,coinGroup;
var coin1,coin2,coin3;
var collect,music;

function preload(){
  blue1=loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png");
  bee11 = loadAnimation("bee1.png","bee2.png");
  ground1=loadImage("ground.png");
  restart1=loadImage("restart.png");
  coin1=loadImage("Gold_21.png");
  coin2=loadImage("Bronze_30.png");
  coin3=loadImage("Silver_21.png");
  collect=loadSound("Super-Mario-010-coin.mp3");
music=loadSound("greens.mp3");
  
}
function setup() {
  createCanvas(400, 400);
  music.play();
 blueman = createSprite(50,350,20,50);
  blueman.addAnimation("running",blue1);
  blueman.scale=0.5;
  
  ground2=createSprite(0,378,400,20);
 ground2.addImage("ground2",ground1);
    ground1.scale=0.8;
  ground2.velocityX=-4;
  
  restart=createSprite(200,150,50,50);
 restart.addImage(restart1);
  restart.scale=1.4;
  restart.visible=false;
  coinGroup=new Group();
  beeGroup=new Group();
  
  score=0;
  
  
  
}

function draw() {
  background("blue");
  blueman.collide(ground2);
  if(ground2.x<0){
    ground2.x=ground2.width/4;
  }



fill("red");
textSize(20);
textFont("OCR A");
text("Score:"+score,300,35);

if(gamestate===PLAY){
  if(ground2.x<0){
    ground2.x=ground2.width/4;
  }
  
    if(keyDown("space")&&blueman.y>324){
    blueman.velocityY = -12 ;
    
  }
  
if (blueman.isTouching(beeGroup)){
  blueman.destroy();
  gamestate=END;
}

if(blueman.isTouching(coinGroup)){
  coinGroup.destroyEach();
  score=score+1;
collect.play();
}

spawncoin();
  spawnbee();
  
  restart.visible=false;
}

if (gamestate===END){
  ground2.velocityX=0;
  beeGroup.setVelocityXEach=(0);
  coinGroup.setVelocityXEach=(0);
  blueman.velocityY=0;
  blueman.velocityX=0;
 
 coinGroup.destroyEach();
    beeGroup.destroyEach();
  
restart.visible=true;
  if(mousePressedOver(restart)){
  reset();
  }
}
  blueman.velocityY=blueman.velocityY+0.8;
  spawncoin();
  spawnbee();
  drawSprites();
  
}
function spawncoin(){
  if(World.frameCount%60===0){
    var coin=createSprite(400,280,20,20);
   
  var rand = Math.round(random(1,3));
   switch(rand){
     case 1: coin.addImage(coin1);
         break
    case 2 : coin.addImage(coin2);
         break;
     case 3: coin.addImage(coin3);
         break;
         
         default:break; 
   }
    coinGroup.add(coin);
     coin.velocityX=-4;
    coin.scale=0.05;
    coin.lifetime=134;
}

}

function spawnbee(){
  if (World.frameCount%50===0){
    var bee=createSprite(400,340,20,20);
    bee.velocityX=-5;
    bee.addAnimation("beee",bee11);
  bee.scale=0.4;
  bee.lifetime=100;
  beeGroup.add(bee);
    
  }
  }
  
  function reset(){
    gamestate=PLAY;
    score=0;
blueman = createSprite(50,350,20,50);
  blueman.addAnimation("running",blue1);
  blueman.scale=0.5;
    ground2.velocityX=-4;
   
    restart.visible=false;
  }