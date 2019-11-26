import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products';
import { ApiListService } from '../api-list.service';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  products: Observable<Product[]>;
  productTab: any;
  search: string;
  res: string;

  constructor(private apiService: ApiListService) { }

  ngOnInit() {
    this.products = this.apiService.getProducts();
    this.products.subscribe((value) => {
      this.productTab = value;
    });
  }

  affiche() {
    this.products.pipe(
      map(data => data.filter(w => w.author == this.search))
    ).subscribe((data: any) => this.res = data);
  }

}
