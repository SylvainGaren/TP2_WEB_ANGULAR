import { Component, OnInit, Output } from '@angular/core';
import { NgForm, FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRecap } from '../actions/addRecap-action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { ApiListService } from '../api-list.service';
import { UserState } from '../state/user-state';
import { User } from '../model/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  recap: string;
  validChangeVal: boolean = false;
  numeroTel: string;
  valPays: string;
  errorMessage: string = "Quelques erreurs de saisies :";

  Name: string;
  Prenom: string;
  Adresse: string;
  Cp: string;
  Ville: string;
  Tel: string;
  Email: string;
  Civilite: string;
  Login: string;
  pays: string;

  constructor(private formBuilder: FormBuilder, private store : Store, private router: Router, private apiService: ApiListService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Prenom: ['', Validators.required],
      Adresse: ['', Validators.required],
      Cp: ['', [Validators.required, Validators.minLength(5)]],
      Ville: ['', Validators.required],
      Tel: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Civilite: ['', Validators.required],
      Login: ['', Validators.required],
      Pwd: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPass: ['', Validators.required],
      pays: ['', Validators.required]
    });
    
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    var tel = this.verifyTel();
    var pwd = this.checkPassword();

    // si formulaire invalide
    if (this.registerForm.invalid) {
      alert('Formulaire invalide');
      return;
    }
    else if (!tel || !pwd) {
      console.log("tel ou mdr pas bon");
      this.errorMessage = "Il y a un probleme dans le mot de passe ou le numéro de téléphone";
    }
    else {
      alert('SUCCESS');
      let testSec = JSON.stringify({"nom": this.registerForm.value.Name, "prenom": this.registerForm.value.Prenom});
      let user: User;
      user = new User(this.registerForm.value.Name, this.registerForm.value.Prenom);
      /*user.nom = this.registerForm.value.Name;
      user.prenom = this.registerForm.value.Prenom;
      user.adresse = this.registerForm.value.Adresse;
      user.cp = this.registerForm.value.Cp;
      user.ville = this.registerForm.value.Ville;
      user.tel = this.registerForm.value.Tel;
      user.email = this.registerForm.value.Email;
      user.civilite = this.registerForm.value.Civilite;
      user.identifiant = this.registerForm.value.Login;
      user.pays = this.registerForm.value.pays;*/

      this.apiService.addUser(testSec);
      //this.apiService.getTest().subscribe(r=>{});
      this.submitted = true;
        
      this.addRecap (this.registerForm.value.Name, this.registerForm.value.Prenom, this.registerForm.value.Adresse, this.registerForm.value.Cp, this.registerForm.value.Ville, this.registerForm.value.Tel, this.registerForm.value.Email, this.registerForm.value.Civilite, this.registerForm.value.Login, this.registerForm.value.pays);
      this.router.navigate(['/auth']);
      
    }
  }

  addRecap(nom: string, prenom: string, adresse: string, cp: string, ville: string, tel: string, email: string, civilite: string, identifiant: string, pays: string) { 
    this.store.dispatch(new AddRecap({ nom, prenom, adresse, cp, ville, tel, email, civilite, identifiant, pays })); 
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
  }

  verifyTel(): boolean {
    var phoneNumber = /[0-9-()+]{3,20}/;
    var valid = false;
    var phone = this.registerForm.value.Tel;
    
    if (phone != "") {
      if (phone.match(phoneNumber)) {
        valid = true;
      }
    }
    else {
      valid = false;
    }
    return valid;
  }

  // ma fonction qui vérifie le champ password
  checkPassword() {
    var pass = this.registerForm.value.Pwd;
    var confirmPass = this.registerForm.value.ConfirmPass;
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
}
