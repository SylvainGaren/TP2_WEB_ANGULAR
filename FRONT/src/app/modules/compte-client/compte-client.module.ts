import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompteClientComponentRoutingModule } from './compte-client-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataRecapComponent } from './data-recap/data-recap.component';
import { PhoneFormatPipe } from '../../format.pipe';

@NgModule({
  declarations: [
    DataRecapComponent,
    PhoneFormatPipe
  ],
  
  imports: [
    CommonModule, 
    CompteClientComponentRoutingModule,
    HttpClientModule
  ]
})
export class CompteClientModule { }
