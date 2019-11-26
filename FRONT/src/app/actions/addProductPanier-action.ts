import { Product } from '../model/products';

export class AddProduct {
    static readonly type = '[Product] Add';

    constructor(public addProduct: Product) {}
    
}

