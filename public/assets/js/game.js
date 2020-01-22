/*
 *  Trivia Game Version 2.21.02 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 22, 2020 10:30 AM
 */

'use strict';

const quizUrl = 'qdatabase.php?'; // PHP database script 
const d = document;

const buttonContainer = d.querySelector('#buttonContainer');
const question = d.querySelector('#question');
const next = d.querySelector('#next');

var gameIndex = 0,
        gameData = null;

const buttons = document.querySelectorAll(".answerButton");
const mainGame = d.querySelector('#mainGame');


const clickHandler = (e) => {
    e.preventDefault();

    const myButtons = d.querySelectorAll('.answerButton');
    //console.log(myButtons);


    //console.log(gameData[gameIndex].question);
    const correct = gameData[gameIndex].correct;
    const userAnswer = parseInt(e.target.getAttribute('data-correct'));

    var right = true;

    if (userAnswer === correct) {
        console.log("Correct!");
        console.log(userAnswer, correct);
    } else {
        console.log("Wrong!");
        console.log(userAnswer, correct);
        right = false;
    }

    /*
     * Remove buttons addListeners, so users can't click
     * more than once.
     */
    myButtons.forEach(answer => {
        if (!right && parseInt(answer.getAttribute('data-correct')) === userAnswer) {
            answer.style["background-color"] = 'red';
        } else if (right && parseInt(answer.getAttribute('data-correct')) === userAnswer) {
            answer.style['background-color'] = 'green';
        }


        console.log(answer.getAttribute('data-correct'));
        answer.removeEventListener('click', clickHandler, false);
        //console.log(answer);
    });

    next.addEventListener('click', removeQuiz, false);

};




const removeQuiz = () => {

    gameIndex++;

    let element = d.querySelector('#buttonContainer');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    createQuiz(gameData[gameIndex]);

};

const createQuiz = (gameData) => {
    buttonContainer.setAttribute('data-correct', gameData.correct);
    question.textContent = gameData.question;
    console.log(gameData);

    /*
     * Create Buttons then inset answers into buttons that were
     * create. 
     */
    gameData.answers.forEach((value, index) => {
        var gameButton = buttonContainer.appendChild(d.createElement('button'));

        gameButton.id = 'answer' + (index + 1);
        gameButton.className = 'answerButton';
        gameButton.setAttribute('data-correct', (index + 1));
        //gameButton.textContent = value;
        gameButton.addEventListener('click', clickHandler, false);
        gameButton.appendChild(d.createTextNode(value));
    });

    //.console.log(buttonContainer);


};



const quizUISuccess = function (parsedData) {

    mainGame.style.display = 'block';
    d.querySelector('#category').removeEventListener('change', selectCat);

    gameData = parsedData;

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
    //console.log(d.querySelector('#category').value);
    const requestUrl = quizUrl + 'category=' + d.querySelector('#category').value + '&api_key=' + api_key;
    //console.log(requestUrl);
    createRequest(requestUrl, quizUISuccess, quizUIError);
};

d.querySelector('#category').addEventListener('change', selectCat);


//movieData = [
//    {
//        id: 1,
//        question: "What actor from the movie \"Dead Poets Society\" plays Dr. James Wilson on the TV show ",
//        answers: ["Ethan Hawke", "Dylan Kussman", "Robert Sean Leonard", "James Waterston"],
//        correct: 3
//    }
//];
//
//console.log(movieData);
//
//movieData.forEach(function (questions, index) {
//    console.log('Index', index);
//});
//
//const buttons = document.querySelectorAll(".answerButton");
//
//const clickHandler = () => {
//  console.log('Click Me!');  
//};
//
//buttons.forEach(answer => {
//    answer.addEventListener('click', clickHandler, false);
//    //console.log(answer);
//});

