import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{

  /* Dar estado inicial*/
  @Input('myProduct') product: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: '',
      name: '',
      image: ''
    },
    images: [],
  }

  /* También podemos hacer esto*/
  //@Input() myProduct!:Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  @Output() updatedProduct = new EventEmitter<string>();
  disabled = false
  faEdit = faPenToSquare

  addCartImg = '/assets/icons/bt_add_to_cart.svg'
  constructor(private storeServices: StoreService){
  }
  onAddToCar(){
    this.storeServices.addProduct(this.product)
    this.addCartImg = '/assets/icons/bt_added_to_cart.svg';
    this.disabled = true;
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

  updateProduct(){
    this.updatedProduct.emit(this.product.id);
  }
}

