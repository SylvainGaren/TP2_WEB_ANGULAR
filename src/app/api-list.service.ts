import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product } from './model/products';
import { environment } from 'src/environments/environment';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiListService {

  private obs: Observable<Product[]>;
  productsTab: any;

  constructor(private http:HttpClient) { }

  public getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendProduct);
  }

  public filter() {
    this.obs = this.getProducts();
    this.obs.subscribe((value) => {
      this.productsTab = [
        {author: value[0].author, productName: value[0].productName, description: value[0].description},
        {author: value[1].author, productName: value[1].productName, description: value[1].description},
        {author: value[2].author, productName: value[2].productName, description: value[2].description},
        {author: value[3].author, productName: value[3].productName, description: value[3].description},
        {author: value[4].author, productName: value[4].productName, description: value[4].description},
        {author: value[5].author, productName: value[5].productName, description: value[5].description},
      ];
    });
    // me print undefined
    console.log(this.productsTab);
  }
}
