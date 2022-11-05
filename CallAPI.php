<?php
    include 'APIkey.php';
    $response = file_get_contents('https://api.waqi.info/feed/' . $_GET["city"] . '/?token=' . $APIkey);
    echo $response;
?>
