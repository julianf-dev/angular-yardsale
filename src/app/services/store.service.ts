import { Product } from '../models/product.mode';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  private myShoppingCart: Product[] = []
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  private showProductDetail = false;
  private showProduct = new BehaviorSubject<boolean>(this.showProductDetail);
  showProduct$ = this.showProduct.asObservable();


  toogleProduct(){
    this.showProductDetail = !this.showProductDetail;
    this.showProduct.next(this.showProductDetail)
  }

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
