import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;

let canvas = document.getElementById("gameField");
let context = canvas.getContext('2d');
let scoreOne_div = document.getElementById("scoreOne");
let scoreTwo_div = document.getElementById("scoreTwo");

let playerOneScore = 0;
let playerTwoScore = 0;

//clearRect clears everything from the screen if
//context.clearRect(0, 0, 800, 600)

//fillStyle can add color to the context
//context.fillStyle = "#f00"

//fillRect creates a rectangle, x, y, width, height
//context.fillRect(50, 50, 50, 100);

let paddleOne = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "left");
let paddleTwo = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "right");
let ball = new Ball(FIELD_WIDTH, FIELD_HEIGHT, paddleOne, paddleTwo);

paddleOne.render(context);
paddleTwo.render(context);
ball.render(context);
new InputHandler(paddleOne, paddleTwo);

let timeStart = 0;

function frame(timeStamp) {
  
  let timeDelta = timeStamp - timeStart;//gives the time between start and current move
  timeStart = timeStamp;

  context.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

  ball.move(timeDelta, playerOneScore, playerTwoScore);
  paddleOne.move(timeDelta);
  paddleTwo.move(timeDelta);
  ball.render(context);
  paddleOne.render(context);
  paddleTwo.render(context);

  scoreOne_div.innerHTML = playerOneScore;
  scoreTwo_div.innerHTML = playerTwoScore;

  window.requestAnimationFrame(frame);//when the next frame is ready, call frame
  //and pass it a timestamp
  //requestAnimcationFrame usually runs at about 60 times a second (according to mdn)
  //but it will generally match the refresh rate of most browsers, which is 60hz
  //to reiterate, rAF calls frame and gives it a timestamp, that can be used
}

window.requestAnimationFrame(frame);
