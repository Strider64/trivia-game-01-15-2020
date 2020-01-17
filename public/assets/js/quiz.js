/*
 *  Trivia Game Version 1.16 beta using FETCH/JSON
 *  by John Pepp
 *  Started: January 14, 2020
 *  Revised: January 16, 2020
 */
/* global fetch */

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
        num = 1,
        seconds = 0,
        dSec = 15,
        timer = null,
        indexId = 0;

const quizUrl = 'quizdatabase.php?'; // PHP database script 

/*
 * Sets up display, questions, answers and displays
 * first question and multiple answers.
 * @param {type} data
 * @returns none
 */
const display = function (data) {
    //d.querySelector("#categories-form").style.display = "none";
    var
            count = 0,
            records = container.getAttribute('data-records'),
            textDiv = container.appendChild(d.createElement('div')),
            textH1 = textDiv.appendChild(d.createElement('h1')),
            clock = textDiv.appendChild(d.createElement('h2'));


    textDiv.id = 'textContainer';
    textH1.textContent = 'Category : ' + d.querySelector('#category').value;
    textH1.id = 'subject';
    clock.id = 'clock';
    selectForm.style.display = 'none';
    textDiv.style.display = 'block';

    //console.log('Total Records', records);
    for (var i = 0; i < records; i++) {
        //console.log(data[i]);
        var
                idIndex = i + 1,
                mainGame = container.appendChild(d.createElement('div')),
                screen = mainGame.appendChild(d.createElement('div')),
                q = screen.appendChild(d.createElement('h2')),
                ansArray = [data[i].answer1, data[i].answer2, data[i].answer3, data[i].answer4];


        mainGame.id = 'mainGame' + idIndex;
        mainGame.setAttribute('data-id', data[i].id);
        screen.className = 'screen';

        q.id = 'question' + idIndex;
        q.appendChild(d.createTextNode(data[i].question));

        for (var j = 0; j < 4; j++) {
            var
                    button = mainGame.appendChild(d.createElement('button'));


            button.setAttribute('data-correct', j + 1);

            button.className = 'buttonStyle';
            button.id = 'button' + (++count);
            button.appendChild(d.createTextNode(ansArray[j]));
        } // for j
    } // for i

    var
            scoring = container.appendChild(d.createElement('div')),
            scoreElement = scoring.appendChild(d.createElement('h2')),
            displayPercent = scoring.appendChild(d.createElement('h2')),
            nextStyle = container.appendChild(d.createElement('div')),
            nextButton = nextStyle.appendChild(d.createElement('button'));

    scoring.id = 'scoring';
    scoreElement.id = 'score';
    scoreElement.textContent = "Score 0 Points";
    displayPercent.id = 'percent';
    displayPercent.textContent = "100%";
    nextStyle.id = "nextStyle";
    nextButton.id = 'next';
    nextButton.className = 'nextBtn';
    nextButton.textContent = 'Next';
    

    d.querySelector('#mainGame1').style.display = "block";


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
        indexId = indexId + 4;
        d.removeEventListener('click', clickHandler, false);
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
 * Determine what answer button was pressed and
 * send a fetch request (promise). 
 */
const clickHandler = function (e) {
    e.preventDefault();
    //console.log('e.target', e.target);
    if (e.target.classList.contains('buttonStyle') === true) {
        clearInterval(timer);
        console.log('data-id', e.target.parentNode.getAttribute('data-id'));
        console.log('e.target', e.target.textContent);
        const answerUrl = "checkanswer.php?id=" + e.target.parentNode.getAttribute('data-id') + "&answer=" + e.target.getAttribute('data-correct');
        console.log("file path", answerUrl);
        d.removeEventListener('click', clickHandler, false);
        createRequest(answerUrl, pressedUISuccess, pressedUIError);
    }
};

/*
 * Add Listener to Document (Page) and Remove Next Button Listener
 */
const pressedButton = function () {
    d.getElementById('next').removeEventListener('click', nextButtonHandler, false);
    //timer = setInterval(countdown, 1000);
    d.addEventListener('click', clickHandler, false);
};

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
 * Goto Next Question Setup clickHandler function
 */
function nextButtonHandler(e) {
    e.preventDefault();
    d.querySelector('#mainGame' + num).style.display = 'none';
    num++;
    d.querySelector('#mainGame' + num).style.display = 'block';
    
    startTimer(dSec);
    pressedButton();
}


/*
 * Fetch Correct Answer then Compare Against User's Answer
 */
const pressedUISuccess = function (check) {
    var questionId = parseInt(check.id),
            answer = parseInt(check.answer),
            correct = check.correct;
    console.log(questionId, answer, correct);

    if (answer === correct) {
        console.log("correct");
        d.querySelector('#button' + (correct + indexId)).style['background-color'] = 'green';
    } else {
        console.log("wrong");
        d.querySelector('#button' + (correct + indexId)).style['background-color'] = 'green';
        d.querySelector('#button' + (answer + indexId)).style['background-color'] = 'red';
    }
    indexId = indexId + 4;
    console.log('Total', num);
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
    container.setAttribute('data-records', records);
    display(parsedData);
    startTimer(dSec);
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


