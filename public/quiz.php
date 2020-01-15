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

$highlight = ["normal", "normal", "normal", "normal", "normal", "normal", "selected"];

if (is_logged_in()) {
    $smarty->assign('display_status', true);
} else {
    $smarty->assign('display_status', false);
}

$smarty->assign('categories', $categories);
$smarty->assign('holidayMessage', $holiday_message);
$smarty->assign('highlight', $highlight);
$smarty->assign('calendar', $calendar);
$title = "IntoXication Trivia";
$smarty->assign("title", $title);
$smarty->display('quiz.tpl');
