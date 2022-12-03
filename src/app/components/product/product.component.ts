import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.mode';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  /* Dar estado inicial*/
/*   @Input('myProduct') product: Product = {
    id: '',
    name: '',
    price: 0,
    image: '',
  } */

  /* También podemos hacer esto*/
  @Input('myProduct') product !: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  disabled:boolean = false


  addCartImg = '/assets/icons/bt_add_to_cart.svg'
  constructor() { }

  ngOnInit(): void {
  }

  onAddToCar(){
    this.addedProduct.emit(this.product)
    this.addCartImg = '/assets/icons/bt_added_to_cart.svg'
    this.disabled = true
  }
}
