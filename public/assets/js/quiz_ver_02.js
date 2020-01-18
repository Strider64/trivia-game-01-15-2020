/*
 *  Trivia Game Version 1.17.02 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 17, 2020
 */

'use strict';
var d = document,
        container = d.querySelector('#triviaContainer'),
        totalQuest = container.getAttribute('data-records'),
        selectForm = container.appendChild(d.createElement('form')),
        hiddenField = selectForm.appendChild((d.createElement('input'))),
        setLabelEle = selectForm.appendChild(d.createElement('label')),
        selectCatEle = selectForm.appendChild(d.createElement('select')),
        optionEle1 = d.createElement('option'),
        optionEle2 = d.createElement('option'),
        optionEle3 = d.createElement('option'),
        score = 0,
        trivIndex = 0,
        num = 1,
        seconds = 0,
        dSec = 15,
        timer = null,
        indexId = 0,
        movieData = null;

const points = 100,
        penalty = 50;

const quizUrl = 'quizdatabase.php?'; // PHP database script 

/*
 * Sets up display, questions, answers and displays
 * first question and multiple answers.
 * @param {type} data
 * @returns none
 */
const display = function () {
    //d.querySelector("#categories-form").style.display = "none";
    var
            textDiv = container.appendChild(d.createElement('div')),
            textH1 = textDiv.appendChild(d.createElement('h1')),
            clock = textDiv.appendChild(d.createElement('h2')),
            mainGame = container.appendChild(d.createElement('div')),
            screen = mainGame.appendChild(d.createElement('div')),
            q = screen.appendChild(d.createElement('h2')),
            scoring = container.appendChild(d.createElement('div')),
            scoreElement = scoring.appendChild(d.createElement('h2')),
            displayPercent = scoring.appendChild(d.createElement('h2')),
            nextStyle = container.appendChild(d.createElement('div')),
            nextButton = nextStyle.appendChild(d.createElement('button'));


    textH1.textContent = 'Category : ' + d.querySelector('#category').value;
    textH1.id = 'subject';
    clock.id = 'clock';
    selectForm.style.display = 'none';
    textDiv.id = 'textContainer';
    textDiv.style.display = 'block';
    mainGame.id = 'mainGame';
    mainGame.setAttribute('data-id', movieData[0].id);
    screen.className = 'screen';
    q.id = 'question';
    q.appendChild(d.createTextNode('Filler Question'));

    for (var j = 0; j < 4; j++) {
        var
                button = mainGame.appendChild(d.createElement('button'));


        button.setAttribute('data-correct', j + 1);

        button.className = 'buttonStyle';
        button.id = 'button' + (j + 1);
        button.appendChild(d.createTextNode("FILLER"));
    } // for j
    scoring.id = 'scoring';
    scoreElement.id = 'score';
    scoreElement.textContent = "Score 0 Points";
    displayPercent.id = 'percent';
    displayPercent.textContent = "100%";
    nextStyle.id = "nextStyle";
    nextButton.id = 'next';
    nextButton.className = 'nextBtn';
    nextButton.textContent = 'Next';

    d.querySelector('#mainGame').style.display = "block";

};

/*
 * Insert Record Id, Questions and Answers into HTML
 */
const gamePlay = function () {

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

};

/*
 * Countdown Timer For Quiz Game
 */
function countdown() {
    var counter = 0;
    if (seconds === 0) {
        clearTimeout(timer);
        d.getElementById('clock').style['color'] = "red";
        d.getElementById('clock').textContent = 'Time has Expired!';
        trivIndex += 1;
        score -= penalty;
        d.querySelector('#score').textContent = "Score " + score + " Points";
        for (var y = 1; y <= 4; y++) {
            d.querySelector('#button' + y).removeEventListener('click', clickHandler, false);
        }
        d.getElementById('next').addEventListener('click', nextButtonHandler, false);

    } else {
        if (seconds < 10) {
            counter = '0' + seconds;
        } else {
            counter = seconds;
        }
        d.getElementById('clock').textContent = 'There are ' + counter + ' seconds left!';
        seconds--;
    }
}

/*
 * 
 * @param {type} dSec
 * Start Timer
 * 
 */
const startTimer = function (dSec) {
    seconds = dSec;
    d.getElementById('clock').style['color'] = "green";
    d.getElementById('clock').textContent = 'There are ' + seconds + ' seconds left!';
    timer = setInterval(countdown, 1000);
};

/*
 * Determine what answer button was pressed and
 * send a fetch request (promise). 
 */
const clickHandler = function (e) {
    e.preventDefault();
    var answer = 0,
            checkAnswer = parseInt(e.target.getAttribute('data-correct')),
            id = parseInt(e.target.parentNode.getAttribute('data-id'));
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

    const answerUrl = "checkanswer.php?id=" + id + "&answer=" + answer;
    clearInterval(timer);
    createRequest(answerUrl, pressedUISuccess, pressedUIError);
    for (var y = 1; y <= 4; y++) {
        d.querySelector('#button' + y).removeEventListener('click', clickHandler, false);
    }

};

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



/*
 * Goto Next Question Setup clickHandler function
 */
function nextButtonHandler(e) {
    e.preventDefault();
    //startTimer(dSec);
    for (var y = 1; y <= 4; y++) {
        d.querySelector('#button' + y).style['background-color'] = '#336699';
    }
    gamePlay();
    pressedButton();
}


/*
 * Fetch Correct Answer then Compare Against User's Answer
 */
const pressedUISuccess = function (check) {
    var
            answer = parseInt(check.answer),
            correct = check.correct;

    if (answer === correct) {
        score += points;
        d.querySelector('#button' + correct).style['background-color'] = 'green';
    } else {
        score -= penalty;
        d.querySelector('#button' + correct).style['background-color'] = 'green';
        d.querySelector('#button' + answer).style['background-color'] = 'red';
    }
    d.querySelector('#score').textContent = "Score " + score + " Points";
    trivIndex += 1; // Next Record:
    
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

const quizUISuccess = function (parsedData) {
    const records = parsedData.length;
    movieData = parsedData; // Store parsed data in global variable:

    container.setAttribute('data-records', records);

    display(parsedData);
    gamePlay();

    pressedButton();
};

const quizUIError = function (error) {
    console.log(error);
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

    //console.log(d.querySelector('#category').value);
    const requestUrl = quizUrl + 'category=' + d.querySelector('#category').value;
    createRequest(requestUrl, quizUISuccess, quizUIError);
};

/*
 * Add an event listener to Selection Form
 */


const createDynamicForm = function () {
    /*
     * Load Select Element to choose category
     */

    selectForm.id = "categories-form";
    selectForm.setAttribute('action', " ");
    selectForm.setAttribute('method', 'post');


    setLabelEle.setAttribute('for', 'category');
    setLabelEle.textContent = "Trivia Category";

    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'modify');
    hiddenField.setAttribute('value', "edit_entry");

    selectCatEle.id = "category";
    selectCatEle.setAttribute('name', 'category');

    optionEle1.setAttribute('value', ' ');
    optionEle1.text = "Select Category";
    selectCatEle.add(optionEle1);

    optionEle2.setAttribute('value', 'movie');
    optionEle2.text = "movie";
    selectCatEle.add(optionEle2);

    optionEle3.setAttribute('value', 'space');
    optionEle3.text = "space";
    selectCatEle.add(optionEle3);

};




/*
 * Wait until the DOM is load to Create Form and Load Data From Form
 * Selection element. 
 */
window.addEventListener('DOMContentLoaded', () => {

    createDynamicForm();


    /*
     * Add an event listener so when user selects category the
     * Trivia Category to MySQL Database in order to "fetch"
     * when user selects a trivia category.
     */

    d.querySelector('#category').addEventListener('change', selectCat);

});


