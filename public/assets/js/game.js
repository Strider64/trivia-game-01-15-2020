/*
 *  Trivia Game Version 3.25 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: February 7, 2020 1:30 PM
 */

'use strict';

const game = (defaultCategory) => {

    /* Convert RGBa to HEX  */
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

    /*
     * Constants & Variables Initialization Section.
     */
    const myGreen = myColor("rgba(29, 100, 31, 0.70)"); /* Green with 70% transparency */
    const myRed = myColor("rgba(84, 0, 30, 0.70)"); /* Red with 70% transparency */

    const quizUrl = 'qdatabase.php?'; // PHP database script 
    const d = document; // Shorten docoment function::

    const movieBtn = d.querySelector('#movie'); 
    const spaceBtn = d.querySelector('#space');
    const photographyBtn = d.querySelector('#photography');
    
    const gameTitle = d.querySelector('.gameTitle');
    const buttonContainer = d.querySelector('#buttonContainer');
    const question = d.querySelector('#question');
    const next = d.querySelector('#next');
    const points = 100;
    const scoreText = d.querySelector('#score');
    const percent = d.querySelector('#percent');
    const dSec = 20; // Countdown Clock for questions:

    var gameIndex = 0,
            gameData = null,
            timer = null,
            score = 0,
            total = 0,
            answeredRight = 0,
            answeredWrong = 0,
            category = null;

    const buttons = document.querySelectorAll(".answerButton");
    const mainGame = d.querySelector('#mainGame');


    /*
     * Start and Stop Functions for Countdown Timer For Triva Game
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
                calcPercent(answeredRight, total);
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

    /* Highlight correct or wrong answers */
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
    
    /* Disable Listeners, so users can click on answer buttons */
    const disableListeners = () => {
        const myButtons = d.querySelectorAll('.answerButton');
        myButtons.forEach(answer => {
            answer.removeEventListener('click', clickHandler, false);
        });
    };
    
    /* Calculate Percent */
    const calcPercent = (correct, total) => {
        var average = (correct / total) * 100;
        percent.textContent = average.toFixed(0) + "%";
    };

    /* Figure out Score */
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

    /* User has made selection */
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

    /* Remove answers from Screen */
    const removeAnswers = () => {
        let element = d.querySelector('#buttonContainer');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    
    /* Remove Question & Answers */
    const removeQuiz = () => {
        removeAnswers(); // Call removeAnswers FCN:
        next.removeEventListener('click', removeQuiz, false);
        gameIndex++;
        console.log(gameIndex, gameData.length);
        if (gameIndex < parseInt(gameData.length)) {
            createQuiz(gameData[gameIndex]); // Recreate the Quiz Display:
        } else {
            question.textContent = 'Game Over';
        }
    };

    /* Populate Quesion, Create Answer Buttons */
    const createQuiz = (gameData) => {
        document.getElementById('mainGame').scrollIntoView();
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

    /* Success function utilizing FETCH */
    const quizUISuccess = function (parsedData) {
        mainGame.style.display = 'block';
        gameData = parsedData.sort(() => Math.random() - .5);

        createQuiz(gameData[gameIndex]);

    };

    /* If Database Table fails to load then answer a few hard coded Q&A */
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
        
        /* Display HTML Game Display and create Quiz */
        mainGame.style.display = 'block';

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

    /* FETCH request */
    const createRequest = function (url, succeed, fail) {
        fetch(url)
                .then((response) => handleErrors(response))
                .then((data) => succeed(data))
                .catch((error) => fail(error));
    };

    /* Reset the Game */
    const resetGame = () => {
        removeAnswers();
        stopTimer();
        score = 0;
        total = 0;
        answeredRight = 0;
        answeredWrong = 0;
        gameIndex = 0;
        gameData = null;
        scoreText.textContent = 'Score 0 Points';
        percent.textContent = '100';
    };

    /*
     * Start Game by Category
     */
    const selectCat = function (category) {
        var api_key = d.querySelector('.triviaContainer').getAttribute('data-key');
        //var api_key = '42857078e4de89da3d432bd4456faf56c4a6c58f6378332f6f2b0d6ff107f9d9';
        const requestUrl = quizUrl + 'category=' + category + '&api_key=' + api_key;
        createRequest(requestUrl, quizUISuccess, quizUIError);

    };

    const movieCat = (e) => {
        e.preventDefault();
        resetGame();
        gameTitle.textContent = "Movie Trivia";
        selectCat('movie');
    };

    const spaceCat = (e) => {
        e.preventDefault();
        resetGame();
        gameTitle.textContent = "Space Trivia";
        selectCat('space');
        console.log('spaceBtn', 'click');
    };

    /*
     * Display other categories
     */
    d.querySelector('#space').style.display = "block";
    d.querySelector('#movie').style.display = "block";
    
    /* 
     * Event handlers for other categories
     */
    movieBtn.addEventListener('click', movieCat, false);
    spaceBtn.addEventListener('click', spaceCat, false);

    category = movieBtn.getAttribute('data-category');
    selectCat(defaultCategory);
};
document.querySelector('.gameTitle').textContent = "Photography Trivia";
game('photography');

