import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DataRecapComponent } from './data-recap/data-recap.component';

const routes: Routes = [
    {
        path: '',
        component: DataRecapComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],

    exports: [RouterModule]
})
export class CompteClientComponentRoutingModule {}