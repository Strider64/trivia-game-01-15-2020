<?php
require_once '../private/initialize.php';

use Library\Read\Read;

confirm_user_logged_in();
is_session_valid();

$display = new Read();
$index_page = $display->readBlog("index.php");
$blog = $display->readBlog("blog.php");
$calendarData = $display->readBlog("about.php");

$journal = array_merge($index_page, $blog, $calendarData);
//echo "<pre>" . print_r($journal,1 ) . "</pre>";
include '../private/includes/header.inc.php';
?>
<section class="main">
    <form id="dataEntry" action="process.php" method="post" enctype="multipart/form-data">
        <fieldset id="mainEntry">
            <legend>Journal Entry</legend>

            <div id="radio-toolbar">
                <input type="radio" id="radioBlog" name="page_name" value="blog.php" checked>
                <label for="radioBlog">Blog</label>

                <input type="radio" id="radioHome" name="page_name" value="index.php">
                <label for="radioHome">Home</label>

                <input type="radio" id="radioCalendar" name="page_name" value="about.php">
                <label for="radioCalendar">About</label> 
            </div>
            <p>&nbsp;</p>


            <input type="hidden" name="user_id" value="1">
            <input type="hidden" name="action" value="enter">
            <input type="hidden" name="insert_image" value="yes">

            <input id="imgBtn" type="file" name="file">
            <select class="select-css" name="rating">
                <option value="0">Rating (Defaut: Not Rated)</option>
                <option value="1">One Star</option>
                <option value="2">Two Stars</option>
                <option value="3">Three Stars</option>
                <option value="4">Four Stars</option>
                <option value="5">Five Stars</option>
            </select>    
            <select class="select-css" name="category">
                <option value="wildlife">Wildlife</option>
                <option value="lego">LEGO</option>
                <option value="portraits-landscapes">Portraits / Landscapes</option>
                <option value="other">Other</option>
            </select>                  
            <label class="inputLabel" for="heading">Heading</label>
            <input id="heading" type="text" name="heading" value="" tabindex="1" required autofocus>
            <label class="textareaLabel" for="content">Content</label>
            <textarea id="content" name="content" tabindex="2"></textarea>
            <input type="submit" name="submit" value="enter">
        </fieldset>
    </form>

    <div id="gallery" class="picture-box" data-total="<?php $counter = 1; ?>" >
        <?php foreach ($journal as $cms) { ?>
            <div class="article">
                <h2><?= $cms->heading; ?> <span class="subheading">by <?= $cms->author ?>  on <?= $cms->date_added ?></span></h2>
                <a class="myLightBox" href="<?= $cms->image_path; ?>" title="Picture Gallery" data-picture="<?= $counter ?>" data-exif="<?php
                if (!is_null($cms->Model)) {
                    echo $cms->Model . " --- " . $cms->FocalLength . " --- " . $cms->Aperture . " --- " . $cms->ISO . " --- " . $cms->ExposureTime;
                }
                ?>"><img class="editPic" src="<?= $cms->thumb_path; ?>" alt="Picture for Journal Entry"></a> 
                <hr>
                <p><?php echo nl2br($cms->content); ?></p>
                <a class="btn3" href="edit.php?article_id=><?= $cms->id; ?>">Edit</a>
                <a class="btn3" href="delete_entry.php?id=<?= $cms->id; ?>" data-confirm="Do you really want to delete this item?">Delete</a>
                <hr>
            <?php $counter += 1; ?>
            </div>
<?php } ?>
    </div>
</section>
<?php
include '../private/includes/footer.inc.php';
