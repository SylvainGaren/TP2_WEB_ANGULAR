import { Routes, RouterModule } from "@angular/router";
import { ListProductComponent } from './list-product/list-product.component';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    {
        path: '',
        component: ListProductComponent,
    },
    {
        path: 'detail/:id',
        component: DetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})

export class CatalogueComponentRoutingModule {}