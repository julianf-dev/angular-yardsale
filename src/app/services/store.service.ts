import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'warning',
        title: 'Oops... the products is in the cart',
        text: 'Something went wrong!',
      })
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
