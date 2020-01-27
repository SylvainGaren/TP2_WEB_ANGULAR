<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Origin: *");
use \Firebase\JWT\JWT;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require 'vendor/autoload.php';
require 'models/Client.php';
require 'models/Produit.php';
require 'bootstrap.php';


// middleware pour le jeton
const JWT_SECRET = "makey1234567";

// Créer un jeton JWT pour authentifier l’utilisateur dans les échanges avec le BACKEND
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

function home($request,$response,$args) {
    global $entityManager;
    /*$client = new Client;   // création du client en faisant appel à la table mappée
    $client->setName('Dupond');
    $client->setSurname('surnom');
    $client->setEmail('surnom');
    $client->setPassword('surnom');
    echo "CLEINT : ";
    $entityManager->persist($client);
    $entityManager->flush();*/
    $produitRepository = $entityManager->getRepository('produit');
    $count = 1;
    $tableau_pour_json = array();

    while (($count) < 7) {
        $prod = $produitRepository->findOneBy(array('id' =>$count));
        array_push( $tableau_pour_json, array(
            'id' => $prod->getId(),
            'author' => $prod->getAuthor(),
            'name' => $prod->getName(),
            'description' => $prod->getDescription()
        ));
        $count++;
    }

    $contenu_json = json_encode($tableau_pour_json);
    //if (password_verify($password, $client->getPassword())) {
      //  $res = "true";
    //}
    return $response->write ($contenu_json);
}

// Récupérer les informations saisies via le formulaire compte client
function addClient($request,$response,$args) {
    global $entityManager;  // initialisation de l'entity manager
    $body = $request->getParsedBody(); // Parse le body
    echo $args;
    $nom = $body['nom']; // Data du formulaire
    $surname = $body['prenom']; // Data du formulaire
    $email = $body['email']; // Data du formulaire
    $password = $body['password']; // Data du formulaire
    $hash = password_hash($password, PASSWORD_BCRYPT); // hash du mot de passe

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

        // enregistrement du client dans la base
        $client = new Client;   // création du client en faisant appel à la table mappée
        $client->setName($nom);
        $client->setSurname($surname);
        $client->setEmail($email);
        $client->setPassword($hash);
        $entityManager->persist($client);
        $entityManager->flush();
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }

   return $response->write ($contenu_json);
}

// vérification du client lors de la connexion
function checkClient($request,$response,$args) {
    global $entityManager;  // initialisaton de l'entity manager
    $body = $request->getParsedBody(); // Parse le body
    $email = $body['email']; // Data du formulaire
    $password = $body['password']; // Data du formulaire
    $res = "false";
    
    try {
        // vérification du mot de passe
        $clientRepository = $entityManager->getRepository('client');
        $client = $clientRepository->findOneBy(array('email'=>$email));
        if (password_verify($password, $client->getPassword())) {
            $res = "true";
        }
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }
    if ($res == true) {
        return $response->write ($res);   
    }
    else {
        return $response->write ($res);
    }
}

// Utiliser le JWT pour y conserver vos données de session.
function login ($request, $response, $args) {
    $body = $request->getParsedBody();
    $userid = $body['mail'] ;
    $pass = $body['password'];
    $issuedAt = time();
    $expirationTime = $issuedAt + 60; // jwt valid for 60 seconds from the issued time
    $payload = array(
        'userid' => $userid,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    
    $response = $response->withHeader("Authorization", "Bearer {$token}")->withHeader("Content-Type", "application/json");
    
    $data = array('name' => 'Emma', 'age' => 48,'token' => $token_jwt);
    return $response->withHeader("Content-Type", "application/json")->withJson($data);
}

// renvoie tous les produits de la base
function getProducts($request, $response, $args) {
    global $entityManager;  // initialisaton de l'entity manager
    
    try {
        $produitRepository = $entityManager->getRepository('produit');
        $count = 1;
        $tableau_pour_json = array();

        while (($count) < 7) {
            $prod = $produitRepository->findOneBy(array('id' =>$count));
            array_push( $tableau_pour_json, array(
                'id' => $prod->getId(),
                'author' => $prod->getAuthor(),
                'name' => $prod->getName(),
                'description' => $prod->getDescription()
            ));
            $count++;
        }

        $contenu_json = json_encode($tableau_pour_json);
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }
    return $response->write ($contenu_json);
}

// Changement du mot de passe de l'utilisateur en le mettant à jour dans la base
function changePassword($request,$response,$args) {
    global $entityManager;  // initialisation de l'entity manager
    $body = $request->getParsedBody(); // Parse le body
    $nom = $body['nom']; // Data du formulaire
    $newPwd = $body['prenom']; // Data du formulaire
    $email = $body['email']; // Data du formulaire
    $password = $body['password']; // Data du formulaire
    $hash = password_hash($newPwd, PASSWORD_BCRYPT); // hash du mot de passe
    $res = "false";

    // AJOUT
    try {
        // vérification du mot de passe
        $clientRepository = $entityManager->getRepository('client');
        $client = $clientRepository->findOneBy(array('email'=>$email));
        if (password_verify($password, $client->getPassword())) {
            $res = "true";
        }

        // on effectue la mise à jour si l'ancien mot de passe est le bon
        if ($res == "true") {
            $client->setPassword($hash);
            $entityManager->persist($client);
            $entityManager->flush();
        }
    }
    catch( Exception $e ) {
        echo "Erreur : ".$e->getMessage();
    }

   return $response->write ($res);
}


$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// différentes routes
$app->get('/', 'home');
$app->post('/client', 'addClient');
$app->post('/checkUser', 'checkClient');
$app->post('/changePassword', 'changePassword');
$app->get('/login', 'login');
$app->get('/getProducts', 'getProducts');
$app->add($jwt);
$app->run();

?>