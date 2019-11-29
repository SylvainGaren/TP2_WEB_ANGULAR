export class User {
    nom: string;
    prenom: string;
    adresse: string;
    cp: string;
    ville: string;
    tel: string;
    email: string;
    civilite: string;
    identifiant: string;
    pays: string;

    constructor(nom: string, prenom: string) {
        this.nom = nom;
        this.prenom = prenom;
    }
}