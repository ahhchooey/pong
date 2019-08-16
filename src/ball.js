export default class Ball {

  constructor(fieldWidth, fieldHeight, paddleOne, paddleTwo) {
    this.possibleDirs = [35, -35];
    this.fieldHeight = fieldHeight;
    this.fieldWidth = fieldWidth;
    this.paddleOne = paddleOne;
    this.paddleTwo = paddleTwo;
    this.radius = fieldWidth / 80;
    this.diameter = this.radius*2;
    this.speedy = this.possibleDirs[Math.floor(Math.random() * this.possibleDirs.length)];
    this.speedx = this.possibleDirs[Math.floor(Math.random() * this.possibleDirs.length)];
    this.position = {
      x: fieldWidth / 2,
      y: fieldHeight / 2
    };
  }

  render(context) {
    context.fillStyle = "#ddd";
    context.beginPath();
    //arc takes in x, y position, radius, startAngle, endAngle, in that order
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
    context.fill();
  }

  bounceVertical() {
    this.speedy = -this.speedy * 1.10;
  }

  bounceHoriztontal() {
    this.speedx = -this.speedx * 1.10;
  }

  score(playerOneScore, playerTwoScore) {
    if (this.position + this.diameter < 0) {playerTwoScore++};
    if (this.position + this.diameter > fieldWidth) {playerOneScore++}
  }

  resetBall() {
    this.position = {
      x: this.fieldWidth / 2,
      y: this.fieldHeight / 2
    }
    this.speedy = this.possibleDirs[Math.floor(Math.random() * this.possibleDirs.length)];
    this.speedx = this.possibleDirs[Math.floor(Math.random() * this.possibleDirs.length)];
  }

  move(timeDelta, playerOneScore, playerTwoScore) {
    this.position.x += this.speedx / timeDelta;
    this.position.y += this.speedy / timeDelta;

    if (this.position.y - this.radius < 0 || this.position.y + this.radius > this.fieldHeight) {
      this.bounceVertical()}

    let paddleOneRight = this.paddleOne.position.x + this.paddleOne.width;
    let paddleOneTop = this.paddleOne.position.y;
    let paddleOneBottom = this.paddleOne.position.y + this.paddleOne.height;
    let paddleTwoLeft = this.paddleTwo.position.x;
    let paddleTwoTop = this.paddleTwo.position.y;
    let paddleTwoBottom = this.paddleTwo.position.y + this.paddleTwo.height;

    if (this.position.x > paddleTwoLeft &&
      this.position.y < paddleTwoBottom &&
      this.position.y > paddleTwoTop) {
      this.bounceHoriztontal()
    };

    if (this.position.x < paddleOneRight &&
      this.position.y < paddleOneBottom &&
      this.position.y > paddleOneTop) {
      this.bounceHoriztontal()
    };

    if (this.position.x < 0) {
      playerTwoScore++;
      this.resetBall();
    };

    if (this.position.x > this.fieldWidth) {
      playerOneScore++;
      this.resetBall();
    };
  }
}
