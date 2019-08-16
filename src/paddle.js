
export default class Paddle {
  
  constructor(fieldWidth, fieldHeight, paddleSide) {
    this.height = fieldHeight / 6;
    this.width = fieldWidth / 50;
    this.fieldHeight = fieldHeight;
    this.position = {
      x: (paddleSide == "left") ? (this.width - 10) : (fieldWidth - this.width - 5),
      y: (fieldHeight / 2) - (this.height / 2)
    };
    this.speed = 0;
    this.maxSpeed = 125;
  }

  render(context) {
    context.fillStyle = "#ddd"
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveUp() {
    this.speed = -this.maxSpeed;
  }

  moveDown() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  move(timeDelta) {
    //this.position.y+=5/timeDelta;//currently this means 5px move for how much time has passed
    this.position.y += this.speed / timeDelta;
    if (this.position.y < 0) {this.position.y = 0};//these two make bounds for the paddle
    if (this.position.y > (this.fieldHeight - this.height)) {
      this.position.y = (this.fieldHeight - this.height)
    }
  }

}
