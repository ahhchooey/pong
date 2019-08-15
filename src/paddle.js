
export default class Paddle {
  
  constructor(fieldWidth, fieldHeight, paddleSide) {
    this.height = 100;
    this.width = 20;
    this.fieldHeight = fieldHeight;
    this.position = {
      x: (paddleSide == "left") ? (this.width - 10) : (fieldWidth - this.width - 10),
      y: (fieldHeight / 2) - (this.height / 2)
    };
    this.speed = 0;
    this.maxSpeed = 10;
  }

  sideFinder(side) {
    return ( side == "left" ) ? (fieldWidth - this.width - 10) : (this.width + 10);
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
    if (!timeDelta) { return };//this prevents division by zero
    //when timeDelta is zero (first frame)
    //this.position.y+=5/timeDelta;//currently this means 5px move for how much time has passed
    this.position.y += this.speed;
    if (this.position.y < 0) {this.position.y = 0};//these two make bounds for the paddle
    if (this.position.y > (this.fieldHeight - this.height)) {
      this.position.y = (this.fieldHeight - this.height)
    }
  }

}
