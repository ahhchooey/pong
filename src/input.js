
export default class InputHandler {

  constructor(paddleOne, paddleTwo) {
    document.addEventListener("keydown", (event) => {
      //alert(event.keyCode);//we can use this to see the keycodes for keydown
      //keydown.keycodes = {q: 81, a: 65, arrow_up: 38, arrow_down: 40}
      switch(event.keyCode) {
        case 81:
          //alert("paddle one move up");
          paddleOne.moveUp();
          break;
        case 65:
          //alert("paddle one move down");
          paddleOne.moveDown();
          break;
        case 38:
          //alert("paddle two move up");
          paddleTwo.moveUp();
          break;
        case 40:
          //alert("paddle two move down");
          paddleTwo.moveDown();
          break;
      }
    });

  document.addEventListener("keyup", (event) => {
    switch(event.keyCode) {
      case 81:
        if (paddleOne.speed < 0) { paddleOne.stop() };
        break;
      case 65:
        if (paddleOne.speed > 0) { paddleOne.stop() };
        break;
      case 38:
        if (paddleTwo.speed < 0) { paddleTwo.stop() };
        break;
      case 40:
        if (paddleTwo.speed > 0) { paddleTwo.stop() };
        break;
      }
    });
  }

}
