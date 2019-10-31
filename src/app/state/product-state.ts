import {NgxsModule,Action,Selector,State, StateContext} from '@ngxs/store';
import { ProductStateModel } from './product-state-model';
import { AddProduct } from '../actions/addProductPanier-action';
import { DelProduct } from '../actions/delProduitPanier-action';

@State<ProductStateModel>({
    name: 'products',
    defaults: {
        products: []
    }
})

export class ProductState {

  @Selector()
    static getProduct(state: ProductStateModel) {
        return state.products;
    }

@Action(AddProduct)
    add({getState, patchState }: StateContext<ProductStateModel>, { addProduct }: AddProduct) {
        const state = getState();
        patchState({
            products: [...state.products, addProduct]
        });
    }

@Action(DelProduct)
    del ({getState, patchState }: StateContext<ProductStateModel>, { id }: DelProduct) {
        const state = getState();
        delete state.products[id];

        patchState({
            products: [...(state.products)]
        });
    }  
}
