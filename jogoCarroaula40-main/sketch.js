//variáveis necessárias para o projeto
var canvas;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2;
var cars = [];

//declarar variáveis para grupos de moedas e combustíveis
var coinG,fuelG

//declarar variáveis para imagem de moeda e combustível
var coinImg,fuelImg


//função de carregamento de imagens 
function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
  //carregar as imagens em suas respectivas variáveis (moeda e combustível)
  coinImg = loadImage("../assets/goldCoin.png");
  fuelImg = loadImage("../assets/fuel.png");
}

//função de configuração de objetos 
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  //iniciando o banco de dados
  database = firebase.database();


  //criando o objeto
  game = new Game();
  //chamando métodos da classe game,  através do objeto game
  game.getState();
  game.start();
}

//função de repetição
function draw() {
  background(backgroundImage);

  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
  var t = 0;
        //if para mexer o carro
        if (keyIsDown(UP_ARROW)) {
          
          if(t < 7.5){
            t=t+1;
          }
        }else{
          if(t>1){
            t-=0.12
          }
        }
        player.positionY += t;
        player.update();
    
      
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
