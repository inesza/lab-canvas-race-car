const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Car {
  constructor(image, x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.speedX = 0;
    this.outSide = null;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speedX;
  }

  outOfBounds() {
    if (this.x + this.width > canvas.width - this.width) {
      this.speedX = 0;
      this.outSide = "right";
    } else if (this.x - this.width < 0) {
      this.speedX = 0;
      this.outSide = "left";
    }
    return this.outSide;
  }

  // Crash check
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}
export default Car;
