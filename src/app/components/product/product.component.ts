import { Component, OnInit, Input } from '@angular/core';
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
  @Input('product') product!: Product;


  constructor() { }

  ngOnInit(): void {
  }

}
