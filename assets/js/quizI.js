// Consants and important declarations
const QuizTimer = document.getElementById("QuizTimer");
const QuizScore = document.getElementById("QuizScore");
const QuizHeader = document.getElementById("QuizHeader");
const QuizContent = document.getElementById("QuizContent");
const AnswerA = document.getElementById("AnswerA");
const AnswerB = document.getElementById("AnswerB");
const AnswerC = document.getElementById("AnswerC");
const AnswerD = document.getElementById("AnswerD");
const IncorrectAnswer = document.querySelectorAll("#ButtonA, #ButtonC, #ButtonD");
const CorrectAnswer = document.getElementById("ButtonB");
const Highscores = document.getElementById("Highscores");
const HighscoreResetButton = document.getElementById("HighscoreResetButton");
// Saved Const for Rendered Highscores from local storage.
let HighscoresList = [];
// In seconds. Allowed time for the user to complete the quiz.
let QuizLength = 179;
// To prank our user, 2/B will be right all the time. Thus we are not going to check whether they answered the question correctly, just if they hit the right button.
// let CorrectAnswers = [2, 2, 2, 2, 2];
// This keeps track of which question the user is on; Starts at -1 then jumps to 0 for the first question.
let CurrentQuestion = -1;
// Our friendly neighboorhood timer.
let CurrentTime = 0;
// This tracks the user score.
let UserScore = 0;
// All question data, including possible answers, is kept here:
let Questions = [
    {
        question: '1: "JS" is the short designation for this coding language:',
        answerA: "Just Simple",
        answerB: "Java Script",
        answerC: "Jingle Socket",
        answerD: "Julius Seasar"
    },
    {
        question: "2: What is the semicolon(;) commonly used for in a coding environment?",
        answerA: "Flagging data for memory caching.",
        answerB: "Ending a line of code.",
        answerC: "Signaling a file as production ready.",
        answerD: "It is not used in coding."
    },
    {
        question: "3: Mainly using THIS code editor would absolutely get you submitted somewhere for your own protection:",
        answerA: "VIM",
        answerB: "Window's built-in Notepad App",
        answerC: "Notepad++",
        answerD: "Eclipse"
    },
    {
        question: "4: After a hard rewarding night of coding, an ideal human would be inclined to do THIS:",
        answerA: "Devour at least 3 16-unit boxes of blueberry Pop-Tarts.", 
        answerB: "Brush their teeth, and prepare for bed.",
        answerC: "Re-binge Star Trek: Next Generation all in one night, or attempt to. Again.",
        answerD: "Stay up all night reading Witcher fan-fiction. Again. Because you're starved for content and you deserve it."
    },
    {
        question: "5: What coding language is often used to add basic-level visual flavor to websites?",
        answerA: "Java Script",
        answerB: "Cascading Style Sheets",
        answerC: "Hyper Text Markup Language",
        answerD: "Counter Strike Source"
    }
];
// Incorrect Answer
IncorrectAnswer.forEach(WrongButton => {WrongButton.addEventListener("click", function() {
    if (CurrentQuestion !== -1) {
        --UserScore;
        QuizScore.textContent = "Score: " + UserScore;
        CurrentTime = CurrentTime - 5;
    }
    if (CurrentTime == 0) {
        StartTimer();
    }
    loadNextQuestion();
})}); // Jesus, that's a lot of brackets
// Correct Answer
CorrectAnswer.addEventListener("click", function() {
    if (CurrentQuestion !== -1) {
        ++UserScore;
        QuizScore.textContent = "Score: " + UserScore;
    }
    if (CurrentTime == 0) {
        StartTimer();
    }
    loadNextQuestion();
});
HighscoreResetButton.addEventListener("click", function() {
    HighscoresList = [];
    localStorage.setItem("HighscoresList", JSON.stringify(HighscoresList));
    init();
});
// For loading the next question:
function loadNextQuestion() {
    ++CurrentQuestion;
    if (CurrentQuestion < 5) {
    QuizContent.textContent = Questions[CurrentQuestion].question;
    AnswerA.textContent = Questions[CurrentQuestion].answerA;
    AnswerB.textContent = Questions[CurrentQuestion].answerB;
    AnswerC.textContent = Questions[CurrentQuestion].answerC;
    AnswerD.textContent = Questions[CurrentQuestion].answerD;
    }
    else {
        grade();
        return;
    }
};
// For activating the grading process, ending the game, and saving their score.
function grade() {
    let inputName = window.prompt("Finished! Insert your name.");
    let gradedTime = QuizLength - CurrentTime;
    HighscoresList.push(inputName + " (Score: " + UserScore + " || Time: " + gradedTime + " seconds)");
    localStorage.setItem("HighscoresList", JSON.stringify(HighscoresList));
    PrintHighScores();
    location.reload();
};
// Starts the timer when a button is initially hit.
function StartTimer() {
    CurrentTime = QuizLength;
    let timeInterval = setInterval(function () {
        if (CurrentTime > -1) {
            QuizTimer.textContent = "Timer: " + CurrentTime;
            --CurrentTime;
        }
        else {
            clearInterval(timeInterval);
            grade();
            return;
        }
    }, 1000);
};
// To list highscores.
function PrintHighScores() {
    Highscores.innerHTML = "";
    for (let i = 0; i < HighscoresList.length; ++i) {
      let highscore = HighscoresList[i];
      let li = document.createElement("li");
      li.textContent = highscore;
      li.setAttribute("data-index", i);
      Highscores.appendChild(li);
    }
};
// Pulls storedHighscores from local storage and renders them.
function init() {
    let storedHighscores = JSON.parse(localStorage.getItem("HighscoresList"));
    if (storedHighscores !== null) {
      HighscoresList = storedHighscores;
    };
    PrintHighScores();
};
init();