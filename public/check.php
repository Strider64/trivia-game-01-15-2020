<?php

require_once '../private/initialize.php';

use Library\Trivia\Trivia;

/* Makes it so we don't have to decode the json coming from JQuery */
header('Content-type: application/json');


$trivia = new Trivia();
$id = htmlspecialchars($_GET['id']);

if (isset($id)) {
    
    $data = $trivia->check($id);
    output($data);

}

function errorOutput($output, $code = 500) {
    http_response_code($code);
    echo json_encode($output);
}


/*
 * After converting data array to JSON send back to javascript using
 * this function.
 */
function output($output) {
    http_response_code(200);
    echo json_encode($output);
}