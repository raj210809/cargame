const car = document.getElementById("car");
const backgmusic = document.getElementById("backmusic");
const road = document.getElementById("road");
const scoredisplay = document.getElementById("new");
const bestscoredisplay = document.getElementById("prev");
const startbutton = document.getElementById("start");
const kickmusic = document.getElementById("kickmusic");

let isgamerunning = false;
let isgamerestarted = false;
let totaltranslation = 0;
let score = 0;
let bestscore = localStorage.getItem("bestscore") || 0;
let obstacleSpeed = 3;

let gameinterval1;
let gameinterval2;
let scoreupdateinterval;

function startGame() {
  if (isgamerestarted) {
    score = 0;
    isgamerestarted = false;
  }

  isgamerunning = true;
  kickmusic.pause();
  kickmusic.currentTime = 0;
  backgmusic.play();
  startbutton.textContent = "Use A and D or arrow keys to move";
  document.addEventListener("keydown", handlekeypress);
  if (!scoreupdateinterval) {
    scoreupdateinterval = setInterval(updateGame, 50);
  }
  gameinterval1 = setInterval(() => createrandobst(laneSelection()), 1800);
  gameinterval2 = setInterval(() => createrandobst(laneSelection()), 2300);
}

function handlekeypress(e) {
  if (!isgamerunning) return;
  if (e.key === "d" || e.key === "D") movecar(5);
  if (e.key === "a" || e.key === "A") movecar(-5);
}

function movecar(amount) {
  totaltranslation += amount;

  if (totaltranslation > 5) totaltranslation = 5;
  if (totaltranslation < -5) totaltranslation = -5;
  car.style.transform = `translateX(${totaltranslation}rem)`;
}

function updateGame() {
  score += 0.1;
  scoredisplay.innerText = `Score: ${score.toFixed(2)}`;
  collision();
}

function createrandobst(lane) {
  const objectids = [
    "obstacle1",
    "obstacle2",
    "obstacle3",
    "obstacle4",
    "obstacle5",
  ];
  let objectid = objectids[Math.floor(Math.random() * 5)];
  const obstacle = document.createElement("div");
  obstacle.id = objectid;
  obstacle.className = "obstacle";
  obstacle.style.transition = `top ${obstacleSpeed}s linear`;
  obstacle.style.marginLeft = `${(lane - 1) * 5 + 1}rem`;
  road.appendChild(obstacle);
  obstacle.classList.add("obstacle-animation0");
  if (score > 20) {
    obstacle.classList.remove("obstacle-animation0");
    obstacle.classList.add("obstacle-animation1");
  }
  if (score > 40) {
    obstacle.classList.remove("obstacle-animation1");
    obstacle.classList.add("obstacle-animation2");
  }
  if (score > 60) {
    obstacle.classList.remove("obstacle-animation2");
    obstacle.classList.add("obstacle-animation3");
  }
  if (score > 80) {
    obstacle.classList.remove("obstacle-animation3");
    obstacle.classList.add("obstacle-animation4");
  }
  if (score > 100) {
    obstacle.classList.remove("obstacle-animation4");
    obstacle.classList.add("obstacle-animation5");
  }
  if (score > 120) {
    obstacle.classList.remove("obstacle-animation5");
    obstacle.classList.add("obstacle-animation6");
  }
  if (score > 140) {
    obstacle.classList.remove("obstacle-animation6");
    obstacle.classList.add("obstacle-animation7");
  }
  if (score > 160) {
    obstacle.classList.remove("obstacle-animation7");
    obstacle.classList.add("obstacle-animation8");
  }
  if (score > 180) {
    obstacle.classList.remove("obstacle-animation8");
    obstacle.classList.add("obstacle-animation9");
  }
}

function collision() {
  const carRect = car.getBoundingClientRect();
  const obstacles = document.getElementsByClassName("obstacle");

  for (const obstacle of obstacles) {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (colliding(carRect, obstacleRect)) {
      gameOver();
      return;
    }
  }
}

function colliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function laneSelection() {
  return Math.floor(Math.random() * 3) + 1;
}

function gameOver() {
  isgamerunning = false;
  backgmusic.pause();
  kickmusic.play();
  backgmusic.currentTime = 0;
  startbutton.textContent = "Press Enter to Restart";
  isgamerestarted = true;

  clearInterval(gameinterval1);
  clearInterval(gameinterval2);
  clearInterval(scoreupdateinterval);
  scoreupdateinterval = null;
  if (score > bestscore) {
    bestscore = score;
    localStorage.setItem("bestscore", bestscore);
    bestscoredisplay.innerText = `Best Score: ${bestscore.toFixed(2)}`;
  }
  totaltranslation = 0;
  car.style.transform = `translateX(${totaltranslation}rem)`;
  document.removeEventListener("keydown", handlekeypress);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!isgamerunning) {
      startGame();
    }
  }
});
startbutton.textContent = "Press Enter to Start";
setTimeout(() => {
  const patthar = document.getElementsByClassName("obstacle");
  patthar.classList.remove("obstacle-animation0");
  patthar.classList.add("obstacle-animation5");
}, 6000);
