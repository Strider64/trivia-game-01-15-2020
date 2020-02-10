<?php

require_once '../private/initialize.php';

use Library\Trivia\Trivia;

/* Makes it so we don't have to decode the json coming from javascript */
header('Content-type: application/json');


$trivia = new Trivia();


$api_key = htmlspecialchars($_GET['api_key']);

if ($api_key === $_SESSION['api_key']) {
    $trivia = new Trivia();

    $data = $trivia->fetchData();
    output($data);
}

function errorOutput($output, $code = 500) {
    http_response_code($code);
    echo json_encode($output);
}

///*
// * If everything validates OK then send success message to Ajax / JavaScript
// */

/*
 * After converting data array to JSON send back to javascript using
 * this function.
 */
function output($output) {
    http_response_code(200);
    echo json_encode($output);
}
