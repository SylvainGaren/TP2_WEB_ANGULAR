<?php

require 'vendor/autoload.php';
include_once 'controller/clientController.php';



$app = new \Slim\App;

$app->post('/client', '/controller/controllerClient/addClient');

$json = file_get_contents("ressource/data.json");
echo $json;


$app->run();

?>