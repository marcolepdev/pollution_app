<!DOCTYPE html>

<?php
    require_once 'APIkey.php';
    fopen("city.json","w+");
    file_put_contents("city.json", file_get_contents('https://api.waqi.info/feed/' . $_GET["city"] . '/?token=' . $APIkey));
    header("Location: index.html");
?>
