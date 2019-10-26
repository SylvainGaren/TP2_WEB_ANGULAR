import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product } from './model/products';
import { environment } from '../environments/environment';

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
      this.productsTab = value;
    });
    // me print undefined
    console.log(this.productsTab);
  }
}
