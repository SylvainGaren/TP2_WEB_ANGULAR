import { Routes, RouterModule } from "@angular/router";
import { PanierComponent } from './panier/panier.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: PanierComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})
export class PanierComponentRoutingModule {}