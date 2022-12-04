import { Injectable } from '@angular/core';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []

  constructor() { }

  getShopingCart(){
    return this.myShoppingCart
  }

  addProduct(product: Product){
    if (this.myShoppingCart.includes(product)){
      console.log('Product exist')
    } else {
      this.myShoppingCart.push(product);
    }
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price,0 );
  }

  getLength(){
    return this.myShoppingCart.length;
  }

}
