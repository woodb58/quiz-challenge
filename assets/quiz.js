// time and score
var timeEl = document.querySelector("p.time");
var secondsLeft = 45;
var scoreEl = document.querySelector("#score");

const introEl = document.querySelector("#intro");

//question section
const questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var questionCount = 0;
const checkAnsEl = document.querySelector("#checkAns");
const finalEl = document.querySelector("#final");
var initialsInput = document.querySelector("#initials");

// section highscores
const highscoresEl = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");

// array of scores
var scoreList = [];

// buttons
const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn");
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");
const submitScrBtn = document.querySelector("#submit-score");
const restartBtn = document.querySelector("#restart");
const clearScrBtn = document.querySelector("#clearscores");
const viewScrBtn = document.querySelector("#view-scores");

// Object for questions
const questions = [
  {
    // question 0
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commma", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: "2",
  },
  {
    // question 1
    question:
      "The condition in an if / else statement is enclosed within ____.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correctAnswer: "1",
  },
  {
    // question 2
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. Javascript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "3",
  },
  {
    // question 3
    question: "Commonly used data types do NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "2",
  },
  {
    // question 4
    question: "Arrays in Javascript can be used to store ____.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "3",
  },
];

// timer
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `Time:${secondsLeft}s`;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      questionsEl.style.display = "none";
      finalEl.style.display = "block";
      scoreEl.textContent = secondsLeft;
    }
  }, 1000);
}

// start quiz
function startQuiz() {
  introEl.style.display = "none";
  questionsEl.style.display = "block";
  questionCount = 0;

  setTime();
  setQuestion(questionCount);
}

// function to set question
function setQuestion(id) {
  if (id < questions.length) {
    questionEl.textContent = questions[id].question;
    ans1Btn.textContent = questions[id].answers[0];
    ans2Btn.textContent = questions[id].answers[1];
    ans3Btn.textContent = questions[id].answers[2];
    ans4Btn.textContent = questions[id].answers[3];
  }
}

function checkAnswer(event) {
  event.preventDefault();

  // show section for checkAns and append message
  checkAnsEl.style.display = "block";
  var p = document.createElement("p");
  checkAnsEl.appendChild(p);

  // time out after 1 second
  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  // answer checker
  if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "Wrong!";
  }

  if (questionCount < questions.length) {
    questionCount++;
  }

  setQuestion(questionCount);
}

function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  var init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  // sort scores
  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
    scoreListEl.append(li);
  }

  // Local storage
  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  // Get stored scores from localStorage
  var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  // If scores were retrieved from localStorage, update the scorelist array to it
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

// clear scores
function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML = "";
}

startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

restartBtn.addEventListener("click", function () {
  highscoresEl.style.display = "none";
  introEl.style.display = "block";
  secondsLeft = 75;
  timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear scores
clearScrBtn.addEventListener("click", clearScores);

// High scores
viewScrBtn.addEventListener("click", function () {
  if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
  } else if (highscoresEl.style.display === "block") {
    highscoresEl.style.display = "none";
  } else {
    return alert("No scores to show.");
  }
});
