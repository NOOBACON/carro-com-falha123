//classe Player
class Player {
  //método de construção
  constructor() {
    //nome inicialmente como nulo
    this.name = null;
    //index inicialmente como nulo
    this.index = null;
    //posição x inicial é 0
    this.positionX = 0;
    //posição y inicial é 0
    this.positionY = 0;
  }

  //método para adicionar jogadores no banco
  addPlayer() {
    //cria campo no banco baseado no id
    var playerIndex = "players/player" + this.index;

    //verifica o id para dar as posições iniciais na tela para cada jogador 
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    //registra essas informações no banco 
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  //ativar o método que pegará a distancia dos jogadores e acabar de programá-lo
  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }





  //conta os jogadores, pega a informação do banco 
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  //atualiza essa contagem de jogadores, leva a informação para o banco
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }


  //atualização do player 
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,

    });
  }


  //pega as informações atualizadas do banco
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });

  }
}
