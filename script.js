let isavail = true;
let totalTranslation = 0;

document.getElementById("btncont").addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    if (isavail === true) {
      isavail = false;
      console.log("i been clicked");
      document.getElementById("start").textContent =
        "Use A and D or arrow keys to move";
    }
  }
});

let car = document.getElementById("car");
car.setAttribute("tabindex", "0");

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
