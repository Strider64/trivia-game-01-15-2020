<?php
require_once '../private/initialize.php';

use Library\Trivia\Trivia;

$_SESSION['api_key'] = bin2hex(random_bytes(32)); // 64 characters long

confirm_user_logged_in();
is_session_valid();
include '../private/includes/header.inc.php';
?>
<section class="main">
    <div id="remote">
        <a id="ePrev" class="btn" title="Previous Button" href="#">Prev</a>
        <a id="eNext" class="btn" title="Next Button" href="#">Next</a>
    </div>
    <form id="editTrivia" action="editTrivia.php" method="post" data-key="<?= $_SESSION['api_key']; ?>">
        <fieldset>
            <legend id="legend">Edit Trivia</legend>
            <input id="id" type="hidden" name="id" value="0">
            <input id="user_id" type="hidden" name="user_id" value="">
            <select id="category" class="select-css" name="category" tabindex="1">
                <option id="setOption" value="" selected></option>
                <option value="photography">Photography</option>
                <option value="movie">Movie</option>
                <option value="space">Space</option>
            </select>
            <textarea id="addQuestion" name="question" tabindex="2" placeholder="Add question here..." autofocus></textarea>
            <label for="addAnswer1">Answer 1</label>
            <input id="addAnswer1" type="text" name="answer1" value="" tabindex="3">
            <label for="addAnswer2">Answer 2</label>
            <input id="addAnswer2" type="text" name="answer2" value="" tabindex="4">
            <label for="addAnswer3">Answer 3</label>
            <input id="addAnswer3" type="text" name="answer3" value="" tabindex="5">
            <label for="addAnswer4">Answer 4</label>
            <input id="addAnswer4" type="text" name="answer4" value="" tabindex="6">   
            <label for="addCorrect">Correct</label>
            <input id="addCorrect" type="text" name="correct" value="" tabindex="7">
            <input id="submitBtn" type="submit" name="submit" value="save" tabindex="8">
        </fieldset>
    </form>
</section>
<?php
include '../private/includes/footer.inc.php';
