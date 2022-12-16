import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { faClose } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  faClose = faClose
  productChosen: Product = {
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
  showProductDetail = false;

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }
}
