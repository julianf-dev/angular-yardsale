import { Injectable } from '@angular/core';
import { Product } from '../models/product.mode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = []
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();


  getShopingCart(){
    return this.myShoppingCart
  }

  addProduct(product: Product){
    if (this.myShoppingCart.includes(product)){
      console.log('Product exist')
    } else {
      this.myShoppingCart.push(product);
      this.myCart.next(this.myShoppingCart);
    }
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum, item) => sum + item.price,0 );
  }

  getLength(){
    return this.myShoppingCart.length;
  }

}
