<?php

require_once '../private/initialize.php';

use Library\Trivia\Trivia;

$create = new Trivia();
$data = [];

$submit = filter_input(INPUT_POST, 'submit', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
if (isset($submit) && $submit === 'submit') {
    $data['question'] = filter_input(INPUT_POST, 'question', FILTER_DEFAULT);
    $data['answer1'] = filter_input(INPUT_POST, 'answer1', FILTER_SANITIZE_SPECIAL_CHARS);
    $data['answer2'] = filter_input(INPUT_POST, 'answer2', FILTER_SANITIZE_SPECIAL_CHARS);
    $data['answer3'] = filter_input(INPUT_POST, 'answer3', FILTER_SANITIZE_SPECIAL_CHARS);
    $data['answer4'] = filter_input(INPUT_POST, 'answer4', FILTER_SANITIZE_SPECIAL_CHARS);
    $data['correct'] = filter_input(INPUT_POST, 'correct', FILTER_SANITIZE_SPECIAL_CHARS);
    $data['category'] = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_SPECIAL_CHARS);
    $result = $create->create($data);
    if ($result) {
        header("Location: trivMain.php");
        exit;
    }
}
confirm_user_logged_in();
is_session_valid();
include '../private/includes/header.inc.php';
?>
<section class="main">
    <form id="addTriviaQA" action="trivMain.php" method="post">
        <fieldset>
            <legend id="legend">Add Trivia Question(s)</legend>
            <input id="id" type="hidden" name="id" value="0">
            <input type="hidden" name="user_id" value="">
            <select class="select-css" name="category" tabindex="1">
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
            <label for="addCorrect">Answer</label>
            <input id="addCorrect" type="text" name="correct" value="" tabindex="7">
            <input id="submitBtn" type="submit" name="submit" value="submit" tabindex="8">
        </fieldset>


    </form>    
</section>
<?php

include '../private/includes/footer.inc.php';
