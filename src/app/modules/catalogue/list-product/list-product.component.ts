import { Component, OnInit } from '@angular/core';
import { ApiListService } from '../../../api-list.service';
import { Observable, from, of } from 'rxjs';
import { Product } from '../../../model/products';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../actions/addProductPanier-action';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Observable<Product[]>;
  product: string;

  constructor(private apiService: ApiListService, private store : Store) { }

  ngOnInit() {
    this.products = this.apiService.getProducts();
  }

  ajoutPanier(produit: Product) {
    this.addProduct(produit.id, produit.author, produit.productName, produit.description);
  }

  addProduct(id: number, author: string, productName: string, description: string) { 
    this.store.dispatch(new AddProduct({ id, author, productName, description })); 
  }
}
