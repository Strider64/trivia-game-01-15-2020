<?php
require_once '../private/initialize.php';

use Library\Read\Read;
use Library\Database\Database as DB;

$_SESSION['api_key'] = bin2hex(random_bytes(32)); // 64 characters long
?>


<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Stay Sober Quiz</title>
        <link rel="shortcut icon" href="favicon.ico" >
        <link rel="stylesheet" href="assets/css/quizStyling.css">

    </head>
    <body>
        <div class="container">
            <div class="triviaContainer" data-key="<?php echo $_SESSION['api_key'] ?>" data-records=" ">
                <form id="categories-form" action=" " method="post">
                    <input type="hidden" name="modify" value="edit_entry">
                    <label for="category">Trivia Category</label>
                    <select id="category" name="category">
                        <option value=" ">Select Category</option>
                        <option value="movie">movie</option>
                        <option value="space">space</option></select>
                </form>
                <div id="mainGame">
                    <div id="headerStyle">
                        <h1 id="categorySubject">Category</h1>
                        <h2 id="clock"></h2>
                    </div>
                    <div id="triviaSection" data-correct="">
                        <h2 id="question">What is the Question?</h2>
                        <div id="buttonContainer"></div>
                    </div>
                    <div id="playerStats">
                        <h2 id="score">Score 0 Points</h2>
                        <h2 id="percent">100%</h2>
                    </div>
                    <div id="nextStyle">
                        <button id="next" class="nextBtn">Next</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="assets/js/game.js"></script>
    </body>
</html>
