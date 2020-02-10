<?php

require_once '../private/initialize.php';

use Library\Journal\Journal;

$write_update = new Journal();

confirm_user_logged_in();
is_session_valid();
$id = filter_input(INPUT_GET, 'article_id', FILTER_SANITIZE_NUMBER_INT);
//$id = 21;
$action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

if (isset($action) && $action === 'enter') {
    $data['rating'] = filter_input(INPUT_POST, 'rating', FILTER_SANITIZE_NUMBER_INT);
    $data['id'] = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
    $data['category'] = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $data['heading'] = filter_input(INPUT_POST, 'heading', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $data['content'] = filter_input(INPUT_POST, 'content', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $update = $write_update->update($data);
    if ($update) {
        header("Location: edit.php?article_id=" . $data['id']);
        exit();
    }
}



$cms = $write_update->editArticle($id);

//echo "<pre>" . print_r($cms, 1) . "</pre>";

include '../private/includes/header.inc.php';
?>
<section class="main">
    <form id="dataEntry" action="process.php" method="post" enctype="multipart/form-data">
        <img class="home-main-pic" src="<?= $cms->thumb_path; ?>" alt="Picture for Journal Entry">
        <br><br>
        <fieldset id="mainEntry">
            <legend>Edit Text</legend>

            <input type="hidden" name="id" value="<?= $cms->id ?>">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="image_path" value="<?= $cms->image_path ?>">
            <input type="hidden" name="page_name" value="<?= $cms->page_name; ?>">
            <input type="hidden" name="user_id" value="<?= $cms->user_id; ?>">
            <input type="hidden" name="insert_image" value="">
            <select class="select-css" name="rating">
                <option value="<?= $cms->rating ?>"><?= $cms->rating; ?> Star(s)</option>
                <option value="0">No Star</option>
                <option value="1">One Star</option>
                <option value="2">Two Stars</option>
                <option value="3">Three Stars</option>
                <option value="4">Four Stars</option>
                <option value="5">Five Stars</option>
            </select>
            <select class="select-css" name="category">
                <option value="<?= $cms->category; ?>"><?= $cms->category; ?></option>
                <option value="wildlife">Wildlife</option>
                <option value="lego">LEGO</option>
                <option value="portraits-landscapes">Portraits / Landscapes</option>
                <option value="other">Other</option>
            </select> 
            <label class="inputLabel" for="heading">Heading</label>
            <input id="heading" type="text" name="heading" value="<?= $cms->heading; ?>" tabindex="1" required autofocus>
            <label class="textareaLabel" for="content">Content</label>
            <textarea id="content" name="content" tabindex="2"><?= $cms->content; ?></textarea>
            <input type="submit" name="submit" value="enter">
        </fieldset>
    </form>
</section>
<?php

include '../private/includes/footer.inc.php';
