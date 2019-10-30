import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-recap',
  templateUrl: './data-recap.component.html',
  styleUrls: ['./data-recap.component.scss']
})

export class DataRecapComponent implements OnInit {

  users: Observable<User>;

  constructor(private store: Store) {
    this.users = this.store.select(state => state.users.users);
   }

  ngOnInit() {
  }
}
