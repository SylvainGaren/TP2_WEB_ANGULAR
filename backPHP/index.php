<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: *");
use \Firebase\JWT\JWT;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'vendor/autoload.php';


// middleware pour le jeton
const JWT_SECRET = "makey1234567";

$jwt = new \Slim\Middleware\JwtAuthentication([

"path" => "/api",
"secure" => false,
"secret" => JWT_SECRET,
"passthrough" => ["/login"],
"attribute" => "decoded_token_data",
"algorithm" => ["HS256"],
"error" => function ($response, $arguments) {
                $data = array('ERREUR' => 'ERREUR', 'ERREUR' => 'AUTO');
                return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
            }

]);

function addClient($request,$response,$args) {

    $body = $request->getParsedBody(); // Parse le body
    echo "Body :! " + $body;
    //$id = $body['nom']; // Data du formulaire
    $nom = $body['nom']; // Data du formulaire
    $surname = $body['prenom']; // Data du formulaire
    // AJOUT
    try {
        // On essayes de récupérer le contenu existant
        $s_file = 'ressource/data.json';
        $s_fileData = file_get_contents($s_file);
         
        if( !$s_fileData || strlen($s_fileData) == 0 ) {
            // On crée le tableau JSON
            $tableau_pour_json = array();
        } else {
            // On récupère le JSON dans un tableau PHP
            $tableau_pour_json = json_decode($s_fileData, true);
        }
         
        // On ajoute le nouvel élement
        array_push( $tableau_pour_json, array(
            'id' => "2",
            'name' => $nom,
            'surname' => $surname
        ));
        // On réencode en JSON
        $contenu_json = json_encode($tableau_pour_json);
         
        // On stocke tout le JSON
        file_put_contents($s_file, $contenu_json);
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }

   return $response->write ("work done");
}

function checkClient($request,$response,$args) {
    $body = $request->getParsedBody(); // Parse le body
    $name = $body['name']; // Data du formulaire
    $password = $body['password']; // Data du formulaire
    echo "azdazd";
    
    try {
        // On essayes de récupérer le contenu existant
        $s_file = 'ressource/data.json';
        $s_fileData = file_get_contents($s_file);
         
        if( !$s_fileData || strlen($s_fileData) == 0 ) {
            // On renvoie une erreur
            return $response->write ("false");
        } else {
            $res = false;
            // On récupère le JSON dans un tableau PHP
            $tableau_pour_json = json_decode($s_fileData, true);
            foreach($tableau_pour_json as $v){
                if ($v['name'] == $name) {
                    $res = true;
                    break;
                }
            }
        }
         
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }
    if ($res == true) {
        return $response->write ("true");   
    }
    else {
        return $response->write ("false");
    }
}

function login ($request, $response, $args) {
    echo "login";
    $userid = "emma";
    $email = "emma@emma.fr";
    $issuedAt = time();
    $expirationTime = $issuedAt + 60; // jwt valid for 60 seconds from the issued time
    $payload = array(
    'userid' => $userid,
    'iat' => $issuedAt,
    'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    
    $response = $response->withHeader("Authorization", "Bearer {$token}")->withHeader("Content-Type", "application/json");
    
    $data = array("name" => "Emma", "age" => 48);
    return $response->withHeader("Content-Type", "application/json")->withJson($data);
}


$app = new \Slim\App;

$app->post('/client', 'addClient');
$app->post('/checkUser', 'checkClient');
$app->get('/login', 'login');
$app->add($jwt);
$app->run();

?>