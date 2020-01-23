/*
 *  Trivia Game Version 2.21.02 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 22, 2020 9:15 PM
 */

'use strict';

const quizUrl = 'qdatabase.php?'; // PHP database script 
const d = document;

const buttonContainer = d.querySelector('#buttonContainer');
const question = d.querySelector('#question');
const next = d.querySelector('#next');
const points = 100;
const scoreText = d.querySelector('#score');

var gameIndex = 0,
        gameData = null,
        score = 0,
        answeredRight = 0,
        answeredWrong = 0;

const buttons = document.querySelectorAll(".answerButton");
const mainGame = d.querySelector('#mainGame');

const calcPercent = (correct, wrong) => {
    var average = (correct / (correct + wrong)) * 100;
    d.getElementById('percent').textContent = average.toFixed(0) + "%";
};

const clickHandler = (e) => {
    e.preventDefault();

    const myButtons = d.querySelectorAll('.answerButton');
    const correct = gameData[gameIndex].correct;
    const userAnswer = parseInt(e.target.getAttribute('data-correct'));

    var right = true;

    if (userAnswer !== correct) {
        right = false;
        score = score - (points/2);
        answeredWrong ++;
        scoreText.textContent = "Score " + score + " Points";
    } else {
        score += points;
        answeredRight++;
        scoreText.textContent = "Score " + score + " Points";
    }
    
    calcPercent(answeredRight, answeredWrong);

    /*
     * Remove buttons addListeners, so users can't click
     * more than once.
     */
    myButtons.forEach(answer => {
        /*
         * Figure out score, percentage and highlight if it is right (green)
         * or wrong (red)
         */
        if (!right && parseInt(answer.getAttribute('data-correct')) === userAnswer) {
            answer.style["background-color"] = 'red';
        } else if (right && parseInt(answer.getAttribute('data-correct')) === userAnswer) {
            answer.style['background-color'] = 'green';
        }
        answer.removeEventListener('click', clickHandler, false);
    });

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



const quizUISuccess = function (parsedData) {

    mainGame.style.display = 'block';
    d.querySelector('#category').removeEventListener('change', selectCat);

    gameData = parsedData.sort(() => Math.random() - .5);

    createQuiz(gameData[gameIndex]);



};

const quizUIError = function (error) {
    console.log("Database Table did not load", error);

//    gameData = [
//        {
//            id: 1,
//            category: "movie",
//            question: "What actor from the movie \"Dead Poets Society\" plays Dr. James Wilson on the TV show ",
//            answers: ["Ethan Hawke", "Robert Sean Leonard", "James Waterston"],
//            correct: 2
//        }
//    ];
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


