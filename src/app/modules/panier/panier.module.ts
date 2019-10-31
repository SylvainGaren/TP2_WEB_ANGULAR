import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponentRoutingModule } from './panier-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PanierComponent } from './panier/panier.component';
import { ApiListService } from '../../api-list.service';


@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
    CommonModule,
    PanierComponentRoutingModule,
    HttpClientModule
  ],
  providers: [ApiListService]
})
export class PanierModule { }
