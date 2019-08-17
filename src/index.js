import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;

let startMenu = document.querySelector(".startMenu");
let pauseMenu = document.querySelector(".pauseMenu");
let replayMenu = document.querySelector(".replayMenu");
let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
let replayButton = document.getElementById("replayButton");

let canvas = document.getElementById("gameField");
let context = canvas.getContext('2d');
let scoreOne_div = document.getElementById("scoreOne");
let scoreTwo_div = document.getElementById("scoreTwo");
let winnerText = document.getElementById("winnerText");

let paddleOne = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "left");
let paddleTwo = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "right");
let ball = new Ball(FIELD_WIDTH, FIELD_HEIGHT, paddleOne, paddleTwo);
let input = new InputHandler(paddleOne, paddleTwo);

paddleOne.render(context);
paddleTwo.render(context);
ball.render(context);

let timeStart = 0;

var playId;

function frame(timeStamp) {
  playId = undefined;
  
  let timeDelta = timeStamp - timeStart;//gives the time between start and current move
  timeStart = timeStamp;

  context.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

  ball.move(timeDelta);
  paddleOne.move(timeDelta);
  paddleTwo.move(timeDelta);
  ball.render(context);
  paddleOne.render(context);
  paddleTwo.render(context);

  scoreOne_div.innerHTML = ball.playerOneScore;
  scoreTwo_div.innerHTML = ball.playerTwoScore;
  if (isGameOver()) {
    return;
  }

  game();
  //window.requestAnimationFrame(frame);//when the next frame is ready, call frame
  //and pass it a timestamp
  //requestAnimationFrame usually runs at about 60 times a second (according to mdn)
  //but it will generally match the refresh rate of most browsers, which is 60hz
  //to reiterate, rAF calls frame and gives it a timestamp, that can be used
}

function game() {
  if (!playId) {
    playId = window.requestAnimationFrame(frame);
    startMenu.style.setProperty("display", "none");
    pauseMenu.style.setProperty("display", "none");
  }
}

function pause() {
  if (playId) {
    window.cancelAnimationFrame(playId);
    playId = undefined;
    pauseMenu.style.setProperty("display", "block");
  }
}

function reset() {
  paddleOne = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "left");
  paddleTwo = new Paddle(FIELD_WIDTH, FIELD_HEIGHT, "right");
  ball = new Ball(FIELD_WIDTH, FIELD_HEIGHT, paddleOne, paddleTwo);
  input = new InputHandler(paddleOne, paddleTwo);

  scoreOne_div.innerHTML = ball.playerOneScore;
  scoreTwo_div.innerHTML = ball.playerTwoScore;

  context.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
  paddleOne.render(context);
  paddleTwo.render(context);
  ball.render(context);

  playId = undefined;
  timeStart = 0;

  pauseMenu.style.setProperty("display", "none");
  startMenu.style.setProperty("display", "block");
  replayMenu.style.setProperty("display", "none");
}

function isGameOver() {
  if (ball.playerOneScore >= 10 || ball.playerTwoScore >= 10) {
    input = null;
    (ball.playerOneScore > ball.playerTwoScore)
      ? winnerText.innerHTML = "Player 1 WINS!!!"
      : winnerText.innerHTML = "Player 2 WINS!!!";
    replayMenu.style.setProperty("display", "block");
    return true;
  } else {
    return false;
  }
}

startButton.addEventListener("click", game);
document.addEventListener("keydown", (event) => {
  switch(event.keyCode) {
    case 27:
      (playId) ? pause() : game();
      break;
  }
});
resetButton.addEventListener("click", reset);
replayButton.addEventListener("click", reset);

