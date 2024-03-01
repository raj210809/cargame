let isavail = true;
let totalTranslation = 0;
let gameinterval1;
let gameinterval2;
let scorecheck;
let score = 0;
let bestscore = 0;

let car = document.getElementById("car");
car.setAttribute("tabindex", "0");

document.getElementById("btncont").addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    if (isavail === true) {
      isavail = false;
      document.getElementById("start").textContent =
        "Use A and D or arrow keys to move";
      car.addEventListener("keydown", function (e) {
        e.preventDefault();
        if (isavail === false) {
          if (e.key === "d" || e.key === "D") {
            totalTranslation += 5;
            if (totalTranslation <= 5) {
              console.log("Moving to the right:", totalTranslation);
              car.style.transform = `translateX(${totalTranslation}rem)`;
            }
            if (totalTranslation > 5) {
              totalTranslation = 5;
            }
          }
          if (e.key === "a" || e.key === "A") {
            totalTranslation -= 5;
            if (totalTranslation >= -5) {
              console.log("Moving to the left:", totalTranslation);
              car.style.transform = `translateX(${totalTranslation}rem)`;
            }
            if (totalTranslation < -5) {
              totalTranslation = -5;
            }
          }
        }
      });
      gameinterval1 = setInterval(() => {
        creatingrandomobst(laneselection);
      }, 1800);

      gameinterval2 = setInterval(() => {
        creatingrandomobst(laneselection);
      }, 2300);

      scorecheck = setInterval(() => {
        score += 0.004;
        document.getElementById("new").innerText = `Score : ${score}`;
        checkCollision();
      }, 10);
    }
  }
});

function laneselection() {
  const lanes = [1, 2, 3];
  let selectedlane = lanes[Math.floor(Math.random() * lanes.length)];
  return selectedlane;
}

function creatingrandomobst(hey) {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.id = "obstacle" + Date.now();
  let lane = hey();
  if (lane === 1) {
    obstacle.style.marginLeft = "1rem";
    document.getElementById("road").appendChild(obstacle);
    obstacle.classList.add("obstacle-animation0");
  }
  if (lane === 2) {
    obstacle.style.marginLeft = "1rem";
    document.getElementById("horiz2").appendChild(obstacle);
    obstacle.classList.add("obstacle-animation0");
  }
  if (lane === 3) {
    obstacle.style.marginLeft = "11rem";
    document.getElementById("road").appendChild(obstacle);
    obstacle.classList.add("obstacle-animation0");
  }
}

function checkCollision() {
  const carRect = car.getBoundingClientRect();
  const obstacles = document.getElementsByClassName("obstacle");

  for (const obstacle of obstacles) {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      carRect.x < obstacleRect.x + obstacleRect.width &&
      carRect.x + carRect.width > obstacleRect.x &&
      carRect.y < obstacleRect.y + obstacleRect.height &&
      carRect.y + carRect.height > obstacleRect.y
    ) {
      gameOver();
      return;
    }
  }
}

function gameOver() {
  isavail = true;
  document.getElementById("start").textContent = "Press Enter to Restart";
  clearInterval(gameinterval1);
  clearInterval(gameinterval2);
  clearInterval(scorecheck);
  if (score > bestscore) {
    bestscore = score;
    document.getElementById("prev").innerText = `Best score : ${bestscore}`;
  }
  alert("game over");
  score = 0;
  car.setAttribute("tabindex", "0");
}
for (i = 1; i <= 10; i++) {
  return setTimeout(() => {
    car.classList.remove(`obstacle-animation${i - 1}`);
    car.classList.add(`obstacle-animation${1}`);
  }, 60000 * i);
}

// const obstacle = document.createElement("div");
// obstacle.className = "obstacle";

// obstacle.style.top = "0";
// obstacle.style.marginLeft = "1rem";
// document.getElementById("road").appendChild(obstacle);
// obstacle.classList.add("obstacle-animation");

// const obstacle2 = document.createElement("div");
// obstacle2.className = "obstacle";
// obstacle2.style.top = "0";
// obstacle2.style.marginLeft = "1rem";

// document.getElementById("horiz2").appendChild(obstacle2);
// obstacle2.classList.add("obstacle-animation");

// const obstacle3 = document.createElement("div");
// obstacle3.className = "obstacle";
// obstacle3.style.top = "0";
// obstacle3.style.marginLeft = "11rem";

// document.getElementById("road").appendChild(obstacle3);
// obstacle3.classList.add("obstacle-animation");
