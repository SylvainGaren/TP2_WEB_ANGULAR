import { Component, OnInit } from '@angular/core';
import { ApiListService } from '../api-list.service';
import { Observable } from 'rxjs';
import { Product } from '../model/products';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private apiService: ApiListService) { }

  ngOnInit() {
    this.products = this.apiService.getProducts();
  }

  affiche() {
    this.apiService.filter();
  }

}
