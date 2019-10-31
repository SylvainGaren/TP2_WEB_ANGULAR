import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponentRoutingModule } from './panier-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiListService } from 'src/app/api-list.service';
import { PanierComponent } from './panier/panier.component';

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
