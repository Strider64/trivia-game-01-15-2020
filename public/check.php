<?php

require_once '../private/initialize.php';

/*
 * Database Connection 
 */
$db_options = array(
    /* important! use actual prepared statements (default: emulate prepared statements) */
    PDO::ATTR_EMULATE_PREPARES => false
    /* throw exceptions on errors (default: stay silent) */
    , PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    /* fetch associative arrays (default: mixed arrays)    */
    , PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
);
$pdo = new PDO('mysql:host=' . DATABASE_HOST . ';dbname=' . DATABASE_NAME . ';charset=utf8', DATABASE_USERNAME, DATABASE_PASSWORD, $db_options);

function check($id, $pdo) {

    $query = "SELECT id, correct FROM trivia_questions WHERE id=:id";
    $stmt = $pdo->prepare($query);

    $stmt->execute([':id' => $id]);

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    return $data;
}


/* Makes it so we don't have to decode the json coming from JQuery */
header('Content-type: application/json');

$id = htmlspecialchars($_GET['id']);
$api_key = htmlspecialchars($_GET['api_key']); // Not Need if you are not using:

if (isset($id) && $api_key === $_SESSION['api_key']) {

    $data = check($id, $pdo);
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
