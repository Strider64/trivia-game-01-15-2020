{extends file="general_page_template.tpl"}
{block name=title}
    {$title|escape}
{/block}
{block name=body}
    <div class="trivia-bg">
        <div id="triviaContainer">
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
        {block name=aside}


        {/block}
    </div>
{/block}




{block name=trivijs}
    <!-- Trivia Game JavaScript -->
    <script src="assets/js/promise.min.js"></script>
    <script src="assets/js/fetch.umd.js"></script>
    <script src="assets/js/quiz.js"></script>
{/block}