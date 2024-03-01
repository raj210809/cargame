const car = document.getElementById("car");
const backgmusic = document.getElementById("backmusic");
const road = document.getElementById("road");
const scoreDisplay = document.getElementById("new");
const bestScoreDisplay = document.getElementById("prev");
const startButton = document.getElementById("start");
const kickmusic = document.getElementById("kickmusic");

let isGameRunning = false;
let isGameRestarted = false;
let totalTranslation = 0;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let obstacleSpeed = 3;

let gameInterval1;
let gameInterval2;
let scoreUpdateInterval;

function startGame() {
  if (isGameRestarted) {
    score = 0;
    isGameRestarted = false;
  }

  isGameRunning = true;
  kickmusic.pause();
  kickmusic.currentTime = 0;
  backgmusic.play();
  startButton.textContent = "Use A and D or arrow keys to move";
  document.addEventListener("keydown", handleKeyPress);

  // Set the score update interval only if it's not set
  if (!scoreUpdateInterval) {
    scoreUpdateInterval = setInterval(updateGame, 50);
  }

  // Set intervals for creating obstacles
  gameInterval1 = setInterval(
    () => createRandomObstacle(laneSelection()),
    getRandomInterval()
  );
  gameInterval2 = setInterval(
    () => createRandomObstacle(laneSelection()),
    getRandomInterval()
  );
}

function handleKeyPress(e) {
  if (!isGameRunning) return;
  if (e.key === "d" || e.key === "D") moveCar(5);
  if (e.key === "a" || e.key === "A") moveCar(-5);
}

function moveCar(amount) {
  totalTranslation += amount;
  if (totalTranslation > 5) totalTranslation = 5;
  if (totalTranslation < -5) totalTranslation = -5;
  car.style.transform = `translateX(${totalTranslation}rem)`;
}

function updateGame() {
  score += 0.1;
  scoreDisplay.innerText = `Score: ${score.toFixed(2)}`;
  checkCollision();
}

function createRandomObstacle(lane) {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.style.transition = `top ${obstacleSpeed}s linear`;
  obstacle.style.marginLeft = `${(lane - 1) * 5 + 1}rem`;
  road.appendChild(obstacle);

  obstacle.classList.add("obstacle-animation0");
}

function checkCollision() {
  const carRect = car.getBoundingClientRect();
  const obstacles = document.getElementsByClassName("obstacle");

  for (const obstacle of obstacles) {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (isColliding(carRect, obstacleRect)) {
      gameOver();
      return;
    }
  }
}

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function getRandomInterval() {
  return Math.random() * 1000 + 1800;
}

function laneSelection() {
  return Math.floor(Math.random() * 3) + 1;
}

function gameOver() {
  isGameRunning = false;
  backgmusic.pause();
  kickmusic.play();
  backgmusic.currentTime = 0;
  startButton.textContent = "Press Enter to Restart";
  isGameRestarted = true;

  // Clear all intervals
  clearInterval(gameInterval1);
  clearInterval(gameInterval2);
  clearInterval(scoreUpdateInterval);
  scoreUpdateInterval = null; // Reset the score update interval
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    bestScoreDisplay.innerText = `Best Score: ${bestScore.toFixed(2)}`;
  }
  totalTranslation = 0;
  car.style.transform = `translateX(${totalTranslation}rem)`;
  document.removeEventListener("keydown", handleKeyPress);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!isGameRunning) {
      startGame();
    }
  }
});

// Initial setup
startButton.textContent = "Press Enter to Start";
