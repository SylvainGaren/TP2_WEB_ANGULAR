import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DataRecapComponent } from './data-recap/data-recap.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { PhoneFormatPipe } from './format.pipe';
import { PhoneDirectiveDirective } from './phone-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DataRecapComponent,
    FooterComponent,
    TetiereComponent,
    PhoneFormatPipe,
    PhoneDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
