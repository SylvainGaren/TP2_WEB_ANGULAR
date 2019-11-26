import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.scss']
})
export class TetiereComponent implements OnInit {

  nbProduits: number;
  
  constructor(private store: Store) {
    this.store.select(state => state.products.products).subscribe(p => this.nbProduits = p.length);
   }

  ngOnInit() {
  }

}
