/*
 *  Trivia Game Version 3.00 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: February 2, 2020 11:30 aM
 */

'use strict';


function rgba2hex(orig) {
  var a,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
    (rgb[1] | 1 << 8).toString(16).slice(1) +
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = "01";
  }
  // multiply before convert to HEX
  a = ((a * 255) | 1 << 8).toString(16).slice(1);
  hex = hex + a;

  return hex;
}

const myColor = (colorcode) => {
    var hexColor = rgba2hex(colorcode);
    return '#' + hexColor;
};


const myGreen = myColor("rgba(29, 100, 31, 0.70)");
const myRed = myColor("rgba(84, 0, 30, 0.70)");
console.log('My Green', myGreen);

//console.log('Green', rgba2hex("rgba(146, 214, 22, 0.50)"));
//myColor("rgba(0, 0, 0, 0.74)");
//myColor("rgba(0, 0, 0, 1)");
//myColor("rgba(0, 0, 0, 0)");
//myColor("rgba(0, 255, 0, 0.5)");

const game = () => {
    const quizUrl = 'qdatabase.php?'; // PHP database script 
    const d = document;

    const buttonContainer = d.querySelector('#buttonContainer');
    const question = d.querySelector('#question');
    const triviaLabel = d.querySelector('#triviaLabel');
    const next = d.querySelector('#next');
    const points = 100;
    const scoreText = d.querySelector('#score');
    const dSec = 20; // Countdown Clock for questions:

    var gameIndex = 0,
            gameData = null,
            timer = null,
            score = 0,
            total = 0,
            answeredRight = 0,
            answeredWrong = 0;

    const buttons = document.querySelectorAll(".answerButton");
    const mainGame = d.querySelector('#mainGame');


    /*
     * Countdown Timer For Triva Game
     */
    const startTimer = (dSec) => {
        var seconds = dSec;
        const userAnswer = 5, correct = 1;
        const newClock = d.querySelector('#clock');

        newClock.style['color'] = 'white';
        newClock.textContent = ((seconds < 10) ? '0' + seconds : seconds);
        const countdown = () => {
            if (seconds === 0) {
                clearTimeout(timer);
                newClock.style['color'] = myRed;
                newClock.textContent = "00";
                scoringFcn(userAnswer, correct);
                highlightFCN(userAnswer, correct);
                disableListeners();
                next.addEventListener('click', removeQuiz, false);
            } else {
                newClock.textContent = ((seconds < 10) ? '0' + seconds : seconds);
                seconds--;
            }
        };




        timer = setInterval(countdown, 1000);

    };

    const stopTimer = () => {
        clearInterval(timer);
    };

    const highlightFCN = (userAnswer, correct) => {

        const highlights = d.querySelectorAll('.answerButton');
        highlights.forEach(answer => {
            /*
             * Highlight Answers Function
             */
            if (userAnswer === correct && userAnswer === parseInt(answer.getAttribute('data-correct'))) {
                answer.style["background-color"] = myGreen;
            }
            if (userAnswer !== correct && userAnswer === parseInt(answer.getAttribute('data-correct'))) {
                answer.style['background-color'] = myRed;
            }
            if (userAnswer === 5) {
                answer.style['background-color'] = myRed;
            }
        });
    };
    const disableListeners = () => {
        const myButtons = d.querySelectorAll('.answerButton');
        myButtons.forEach(answer => {
            answer.removeEventListener('click', clickHandler, false);
        });
    };

    const calcPercent = (correct, total) => {
        var average = (correct / total) * 100;
        d.getElementById('percent').textContent = average.toFixed(0) + "%";
    };

    const scoringFcn = (userAnswer, correct) => {
        if (userAnswer === correct) {
            score += points;
            answeredRight++;
            scoreText.textContent = "Score " + score + " Points";
        } else {
            score = score - (points / 2);
            answeredWrong++;
            scoreText.textContent = "Score " + score + " Points";
        }
        total++;
    };

    const clickHandler = (e) => {
        e.preventDefault();
        stopTimer();

        const correct = gameData[gameIndex].correct;
        const userAnswer = parseInt(e.target.getAttribute('data-correct'));


        scoringFcn(userAnswer, correct);
        calcPercent(answeredRight, total);

        highlightFCN(userAnswer, correct);

        disableListeners();

        next.addEventListener('click', removeQuiz, false);

    };


    const removeQuiz = () => {
        next.removeEventListener('click', removeQuiz, false);
        gameIndex++;

        let element = d.querySelector('#buttonContainer');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        createQuiz(gameData[gameIndex]); // Recreate the Quiz Display:

    };

    const createQuiz = (gameData) => {
        startTimer(dSec);
        buttonContainer.setAttribute('data-correct', gameData.correct);
        question.textContent = gameData.question;

        /*
         * Create Buttons then inset answers into buttons that were
         * create. 
         */
        gameData.answers.forEach((value, index) => {
            var gameButton = buttonContainer.appendChild(d.createElement('button'));

            gameButton.id = 'answer' + (index + 1);
            gameButton.className = 'answerButton';
            gameButton.setAttribute('data-correct', (index + 1));
            gameButton.addEventListener('click', clickHandler, false);
            gameButton.appendChild(d.createTextNode(value));
        });
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const quizUISuccess = function (parsedData) {

        mainGame.style.display = 'block';

        d.querySelector('#category').removeEventListener('change', selectCat);
        d.querySelector('#category').style.display = 'none';
        triviaLabel.textContent = capitalizeFirstLetter(parsedData[gameIndex].category);
        gameData = parsedData.sort(() => Math.random() - .5);
        //console.log(gameData);
        createQuiz(gameData[gameIndex]);

    };

    const quizUIError = function (error) {
        console.log("Database Table did not load", error);

        gameData = [
            {
                id: 1,
                question: "What actor from the movie \"Dead Poets Society\" plays Dr. James Wilson on the TV show ",
                correct: 2,
                category: "movie",
                answers: ["Ethan Hawke", "Robert Sean Leonard", "James Waterston"]

            },
            {
                id: 55,
                question: "Who has won the most Oscars for Best Actress?",
                correct: 2,
                category: "movie",
                answers: ["Meryl Streep", "Katharine Hepburn", "Audrey Hepburn", "Jane Fonda"]
            },
            {
                id: 9,
                question: "Who played Jor-El in \"Superman (1978)\"?",
                correct: 4,
                category: "movie",
                answers: ["Glenn Ford", "Ned Beatty", "Christopher Reed", "Marlon Brando"]
            }
        ];

        //console.log(gameData);
        mainGame.style.display = 'block';

        d.querySelector('#category').removeEventListener('change', selectCat);
        d.querySelector('#category').style.display = 'none';
        createQuiz(gameData[gameIndex]);
    };

    /*
     * Throw error response if something is wrong: 
     */
    const handleErrors = function (response) {
        if (!response.ok) {
            throw (response.status + ' : ' + response.statusText);
        }
        return response.json();
    };

    const createRequest = function (url, succeed, fail) {
        fetch(url)
                .then((response) => handleErrors(response))
                .then((data) => succeed(data))
                .catch((error) => fail(error));
    };


    const selectCat = function () {

        var api_key = d.querySelector('.triviaContainer').getAttribute('data-key');
        //var api_key = '42857078e4de89da3d432bd4456faf56c4a6c58f6378332f6f2b0d6ff107f9d9';
        const requestUrl = quizUrl + 'category=' + d.querySelector('#category').value + '&api_key=' + api_key;
        //console.log(requestUrl);
        createRequest(requestUrl, quizUISuccess, quizUIError);
    };

    d.querySelector('#category').addEventListener('change', selectCat);

};

game();

