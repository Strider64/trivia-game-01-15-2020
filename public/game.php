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
        <title>Trivia</title>
        <link rel="shortcut icon" href="favicon.ico" >


        <script type="text/javascript"src="assets/js/game.js" defer></script>


        <link href="https://fonts.googleapis.com/css?family=Teko:400,700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="assets/css/quizStyling.css">
    </head>
    <body>
        <div id="pictureBox" class="shade">

            <div id="picture">
                <div class="play">
                    <button class="controls" id="pause">Play</button>
                </div>



                <img id="pictureELE" src="assets/large/img-photos-1554677976.jpg" alt="Big Screen Picture">


                <div class="exifInfo">
                    <p id="exifData"></p>
                </div>  
                <div class="exitBtn">
                    <a id="exitBtn" class="btn" href="#">&#8592; Exit</a>
                </div>
            </div>
            <div class="prevSlide">
                <a id="preSlide" href="#">&#8592; Prev</a>
            </div>
            <div class="nextSlide">
                <a id="nextSlide" href="#">Next &#8594;</a>  
            </div>

        </div>

        <div id="page">

            <header>
                <a class="logo" title="Miniature Photographer Logo" href="index.php"><span>Miniature Photographer Logo</span></a>
                <div class="intro">
                    <h1>The Miniature Photographer</h1>
                    <a class="btn menuExit" title="My LinkedIn Page" href="https://www.linkedin.com/in/johnpepp/">LinkedIn Page</a>
                </div>
            </header>
            <section class="main">

                <form id="gameCat" action="game.php" method="post">
                    <select id="selectCat" class="select-css" name="category" tabindex="1">
                        <option value="photography">Photography</option>
                        <option value="movie">Movie</option>
                        <option value="space">Space</option>
                    </select>
                </form>
                <div id="gameTitle">
                    <h2 class="gameTitle">Trivia Game</h2>
                </div>
                <div class="triviaContainer" data-key="<?php echo $_SESSION['api_key']; ?>" data-records=" ">             
                    <div id="mainGame">
                        <div id="headerStyle" data-user="">
                            <h2>Time Left: <span id="clock"></span></h2>
                        </div>
                        <div id="triviaSection" data-correct="">
                            <div id="questionBox">
                                <h2 id="question">What is the Question?</h2>
                            </div>
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

            </section> <!-- End of Section -->
            <?php include '../private/includes/navigation.inc.php'; ?>
            <footer>
                &copy; The Miniature Photographer
                <div class="content">
                    <a class="menuExit" title="Facebook Miniature Photographer" href="https://www.facebook.com/Pepster64/">Facebook Miniature Photographer Page</a>
                    <!--        <a title="Terms of Service" href="#">Terms of Service</a>-->
                </div>
            </footer>
        </div>



    </body>
</html>
