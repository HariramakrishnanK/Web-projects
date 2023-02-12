'use strict'

const gameStatus = document.querySelector(".game-status");
const againBtn = document.querySelector('.again-btn');
const checkBtn = document.querySelector('.check-btn');
const revealAnswer = document.querySelector('.answer');
const userGuess = document.getElementById('gussedNumber');
const highScoreAttr = document.querySelector("[data-highScore]");
const scoreAttr = document.querySelector("[data-score]");
const container = document.querySelector(".container");
const userGuesses = [];

const updateScore = (score) => scoreAttr.setAttribute('data-score', score);
const updateHighScore = (highScore) => highScoreAttr.setAttribute('data-HighScore', highScore);
const randomNumber = () => Math.floor((Math.random() * 20) + 1);

let highScore = 0;
let score = 20;
let actualNumber = randomNumber();
let isFirstCharacterZero = false;

userGuess.addEventListener("keypress", function (event) {
  const value = event.target.value + event.key

  if ((!value.match(/^[1-9][0-9]{0,1}$/))  || (Number(value) > 20)) {
    event.preventDefault();
  }

  if (event.key === "Enter" && !userGuess.readOnly) checkWinner();
});

userGuess.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.ctrlKey) {
    replay();
    e.preventDefault();
  }
});


function replay() {
  userGuess.readOnly = false;
  gameStatus.textContent = "Start guessing...";
  score = 20;
  updateScore(score);
  userGuesses.length = 0;
  revealAnswer.textContent = "?";
  actualNumber = randomNumber()
  userGuess.value = "";
  container.style.backgroundColor = '#333';
  container.style.color = '#ccc';
  container.style.outlineColor = "#ccc";
}

function needHighScoreUpdate(){
  if (highScore < score){
    highScore = score;
    updateHighScore(highScore);
  }
}

const checkWinner = (guessNumber = userGuess.value) => {
  if (!guessNumber) {
    gameStatus.textContent = "No Number!"
    return
  }
  if (userGuesses.includes(guessNumber)) {
    alert(`${guessNumber} was already guessed! 
Please try with another number :)`);
    return;
  }
  userGuesses.push(guessNumber)
  
  if (actualNumber == guessNumber){
    revealAnswer.textContent = guessNumber;
    gameStatus.textContent = "🏆 You won!!";
    userGuess.readOnly = true;
    needHighScoreUpdate();
    container.style.backgroundColor = 'limegreen';
    container.style.color = 'white';
    container.style.outlineColor = "black";

    return
  }
  updateScore(--score);
  (guessNumber < actualNumber) ? gameStatus.textContent = "Guess Higher..." : gameStatus.textContent = "Guess Lower...";
};

