/*
 *  Trivia Game Version 1.15 beta with XML
 *  by John Pepp
 *  Started: January 15, 2020
 *  Revised: January 14, 2020
 */
'use strict';

const quizUrl = 'quizdatabase.php?';

/*
 * Select Trivia Category Variable
 */

const quizUISuccess = function (parsedData) {
    //const parsedData = JSON.parse(data);
    console.log(parsedData, parsedData.length);
    const records = parsedData.length;
    container.setAttribute('data-records', records);
    console.log(container);
    //console.log(parsedData[0]);
    //console.log(parsedData[0].question);
    //console.log(parsedData[1].question);

};

const quizUIError = function (error) {
    console.log(error);
};

const responseMethod = function (httpRequest, succeed, fail) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            succeed(httpRequest.responseText);
        } else {
            fail(httpRequest.status + ': ' + httpRequest.responseText);
        }
    }
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

    const requestUrl = quizUrl + 'category=' + category.value;
    console.log('requestURL', requestUrl);
    createRequest(requestUrl, quizUISuccess, quizUIError);
};

/*
 * Add an event listener to form
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


var d = document,
        container = d.querySelector('#triviaContainer'),
        totalQuest = container.getAttribute('data-records'),
        selectForm = container.appendChild(d.createElement('form')),
        hiddenField = selectForm.appendChild((d.createElement('input'))),
        setLabelEle = selectForm.appendChild(d.createElement('label')),
        selectCatEle = selectForm.appendChild(d.createElement('select')),
        optionEle1 = d.createElement('option'),
        optionEle2 = d.createElement('option'),
        optionEle3 = d.createElement('option');
console.log(container);

/*
 * Wait until the DOM is load to Create Form and Load Data From Form
 * Selection element. 
 */
window.addEventListener('DOMContentLoaded', () => {

    createDynamicForm();
    const category =d.querySelector('#category');
    console.log('Category', category);

    /*
     * Send Trivia Category to fetch Quiz Data from MySQL Database
     */
    category.addEventListener('change', selectCat);

});


