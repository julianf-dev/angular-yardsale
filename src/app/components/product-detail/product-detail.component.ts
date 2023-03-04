import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements  OnInit {

  faClose = faClose
  disabled = false;

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<string>();
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

  constructor(private storeService: StoreService) { }
  showProductDetail = false
  showProduct$ = this.storeService.showProduct$

  ngOnInit(){
    this.storeService.showProduct$.subscribe(state => {
      this.showProductDetail = state
    })
  }

  toggleProductDetail() {
    this.storeService.toogleProduct()
  }

  onAddCart(){
    this.addedProduct.emit(this.productChosen)
    this.storeService.toogleProduct()
  }

  onEdit(){
    this.addedProduct.emit(this.productChosen);
  }

  onDelete(){
    this.deleteProduct.emit(this.productChosen.id);
    this.storeService.toogleProduct()
  }

}
