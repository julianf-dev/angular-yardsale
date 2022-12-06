import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.mode';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{

  /* Dar estado inicial*/
/*   @Input('myProduct') product: Product = {
    id: '',
    name: '',
    price: 0,
    image: '',
  } */

  /* También podemos hacer esto*/
  @Input() myProduct !: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  disabled = false


  addCartImg = '/assets/icons/bt_add_to_cart.svg'


  onAddToCar(){
    this.addedProduct.emit(this.myProduct)
    this.addCartImg = '/assets/icons/bt_added_to_cart.svg'
    this.disabled = true
  }
}
