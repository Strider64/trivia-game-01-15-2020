'use strict';

const myLightBox = () => {
    const d = document;
    const shade = d.querySelector('div.shade'); // Shade Box
    const total = d.querySelector('#gallery').getAttribute('data-total'); // Total Images to Display
    const prevBtn = d.querySelector('#preSlide');
    const nextBtn = d.querySelector('#nextSlide');
    var count = 0;
    var picture = d.querySelector('#pictureELE'); // Large Picture in Shade Box:
    var addInfo = d.querySelector('#exifData'); // EXIF data from Camera:

    /* Exit myLightBox */
    const exitPicture = () => {
        shade.style.display = "none";
    };

    /* Display Shade Box */
    const displayPicture = (image, exifData) => {
        shade.style.display = "block";

        picture.setAttribute('src', image);
        addInfo.textContent = exifData;
    };

    const prevPic = (e) => {
        e.preventDefault();
        if (parseInt(count) > 1) {
            count = parseInt(count) - 1;
        } else {
            count = parseInt(total);
        }
        const image = d.querySelector('#image' + count).getAttribute('href');
        const exif = d.querySelector('#image' + count).getAttribute('data-exif');

        displayPicture(image, exif);
    };

    const nextPic = (e) => {
        e.preventDefault();

        console.log(picture);
        if (count <= parseInt(total) - 1) {
            count = parseInt(count) + 1;
        } else {
            count = 1;
        }
        const image = d.querySelector('#image' + count).getAttribute('href');
        const exif = d.querySelector('#image' + count).getAttribute('data-exif');
        
        displayPicture(image, exif);

    };

    /* Display User's Selection in Shade Box */
    const startLightBox = (e) => {
        //console.log(e.target.classList);
        if (e.target.classList.contains('menuExit') || e.target.classList.contains('logo'))
            return; // Don't Fire e.preventDefault for nav menu

        /* Exit Slide Show when exit button is clicked */
        if (e.target.getAttribute('id') === "exitBtn") {
            exitPicture();
        }
        ;
        e.preventDefault();

        if (!e.target.classList.contains('blogBox'))
            return; // Only fire if image is selected:

        var image = e.target.parentNode.getAttribute("href"); // Grab Current Large Image:
        var exifData = e.target.parentNode.getAttribute('data-exif'); // Grab Current EXIF data:

        displayPicture(image, exifData);
        count = parseInt(e.target.parentNode.getAttribute('data-picture')) + 1; // Current image location:
        prevBtn.addEventListener('click', prevPic, false);
        nextBtn.addEventListener('click', nextPic, false);
    };

    d.addEventListener('click', startLightBox, false);
};

myLightBox(); // Start myLightBox:




