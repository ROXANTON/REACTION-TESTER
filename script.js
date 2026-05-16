let state = "idle";
let startTime = 0;

const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const green = document.getElementById("green");

const startBtn = document.getElementById("startBtn");
const spaceBtn = document.getElementById("spaceBtn");

const result = document.getElementById("result");
const message = document.getElementById("message");

/* Reset lights */
function resetLights() {
  red.className = "light";
  yellow.className = "light";
  green.className = "light";
}

/* Delay */
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

/* Start */
async function startTest() {
  state = "running";
  message.textContent = "Wait for green...";

  resetLights();

  red.classList.add("red-on");
  await delay(Math.random() * 1000 + 500);

  resetLights();
  yellow.classList.add("yellow-on");
  await delay(Math.random() * 1000 + 500);

  resetLights();
  green.classList.add("green-on");

 
  startTime = Date.now();
  state = "ready";

  message.textContent = "CLICK NOW!";
}

/* Reaction */
function react() {
  if (state === "ready") {
    const time = Date.now() - startTime;
    result.textContent = time + " ms";
    state = "done";
  }
}

/* Start click */
startBtn.addEventListener("click", () => {
  startBtn.blur(); // ✅ remove focus (important fix)
  startTest();
});

/* Space button click */
spaceBtn.addEventListener("click", react);

/* SPACEBAR FIX ✅ */
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();  // ✅ stops button triggering loop
    react();
  }
});
