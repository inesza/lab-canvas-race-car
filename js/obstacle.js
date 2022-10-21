const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Obstacle {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.color = "#870007";
    this.x = x;
    this.y = y;
  }

  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
}

export default Obstacle;
