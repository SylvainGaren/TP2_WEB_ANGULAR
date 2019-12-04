import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiListService } from '../api-list.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  Name: string;
  Pwd: string;

  constructor(private formBuilder: FormBuilder, private apiService: ApiListService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pwd: ['', Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
      // envoie des données au serveur pour vérification
      let userData = JSON.stringify({"name": this.loginForm.value.Name, "password": this.loginForm.value.Pwd});
      this.apiService.addUser(userData);
  }

}
