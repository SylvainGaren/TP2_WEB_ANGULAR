import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponentRoutingModule } from './catalogue-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiListService } from 'src/app/api-list.service';
import { ListProductComponent } from './list-product/list-product.component';
import { FilterComponent } from 'src/app/filter/filter.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    ListProductComponent,
    FilterComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CatalogueComponentRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiListService]
})
export class CatalogueModule { }
