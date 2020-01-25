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
    password: string;

    constructor(nom: string, prenom: string, email: string, password: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
    }
}