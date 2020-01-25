<?php
class ClientController {
    
    private $_id;
    private $_name;
    private $_surname;

    function addClient($request,$response,$args) {

        $body = $request->getParsedBody(); // Parse le body
        
        $id = $body['x']; // Data du formulaire
        $nom = $body['x']; // Data du formulaire
        $surname = $body['x']; // Data du formulaire
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
                'id' => "mdr",
                'name' => "no",
                'surname' => "surname"
            ));
            // On réencode en JSON
            $contenu_json = json_encode($tableau_pour_json);
             
            // On stocke tout le JSON
            file_put_contents($s_file, $contenu_json);
            echo $contenu_json;
                 
            echo "Vos informations ont été enregistrées\n";
            $mdr = file_get_contents($s_file);

            echo $mdr;
        }
        catch( Exception $e ) {
            echo "Erreur : ".$e->getMessage();
        }
       echo "appel fonctionne";
       return $response->write ("dndsg");
    }
}
?>