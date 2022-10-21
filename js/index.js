import Car from "./car.js";
import Background from "./background.js";
import Obstacle from "./obstacle.js";

const canvas = document.getElementById("canvas");
let frames = null;
const ctx = canvas.getContext("2d");

const backgroundImage = new Background("./images/road.png");
const car = new Car("./images/car.png", canvas.width / 2 - 26, canvas.height - 120, 52, 106);
const obstacles = [];
let score = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  backgroundImage.draw();
  backgroundImage.move();

  car.draw();
  car.move();
  car.outOfBounds();

  updateObstacles();
  updateScore();
  frames = requestAnimationFrame(animate);
  gameOver();
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    animate();
  }
};

// Move left and right on keydown
document.addEventListener("keydown", (e) => {
  if (car.outSide === "left") {
    // only move right
    if (e.key === "ArrowRight") {
      car.speedX = 2;
      car.outSide = null;
    }
  } else if (car.outSide === "right") {
    // only move left
    if (e.key === "ArrowLeft") {
      car.speedX = -2;
      car.outSide = null;
    }
  } else {
    // move left and right
    switch (e.key) {
      case "ArrowLeft": // left arrow
        car.speedX = -2;
        break;
      case "ArrowRight": // right arrow
        car.speedX = 2;
        break;
    }
  }
});

// Stop moving on keyup
document.addEventListener("keyup", (e) => {
  car.speedX = 0;
});

function updateObstacles() {
  frames++;
  if (frames % 150 === 0) {
    // Randomly generate random width for obstacle
    let y = canvas.height;
    let width = Math.floor(Math.random() * (330 - 70 + 1) + 70);

    // Randomly place obstacle on left or  right side
    let positionX;
    (Math.random() < 0.5) ? positionX = 0 : positionX = canvas.width - width;

    // Create obstacle
    obstacles.push(new Obstacle(positionX, 0, width, 20));
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 2;
    obstacles[i].update();
    // Remove older obstacles to avoid crowding obstacles arrow
    if (obstacles.length > 10) {
      obstacles.shift();
    }
  }
}

// Game Over
function gameOver() {
  // Check for collisions
  const crashed = obstacles.some(function (obstacle) {
    return car.crashWith(obstacle);
  });
  if (crashed) {
    cancelAnimationFrame(frames);

    // Display final score box with restart button
    let finalScoreBox = document.getElementById("template").content.cloneNode(true);
    document.getElementById("game-board").append(finalScoreBox);
    document.getElementById("final-score").innerHTML = `${score} points`;
    document.getElementById("replay").addEventListener("click", replay);
  }
}

function replay() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score = 0;
  while (obstacles.length > 0) {
    obstacles.pop();
  }
  let gameOverBox = document.getElementById("game-over");
  gameOverBox.remove();

  updateScore();
  frames = 0;
  
  animate();
}

function updateScore() {
  let scoreBox = document.getElementById("score");
  scoreBox.innerHTML = score;
  if (frames % 60 === 0 && frames != 0 && frames > 300) {
    score++;   
  }
}
