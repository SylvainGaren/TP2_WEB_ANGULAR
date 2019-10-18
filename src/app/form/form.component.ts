import { Component, OnInit, Output } from '@angular/core';
import { NgForm, FormArray } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // Valeurs en OUTPUT pour envoyer des informations au fils qui les récupérera dans un INPUT
  @Output() change: EventEmitter<string> = new EventEmitter<string>();  // evenement qui permettra d'envoyer les informations remplies par l'utilisateur (ormis le téléphone)
  @Output() telNumber: EventEmitter<string> = new EventEmitter<string>(); // evenement qui permettra d'envoyer le numéro de téléphone
  @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>(); // evenement qui permettra d'afficher ou non les informations saisies par l'utilisateur dans un récap
  @Output() valPaysFather: EventEmitter<string> = new EventEmitter<string>(); // evenement qui permettra d'envoyer la valeur du pays saisie par l'utilisateur

  recap: string;  // valeur récapitulative des données saisies par l'utilisateur
  valid: boolean = false;
  errorMessage: string = "Quelques erreurs de saisies :";
  numeroTel: string;
  validChangeVal: boolean = false;
  valPays: string;
  Tel: string = "";

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit(userForm:NgForm) {
    // valeurs booléennes pour chacun des champs pour valider ou non la saisie d'informations par l'utilisateur
    var nom = false;
    var prenom = false;
    var adresse = false;
    var cp = false;
    var login = false;
    var email = false;
    var tel = false;
    var pwd = false;
    var confirmPdw = false;

    // en fonction des erreurs présentes on remplit différents messages d'erreur qui seront ensuite affichés
    var nomError: string = "";
    var prenomError: string = "";
    var adresseError: string = "";
    var cpError: string = "";
    var loginError: string = "";
    var emailError: string = "";
    var telError: string = "";
    var pwdError: string = "";

    if (userForm.value.Name.length > 1) {
      nom = true;
      console.log("name ok");
    }
    else {
      nomError = "Le nom doit être renseigné et faire plus de 1 caractere";
    }

    if (userForm.value.Prenom.length > 1) {
      prenom = true;
      console.log("Prenom ok");
    }
    else {
      prenomError = "Le prenom doit être renseigné et faire plus de 1 caractere";
    }

    if (userForm.value.Adresse.length > 5) {
      adresse = true;
      console.log("Adresse ok");
    }
    else {
      adresseError = "L'adresse doit être renseignée et faire plus de 5 caracteres";
    }

    if (userForm.value.Cp.length == 5) {
      cp = true;
      console.log("Cp ok");
    }
    else {
      cpError = "Le code postal doit etre de 5 caracteres";
    }

    if (userForm.value.Login.length > 2) {
      login = true;
      console.log("Login ok");
    }
    else {
      loginError = "Le login doit etre supérieur à 2 caracteres";
    }
    
    if (this.checkEmail(userForm.value.Email)) {
      email = true;
      console.log("Email ok");
    }
    else {
      emailError = "Erreur dans l'email, il n'est pas de la bonne forme";
    }
    if (this.checkTel(userForm.value.Tel)) {
      tel = true;
      console.log("Tel ok");
    }
    else {
      telError = "Erreur dans le tel, il n'est pas de la bonne forme";
    }
    if (this.checkPassword(userForm.value.Pwd, userForm.value.ConfirmPass)) {
      pwd = true;
      confirmPdw = true;
      console.log("ok");
    }
    else {
      pwdError = "Les mots de passes doivent être les mêmes et supérieurs à 7 caracteres";
    }
    if (nom && prenom && adresse && cp && login && email && tel && pwd && confirmPdw) {
      alert("Tout est bon");
      this.recap = "Nom : " + userForm.value.Name + ", prenom : " + userForm.value.Prenom + ", adresse : " + userForm.value.Adresse + ", cp : " + userForm.value.Cp + ", login : " + userForm.value.Login + ", email : " + userForm.value.Email;
      this.change.emit(this.recap);
      this.numeroTel = userForm.value.Tel;
      this.telNumber.emit(this.numeroTel);
      this.validChangeVal = true;
      this.validChange.emit(this.validChangeVal);
      this.valPays = userForm.value.pays;
      this.valPaysFather.emit(this.valPays);
    }
    else {
      alert("Vérifiez vos saisies");
      this.valid = true;
      var nomError: string;
      var prenomError: string;
      var adresseError: string;
      var cpError: string;
      var loginError: string;
      var emailError: string;
      var telError: string;
      var pwdError: string;
      if (nomError != "") {
        this.errorMessage += " " + nomError;
      }
      if (prenomError != "") {
        this.errorMessage += " " + prenomError;
      }
      if (adresseError != "") {
        this.errorMessage += " " + adresseError;
      }
      if (cpError != "") {
        this.errorMessage += " " + cpError;
      }
      if (loginError != "") {
        this.errorMessage += " " + loginError;
      }
      if (emailError != "") {
        this.errorMessage += " " + emailError;
      }
      if (telError != "") {
        this.errorMessage += " " + telError;
      }
      if (pwdError != "") {
        this.errorMessage += " " + pwdError;
      }
    }
  }

  // ma fonction qui vérifie le champ password
  checkPassword(pass: string, confirmPass: string) {
    let valid = false;
    if (pass.length >= 8) {
      if (pass != "" && pass == confirmPass) {
        valid = true;
      }
      else {
        valid = false;
      }
    }
    else {
      valid = false;
    }
    return valid;
  }

  // ma fonction qui vérifie l'adresse mail
  checkEmail(mail: string) {
    var emailRegex = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$';
    var valid = false;
    if (mail.match(emailRegex)) {
      valid = true;
    }
    return valid;
  }

  // ma fonction qui vérifie le champ telephone
  checkTel(tel: string) {
    var phoneNumber = /[0-9-()+]{3,20}/;
    var valid = false;
    if (tel.match(phoneNumber)) {
      valid = true;
    }
    return valid;
  }

  // vérifier que tous les champs sont renseignés
  // ne fonctionne pas, je n'ai pas réussi à accéder aux éléments un par un dans le foreach
  checkFields(tab: Array<string>) {
    tab.forEach(function(elem) {
      console.log(elem);
    });
    return false;
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
  }

  verifyTel(): boolean {
    var phoneNumber = /[0-9-()+]{3,20}/;
    var valid = false;
    
    console.log(this.Tel);
    if (this.Tel != "") {
      if (this.Tel.match(phoneNumber)) {
        valid = true;
      }
    }
    else {
      valid = false;
    }
    return valid;
  }

}
