//classe Game
class Game {
  //método de construção 
  constructor() { }

  //pegar estado de jogo do banco
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  //atualizar estado de jogo no banco
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  //quando começa
  start() {
    //criar um objeto player
    player = new Player();
    //pegar essa informação do banco através do método
    playerCount = player.getCount();

    //criar um objeto formulário
    form = new Form();
    //chama o método para exibir
    form.display();

    //sprites dos carros
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    //guardando carros na matriz
    cars = [car1, car2];

    //criar grupos de moedas e combustíveis 
    coinG = new Group();
    fuelG = new Group(); 
    //chamar a função e entregar parâmetros
    this.addSprites(fuelG,4,fuelImg,0.02);
    this.addSprites(coinG,18,coinImg,0.09);

  }

  //função que adicionará os sprites moedas e combustíveis
   addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
     for (var i = 0; i < numberOfSprites; i++) {
       var x, y;
 
       x = random(width / 2 + 150, width / 2 - 150);
       y = random(-height * 4.5, height - 400);

       var sprite = createSprite(x, y);
       sprite.addImage("sprite", spriteImage);
 
       sprite.scale = scale;
       spriteGroup.add(sprite);
     }
   }


  //manipulação de elementos
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //quando der play no jogo
  play() {
    //chamando a função para características de tela
    this.handleElements();
    //pegar as informações dos players
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //criar um for para pegar informações do banco  
      //índice da matriz
      var index = 0;
      //extrair posições dos jogadores do obj allplayers
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        //if para verificar o carro e desenhar a bolinha
        if (index === player.index) {
         stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //aproveitando e passando o index para a função que remove os sprites
          this.handleFuel(index)
          this.handlePowerCoins(index)
          camera.position.y = cars[index-1].position.y
        }


        //if para mexer o carros
        if (keyIsDown(UP_ARROW)) {
          player.positionY += 5;
          player.update();
        }
      }
      drawSprites();

    }
  }


  //handleFuel e handlePowerCoins 
  //para quando coletar os sprites criados, desaparecer 


   handleFuel(index) {
     //adicionando combustível
     cars[index - 1].overlap(fuelG, function (collector, collected) {
       player.fuel = 185;
       //o sprite é coletado no grupo de colecionáveis que desencadeou
       //o evento
       collected.remove();
     });
   }
 
   handlePowerCoins(index) {
     cars[index - 1].overlap(coinG, function (collector, collected) {
       player.score += 21;
       player.update();
       //o sprite é coletado no grupo de colecionáveis que desencadeou
       //o evento
       collected.remove();
     });
   }
 






}







