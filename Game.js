class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1pic);
  
    car2 = createSprite(300,200);
    car2.addImage(car2pic);

    car3 = createSprite(500,200);
    car3.addImage(car3pic);

    car4 = createSprite(700,200);
    car4.addImage(car4pic);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
       //     background(rgb(198,135,103));

      //index of the array

      image(trackpic, 0 ,-displayHeight * 4, displayWidth, displayHeight *5);
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index * 200)+allPlayers[plr].xpos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
text(allPlayers[plr].name,cars[index-1].x, cars[index-1].y+75)
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
if(keyIsDown(38)&& player.index !== null){
  Yvel = Yvel + 0.95;
  if(keyIsDown(37)){
    Xvel -= 0.4;
  }
  if(keyIsDown(39)){
    Xvel += 0.4;
  }
}

player.distance += Yvel;
Yvel *= 0.95;
player.xpos += Xvel
Xvel *= 0.9;
player.update();

    if(player.distance > 3750){
      gameState = 2;
    }

  
    drawSprites();
  }



}
