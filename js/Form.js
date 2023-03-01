//classe formulário 
class Form {
  //método de contrução da página
  constructor() {
    //entrada para o nome do jogador
    this.input = createInput("").attribute("placeholder", "Digite Seu Nome");
    //botão
    this.playButton = createButton("Jogar");
    //título da página
    this.titleImg = createImg("./assets/TITULO.png", "game title");
    //mensagem ao jogador
    this.greeting = createElement("h2");
  }

  //método de posição de elementos na tela 
  setElementsPosition() {
    //título
    this.titleImg.position(120, 50);
    //entrada de nome
    this.input.position(width / 2 - 110, height / 2 - 80);
    //botão
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    //mensagem
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  //método de estilo dos elementos da página
  setElementsStyle() {
    //título
    this.titleImg.class("gameTitle");
    //entrada de nome
    this.input.class("customInput");
    //botão
    this.playButton.class("customButton");
    //mensagem
    this.greeting.class("greeting");
  }


  //método para desapacerer  os elementos da página
  hide() {
    //mensagem
    this.greeting.hide();
    //botão
    this.playButton.hide();
    //entrada de nome
    this.input.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Olá ${this.input.value()}
      </br>espere o outro jogador entrar...`;
      this.greeting.html(message);
      playerCount += 1;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      //ativar o código que chama a função "getDistance" para executá-la
      player.getDistance();
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
