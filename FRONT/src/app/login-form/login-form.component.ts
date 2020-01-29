import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiListService } from '../api-list.service';
import { User } from '../model/user';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscriber, Observable, Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  Name: string;
  Pwd: string;
  test: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiListService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pwd: ['', Validators.required]
    });
    this.apiService.getLogin();
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
      // envoie des données au serveur pour vérification
      let user: User;
      user = new User("", "", this.loginForm.value.Name, this.loginForm.value.Pwd);
      this.test = this.apiService.sendUser(user);
      this.test.subscribe(r=>{
        console.log(r); 
        if (r == true) {
          this.router.navigate(['/auth']);
        }
        else {
          this.router.navigate(['/login']);
        }
      });
  }

}
