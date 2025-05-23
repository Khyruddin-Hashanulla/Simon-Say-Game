let gameSeq = [];
let userSeq = [];
let btns = ["pink", "orange", "green", "purple"];

let started = false;
let level = 0;

const h2 = document.getElementById("statusText");
const startBtn = document.getElementById("startBtn");

// Start the game
startBtn.addEventListener("click", function () {
  if (!started) {
    started = true;
    startBtn.style.display = "none";
    levelUp();
  }
});

// Flash functions
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 300);
}

// Level up
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

// Button click
function btnPress() {
  let btn = this;
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  userFlash(btn);
  checkUserInput(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

// Check input
function checkUserInput(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score is <strong>${level}</strong><br>Press "Start Game" to try again.`;
    document.querySelector("body").style.backgroundColor="red";
       setTimeout(function(){
         document.querySelector("body").style.backgroundColor="white";
       },150);
    resetGame();
  }
}

// Reset
function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startBtn.style.display = "inline-block";
}