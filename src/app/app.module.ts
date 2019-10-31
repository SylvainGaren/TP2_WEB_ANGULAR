import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { PhoneFormatPipe } from './format.pipe';
import { PhoneDirectiveDirective } from './phone-directive.directive';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './filter/filter.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './state/user-state';
import { ProductState } from './state/product-state';

const appRoutes: Routes = [
  { path: 'signin', component: FormComponent },
  { path: 'auth', loadChildren: () => import('./modules/compte-client/compte-client.module').then(m => m.CompteClientModule) },
  { path: 'cat', loadChildren: () => import('./modules/catalogue/catalogue.module').then(m => m.CatalogueModule) },
  { path: 'panier', loadChildren: () => import('./modules/panier/panier.module').then(m => m.PanierModule) },
  ];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FooterComponent,
    TetiereComponent,
    PhoneDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot ([UserState, ProductState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
