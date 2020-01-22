<?php

require_once '../private/initialize.php';

use Library\Trivia\Trivia;

/* Makes it so we don't have to decode the json coming from JQuery */
header('Content-type: application/json');


$trivia = new Trivia();

$category = htmlspecialchars($_GET['category']);
$api_key = htmlspecialchars($_GET['api_key']);

if ($api_key === $_SESSION['api_key']) {
    if (isset($category)) {
        $data = $trivia->read($category);      
        $mData = [];
        $answers = [];
        $finished = [];
        $index = 0; // Index for answers array:
        $indexArray = 0; // Index for database table array:
        
        /*
         * Put database table in proper array format in order that
         * JSON will work properly.
         */
        foreach ($data as $qdata) {
            foreach ($qdata as $key => $value) {
                switch ($key) {
                    case 'answer1':
                        $answers['answers'][$index] = $value;
                        break;
                    case 'answer2':
                        $answers['answers'][$index + 1] = $value;
                        break;
                    case 'answer3':
                        $answers['answers'][$index + 2] = $value;
                        break;
                    case 'answer4':
                        $answers['answers'][$index + 3] = $value;
                        break;
                }
            } // foreach inner

            unset($qdata['answer1']);
            unset($qdata['answer2']);
            unset($qdata['answer3']);
            unset($qdata['answer4']);
            
            $finished = array_merge($qdata, $answers);
            $mData[$indexArray] = $finished;
            $indexArray++;
        }

        output($mData); // zSend properly formatted array back to javascript:
    }
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
