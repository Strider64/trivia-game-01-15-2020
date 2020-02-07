<!DOCTYPE html>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title><?php echo isset($title) ? $title : "Miniature Photographer"; ?></title>
        <link rel="shortcut icon" href="favicon.ico" >
        <script src='https://www.google.com/recaptcha/api.js'></script>
        <?php if ($pageName === 'triviaGame.php') { ?>
        <link href="https://fonts.googleapis.com/css?family=Teko:400,700&display=swap" rel="stylesheet">
        <?php } ?>
        <link rel="stylesheet" href="assets/css/quizStyling.css">
    </head>
    <body>
        <div id="pictureBox" class="shade">
            
            <div id="picture">
                <div class="play">
                    <button class="controls" id="pause">Play</button>
                </div>

                <div class="prevSlide">
                    <a id="preSlide" href="#">&#8592; Prev</a>
                </div>

                <img id="pictureELE" src="assets/large/img-photos-1554677976.jpg" alt="Big Screen Picture">

                <div class="nextSlide">
                    <a id="nextSlide" href="#">Next &#8594;</a>  
                </div>
                <div class="exifInfo">
                    <p id="exifData">Additional Info Coming Soon!</p>
                </div>  
                <div class="exitBtn">
                    <a id="exitBtn" class="btn" href="#">&#8592; Exit</a>
                </div>
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