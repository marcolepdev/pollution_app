<?php
    include 'APIkey.php';
    $response = file_get_contents('https://api.waqi.info/feed/' . $_POST['city'] . '/?token=' . $APIkey);
    echo $response;
?>
