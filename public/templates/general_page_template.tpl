<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{block name=title}Pepster's Place{/block}</title>
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="shortcut icon" href="favicon.ico" >
        <script src='https://www.google.com/recaptcha/api.js'></script>
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

            {block name=navigationTemplate}

                <div class="navigation">
                    <ul id="menu">
                        <li><a class="{$highlight[0]}" href="index.php">Home</a></li>


                        {if $display_status ne "member_page.php"}
                            <li><a class="{$highlight[1]}" href="about.php">About</a></li>    


                        {/if}

                        
                        <li><a class="{$highlight[3]}" href="gallery.php">Gallery</a></li>
                            {if $display_status eq "member_page.php"}
                            <li><a class="{$highlight[5]}" href="member_page.php">Member</a></li>
                            <li><a class="{$highlight[5]}" href="logout.php">Logout</a></li>
                            {else} 
                            <li><a class="{$highlight[5]}" href="blog.php">Blog</a></li> 
                            {/if} 

                        {if $display_status eq "blog.php" and $display_status ne "member_page.php"}
                            <li><a class="{$highlight[0]}" href="login.php">Login</a></li>
                            {/if}
                        <li><a class="{$highlight[4]}" href="contact.php">Contact</a></li>
                        <!--
                        <li><a class="{$highlight[6]}" href="trivia.php">Trivia</a></li>
                        -->
                        <li><a class="{$highlight[6]}" href="quiz.php">Trivia</a></li>
                    </ul>                  
                </div>
                <div class="holidayNotice">
                    <h4>{$holidayMessage}</h4>
                </div>
            {/block}

            {block name=headerTemplate}
                <div class="header">
                    <h2 class="logo"><span>The Miniature Photographer</span> <a href="index.php"></a></h2>                   
                        {include file="calendar_template.tpl"}
                </div>
            {/block}


            {block name=body}
                {$journal}
            {/block}
            {block name=aside}
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
            {/block}

            <div class="footer">
                <p class="page-info">&copy;2019 The Miniature Photographer</p>
            </div>
        </div>
            
        <script src="assets/js/delete.js"></script>
        <script src="assets/js/myLightRoom.js"></script>  
        <script src="assets/js/showLogin.js"></script>
        <script src="assets/js/pagination.js"></script>
        {block name=trivijs}
            <!-- Trivia Game JavaScript -->
        {/block}

    </body>
</html>