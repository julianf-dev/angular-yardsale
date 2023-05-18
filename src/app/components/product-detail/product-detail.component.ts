import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent{

  faClose = faClose
  disabled = false;
  addCartImg:string = '/assets/icons/bt_add_to_cart.svg'
  messageAdd:string = 'Add to Cart'
  active:any

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();
  @Output() closedModal = new EventEmitter<boolean>();
  @Input() productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
      image: ''
    },
    description: ''
  }

  ngOnInit(){
    this.active = true
  }

  closeModal(){
    this.active = false;
    this.closedModal.emit()
  }

  onAddCart(){
    this.addedProduct.emit(this.productChosen)
  }

  onEdit(){
    this.addedProduct.emit(this.productChosen);
  }

  onDelete(){
    this.deleteProduct.emit(this.productChosen.id);
  }

}
