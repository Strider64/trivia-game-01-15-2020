<nav>
    <ul>
        <li>
            <a class="menuExit"  title="Home Page" href="index.php">Home</a>



        </li>
        <li>
            <a class="menuExit"  title="Blog Page" href="blog.php"aria-haspopup='true'>Blog</a>
            <ul>
                <li>
                    <a class="menuExit"  title="Gallery" href="gallery.php" aria-haspopup='true'>Gallery</a>
                    <ul>
                        <?php
                        if (is_logged_in()) {
                            echo '<li>';
                            echo '<a class="menuExit" title="Member Page" href="member_page.php">Member</a>';
                            echo '</li>';
                            echo '<li>';
                            echo '<a id="maintenance" class="menuExit" title="Trivia Maintenance" href="trivMain.php">Maintenance</a>';
                            echo '</li>';
                            echo '<li>';
                            echo '<a id="editPage" class="menuExit" title="Edit Page" href="editTrivia.php">Edit</a>';
                            echo '</li>';
                        }
                        ?>
                        <li>
                            <?php echo (is_logged_in()) ? '<a class="menuExit" title="Logout" href="logout.php">Logout</a>' : '<a class="menuExit"  title="Login Page" href="login.php">Login</a>'; ?>
                        </li>

                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <a class="menuExit"  title="About Me" href="about.php">About</a>
        </li>
        <li>
            <a class="menuExit"  title="Contact Page" href="contact.php">Contact</a>
        </li>
        <li>
            <a id="photography" class="menuExit" data-category="movie" title="Trivia Game" href="game.php">Photography Trivia</a>
        </li>
    </ul>
</nav><!-- End of Navigation -->
<footer>
    &copy; The Miniature Photographer
    <div class="content">
        <a class="menuExit" title="Facebook Miniature Photographer" href="https://www.facebook.com/Pepster64/">Facebook Miniature Photographer Page</a>
        <!--        <a title="Terms of Service" href="#">Terms of Service</a>-->
    </div>
</footer>
</div>
<?php if ($basename === 'blog.php' || $basename === 'index.php' || $basename === 'about.php' || $basename === 'gallery.php') { ?>    
    <script src="assets/js/myLightRoom.js"></script>
<?php } ?>
<?php if ($basename === 'blog.php' || $basename === 'gallery.php') { ?>    
    <script src="assets/js/pagination.js"></script>
<?php } ?>
<?php if ($basename === 'game.php') { ?>
    <script src="assets/js/game.js"></script>
<?php } ?>
<?php if ($basename === 'editTrivia.php') { ?>
    <script src="assets/js/edit.js"></script>
<?php } ?>
</body>
</html>