/*
 *  Trivia Game Version 2.90.02 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 30, 2020 1:40 PM
 */

'use strict';
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
                newClock.style['color'] = "red";
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
                answer.style["background-color"] = 'green';
            }
            if (userAnswer !== correct && userAnswer === parseInt(answer.getAttribute('data-correct'))) {
                answer.style['background-color'] = 'red';
            }
            if (userAnswer === 5) {
                answer.style['background-color'] = 'red';
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

