import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  countProducts: number;

  constructor(private store: Store) {
    this.store.select(state => state.panier.panier).subscribe (u => this.countProducts = u.length);
   }

  ngOnInit() {
  }

}
