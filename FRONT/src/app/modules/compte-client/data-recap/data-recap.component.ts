import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../../../model/user';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiListService } from 'src/app/api-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-recap',
  templateUrl: './data-recap.component.html',
  styleUrls: ['./data-recap.component.scss']
})

export class DataRecapComponent implements OnInit {

  users: Observable<User>;
  changePwsForm: FormGroup;
  UnsubForm: FormGroup;
  apiChangePassword: any;
  apiCall: any;

  constructor(private store: Store, private formBuilder: FormBuilder, private apiService: ApiListService, private router: Router) {
    this.users = this.store.select(state => state.users.users);
   }

  ngOnInit() {
    // initialisation du formulaire de changement de mot de passe
    this.changePwsForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pwd: ['', Validators.required],
      NewPwd: ['', Validators.required]
    });

    // intialisation du formulaire de désinscription
    // initialisation du formulaire
    this.UnsubForm = this.formBuilder.group({
      NameUnsub: ['', Validators.required],
      PwdUnsub: ['', Validators.required]
    });
  }

  onSubmit() {
    // envoie des données au serveur pour vérification
    let user: User;
    user = new User("", this.changePwsForm.value.NewPwd, this.changePwsForm.value.Name, this.changePwsForm.value.Pwd);
    this.apiChangePassword = this.apiService.changePwd(user);
    this.apiChangePassword.subscribe(r=>{
      console.log(r);
      if (r == true) {
        alert("Password changed");
      }
      else {
        alert("Le mot de passe n'a pas été changé");
      }
    })
  }

  unsubscription() {
    // desinscription de l'utilisateur
    let user: User;
    user = new User("", "", this.UnsubForm.value.NameUnsub, this.UnsubForm.value.PwdUnsub);
    this.apiCall = this.apiService.unsubUser(user);
    this.apiCall.subscribe(r=>{
      console.log(r); 
      if (r == true) {
        alert("Unsub success");
        this.router.navigate(['/login']);
      }
      else {
        alert("vous vous etes trompé quelque part");
      }
    });
  }
}
