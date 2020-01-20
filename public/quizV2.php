<?php
require_once '../private/initialize.php';

use Library\Read\Read;
use Library\Database\Database as DB;

$categories = [];

$db = DB::getInstance();
$pdo = $db->getConnection();

$stmt = $pdo->query('SELECT category FROM trivia_questions'); // Grab ALL the categories:
/*
 * Only put unique category into categories array
 */
while ($row = $stmt->fetch()) {
    if (!in_array($row['category'], $categories)) {
        array_push($categories, $row['category']);
    }
}
$_SESSION['api_key'] = bin2hex(random_bytes(32)); // 64 characters long

$highlight = ["normal", "normal", "normal", "normal", "normal", "normal", "selected"];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>
            IntoXication Trivia
        </title>
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="shortcut icon" href="favicon.ico" >
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

    </head>
    <body id="exit-frame">

        <div id="pictureBox" class="shade">
            <div class="exit-slideshow">
                <a id="btn-slideshow" class="btn-slideshow" href="#">&#8592; Exit</a>
            </div>
            <div class="controls-background">
                <button class="controls" id="pause">Play</button>
            </div>
            <div class="right-column">

            </div>
            <div class="prev-grid">
                <a id="preSlide" href="#">Prev</a>
            </div>

            <img id="pictureELE" class="slide-grid" src="assets/images/img-duck-001.png" alt="Big Screen Picture">

            <div class="next-grid">
                <a id="nextSlide" href="#">Next</a>  
            </div>
            <div class="additional-info">
                <p id="exifData">Additional Info Coming Soon!</p>
            </div>
        </div>

        <div id="container" class="container paper">



            <div class="navigation">
                <ul id="menu">
                    <li><a class="normal" href="index.php">Home</a></li>
                    <li><a class="normal" href="about.php">About</a></li>    
                    <li><a class="normal" href="gallery.php">Gallery</a></li>
                    <li><a class="normal" href="blog.php">Blog</a></li> 
                    <li><a class="normal" href="contact.php">Contact</a></li>
                    <li><a class="selected" href="quizV2.php">Trivia</a></li>
                </ul>                  
            </div>

            <div class="header">
                <h2 class="logo"><span>The Miniature Photographer</span> <a href="index.php"></a></h2>                   
            </div>
            <div class="trivia-bg">
                <div id="triviaContainer" data-key="<?php echo $_SESSION['api_key'] ?>" data-records=" ">
                    <form id="categories-form" action=" " method="post">
                        <input type="hidden" name="modify" value="edit_entry">
                        <label for="category">Trivia Category</label>
                        <select id="category" name="category">
                            <option value=" ">Select Category</option>
                            <option value="movie">movie</option>
                            <option value="space">space</option></select>
                    </form>
                    <div id="textContainer"">
                        <h1 id="subject">Category</h1>
                        <h2 id="clock"></h2>
                    </div>
                    <div id="mainGame" data-id="1">
                        <div class="screen">
                            <h2 id="question">Blank Question</h2>
                        </div>
                        <button data-correct="1" class="buttonStyle" id="button1">Answer1</button>
                        <button data-correct="2" class="buttonStyle" id="button2">Answer2</button>
                        <button data-correct="3" class="buttonStyle" id="button3">Answer3</button>
                        <button data-correct="4" class="buttonStyle" id="button4">Answer4</button>
                    </div>
                    <div id="scoring">
                        <h2 id="score">Score 0 Points</h2>
                        <h2 id="percent">100%</h2>
                    </div>
                    <div id="nextStyle">
                        <button id="next" class="nextBtn">Next</button>
                    </div>


                    <div class="trivia-bg">
                        <div id="triviaContainer" data-key="<?php echo $_SESSION['api_key']; ?>">
                            <noscript>
                            <div id="noScriptBox">
                                <p class="noscript">Sorry, This quiz requires Javascript to be enabled!</p>
                                <a href="https://www.miniaturephotographer.com" title="The Miniature Photographer">https://www.miniaturephotographer.com</a>
                            </div>
                            </noscript>
                        </div>
                        <div id="support">
                            <h1>Help Support Intoxication Trivia</h1>
                            <p>First let me state that there will never be a fee to play this online trivia game. This is strictly a volunteer subscription in order to help support the development of this game. The cost is $5.00 per month which comes out to $60 per year. This will help me to continue developing this trivia game allowing me to make improvements and adding new features to the quiz game.</p>
                            <form id="subscribe" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                                <input type="hidden" name="cmd" value="_s-xclick">
                                <input type="hidden" name="hosted_button_id" value="NG2PKTBXEK6JN">
                                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                            </form>
                            <p>Feel free to unscribe at anytime by pressing the <A HREF="https://www.paypal.com/cgi-bin/webscr?cmd=_subscr-find&alias=9R2SNEGYQJLHL">
                                    <IMG SRC="https://www.paypalobjects.com/en_US/i/btn/btn_unsubscribe_LG.gif" BORDER="0">
                                </A> button.</p>

                        </div>




                    </div>
                </div>
            </div>
            <div class="aside">
                <div class="aside-container">
                    <div class="socialMediaStyle">
                        <ul class="socialIcons">
                            <li><a href="https://www.facebook.com/Pepster64/" target="_blank"><img src="assets/images/img-facebook-logo-25x25.png" alt="Pepster's Place Facebook Page" ></a></li>
                            <li><a href="http://twitter.com/#!/Strider64" target="_blank"><img src="assets/images/img-twitter-logo-25x25.png" alt="Pepster's Twitter Profile" ></a></li>
                            <li><a href="http://www.linkedin.com/in/johnpepp" target="_blank"><img src="assets/images/img-linkedin-logo-25x25.png" alt="John Pepp's LinkedIn Profile" ></a></li>
                            <li><a href="https://flic.kr/s/aHsmxu8zKC" target="_blank"><img src="assets/images/img-flickr-logo-100x25.png" alt="John Pepp's Flickr Profile" ></a></li>
                        </ul>
                    </div>

                </div>

                <h3 class="aside-heading">Favorite Links</h3>
                <a href="https://www.youtube.com/channel/UCAVZgMB5cZvsSWf7BI0btOA?view_as=subscriber"><img class="aside-images" src="assets/images/img-youtube-001.jpg" alt="YouTube Page"></a>
                <a href="https://froknowsphoto.com/"><img class="aside-images" src="assets/images/img-froknowsphoto-001.jpg" alt="Fro Knows Photo"></a>
                <a href="https://www.dpreview.com/forums/"><img class="aside-images" src="assets/images/img-dpreview-001.jpeg" alt="Dpreview Website"></a>
                <a href="https://bit.ly/2VwmUAJ"><img class="aside-images sony" src="assets/images/img-sony-alpha-logo-001.png" alt="Sony Alpha Cameras"></a>
            </div>


            <div class="footer">
                <p class="page-info">&copy;2019 The Miniature Photographer</p>
            </div>
        </div>

        <!-- Trivia Game JavaScript -->
        <script src="assets/js/promise.min.js"></script>
        <script src="assets/js/fetch.umd.js"></script>
        <script src="assets/js/app.js"></script>


    </body>
</html>