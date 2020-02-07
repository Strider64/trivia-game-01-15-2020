<?php
require_once '../private/initialize.php';

use Library\Read\Read;
use Library\Database\Database as DB;

$_SESSION['api_key'] = bin2hex(random_bytes(32)); // 64 characters long
include '../private/includes/header.inc.php';
?>
<section class="main">
    <h2 class="gameTitle">Trivia Game</h2>
    <aside class="triviaContainer" data-key="<?php echo $_SESSION['api_key'] ?>" data-records=" ">             
        <div id="mainGame">
            <div id="headerStyle">
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

    </aside>

</section> <!-- End of Section -->
<?php
include '../private/includes/footer.inc.php';
