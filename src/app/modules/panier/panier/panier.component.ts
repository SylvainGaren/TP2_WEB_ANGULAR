import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../model/products';
import { DelProduct } from '../../../actions/delProduitPanier-action';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  products: Observable<Product>;
  index: any;

  constructor(private store: Store) {
    
   }

  ngOnInit() {
    this.products = this.store.select(state => state.products.products);
  }

  supprimerPanier(i: any) {
    this.delProduct(i);
  }

  delProduct(i: any) { 
    this.store.dispatch(new DelProduct(i)); 
    this.products = this.store.select(state => state.products.products);
  }

}
