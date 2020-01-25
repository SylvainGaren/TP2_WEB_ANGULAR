import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../../../model/user';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiListService } from 'src/app/api-list.service';

@Component({
  selector: 'app-data-recap',
  templateUrl: './data-recap.component.html',
  styleUrls: ['./data-recap.component.scss']
})

export class DataRecapComponent implements OnInit {

  users: Observable<User>;
  changePwsForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder, private apiService: ApiListService) {
    this.users = this.store.select(state => state.users.users);
   }

  ngOnInit() {
    this.changePwsForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Pwd: ['', Validators.required],
      NewPwd: ['', Validators.required]
    });
  }

  onSubmit() {
    // envoie des données au serveur pour vérification
    let user: User;
    user = new User("", this.changePwsForm.value.NewPwd, this.changePwsForm.value.Name, this.changePwsForm.value.Pwd);
    this.apiService.changePwd(user);
}
}
