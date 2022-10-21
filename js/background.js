const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Background {
    constructor(image) {
      this.x = 0;
      this.y = 0;
      this.image = new Image();
      this.image.src = image;
    }
  
    draw() {
      ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
      ctx.drawImage(
        this.image,
        this.x,
        this.y - canvas.height,
        canvas.width,
        canvas.height
      );
    }
  
    move() {
      this.y += 3;
      this.y %= canvas.height;
    }
  }
  export default Background;