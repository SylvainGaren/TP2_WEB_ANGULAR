import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../model/products';
import { ApiListService } from '../../api-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: number = 0;
  products: Observable<Product[]>;

  constructor(private route: ActivatedRoute, private apiService: ApiListService) { 
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.products = this.apiService.getProductById(this.id);
  }

}
