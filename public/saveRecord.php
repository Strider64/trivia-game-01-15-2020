<?php

require_once '../private/initialize.php';

use Library\Trivia\Trivia;


$trivia = new Trivia();

$data = json_decode(file_get_contents('php://input'), true);

$result = $trivia->update($data);

if ($result) {
    output('Data Successfully Updated');
}


function errorOutput($output, $code = 500) {
    http_response_code($code);
    echo json_encode($output);
}

function output($output) {
    http_response_code(200);
    echo json_encode($output);
}