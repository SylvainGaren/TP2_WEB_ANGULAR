import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DataRecapComponent } from './data-recap/data-recap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { PhoneFormatPipe } from './format.pipe';
import { PhoneDirectiveDirective } from './phone-directive.directive';
import { ListProductComponent } from './list-product/list-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './filter/filter.component';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user-state';

const appRoutes: Routes = [
  { path: 'signin', component: FormComponent },
  { path: 'auth', component: DataRecapComponent },
  { path: 'cat', component: ListProductComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DataRecapComponent,
    FooterComponent,
    TetiereComponent,
    PhoneFormatPipe,
    PhoneDirectiveDirective,
    ListProductComponent,
    FilterComponent,
    PanierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot ([UserState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
