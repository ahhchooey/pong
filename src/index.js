import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;

let canvas = document.getElementById("gameField");
let context = canvas.getContext('2d');



//clearRect clears everything from the screen if
//context.clearRect(0, 0, 800, 600)

//fillStyle can add color to the context
//context.fillStyle = "#f00"

//fillRect creates a rectangle, x, y, width, height
//context.fillRect(50, 50, 50, 100);

let paddleOne = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "left");
let paddleTwo = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "right");

paddleOne.render(context);
paddleTwo.render(context);
new InputHandler(paddleOne, paddleTwo);

let timeStart = 0;

function frame(timeStamp) {
  
  let timeDelta = timeStamp - timeStart;//gives the time between start and current move
  timeStart = timeStamp;

  context.clearRect(0, 0, 800, 600);

  paddleOne.move(timeDelta);
  paddleTwo.move(timeDelta);
  paddleOne.render(context);
  paddleTwo.render(context);

  window.requestAnimationFrame(frame);//when the next frame is ready, call frame
  //and pass it a timestamp
  //requestAnimcationFrame usually runs at about 60 times a second (according to mdn)
  //but it will generally match the refresh rate of most browsers, which is 60hz
  //to reiterate, rAF calls frame and gives it a timestamp, that can be used
}

frame();
