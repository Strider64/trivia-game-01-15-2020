/*
 *  Trivia Game Version 1.19.02 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 19, 2020
 */

'use strict';
var d = document,
        container = d.querySelector('#triviaContainer'),
        totalQuest = container.getAttribute('data-records'),
        score = 0,
        right = 0,
        wrong = 0,
        average = 0,
        totalQ = 0,
        trivIndex = 0,
        num = 1,
        seconds = 0,
        timer = null,
        indexId = 0,
        movieData = null,
        errFlag = false;

const dSec = 15;

const categoriesForm = d.querySelector('#categories-form');
const textContainer = d.querySelector('#textContainer');
textContainer.style.display = "none";
const category = d.querySelector('#subject');
const mainGame = d.querySelector('#mainGame');
const scoring = d.querySelector('#scoring');
scoring.style.display = "none";
const nextStyle = d.querySelector('#nextStyle');
nextStyle.style.display = "none";


const points = 100,
        penalty = 50;

const quizUrl = 'quizdatabase.php?'; // PHP database script 

/*
 * Add Listener to Document (Page) and Remove Next Button Listener
 */
const pressedButton = function () {
    d.getElementById('next').removeEventListener('click', nextButtonHandler, false);

    d.querySelector('#button1').addEventListener('click', clickHandler, false);
    d.querySelector('#button2').addEventListener('click', clickHandler, false);
    d.querySelector('#button3').addEventListener('click', clickHandler, false);
    d.querySelector('#button4').addEventListener('click', clickHandler, false);
};



const gamePlay = () => {

    /*
     * Insert Record Id, Questions and Answers into HTML
     */
    var id = d.querySelector('#mainGame'),
            question = d.querySelector('#question'),
            button1 = d.querySelector('#button1'),
            button2 = d.querySelector('#button2'),
            button3 = d.querySelector('#button3'),
            button4 = d.querySelector('#button4');

    id.setAttribute('data-id', movieData[trivIndex].id);
    question.textContent = movieData[trivIndex].question;
    button1.textContent = movieData[trivIndex].answer1;
    button2.textContent = movieData[trivIndex].answer2;
    button3.textContent = movieData[trivIndex].answer3;
    button4.textContent = movieData[trivIndex].answer4;

    startTimer(dSec);

    pressedButton();

};

/*
 * Check to see if game is over!
 */
const gameOverCheck = () => {
    if (trivIndex >= movieData.length) {
        console.log('Game Over');
        d.getElementById('next').removeEventListener('click', nextButtonHandler, false);
    } else {
        /*
         * Play the Quiz!
         */
        gamePlay();
    }
};




/*
 * Countdown Timer For Quiz Game
 */
const startTimer = (dSec) => {
    seconds = dSec;
    const newClock = d.querySelector('#clock');

    newClock.style['color'] = 'green';
    newClock.textContent = 'There are ' + ((seconds < 10) ? '0' + seconds : seconds) + ' seconds left!';
    const countdown = () => {
        if (seconds === 0) {
            clearTimeout(timer);
            newClock.style['color'] = "red";
            newClock.textContent = 'Time has Expired!';
            trivIndex += 1;
            score -= penalty;
            d.querySelector('#score').textContent = "Score " + score + " Points";
            wrong += 1;
            calcPercent();

            for (var y = 1; y <= 4; y++) {
                d.querySelector('#button' + y).removeEventListener('click', clickHandler, false);
            }
            d.getElementById('next').addEventListener('click', nextButtonHandler, false);

        } else {
            newClock.textContent = 'There are ' + ((seconds < 10) ? '0' + seconds : seconds) + ' seconds left!';
            seconds--;
        }
    };




    timer = setInterval(countdown, 1000);

};

const stopTimer = () => {
    clearInterval(timer);
};

const calcPercent = function () {
    average = (right / (right + wrong)) * 100;
    d.getElementById('percent').textContent = average.toFixed(0) + "%";
};

const calcScoring = (answer, correct) => {
    if (answer === correct) {
        right += 1;
        score += points;
        d.querySelector('#button' + correct).style['background-color'] = 'green';
    } else {
        wrong += 1;
        score -= penalty;
        d.querySelector('#button' + correct).style['background-color'] = 'green';
        d.querySelector('#button' + answer).style['background-color'] = 'red';
    }
    d.querySelector('#score').textContent = "Score " + score + " Points";
    trivIndex += 1; // Next Record:
    calcPercent();
};

/*
 * Determine what answer button was pressed and
 * send a fetch request (promise). 
 */
const clickHandler = function (e) {
    e.preventDefault();
    var answer = 0,
            checkAnswer = parseInt(e.target.getAttribute('data-correct')),
            id = parseInt(e.target.parentNode.getAttribute('data-id')),
            correct = 0;
    //console.log('id', id);
    switch (checkAnswer) {
        case 1:
            answer = 1;
            break;
        case 2:
            answer = 2;
            break;
        case 3:
            answer = 3;
            break;
        case 4:
            answer = 4;
            break;
        default:
            answer = 0;
            break;
    }
    stopTimer();



    if (!errFlag) {
        const answerUrl = "checkanswer.php?id=" + id + "&answer=" + answer;

        createRequest(answerUrl, pressedUISuccess, pressedUIError);
    } else {
        correct = movieData[trivIndex].correct;
        calcScoring(answer, correct);
    }

    d.getElementById('next').addEventListener('click', nextButtonHandler, false);
    for (var y = 1; y <= 4; y++) {
        d.querySelector('#button' + y).removeEventListener('click', clickHandler, false);
    }


};

/*
 * Goto Next Question Setup clickHandler function
 */
const nextButtonHandler = (e) => {
    e.preventDefault();

    for (var y = 1; y <= 4; y++) {
        d.querySelector('#button' + y).removeAttribute('style');
    }
    gameOverCheck();
}


/*
 * Fetch Correct Answer then Compare Against User's Answer
 */
const pressedUISuccess = function (check) {
    var
            answer = parseInt(check.answer),
            correct = check.correct;
    calcScoring(answer, correct);

    /*
     * Add Next Button Event Listener 
     */
    d.getElementById('next').addEventListener('click', nextButtonHandler, false);
};

const pressedUIError = function (error) {
    console.log(error);
};


/*
 * Grab Records (Questions and Answers) from the MySQL Table
 * using Fetch (AJAX)
 */

const dispQuiz = () => {
    textContainer.style.display = "block";
    mainGame.style.display = 'block';
    scoring.style.display = "block";
    nextStyle.style.display = "block";
};

const quizUISuccess = function (parsedData) {
    console.log(parsedData);



    const records = parsedData.length;
    categoriesForm.style.display = "none";
    movieData = parsedData; // Store parsed data in global variable:
    category.textContent = "Cateogry : " + movieData[0].category;
    category.style['color'] = 'green';
    container.setAttribute('data-records', records);

    dispQuiz();
    gameOverCheck();


};

/*
 * If Database Table doesn't load for some reason this is a fallback where
 * there's only 3 questions. 
 */

const quizUIError = function (error) {
    console.log("Database Table did not load", error);
    errFlag = true;
    category.textContent = "Cateogry : Offline";
    category.style['color'] = 'red';
    movieData = [
        {
            id: 1,
            question: "What actor from the movie \"Dead Poets Society\" plays Dr. James Wilson on the TV show ",
            answer1: "Ethan Hawke",
            answer2: "Dylan Kussman",
            answer3: "Robert Sean Leonard",
            answer4: "James Waterston",
            correct: 3
        },
        {
            id: 7,
            question: "Who portrayed the Joker in \"The Dark Knight (2008)\"?",
            answer1: "Christan Bale",
            answer2: "Aaron Eckhart",
            answer3: "Michael Caine",
            answer4: "Heath Ledger",
            correct: 4
        },
        {
            id: 30,
            question: "Follow the Sun was about what real life golf pro?",
            answer1: "Bobby Jones",
            answer2: "Ben Hogan",
            answer3: "Arnold Palmer",
            answer4: "Jack Nicklaus",
            correct: 2
        }
    ];
    categoriesForm.style.display = "none";
    console.log('mData', movieData);
    container.setAttribute('data-records', movieData.length);
    dispQuiz();
    gameOverCheck();

};


/*
 * 
 * @param {type} response
 * Throw error response if something is wrong:
 * 
 */
const handleErrors = function (response) {
    if (!response.ok) {
        throw (response.status + ' : ' + response.statusText);
    }
    return response.json();
};

/*
 * 
 * @param {type} url
 * @param {type} succeed
 * @param {type} fail
 */

const createRequest = function (url, succeed, fail) {
    fetch(url)
            .then((response) => handleErrors(response))
            .then((data) => succeed(data))
            .catch((error) => fail(error));
};

const selectCat = function () {
    var api_key = d.querySelector('#triviaContainer').getAttribute('data-key');
    //var api_key = '42857078e4de89da3d432bd4456faf56c4a6c58f6378332f6f2b0d6ff107f9d9';
    console.log(d.querySelector('#category').value);
    const requestUrl = quizUrl + 'category=' + d.querySelector('#category').value + '&api_key=' + api_key;
    createRequest(requestUrl, quizUISuccess, quizUIError);
};

d.querySelector('#category').addEventListener('change', selectCat);




