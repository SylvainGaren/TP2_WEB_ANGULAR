import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Product } from './model/products';
import { environment } from '../environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { User } from './model/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

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

  public getProductById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendProduct).pipe(map(p => p.filter(p=>p.id == id)));
  }

  public filter() {
    this.obs = this.getProducts();

    this.obs.subscribe((value) => {
      this.productsTab = value;
    });
    // me print undefined
    console.log(this.productsTab);
  }

  public addUser(user: any) {
    return this.http.post<JSON>(environment.backendPhp, user).subscribe(r=>{});
  }

  public getTest() {
    return this.http.get<string>(environment.backendGet);
  }
}
