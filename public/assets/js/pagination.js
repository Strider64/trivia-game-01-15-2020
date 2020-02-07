'use strict';

const pagination = () => {

    const d = document;
    const pageTotal = d.querySelector('#gallery').getAttribute('data-total');
    const nextPage = d.querySelector('#nextPage');
    var prevPage = d.querySelector('#prePage');


    var page = 1;

    const forward = (e) => {
        e.preventDefault();
        if (page < pageTotal) {
            d.querySelector('#page' + page).style.display = "none";
            page += 1;
            d.querySelector('#page' + page).style.display = "block";
            //btn = document.getElementById("image" + page);
            
        } else {
            page = 1;
            d.querySelector('#page' + pageTotal).style.display = "none";
            d.querySelector('#page' + page).style.display = "block";
            //btn = document.getElementById("image1");

        }
        //console.log(d.getElementById("image" + page));
    };

    nextPage.addEventListener("click", forward, false);

    const reverse = (e) => {
        e.preventDefault();
        if (page > 1) {
            d.querySelector('#page' + page).style.display = "none";
            page -= 1;
            d.querySelector('#page' + page).style.display = "block";
            //btn = document.getElementById("image" + page);
        } else {
            d.querySelector('#page' + page).style.display = "none";
            page = pageTotal;
            d.querySelector('#page' + pageTotal).style.display = "block";
            //btn = document.getElementById("image" + pageTotal);
        }
    };

    prevPage.addEventListener("click", reverse, false);
};

pagination();
