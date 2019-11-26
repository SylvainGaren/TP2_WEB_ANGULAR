<?php
class Client {
    
    private $_id;
    private $_name;
    private $_surname;

    function addClient($request,$response,$args) {

        $s_file = 'ressource/data.json';
        $body = $request->getParsedBody(); // Parse le body
        $id = $body['id']; // Data du formulaire
        $nom = $body['nom']; // Data du formulaire
        $surname = $body['surname']; // Data du formulaire
        // AJOUT
        try {
            // On essayes de récupérer le contenu existant
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
                'id' => $id,
                'nom' => $nom,
                'surname' => $surname
            ));
            // On réencode en JSON
            $contenu_json = json_encode($tableau_pour_json);
             
            // On stocke tout le JSON
            file_put_contents($s_file, $contenu_json);
                 
            echo "Vos informations ont été enregistrées\n";
            echo $contenu_json;
        }
        catch( Exception $e ) {
            echo "Erreur : ".$e->getMessage();
        }
    }
}
?>