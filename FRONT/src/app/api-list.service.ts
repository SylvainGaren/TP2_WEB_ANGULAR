import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'})
    }

  constructor(private http:HttpClient) { }

  // retourne tous les produits de la base pour les afficher dans le catalogue
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
  }

  public addUser(user: any) {
    this.httpOptions.headers.append ("Authorization","Bearer ${this.tokenParse}");
    return this.http.post<User>(environment.backendPhp, user, httpOptions);
  }

  public getLogin() {
    return this.http.get<string>(environment.backendGet);
  }

  public sendUser(data: any) {
    this.httpOptions.headers.append ("Authorization","Bearer ${this.tokenParse}");
    return this.http.post<User>(environment.backendCheckUser, data, httpOptions);
  }

  public changePwd(data: any) {
    this.httpOptions.headers.append ("Authorization","Bearer ${this.tokenParse}");
    return this.http.post<User>(environment.backendChangePwd, data, httpOptions);
  }

  public unsubUser(data: any) {
    this.httpOptions.headers.append ("Authorization","Bearer ${this.tokenParse}");
    return this.http.post<User>(environment.backendUnsubUser, data, httpOptions);
  }
}
